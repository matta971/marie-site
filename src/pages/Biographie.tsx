import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBiographyContent } from '../services/biographyService'
import type { BiographyContent } from '../types/notion.types';

export default function Biographie(): React.JSX.Element {
  const [content, setContent] = useState<BiographyContent>({
    mainBio: '',
    formation: '',
    scenes: '',
    distinctions: '',
    pressCitations: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBiographyContent().then(data => {
      setContent(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="biographie-page">
        <section className="section-padding">
          <div className="section-container text-center">
            <h1 className="hero-title">Biographie</h1>
            <p className="mt-4">Chargement...</p>
          </div>
        </section>
      </div>
    )
  }

  // Extraire la première lettre pour la lettrine
  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
  const plainBio = stripHtml(content.mainBio);
  const firstLetter = plainBio ? plainBio[0] : '';
  
  // Pour le reste du texte, on doit retirer le premier caractère visible
  let restOfBio = content.mainBio;
  if (restOfBio && firstLetter) {
    // Si le texte commence par une balise HTML, on la garde et on supprime le premier caractère après
    if (restOfBio.startsWith('<')) {
      // Trouver la fin de la balise ouvrante
      const endOfTag = restOfBio.indexOf('>');
      if (endOfTag !== -1) {
        // Garder la balise et supprimer le premier caractère après
        restOfBio = restOfBio.substring(0, endOfTag + 1) + 
                   restOfBio.substring(endOfTag + 2);
      }
    } else {
      // Si pas de balise au début, supprimer simplement le premier caractère
      restOfBio = restOfBio.substring(1);
    }
  }

  return (
    <div className="biographie-page">

      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          
          {/* Layout principal - Image + texte avec lettrine */}
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
            
            {/* Image principale à gauche */}
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="/images/portrait-face-main-buste.jpg"
                  alt="Marie Émeraude Alcime - Portrait"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>
            
            {/* Contenu textuel à droite */}
            <div className="lg:col-span-3">
              <div className="text-center mb-12">
                <h1 className="hero-title mb-8">Biographie</h1>
              </div>
              <div className="text-body space-y-6 leading-relaxed">
                {content.mainBio && (
                  <p>
                    <span className="lettrine">{firstLetter}</span>
                    <span dangerouslySetInnerHTML={{ __html: restOfBio }} />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu en deux colonnes - Parcours/Presse à gauche, Images à droite */}
      <section className="section-padding">
        <div className="section-container">
          <div className="bio-two-columns">
            
            {/* Colonne gauche - Contenu textuel */}
            <div className="bio-content-column">
              
              {/* Section Parcours */}
              <div className="bio-section">
                <h2 className="bio-section-title">Parcours</h2>
                
                <div className="bio-subsections">

                  {/* Formation */}
                  {content.formation && (
                    <div>
                      <h3 className="bio-subsection-title">Formation</h3>
                      <p 
                        className="bio-text"
                        dangerouslySetInnerHTML={{ __html: content.formation }}
                      />
                    </div>
                  )}

                  {/* Scènes & Collaborations */}
                  {content.scenes && (
                    <div>
                      <h3 className="bio-subsection-title">Scènes & Collaborations</h3>
                      <div 
                        className="bio-text"
                        dangerouslySetInnerHTML={{ __html: content.scenes }}
                      />
                    </div>
                  )}

                  {/* Prix & Distinctions */}
                  {content.distinctions && (
                    <div>
                      <h3 className="bio-subsection-title">Prix & Distinctions</h3>
                      <div 
                        className="bio-text"
                        dangerouslySetInnerHTML={{ __html: content.distinctions }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Section Presse */}
              <div className="bio-section">
                <h2 className="bio-section-title">Critiques</h2>
                {content.pressCitations.length > 0 && (
                  <div className="bio-quotes">
                    {/* Citation 1 */}
                    {content.pressCitations.map((citation, index) => (
                    <blockquote className="bio-quote" key={index}>
                      <svg key={index} className="bio-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                      </svg>
                      <p className="bio-quote-text">
                        {citation.quote}
                      </p>
                      <footer className="bio-quote-source">{citation.source}</footer>
                    </blockquote>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Colonne droite - Galerie d'images */}
            <div className="bio-gallery-column">
              {/* Deux images côte à côte en haut */}
              <div className="bio-gallery-row">
                <div className="bio-gallery-image bio-image-small">
                  <img 
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format&fit=crop"
                    alt="Performance 1"
                  />
                </div>

                <div className="bio-gallery-image bio-image-small">
                  <img 
                    src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=500&auto=format&fit=crop"
                    alt="Performance 2"
                  />
                </div>
              </div>

              {/* Une grande image en bas */}
              <div className="bio-gallery-image bio-image-large">
                <img 
                  src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=500&auto=format&fit=crop"
                  alt="Performance 3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons côte à côte */}
      <section className="section-padding pt-0">
        <div className="section-container">
          <div className="bio-cta-buttons">
            <Link to="/medias" className="btn-secondary">
              Voir médias
            </Link>
            <Link to="/repertoire" className="btn-secondary">
              Répertoire
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}