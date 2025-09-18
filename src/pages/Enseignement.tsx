import React, { useState } from 'react'

export default function Enseignement(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState('cours')
  const [selectedDate, setSelectedDate] = useState(7)

  // Données simulées pour le calendrier
  const calendarData = {
    month: 'April 2024',
    dates: [
      { date: 1, available: true },
      { date: 2, available: true },
      { date: 3, available: true },
      { date: 4, available: true },
      { date: 5, available: true },
      { date: 7, available: false }, // Sélectionné
      { date: 8, available: true },
      { date: 9, available: true },
      { date: 10, available: false },
      { date: 11, available: true },
      { date: 12, available: true },
      { date: 13, available: true },
      { date: 14, available: true },
      { date: 15, available: true },
      { date: 16, available: true },
      { date: 17, available: true },
      { date: 18, available: true },
      { date: 19, available: true },
      { date: 20, available: true },
      { date: 21, available: true },
      { date: 23, available: true },
      { date: 24, available: false },
      { date: 25, available: true },
      { date: 27, available: true },
      { date: 28, available: true },
      { date: 29, available: true },
      { date: 30, available: true },
    ]
  }

  const coursTypes = [
    {
      id: 'particuliers',
      title: 'Cours particuliers',
      subtitle: 'Connaître à vous particuliers',
      icon: '👤'
    },
    {
      id: 'coaching',
      title: 'Coaching vocal',
      subtitle: 'Assister au technique respiratoire',
      icon: '🎤'
    },
    {
      id: 'technique',
      title: 'Technique respiratoire',
      subtitle: 'En savoir polus',
      icon: '🫁'
    },
    {
      id: 'interpretation',
      title: 'Interprétation',
      subtitle: 'Preparer au en savoir plus',
      icon: '🎭'
    },
    {
      id: 'audition',
      title: 'Préparation audition/concours',
      subtitle: 'En savoir plus',
      icon: '📋'
    }
  ]

  return (
    <div className="section-bg-primary min-h-screen">
      {/* Header de page */}
      <div className="section-bg-primary border-b border-gray-200 py-8">
        <div className="section-container">
          <h1 className="title-section mb-6">Enseignement</h1>
          
          {/* Tabs de navigation */}
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('cours')}
              className={`tab ${activeTab === 'cours' ? 'active' : 'inactive'}`}
            >
              Cours
            </button>
            <button
              onClick={() => setActiveTab('masterclasses')}
              className={`tab ${activeTab === 'masterclasses' ? 'active' : 'inactive'}`}
            >
              Masterclasses
            </button>
            <button
              onClick={() => setActiveTab('ateliers')}
              className={`tab ${activeTab === 'ateliers' ? 'active' : 'inactive'}`}
            >
              Ateliers
            </button>
          </div>
        </div>
      </div>

      <div className="section-container section-padding">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Types de cours */}
          <div>
            <div className="space-y-4">
              {coursTypes.map((cours) => (
                <div key={cours.id} className="card smooth-hover cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white text-xl">
                      <span>{cours.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="title-card text-accent mb-1">{cours.title}</h3>
                      <p className="text-small text-gray-600">{cours.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agenda des cours */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="title-subsection">Agenda des cours</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <span className="text-gray-600">‹</span>
                  </button>
                  <span className="text-body font-medium">{calendarData.month}</span>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <span className="text-gray-600">›</span>
                  </button>
                </div>
              </div>

              {/* Calendrier */}
              <div className="card">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['S', 'MA', 'ME', 'JE', 'VE', 'S', 'D'].map((day) => (
                    <div key={day} className="text-center text-caption text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarData.dates.map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => setSelectedDate(dateObj.date)}
                      className={`calendar-date ${
                        selectedDate === dateObj.date
                          ? 'selected'
                          : dateObj.available
                          ? 'available'
                          : 'unavailable'
                      }`}
                      disabled={!dateObj.available}
                    >
                      {dateObj.date}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <a href="#" className="link-primary text-small">
                  Voir le calendrier
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite - Témoignages et Contact */}
          <div className="space-y-12">
            
            {/* Citation d'élève */}
            <div className="bg-light p-6 rounded-lg">
              <p className="text-body italic mb-4">
                "Lorem ipsum dolor sit amet, consectetur adipisiring elit."
              </p>
              <div className="border-b border-gray-300 w-16 mb-4"></div>
              <h3 className="title-subsection">Témoignages élèves</h3>
              <p className="text-small text-gray-600 mb-4">
                "Je suis sortie de sa classe aussi une non cansformée."
              </p>
              <div className="text-small text-gray-500">
                <div className="font-medium">N. D.</div>
                <a href="#" className="link-primary">Lire les avis</a>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="title-subsection">FAQ</h3>
              <p className="text-small text-gray-600 mb-4">
                Réponses aux questions fréquentes
              </p>
              <a href="#" className="link-primary text-small">
                Consulter
              </a>
            </div>

            {/* Formulaire de contact */}
            <div>
              <h3 className="title-subsection mb-6">Contact pour cours</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Objet"
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Adresse email"
                    className="form-input"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message"
                    rows={4}
                    className="form-textarea"
                  ></textarea>
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="form-checkbox mt-1"
                  />
                  <label htmlFor="consent" className="text-small text-gray-600">
                    J'accepte que mes données soient utilisées pour me recontacter
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Réserver un cours
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}