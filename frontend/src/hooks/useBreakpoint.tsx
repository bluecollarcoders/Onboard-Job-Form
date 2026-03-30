import { useState, useEffect } from "react";

interface BreakpointState {
    // Primary breakpoints.
    isMobile: boolean, // < 768px
    isTablet: boolean, //768px - 1023
    isDesktop: boolean // 1024

    // Layout-specific helpers.
    isNarrowDesktop: boolean,      // 768px - 1023px (auto-collapse zone)
    shouldCollapseSidebar: boolean, // Auto-collapse logic
    shouldShowBottomNav: boolean // Mobile navigation trigger

    // Debug info.
    width: number
}

export const useBreakpoint = (): BreakpointState => {
    const [breakpoint, setBreakpoint] = useState<BreakpointState>(() => {
        
        // Handle SSR/intial render safely.
        if (typeof window === 'undefined') {
            return {
                width: 1024,
                isMobile: false,
                isTablet: false,
                isDesktop: true,
                isNarrowDesktop: false,
                shouldCollapseSidebar: false,
                shouldShowBottomNav: false
            }
        }
        const width = window.innerWidth
        return calculateBreakpoint(width);
    });

    useEffect(() => {
        let timeoutId:  ReturnType<typeof setTimeout>;

        const handleResize = () => {
            // Debounce resize events to prevent excessive re-renders.
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                const width = window.innerWidth
                setBreakpoint(calculateBreakpoint(width))
            }, 100)
        }

        // Use passive lisener for better scroll performance.
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            clearTimeout(timeoutId)
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    return breakpoint;
}

// Pure function to calculate breakpoint state. 
function calculateBreakpoint(width: number): BreakpointState {
    const isMobile = width < 768
    const isTablet = width >= 768 && width < 1024
    const isDesktop = width >= 1024
    const isNarrowDesktop = width >= 768 && width < 1024

    return {
        width,
        isMobile,
        isTablet,
        isDesktop,
        isNarrowDesktop,

        // mobile-first layout logic.
        shouldCollapseSidebar: isNarrowDesktop, // Auto-collapse to protect kanban space
        shouldShowBottomNav: isMobile          // Bottom nav for thumb-friendly mobile
    }
}
