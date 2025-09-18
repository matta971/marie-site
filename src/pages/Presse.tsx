import React, { useState } from 'react'

// Données d'exemple pour les articles de presse
const pressArticles = [
  {
    quote: "« Une voix d'une rare beauté »",
    outlet: "Le Figaro",
    date: "2 février 2024",
    fullQuote: "Marie Émeraude Alcime possède une voix d'une rare beauté, alliant puissance et subtilité dans chaque phrasé. Sa présence scénique captive immédiatement l'attention du public."
  },
  {
    quote: "« Marie Émeraude incarne une bouleversante Norma »",
    outlet: "Télérama", 
    date: "10 janvier 2024",
    fullQuote: "Dans ce rôle exigeant de Norma, Marie Émeraude Alcime déploie toute sa palette expressive, livrant une interprétation bouleversante qui restera longtemps en mémoire."
  },
  {
    quote: "« Une technique éblouissante ! »",
    outlet: "Die Welt",
    date: "8 septembre 2023",
    fullQuote: "La technique vocale de Marie Émeraude Alcime est tout simplement éblouissante. Chaque note est d'une précision chirurgicale, au service d'une musicalité exceptionnelle."
  },
  {
    quote: "« La révélation de la soirée »",
    outlet: "The New York Times",
    date: "17 juin 2023",
    fullQuote: "Marie Émeraude Alcime s'impose comme la véritable révélation de cette soirée lyrique. Son interprétation magistrale élève l'ensemble de la production."
  }
]

// Composant pour les filtres
function PressFilters() {
  const [selectedTheme, setSelectedTheme] = useState('Tous thèmes')
  const [selectedOutlet, setSelectedOutlet] = useState('Tous périodiques')
  const [selectedYear, setSelectedYear] = useState('Toutes années')

  return (
    <div className="flex flex-wrap gap-6 mb-12 justify-center">
      <div className="relative">
        <select 
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Tous thèmes">Tous thèmes</option>
          <option value="Critiques">Critiques</option>
          <option value="Interviews">Interviews</option>
          <option value="Portraits">Portraits</option>
        </select>
      </div>
      
      <div className="relative">
        <select 
          value={selectedOutlet}
          onChange={(e) => setSelectedOutlet(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Tous périodiques">Tous périodiques</option>
          <option value="Le Figaro">Le Figaro</option>
          <option value="Télérama">Télérama</option>
          <option value="Die Welt">Die Welt</option>
          <option value="The New York Times">The New York Times</option>
        </select>
      </div>
      
      <div className="relative">
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Toutes années">Toutes années</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
    </div>
  )
}

export default function Presse(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la page */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
            Presse
          </h1>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#046D5D' }}></div>
        </div>

        {/* Filtres */}
        <PressFilters />
        
        {/* Citations principales */}
        <div className="space-y-12 mb-16">
          {pressArticles.map((article, index) => (
            <div key={index} className="border-b border-gray-200 pb-8">
              <blockquote className="text-2xl md:text-3xl mb-4 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
                <span style={{ color: '#046D5D' }}>"</span>
                {article.quote.replace(/«|»|"/g, '')}
                <span style={{ color: '#046D5D' }}>"</span>
              </blockquote>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <cite className="not-italic" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  <span className="font-medium">{article.outlet}</span>
                  <span className="text-gray-600 ml-2">{article.date}</span>
                </cite>
                
                <button 
                  className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
                  style={{ 
                    color: '#046D5D',
                    borderColor: '#046D5D',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#046D5D'
                    e.target.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#046D5D'
                  }}
                >
                  Lire l'article complet →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Section Revue de presse */}
        <div className="text-center mb-16">
          <h2 className="text-2xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
            Revue de presse
          </h2>
          
          {/* Informations sur les téléchargements */}
          <div style={{ backgroundColor: '#F5F5F5' }} className="rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
                  Dossier de presse
                </h3>
                <p className="leading-relaxed mb-6" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  Retrouvez l'ensemble des articles et critiques dans notre dossier 
                  de presse complet, disponible en téléchargement.
                </p>
                <div className="space-y-3">
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 transition-colors"
                    style={{ fontFamily: 'Lato, sans-serif', color: '#046D5D' }}
                    onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                    onMouseLeave={(e) => e.target.style.color = '#046D5D'}
                  >
                    <span>📄</span>
                    <span className="underline hover:no-underline">Dossier de presse complet (PDF)</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 transition-colors"
                    style={{ fontFamily: 'Lato, sans-serif', color: '#046D5D' }}
                    onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                    onMouseLeave={(e) => e.target.style.color = '#046D5D'}
                  >
                    <span>📸</span>
                    <span className="underline hover:no-underline">Photos haute résolution (ZIP)</span>
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-lg mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
                  Contact presse
                </h4>
                <p className="mb-4" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  <a 
                    href="mailto:presse@marie-emeraude.com" 
                    className="transition-colors"
                    style={{ color: '#046D5D' }}
                    onMouseEnter={(e) => e.target.style.color = '#D4AF37'}
                    onMouseLeave={(e) => e.target.style.color = '#046D5D'}
                  >
                    presse@marie-emeraude.com
                  </a>
                </p>
                <a 
                  href="/contact" 
                  className="inline-block px-6 py-3 rounded-xl font-medium transition-colors"
                  style={{ 
                    backgroundColor: '#046D5D', 
                    color: 'white',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#D4AF37'
                    e.target.style.color = '#1D1D1D'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#046D5D'
                    e.target.style.color = 'white'
                  }}
                >
                  Demande d'interview
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Citations supplémentaires */}
        <div className="border-t border-gray-200 pt-12">
          <h3 className="text-xl mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
            Autres mentions
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div style={{ backgroundColor: '#F5F5F5' }} className="rounded-lg p-6">
              <blockquote className="text-sm italic mb-3 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
                <span style={{ color: '#046D5D' }}>"</span>
                Une interprète sensible qui sait allier technique et émotion.
                <span style={{ color: '#046D5D' }}>"</span>
              </blockquote>
              <cite className="text-xs not-italic" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                — ConcertoNet
              </cite>
            </div>
            
            <div style={{ backgroundColor: '#F5F5F5' }} className="rounded-lg p-6">
              <blockquote className="text-sm italic mb-3 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
                <span style={{ color: '#046D5D' }}>"</span>
                Présence scénique remarquable et voix chaleureuse.
                <span style={{ color: '#046D5D' }}>"</span>
              </blockquote>
              <cite className="text-xs not-italic" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                — Le Figaro
              </cite>
            </div>
            
            <div style={{ backgroundColor: '#F5F5F5' }} className="rounded-lg p-6">
              <blockquote className="text-sm italic mb-3 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
                <span style={{ color: '#046D5D' }}>"</span>
                Une artiste complète au service de la musique.
                <span style={{ color: '#046D5D' }}>"</span>
              </blockquote>
              <cite className="text-xs not-italic" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                — Diapason
              </cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}