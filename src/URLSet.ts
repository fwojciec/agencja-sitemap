class URLSet {
  public urls: string[]
  public changeFreq: ChangeFreq
  public priority: number
  public languages: Language[]

  constructor(props: URLSetProps) {
    this.urls = props.urls
    this.changeFreq = props.changeFreq || 'monthly'
    this.priority = props.priority || 0.5
    this.languages = props.languages || ['en', 'pl']
  }

  public generateLanguageUrls = (lang: Language): SitemapUrl[] =>
    this.urls.map(url => ({
      url: `/${lang}${url}`,
      changefreq: this.changeFreq,
      priority: this.priority,
      links: this.generateLinks(url)
    }))

  public generateUrls = (): SitemapUrl[] =>
    this.languages.reduce(
      (acc: SitemapUrl[], lang: Language) => [
        ...acc,
        ...this.generateLanguageUrls(lang)
      ],
      []
    )

  private generateLinks = (url: string): Link[] =>
    this.languages.map(lang => ({ lang, url: `/${lang}${url}` }))
}

export default URLSet
