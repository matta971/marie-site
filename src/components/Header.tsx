import React, { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

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
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <header className={`header-bg ${isHomePage ? 'home' : 'other'}`}>
      <div className="section-container py-4 flex items-center justify-between">
        
        {/* Logo ME */}
        <Link to="/" className="flex items-center group">
          <div className="logo-circle group-hover:scale-105">
            <span className="text-white font-title text-xl italic font-bold">ME</span>
          </div>
          <div className="logo-text">
            <div className="logo-name">Marie Emeraude Alcime</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">FR</div>
          </div>
        </Link>
        
        {/* Navigation principale - Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bouton hamburger - Mobile */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navigation"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <div className={`w-5 h-0.5 bg-emerald-800 transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-0.5' : 'mb-1'
            }`}></div>
            <div className={`w-5 h-0.5 bg-emerald-800 transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'mb-1'
            }`}></div>
            <div className={`w-5 h-0.5 bg-emerald-800 transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''
            }`}></div>
          </div>
        </button>
      </div>
      
      {/* Menu mobile déroulant */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <nav className="py-4 px-6 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-mobile-item ${isActive ? 'active' : ''}`}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
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