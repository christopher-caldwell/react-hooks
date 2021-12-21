/**
 * @source https://usehooks.com/useLocalStorage/
 */

import { useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react'

import { useWindow } from './useWindow'

export const useLocalStorage = <T>(key: string, initialValue: T, shouldLogErrors?: boolean): UseLocalStorage<T> => {
  const { localWindow } = useWindow()
  const isPrimitive = determineIsPrimitive(initialValue)

  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    if (!localWindow?.localStorage) return
    const prevStoredValue = localWindow?.localStorage?.getItem(key)
    if (!prevStoredValue) return
    try {
      setStoredValue(isPrimitive ? prevStoredValue : JSON.parse(prevStoredValue))
    } catch (e) {
      if (shouldLogErrors)
        console.error('[useLocalStorageError] Failed to parse stored value. Attempted to parse:', prevStoredValue)
    }
  }, [localWindow, key, isPrimitive, shouldLogErrors])

  /** Sets given value to local storage, and syncs the state value  */
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        localWindow?.localStorage?.setItem(key, isPrimitive ? (value as unknown as string) : JSON.stringify(value))
      } catch (error) {
        shouldLogErrors && console.error('[useLocalStorageError]:', error)
      }
    },
    [key, shouldLogErrors, localWindow, isPrimitive]
  )

  return [storedValue, setValue]
}

export interface Options {
  shouldLogErrors?: boolean
  isComplex?: boolean
}
export type UseLocalStorage<T> = [T, Dispatch<SetStateAction<T>>]

const determineIsPrimitive = <TData>(val: TData): boolean => {
  if (val === null) return true

  if (typeof val == 'object' || typeof val == 'function') return false
  return true
}
