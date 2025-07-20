import React, { useState, useMemo, useCallback, useRef } from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import { galleryImages } from '../data/constants';
import { 
  getDeviceType, 
  getScreenCategory, 
  isLowEndDevice, 
  prefersReducedMotion,
  canHover,
  hasPointerFine
} from '../utils/deviceDetection';
import { useGalleryFiltering } from '../hooks/useGalleryFiltering';
import '../styles/gallery-section.css';

const GallerySection = () => {
  // Performance monitoring (disabled to avoid infinite loops)
  // const { startMeasurement, endMeasurement } = usePerformanceMonitoring('GallerySection');
  
  // Device capabilities detection - static since these don't change during component lifecycle
  const deviceInfo = useMemo(() => {
    const type = getDeviceType();
    return {
      isMobile: type.isMobile,
      isTablet: type.isTablet,
      isDesktop: type.isDesktop,
      screenCategory: getScreenCategory(),
      isLowEnd: isLowEndDevice(),
      reducedMotion: prefersReducedMotion(),
      canHover: canHover(),
      hasPointerFine: hasPointerFine()
    };
  }, []); // Static device info

  // Section visibility - simplified
  const sectionRef = useRef(null);

  // Gallery filtering with search
  const {
    activeFilter,
    searchQuery,
    filteredItems,
    availableFilters,
    isFiltering,
    handleFilterChange,
    handleSearchChange,
    clearSearch,
    resetFilters,
    getFilterClasses,
    stats: filterStats
  } = useGalleryFiltering(galleryImages, {
    searchFields: ['service', 'description', 'category'],
    filterKey: 'category',
    defaultFilter: 'all',
    animationStagger: deviceInfo.isLowEnd ? 150 : 100,
    debounceMs: deviceInfo.isLowEnd ? 500 : 300
    // Remove callbacks to prevent infinite loops
  });


  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Handle image click - simplified
  const handleImageClick = useCallback((image, index) => {
    // Simple alert for now - will replace with working lightbox later
    alert(`${image.service}: ${image.description}`);
  }, []);


  // Toggle search
  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
    if (isSearchOpen) {
      clearSearch();
    }
  }, [isSearchOpen, clearSearch]);

  // Toggle filter menu (mobile)
  const toggleFilterMenu = useCallback(() => {
    setIsFilterMenuOpen(prev => !prev);
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="galería" 
      className="gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="gallery-section__container">
        {/* Section Header */}
        <header className="gallery-section__header">
          <div className="gallery-section__badge" aria-hidden="true">
            <div className="gallery-section__badge-line"></div>
            <span className="gallery-section__badge-number">03</span>
            <div className="gallery-section__badge-line gallery-section__badge-line--extend"></div>
          </div>
          
          <h2 
            id="gallery-title"
            className="gallery-section__title"
          >
            PORTFOLIO
          </h2>
          
          <p className="gallery-section__description">
            Una curación de nuestro trabajo más refinado
          </p>

        </header>

        {/* Controls */}
        <div className="gallery-controls">
          {/* Search Toggle */}
          <div className="gallery-controls__search">
            <button
              onClick={toggleSearch}
              className={`gallery-search-toggle ${isSearchOpen ? 'gallery-search-toggle--active' : ''}`}
              aria-label={isSearchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'}
              aria-expanded={isSearchOpen}
            >
              <Search size={deviceInfo.isMobile ? 18 : 20} />
            </button>

            {/* Search Input */}
            <div className={`gallery-search-input ${isSearchOpen ? 'gallery-search-input--open' : ''}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Buscar en galería..."
                className="gallery-search-field"
                aria-label="Buscar en galería"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="gallery-search-clear"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle (Mobile) */}
          {deviceInfo.isMobile && (
            <button
              onClick={toggleFilterMenu}
              className={`gallery-filter-toggle ${isFilterMenuOpen ? 'gallery-filter-toggle--active' : ''}`}
              aria-label="Filtros"
              aria-expanded={isFilterMenuOpen}
            >
              <Filter size={18} />
              {filterStats.activeFilters > 0 && (
                <span className="gallery-filter-badge">{filterStats.activeFilters}</span>
              )}
            </button>
          )}

          {/* Filters */}
          <div className={`gallery-filters ${isFilterMenuOpen ? 'gallery-filters--open' : ''}`}>
            {availableFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={getFilterClasses(filter.key)}
                aria-label={`Filtrar por ${filter.label}`}
                aria-pressed={activeFilter === filter.key}
              >
                <span className="gallery-filter__label">{filter.label}</span>
                {filter.count > 0 && (
                  <span className="gallery-filter__count">{filter.count}</span>
                )}
              </button>
            ))}

            {/* Reset Filters */}
            {(activeFilter !== 'all' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="gallery-filter-reset"
                aria-label="Limpiar todos los filtros"
              >
                <RotateCcw size={16} />
                <span>Limpiar</span>
              </button>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isFiltering && (
          <div className="gallery-loading" role="status" aria-label="Filtrando galería">
            <div className="gallery-loading__spinner"></div>
            <span className="gallery-loading__text">Filtrando...</span>
          </div>
        )}

        {/* Gallery Grid - Simplified */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: deviceInfo.isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px',
            minHeight: '400px',
            width: '100%',
            padding: '0',
            margin: '0'
          }}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.url}
              style={{
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '1 / 1.2',
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onClick={() => handleImageClick(item, index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                const overlay = e.currentTarget.querySelector('.gallery-item__overlay');
                if (overlay) {
                  overlay.style.opacity = '1';
                  overlay.style.transform = 'translateY(0)';
                  overlay.style.pointerEvents = 'auto';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                const overlay = e.currentTarget.querySelector('.gallery-item__overlay');
                if (overlay) {
                  overlay.style.opacity = '0';
                  overlay.style.transform = 'translateY(10px)';
                  overlay.style.pointerEvents = 'none';
                }
              }}
            >
              <img
                src={item.url}
                alt={item.description}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  outline: 'none',
                  opacity: 1,
                  visibility: 'visible'
                }}
                loading="lazy"
                onLoad={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              />
              <div 
                className="gallery-item__overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, transparent 80%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                  color: 'white',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  transform: 'translateY(10px)',
                  pointerEvents: 'none'
                }}
              >
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '1.2rem', 
                  fontWeight: '700',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  letterSpacing: '0.5px'
                }}>
                  {item.service}
                </h4>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '0.9rem', 
                  opacity: '0.95',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  lineHeight: '1.4'
                }}>
                  {item.description}
                </p>
                <span style={{ 
                  fontSize: '0.75rem', 
                  opacity: '0.8', 
                  textTransform: 'uppercase',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  background: 'rgba(255,255,255,0.2)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(4px)'
                }}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && !isFiltering && (
          <div className="gallery-empty" role="status">
            <div className="gallery-empty__content">
              <p className="gallery-empty__title">No se encontraron resultados</p>
              <p className="gallery-empty__description">
                {searchQuery 
                  ? `No hay imágenes que coincidan con "${searchQuery}"`
                  : `No hay imágenes en la categoría "${availableFilters.find(f => f.key === activeFilter)?.label}"`
                }
              </p>
              <button 
                onClick={resetFilters}
                className="gallery-empty__reset"
              >
                Ver toda la galería
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
};


export default GallerySection;