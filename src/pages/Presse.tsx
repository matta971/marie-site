import React, { useState } from 'react'

interface PressArticle {
  quote: string
  outlet: string
  date: string
  link?: string
}

const pressArticles: PressArticle[] = [
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
]

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
  const [selectedTheme, setSelectedTheme] = useState('Tous thèmes')
  const [selectedOutlet, setSelectedOutlet] = useState('Tous périodiques')
  const [selectedYear, setSelectedYear] = useState('Toutes années')

  return (
    <div className="presse-page">
      
      {/* Hero Section */}
      <section className="presse-hero">
        <div className="section-container">
          <h1 className="hero-title">Presse</h1>
        </div>
      </section>

      {/* Filtres */}
      <section className="presse-filters-section">
        <div className="section-container">
          <div className="presse-filters">
            <select 
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="presse-filter-select"
            >
              <option value="Tous thèmes">Tous thèmes</option>
              <option value="Critiques">Critiques</option>
              <option value="Interviews">Interviews</option>
              <option value="Portraits">Portraits</option>
            </select>

            <select 
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="presse-filter-select"
            >
              <option value="Tous périodiques">Tous périodiques</option>
              <option value="Le Figaro">Le Figaro</option>
              <option value="Télérama">Télérama</option>
              <option value="Forum Opéra">Forum Opéra</option>
              <option value="Olyrix">Olyrix</option>
            </select>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="presse-filter-select"
            >
              <option value="Toutes années">Toutes années</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
        </div>
      </section>

      {/* Citations principales */}
      <section className="presse-articles-section">
        <div className="section-container">
          <div className="presse-articles-list">
            {pressArticles.map((article, index) => (
              <div key={index} className="press-article-card">
                <blockquote className="press-quote">
                  <span className="press-quote-mark">"</span>
                  {article.quote}
                  <span className="press-quote-mark">"</span>
                </blockquote>
                
                <div className="press-article-footer">
                  <cite className="press-article-source">
                    <span className="press-outlet">{article.outlet}</span>
                    <span className="press-date">{article.date}</span>
                  </cite>
                  
                  {article.link && (
                    <a 
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-article"
                    >
                      Lire l'article →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autres mentions */}
      <section className="presse-mentions-section">
        <div className="section-container">
          <h2 className="presse-section-title">Autres mentions</h2>
          
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
                  "{quote.quote}"
                </blockquote>
                
                <cite className="mention-source">— {quote.outlet}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}