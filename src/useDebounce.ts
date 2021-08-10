import { useState, useEffect } from 'react'

/** Debounceses the update of the statue value
 * @argument {string | number | boolean} value
 * @argument {number} delayInMs
 */
export const useDebounce = <TData>(value: TData, delayInMs: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // Update debounced value after delayInMs
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayInMs)
    // Cancel the timeout if value changes (also on delayInMs change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delayInMs period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delayInMs])
  return debouncedValue
}
