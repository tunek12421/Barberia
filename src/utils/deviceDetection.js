// Device detection utilities for performance optimization

export const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;
  
  return { isMobile, isTablet, isDesktop };
};

export const isLowEndDevice = () => {
  // Check for performance indicators
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const cores = navigator.hardwareConcurrency || 2;
  const memory = navigator.deviceMemory || 2;
  
  // Consider it low-end if:
  // - Less than 4 CPU cores
  // - Less than 2GB RAM
  // - Slow connection
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isLowRAM = memory < 2;
  const isLowCPU = cores < 4;
  
  return isSlowConnection || isLowRAM || isLowCPU;
};

export const supportsAdvancedFeatures = () => {
  // Check for modern CSS and JS features
  const supportsGrid = CSS.supports('display', 'grid');
  const supportsContainerQueries = CSS.supports('container-type', 'inline-size');
  const supportsClamp = CSS.supports('width', 'clamp(1rem, 5vw, 2rem)');
  const supportsDynamicViewport = CSS.supports('height', '100dvh');
  
  return {
    grid: supportsGrid,
    containerQueries: supportsContainerQueries,
    clamp: supportsClamp,
    dynamicViewport: supportsDynamicViewport
  };
};

export const getScreenCategory = () => {
  const width = window.innerWidth;
  
  if (width <= 320) return 'xs-mobile'; // iPhone SE
  if (width <= 480) return 'mobile';
  if (width <= 768) return 'tablet-portrait';
  if (width <= 1024) return 'tablet-landscape';
  if (width <= 1920) return 'desktop';
  if (width <= 2560) return 'large-desktop';
  return 'ultra-wide'; // 4K and beyond
};

export const hasNotch = () => {
  // Check for iPhone X+ notch
  const safeAreaTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')) || 0;
  return safeAreaTop > 20; // Standard status bar is ~20px
};

export const getViewportDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1080, ratio: 1 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    ratio: window.devicePixelRatio || 1
  };
};

export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const canHover = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover)').matches;
};

export const hasPointerFine = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(pointer: fine)').matches;
};