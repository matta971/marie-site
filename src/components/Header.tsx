import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: 'Services' },
  { to: '/medias', label: 'Médias' },
  { to: '/enseignement', label: 'Enseignement' },
  { to: '/biographie', label: 'Biographie' },
  { to: '/contact', label: 'Contact / Réservation' },
]

export default function Header(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Écouter le scroll pour déclencher l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      // Déclencher l'effet après 50px de scroll
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Nettoyage de l'événement
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`header ${isScrolled ? 'header-scrolled' : 'header-top'}`}
    >
      <div className="header-content">
        <Link to="/" className="logo">Marie-Émeraude Alcime</Link>
        <nav>
          <ul className="nav">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bouton menu mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navigation"
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      {/* Menu mobile */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setMobileMenuOpen(false)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}