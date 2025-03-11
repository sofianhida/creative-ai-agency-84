
import * as React from "react"

// Using more precise breakpoints to match our responsive design requirements
const MOBILE_BREAKPOINT = 768   // MD breakpoint
const TABLET_BREAKPOINT = 1024  // LG breakpoint
const DESKTOP_BREAKPOINT = 1280 // XL breakpoint

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Use more modern approach with addEventListener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", handleResize)
    
    // Initial check
    handleResize()
    
    return () => mql.removeEventListener("change", handleResize)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= MOBILE_BREAKPOINT && window.innerWidth < TABLET_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    mql.addEventListener("change", handleResize)
    
    // Initial check
    handleResize()
    
    return () => mql.removeEventListener("change", handleResize)
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= TABLET_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)
    mql.addEventListener("change", handleResize)
    
    // Initial check
    handleResize()
    
    return () => mql.removeEventListener("change", handleResize)
  }, [])

  return !!isDesktop
}

export function useIsLargeDesktop() {
  const [isLargeDesktop, setIsLargeDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }
    
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    mql.addEventListener("change", handleResize)
    
    // Initial check
    handleResize()
    
    return () => mql.removeEventListener("change", handleResize)
  }, [])

  return !!isLargeDesktop
}

// Add new hook for dynamic responsive values
export function useResponsiveValue<T>(
  mobileValue: T,
  tabletValue: T,
  desktopValue: T,
  largeDesktopValue?: T
): T {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLargeDesktop = useIsLargeDesktop();
  
  if (isMobile) return mobileValue;
  if (isTablet) return tabletValue;
  if (isLargeDesktop && largeDesktopValue !== undefined) return largeDesktopValue;
  return desktopValue;
}
