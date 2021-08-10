/**
 * @source https://usehooks.com/useLocalStorage/
 */

import { useState, useCallback } from 'react'

import { useWindow } from './useWindow'

export const useLocalStorage = <T>(key: string, initialValue: T, shouldLogErrors?: boolean) => {
  const { localWindow } = useWindow()

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localWindow.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      shouldLogErrors && console.error('[useLocalStorageError]:', error)
      return initialValue
    }
  })

  /** Sets given value to local storage, and syncs the state value  */
  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        shouldLogErrors && console.error('[useLocalStorageError]:', error)
      }
    },
    [key, shouldLogErrors]
  )

  return [storedValue, setValue]
}
