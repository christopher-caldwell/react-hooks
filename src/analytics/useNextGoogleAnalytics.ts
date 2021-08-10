import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGoogleAnalytics } from './useGoogleAnalytics'

const isRunningLocally = process.env.NODE_ENV !== 'production'

/** Next.js specific Google analytics hooks */
export const useNextGoogleAnalytics = (analyticsId: string) => {
  const { logAnalyticsEvent, logAnalyticsPageView } = useGoogleAnalytics(analyticsId)
  const router = useRouter()

  /** Logs the route change within Google Analytics. Does nothing while locally running */
  const handleRouteChange = useCallback(
    (url: string) => {
      if (!isRunningLocally) logAnalyticsPageView(url)
    },
    [logAnalyticsPageView]
  )

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, analyticsId, handleRouteChange])

  return { logAnalyticsEvent }
}
