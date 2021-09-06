/**
 * @source https://usehooks.com/useLocalStorage/
 */

import { useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react'

import { useWindow } from './useWindow'

export const useLocalStorage = <T>(key: string, initialValue: T, shouldLogErrors?: boolean): UseLocalStorage<T> => {
  const { localWindow } = useWindow()
  const isComplex = typeof initialValue !== 'string'

  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    if (!localWindow?.localStorage) return
    const prevStoredValue = localWindow?.localStorage?.getItem(key)
    console.log('prevStoredValue', prevStoredValue)
    if (!prevStoredValue) return
    setStoredValue(isComplex ? JSON.parse(prevStoredValue) : prevStoredValue)
  }, [localWindow, key, isComplex])

  /** Sets given value to local storage, and syncs the state value  */
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        localWindow?.localStorage?.setItem(key, isComplex ? JSON.stringify(value) : (value as unknown as string))
      } catch (error) {
        shouldLogErrors && console.error('[useLocalStorageError]:', error)
      }
    },
    [key, shouldLogErrors, localWindow, isComplex]
  )

  return [storedValue, setValue]
}

export interface Options {
  shouldLogErrors?: boolean
  isComplex?: boolean
}
export type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>]
