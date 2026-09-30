/**
 * Routage de la SPA sur Cloudflare Pages, sans masquer les pages inexistantes.
 *
 * Tant que le site n'avait pas de `404.html`, Pages servait l'application pour
 * toute adresse : une page qui n'existe pas répondait 200, et Google la traite
 * alors comme une « soft 404 ». Ce script corrige cela en deux temps.
 *
 * `node scripts/routage-spa.mjs coquille`, après `vite build` et AVANT le
 * prérendu, qui remplace `dist/index.html` par l'accueil rendu :
 *   - `404.html` : l'application, marquée `noindex`. Pages la sert avec le
 *     statut 404 pour toute adresse inconnue, et React Router y affiche
 *     « Cette page n'existe pas » ;
 *   - `app.html` : l'application vide, cible des réécritures ci-dessous.
 *
 * `node scripts/routage-spa.mjs regles`, APRÈS le prérendu :
 *   - `_redirects` ne réécrit vers l'application que les routes qui n'ont pas
 *     de fichier prérendu, plus `/admin`. Vérifié avec `wrangler pages dev` :
 *     une règle de réécriture passe AVANT les fichiers statiques. Réécrire une
 *     route prérendue servirait donc l'application vide, voire l'accueil prérendu
 *     si la cible était `/`, avec sa balise canonique. La cible est `/app` et
 *     non `/app.html`, que Pages redirige en 308 vers son URL sans extension.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ROUTES } from './routes.mjs'

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const etape = process.argv[2]

if (etape === 'coquille') {
  const coquille = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')
  if (!coquille.includes('<div id="root"></div>')) {
    console.error('routage-spa : dist/index.html n’est pas la coquille vide de l’application, lancer vite build d’abord')
    process.exit(1)
  }
  fs.writeFileSync(path.join(DIST, 'app.html'), coquille, 'utf8')
  fs.writeFileSync(
    path.join(DIST, '404.html'),
    coquille.replace('<head>', '<head>\n    <meta name="robots" content="noindex" />'),
    'utf8'
  )
  console.log('routage-spa : 404.html et app.html écrits')
} else if (etape === 'regles') {
  const nonPrerendues = ROUTES.map(r => r.chemin)
    .filter(c => c !== '/')
    .filter(c => !fs.existsSync(path.join(DIST, `${c.replace(/^\//, '')}.html`)))
  const routes = [...nonPrerendues, '/admin']
  fs.writeFileSync(path.join(DIST, '_redirects'), routes.map(c => `${c}    /app   200`).join('\n') + '\n', 'utf8')
  console.log(`routage-spa : ${routes.length} route(s) réécrite(s) vers l’application : ${routes.join(' ')}`)
} else {
  console.error('routage-spa : préciser l’étape, « coquille » ou « regles »')
  process.exit(1)
}
