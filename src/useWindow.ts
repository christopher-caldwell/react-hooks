import { useState, useEffect } from 'react'

export const useWindow = () => {
  const initialWindow = typeof window !== 'undefined' ? ({} as Window) : window
  const [localWindow, setLocalWindow] = useState<Window>(initialWindow)
  useEffect(() => {
    if (window) setLocalWindow(window)
  }, [])

  const isMobile = (window && window.innerWidth <= 600) || false

  return { localWindow, isMobile }
}
