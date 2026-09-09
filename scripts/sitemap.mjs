/**
 * Génère `dist/sitemap.xml` avec un `lastmod` daté du contenu réel.
 *
 * Le fichier livré jusqu'ici était écrit à la main et figé au 2026-03-12 pour
 * les huit pages, alors que le site avait changé bien après. Un `lastmod`
 * uniforme et périmé n'est pas neutre : Google apprend à ne plus s'y fier et
 * finit par ignorer le champ.
 *
 * La date retenue pour une page est celle du dernier commit ayant touché l'un
 * de ses fichiers sources — la page elle-même, plus la mise en page, les styles
 * et les traductions, qui l'affectent toutes. C'est une date vérifiable, et
 * elle ne bouge que lorsque la page change vraiment.
 *
 * Limite connue et assumée : le contenu venant de Notion n'entre pas dans ce
 * calcul. Si Marie ajoute un concert sans qu'aucun fichier ne change, le
 * `lastmod` de /agenda reste celui du dernier changement de code. La corriger
 * demanderait que le Worker expose le `last_edited_time` des pages Notion.
 *
 * Si git est indisponible — Cloudflare Pages peut cloner sans historique — le
 * script se rabat sur la date du build plutôt que d'échouer, et le signale.
 */
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { ROUTES, SOURCES_COMMUNES, urlComplete } from './routes.mjs'

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

function echapper(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function main() {
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

    if (gitDisponible) {
      for (const source of [...route.sources, ...SOURCES_COMMUNES]) {
        const d = dateDernierCommit(source)
        if (d && (plusRecente === null || d > plusRecente)) plusRecente = d
      }
    }

    // Sans historique, ou pour une source jamais commitée, la date du build
    // reste plus honnête qu'une date figée à la main.
    const lastmod = enJour(plusRecente ?? aujourdhui)
    journal.push(`  ${route.chemin.padEnd(14)} ${lastmod}${plusRecente ? '' : '  (date du build)'}`)

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
