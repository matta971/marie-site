/**
 * Fabrique l'image d'aperçu de partage, 1200 x 630.
 *
 * Les balises `og:image:width/height` annonçaient 1200 x 630 alors que l'image
 * servie, `portrait-face-main-buste.jpg`, fait 640 x 960 — un portrait vertical.
 * Facebook préparait donc une grande carte pour recevoir une image deux fois
 * plus haute que large, et LinkedIn, dont la largeur minimale est 1200 px,
 * rétrogradait l'aperçu en vignette.
 *
 * La source est `bio-parcours-1.jpg` (1365 x 2048), assez grande pour que la
 * fenêtre 1200 x 630 soit découpée **pixel pour pixel**, sans agrandissement
 * ni perte de netteté. Le cadrage est centré sur le visage : la fenêtre laisse
 * une centaine de pixels de cheveux au-dessus du front et descend jusqu'au
 * collier.
 *
 * Chromium sert de moteur de rendu, puppeteer étant déjà une dépendance du
 * prérendu : pas de bibliothèque de traitement d'image à ajouter.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(RACINE, 'public', 'images', 'bio-parcours-1.jpg')
const SORTIE = path.join(RACINE, 'public', 'images', 'partage-og.jpg')

const LARGEUR = 1200
const HAUTEUR = 630

/**
 * Coin haut-gauche de la fenêtre dans la source, en pixels d'origine.
 * Réglable en ligne de commande pour comparer des cadrages :
 * `node scripts/og-image.mjs --dx 81 --dy 470`.
 */
function argument(nom, defaut) {
  const i = process.argv.indexOf('--' + nom)
  return i > -1 && process.argv[i + 1] ? Number(process.argv[i + 1]) : defaut
}

const DECALAGE_X = argument('dx', 81)
const DECALAGE_Y = argument('dy', 470)

const QUALITE = 0.88

async function main() {
  const source = fs.readFileSync(SOURCE)
  const base64 = source.toString('base64')

  const navigateur = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] })
  const page = await navigateur.newPage()

  const resultat = await page.evaluate(
    async (donnees, l, h, dx, dy, q) => {
      const image = new Image()
      image.src = 'data:image/jpeg;base64,' + donnees
      await image.decode()

      if (dx + l > image.naturalWidth || dy + h > image.naturalHeight) {
        return { erreur: `fenêtre hors de la source (${image.naturalWidth}x${image.naturalHeight})` }
      }

      const toile = document.createElement('canvas')
      toile.width = l
      toile.height = h
      const ctx = toile.getContext('2d')
      ctx.imageSmoothingEnabled = false
      // Découpe sans redimensionnement : la fenêtre fait déjà 1200 x 630.
      ctx.drawImage(image, dx, dy, l, h, 0, 0, l, h)

      return {
        source: image.naturalWidth + 'x' + image.naturalHeight,
        donnees: toile.toDataURL('image/jpeg', q).split(',')[1],
      }
    },
    base64, LARGEUR, HAUTEUR, DECALAGE_X, DECALAGE_Y, QUALITE
  )

  await navigateur.close()

  if (resultat.erreur) {
    console.error('og-image : ' + resultat.erreur)
    process.exit(1)
  }

  const sortie = Buffer.from(resultat.donnees, 'base64')
  fs.writeFileSync(SORTIE, sortie)

  console.log('source  : ' + path.basename(SOURCE) + ' (' + resultat.source + ')')
  console.log('fenêtre : ' + LARGEUR + 'x' + HAUTEUR + ' à partir de (' + DECALAGE_X + ', ' + DECALAGE_Y + ')')
  console.log('écrit   : ' + path.basename(SORTIE) + ' — ' + Math.round(sortie.length / 1024) + ' Ko')
}

main()
