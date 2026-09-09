/**
 * Génère `dist/sitemap.xml` avec un `lastmod` daté du contenu réel.
 *
 * Le fichier livré jusqu'ici était écrit à la main et figé au 2026-03-12 pour
 * les huit pages, alors que le site avait changé bien après. Un `lastmod`
 * uniforme et périmé n'est pas neutre : Google apprend à ne plus s'y fier et
 * finit par ignorer le champ.
 *
 * La date d'une page est la plus récente de deux sources :
 *
 *   - le dernier commit ayant touché l'un de ses fichiers — la page elle-même,
 *     plus la mise en page, les styles et les traductions, qui l'affectent
 *     toutes ;
 *   - le `lastEdited` du contenu Notion qu'elle affiche, interrogé au build.
 *
 * La seconde compte parce que Marie modifie Notion sans qu'aucun fichier ne
 * bouge : un concert ajouté laissait sinon /agenda daté du dernier changement
 * de code, alors que la page change bel et bien au build suivant.
 *
 * Le script ne fait échouer aucun build. Si git est indisponible — Cloudflare
 * Pages peut cloner sans historique — ou si l'API ne répond pas, il se rabat
 * sur ce qui reste, et en dernier recours sur la date du build, en le signalant
 * dans sa sortie.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { ROUTES, SOURCES_COMMUNES, urlComplete, API_URL } from './routes.mjs'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(RACINE, 'dist')

/** Date du dernier commit touchant un chemin, ou null. */
function dateDernierCommit(chemin) {
  try {
    const sortie = execFileSync('git', ['log', '-1', '--format=%cI', '--', chemin], {
      cwd: RACINE,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return sortie || null
  } catch {
    return null
  }
}

/** AAAA-MM-JJ, le format que Google recommande pour un sitemap. */
function enJour(iso) {
  return iso.slice(0, 10)
}

/**
 * Date de dernière modification du contenu Notion servi par une route de l'API.
 *
 * Les bases exposent `lastEdited` par entrée depuis la version f48e47a2 du
 * Worker ; la biographie, elle, rend des blocs Notion bruts, qui portent
 * chacun `last_edited_time`. On prend la plus récente des deux formes.
 *
 * Le réseau n'est pas une raison de faire échouer un build : toute erreur rend
 * null, et la route retombe sur sa date git.
 */
async function dateContenuNotion(nom) {
  try {
    const reponse = await fetch(`${API_URL}/${nom}`, { signal: AbortSignal.timeout(15000) })
    if (!reponse.ok) return null

    const donnees = await reponse.json()
    const entrees = Array.isArray(donnees) ? donnees : (donnees.blocks ?? [])
    const dates = entrees
      .map(e => e.lastEdited ?? e.last_edited_time)
      .filter(d => typeof d === 'string' && d)
      .sort()

    return dates.length ? dates[dates.length - 1] : null
  } catch {
    return null
  }
}

function echapper(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

async function main() {
  if (!fs.existsSync(DIST)) {
    console.error('sitemap : dist/ absent, lancer vite build d’abord')
    process.exit(1)
  }

  const aujourdhui = new Date().toISOString()
  let gitDisponible = dateDernierCommit('.') !== null

  const lignes = []
  const journal = []

  for (const route of ROUTES) {
    let plusRecente = null
    let origine = ''

    if (gitDisponible) {
      for (const source of [...route.sources, ...SOURCES_COMMUNES]) {
        const d = dateDernierCommit(source)
        if (d && (plusRecente === null || d > plusRecente)) {
          plusRecente = d
          origine = 'code'
        }
      }
    }

    // Le contenu Notion change sans qu'aucun fichier ne bouge : une page peut
    // donc être plus récente que son code.
    for (const nom of route.notion ?? []) {
      const d = await dateContenuNotion(nom)
      if (d && (plusRecente === null || d > plusRecente)) {
        plusRecente = d
        origine = 'notion:' + nom
      }
    }

    // Sans historique ni contenu daté, la date du build reste plus honnête
    // qu'une date figée à la main.
    const lastmod = enJour(plusRecente ?? aujourdhui)
    journal.push(`  ${route.chemin.padEnd(14)} ${lastmod}  ${plusRecente ? origine : 'date du build'}`)

    lignes.push(
      '  <url>',
      `    <loc>${echapper(urlComplete(route.chemin))}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${route.frequence}</changefreq>`,
      `    <priority>${route.priorite}</priority>`,
      '  </url>'
    )
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...lignes,
    '</urlset>',
    '',
  ].join('\n')

  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8')

  console.log(`\nsitemap : ${ROUTES.length} URL écrites${gitDisponible ? '' : ' (git indisponible, dates du build)'}`)
  journal.forEach(l => console.log(l))
}

main()
