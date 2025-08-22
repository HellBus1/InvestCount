import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const MetaTagController = () => {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const hasRef = params.has('ref')

    const existingMeta = document.querySelector("meta[name='robots']")

    if (hasRef) {
      if (existingMeta) {
        existingMeta.setAttribute('content', 'noindex, follow')
      } else {
        const meta = document.createElement('meta')
        meta.name = 'robots'
        meta.content = 'noindex, follow'
        document.head.appendChild(meta)
      }
    } else {
      // If ref param is not present, optionally reset or remove the tag
      if (existingMeta) {
        existingMeta.setAttribute('content', 'index, follow')
      }
    }
  }, [location])

  return null
}

export default MetaTagController
