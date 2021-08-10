import { useEffect } from 'react'
import ReactGA, { TrackerNames } from 'react-ga'

export const useRegisterPageView = (url: string, title?: string, trackerNames?: TrackerNames | undefined) => {
  useEffect(() => {
    ReactGA.pageview(url, trackerNames, title)
  }, [title, trackerNames, url])
}
