import { useEffect, useState } from "react";

export const MOBILE_BREAKPOINT = 850;

/**
 * Hook to detect if the current screen size is mobile
 * @returns boolean indicating if the screen is mobile size
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        // Handle SSR - return false initially
        if (typeof window === "undefined") {
            return;
        }

        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

        const onChange = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, []);

    return isMobile;
}