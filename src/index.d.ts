type Language = 'en' | 'pl'

type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

interface URLSetProps {
  urls: string[]
  changeFreq?: ChangeFreq
  priority?: number
  languages?: Language[]
}

interface Link {
  lang: Language
  url: string
}

interface SitemapUrl {
  url: string
  changefreq: ChangeFreq
  priority: number
  links: Link[]
}

interface EntityWithSlug {
  slug: string
}
