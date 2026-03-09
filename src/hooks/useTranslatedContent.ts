import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const API_URL = (import.meta.env.PROD || import.meta.env.DEV)
  ? 'https://backend-site-marie-emeraude.matta971.workers.dev/api'
  : 'http://localhost:3001/api'

async function translateText(text: string, lang: string): Promise<string> {
  const res = await fetch(`${API_URL}/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, lang }),
  })
  if (!res.ok) return text
  const data = await res.json()
  return data.translated || text
}

/**
 * Hook to translate Notion content dynamically.
 * Returns original text if language is FR, otherwise translates via backend with KV caching.
 */
export function useTranslatedContent(text: string | undefined | null): string {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const source = text || ''

  const [translated, setTranslated] = useState<string>(source)

  useEffect(() => {
    if (!source || lang === 'fr') {
      setTranslated(source)
      return
    }

    let cancelled = false
    translateText(source, lang).then(result => {
      if (!cancelled) {
        setTranslated(result)
      }
    })

    return () => { cancelled = true }
  }, [source, lang])

  return translated
}

/**
 * Translate an array of items with text fields.
 * Returns the original array with translated text fields.
 */
export function useTranslatedArray<T extends Record<string, unknown>>(
  items: T[] | undefined | null,
  fields: (keyof T)[]
): T[] {
  const { i18n } = useTranslation()
  const lang = i18n.language
  const source = items || []

  const [translated, setTranslated] = useState<T[]>(source)

  useEffect(() => {
    if (!source.length || lang === 'fr') {
      setTranslated(source)
      return
    }

    let cancelled = false

    async function translateAll() {
      const results = await Promise.all(
        source.map(async (item) => {
          const translatedItem = { ...item }
          for (const field of fields) {
            const value = item[field]
            if (typeof value === 'string' && value.trim()) {
              const result = await translateText(value, lang)
              if (!cancelled) {
                ;(translatedItem as Record<string, unknown>)[field as string] = result
              }
            }
          }
          return translatedItem
        })
      )
      if (!cancelled) setTranslated(results)
    }

    translateAll()
    return () => { cancelled = true }
  }, [source, lang, fields.join(',')])

  return translated
}
