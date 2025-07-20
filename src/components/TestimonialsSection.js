import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Star } from 'lucide-react';
import { testimonials } from '../data/constants';
import { 
  getDeviceType, 
  getScreenCategory, 
  isLowEndDevice, 
  prefersReducedMotion,
  canHover,
  hasPointerFine
} from '../utils/deviceDetection';
import { 
  useResponsiveCarousel, 
  useTestimonialScaling, 
  useRatingStars 
} from '../hooks/useResponsiveCarousel';
import { 
  useCarouselLoadingStates, 
  useMomentumPhysics, 
  useScrollSnap,
  useCarouselOptimization 
} from '../hooks/useCarouselEffects';
import { useIntersectionObserver, usePerformanceMonitoring } from '../hooks/useModalStates';
import '../styles/testimonials-section.css';

const TestimonialsSection = () => {
  // Performance monitoring
  const { startMeasurement, endMeasurement } = usePerformanceMonitoring('TestimonialsSection');
  
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

  // Responsive carousel with adaptive navigation
  const {
    currentIndex,
    isAutoPlaying,
    isDragging,
    navigationMode,
    isTransitioning,
    dimensions,
    goToSlide,
    nextSlide,
    prevSlide,
    pauseAutoPlay,
    resumeAutoPlay,
    toggleAutoPlay,
    getSlideTransform,
    getSlideClasses,
    getNavClasses,
    containerRef,
    trackRef,
    canGoPrev,
    canGoNext,
    progress
  } = useResponsiveCarousel(testimonials, {
    autoPlay: true,
    autoPlayDelay: 6000,
    infinite: true,
    enableSwipe: true,
    enableKeyboard: true,
    momentum: !deviceInfo.isLowEnd,
    snapToSlides: true,
    transitionDuration: deviceInfo.reducedMotion ? 0 : 600,
    onSlideChange: (index, userInitiated) => {
      console.log(`Testimonial changed to: ${index}${userInitiated ? ' (user)' : ' (auto)'}`);
      if (userInitiated) {
        markContentLoaded(index);
      }
    },
    onAutoPlayToggle: (playing) => {
      console.log(`Autoplay ${playing ? 'started' : 'paused'}`);
    }
  });

  // Loading states and content management
  const {
    globalLoading,
    skeletonVisible,
    preloadAroundIndex,
    markContentLoaded,
    getLoadingState,
    getSkeletonClasses,
    isImageLoaded
  } = useCarouselLoadingStates(testimonials, {
    preloadBuffer: deviceInfo.isLowEnd ? 1 : 2,
    skeletonDuration: deviceInfo.reducedMotion ? 0 : 800,
    staggerDelay: deviceInfo.isLowEnd ? 300 : 200,
    enableSkeleton: !deviceInfo.reducedMotion && !deviceInfo.isLowEnd
  });

  // Momentum physics for smooth interactions
  const {
    isAnimating: isMomentumAnimating,
    startMomentum,
    stopMomentum
  } = useMomentumPhysics({
    friction: deviceInfo.isLowEnd ? 0.88 : 0.92,
    bounceStiffness: 0.8,
    velocityThreshold: deviceInfo.isLowEnd ? 0.2 : 0.1
  });

  // Scroll snap behavior
  const {
    snapIndex,
    isSnapping,
    snapToIndex,
    supportsScrollSnap
  } = useScrollSnap(containerRef, {
    snapType: 'x mandatory',
    snapAlign: 'center',
    smoothScrolling: !deviceInfo.reducedMotion
  });

  // Performance optimization
  const {
    shouldRenderItem,
    memoryUsage,
    averageRenderTime,
    performanceStatus,
    startRenderMeasurement,
    endRenderMeasurement,
    optimizationActive
  } = useCarouselOptimization(testimonials.length, currentIndex, {
    renderBuffer: deviceInfo.isLowEnd ? 1 : 2,
    virtualization: deviceInfo.isLowEnd,
    memoryThreshold: deviceInfo.isLowEnd ? 30 : 50
  });

  // Preload content around current testimonial
  useEffect(() => {
    if (isSectionVisible) {
      preloadAroundIndex(currentIndex);
    }
  }, [currentIndex, isSectionVisible, preloadAroundIndex]);

  // Handle user interaction
  const handleSlideClick = useCallback((index) => {
    if (index !== currentIndex && !isTransitioning) {
      goToSlide(index, true);
      if (!deviceInfo.reducedMotion && navigator.vibrate) {
        navigator.vibrate(30);
      }
    }
  }, [currentIndex, isTransitioning, goToSlide, deviceInfo.reducedMotion]);

  // Handle keyboard interactions
  const handleKeyDown = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide(true);
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide(true);
        break;
      case ' ':
        event.preventDefault();
        toggleAutoPlay();
        break;
      default:
        break;
    }
  }, [prevSlide, nextSlide, toggleAutoPlay]);

  return (
    <section 
      ref={sectionRef}
      className="testimonials-section"
      role="region"
      aria-labelledby="testimonials-title"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="testimonials-section__container">
        {/* Section Header */}
        <header className="testimonials-section__header">
          <div className="testimonials-section__badge" aria-hidden="true">
            <div className="testimonials-section__badge-line"></div>
            <span className="testimonials-section__badge-number">04</span>
            <div className="testimonials-section__badge-line testimonials-section__badge-line--extend"></div>
          </div>
          
          <h2 
            id="testimonials-title"
            className="testimonials-section__title"
          >
            TESTIMONIOS
          </h2>
          
          <p className="testimonials-section__description">
            La experiencia de nuestros clientes habla por sí sola
          </p>

          {/* Performance Stats (Development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="testimonials-section__stats">
              <small>
                Mode: {navigationMode} | 
                Memory: {memoryUsage.toFixed(1)}MB | 
                Render: {averageRenderTime.toFixed(1)}ms | 
                Status: {performanceStatus} |
                Optimization: {optimizationActive ? 'ON' : 'OFF'}
              </small>
            </div>
          )}
        </header>

        {/* Decorative Quote */}
        <div className="testimonials-section__quote-decoration" aria-hidden="true">
          <span className="testimonials-section__quote-mark">"</span>
        </div>

        {/* Carousel Controls (Arrows Mode) */}
        {navigationMode === 'arrows' && (
          <div className="testimonials-controls">
            <button
              onClick={() => prevSlide(true)}
              disabled={!canGoPrev}
              className="testimonials-controls__arrow testimonials-controls__arrow--prev"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={deviceInfo.type.isMobile ? 20 : 24} />
            </button>

            <button
              onClick={() => nextSlide(true)}
              disabled={!canGoNext}
              className="testimonials-controls__arrow testimonials-controls__arrow--next"
              aria-label="Testimonio siguiente"
            >
              <ChevronRight size={deviceInfo.type.isMobile ? 20 : 24} />
            </button>

            <button
              onClick={toggleAutoPlay}
              className="testimonials-controls__autoplay"
              aria-label={isAutoPlaying ? 'Pausar reproducción automática' : 'Reanudar reproducción automática'}
            >
              {isAutoPlaying ? (
                <Pause size={deviceInfo.type.isMobile ? 16 : 18} />
              ) : (
                <Play size={deviceInfo.type.isMobile ? 16 : 18} />
              )}
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className={`testimonials-carousel ${getNavClasses()}`}
          role="region"
          aria-label="Carousel de testimonios"
          aria-live={isAutoPlaying ? 'polite' : 'off'}
        >
          {/* Progress Bar (Continuous Mode) */}
          {navigationMode === 'continuous' && (
            <div className="testimonials-progress">
              <div 
                className="testimonials-progress__bar"
                style={{
                  width: `${progress * 100}%`,
                  transition: deviceInfo.reducedMotion ? 'none' : 'width 0.3s ease'
                }}
              />
            </div>
          )}

          <div 
            ref={trackRef}
            className={`testimonials-carousel__track ${
              isDragging ? 'testimonials-carousel__track--dragging' : ''
            } ${
              isTransitioning ? 'testimonials-carousel__track--transitioning' : ''
            }`}
            style={{
              transform: getSlideTransform(),
              transition: isDragging || deviceInfo.reducedMotion ? 'none' : 
                `transform ${isTransitioning ? '0.6s' : '0.4s'} ease-out`
            }}
          >
            {testimonials.map((testimonial, index) => (
              shouldRenderItem(index) ? (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  isActive={index === currentIndex}
                  isPrev={index === currentIndex - 1 || (currentIndex === 0 && index === testimonials.length - 1)}
                  isNext={index === currentIndex + 1 || (currentIndex === testimonials.length - 1 && index === 0)}
                  slideClasses={getSlideClasses(index)}
                  loadingState={getLoadingState(index)}
                  skeletonClasses={getSkeletonClasses(index)}
                  isImageLoaded={isImageLoaded(testimonial.image)}
                  deviceInfo={deviceInfo}
                  navigationMode={navigationMode}
                  onClick={() => handleSlideClick(index)}
                  onContentLoaded={() => markContentLoaded(index)}
                  startRenderMeasurement={startRenderMeasurement}
                  endRenderMeasurement={endRenderMeasurement}
                />
              ) : (
                <div key={index} className="testimonials-carousel__placeholder" />
              )
            ))}
          </div>
        </div>

        {/* Navigation Dots (Dots Mode) */}
        {navigationMode === 'dots' && (
          <nav 
            className="testimonials-navigation"
            aria-label="Navegación de testimonios"
          >
            <div className="testimonials-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index, true)}
                  className={`testimonials-dots__dot ${
                    index === currentIndex ? 'testimonials-dots__dot--active' : ''
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Auto-play control */}
            <button
              onClick={toggleAutoPlay}
              className="testimonials-navigation__autoplay"
              aria-label={isAutoPlaying ? 'Pausar reproducción automática' : 'Reanudar reproducción automática'}
            >
              {isAutoPlaying ? (
                <Pause size={deviceInfo.type.isMobile ? 14 : 16} />
              ) : (
                <Play size={deviceInfo.type.isMobile ? 14 : 16} />
              )}
            </button>
          </nav>
        )}

        {/* Loading Overlay */}
        {globalLoading && skeletonVisible && (
          <div className="testimonials-loading" role="status" aria-label="Cargando testimonios">
            <div className="testimonials-loading__spinner"></div>
            <span className="testimonials-loading__text">Cargando testimonios...</span>
          </div>
        )}
      </div>
    </section>
  );
};

// Individual Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  index, 
  isActive, 
  isPrev, 
  isNext,
  slideClasses,
  loadingState,
  skeletonClasses,
  isImageLoaded,
  deviceInfo,
  navigationMode,
  onClick,
  onContentLoaded,
  startRenderMeasurement,
  endRenderMeasurement
}) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Typography scaling for testimonial text
  const textScaling = useTestimonialScaling(testimonial.text, textRef, {
    minFontSize: deviceInfo.type.isMobile ? 16 : 18,
    maxFontSize: deviceInfo.type.isMobile ? 24 : 32,
    idealLineCount: deviceInfo.type.isMobile ? 3 : 4,
    maxLineCount: deviceInfo.type.isMobile ? 5 : 6
  });

  // Rating stars scaling
  const ratingStars = useRatingStars(testimonial.rating, 5, {
    starSize: deviceInfo.type.isMobile ? 16 : 20,
    spacing: deviceInfo.type.isMobile ? 2 : 4,
    fillColor: '#FFD700',
    emptyColor: 'rgba(255, 255, 255, 0.3)',
    responsive: true
  });

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    onContentLoaded();
    endRenderMeasurement();
  }, [onContentLoaded, endRenderMeasurement]);

  // Handle card interaction
  const handleCardClick = useCallback(() => {
    if (navigationMode === 'continuous' || (!isActive && (isPrev || isNext))) {
      onClick();
    }
  }, [navigationMode, isActive, isPrev, isNext, onClick]);

  // Handle keyboard interaction
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  // Start render measurement
  useEffect(() => {
    startRenderMeasurement();
  }, [startRenderMeasurement]);

  // Mark as loaded when content is ready
  useEffect(() => {
    if (isImageLoaded && loadingState.content !== 'loaded') {
      setTimeout(() => {
        setIsLoaded(true);
        onContentLoaded();
      }, 300);
    }
  }, [isImageLoaded, loadingState.content, onContentLoaded]);

  return (
    <article
      ref={cardRef}
      className={`${slideClasses} ${skeletonClasses}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={isActive ? 0 : -1}
      role="button"
      aria-label={`Testimonio de ${testimonial.name}`}
      aria-describedby={`testimonial-${index}-content`}
      style={{
        animationDelay: deviceInfo.reducedMotion ? '0ms' : `${loadingState.delay}ms`
      }}
    >
      {/* Skeleton Loading */}
      {!isLoaded && (
        <div className="testimonial-skeleton">
          <div className="testimonial-skeleton__text">
            <div className="testimonial-skeleton__line testimonial-skeleton__line--long"></div>
            <div className="testimonial-skeleton__line testimonial-skeleton__line--medium"></div>
            <div className="testimonial-skeleton__line testimonial-skeleton__line--short"></div>
          </div>
          <div className="testimonial-skeleton__footer">
            <div className="testimonial-skeleton__avatar"></div>
            <div className="testimonial-skeleton__info">
              <div className="testimonial-skeleton__name"></div>
              <div className="testimonial-skeleton__role"></div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonial Content */}
      <div className={`testimonial-content ${isLoaded ? 'testimonial-content--loaded' : ''}`}>
        {/* Quote Text */}
        <div 
          ref={textRef}
          className="testimonial-content__text"
          id={`testimonial-${index}-content`}
        >
          <blockquote 
            className="testimonial-content__quote"
            style={textScaling.style}
          >
            {testimonial.text}
          </blockquote>
          
          {textScaling.isOverflowing && (
            <div className="testimonial-content__overflow-indicator" aria-hidden="true">
              <span>...</span>
            </div>
          )}
        </div>

        {/* Customer Info */}
        <footer className="testimonial-content__footer">
          {/* Avatar */}
          <div className="testimonial-content__avatar-container">
            {isImageLoaded ? (
              <img
                src={testimonial.image}
                alt={`Foto de ${testimonial.name}`}
                className="testimonial-content__avatar"
                onLoad={handleImageLoad}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="testimonial-content__avatar-placeholder">
                <div className="testimonial-content__avatar-spinner"></div>
              </div>
            )}
          </div>

          {/* Customer Details */}
          <div className="testimonial-content__info">
            <h3 className="testimonial-content__name">
              {testimonial.name}
            </h3>
            <p className="testimonial-content__role">
              {testimonial.role}
            </p>
            
            {/* Rating Stars */}
            <div 
              ref={ratingStars.containerRef}
              className="testimonial-content__rating"
              style={ratingStars.containerStyle}
              aria-label={`Calificación: ${testimonial.rating} de 5 estrellas`}
            >
              {[...Array(5)].map((_, starIndex) => (
                <Star
                  key={starIndex}
                  className={`testimonial-content__star ${
                    starIndex < testimonial.rating ? 'testimonial-content__star--filled' : ''
                  }`}
                  style={ratingStars.getStarStyle(starIndex)}
                  fill={starIndex < testimonial.rating ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
              ))}
              <span className="testimonial-content__rating-text sr-only">
                {testimonial.rating} de 5 estrellas
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Focus Ring */}
      <div className="testimonial-content__focus-ring" aria-hidden="true"></div>
    </article>
  );
};

export default TestimonialsSection;