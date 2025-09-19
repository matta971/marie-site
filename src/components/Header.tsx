import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/biographie', label: 'Biographie' },
  { to: '/repertoire', label: 'Répertoire' },
  { to: '/enseignement', label: 'Enseignement' },
  { to: '/medias', label: 'Médias' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/presse', label: 'Presse' },
  { to: '/contact', label: 'Contact' },
]

export default function Header(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-content">
        
        {/* Logo - utilise votre classe .logo existante */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          Marie Émeraude Alcime
        </Link>
        
        {/* Navigation principale - Desktop - utilise vos classes .nav existantes */}
        <nav className="nav hidden lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => isActive ? 'active' : ''}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bouton hamburger - Mobile */}
        <button
          className="lg:hidden p-2 hover:bg-opacity-20 rounded-lg transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Menu de navigation"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'
            }`}></div>
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'mb-1'
            }`}></div>
            <div className={`w-5 h-0.5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
            }`}></div>
          </div>
        </button>
      </div>
      
      {/* Menu mobile déroulant */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div 
          className="border-t border-white border-opacity-20 shadow-lg"
          style={{ backgroundColor: 'var(--color-emerald-deep)' }}
        >
          <nav className="py-4 px-6 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-opacity-20' 
                      : 'hover:bg-opacity-10'
                  }`
                }
                style={{ 
                  color: 'white',
                  fontFamily: 'var(--font-text)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textDecoration: 'none'
                }}
                end={link.to === '/'}
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}