/**
 * Cache des traductions du contenu Notion.
 *
 * Le Worker garde déjà un cache KV de 30 jours, mais côté navigateur rien
 * n'était retenu : chaque montage de composant renvoyait un POST par champ et
 * par ligne. Sur Répertoire, une trentaine d'œuvres et quatre champs faisaient
 * une centaine de requêtes à chaque visite de la page, et autant au retour.
 *
 * Ce module ajoute trois couches devant le réseau :
 *
 *   1. une mémoire de session (Map), qui répond de façon synchrone ;
 *   2. une persistance localStorage, qui survit aux rechargements ;
 *   3. un dédoublonnage des requêtes en vol, indispensable ici parce qu'une
 *      même valeur revient sur beaucoup de lignes — « Metz » comme lieu sur
 *      quinze concerts partait en quinze requêtes identiques simultanées.
 *
 * Une file d'attente borne par ailleurs le nombre d'appels parallèles, pour ne
 * pas ouvrir quarante connexions d'un coup au premier affichage.
 */

const API_URL = 'https://backend-site-marie-emeraude.matta971.workers.dev/api'

/** Changer ce numéro invalide tout ce qui est stocké chez les visiteurs. */
const VERSION = 1
const CLE_STOCKAGE = `marie.traductions.v${VERSION}`

/**
 * Sept jours, là où le KV du Worker garde trente jours. Le cache navigateur
 * est volontairement le plus court des deux : une traduction corrigée côté
 * serveur ne doit pas rester bloquée un mois sur le poste d'un visiteur.
 */
const DUREE_VIE_MS = 7 * 24 * 60 * 60 * 1000

/** Au-delà, les entrées les moins récemment utilisées sont abandonnées. */
const MAX_ENTREES = 600

/** Requêtes réseau simultanées autorisées. */
const MAX_PARALLELE = 6

/** Une traduction retenue, avec la date de son dernier usage (éviction LRU). */
type Entree = { t: string; u: number }

const memoire = new Map<string, Entree>()
const enVol = new Map<string, Promise<string>>()

let chargeDepuisStockage = false
let stockageDisponible = true
let sauvegardePlanifiee: ReturnType<typeof setTimeout> | null = null

/**
 * i18next renvoie parfois la locale complète du navigateur : « fr-FR », « en-US »,
 * voire « en-US@posix ». Sans normalisation, le backend ne reconnaît pas « fr-FR »
 * comme du français et traduit le texte vers lui-même, et les variantes régionales
 * multiplient les entrées de cache pour un même contenu.
 */
export function codeLangue(lang: string): string {
  return (lang || '').split('-')[0].split('@')[0].toLowerCase()
}

/**
 * FNV-1a 32 bits. La clé combine langue, longueur et empreinte : deux textes
 * différents devraient entrer en collision *et* avoir la même longueur pour se
 * marcher dessus, ce qui rend l'accident négligeable sur quelques centaines
 * d'entrées, tout en gardant des clés courtes en localStorage.
 */
function empreinte(texte: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < texte.length; i++) {
    h ^= texte.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

function cle(texte: string, lang: string): string {
  return `${lang}:${texte.length.toString(36)}:${empreinte(texte)}`
}

function maintenant(): number {
  return Date.now()
}

// ==================== PERSISTANCE ====================

function chargerStockage(): void {
  if (chargeDepuisStockage) return
  chargeDepuisStockage = true

  let brut: string | null = null
  try {
    brut = window.localStorage.getItem(CLE_STOCKAGE)
  } catch {
    // Safari en navigation privée, stockage bloqué par l'utilisateur, SSR :
    // le cache fonctionne alors en mémoire seule, sans rien casser.
    stockageDisponible = false
    return
  }
  if (!brut) return

  try {
    const donnees = JSON.parse(brut) as Record<string, Entree>
    const limite = maintenant() - DUREE_VIE_MS
    for (const [k, v] of Object.entries(donnees)) {
      if (v && typeof v.t === 'string' && typeof v.u === 'number' && v.u > limite) {
        memoire.set(k, v)
      }
    }
  } catch {
    // Contenu illisible (version antérieure, écriture interrompue) : on repart à vide.
    try {
      window.localStorage.removeItem(CLE_STOCKAGE)
    } catch {
      /* rien à faire de plus */
    }
  }
}

/** Retire les entrées expirées, puis les plus anciennes si le cache déborde. */
function elaguer(cible: number): void {
  const limite = maintenant() - DUREE_VIE_MS
  for (const [k, v] of memoire) {
    if (v.u <= limite) memoire.delete(k)
  }
  if (memoire.size <= cible) return

  const parAnciennete = [...memoire.entries()].sort((a, b) => a[1].u - b[1].u)
  const aRetirer = parAnciennete.length - cible
  for (let i = 0; i < aRetirer; i++) {
    memoire.delete(parAnciennete[i][0])
  }
}

function ecrire(): void {
  if (!stockageDisponible) return
  elaguer(MAX_ENTREES)

  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(Object.fromEntries(memoire)))
    return
  } catch {
    // Quota dépassé : on sacrifie la moitié des entrées et on retente une fois.
  }

  elaguer(Math.floor(memoire.size / 2))
  try {
    window.localStorage.setItem(CLE_STOCKAGE, JSON.stringify(Object.fromEntries(memoire)))
  } catch {
    // Toujours refusé : on continue en mémoire seule plutôt que de réessayer
    // à chaque traduction.
    stockageDisponible = false
  }
}

