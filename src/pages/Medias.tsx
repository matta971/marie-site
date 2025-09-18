import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Medias(): React.JSX.Element {
  const [activeMediaType, setActiveMediaType] = useState('videos')
  const [activeCategory, setActiveCategory] = useState('tous')

  // Types de médias
  const mediaTypes = [
    { id: 'videos', label: 'Vidéos' },
    { id: 'audios', label: 'Audios' },
    { id: 'photos', label: 'Photos' }
  ]

  // Catégories de contenu
  const categories = [
    { id: 'tous', label: 'Tous' },
    { id: 'mozart', label: 'Mozart' },
    { id: 'recital', label: 'Récital' },
    { id: 'sacre', label: 'Sacré' },
    { id: 'baroque', label: 'Baroque' }
  ]

  // Données des médias
  const mediasData = {
    videos: [
      {
        id: 1,
        title: 'Ponchielli — Voce di donna o d\'angelo (La Cieca)',
        category: 'recital',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/hCBhh4J9J_8',
        duration: '4:32'
      },
      {
        id: 2,
        title: 'Rossini — Di tanti palpiti (Tancredi)',
        category: 'baroque',
        thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/7LEYnKna9XU',
        duration: '3:45'
      },
      {
        id: 3,
        title: 'Verdi — Ulrica, Re dell\'abisso (Il ballo in maschera)',
        category: 'recital',
        thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/gM1b4WjahMI',
        duration: '5:12'
      },
      {
        id: 4,
        title: 'Mozart — Laudate Dominum',
        category: 'mozart',
        thumbnail: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/example1',
        duration: '4:18'
      },
      {
        id: 5,
        title: 'Bach — Erbarme dich (Passion selon Saint-Matthieu)',
        category: 'sacre',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/example2',
        duration: '6:24'
      },
      {
        id: 6,
        title: 'Interview — Talents d\'Outre-Mer',
        category: 'tous',
        thumbnail: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=400&auto=format&fit=crop',
        url: 'https://www.youtube.com/embed/_S2GjuBozJg',
        duration: '8:15'
      }
    ],
    audios: [
      {
        id: 1,
        title: 'Stabat Mater — Pergolèse',
        category: 'sacre',
        duration: '45:30',
        format: 'MP3 320kbps'
      },
      {
        id: 2,
        title: 'Récital de mélodies françaises',
        category: 'recital',
        duration: '52:15',
        format: 'FLAC'
      },
      {
        id: 3,
        title: 'Mozart — Requiem (extrait)',
        category: 'mozart',
        duration: '12:44',
        format: 'MP3 320kbps'
      }
    ],
    photos: [
      {
        id: 1,
        title: 'Concert à l\'Opéra de Metz',
        category: 'recital',
        thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop',
        photographer: '© Studio Photo'
      },
      {
        id: 2,
        title: 'Portrait studio 2023',
        category: 'tous',
        thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=400&auto=format&fit=crop',
        photographer: '© Photographe Officiel'
      },
      {
        id: 3,
        title: 'Récital Bach - Cathédrale',
        category: 'sacre',
        thumbnail: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=400&auto=format&fit=crop',
        photographer: '© Concert Photography'
      },
      {
        id: 4,
        title: 'Les Contes d\'Hoffmann',
        category: 'recital',
        thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=400&auto=format&fit=crop',
        photographer: '© Opéra de Metz'
      },
      {
        id: 5,
        title: 'Portrait en robe de concert',
        category: 'tous',
        thumbnail: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?q=80&w=400&auto=format&fit=crop',
        photographer: '© Studio Portrait'
      },
      {
        id: 6,
        title: 'Master-class vocal',
        category: 'tous',
        thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop',
        photographer: '© Conservatoire'
      }
    ]
  }

  // Filtrage des médias
  const getFilteredMedia = () => {
    const currentMedia = mediasData[activeMediaType as keyof typeof mediasData]
    if (activeCategory === 'tous') {
      return currentMedia
    }
    return currentMedia.filter(item => item.category === activeCategory)
  }

  const filteredMedia = getFilteredMedia()

  return (
    <div className="section-bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="title-hero mb-8">Médias</h1>
            
            {/* Filtres principaux - Types de médias */}
            <div className="flex justify-center gap-6 mb-8">
              {mediaTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setActiveMediaType(type.id)
                    setActiveCategory('tous') // Reset category when switching media type
                  }}
                  className={`tab ${activeMediaType === type.id ? 'active' : 'inactive'}`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            {/* Filtres secondaires - Catégories */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-small transition-colors ${
                    activeCategory === category.id
                      ? 'bg-accent text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contenu des médias */}
      <section className="section-bg-secondary section-padding">
        <div className="section-container">
          
          {/* Grille des vidéos */}
          {activeMediaType === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((video: any) => (
                <div key={video.id} className="card smooth-hover group cursor-pointer">
                  <div className="relative mb-4">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="title-card text-accent mb-2">{video.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-gray-600 capitalize">{video.category}</span>
                    <button className="text-small text-accent hover:text-gold transition-colors">
                      Regarder →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Liste des audios */}
          {activeMediaType === 'audios' && (
            <div className="space-y-4">
              {filteredMedia.map((audio: any) => (
                <div key={audio.id} className="card smooth-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Audio icon */}
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="title-card text-accent">{audio.title}</h3>
                        <div className="flex space-x-4 text-small text-gray-600">
                          <span>{audio.duration}</span>
                          <span>•</span>
                          <span>{audio.format}</span>
                          <span>•</span>
                          <span className="capitalize">{audio.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-outline text-small">
                        Écouter
                      </button>
                      <button className="text-accent hover:text-gold transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 16l-6-6h12l-6 6z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Galerie photos */}
          {activeMediaType === 'photos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((photo: any) => (
                <div key={photo.id} className="card smooth-hover group cursor-pointer">
                  <div className="relative mb-4">
                    <img 
                      src={photo.thumbnail}
                      alt={photo.title}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-small font-medium">{photo.photographer}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="title-card text-accent mb-2">{photo.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-gray-600 capitalize">{photo.category}</span>
                    <button className="text-small text-accent hover:text-gold transition-colors">
                      Agrandir →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Message si aucun résultat */}
          {filteredMedia.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-gray-400 text-2xl">📁</span>
              </div>
              <p className="text-body text-gray-500 mb-2">Aucun contenu trouvé</p>
              <p className="text-small text-gray-400">
                Essayez de changer de catégorie ou de type de média
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section informations et crédits */}
      <section className="section-bg-primary section-padding">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Crédits et informations */}
            <div>
              <h2 className="title-section">Crédits & Informations</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="title-card text-accent mb-2">Photos</h3>
                  <p className="text-body">
                    Photos de concert : © Photographe Officiel<br/>
                    Photos de studio : © Studio Portrait<br/>
                    Utilisation presse autorisée avec mention des crédits
                  </p>
                </div>
                <div>
                  <h3 className="title-card text-accent mb-2">Vidéos</h3>
                  <p className="text-body">
                    Enregistrements live et extraits d'opéra disponibles en HD. 
                    Tous droits réservés pour usage commercial.
                  </p>
                </div>
                <div>
                  <h3 className="title-card text-accent mb-2">Audios</h3>
                  <p className="text-body">
                    Enregistrements studio et live. Qualité CD et Hi-Res disponibles 
                    sur demande pour les professionnels.
                  </p>
                </div>
              </div>
            </div>

            {/* Demandes médias */}
            <div>
              <h2 className="title-section">Demandes médias</h2>
              <div className="card">
                <p className="text-body mb-6">
                  Pour obtenir des photos haute résolution, des enregistrements 
                  professionnels ou organiser une séance photo, contactez notre équipe.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📧</span>
                    </div>
                    <div>
                      <div className="text-small font-medium">Email médias</div>
                      <div className="text-small text-gray-600">
                        <a href="mailto:medias@marie-emeraude.com" className="link-primary">
                          medias@marie-emeraude.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⏱️</span>
                    </div>
                    <div>
                      <div className="text-small font-medium">Délai de réponse</div>
                      <div className="text-small text-gray-600">48h ouvrables</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Link to="/contact" className="btn-primary w-full text-center">
                    Demande de médias
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}