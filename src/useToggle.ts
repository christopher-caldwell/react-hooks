/**
 * @source https://usehooks.com/useToggle/
 */

import { useCallback, useState } from 'react'

export const useToggle = (isInitiallyToggled: boolean = false) => {
  const [isToggled, setIsToggled] = useState<boolean>(isInitiallyToggled)

  const toggle = useCallback(() => setIsToggled(isCurrentlyToggled => !isCurrentlyToggled), [])
  return [isToggled, toggle]
}
