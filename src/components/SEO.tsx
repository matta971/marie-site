import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://marie-site.pages.dev'
const SITE_NAME = 'Marie-Émeraude Alcime'
const DEFAULT_IMAGE = `${SITE_URL}/images/portrait-face-main-buste.jpg`

// Map route paths to SEO translation keys
const routeSeoMap: Record<string, { titleKey: string; descKey: string }> = {
  '/': { titleKey: 'seo.homeTitle', descKey: 'seo.homeDesc' },
  '/biographie': { titleKey: 'seo.biographyTitle', descKey: 'seo.biographyDesc' },
  '/repertoire': { titleKey: 'seo.repertoireTitle', descKey: 'seo.repertoireDesc' },
  '/enseignement': { titleKey: 'seo.servicesTitle', descKey: 'seo.servicesDesc' },
  '/agenda': { titleKey: 'seo.agendaTitle', descKey: 'seo.agendaDesc' },
  '/presse': { titleKey: 'seo.pressTitle', descKey: 'seo.pressDesc' },
  '/medias': { titleKey: 'seo.mediaTitle', descKey: 'seo.mediaDesc' },
  '/contact': { titleKey: 'seo.contactTitle', descKey: 'seo.contactDesc' },
}

export default function SEO() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lang = i18n.language

  const seo = routeSeoMap[pathname] || routeSeoMap['/']
  const title = t(seo.titleKey)
  const description = t(seo.descKey)
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`

  return (
    <Helmet>
      {/* Base */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />
      <meta property="og:locale" content={lang} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Marie-Émeraude Alcime',
          url: SITE_URL,
          image: DEFAULT_IMAGE,
          jobTitle: 'Mezzo-soprano',
          description: 'Mezzo-soprano lyrique originaire de Guadeloupe, spécialisée en opéra, oratorio et musique sacrée.',
          knowsAbout: ['Opera', 'Oratorio', 'Sacred Music', 'French Art Song', 'Vocal Pedagogy'],
          performerIn: {
            '@type': 'EventSeries',
            name: 'Concerts et Récitals',
          },
          sameAs: [],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Mezzo-soprano',
            occupationLocation: { '@type': 'Country', name: 'France' },
          },
        })}
      </script>

      {pathname === '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: t('seo.homeDesc'),
            inLanguage: ['fr', 'en', 'de', 'it', 'es', 'pt', 'ru'],
          })}
        </script>
      )}
    </Helmet>
  )
}
