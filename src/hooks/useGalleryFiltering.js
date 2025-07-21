import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getDeviceInfo } from '../utils/deviceDetection';

// Hook for advanced gallery filtering with search and animation
export const useGalleryFiltering = (items = [], options = {}) => {
  const {
    searchFields = ['service', 'description', 'category'],
    filterKey = 'category',
    defaultFilter = 'all',
    debounceMs = 300,
    minSearchLength = 2,
    onFilterChange,
    onSearchChange,
  } = options;

  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [isFiltering] = useState(false);
  
  const searchTimeoutRef = useRef(null);

  // Device capabilities - use cached info to prevent re-renders
  const deviceInfo = useMemo(() => getDeviceInfo(), []);




  // Extract available filters from items - simplified to avoid infinite loops
  useEffect(() => {
    const filterMap = new Map();
    
    // Simple label mapping
    const getLabel = (value) => {
      const labels = {
        'corte': 'Cortes',
        'barba': 'Barbas', 
        'vip': 'VIP',
        'afeitado': 'Afeitados',
        'all': 'Todo'
      };
      return labels[value] || value.charAt(0).toUpperCase() + value.slice(1);
    };
    
    // Add default 'all' filter
    filterMap.set('all', {
      key: 'all',
      label: 'Todo',
      count: items.length,
      description: 'Mostrar toda la galería'
    });
    
    // Extract filters from items
    items.forEach(item => {
      const filterValue = item[filterKey];
      if (filterValue && filterValue !== 'all') {
        const existing = filterMap.get(filterValue);
        if (existing) {
          existing.count++;
        } else {
          filterMap.set(filterValue, {
            key: filterValue,
            label: getLabel(filterValue),
            count: 1,
            description: `Galería de ${filterValue}`
          });
        }
      }
    });
    
    const newFilters = Array.from(filterMap.values());
    setAvailableFilters(newFilters);
  }, [items, filterKey]); // Remove problematic dependencies



  // Store callback refs to prevent infinite loops
  const onFilterChangeRef = useRef(onFilterChange);
  const onSearchChangeRef = useRef(onSearchChange);
  onFilterChangeRef.current = onFilterChange;
  onSearchChangeRef.current = onSearchChange;

  // Handle filter change
  const handleFilterChange = useCallback((filterKey) => {
    if (filterKey === activeFilter) return;
    
    setActiveFilter(filterKey);
    onFilterChangeRef.current && onFilterChangeRef.current(filterKey);
  }, [activeFilter]);

  // Handle search with debouncing
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onSearchChangeRef.current && onSearchChangeRef.current(query);
    }, debounceMs);
  }, [debounceMs]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    onSearchChangeRef.current && onSearchChangeRef.current('');
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setActiveFilter(defaultFilter);
    setSearchQuery('');
    onFilterChangeRef.current && onFilterChangeRef.current(defaultFilter);
    onSearchChangeRef.current && onSearchChangeRef.current('');
  }, [defaultFilter]);

  // Stabilize searchFields to prevent infinite loops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableSearchFields = useMemo(() => searchFields, []);

  // Apply filters when key dependencies change
  useEffect(() => {
    const result = items.filter(item => {
      // Filter by category
      if (activeFilter !== 'all' && item[filterKey] !== activeFilter) {
        return false;
      }
      
      // Filter by search
      if (searchQuery && searchQuery.length >= minSearchLength) {
        const searchText = stableSearchFields
          .map(field => item[field] || '')
          .join(' ')
          .toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      }
      
      return true;
    });
    
    setFilteredItems(result);
  }, [items, activeFilter, searchQuery, filterKey, stableSearchFields, minSearchLength]);

  // Get filter classes - simplified
  const getFilterClasses = useCallback((filterKey) => {
    const classes = ['gallery-filter'];
    
    if (filterKey === activeFilter) {
      classes.push('gallery-filter--active');
    }
    
    if (deviceInfo.isMobile) {
      classes.push('gallery-filter--mobile');
    }
    
    return classes.join(' ');
  }, [activeFilter, deviceInfo.isMobile]);

  return {
    // State
    activeFilter,
    searchQuery,
    filteredItems,
    availableFilters,
    isFiltering,
    
    // Actions  
    handleFilterChange,
    handleSearchChange,
    clearSearch,
    resetFilters,
    
    // Utilities
    getFilterClasses,
    
    // Device info
    deviceInfo,
    
    // Stats
    stats: {
      totalItems: items.length,
      filteredCount: filteredItems.length,
      filterRatio: items.length > 0 ? (filteredItems.length / items.length) * 100 : 0,
      activeFilters: (searchQuery ? 1 : 0) + (activeFilter !== 'all' ? 1 : 0)
    }
  };
};

// Hook for filter UI animations
export const useFilterAnimations = (isActive, options = {}) => {
  const {
    enterDuration = 300,
    exitDuration = 200,
    staggerDelay = 50
  } = options;

  const [animationState, setAnimationState] = useState('idle');
  const timeoutRef = useRef(null);

  const animationDeviceInfo = useMemo(() => getDeviceInfo(), []);

  useEffect(() => {
    if (animationDeviceInfo.reducedMotion) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isActive) {
      setAnimationState('entering');
      timeoutRef.current = setTimeout(() => {
        setAnimationState('entered');
      }, enterDuration);
    } else {
      setAnimationState('exiting');
      timeoutRef.current = setTimeout(() => {
        setAnimationState('exited');
      }, exitDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isActive, enterDuration, exitDuration, animationDeviceInfo.reducedMotion]);

  const getItemStyle = useCallback((index) => {
    if (animationDeviceInfo.reducedMotion) {
      return {};
    }

    const delay = index * staggerDelay;
    
    switch (animationState) {
      case 'entering':
        return {
          opacity: 0,
          transform: 'translateY(20px)',
          transition: `opacity ${enterDuration}ms ease-out ${delay}ms, transform ${enterDuration}ms ease-out ${delay}ms`
        };
      
      case 'entered':
        return {
          opacity: 1,
          transform: 'translateY(0)',
          transition: `opacity ${enterDuration}ms ease-out ${delay}ms, transform ${enterDuration}ms ease-out ${delay}ms`
        };
      
      case 'exiting':
        return {
          opacity: 0,
          transform: 'translateY(-10px)',
          transition: `opacity ${exitDuration}ms ease-in, transform ${exitDuration}ms ease-in`
        };
      
      default:
        return {
          opacity: 1,
          transform: 'translateY(0)'
        };
    }
  }, [animationState, enterDuration, exitDuration, staggerDelay, animationDeviceInfo.reducedMotion]);

  return {
    animationState,
    getItemStyle,
    deviceInfo: animationDeviceInfo
  };
};