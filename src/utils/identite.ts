/** Adresse publique du site, sans barre oblique finale. */
export const SITE_URL = 'https://marie-emeraude.com'

/**
 * Identifiant stable de Marie-Émeraude Alcime dans les données structurées.
 * Le balisage Person de `SEO.tsx` le déclare, celui des concerts de l'agenda
 * y renvoie comme interprète : Google relie ainsi chaque concert à la personne.
 */
export const PERSON_ID = `${SITE_URL}/#marie-emeraude-alcime`
