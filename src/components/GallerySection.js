import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search, X, ZoomIn, ZoomOut, RotateCcw, Maximize, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { galleryImages } from '../data/constants';
import { 
  getDeviceType, 
  getScreenCategory, 
  isLowEndDevice, 
  prefersReducedMotion,
  canHover,
  hasPointerFine
} from '../utils/deviceDetection';
import { useMasonry, useGalleryImageLoading } from '../hooks/useMasonry';
import { useLightbox } from '../hooks/useLightbox';
import { useGalleryFiltering, useFilterAnimations } from '../hooks/useGalleryFiltering';
import { useIntersectionObserver, usePerformanceMonitoring } from '../hooks/useModalStates';
import '../styles/gallery-section.css';

const GallerySection = () => {
  // Performance monitoring
  const { startMeasurement, endMeasurement } = usePerformanceMonitoring('GallerySection');
  
  // Device capabilities detection
  const deviceInfo = useMemo(() => {
    startMeasurement();
    const info = {
      type: getDeviceType(),
      screenCategory: getScreenCategory(),
      isLowEnd: isLowEndDevice(),
      reducedMotion: prefersReducedMotion(),
      canHover: canHover(),
      hasPointerFine: hasPointerFine()
    };
    endMeasurement();
    return info;
  }, [startMeasurement, endMeasurement]);

  // Section visibility
  const {
    elementRef: sectionRef,
    isIntersecting: isSectionVisible
  } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true
  });

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
    getFilterBadgeCount,
    getItemAnimationState,
    getFilterClasses,
    getSearchClasses,
    stats: filterStats
  } = useGalleryFiltering(galleryImages, {
    searchFields: ['service', 'description', 'category'],
    filterKey: 'category',
    defaultFilter: 'all',
    animationStagger: deviceInfo.isLowEnd ? 150 : 100,
    debounceMs: deviceInfo.isLowEnd ? 500 : 300,
    onFilterChange: (filter) => {
      console.log(`Gallery filter changed to: ${filter}`);
    },
    onSearchChange: (query) => {
      console.log(`Gallery search: ${query}`);
    }
  });

  // Image loading optimization
  const {
    loadedImages,
    loadingProgress,
    preloadImage,
    getOptimizedSrc,
    generateBlurDataURL,
    getImageState,
    stats: imageStats
  } = useGalleryImageLoading(filteredItems, {
    quality: deviceInfo.isLowEnd ? 60 : 80,
    sizes: {
      mobile: 400,
      tablet: 600,
      desktop: 800,
      large: 1200
    },
    format: 'webp',
    priority: true
  });

  // Masonry layout with virtual scrolling
  const {
    containerRef: masonryRef,
    layout,
    columns,
    containerHeight,
    isLayoutCalculating,
    updateItemHeight,
    getItemStyle,
    getContainerStyle,
    stats: masonryStats
  } = useMasonry(filteredItems, {
    gap: deviceInfo.isLowEnd ? 12 : 16,
    minColumnWidth: deviceInfo.type.isMobile ? 280 : 320,
    maxColumns: deviceInfo.isLowEnd ? 3 : 4,
    virtualScrolling: deviceInfo.isLowEnd || deviceInfo.type.isMobile,
    overscan: deviceInfo.isLowEnd ? 2 : 3,
    onLayoutChange: (layoutResult) => {
      console.log(`Masonry layout: ${layoutResult.columns} columns, ${layoutResult.layout.length} items`);
    }
  });

  // Lightbox modal
  const {
    isOpen: isLightboxOpen,
    currentIndex: lightboxIndex,
    currentImage: lightboxImage,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
    zoomIn,
    zoomOut,
    resetZoom,
    toggleFullscreen,
    handleBackdropClick,
    getImageTransform,
    getLightboxClasses,
    lightboxRef,
    imageRef,
    canGoPrev,
    canGoNext,
    canZoomIn,
    canZoomOut
  } = useLightbox(filteredItems, {
    closeOnEscape: true,
    closeOnBackdropClick: true,
    enableSwipeNavigation: true,
    enableZoom: !deviceInfo.isLowEnd,
    enableFullscreen: !deviceInfo.type.isMobile,
    preloadBuffer: deviceInfo.isLowEnd ? 1 : 2,
    animationDuration: deviceInfo.reducedMotion ? 0 : 300,
    onOpen: (index, image) => {
      console.log(`Lightbox opened: ${image.service}`);
    },
    onClose: () => {
      console.log('Lightbox closed');
    }
  });

  // Filter animations
  const filterAnimations = useFilterAnimations(isSectionVisible, {
    enterDuration: deviceInfo.reducedMotion ? 0 : 300,
    exitDuration: deviceInfo.reducedMotion ? 0 : 200,
    staggerDelay: deviceInfo.isLowEnd ? 100 : 50
  });

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Handle image click
  const handleImageClick = useCallback((image, index) => {
    if (!deviceInfo.reducedMotion) {
      // Add haptic feedback on supported devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
    
    const imageIndex = filteredItems.findIndex(item => item.url === image.url);
    openLightbox(imageIndex);
  }, [filteredItems, openLightbox, deviceInfo.reducedMotion]);

  // Handle image load for masonry layout update
  const handleImageLoad = useCallback((image, actualHeight) => {
    updateItemHeight(image, actualHeight);
  }, [updateItemHeight]);

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
      role="region"
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

          {/* Stats Display (Development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="gallery-section__stats">
              <small>
                Items: {filterStats.filteredCount}/{filterStats.totalItems} | 
                Columns: {columns} | 
                Loaded: {imageStats.loaded}/{imageStats.total} | 
                Cache: {masonryStats.cacheSize}
              </small>
            </div>
          )}
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
              <Search size={deviceInfo.type.isMobile ? 18 : 20} />
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
          {deviceInfo.type.isMobile && (
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
            {availableFilters.map((filter, index) => (
              <button
                key={filter.key}
                onClick={() => handleFilterChange(filter.key)}
                className={getFilterClasses(filter.key)}
                style={filterAnimations.getItemStyle(index)}
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

        {/* Gallery Grid */}
        <div 
          ref={masonryRef}
          className={`gallery-grid ${isLayoutCalculating ? 'gallery-grid--calculating' : ''}`}
          style={getContainerStyle()}
          role="grid"
          aria-label="Galería de trabajos"
          aria-busy={isFiltering}
        >
          {layout.map((layoutItem, index) => (
            <GalleryItem
              key={layoutItem.item.url}
              layoutItem={layoutItem}
              index={index}
              onClick={handleImageClick}
              onImageLoad={handleImageLoad}
              getOptimizedSrc={getOptimizedSrc}
              generateBlurDataURL={generateBlurDataURL}
              getImageState={getImageState}
              getItemStyle={getItemStyle}
              getItemAnimationState={getItemAnimationState}
              deviceInfo={deviceInfo}
              isVisible={isSectionVisible}
            />
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

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxImage && (
        <div 
          ref={lightboxRef}
          className={getLightboxClasses()}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
        >
          <div className="lightbox__content">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="lightbox__close"
              aria-label="Cerrar lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  disabled={!canGoPrev}
                  className="lightbox__nav lightbox__nav--prev"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={32} />
                </button>

                <button
                  onClick={nextImage}
                  disabled={!canGoNext}
                  className="lightbox__nav lightbox__nav--next"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Controls */}
            <div className="lightbox__controls">
              {canZoomIn && (
                <button
                  onClick={zoomIn}
                  className="lightbox__control"
                  aria-label="Acercar"
                >
                  <ZoomIn size={20} />
                </button>
              )}

              {canZoomOut && (
                <button
                  onClick={zoomOut}
                  className="lightbox__control"
                  aria-label="Alejar"
                >
                  <ZoomOut size={20} />
                </button>
              )}

              <button
                onClick={resetZoom}
                className="lightbox__control"
                aria-label="Restablecer zoom"
              >
                <RotateCcw size={20} />
              </button>

              {deviceInfo.supportsFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="lightbox__control"
                  aria-label="Pantalla completa"
                >
                  <Maximize size={20} />
                </button>
              )}
            </div>

            {/* Image Container */}
            <div className="lightbox__image-container">
              <img
                ref={imageRef}
                src={getOptimizedSrc(lightboxImage.url, 1200)}
                alt={lightboxImage.description}
                className="lightbox__image"
                style={{
                  transform: getImageTransform()
                }}
                loading="eager"
                decoding="async"
              />
            </div>

            {/* Image Info */}
            <div className="lightbox__info">
              <h3 
                id="lightbox-title"
                className="lightbox__title"
              >
                {lightboxImage.service}
              </h3>
              <p 
                id="lightbox-description"
                className="lightbox__description"
              >
                {lightboxImage.description}
              </p>
              <span className="lightbox__counter">
                {lightboxIndex + 1} de {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Individual Gallery Item Component
const GalleryItem = ({ 
  layoutItem, 
  index, 
  onClick, 
  onImageLoad,
  getOptimizedSrc,
  generateBlurDataURL,
  getImageState,
  getItemStyle,
  getItemAnimationState,
  deviceInfo,
  isVisible
}) => {
  const { item } = layoutItem;
  const imageState = getImageState(item.url);
  const animationState = getItemAnimationState(item);

  // Handle image load event
  const handleImageLoad = useCallback((event) => {
    const img = event.target;
    onImageLoad(item, img.naturalHeight * (layoutItem.width / img.naturalWidth));
  }, [item, layoutItem.width, onImageLoad]);

  // Handle click
  const handleClick = useCallback(() => {
    onClick(item, index);
  }, [item, index, onClick]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <article
      className={`gallery-item ${item.featured ? 'gallery-item--featured' : ''}`}
      style={{
        ...getItemStyle(layoutItem),
        ...(!deviceInfo.reducedMotion && animationState.visible ? {
          animationDelay: `${animationState.delay}ms`,
          animationDuration: `${animationState.duration}ms`
        } : {})
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver ${item.service}: ${item.description}`}
    >
      {/* Image Container */}
      <div className="gallery-item__image-container">
        {/* Placeholder/Loading */}
        {!imageState.isLoaded && (
          <div 
            className="gallery-item__placeholder"
            style={{
              backgroundImage: `url(${generateBlurDataURL()})`
            }}
          >
            <div className="gallery-item__loading">
              <div className="gallery-item__loading-spinner"></div>
            </div>
          </div>
        )}

        {/* Main Image */}
        {isVisible && (
          <img
            src={getOptimizedSrc(item.url, layoutItem.width)}
            alt={item.description}
            className={`gallery-item__image ${imageState.isLoaded ? 'gallery-item__image--loaded' : ''}`}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
          />
        )}

        {/* Overlay */}
        <div className="gallery-item__overlay">
          <div className="gallery-item__content">
            <h4 className="gallery-item__title">{item.service}</h4>
            <p className="gallery-item__description">{item.description}</p>
            <span className="gallery-item__category">{item.category}</span>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="gallery-item__corner gallery-item__corner--top-left" aria-hidden="true"></div>
        <div className="gallery-item__corner gallery-item__corner--bottom-right" aria-hidden="true"></div>

        {/* Featured Badge */}
        {item.featured && (
          <div className="gallery-item__badge" aria-label="Destacado">
            ⭐
          </div>
        )}
      </div>
    </article>
  );
};

export default GallerySection;