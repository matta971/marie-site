/**
 * Prérendu des routes publiques après `vite build`.
 *
 * Le site est une SPA : toutes les routes servent le même HTML, dont le corps
 * est vide et dont les balises meta sont celles de l'accueil. Les vraies meta
 * n'arrivent qu'une fois React et react-helmet-async exécutés, ce que ne font
 * ni Facebook, ni LinkedIn, ni WhatsApp — partager la page d'un concert affiche
 * donc le titre et le portrait de l'accueil.
 *
 * Ce script sert `dist/`, visite chaque route dans un Chromium, et réécrit le
 * HTML une fois la page rendue. Il ne remplace pas un vrai générateur statique
 * (voir l'issue #5, migration Astro) : c'est un correctif de transition, et il
 * ne traite que le français.
 *
 * Deux principes de sûreté :
 *
 *   - **il ne casse jamais le déploiement.** Si Chromium ne démarre pas, le
 *     script renonce et sort en succès : le site reste la SPA d'aujourd'hui ;
 *   - **il n'écrit rien dont il ne soit sûr.** Chaque page passe des contrôles
 *     (titre personnalisé, contenu réel, rendu stabilisé) et une page douteuse
 *     est laissée telle quelle plutôt que figée à moitié rendue.
 */
import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { fileURLToPath } from 'node:url'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(RACINE, 'dist')
const PORT = 4183

/** Longueur minimale du texte rendu en dessous de laquelle on juge la page vide. */
const TEXTE_MINIMAL = 400

/** Titre du gabarit : le retrouver après rendu signale que react-helmet n'a pas pris la main. */
const TITRE_GABARIT = 'Marie-Émeraude Alcime, mezzo-soprano'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

/** Les routes viennent du sitemap, pour qu'il ne puisse pas diverger de ce qui est prérendu. */
function routesDepuisSitemap() {
  const xml = fs.readFileSync(path.join(RACINE, 'public', 'sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)
}

function servirDist() {
  const serveur = http.createServer((req, res) => {
    const chemin = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    let fichier = path.join(DIST, chemin)

    // Repli SPA : toute route inconnue rend l'index, comme le fait `_redirects`.
    if (!fs.existsSync(fichier) || fs.statSync(fichier).isDirectory()) {
      fichier = path.join(DIST, 'index.html')
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(fichier)] || 'application/octet-stream' })
    fs.createReadStream(fichier).pipe(res)
  })
  return new Promise(resoudre => serveur.listen(PORT, () => resoudre(serveur)))
}

