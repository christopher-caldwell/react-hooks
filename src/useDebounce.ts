/**
 * @source https://usehooks.com/useDebounce/
 */

import { useState, useEffect } from 'react'

/** This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value when the useDebounce hook has not been called for the specified time period.
 */
export const useDebounce = <TData>(value: TData, delayInMs: number) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    // Update debounced value after delayInMs
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayInMs)
    // Cancel the timeout if value changes (also on delayInMs change or un-mount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delayInMs period. Timeout gets cleared and restarted.
    return () => {
      clearTimeout(handler)
    }
  }, [value, delayInMs])
  return debouncedValue
}
