import { useEffect, useRef } from 'react';

interface UseMobileTableScrollOptions {
  isMobile: boolean;
  dependencies?: any[];
}

export function useMobileTableScroll({
  isMobile,
  dependencies = []
}: UseMobileTableScrollOptions) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile || !tableContainerRef.current) return;

    const tableContainer = tableContainerRef.current;
    
    // Wait for the table to render and find the scroll container
    const findScrollContainer = (): HTMLElement | null => {
      let scrollContainer = tableContainer.querySelector('.ant-table-body') as HTMLElement;
      if (!scrollContainer) {
        // Fallback to the table container itself
        scrollContainer = tableContainer.querySelector('.ant-table-container') as HTMLElement;
      }
      return scrollContainer;
    };

    // Check if main component is at the bottom
    const isMainComponentAtBottom = (): boolean => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Consider "at bottom" when within 50px of the actual bottom
      return (scrollTop + windowHeight) >= (documentHeight - 50);
    };

    // Try to find the scroll container immediately
    let tableScrollContainer = findScrollContainer();
    
    // If not found, try again after a short delay
    if (!tableScrollContainer) {
      const timeout = setTimeout(() => {
        tableScrollContainer = findScrollContainer();
        if (tableScrollContainer) {
          setupEventListeners();
        }
      }, 100);
      
      return () => clearTimeout(timeout);
    }

    const setupEventListeners = () => {
      if (!tableScrollContainer) return;

      let touchStartY = 0;
      let isTableAtTop = true;
      let isMainAtBottom = false;
      let lastTouchMoveTime = 0;
      let scrollMomentum = 0;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        isTableAtTop = tableScrollContainer!.scrollTop <= 0;
        isMainAtBottom = isMainComponentAtBottom();
        lastTouchMoveTime = Date.now();
        scrollMomentum = 0;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!tableScrollContainer) return;
        
        const touchCurrentY = e.touches[0].clientY;
        const touchDeltaY = touchCurrentY - touchStartY;
        const isScrollingUp = touchDeltaY > 0;
        const isScrollingDown = touchDeltaY < 0;
        const currentTableScrollTop = tableScrollContainer.scrollTop;
        const currentTime = Date.now();
        const timeDelta = currentTime - lastTouchMoveTime;
        
        // Calculate momentum for smoother scrolling
        if (timeDelta > 0) {
          scrollMomentum = Math.abs(touchDeltaY) / timeDelta;
        }
        lastTouchMoveTime = currentTime;

        // Update statuses less frequently for performance
        if (timeDelta > 16) { // ~60fps throttling
          isMainAtBottom = isMainComponentAtBottom();
          isTableAtTop = currentTableScrollTop <= 0;
        }

        // Priority 1: If scrolling up and table is at top, always allow main page scroll
        if (isScrollingUp && isTableAtTop) {
          // Don't prevent - let it bubble to main component naturally
          return;
        }

        // Priority 2: If main component is not at bottom, allow main component scroll
        if (!isMainAtBottom) {
          // Let the main component handle the scroll naturally
          return;
        }

        // Priority 3: If main component is at bottom, allow table scrolling
        if (isMainAtBottom) {
          // Only prevent if we're scrolling down or if table has scrollable content
          if (isScrollingDown || (isScrollingUp && currentTableScrollTop > 0)) {
            // Let the browser handle the scroll naturally for smoothness
            // Only stop propagation to prevent double scrolling
            e.stopPropagation();
          }
        }
      };

      const handleScroll = () => {
        if (!tableScrollContainer) return;
        
        // Throttle status updates for better performance
        requestAnimationFrame(() => {
          isTableAtTop = tableScrollContainer!.scrollTop <= 0;
          isMainAtBottom = isMainComponentAtBottom();
        });
      };

      const handleWheel = (e: WheelEvent) => {
        if (!tableScrollContainer) return;
        
        const isScrollingUp = e.deltaY < 0;
        const currentTableScrollTop = tableScrollContainer.scrollTop;
        
        // Update statuses
        isMainAtBottom = isMainComponentAtBottom();
        isTableAtTop = currentTableScrollTop <= 0;

        // If scrolling up and table is at top, allow main page scroll
        if (isScrollingUp && isTableAtTop) {
          return;
        }

        // If main component is not at bottom, prioritize main component scroll
        if (!isMainAtBottom) {
          return;
        }

        // If main component is at bottom, let table handle the scroll naturally
        if (isMainAtBottom) {
          // Only stop propagation, don't prevent default for smooth scrolling
          e.stopPropagation();
        }
      };

      // Add event listeners with optimized passive settings
      tableScrollContainer.addEventListener('touchstart', handleTouchStart, { 
        passive: true,
        capture: false 
      });
      tableScrollContainer.addEventListener('touchmove', handleTouchMove, { 
        passive: false, // Need to prevent default when necessary
        capture: false 
      });
      tableScrollContainer.addEventListener('scroll', handleScroll, { 
        passive: true,
        capture: false 
      });
      tableScrollContainer.addEventListener('wheel', handleWheel, { 
        passive: false, // Need to prevent default when necessary
        capture: false 
      });

      // Also listen to window scroll to update main component status
      const handleWindowScroll = () => {
        // Throttle window scroll updates for performance
        requestAnimationFrame(() => {
          isMainAtBottom = isMainComponentAtBottom();
        });
      };
      
      window.addEventListener('scroll', handleWindowScroll, { 
        passive: true,
        capture: false 
      });

      // Add CSS for smooth scrolling to the table container
      if (tableScrollContainer) {
        const computedStyle = window.getComputedStyle(tableScrollContainer);
        if (!computedStyle.scrollBehavior || computedStyle.scrollBehavior === 'auto') {
          tableScrollContainer.style.scrollBehavior = 'smooth';
        }
        // Use style property directly for webkit properties
        const style = tableScrollContainer.style as any;
        if (!style.webkitOverflowScrolling) {
          style.webkitOverflowScrolling = 'touch';
        }
      }

      return () => {
        if (tableScrollContainer) {
          tableScrollContainer.removeEventListener('touchstart', handleTouchStart);
          tableScrollContainer.removeEventListener('touchmove', handleTouchMove);
          tableScrollContainer.removeEventListener('scroll', handleScroll);
          tableScrollContainer.removeEventListener('wheel', handleWheel);
        }
        window.removeEventListener('scroll', handleWindowScroll);
      };
    };

    return setupEventListeners();
  }, [isMobile, ...dependencies]);

  return tableContainerRef;
}
