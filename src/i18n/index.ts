import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import en from './locales/en.json'
import de from './locales/de.json'
import it from './locales/it.json'
import es from './locales/es.json'
import pt from './locales/pt.json'
import ru from './locales/ru.json'

export const languages = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
  { code: 'it', label: 'IT', name: 'Italiano' },
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'ru', label: 'RU', name: 'Русский' },
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      de: { translation: de },
      it: { translation: it },
      es: { translation: es },
      pt: { translation: pt },
      ru: { translation: ru },
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    // Le français est la langue par défaut, pour tout le monde : la langue du
    // navigateur n'est plus consultée. Googlebot navigue en anglais américain ;
    // en suivant son navigateur, le site lui servait l'interface anglaise et la
    // traduction automatique du contenu Notion, et c'est cette version que
    // Google indexait (lang="en-US" dans la page explorée, Search Console, 30/09/2026).
    // Seul un choix fait avec les drapeaux, mémorisé, change la langue.
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
  })

export default i18n
