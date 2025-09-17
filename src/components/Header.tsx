import { JSX } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/biographie', label: 'Biographie' },
  { to: '/medias', label: 'Médias' },
  { to: '/agenda', label: 'Agenda' },
  { to: '/presse', label: 'Presse' },
  { to: '/enseignement', label: 'Enseignement' },
  { to: '/contact', label: 'Contact' },
]

export default function Header(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-700 bg-emerald-900/95 backdrop-blur text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo/Nom - Style serif comme dans la maquette */}
        <Link to="/" className="font-serif text-lg sm:text-xl tracking-tight hover:text-yellow-300 transition-colors">
          Marie Émeraude Alcime
        </Link>
        
        {/* Navigation principale */}
        <nav className="hidden md:flex gap-6 text-sm">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-yellow-300 bg-emerald-800' 
                    : 'text-emerald-100 hover:text-yellow-300 hover:bg-emerald-800'
                }`
              }
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        
        {/* Bouton CTA */}
        <div className="flex items-center gap-4">
          
          {/* Bouton Réserver */}
          <Link
            to="/contact"
            className="rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 text-sm font-semibold transition-colors"
          >
            Réserver
          </Link>
        </div>
      </div>
      
      {/* Version mobile (optionnelle) */}
      <div className="md:hidden border-t border-emerald-700 bg-emerald-900">
        <nav className="flex flex-wrap gap-1 p-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded text-xs transition-colors ${
                  isActive 
                    ? 'text-yellow-300 bg-emerald-800' 
                    : 'text-emerald-100 hover:text-yellow-300'
                }`
              }
              end={l.to === '/'}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}