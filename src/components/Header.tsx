import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
    { to: '/biographie', label: 'Biographie' },
  { to: '/repertoire', label: 'Répertoire' },

  { to: '/enseignement', label: 'Services' },
 // { to: '/services', label: 'Services' },
  { to: '/agenda', label: 'Agenda' },
    { to: '/presse', label: 'Presse' },
  { to: '/medias', label: 'Médias' },
  { to: '/contact', label: 'Contact' },
]

export default function Header(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Écouter le scroll pour déclencher l'effet de transparence
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Fermer le menu mobile quand on redimensionne vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    <header 
      className={`header ${isScrolled ? 'header-scrolled' : 'header-top'}`}
    >
      <div className="header-content">
        <Link to="/" className="logo">Marie-Émeraude Alcime</Link>
        
        {/* Navigation desktop - visible seulement sur desktop */}
        <nav className="desktop-nav">
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
        
        {/* Bouton menu mobile - visible seulement sur mobile */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navigation"
          aria-expanded={mobileMenuOpen}
        >
          <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
      
      {/* Menu mobile - s'affiche seulement quand ouvert ET en mode mobile */}
      {mobileMenuOpen && (
        <div className="mobile-menu open">
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
      )}
    </header>
  )
}