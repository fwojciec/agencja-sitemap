import sm from 'sitemap'
import fs from 'fs'
import axios from 'axios'
import URLSet from './urlSet'

const staticPages = [
  '',
  '/authors',
  '/clients',
  '/mailing-list',
  '/about-us',
  '/contact'
]

const getClientPages = (): Promise<string[]> =>
  axios
    .get('https://api.graalagency.com/api/clients')
    .then(clients =>
      clients.data.map((client: EntityWithSlug) => `/clients/${client.slug}`)
    )

const getAgentPages = (): Promise<string[]> =>
  axios
    .get('https://api.graalagency.com/api/authors')
    .then(authors =>
      authors.data.map((author: EntityWithSlug) => `/authors/${author.slug}`)
    )

const generateSitemap = (urls: SitemapUrl[]): string => {
  const sitemap = sm.createSitemap({
    hostname: 'http://graalagency.com',
    cacheTime: 600000,
    urls
  })

  return sitemap.toString()
}

const main = async () => {
  try {
    const [clientPages, authorPages] = await Promise.all([
      getClientPages(),
      getAgentPages()
    ])

    const staticUrlSet = new URLSet({
      urls: staticPages,
      changeFreq: 'monthly',
      priority: 0.5
    })

    const clientUrlSet = new URLSet({
      urls: clientPages,
      changeFreq: 'weekly',
      priority: 0.7
    })

    const authorUrlSet = new URLSet({
      urls: authorPages,
      changeFreq: 'weekly',
      priority: 0.7
    })

    const sitemap = generateSitemap([
      ...staticUrlSet.generateLanguageUrls('en'),
      ...authorUrlSet.generateLanguageUrls('en'),
      ...clientUrlSet.generateLanguageUrls('en'),
      ...staticUrlSet.generateLanguageUrls('pl'),
      ...authorUrlSet.generateLanguageUrls('pl'),
      ...clientUrlSet.generateLanguageUrls('pl')
    ])

    fs.writeFile('sitemap.xml', sitemap.toString(), err => {
      if (err) {
        throw new Error(err.message)
      }
      console.log('File saved successfully')
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

main()
