import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useNotionData } from '../hooks/useNotionData'
import { getPressArticles } from '../services/notionService'

/**
 * Espace pro : ce qu'un programmateur ou un journaliste cherche en trente
 * secondes pour présenter ou engager Marie-Émeraude Alcime.
 *
 * Tout ce qui figure ici est vérifié. Les rôles sont ceux du répertoire Notion
 * attestés par une production (Carmen, dont aucune source ne témoigne, en est
 * volontairement absente), les critiques viennent de la base Presse, et seules
 * les photos dont le photographe est connu sont proposées au téléchargement.
 */

// Les noms d'œuvres et de rôles ne se traduisent pas : ils restent dans leur langue d'usage.
const ROLES = [
  { role: 'La Mère', oeuvre: "Les Contes d'Hoffmann", compositeur: 'Offenbach', lieu: 'Opéra-Théâtre de Metz' },
  { role: 'Madame de Quimper-Karadec', oeuvre: 'La Vie parisienne', compositeur: 'Offenbach', lieu: 'Opéra-Théâtre de Metz, Opéra de Massy' },
  { role: 'La Cieca', oeuvre: 'La Gioconda', compositeur: 'Ponchielli', lieu: 'Opéra-Théâtre de Metz' },
  { role: 'Madame Cardoza', oeuvre: 'Titanic', compositeur: 'Maury Yeston', lieu: 'Opéra-Théâtre de Metz' },
  { role: 'La Badessa', oeuvre: 'Suor Angelica', compositeur: 'Puccini', lieu: 'Opéra-Théâtre de Metz' },
]

const PHOTOS = [
  { src: '/images/galerie/21-portrait-creole-sourire.jpg', credit: '© Nicky Mariette' },
  { src: '/images/galerie/10-costume-creole.jpg', credit: '© Nicky Mariette' },
  { src: '/images/galerie/19-creole-porte-bleue.jpg', credit: '© Nicky Mariette' },
]

const PROFILS = [
  { nom: 'Ôlyrix', url: 'https://www.olyrix.com/artistes/17547/marie-emeraude-alcime' },
  { nom: 'YouTube', url: 'https://www.youtube.com/@doucinay' },
  { nom: 'Instagram', url: 'https://www.instagram.com/doucinay/' },
]

function BoutonCopier({ texte }: { texte: string }) {
  const { t } = useTranslation()
  const [copie, setCopie] = useState(false)

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texte)
      setCopie(true)
      setTimeout(() => setCopie(false), 2000)
    } catch {
      // Presse-papiers refusé (page non sécurisée, permission) : le texte reste sélectionnable.
    }
  }

  return (
    <button type="button" onClick={copier} className="pro-copy" aria-live="polite">
      {copie ? t('pro.copied') : t('pro.copy')}
    </button>
  )
}

export default function EspacePro() {
  const { t } = useTranslation()
  const { data: articles } = useNotionData(getPressArticles)

  const critiques = (articles || [])
    .filter(a => a.display)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  const bios = [
    { label: t('pro.bioShortLabel'), texte: t('pro.bioShort') },
    { label: t('pro.bioMediumLabel'), texte: t('pro.bioMedium') },
  ]

  return (
    <div className="presse-page pro-page">
      <section className="presse-hero">
        <div className="section-container">
          <h1 className="hero-title">{t('pro.title')}</h1>
          <p className="pro-intro">{t('pro.intro')}</p>
        </div>
      </section>

      {/* Présentation, en deux longueurs prêtes à reprendre */}
      <section className="pro-section">
        <div className="section-container">
          <h2 className="presse-section-title">{t('pro.bioTitle')}</h2>
          <div className="pro-bios">
            {bios.map(bio => (
              <article key={bio.label} className="pro-card">
                <div className="pro-card-head">
                  <h3 className="pro-card-title">{bio.label}</h3>
                  <BoutonCopier texte={bio.texte} />
                </div>
                <p className="pro-bio-text">{bio.texte}</p>
              </article>
            ))}
          </div>
          <p className="pro-more">
            <Link to="/biographie" className="contact-link">{t('pro.fullBio')} →</Link>
          </p>
        </div>
      </section>

      {/* Rôles marquants */}
      <section className="pro-section">
        <div className="section-container">
          <h2 className="presse-section-title">{t('pro.rolesTitle')}</h2>
          <ul className="pro-roles">
            {ROLES.map(r => (
              <li key={r.role} className="pro-role">
                <span className="pro-role-name">{r.role}</span>
                <span className="pro-role-work"><em>{r.oeuvre}</em>, {r.compositeur}</span>
                <span className="pro-role-venue">{r.lieu}</span>
              </li>
            ))}
          </ul>
          <p className="pro-more">
            <Link to="/repertoire" className="contact-link">{t('pro.allRepertoire')} →</Link>
          </p>
        </div>
      </section>

      {/* Critiques, citées dans leur langue d'origine */}
      {critiques.length > 0 && (
        <section className="pro-section">
          <div className="section-container">
            <h2 className="presse-section-title">{t('pro.pressTitle')}</h2>
            <div className="pro-quotes">
              {critiques.map(c => (
                <figure key={c.id} className="pro-quote">
                  <blockquote lang="fr">« {c.quote} »</blockquote>
                  <figcaption>
                    {c.articleLink ? (
                      <a href={c.articleLink} target="_blank" rel="noopener noreferrer" className="contact-link">{c.source}</a>
                    ) : c.source}
                    {c.date && <>, {new Date(c.date).getFullYear()}</>}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="pro-more">
              <Link to="/presse" className="contact-link">{t('pro.allPress')} →</Link>
            </p>
          </div>
        </section>
      )}

      {/* Photos avec leur crédit */}
      <section className="pro-section">
        <div className="section-container">
          <h2 className="presse-section-title">{t('pro.photosTitle')}</h2>
          <p className="pro-note">{t('pro.photosNote')}</p>
          <div className="pro-photos">
            {PHOTOS.map(p => (
              <figure key={p.src} className="pro-photo">
                <img src={p.src} alt={`Marie-Émeraude Alcime, ${p.credit}`} loading="lazy" />
                <figcaption>
                  <span>{p.credit}</span>
                  <a href={p.src} download className="contact-link">{t('pro.download')}</a>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos et contact */}
      <section className="pro-section">
        <div className="section-container">
          <div className="dossier-content">
            <div className="dossier-text">
              <h3 className="dossier-subtitle">{t('pro.videosTitle')}</h3>
              <p className="dossier-description">{t('pro.videosText')}</p>
              <Link to="/medias" className="btn-download">{t('pro.seeVideos')}</Link>
            </div>
            <div className="dossier-text">
              <h3 className="dossier-subtitle">{t('pro.contactTitle')}</h3>
              <p className="dossier-description">{t('pro.contactText')}</p>
              <Link to="/contact" className="btn-contact">{t('pro.contactButton')}</Link>
            </div>
          </div>
          <p className="pro-elsewhere">
            {t('pro.elsewhere')}{' '}
            {PROFILS.map((p, i) => (
              <span key={p.nom}>
                {i > 0 && ' · '}
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="contact-link">{p.nom}</a>
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  )
}
