import React from 'react'
import { Link } from 'react-router-dom'

export default function Biographie(): React.JSX.Element {
  return (
    <div className="section-bg-primary min-h-screen">

      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          

          {/* Layout principal - Image + texte avec lettrine */}
          <div className="grid lg:grid-cols-5 gap-12 items-start mb-16">
            
            {/* Image principale à gauche */}
            <div className="lg:col-span-2">
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=800&auto=format&fit=crop"
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
                <p>
                  <span className="lettrine">A</span>
                  lors quid autem sunt et ut corpore veritatis sunt blanditiis pariis ut
                  corporis nobis distinctio quis perferendis soluta ullam. Quid
                  distinctio libero eos autem eos voluptas sed ullam.
                </p>
                <p>
                  Marie-Émeraude Alcime est une mezzo-soprano originaire de Guadeloupe. 
                  Issue d'une famille de musiciens, elle débute très tôt le piano, la flûte 
                  traversière et les percussions traditionnelles. Après un baccalauréat 
                  littéraire option musique, elle poursuit des études supérieures en 
                  musicologie et métiers de la scène (Rouen, Nancy), avant d'intégrer 
                  le chœur de l'Opéra-Théâtre de Metz Métropole.
                </p>
                <p>
                  Sur scène, on a pu l'entendre dans <em>Les Contes d'Hoffmann</em> 
                  d'Offenbach (Metz) et <em>La vie parisienne</em> (Metz, Massy). 
                  Au concert, son répertoire inclut l'<em>Oratorio de Noël</em> 
                  (Saint-Saëns), le <em>Stabat Mater</em> (Pergolèse) et la 
                  <em>Petite messe solennelle</em> (Rossini). Parallèlement, elle 
                  développe une activité de cheffe de chœur et professeure de chant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu en deux colonnes - Parcours/Presse à gauche, Images à droite */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <div className="bio-two-columns">
            
            {/* Colonne gauche - Contenu textuel */}
            <div className="bio-content-column">
              
              {/* Section Parcours */}
              <div className="bio-section">
                <h2 className="bio-section-title">Parcours</h2>
                
                <div className="bio-subsections">
                  <div>
                    <h3 className="bio-subsection-title">Formation</h3>
                    <p className="bio-text">
                      Une formation accompnée toute s essannée lsourge par une renomee épreuve des teribres, des colbquaraeurs.
                    </p>
                  </div>

                  <div>
                    <h3 className="bio-subsection-title">Scènes & Collaborations</h3>
                  </div>

                  <div>
                    <h3 className="bio-subsection-title">Prix / Distinctions</h3>
                  </div>
                </div>
              </div>

              {/* Section Presse */}
              <div className="bio-section">
                <h2 className="bio-section-title">Presse</h2>
                
                <div className="bio-quotes">
                  {/* Citation 1 */}
                  <blockquote className="bio-quote">
                    <svg className="bio-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p className="bio-quote-text">
                      Une voix déliuat qui rouche et captive le public dès les premières mesures.
                    </p>
                    <footer className="bio-quote-source">LE MONDE</footer>
                  </blockquote>

                  {/* Citation 2 */}
                  <blockquote className="bio-quote">
                    <svg className="bio-quote-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p className="bio-quote-text">
                      Un moment d'émotion pàx, magnifiquement
                    </p>
                    <footer className="bio-quote-source">THE AGE</footer>
                  </blockquote>
                </div>
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
      <section className="section-bg-primary section-padding pt-0">
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