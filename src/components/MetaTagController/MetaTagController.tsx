import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const MetaTagController = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof document === 'undefined') return

    const params = new URLSearchParams(location.search)
    const shouldNoIndex = params.has('ref') || params.get('noindex') === 'true'

    let existingMeta = document.querySelector("meta[name='robots']") as HTMLMetaElement | null

    if (shouldNoIndex) {
      if (existingMeta) {
        existingMeta.setAttribute('content', 'noindex, follow')
      } else {
        existingMeta = document.createElement('meta')
        existingMeta.name = 'robots'
        existingMeta.content = 'noindex, follow'
        document.head.appendChild(existingMeta)
      }
    } else {
      if (existingMeta) {
        existingMeta.setAttribute('content', 'index, follow')
      }
    }
  }, [location])

  return null
}

export default MetaTagController
