import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { getDeviceType, isLowEndDevice, prefersReducedMotion } from '../utils/deviceDetection';

// Hook for advanced gallery filtering with search and animation
export const useGalleryFiltering = (items = [], options = {}) => {
  const {
    searchFields = ['service', 'description', 'category'],
    filterKey = 'category',
    defaultFilter = 'all',
    searchPlaceholder = 'Buscar en galería...',
    animationStagger = 100,
    debounceMs = 300,
    minSearchLength = 2,
    onFilterChange,
    onSearchChange,
    customFilters = {}
  } = options;

  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [itemAnimationStates, setItemAnimationStates] = useState(new Map());
  
  const searchTimeoutRef = useRef(null);
  const filterCacheRef = useRef(new Map());
  const searchIndexRef = useRef(new Map());

  // Device capabilities
  const deviceInfo = useMemo(() => ({
    type: getDeviceType(),
    isLowEnd: isLowEndDevice(),
    reducedMotion: prefersReducedMotion()
  }), []);

  // Build search index for faster searching
  useEffect(() => {
    const searchIndex = new Map();
    
    items.forEach((item, index) => {
      const searchableText = searchFields
        .map(field => item[field] || '')
        .join(' ')
        .toLowerCase()
        .trim();
      
      searchIndex.set(index, {
        item,
        searchText: searchableText,
        searchWords: searchableText.split(/\s+/).filter(word => word.length > 1)
      });
    });
    
    searchIndexRef.current = searchIndex;
  }, [items, searchFields]);

  // Extract available filters from items
  useEffect(() => {
    const filterMap = new Map();
    
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
            label: getFilterLabel(filterValue),
            count: 1,
            description: getFilterDescription(filterValue)
          });
        }
      }
    });
    
    // Add custom filters
    Object.entries(customFilters).forEach(([key, config]) => {
      if (!filterMap.has(key)) {
        filterMap.set(key, {
          key,
          label: config.label || key,
          count: config.count || 0,
          description: config.description || '',
          custom: true,
          filterFn: config.filterFn
        });
      }
    });
    
    setAvailableFilters(Array.from(filterMap.values()));
  }, [items, filterKey, customFilters]);

  // Get filter label
  const getFilterLabel = useCallback((filterValue) => {
    const labelMap = {
      'corte': 'Cortes',
      'barba': 'Barbas', 
      'vip': 'VIP',
      'afeitado': 'Afeitados',
      'all': 'Todo'
    };
    
    return labelMap[filterValue] || filterValue.charAt(0).toUpperCase() + filterValue.slice(1);
  }, []);

  // Get filter description
  const getFilterDescription = useCallback((filterValue) => {
    const descriptionMap = {
      'corte': 'Estilos de corte modernos y clásicos',
      'barba': 'Diseño y cuidado de barbas',
      'vip': 'Experiencias premium y exclusivas',
      'afeitado': 'Afeitados tradicionales y de precisión',
      'all': 'Toda nuestra galería de trabajos'
    };
    
    return descriptionMap[filterValue] || `Galería de ${filterValue}`;
  }, []);

  // Perform search with fuzzy matching
  const performSearch = useCallback((query) => {
    if (!query || query.length < minSearchLength) {
      return [];
    }
    
    const queryWords = query.toLowerCase().split(/\s+/).filter(word => word.length > 1);
    const results = [];
    
    searchIndexRef.current.forEach((indexData, itemIndex) => {
      let score = 0;
      let matches = 0;
      
      queryWords.forEach(queryWord => {
        // Exact match scoring
        if (indexData.searchText.includes(queryWord)) {
          score += 10;
          matches++;
        }
        
        // Partial match scoring
        indexData.searchWords.forEach(searchWord => {
          if (searchWord.includes(queryWord)) {
            score += 5;
            matches++;
          } else if (queryWord.includes(searchWord)) {
            score += 3;
            matches++;
          }
        });
        
        // Fuzzy match scoring (simple)
        indexData.searchWords.forEach(searchWord => {
          const distance = getLevenshteinDistance(queryWord, searchWord);
          if (distance <= 2 && searchWord.length > 3) {
            score += 2;
            matches++;
          }
        });
      });
      
      if (matches > 0) {
        results.push({
          item: indexData.item,
          index: itemIndex,
          score,
          matches,
          relevance: (matches / queryWords.length) * (score / matches)
        });
      }
    });
    
    // Sort by relevance
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .map(result => result.item);
  }, [minSearchLength]);

  // Simple Levenshtein distance for fuzzy matching
  const getLevenshteinDistance = useCallback((str1, str2) => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }, []);

  // Apply filters and search
  const applyFiltersAndSearch = useCallback(() => {
    setIsFiltering(true);
    
    const cacheKey = `${activeFilter}-${searchQuery}`;
    
    // Check cache first
    if (filterCacheRef.current.has(cacheKey)) {
      const cached = filterCacheRef.current.get(cacheKey);
      setFilteredItems(cached);
      setIsFiltering(false);
      return;
    }
    
    let result = [...items];
    
    // Apply category filter first
    if (activeFilter !== 'all') {
      const filterConfig = availableFilters.find(f => f.key === activeFilter);
      
      if (filterConfig?.custom && filterConfig.filterFn) {
        // Custom filter function
        result = result.filter(filterConfig.filterFn);
      } else {
        // Standard filter
        result = result.filter(item => item[filterKey] === activeFilter);
      }
    }
    
    // Apply search filter
    if (searchQuery && searchQuery.length >= minSearchLength) {
      const searchResults = performSearch(searchQuery);
      // Intersect with category filter results
      result = result.filter(item => 
        searchResults.some(searchItem => 
          searchItem.url === item.url || searchItem.id === item.id
        )
      );
    }
    
    // Cache result
    filterCacheRef.current.set(cacheKey, result);
    
    // Limit cache size
    if (filterCacheRef.current.size > 20) {
      const firstKey = filterCacheRef.current.keys().next().value;
      filterCacheRef.current.delete(firstKey);
    }
    
    setFilteredItems(result);
    setIsFiltering(false);
    
    // Trigger animation states
    if (!deviceInfo.reducedMotion) {
      const newAnimationStates = new Map();
      result.forEach((item, index) => {
        const delay = Math.min(index * animationStagger, 1000);
        newAnimationStates.set(item.url || item.id, {
          visible: true,
          delay,
          duration: 400 + (index * 20)
        });
      });
      setItemAnimationStates(newAnimationStates);
    }
  }, [
    activeFilter, 
    searchQuery, 
    items, 
    availableFilters, 
    filterKey, 
    minSearchLength,
    performSearch,
    deviceInfo.reducedMotion,
    animationStagger
  ]);

  // Handle filter change
  const handleFilterChange = useCallback((filterKey) => {
    if (filterKey === activeFilter) return;
    
    setActiveFilter(filterKey);
    onFilterChange && onFilterChange(filterKey);
  }, [activeFilter, onFilterChange]);

  // Handle search with debouncing
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      onSearchChange && onSearchChange(query);
    }, debounceMs);
  }, [debounceMs, onSearchChange]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    onSearchChange && onSearchChange('');
  }, [onSearchChange]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setActiveFilter(defaultFilter);
    setSearchQuery('');
    onFilterChange && onFilterChange(defaultFilter);
    onSearchChange && onSearchChange('');
  }, [defaultFilter, onFilterChange, onSearchChange]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  // Get filter badge count
  const getFilterBadgeCount = useCallback((filterKey) => {
    const filter = availableFilters.find(f => f.key === filterKey);
    return filter ? filter.count : 0;
  }, [availableFilters]);

  // Get animation state for item
  const getItemAnimationState = useCallback((item) => {
    const key = item.url || item.id;
    return itemAnimationStates.get(key) || { visible: true, delay: 0, duration: 400 };
  }, [itemAnimationStates]);

  // Get filter classes
  const getFilterClasses = useCallback((filterKey) => {
    const classes = ['gallery-filter'];
    
    if (filterKey === activeFilter) {
      classes.push('gallery-filter--active');
    }
    
    if (deviceInfo.type.isMobile) {
      classes.push('gallery-filter--mobile');
    }
    
    return classes.join(' ');
  }, [activeFilter, deviceInfo.type.isMobile]);

  // Get search input classes
  const getSearchClasses = useCallback(() => {
    const classes = ['gallery-search'];
    
    if (searchQuery) {
      classes.push('gallery-search--active');
    }
    
    if (deviceInfo.type.isMobile) {
      classes.push('gallery-search--mobile');
    }
    
    return classes.join(' ');
  }, [searchQuery, deviceInfo.type.isMobile]);

  return {
    // State
    activeFilter,
    searchQuery,
    filteredItems,
    availableFilters,
    isFiltering,
    searchResults,
    
    // Actions  
    handleFilterChange,
    handleSearchChange,
    clearSearch,
    resetFilters,
    
    // Utilities
    getFilterBadgeCount,
    getItemAnimationState,
    getFilterClasses,
    getSearchClasses,
    
    // Device info
    deviceInfo,
    
    // Stats
    stats: {
      totalItems: items.length,
      filteredCount: filteredItems.length,
      filterRatio: items.length > 0 ? (filteredItems.length / items.length) * 100 : 0,
      activeFilters: searchQuery ? 1 : 0 + (activeFilter !== 'all' ? 1 : 0),
      cacheSize: filterCacheRef.current.size
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

  const deviceInfo = useMemo(() => ({
    reducedMotion: prefersReducedMotion()
  }), []);

  useEffect(() => {
    if (deviceInfo.reducedMotion) return;

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
  }, [isActive, enterDuration, exitDuration, deviceInfo.reducedMotion]);

  const getItemStyle = useCallback((index) => {
    if (deviceInfo.reducedMotion) {
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
  }, [animationState, enterDuration, exitDuration, staggerDelay, deviceInfo.reducedMotion]);

  return {
    animationState,
    getItemStyle,
    deviceInfo
  };
};