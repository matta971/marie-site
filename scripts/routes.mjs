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

export const ROUTES = [
  { chemin: '/', sources: ['src/pages/Home.tsx'], priorite: '1.0', frequence: 'weekly' },
  { chemin: '/biographie', sources: ['src/pages/Biographie.tsx', 'src/services/biographyService.ts'], priorite: '0.9', frequence: 'monthly' },
  { chemin: '/repertoire', sources: ['src/pages/Repertoire.tsx'], priorite: '0.8', frequence: 'monthly' },
  { chemin: '/enseignement', sources: ['src/pages/Enseignement.tsx'], priorite: '0.7', frequence: 'monthly' },
  { chemin: '/agenda', sources: ['src/pages/Agenda.tsx'], priorite: '0.9', frequence: 'weekly' },
  { chemin: '/presse', sources: ['src/pages/Presse.tsx'], priorite: '0.7', frequence: 'monthly' },
  { chemin: '/medias', sources: ['src/pages/Medias.tsx'], priorite: '0.8', frequence: 'monthly' },
  { chemin: '/contact', sources: ['src/pages/Contact.tsx', 'src/components/ContactForm.tsx'], priorite: '0.6', frequence: 'yearly' },
]

/** URL absolue d'une route, sans barre oblique finale hormis la racine. */
export function urlComplete(chemin) {
  return chemin === '/' ? SITE_URL + '/' : SITE_URL + chemin
}
