import { useEffect } from 'react'
import { triggerAnalytics } from '@telus/analytics-scripts'

const useAnalytics = (category, filter, prov, lang) => {
  const pageViewStart = () => {
    if (!window.dataLayer)
      window.dataLayer = {
        page: {
          name: filter ? `/my-telus/session/${category}/${filter}` : `/my-telus/session/${category}`,
          province: prov,
          language: lang,
          brand: 'all',
          type: 'account',
          category: 'my telus'
        }
      }
    triggerAnalytics()
      .then((trigger) => trigger('event-view-start', {}))
      .catch((err) => console.log(err))
  }

  const pageViewEnd = () =>
    triggerAnalytics()
      .then((trigger) => trigger('event-view-end', {}))
      .catch((err) => console.log(err))

  useEffect(() => {
    pageViewStart()
    return () => pageViewEnd()
  }, [])
}

export default useAnalytics
