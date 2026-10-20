
import { useEffect, useState } from 'react';

function getScreenSize() {
  if (typeof window === 'undefined') return 'desktop';

  if (window.matchMedia('(max-width: 767px)').matches) {
    return 'mobile';
  }

  if (window.matchMedia('(max-width: 1023px)').matches) {
    return 'tablet';
  }

  return 'desktop';
}

export function useResponsive() {
  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const tabletQuery = window.matchMedia('(max-width: 1023px)');

    function updateScreenSize() {
      setScreenSize(getScreenSize());
    }

    mobileQuery.addEventListener('change', updateScreenSize);
    tabletQuery.addEventListener('change', updateScreenSize);

    updateScreenSize();

    return () => {
      mobileQuery.removeEventListener('change', updateScreenSize);
      tabletQuery.removeEventListener('change', updateScreenSize);
    };
  }, []);

  return {
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop',
  };
}

export default useResponsive;
