import { useEffect } from 'react'

export interface SEOProps {
  title: string
  description: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  keywords?: string[]
  publishedDate?: string
  author?: string
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

const DEFAULT_IMAGE = 'https://investtcount.mattrmost.com/og/og-image.jpg'
const BASE_URL = 'https://investtcount.mattrmost.com'

export const useSEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords = [],
  publishedDate,
  author = 'Syubban Fakhriya',
  schema
}: SEOProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. Title
    const formattedTitle = title.includes('InvestCount') ? title : `${title} | InvestCount`
    document.title = formattedTitle

    // Helper for meta tags
    const setMetaTag = (
      selector: string,
      attr: 'name' | 'property',
      name: string,
      content: string
    ) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attr, name)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Standard Meta Tags
    setMetaTag("meta[name='description']", 'name', 'description', description)
    if (keywords.length > 0) {
      setMetaTag("meta[name='keywords']", 'name', 'keywords', keywords.join(', '))
    }
    setMetaTag("meta[name='author']", 'name', 'author', author)

    // 3. Open Graph
    const currentUrl = canonicalUrl
      ? canonicalUrl.startsWith('http')
        ? canonicalUrl
        : `${BASE_URL}${canonicalUrl}`
      : `${BASE_URL}${window.location.pathname}`

    const resolvedImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`

    setMetaTag("meta[property='og:title']", 'property', 'og:title', formattedTitle)
    setMetaTag("meta[property='og:description']", 'property', 'og:description', description)
    setMetaTag("meta[property='og:url']", 'property', 'og:url', currentUrl)
    setMetaTag("meta[property='og:image']", 'property', 'og:image', resolvedImage)
    setMetaTag("meta[property='og:type']", 'property', 'og:type', ogType)
    setMetaTag("meta[property='og:site_name']", 'property', 'og:site_name', 'InvestCount')
    setMetaTag("meta[property='og:locale']", 'property', 'og:locale', 'id_ID')

    // 4. Twitter Cards
    setMetaTag("meta[name='twitter:card']", 'name', 'twitter:card', 'summary_large_image')
    setMetaTag("meta[name='twitter:title']", 'name', 'twitter:title', formattedTitle)
    setMetaTag("meta[name='twitter:description']", 'name', 'twitter:description', description)
    setMetaTag("meta[name='twitter:image']", 'name', 'twitter:image', resolvedImage)

    // 5. Canonical URL
    let canonicalTag = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }
    canonicalTag.setAttribute('href', currentUrl)

    // 6. JSON-LD Schema
    const existingSchemaScript = document.getElementById('dynamic-seo-schema')
    if (existingSchemaScript) {
      existingSchemaScript.remove()
    }

    if (schema) {
      const script = document.createElement('script')
      script.id = 'dynamic-seo-schema'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, canonicalUrl, ogImage, ogType, keywords, publishedDate, author, schema])
}
