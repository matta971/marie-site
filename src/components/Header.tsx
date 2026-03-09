import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { languages } from '../i18n'

const linkKeys = [
  { to: '/', key: 'nav.home' },
  { to: '/biographie', key: 'nav.biography' },
  { to: '/repertoire', key: 'nav.repertoire' },
  { to: '/enseignement', key: 'nav.services' },
  { to: '/agenda', key: 'nav.agenda' },
  { to: '/presse', key: 'nav.press' },
  { to: '/medias', key: 'nav.media' },
  { to: '/contact', key: 'nav.contact' },
]

// SVG flags for each language
function Flag({ code, size = 20 }: { code: string; size?: number }) {
  const s = size
  switch (code) {
    case 'fr':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="fr-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#fr-c)">
            <rect width="12" height="36" fill="#002395"/>
            <rect x="12" width="12" height="36" fill="#FFFFFF"/>
            <rect x="24" width="12" height="36" fill="#ED2939"/>
          </g>
        </svg>
      )
    case 'en':
      return (
        <svg viewBox="0 0 60 30" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="en-c"><circle cx="30" cy="15" r="30"/></clipPath>
          <g clipPath="url(#en-c)">
            <rect width="60" height="30" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 V30 M0,15 H60" stroke="#FFFFFF" strokeWidth="10"/>
            <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      )
    case 'de':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="de-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#de-c)">
            <rect width="36" height="12" fill="#000000"/>
            <rect y="12" width="36" height="12" fill="#DD0000"/>
            <rect y="24" width="36" height="12" fill="#FFCC00"/>
          </g>
        </svg>
      )
    case 'it':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="it-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#it-c)">
            <rect width="12" height="36" fill="#009246"/>
            <rect x="12" width="12" height="36" fill="#FFFFFF"/>
            <rect x="24" width="12" height="36" fill="#CE2B37"/>
          </g>
        </svg>
      )
    case 'es':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="es-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#es-c)">
            <rect width="36" height="9" fill="#AA151B"/>
            <rect y="9" width="36" height="18" fill="#F1BF00"/>
            <rect y="27" width="36" height="9" fill="#AA151B"/>
          </g>
        </svg>
      )
    case 'pt':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="pt-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#pt-c)">
            <rect width="14" height="36" fill="#006600"/>
            <rect x="14" width="22" height="36" fill="#FF0000"/>
            <circle cx="14" cy="18" r="7" fill="#FFCC00"/>
          </g>
        </svg>
      )
    case 'ru':
      return (
        <svg viewBox="0 0 36 36" width={s} height={s} style={{ borderRadius: '50%', display: 'block' }}>
          <clipPath id="ru-c"><circle cx="18" cy="18" r="18"/></clipPath>
          <g clipPath="url(#ru-c)">
            <rect width="36" height="12" fill="#FFFFFF"/>
            <rect y="12" width="36" height="12" fill="#0039A6"/>
            <rect y="24" width="36" height="12" fill="#D52B1E"/>
          </g>
        </svg>
      )
    default:
      return null
  }
}

export default function Header() {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [mobileMenuOpen])

  // Fermer le menu langue au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Normaliser le code langue (ex: "fr-FR" → "fr")
  const rawLang = i18n.language
  const currentLang = languages.find(l => rawLang.startsWith(l.code))?.code || 'fr'

  const changeLang = (code: string) => {
    i18n.changeLanguage(code)
    setLangMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled || !isHome ? 'header-scrolled' : 'header-top'}`}>
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-name">Marie-Émeraude</span>
          <span className="logo-surname">Alcime</span>
        </Link>

        <nav className="desktop-nav">
          <ul className="nav">
            {linkKeys.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  end={link.to === '/'}
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          {/* Language selector */}
          <div className="lang-selector" ref={langRef}>
            <button
              className="lang-toggle"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              aria-label="Changer de langue"
              aria-expanded={langMenuOpen}
            >
              <Flag code={currentLang} size={24} />
            </button>

            {langMenuOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
                    onClick={() => changeLang(lang.code)}
                  >
                    <Flag code={lang.code} size={20} />
                    <span className="lang-option-name">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu open">
          <ul>
            {linkKeys.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                  end={link.to === '/'}
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
