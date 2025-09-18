import React, { useState } from 'react'


// Composant pour les filtres
function AgendaFilters() {
  const [selectedMonth, setSelectedMonth] = useState('Mois')
  const [selectedYear, setSelectedYear] = useState('Année')
  const [selectedCity, setSelectedCity] = useState('Ville')

  return (
    <div className="flex flex-wrap gap-6 mb-12 justify-center">
      <div className="relative">
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Mois">Mois</option>
          <option value="Janvier">Janvier</option>
          <option value="Février">Février</option>
          <option value="Mars">Mars</option>
          <option value="Avril">Avril</option>
          <option value="Mai">Mai</option>
          <option value="Juin">Juin</option>
          <option value="Juillet">Juillet</option>
          <option value="Août">Août</option>
          <option value="Septembre">Septembre</option>
          <option value="Octobre">Octobre</option>
          <option value="Novembre">Novembre</option>
          <option value="Décembre">Décembre</option>
        </select>
      </div>
      
      <div className="relative">
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Année">Année</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>
      
      <div className="relative">
        <select 
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="px-4 py-2 border-b-2 border-gray-300 bg-transparent focus:border-emerald-600 focus:outline-none cursor-pointer"
          style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}
        >
          <option value="Ville">Ville</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="London">London</option>
          <option value="Madrid">Madrid</option>
        </select>
      </div>
    </div>
  )
}

export default function Agenda(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Header de la page */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#1D1D1D' }}>
            Agenda
          </h1>
          <div className="w-16 h-1 mx-auto" style={{ backgroundColor: '#046D5D' }}></div>
        </div>

        {/* Filtres */}
        <AgendaFilters />
        
        {/* Événements à venir */}
        <div className="mb-16">
          <h2 className="text-2xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
            Prochaines représentations
          </h2>
          
          {/* Liste des événements futurs */}
          <div className="space-y-8 mb-12">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-lg font-medium mb-2" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  Title role, <em style={{ color: '#046D5D' }}>Norma</em>
                </div>
                <div className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  (Opéra National de Lyon)<br/>
                  15 mars 2024
                </div>
              </div>
              <div className="text-right lg:text-center">
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-colors border"
                  style={{ 
                    backgroundColor: '#046D5D', 
                    color: 'white',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    target.style.backgroundColor = '#D4AF37';
                    target.style.color = '#1D1D1D';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    target.style.backgroundColor = '#046D5D';
                    target.style.color = 'white';
                  }}
                >
                  RÉSERVER
                </button>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-lg font-medium mb-2" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  Gilda, <em style={{ color: '#046D5D' }}>Rigoletto</em>
                </div>
                <div className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  (Royal Opera House)<br/>
                  22 avril 2024
                </div>
              </div>
              <div className="text-right lg:text-center">
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-colors border"
                  style={{ 
                    backgroundColor: '#046D5D', 
                    color: 'white',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    target.style.backgroundColor = '#D4AF37';
                    target.style.color = '#1D1D1D';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget as HTMLButtonElement;
                    target.style.backgroundColor = '#046D5D';
                    target.style.color = 'white';
                  }}
                >
                  RÉSERVER
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-lg font-medium mb-2" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  Mélisande, <em style={{ color: '#046D5D' }}>Pelléas et Mélisande</em>
                </div>
                <div className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  (Debussy)<br/>
                  François-Xavier Roth<br/>
                  10 mai 2024
                </div>
              </div>
              <div className="text-right lg:text-center">
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-colors border"
                  style={{ 
                    backgroundColor: '#046D5D', 
                    color: 'white',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = '#D4AF37';
                    target.style.color = '#1D1D1D';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = '#046D5D';
                    target.style.color = 'white';
                  }}
                >
                  RÉSERVER
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div>
                <div className="text-lg font-medium mb-2" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  First Lady, <em style={{ color: '#046D5D' }}>Die Zauberflöte</em>
                </div>
                <div className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                  (Mozart)<br/>
                  Teatro Real, TBA<br/>
                  5 juin 2024
                </div>
              </div>
              <div className="text-right lg:text-center">
                <button 
                  className="px-6 py-2 rounded-lg font-medium transition-colors border"
                  style={{ 
                    backgroundColor: '#046D5D', 
                    color: 'white',
                    fontFamily: 'Lato, sans-serif'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = '#D4AF37';
                    target.style.color = '#1D1D1D';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = '#046D5D';
                    target.style.color = 'white';
                  }}
                >
                  RÉSERVER
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section À venir / Projets */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
            À venir / Projets
          </h2>
          <div className="mb-6">
            <div className="text-lg font-medium mb-2" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
              Chambre <em style={{ color: '#046D5D' }}>avec Vues</em>
            </div>
            <div className="text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
              Concert
            </div>
          </div>
        </div>

        {/* Informations de booking */}
        <div style={{ backgroundColor: '#F5F5F5' }} className="rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
                Programmation
              </h3>
              <p className="leading-relaxed" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                Marie-Émeraude Alcime est disponible pour des productions lyriques, 
                concerts, récitals et master-classes. Contactez notre équipe pour 
                étudier votre projet.
              </p>
            </div>
            <div className="text-center">
              <a 
                href="/contact" 
                className="inline-block px-8 py-4 rounded-xl font-semibold transition-colors"
                style={{ 
                  backgroundColor: '#046D5D', 
                  color: 'white',
                  fontFamily: 'Lato, sans-serif'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#D4AF37'
                  target.style.color = '#1D1D1D'
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#046D5D';
                  target.style.color = 'white';
                }}
              >
                Faire une demande de booking
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}