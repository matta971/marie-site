import  { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Les intitulés et descriptions des offres vivent dans les fichiers de langue,
// sous les clés « teaching.* », et sont donc traduits dans les 7 langues.
// Ils étaient auparavant écrits en dur ici, et restaient donc en français.
const CLES_OFFRES: Record<'cours' | 'masterclasses' | 'ateliers', string[]> = {
  cours: ['c1', 'c2', 'c3', 'c4', 'c5'],
  masterclasses: ['m1', 'm2', 'm3', 'm4'],
  ateliers: ['a1', 'a2', 'a3', 'a4'],
}

export default function Enseignement() {
  const [activeTab, setActiveTab] = useState<'cours' | 'masterclasses' | 'ateliers'>('cours')
  const { t } = useTranslation()

  const currentServices = CLES_OFFRES[activeTab].map(cle => ({
    title: t(`teaching.${cle}t`),
    description: t(`teaching.${cle}d`),
  }))

  return (
    <div className="enseignement-page">
      
      {/* Hero Section */}
      <section className="enseignement-hero">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="hero-title">{t('services.title')}</h1>
          </div>

          {/* Navigation tabs */}
          <div className="enseignement-tabs">
            <button
              onClick={() => setActiveTab('cours')}
              className={`enseignement-tab ${activeTab === 'cours' ? 'active' : ''}`}
            >
              {t('services.courses')}
            </button>
            <button
              onClick={() => setActiveTab('masterclasses')}
              className={`enseignement-tab ${activeTab === 'masterclasses' ? 'active' : ''}`}
            >
              {t('services.masterclasses')}
            </button>
            <button
              onClick={() => setActiveTab('ateliers')}
              className={`enseignement-tab ${activeTab === 'ateliers' ? 'active' : ''}`}
            >
              {t('services.workshops')}
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="enseignement-services">
        <div className="enseignement-services-container">
          <div className="services-grid">
            {currentServices.map((service, index) => (
              <div 
                key={index} 
                className={`service-card ${currentServices.length % 2 !== 0 && index === currentServices.length - 1 ? 'service-card-last' : ''}`}
              >
                <h2 className="service-card-title">{service.title}</h2>
                <p className="service-card-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section témoignages retirée : elle affichait six avis fabriqués par le
          gabarit, signés de noms de personnes qui n'existent pas. À rétablir
          quand de vrais témoignages d'élèves auront été recueillis. */}

      {/* CTA Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center">
            <div className="bio-cta-buttons">
              <Link to="/contact" className="btn-secondary">
                {t('services.contactCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}