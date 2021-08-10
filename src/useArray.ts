/**
 * @source https://github.com/kitze/react-hanger/blob/master/src/array/useArray.ts
 */

import { useCallback, useMemo, useState } from 'react'

/** Common array utilities that sync the updates to a state value */
export const useArray = <T>(initial: T[]) => {
  const [value, setValue] = useState(initial)

  const addItemToEnd = useCallback((newItem: T) => {
    setValue(currentValue => [...currentValue, newItem])
  }, [])

  const insertItemIntoBeginning = useCallback(a => setValue(v => [...(Array.isArray(a) ? a : [a]), ...v]), [])
  const removeLastItem = useCallback(() => setValue(v => v.slice(0, -1)), [])
  const removeFirstItem = useCallback(() => setValue(v => v.slice(1)), [])
  const clear = useCallback(() => setValue(() => []), [])

  const move = useCallback(
    (from: number, to: number) =>
      setValue(originalSet => {
        const copy = originalSet.slice()
        copy.splice(to < 0 ? copy.length + to : to, 0, copy.splice(from, 1)[0])
        return copy
      }),
    []
  )

  const removeIndex = useCallback(
    index =>
      setValue(v => {
        const copy = v.slice()
        copy.splice(index, 1)
        return copy
      }),
    []
  )

  const actions = useMemo(
    () => ({
      setValue,
      addItemToEnd,
      insertItemIntoBeginning,
      move,
      clear,
      removeIndex,
      removeLastItem,
      removeFirstItem
    }),
    [addItemToEnd, insertItemIntoBeginning, move, clear, removeIndex, removeLastItem, removeFirstItem]
  )
  return [value, actions]
}
