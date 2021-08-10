import { useEffect, RefObject } from 'react'

export const useOutsideClick = <ElementOfRef extends HTMLElement>(
  ref: RefObject<ElementOfRef>,
  functionToRunOnClick: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        functionToRunOnClick()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, functionToRunOnClick])

  return ref
}