/**
 * L'écriture est différée : une page qui traduit quarante champs ne doit pas
 * sérialiser tout le cache quarante fois.
 */
function planifierEcriture(): void {
  if (!stockageDisponible || sauvegardePlanifiee !== null) return
  sauvegardePlanifiee = setTimeout(() => {
    sauvegardePlanifiee = null
    ecrire()
  }, 1000)
}

if (typeof window !== 'undefined') {
  // « pagehide » plutôt que « beforeunload » : c'est le seul des deux qui se
  // déclenche de façon fiable sur iOS.
  window.addEventListener('pagehide', () => {
    if (sauvegardePlanifiee !== null) {
      clearTimeout(sauvegardePlanifiee)
      sauvegardePlanifiee = null
      ecrire()
    }
  })
}

// ==================== FILE D'ATTENTE RÉSEAU ====================

const attente: (() => void)[] = []
let enCours = 0

function prendreJeton(): Promise<void> {
  if (enCours < MAX_PARALLELE) {
    enCours++
    return Promise.resolve()
  }
  return new Promise<void>(resoudre => attente.push(resoudre))
}

function rendreJeton(): void {
  const suivant = attente.shift()
  if (suivant) suivant()
  else enCours--
}

async function appelerBackend(texte: string, lang: string): Promise<string | null> {
  await prendreJeton()
  try {
    const res = await fetch(`${API_URL}/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texte, lang }),
    })
    if (!res.ok) return null

    const data = await res.json()
    // Le Worker signale un échec du moteur en renvoyant le texte source
    // accompagné d'un « error ». Le mettre en cache figerait du français pour
    // une semaine : on préfère ne rien retenir et réessayer plus tard.
    if (data.error || typeof data.translated !== 'string') return null
    return data.translated
  } catch {
    return null
  } finally {
    rendreJeton()
  }
}

// ==================== API PUBLIQUE ====================

/**
 * Traduction déjà connue, ou null. Synchrone, pour que le premier rendu
 * affiche directement la bonne langue au lieu de faire clignoter le français.
 */
export function traductionEnCache(texte: string, lang: string): string | null {
  if (!texte || lang === 'fr') return null
  chargerStockage()

  const k = cle(texte, lang)
  const entree = memoire.get(k)
  if (!entree) return null

  if (entree.u <= maintenant() - DUREE_VIE_MS) {
    memoire.delete(k)
    return null
  }

  entree.u = maintenant()
  planifierEcriture()
  return entree.t
}

/**
 * Traduit un texte, en passant par le cache puis par le backend. Renvoie le
 * texte d'origine si la traduction échoue, pour que la page reste lisible.
 */
export function traduire(texte: string, lang: string): Promise<string> {
  if (!texte || lang === 'fr') return Promise.resolve(texte)

  const dejaLa = traductionEnCache(texte, lang)
  if (dejaLa !== null) return Promise.resolve(dejaLa)

  const k = cle(texte, lang)
  const dejaDemande = enVol.get(k)
  if (dejaDemande) return dejaDemande

  const promesse = appelerBackend(texte, lang).then(resultat => {
    enVol.delete(k)
    if (resultat === null) return texte

    memoire.set(k, { t: resultat, u: maintenant() })
    planifierEcriture()
    return resultat
  })

  enVol.set(k, promesse)
  return promesse
}

/** Vide le cache, mémoire et stockage. Utile pour vérifier une correction. */
export function viderCacheTraductions(): void {
  memoire.clear()
  enVol.clear()
  chargeDepuisStockage = true
  try {
    window.localStorage.removeItem(CLE_STOCKAGE)
  } catch {
    /* stockage indisponible : la mémoire vidée suffit */
  }
}

/** État du cache, pour inspection depuis la console. */
export function statistiquesCacheTraductions(): {
  entrees: number
  enVol: number
  stockage: boolean
} {
  chargerStockage()
  return { entrees: memoire.size, enVol: enVol.size, stockage: stockageDisponible }
}
