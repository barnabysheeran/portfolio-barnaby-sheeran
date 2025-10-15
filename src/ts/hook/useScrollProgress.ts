import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setScrollProgress(Math.min(scrollPercent, 1)); // Clamp to 1
    };

    // Update on mount
    updateScrollProgress();

    // Add event listener
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    // Cleanup
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return scrollProgress; // Returns 0-1 (0% to 100%)
}
