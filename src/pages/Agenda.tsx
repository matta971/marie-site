import React, { useState } from 'react'

interface Event {
  title: string
  role: string
  venue: string
  date: string
}

const upcomingEvents: Event[] = [
  {
    title: 'Norma',
    role: 'Title role',
    venue: 'Opéra National de Lyon',
    date: '15 mars 2024'
  },
  {
    title: 'Rigoletto',
    role: 'Gilda',
    venue: 'Royal Opera House',
    date: '22 avril 2024'
  },
  {
    title: 'Pelléas et Mélisande',
    role: 'Mélisande',
    venue: 'François-Xavier Roth (Debussy)',
    date: '10 mai 2024'
  },
  {
    title: 'Die Zauberflöte',
    role: 'First Lady',
    venue: 'Teatro Real, TBA (Mozart)',
    date: '5 juin 2024'
  }
]

export default function Agenda() {
  const [selectedMonth, setSelectedMonth] = useState('Mois')
  const [selectedYear, setSelectedYear] = useState('Année')
  const [selectedCity, setSelectedCity] = useState('Ville')

  return (
    <div className="agenda-page">
      
      {/* Hero Section */}
      <section className="agenda-hero">
        <div className="section-container">
          <h1 className="hero-title">Agenda</h1>
        </div>
      </section>

      {/* Filtres */}
      <section className="agenda-filters-section">
        <div className="section-container">
          <div className="agenda-filters">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Mois">Mois</option>
              <option value="Janvier">Janvier</option>
              <option value="Février">Février</option>
              <option value="Mars">Mars</option>
              <option value="Avril">Avril</option>
              <option value="Mai">Mai</option>
              <option value="Juin">Juin</option>
            </select>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Année">Année</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>

            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Ville">Ville</option>
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Londres">Londres</option>
              <option value="Madrid">Madrid</option>
            </select>
          </div>
        </div>
      </section>

      {/* Liste des événements */}
      <section className="agenda-events-section">
        <div className="section-container">
          <div className="agenda-events-list">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="event-card">
                <div className="event-info">
                  <h3 className="event-title">
                    {event.role}, <em>{event.title}</em>
                  </h3>
                  <p className="event-venue">{event.venue}</p>
                  <p className="event-date">{event.date}</p>
                </div>
                <div className="event-action">
                  <button className="btn-reserve">RÉSERVER</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À venir / Projets */}
      <section className="agenda-projects-section">
        <div className="section-container">
          <h2 className="agenda-section-title">À venir / Projets</h2>
          <div className="project-item">
            <h3 className="project-title">
              Chambre <em>avec Vues</em>
            </h3>
            <p className="project-type">Concert</p>
          </div>
        </div>
      </section>

    </div>
  )
}