import  { useState, useMemo, useEffect, useRef } from 'react'
import { useNotionData } from '../hooks/useNotionData'
import { getPressArticles } from '../services/notionService'
import { formatDate } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next'
import { useTranslatedArray } from '../hooks/useTranslatedContent'
//import type { PressData } from '../types/notion.types'
/*interface PressArticle {
  quote: string
  outlet: string
  date: string
  link?: string
}*/
/*const pressArticles: PressArticle[] = [
  {
    quote: "Une mention pour la (trop) brève intervention de la Voix de la Mère … touchante et d'une réelle beauté.",
    outlet: "Forum Opéra",
    date: "16 juin 2017",
    link: "https://www.forumopera.com/spectacle/les-contes-dhoffmann-metz"
  },
  {
    quote: "Interprétation remarquée du 'Eia Mater, fons amoris' (Stabat Mater) pour son intensité expressive.",
    outlet: "Olyrix",
    date: "7 avril 2018",
    link: "https://www.olyrix.com/articles/production/1953"
  },
  {
    quote: "Une voix d'une rare beauté, alliant puissance et subtilité dans chaque phrasé.",
    outlet: "Le Figaro",
    date: "2 février 2024"
  },
  {
    quote: "Marie Émeraude incarne une bouleversante héroïne, sa présence scénique captive immédiatement l'attention.",
    outlet: "Télérama",
    date: "10 janvier 2024"
  }
]*/

const additionalQuotes = [
  {
    quote: "Une interprète sensible qui sait allier technique et émotion.",
    outlet: "ConcertoNet"
  },
  {
    quote: "Présence scénique remarquable et voix chaleureuse.",
    outlet: "Le Monde"
  },
  {
    quote: "Une artiste complète au service de la musique.",
    outlet: "Diapason"
  }
]

