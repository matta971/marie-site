import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Repertoire(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState('tous')

  // Données du répertoire organisées par catégories
  const repertoireData = {
    opera: [
      {
        title: 'Les Contes d\'Hoffmann',
        composer: 'Offenbach',
        role: 'Voix de la Mère',
        year: '2017',
        place: 'Opéra-Théâtre de Metz Métropole'
      },
      {
        title: 'La vie parisienne',
        composer: 'Offenbach',
        role: 'Madame de Quimper-Karadec',
        year: '2019',
        place: 'Opéra-Théâtre de Metz Métropole'
      },
      {
        title: 'Il Trittico',
        composer: 'Puccini',
        role: 'Distribution chorale',
        year: '2016',
        place: 'Opéra-Théâtre de Metz Métropole'
      },
      {
        title: 'Carmen',
        composer: 'Bizet',
        role: 'Mercedes',
        year: '2018',
        place: 'Théâtre de Lorraine'
      }
    ],
    sacree: [
      {
        title: 'Stabat Mater',
        composer: 'Pergolèse',
        role: 'Mezzo-soprano solo',
        year: '2018',
        place: 'Cathédrale de Metz'
      },
      {
        title: 'Oratorio de Noël',
        composer: 'Saint-Saëns',
        role: 'Mezzo-soprano solo',
        year: '2017',
        place: 'Église Saint-Martin'
      },
      {
        title: 'Petite messe solennelle',
        composer: 'Rossini',
        role: 'Mezzo-soprano solo',
        year: '2019',
        place: 'Festival de musique sacrée'
      },
      {
        title: 'Requiem',
        composer: 'Fauré',
        role: 'Mezzo-soprano solo',
        year: '2020',
        place: 'Basilique Saint-Vincent'
      }
    ],
    recital: [
      {
        title: 'Mélodies françaises',
        composer: 'Debussy, Fauré, Poulenc',
        role: 'Récital solo',
        year: '2020',
        place: 'Conservatoire de Metz'
      },
      {
        title: 'Lieder allemands',
        composer: 'Schumann, Brahms',
        role: 'Récital solo',
        year: '2019',
        place: 'Salle Poirel, Nancy'
      },
      {
        title: 'Airs d\'opéra français',
        composer: 'Massenet, Gounod, Bizet',
        role: 'Concert avec orchestre',
        year: '2021',
        place: 'Opéra National de Lorraine'
      }
    ]
  }

  const categories = [
    { id: 'tous', label: 'Tout le répertoire', count: null },
    { id: 'opera', label: 'Opéra & Opérette', count: repertoireData.opera.length },
    { id: 'sacree', label: 'Musique sacrée', count: repertoireData.sacree.length },
    { id: 'recital', label: 'Récitals & Concerts', count: repertoireData.recital.length }
  ]

  const getFilteredRepertoire = () => {
    if (activeCategory === 'tous') {
      return [
        ...repertoireData.opera,
        ...repertoireData.sacree,
        ...repertoireData.recital
      ]
    }
    return repertoireData[activeCategory as keyof typeof repertoireData] || []
  }

  const filteredRepertoire = getFilteredRepertoire()

  return (
    <div className="section-bg-primary min-h-screen">
      {/* Breadcrumb */}
      <div className="section-bg-secondary border-b border-gray-200 py-4">
        <div className="section-container">
          <nav className="text-small text-gray-600">
            <Link to="/" className="link-secondary">ACCUEIL</Link>
            <span className="mx-2">/</span>
            <span className="text-accent font-medium">RÉPERTOIRE</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="hero-title mb-6">Répertoire</h1>
            <p className="text-body mx-auto leading-relaxed">
              Découvrez l'étendue artistique de Marie-Émeraude Alcime à travers ses rôles 
              d'opéra, ses interprétations de musique sacrée et ses récitals. Un parcours 
              qui allie tradition et modernité, entre répertoire français, italien et allemand.
            </p>
          </div>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`tab ${activeCategory === category.id ? 'active' : 'inactive'}`}
              >
                {category.label}
                {category.count && (
                  <span className="ml-2 text-xs opacity-75">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Liste du répertoire */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          <div className="grid gap-6">
            {filteredRepertoire.map((item, index) => (
              <div key={index} className="card smooth-hover">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  
                  {/* Titre et compositeur */}
                  <div className="md:col-span-2">
                    <h3 className="title-card text-accent mb-1">{item.title}</h3>
                    <p className="text-small text-gray-600 font-medium">{item.composer}</p>
                  </div>
                  
                  {/* Rôle */}
                  <div>
                    <div className="text-small text-gray-500 uppercase tracking-wide mb-1">Rôle</div>
                    <p className="text-body font-medium">{item.role}</p>
                  </div>
                  
                  {/* Année et lieu */}
                  <div className="text-right">
                    <div className="text-small font-bold text-accent mb-1">{item.year}</div>
                    <p className="text-small text-gray-600">{item.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRepertoire.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body text-gray-500">Aucun élément trouvé pour cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section Spécialités */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <h2 className="title-section text-center mb-12">Spécialités & Affinités</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Répertoire français */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🇫🇷</span>
              </div>
              <h3 className="title-subsection">Répertoire français</h3>
              <p className="text-body">
                Spécialiste des mélodies françaises et de l'opéra-comique. 
                Interprétations reconnues dans Bizet, Massenet et Gounod.
              </p>
            </div>

            {/* Musique sacrée */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⛪</span>
              </div>
              <h3 className="title-subsection">Musique sacrée</h3>
              <p className="text-body">
                Oratorios, messes et stabat mater. Une approche spirituelle 
                et intimiste du répertoire sacré baroque et romantique.
              </p>
            </div>

            {/* Pédagogie */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="title-subsection">Pédagogie vocale</h3>
              <p className="text-body">
                Transmission du savoir-faire lyrique. Masterclasses et 
                coaching vocal pour développer la technique et l'expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Langues et tessiture */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Tessiture et caractéristiques vocales */}
            <div>
              <h2 className="title-section">Tessiture & Style</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="title-card text-accent mb-2">Mezzo-soprano</h3>
                  <p className="text-body">
                    Voix de mezzo-soprano lyrique avec une extension dans le grave. 
                    Timbre chaleureux et expressif, particulièrement adapté aux rôles 
                    de confidente et aux héroïnes romantiques.
                  </p>
                </div>
                <div>
                  <h3 className="title-card text-accent mb-2">Caractéristiques</h3>
                  <ul className="text-body space-y-2">
                    <li>• Tessiture : Sol2 - Sol5</li>
                    <li>• Couleur : Timbre chaud et velouté</li>
                    <li>• Style : Lyrique français et italien</li>
                    <li>• Spécialité : Second rôles expressifs</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Langues de travail */}
            <div>
              <h2 className="title-section">Langues de travail</h2>
              <div className="space-y-4">
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">FR</span>
                  </div>
                  <div>
                    <div className="title-card">Français</div>
                    <div className="text-small text-gray-600">Langue maternelle - Répertoire mélodique et lyrique</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">IT</span>
                  </div>
                  <div>
                    <div className="title-card">Italien</div>
                    <div className="text-small text-gray-600">Opéra italien - Belcanto et verismo</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">DE</span>
                  </div>
                  <div>
                    <div className="title-card">Allemand</div>
                    <div className="text-small text-gray-600">Lieder et oratorios - Niveau professionnel</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">EN</span>
                  </div>
                  <div>
                    <div className="title-card">Anglais</div>
                    <div className="text-small text-gray-600">Répertoire contemporain et oratorios anglais</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-bg-accent section-padding">
        <div className="section-container">
          <div className="text-center">
            <h2 className="title-section text-white mb-6">Programmez Marie-Émeraude</h2>
            <p className="text-body text-white/90 max-w-2xl mx-auto mb-8">
              Disponible pour productions lyriques, concerts, récitals et masterclasses. 
              Contactez nous pour étudier votre projet artistique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary bg-white text-accent hover:bg-gray-100">
                Contact booking
              </Link>
              <Link to="/medias" className="btn-secondary border-white text-white hover:bg-white hover:text-accent">
                Écouter des extraits
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}