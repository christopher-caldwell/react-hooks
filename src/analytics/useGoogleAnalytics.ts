import { useEffect } from 'react'

const isRunningLocally = process.env.NODE_ENV !== 'production'
console.log('isRunningLocally', isRunningLocally)

/** Creates the script tag that loads Google Analytics. Exposes 2 functions that can log analytics events */
export const useGoogleAnalytics = (id: string) => {
  if (!id) {
    throw new Error('Must provide id')
  }

  useEffect(() => {
    if (!window.gtag) return
    window.dataLayer = window.dataLayer || []

    window.gtag('js', new Date())

    window.gtag('config', id, {
      anonymize_ip: true,
      cookie_expires: 0
    })
  }, [id])

  return {
    logAnalyticsEvent,
    logAnalyticsPageView: (url: string) => logAnalyticsPageView(url, id)
  }
}

declare global {
  interface Window {
    dataLayer: IArguments[]
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const logAnalyticsPageView = (url: string, analyticsId: string) => {
  if (isRunningLocally) return
  if (!window.gtag) console.error('G Tag is not truthy')
  window.gtag('config', analyticsId, {
    page_path: url
  })
}

/** Function used to log specified events configured in the Google Analytics console */
export const logAnalyticsEvent = ({ action, category, label, value }: GTagEvent) => {
  if (isRunningLocally) return
  if (!window.gtag) console.error('G Tag is not truthy')
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  })
}

export interface GTagEvent {
  action: string
  category?: string
  label?: string
  value?: string
}
