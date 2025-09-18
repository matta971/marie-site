import React from 'react'
import { Link } from 'react-router-dom'

export default function Biographie(): React.JSX.Element {
  return (
    <div className="section-bg-primary min-h-screen">
      {/* Breadcrumb */}
      <div className="section-bg-secondary border-b border-gray-200 py-4">
        <div className="section-container">
          <nav className="text-small text-gray-600">
            <Link to="/" className="link-secondary">ACCUEIL</Link>
            <span className="mx-2">/</span>
            <span className="text-accent font-medium">BIOGRAPHIE</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="title-hero mb-8">Biographie</h1>
          </div>

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

      {/* Section Parcours avec petite image */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Contenu Parcours */}
            <div className="lg:col-span-2">
              <h2 className="title-section">Parcours</h2>
              
              <div className="mb-8">
                <h3 className="title-subsection">Formation</h3>
                <p className="text-body italic mb-6">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                </p>
                <p className="text-body leading-relaxed">
                  Formée dans une approche complète de l'art lyrique, Marie-Émeraude 
                  combine technique vocale rigoureuse et sensibilité artistique. 
                  Son parcours, entre tradition caribéenne et formation classique 
                  européenne, nourrit une interprétation personnelle et authentique 
                  du répertoire lyrique français et italien.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="title-subsection">Scènes & Collaborations</h3>
                <p className="text-body leading-relaxed">
                  Membre du chœur de l'Opéra-Théâtre de Metz Métropole, elle se produit 
                  sur scène dans diverses productions et développe en parallèle une activité 
                  de cheffe de chœur et pédagogue. Ses collaborations s'étendent aux grandes 
                  institutions lyriques françaises.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="title-subsection">Prix / Distinctions</h3>
                <p className="text-body leading-relaxed">
                  Recognition de la critique spécialisée pour ses interprétations dans 
                  le répertoire français et italien. Lauréate de plusieurs concours 
                  internationaux de chant lyrique.
                </p>
              </div>
            </div>

            {/* Petite image à droite */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=400&auto=format&fit=crop"
                  alt="Marie Émeraude Alcime en concert"
                  className="w-full h-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Presse avec citations */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <h2 className="title-section text-center mb-12">Presse</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Citation 1 */}
            <blockquote className="border-l-4 border-accent pl-6 py-4">
              <p className="text-body italic text-lg mb-4">
                "Une voix délicate qui touche et captive le public dès les premières mesures."
              </p>
              <footer className="text-small font-medium text-accent">
                LE MONDE
              </footer>
            </blockquote>

            {/* Citation 2 */}
            <blockquote className="border-l-4 border-accent pl-6 py-4">
              <p className="text-body italic text-lg mb-4">
                "Un moment d'émotion pur, magnifiquement servi par une technique irréprochable."
              </p>
              <footer className="text-small font-medium text-accent">
                THE AGE
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Section galerie photos */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Photo 1 */}
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop"
                alt="Performance 1"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Photo 2 */}
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop"
                alt="Performance 2"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Photo 3 - Grande photo sur mobile, visible uniquement sur desktop */}
            <div className="hidden lg:block bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=400&auto=format&fit=crop"
                alt="Performance 3"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section signature */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <div className="text-center">
            <div className="mb-6">
              <div className="signature text-4xl">MA</div>
              <div className="text-small">
                <div className="font-medium">Marie Emeraude Alcime</div>
                <div className="text-gray-600">Cantatrice</div>
              </div>
            </div>
            <div className="text-small text-gray-600 uppercase tracking-wider">
              NOM DU JOURNAL
            </div>
          </div>
        </div>
      </section>

      {/* CTA Buttons */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/medias" className="btn-secondary w-full sm:w-auto text-center">
              Voir médias
            </Link>
            <Link to="/repertoire" className="btn-secondary w-full sm:w-auto text-center">
              Répertoire
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}