export default function Presse() {
  const [selectedType, setSelectedType] = useState('Tous les types')
  const [selectedSource, setSelectedSource] = useState('Toutes les sources')
  const [selectedYear, setSelectedYear] = useState('Toutes les années')
  const { data: articles, loading, error } = useNotionData(getPressArticles)
  const { t } = useTranslation()

  // Traduire les textes dynamiques des articles
  const translatedArticles = useTranslatedArray(
    articles as unknown as Record<string, unknown>[] | undefined,
    ['quote']
  ) as unknown as typeof articles
  const [isStuck, setIsStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-66px 0px 0px 0px' }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loading])

  // Filtrer les articles à afficher
  const displayedArticles = useMemo(() => {
    return translatedArticles?.filter(article => article.display) || []
  }, [articles])

  // Extraire les valeurs uniques pour les filtres
  const availableSources = useMemo(() => {
    const sources = new Set<string>()
    displayedArticles.forEach(article => {
      sources.add(article.source)
    })
    return Array.from(sources).sort()
  }, [displayedArticles])

  /*const availableTypes = useMemo(() => {
    const types = new Set<string>()
    displayedArticles.forEach(article => {
      types.add(article.type)
    })
    return Array.from(types)
  }, [displayedArticles])*/

  const availableYears = useMemo(() => {
    const years = new Set<string>()
    displayedArticles.forEach(article => {
      years.add(new Date(article.date).getFullYear().toString())
    })
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))
  }, [displayedArticles])

  // Filtrer les articles selon les sélections
  const filteredArticles = useMemo(() => {
    return displayedArticles.filter(article => {
      const matchSource = selectedSource === 'Toutes les sources' || article.source === selectedSource
      const matchType = selectedType === 'Tous les types' || article.type === selectedType
      const matchYear = selectedYear === 'Toutes les années' || 
                       new Date(article.date).getFullYear().toString() === selectedYear
      return matchSource && matchType && matchYear
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [displayedArticles, selectedSource, selectedType, selectedYear])

  // Compter par type
  const countByType = useMemo(() => {
    return {
      all: displayedArticles.length,
      critique: displayedArticles.filter(a => a.type === 'critique').length,
      interview: displayedArticles.filter(a => a.type === 'interview').length,
      mention: displayedArticles.filter(a => a.type === 'mention').length
    }
  }, [displayedArticles])

  if (loading) {
    return (
      <div className="presse-page">
        {/* Hero Section */}
        <section className="presse-hero">
          <div className="section-container">
            <h1 className="hero-title">{t('press.title')}</h1>
          </div>
        </section>
        <section className="section-padding">
          <div className="section-container text-center">
            <p>{t('press.loading')}</p>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="presse-page">
        {/* Hero Section */}
        <section className="presse-hero">
          <div className="section-container">
            <h1 className="hero-title">{t('press.title')}</h1>
          </div>
        </section>
        <section className="section-padding">
          <div className="section-container text-center">
            <p className="text-red-600">Erreur lors du chargement de la presse</p>
            <p className="text-sm mt-2">{error.message}</p>
          </div>
        </section>
      </div>
    )
  }


  return (
    <div className="presse-page">
      
      {/* Hero Section */}
      <section className="presse-hero">
        <div className="section-container">
          <h1 className="hero-title">{t('press.title')}</h1>
        </div>
      </section>

      {/* Sentinelle pour détecter le sticky */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* Filtres */}
      <section className={`presse-filters-section ${isStuck ? 'is-stuck' : ''}`}>
        <div className="section-container">
          <div className="presse-filters">
            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="presse-filter-select"
              >
                <option value="Tous les types">{t('press.allTypes')} ({countByType.all})</option>
                <option value="critique">{t('press.critiques')} ({countByType.critique})</option>
                <option value="interview">{t('press.interviews')} ({countByType.interview})</option>
                <option value="mention">{t('press.mentions')} ({countByType.mention})</option>
              </select>

            {availableSources.length > 1 && (
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="presse-filter-select"
                >
                  <option value="Toutes les sources">{t('press.allSources')}</option>
                  {availableSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              )}

            {availableYears.length > 1 && (
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="presse-filter-select"
                >
                  <option value="Toutes les années">{t('press.allYears')}</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              )}
          </div>
        </div>
      </section>

      {/* Citations principales */}
      <section className="presse-articles-section">
        <div className="section-container">
          <div className="presse-articles-list">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article, index) => (
              <div key={index} className="press-article-card">
                <blockquote className="press-quote">
                  <span className="press-quote-mark">"</span>
                  {article.quote}
                  <span className="press-quote-mark">"</span>
                </blockquote>
                
                <div className="press-article-footer">
                  <cite className="press-article-source">
                    <span className="press-outlet">{article.source}</span>
                    <span className="press-date">{formatDate(article.date)}</span>
                  </cite>
                  
                  {article.articleLink && (
                    <a 
                      href={article.articleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-article"
                    >
                      {t('press.readArticle')}
                    </a>
                  )}
                </div>
              </div>
            ))
          
            ) : (
              <div className="text-center">
                <p className="text-gray-600">
                  {t('press.noResults')}
                </p>
                <button 
                  onClick={() => {
                    setSelectedSource('Toutes les sources')
                    setSelectedType('Tous les types')
                    setSelectedYear('Toutes les années')
                  }}
                  className="btn-contact"
                >
                  {t('press.resetFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Autres mentions */}
      <section className="presse-mentions-section">
        <div className="section-container">
          <h2 className="presse-section-title">{t('press.otherMentions')}</h2>
          
          <div className="mentions-grid">
            {additionalQuotes.map((quote, index) => (
              <div key={index} className="mention-card">
                <svg
                  className="mention-quote-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>

                <blockquote className="mention-text">
                  {quote.quote}
                </blockquote>

                <cite className="mention-source">— {quote.outlet}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Dossier de presse */}
      <section className="presse-dossier-section">
        <div className="section-container">
          <h2 className="presse-section-title">{t('press.pressReview')}</h2>
          
          <div className="dossier-content">
            <div className="dossier-text">
              <h3 className="dossier-subtitle">{t('press.pressKit')}</h3>
              <p className="dossier-description">
                {t('press.pressKitDesc')}
              </p>
              <button className="btn-download">
                {t('press.downloadPdf')}
              </button>
            </div>
            
            <div className="dossier-text">
              <h3 className="dossier-subtitle">{t('press.pressContact')}</h3>
              <p className="dossier-description">
                {t('press.pressContactDesc')}
              </p>
              <button className="btn-contact">
                {t('press.interviewRequest')}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}