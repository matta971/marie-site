import  { useState, useMemo, useEffect, useRef } from 'react'
import { useNotionData } from '../hooks/useNotionData';
import { getConcerts } from '../services/notionService';
import { formatDate, getMonth, getYear } from '../utils/dateUtils';
import { useTranslation } from 'react-i18next';
import { useTranslatedArray } from '../hooks/useTranslatedContent';



/*const upcomingEvents: Event[] = [
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
]*/

export default function Agenda() {
  const { data: concerts, loading, error } = useNotionData(getConcerts);
  const { t } = useTranslation();
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

  const [selectedMonth, setSelectedMonth] = useState('Tous les mois')
  const [selectedYear, setSelectedYear] = useState('Toutes les années')
  const [selectedCity, setSelectedCity] = useState('Toutes les villes')

  // Traduire les textes dynamiques des concerts
  const translatedConcerts = useTranslatedArray(
    concerts as unknown as Record<string, unknown>[] | undefined,
    ['title', 'role', 'location', 'description']
  ) as unknown as typeof concerts

  // Séparer concerts futurs et passés
  const now = new Date();

  // Filtrer les concerts à afficher
  const visibleConcerts = translatedConcerts?.filter(c => c.display) || [];
  
  // Concerts à venir (format pour les event cards)
  const upcomingConcerts = visibleConcerts?.filter(
    concert => new Date(concert.date) >= now
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];

  // Concerts passés
  const pastConcerts  = visibleConcerts?.filter(
    concert => new Date(concert.date) < now
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  /*
  .map(concert => ({
    date: formatDate(concert.date),
    work: concert.title,
    role: concert.role || '',
    place: concert.location,
    city: concert.ville || '',
    ticketUrl: concert.ticketLink
  })) || [];*/
  // Extraire les valeurs uniques pour les filtres basés sur TOUS les concerts
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    visibleConcerts.forEach(concert => {
      months.add(getMonth(concert.date));
    });
    return Array.from(months).sort((a, b) => {
      const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
                         'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      return monthNames.indexOf(a.toLowerCase()) - monthNames.indexOf(b.toLowerCase());
    });
  }, [visibleConcerts]);

  const availableYears = useMemo(() => {
    const years = new Set<string>();
    visibleConcerts.forEach(concert => {
      years.add(getYear(concert.date));
    });
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  }, [visibleConcerts]);

  const availableCities = useMemo(() => {
    const cities = new Set<string>();
    visibleConcerts.forEach(concert => {
      if (concert.ville) {
        cities.add(concert.ville);
      }
    });
    return Array.from(cities).sort();
  }, [visibleConcerts]);

  // Filtrer les concerts à afficher selon les sélections
  const filteredUpcomingConcerts = useMemo(() => {
    return upcomingConcerts.filter(concert => {
      const matchMonth = selectedMonth === 'Tous les mois' || getMonth(concert.date) === selectedMonth;
      const matchYear = selectedYear === 'Toutes les années' || getYear(concert.date) === selectedYear;
      const matchCity = selectedCity === 'Toutes les villes' || concert.ville === selectedCity;
      return matchMonth && matchYear && matchCity;
    });
  }, [upcomingConcerts, selectedMonth, selectedYear, selectedCity]);

  const filteredPastConcerts = useMemo(() => {
    return pastConcerts.filter(concert => {
      const matchMonth = selectedMonth === 'Tous les mois' || getMonth(concert.date) === selectedMonth;
      const matchYear = selectedYear === 'Toutes les années' || getYear(concert.date) === selectedYear;
      const matchCity = selectedCity === 'Toutes les villes' || concert.ville === selectedCity;
      return matchMonth && matchYear && matchCity;
    });
  }, [pastConcerts, selectedMonth, selectedYear, selectedCity]);

  // Affichage du chargement
  if (loading) {
    return (
      <div className="agenda-page">
        <section className="agenda-hero">
          <div className="section-container">
            <h1 className="hero-title">{t('agenda.title')}</h1>
            <p className="text-center mt-4">{ t('agenda.loading')}</p>
          </div>
        </section>
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="agenda-page">
        <section className="agenda-hero">
          <div className="section-container">
            <h1 className="hero-title">{t('agenda.title')}</h1>
            <p className="text-center mt-4 text-red-600">
              {t('agenda.error')}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="agenda-page">
      
      {/* Hero Section */}
      <section className="agenda-hero">
        <div className="section-container">
          <h1 className="hero-title">{t('agenda.title')}</h1>
        </div>
      </section>

      {/* Section Événements à venir */}
        <>
      {/* Sentinelle pour détecter le sticky */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* Filtres */}
      <section className={`agenda-filters-section ${isStuck ? 'is-stuck' : ''}`}>
        <div className="section-container">
          <div className="agenda-filters">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Tous les mois">{t('agenda.allMonths')}</option>
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </option>
              ))}
            </select>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Toutes les années">{t('agenda.allYears')}</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="agenda-filter-select"
            >
              <option value="Toutes les villes">{t('agenda.allCities')}</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Liste des événements à venir */}
      {filteredUpcomingConcerts.length > 0 && (
          <section className="agenda-events-section">
          <div className="section-container">
            <h2 className="agenda-section-title">{ t('agenda.upcoming')}</h2>
            <div className="agenda-events-list">
              {filteredUpcomingConcerts.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-info">
                    <h3 className="event-title">
                      {event.role && <>{event.role}, </>}
                      <em>{event.title}</em>
                    </h3>
                    <p className="event-venue">{event.location}</p>
                    {event.ville && <p className="event-city">{event.ville}</p>}
                    <p className="event-date">{formatDate(event.date)}</p>
                    {event.description && (
                      <p className="event-description mt-2 text-sm">{event.description}</p>
                    )}
                  </div>
                  <div className="event-action">
                    {event.ticketLink ? (
                      <a 
                        href={event.ticketLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-reserve"
                      >
                        {t('agenda.book')}
                      </a>
                    ) : (
                      <button className="btn-reserve" disabled>{t('agenda.soon')}</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Message si aucun événement à venir */}
      {filteredUpcomingConcerts.length === 0 && filteredPastConcerts.length === 0 && (
        <section className="agenda-events-section">
          <div className="section-container text-center">
            <p className="text-gray-600 italic">
              {t('agenda.noResults')}
            </p>
            <button 
              onClick={() => {
                setSelectedMonth('Tous les mois');
                setSelectedYear('Toutes les années');
                setSelectedCity('Toutes les villes');
              }}
              className="btn-contact"
            >
              {t('agenda.resetFilters')}
            </button>
          </div>
        </section>
      )}

      {/* Section Concerts passés */}
      {filteredPastConcerts.length > 0 && (
        <section className="agenda-events-section agenda-past-section">
          <div className="section-container">
            <h2 className="agenda-section-title">{ t('agenda.past')}</h2>
            <div className="agenda-events-list">
              {filteredPastConcerts.map((event) => (
                <div key={event.id} className="event-card past-event">
                  <div className="event-info">
                    <h3 className="event-title">
                      {event.role && <>{event.role}, </>}
                      <em>{event.title}</em>
                    </h3>
                    <p className="event-venue">{event.location}</p>
                    {event.ville && <p className="event-city">{event.ville}</p>}
                    <p className="event-date">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section À venir / Projets */}
      <section className="agenda-projects-section">
        <div className="section-container">
          <h2 className="agenda-section-title">{ t('agenda.projects')}</h2>
          <div className="project-item">
            <h3 className="project-title">
              Chambre <em>avec Vues</em>
            </h3>
            <p className="project-type">{ t('agenda.concert')}</p>
          </div>
        </div>
      </section>
      </>
    </div>
  )
}