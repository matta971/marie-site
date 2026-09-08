import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { codeLangue, traduire, traductionEnCache } from '../services/translationCache'

/**
 * Traduction du contenu Notion. Le cache et le réseau vivent dans
 * `services/translationCache` ; ces hooks ne font que brancher React dessus.
 *
 * Chaque hook lit d'abord le cache de façon synchrone, pour que le premier
 * rendu affiche directement la bonne langue. Sans cela, une visite déjà connue
 * repassait par le français le temps d'un aller-retour réseau.
 */

export function useTranslatedContent(text: string | undefined | null): string {
  const { i18n } = useTranslation()
  const lang = codeLangue(i18n.language)
  const source = text || ''

  const enCache = lang === 'fr' ? null : traductionEnCache(source, lang)
  const immediat = enCache ?? source

  const [translated, setTranslated] = useState<string>(immediat)

  useEffect(() => {
    setTranslated(immediat)

    // Rien à demander : pas de texte, français, ou traduction déjà en cache.
    if (!source || lang === 'fr' || enCache !== null) return

    let cancelled = false
    traduire(source, lang).then(result => {
      if (!cancelled) setTranslated(result)
    })

    return () => { cancelled = true }
  }, [source, lang, immediat, enCache])

  return translated
}

/**
 * Traduit une liste d'objets sur les champs indiqués.
 *
 * `items` et `fields` étant le plus souvent des littéraux recréés à chaque
 * rendu, les dépendances passent par la liste des noms de champs plutôt que
 * par le tableau lui-même.
 */
export function useTranslatedArray<T extends Record<string, unknown>>(
  items: T[] | undefined | null,
  fields: (keyof T)[]
): T[] {
  const { i18n } = useTranslation()
  const lang = codeLangue(i18n.language)
  const nomsChamps = fields.join(',')

  /**
   * Ce que le cache permet d'afficher sans attendre, et si quelque chose
   * manque encore. Une liste complète évite entièrement l'effet réseau.
   */
  const immediat = useMemo(() => {
    const source = items || []
    if (!source.length || lang === 'fr') return { liste: source, complet: true }

    let complet = true
    const liste = source.map(item => {
      let copie: T | null = null
      for (const field of fields) {
        const valeur = item[field]
        if (typeof valeur !== 'string' || !valeur.trim()) continue

        const cache = traductionEnCache(valeur, lang)
        if (cache === null) {
          complet = false
          continue
        }
        if (copie === null) copie = { ...item }
        ;(copie as Record<string, unknown>)[field as string] = cache
      }
      return copie ?? item
    })

    return { liste, complet }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, lang, nomsChamps])

  const [translated, setTranslated] = useState<T[]>(immediat.liste)

  useEffect(() => {
    setTranslated(immediat.liste)
    if (immediat.complet) return

    const source = items || []
    let cancelled = false

    // On repart des textes d'origine : `traduire` répond immédiatement pour
    // ce qui est déjà en cache, il n'y a donc rien à filtrer ici.
    Promise.all(
      source.map(async item => {
        const copie = { ...item }
        await Promise.all(
          fields.map(async field => {
            const valeur = item[field]
            if (typeof valeur !== 'string' || !valeur.trim()) return
            ;(copie as Record<string, unknown>)[field as string] = await traduire(valeur, lang)
          })
        )
        return copie
      })
    ).then(resultats => {
      if (!cancelled) setTranslated(resultats)
    })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, lang, nomsChamps, immediat])

  return translated
}
