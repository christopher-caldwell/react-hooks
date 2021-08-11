import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useGoogleAnalytics } from './useGoogleAnalytics'

/** Next.js specific Google analytics hooks */
export const useNextGoogleAnalytics = (analyticsId: string) => {
  const router = useRouter()
  const { logAnalyticsEvent, logAnalyticsPageView } = useGoogleAnalytics(analyticsId)

  /** Logs the route change within Google Analytics. Does nothing while locally running */
  const handleRouteChange = useCallback(
    (url: string) => {
      logAnalyticsPageView(url)
    },
    [logAnalyticsPageView]
  )

  useEffect(() => {
    if (!router) {
      console.log('nope')
      return
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router, analyticsId, handleRouteChange])

  return { logAnalyticsEvent }
}