async function main() {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('prerender : dist/index.html absent, lancer vite build d’abord')
    process.exit(1)
  }

  let puppeteer
  try {
    puppeteer = (await import('puppeteer')).default
  } catch {
    console.warn('prerender : puppeteer indisponible, prérendu ignoré (le site reste une SPA)')
    return
  }

  let navigateur
  try {
    navigateur = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    })
  } catch (e) {
    console.warn('prerender : Chromium n’a pas démarré, prérendu ignoré —', e.message)
    return
  }

  const serveur = await servirDist()
  const routes = routesDepuisSitemap()
  const rendues = []
  const ignorees = []

  try {
    for (const route of routes) {
      const page = await navigateur.newPage()
      try {
        // La langue est forcée en français : le prérendu ne couvre pas encore
        // les autres langues, et le détecteur d'i18next suivrait sinon la
        // locale de la machine de build.
        await page.evaluateOnNewDocument(() => {
          try { localStorage.setItem('i18nextLng', 'fr') } catch { /* stockage indisponible */ }
        })
        await page.setViewport({ width: 1280, height: 900 })
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'networkidle0',
          timeout: 45000,
        })

        const mesurer = () =>
          page.evaluate(() => ({
            titre: document.title,
            texte: (document.getElementById('root')?.innerText || '').trim(),
          }))

        // La stabilité se mesure, elle ne se devine pas au vocabulaire. Une
        // première version cherchait le mot « chargement » dans la page et
        // refusait /presse à cause de « disponible en téléchargement » — et la
        // frontière \b n'y aurait rien changé, « é » n'étant pas une lettre au
        // sens des expressions régulières de JavaScript.
        const avant = await mesurer()
        await new Promise(r => setTimeout(r, 1500))
        const controle = await mesurer()
        const stable = avant.texte === controle.texte

        const motifs = []
        if (controle.texte.length < TEXTE_MINIMAL) motifs.push(`contenu trop court (${controle.texte.length})`)
        if (!stable) motifs.push('page encore en train de se remplir')
        if (route !== '/' && controle.titre === TITRE_GABARIT) motifs.push('titre non personnalisé')

        if (motifs.length) {
          ignorees.push(`${route} — ${motifs.join(', ')}`)
          continue
        }

        await page.evaluate(() => {
          /*
           * Le head cumule trois jeux de balises : celles du gabarit
           * `index.html`, celles d'un composant SEO monté haut dans l'arbre —
           * qui porte les valeurs de l'accueil — puis celles de la page. React
           * les empile sans retirer les précédentes, ce qui est sans effet dans
           * un navigateur mais désastreux une fois figé : les robots lisent la
           * PREMIÈRE occurrence, si bien que `og:url` et surtout
           * `<link rel="canonical">` désigneraient l'accueil depuis chaque page.
           *
           * On ne garde donc qu'une balise par identité, la dernière écrite,
           * qui est celle de la page la plus profonde. Le titre fait exception :
           * on reprend `document.title`, la valeur que le navigateur applique.
           */
          const tete = document.head
          const titre = document.title

          tete.querySelectorAll('title').forEach(n => n.remove())
          const nouveau = document.createElement('title')
          nouveau.textContent = titre
          tete.prepend(nouveau)

          const vues = new Map()
          for (const balise of [...tete.querySelectorAll('meta[name], meta[property], link[rel="canonical"]')]) {
            const identite =
              balise.tagName === 'LINK'
                ? 'canonical'
                : (balise.getAttribute('name') || balise.getAttribute('property'))
            if (!identite) continue
            const precedente = vues.get(identite)
            if (precedente) precedente.remove()
            vues.set(identite, balise)
          }
        })

        // Un canonical erroné nuit davantage qu'une page non prérendue : on
        // vérifie le résultat du nettoyage avant d'écrire quoi que ce soit.
        const tete = await page.evaluate(() => ({
          titres: document.querySelectorAll('title').length,
          canoniques: document.querySelectorAll('link[rel="canonical"]').length,
          canonique: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
          ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content') || '',
        }))

        const cheminCanonique = tete.canonique ? new URL(tete.canonique).pathname.replace(/\/$/, '') : null
        const attendu = route.replace(/\/$/, '')
        const defauts = []
        if (tete.titres !== 1) defauts.push(`${tete.titres} balises title`)
        if (tete.canoniques > 1) defauts.push(`${tete.canoniques} canoniques`)
        if (cheminCanonique !== null && cheminCanonique !== attendu) {
          defauts.push(`canonique « ${tete.canonique} » au lieu de ${route}`)
        }
        if (defauts.length) {
          ignorees.push(`${route} — ${defauts.join(', ')}`)
          continue
        }

        const html = await page.content()

        // `agenda.html` plutôt que `agenda/index.html` : Cloudflare Pages sert
        // le premier directement sur /agenda, là où le second déclenche une
        // redirection 308 vers /agenda/. Le second ferait donc migrer toutes
        // les URLs du site vers une forme à barre oblique finale, que ni le
        // sitemap ni les canoniques ne déclarent.
        const fichier = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route.replace(/^\//, '')}.html`)
        fs.mkdirSync(path.dirname(fichier), { recursive: true })
        fs.writeFileSync(fichier, html, 'utf8')
        rendues.push(`${route} — ${controle.texte.length} caractères, « ${controle.titre.slice(0, 45)} »`)
      } catch (e) {
        ignorees.push(`${route} — ${e.message}`)
      } finally {
        await page.close()
      }
    }
  } finally {
    await navigateur.close()
    serveur.close()
  }

  console.log(`\nprerender : ${rendues.length} page(s) écrite(s) sur ${routes.length}`)
  rendues.forEach(l => console.log('  ok    ' + l))
  ignorees.forEach(l => console.log('  IGNORÉ ' + l))

  // Une page ignorée n'est pas une erreur de build : elle garde simplement le
  // comportement actuel. On le signale sans faire échouer le déploiement.
  if (ignorees.length) {
    console.log('\nprerender : les pages ignorées restent servies en SPA.')
  }
}

main().catch(e => {
  console.warn('prerender : abandon —', e.message)
})
