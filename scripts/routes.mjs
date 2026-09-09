/**
 * Les routes publiques du site, source unique pour le prérendu et le sitemap.
 *
 * Ces deux scripts lisaient auparavant `public/sitemap.xml`, ce qui interdisait
 * de le générer sans créer une dépendance circulaire. Les déclarer ici évite
 * surtout qu'ils divergent : une route ajoutée est prérendue *et* déclarée aux
 * moteurs, ou ni l'un ni l'autre.
 *
 * `/admin` n'y figure pas volontairement : la page est interdite aux robots
 * dans `public/robots.txt` et n'a pas à être prérendue.
 *
 * `sources` sert au calcul du `lastmod` : ce sont les fichiers dont une
 * modification change ce que la page affiche.
 */

export const SITE_URL = 'https://marie-emeraude.com'

/** Fichiers qui influent sur toutes les pages : mise en page, styles, traductions. */
export const SOURCES_COMMUNES = [
  'src/App.tsx',
  'src/components/Header.tsx',
  'src/components/Footer.tsx',
  'src/components/SEO.tsx',
  'src/index.css',
  'src/i18n/locales',
]

/**
 * `notion` liste les routes de l'API dont la page tire son contenu. Le
 * générateur de sitemap y lit le `lastEdited` des entrées : sans cela, un
 * concert ajouté dans Notion sans le moindre changement de code laissait le
 * `lastmod` de /agenda inchangé, alors que la page change au build suivant.
 *
 * /enseignement n'a pas de source : la page n'est pas encore branchée sur
 * Notion (issues #1 et #2).
 */
export const ROUTES = [
  // L'accueil appelle bien /api/homepage, mais cette route n'existe pas côté
  // Worker : le service se rabat sur son contenu statique. Seuls les médias
  // qu'il affiche viennent donc réellement de Notion.
  { chemin: '/', sources: ['src/pages/Home.tsx', 'src/services/homePageService.ts'], notion: ['medias'], priorite: '1.0', frequence: 'weekly' },
  { chemin: '/biographie', sources: ['src/pages/Biographie.tsx', 'src/services/biographyService.ts'], notion: ['biography'], priorite: '0.9', frequence: 'monthly' },
  { chemin: '/repertoire', sources: ['src/pages/Repertoire.tsx'], notion: ['repertoire'], priorite: '0.8', frequence: 'monthly' },
  { chemin: '/enseignement', sources: ['src/pages/Enseignement.tsx'], notion: [], priorite: '0.7', frequence: 'monthly' },
  { chemin: '/agenda', sources: ['src/pages/Agenda.tsx'], notion: ['concerts'], priorite: '0.9', frequence: 'weekly' },
  { chemin: '/presse', sources: ['src/pages/Presse.tsx'], notion: ['press'], priorite: '0.7', frequence: 'monthly' },
  { chemin: '/medias', sources: ['src/pages/Medias.tsx'], notion: ['medias'], priorite: '0.8', frequence: 'monthly' },
  { chemin: '/contact', sources: ['src/pages/Contact.tsx', 'src/components/ContactForm.tsx'], notion: [], priorite: '0.6', frequence: 'yearly' },
]

/** Base de l'API interrogée au build pour dater le contenu Notion. */
export const API_URL = 'https://backend-site-marie-emeraude.matta971.workers.dev/api'

/** URL absolue d'une route, sans barre oblique finale hormis la racine. */
export function urlComplete(chemin) {
  return chemin === '/' ? SITE_URL + '/' : SITE_URL + chemin
}
