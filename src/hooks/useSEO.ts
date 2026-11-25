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
  exactTitle?: boolean
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
}

const DEFAULT_IMAGE = 'https://investtcount.mattrmost.com/og/og-image.jpg'
const BASE_URL = 'https://investtcount.mattrmost.com'

export const normalizeCanonicalUrl = (rawPathOrUrl: string): string => {
  if (rawPathOrUrl.startsWith('http')) {
    const parsed = new URL(rawPathOrUrl)
    if (parsed.pathname !== '/' && !parsed.pathname.endsWith('/')) {
      parsed.pathname = `${parsed.pathname}/`
    }
    return parsed.toString()
  }

  const cleanPath = rawPathOrUrl.startsWith('/') ? rawPathOrUrl : `/${rawPathOrUrl}`
  if (cleanPath === '/') return `${BASE_URL}/`
  return `${BASE_URL}${cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`}`
}

export const useSEO = ({
  title,
  description,
  canonicalUrl,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords = [],
  publishedDate,
  author = 'Syubban Fakhriya',
  exactTitle = false,
  schema
}: SEOProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') return

    // 1. Title (keep concise <60 char titles intact when exactTitle is true or >46 chars)
    const formattedTitle =
      exactTitle || title.includes('InvestCount') || title.length > 46
        ? title
        : `${title} | InvestCount`
    document.title = formattedTitle

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

    const setLinkTag = (selector: string, attrs: Record<string, string>) => {
      let element = document.querySelector(selector) as HTMLLinkElement | null
      if (!element) {
        element = document.createElement('link')
        document.head.appendChild(element)
      }
      Object.entries(attrs).forEach(([k, v]) => element!.setAttribute(k, v))
    }

    // 2. Standard Meta Tags
    setMetaTag("meta[name='description']", 'name', 'description', description)
    if (keywords.length > 0) {
      setMetaTag("meta[name='keywords']", 'name', 'keywords', keywords.join(', '))
    }
    setMetaTag("meta[name='author']", 'name', 'author', author)

    // 3. Canonical & Hreflang (trailing-slash normalized to match Cloudflare Pages)
    const currentUrl = normalizeCanonicalUrl(canonicalUrl || window.location.pathname)
    const resolvedImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`

    setLinkTag("link[rel='canonical']", { rel: 'canonical', href: currentUrl })
    setLinkTag("link[rel='alternate'][hreflang='id-ID']", {
      rel: 'alternate',
      hreflang: 'id-ID',
      href: currentUrl
    })
    setLinkTag("link[rel='alternate'][hreflang='x-default']", {
      rel: 'alternate',
      hreflang: 'x-default',
      href: currentUrl
    })

    // 4. Open Graph & Twitter Cards
    setMetaTag("meta[property='og:title']", 'property', 'og:title', formattedTitle)
    setMetaTag("meta[property='og:description']", 'property', 'og:description', description)
    setMetaTag("meta[property='og:url']", 'property', 'og:url', currentUrl)
    setMetaTag("meta[property='og:image']", 'property', 'og:image', resolvedImage)
    setMetaTag("meta[property='og:type']", 'property', 'og:type', ogType)
    setMetaTag("meta[property='og:site_name']", 'property', 'og:site_name', 'InvestCount')
    setMetaTag("meta[property='og:locale']", 'property', 'og:locale', 'id_ID')

    setMetaTag("meta[name='twitter:card']", 'name', 'twitter:card', 'summary_large_image')
    setMetaTag("meta[name='twitter:title']", 'name', 'twitter:title', formattedTitle)
    setMetaTag("meta[name='twitter:description']", 'name', 'twitter:description', description)
    setMetaTag("meta[name='twitter:image']", 'name', 'twitter:image', resolvedImage)

    // 5. Single Deduplicated JSON-LD Schema
    const existingSchemaScript = document.getElementById('dynamic-seo-schema')
    if (existingSchemaScript) {
      existingSchemaScript.remove()
    }

    if (schema) {
      const payload = Array.isArray(schema)
        ? {
            '@context': 'https://schema.org',
            '@graph': schema.map((item) => {
              const copy = { ...item }
              delete copy['@context']
              return copy
            })
          }
        : schema

      const script = document.createElement('script')
      script.id = 'dynamic-seo-schema'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(payload)
      document.head.appendChild(script)
    }
  }, [
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    keywords,
    publishedDate,
    author,
    exactTitle,
    schema
  ])
}
