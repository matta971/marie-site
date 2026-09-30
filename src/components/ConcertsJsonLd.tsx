import { Helmet } from 'react-helmet-async'
import type { ConcertData } from '../types/notion.types'
import { SITE_URL, PERSON_ID } from '../utils/identite'

/**
 * Balisage schema.org des concerts à venir, un `MusicEvent` par concert.
 *
 * C'est ce que lit Google pour afficher un concert dans ses résultats
 * d'événements (« concert Metz octobre »). Seuls les concerts à venir sont
 * déclarés : un événement passé n'y apparaît plus, et le déclarer n'apporte
 * rien.
 *
 * Les données viennent de Notion telles quelles, sans passer par la
 * traduction automatique : le nom d'un concert ou d'un lieu ne se traduit pas.
 */
export default function ConcertsJsonLd({ concerts }: { concerts: ConcertData[] | null | undefined }) {
  const maintenant = new Date()
  const aVenir = (concerts || []).filter(c => c.display && c.date && new Date(c.date) >= maintenant)
  if (aVenir.length === 0) return null

  const evenements = aVenir.map(c => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: c.title,
    startDate: c.date,
    ...(c.description && { description: c.description }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: c.location || c.ville,
      address: {
        '@type': 'PostalAddress',
        ...(c.ville && { addressLocality: c.ville }),
        addressCountry: 'FR',
      },
    },
    performer: { '@type': 'Person', '@id': PERSON_ID, name: 'Marie-Émeraude Alcime' },
    image: `${SITE_URL}/images/partage-og.jpg`,
    url: `${SITE_URL}/agenda`,
    // Le prix n'est pas une donnée structurée dans Notion : on ne déclare
    // que le lien de réservation plutôt que d'inventer un tarif.
    ...(c.ticketLink && { offers: { '@type': 'Offer', url: c.ticketLink } }),
  }))

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(evenements)}</script>
    </Helmet>
  )
}
