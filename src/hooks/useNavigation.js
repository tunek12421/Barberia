import { useState, useEffect, useCallback, useRef } from 'react';

export const useNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Update scroll state
    setIsScrolled(currentScrollY > 50);
    
    // Determine scroll direction using ref
    if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
      setScrollDirection('down');
    } else {
      setScrollDirection('up');
    }
    
    lastScrollYRef.current = currentScrollY;
  }, []); // Stable callback with no dependencies

  useEffect(() => {
    let timeoutId = null;
    
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = requestAnimationFrame(() => {
          handleScroll();
          timeoutId = null;
        });
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const navHeight = document.querySelector('.navigation')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight - 20; // 20px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    isScrolled,
    scrollDirection,
    scrollToSection
  };
};