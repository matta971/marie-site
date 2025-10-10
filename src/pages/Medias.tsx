// src/pages/Medias.tsx
import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useNotionData } from '../hooks/useNotionData'
import { getMedias } from '../services/notionService'

// Types de médias disponibles
const mediaTypes = [
  { id: 'videos', label: 'Vidéos' },
  { id: 'audios', label: 'Audios' },
  { id: 'photos', label: 'Photos' }
]

// Catégories disponibles (à adapter selon vos besoins)
const categories = [
  { id: 'tous', label: 'Tous' },
  { id: 'recital', label: 'Récital' },
  { id: 'baroque', label: 'Baroque' },
  { id: 'mozart', label: 'Mozart' },
  { id: 'sacre', label: 'Sacré' }
]

export default function Medias(): React.JSX.Element {
  const { data: medias, loading, error } = useNotionData(getMedias)
  
  const [activeMediaType, setActiveMediaType] = useState('videos')
  const [activeCategory, setActiveCategory] = useState('tous')

  // Trier les médias par ordre
  const sortedMedias = useMemo(() => {
    return medias?.sort((a, b) => a.order - b.order) || []
  }, [medias])

  // Extraire les catégories disponibles depuis les descriptions (ou ajouter un champ category dans Notion)
  const availableCategories = useMemo(() => {
    // Pour l'instant, on utilise les catégories statiques
    // Vous pouvez adapter cela selon comment vous stockez les catégories dans Notion
    return categories
  }, [])

  // Filtrer les médias selon le type actif et la catégorie
  const filteredMedia = useMemo(() => {
    return sortedMedias.filter(media => {
      // Mapping des types - ATTENTION aux majuscules et accents de Notion
      const typeMap: { [key: string]: string[] } = {
        'videos': ['video', 'vidéo', 'Vidéo', 'Video'], // Plusieurs variantes possibles
        'audios': ['audio', 'Audio'], 
        'photos': ['photo', 'Photo', 'image', 'Image']
      }
      
      // Vérifier si le type du média correspond (insensible à la casse)
      const mediaTypeLower = media.type?.toLowerCase() || ''
      const acceptedTypes = typeMap[activeMediaType] || []
      const matchType = acceptedTypes.some(t => t.toLowerCase() === mediaTypeLower)
      
      // Filtre par catégorie (à adapter selon votre structure de données)
      const matchCategory = activeCategory === 'tous' || 
                           // Vous pouvez ajouter une logique de catégorie ici
                           true
      
      return matchType && matchCategory
    })
  }, [sortedMedias, activeMediaType, activeCategory])

  // Convertir les URLs YouTube en format embed et extraire les infos
  const getVideoInfo = (url: string) => {
    let videoId = ''
    if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split('&')[0] || ''
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || ''
    }
    
    return {
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : url,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/images/video-placeholder.jpg',
      watchUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : url
    }
  }

  if (loading) {
    return (
      <div className="medias-page min-h-screen">
        <section className="section-padding">
          <div className="section-container">
            <div className="text-center">
              <h1 className="hero-title">Médias</h1>
              <p className="mt-4">Chargement des médias...</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="medias-page min-h-screen">
        <section className="section-padding">
          <div className="section-container">
            <div className="text-center">
              <h1 className="hero-title">Médias</h1>
              <p className="mt-4 text-red-600">Erreur lors du chargement des médias.</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="medias-page min-h-screen">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="hero-title">Médias</h1>
            
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
              {availableCategories.map((category) => (
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
      <section className="section-padding">
        <div className="section-container">
          
          {/* Grille des vidéos */}
          {activeMediaType === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((video) => {
                const videoInfo = getVideoInfo(video.url)
                return (
                  <div key={video.id} className="card smooth-hover group cursor-pointer">
                    <div className="relative mb-4">
                      <img 
                        src={videoInfo.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/video-placeholder.jpg'
                        }}
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-accent ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="title-card text-accent mb-2">{video.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-small text-gray-600">
                        {video.description ? video.description.substring(0, 30) : 'Vidéo'}
                      </span>
                      <a 
                        href={videoInfo.watchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-small text-accent hover:text-gold transition-colors"
                      >
                        Regarder →
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Liste des audios */}
          {activeMediaType === 'audios' && (
            <div className="space-y-4">
              {filteredMedia.map((audio) => (
                <div key={audio.id} className="card smooth-hover">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Audio icon */}
                      <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center img-audio-icon">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="title-card text-accent">{audio.title}</h3>
                        <div className="flex space-x-4 text-small text-gray-600">
                          {audio.description && (
                            <span>{audio.description.substring(0, 50)}</span>
                          )}
                          {audio.date && (
                            <>
                              <span>&nbsp;•&nbsp;</span>                              
                            <span>{new Date(audio.date).toLocaleDateString('fr-FR')}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={audio.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-outline text-small"
                      >
                        Écouter
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Galerie photos */}
          {activeMediaType === 'photos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((photo) => (
                <div key={photo.id} className="card smooth-hover group cursor-pointer">
                  <div className="relative mb-4">
                    <img 
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-small font-medium">
                          {photo.description || '© Marie-Émeraude Alcime'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <h3 className="title-card text-accent mb-2">{photo.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-small text-gray-600">
                      {photo.date ? new Date(photo.date).toLocaleDateString('fr-FR') : 'Photo'}
                    </span>
                    <a 
                      href={photo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-small text-accent hover:text-gold transition-colors"
                    >
                      Agrandir →
                    </a>
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
      <section className="medias-info-section">
        <div className="section-container">
          <div className="medias-info-grid">
            
            {/* Crédits et informations */}
            <div className="medias-info-block">
              <h2 className="medias-info-title">Crédits & Informations</h2>
              
              <div className="medias-credit-item">
                <h3 className="medias-credit-subtitle">Photos</h3>
                <p className="medias-credit-text">
                  Photos de concert : © Photographe Officiel<br/>
                  Photos de studio : © Studio Portrait<br/>
                  Utilisation presse autorisée avec mention des crédits
                </p>
              </div>
              
              <div className="medias-credit-item">
                <h3 className="medias-credit-subtitle">Vidéos</h3>
                <p className="medias-credit-text">
                  Enregistrements live et extraits d'opéra disponibles en HD. 
                  Tous droits réservés pour usage commercial.
                </p>
              </div>
              
              <div className="medias-credit-item">
                <h3 className="medias-credit-subtitle">Audios</h3>
                <p className="medias-credit-text">
                  Enregistrements studio et live. Qualité CD et Hi-Res disponibles 
                  sur demande pour les professionnels.
                </p>
              </div>
            </div>

            {/* Demandes médias */}
            <div className="medias-info-block">
              <h2 className="medias-info-title">Demandes médias</h2>
              
              <div className="medias-request-card">
                <p className="medias-request-text">
                  Pour obtenir des photos haute résolution, des enregistrements 
                  professionnels ou organiser une séance photo, contactez notre équipe.
                </p>
                
                <div className="medias-contact-info">
                  <div className="medias-contact-item">
                    <div className="medias-contact-icon">
                      <span>📧</span>
                    </div>
                    <div>
                      <div className="medias-contact-label">Email médias</div>
                      <div className="medias-contact-value">
                        <a href="mailto:medias@marie-emeraude.com" className="medias-contact-link">
                          medias@marie-emeraude.com
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="medias-contact-item">
                    <div className="medias-contact-icon">
                      <span>⏱️</span>
                    </div>
                    <div>
                      <div className="medias-contact-label">Délai de réponse</div>
                      <div className="medias-contact-value">48h ouvrables</div>
                    </div>
                  </div>
                </div>
                
                <Link to="/contact" className="btn-medias-request">
                  Demande de médias
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}