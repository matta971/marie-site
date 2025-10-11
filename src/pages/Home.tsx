import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotionData } from '../hooks/useNotionData'
import { getMedias/*, getPressArticles*/ } from '../services/notionService'
import { getHomePageContent } from '../services/homePageService'


// Import Swiper React components  
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'


export default function Home(): React.JSX.Element {

  // Récupérer les médias depuis Notion (ceux en featured)
  const { data: medias } = useNotionData(getMedias)
  
  // Récupérer les articles de presse depuis Notion
  //const { data: pressArticles } = useNotionData(getPressArticles)

  // Récupérer les contenus statiques de la page Notion
  const [homeContent, setHomeContent] = useState({
    hero: {
      name: 'Marie-Émeraude',
      surname: 'Alcime',
      title: 'Artiste lyrique'
    },
    services: ['OPERA & ORATORIO', 'CONCERT RECITAL', 'COURS MASTER CLASSE'],
    biography: {
      text: `Originaire de Guadeloupe, Marie-Émeraude Alcime est une mezzo-soprano formée en musicologie et en métiers de la scène (Rouen, Nancy).
      
      Membre du chœur de l'Opéra-Théâtre de Metz Métropole, elle se produit sur scène dans Orphée (Les Contes d'Hoffmann, La Vie parisienne) et développe en parallèle une activité de cheffe de chœur et pédagogue.`
    }
  })
  const [, setLoadingContent] = useState(true)

  // Charger les contenus depuis la page Notion
  useEffect(() => {
    getHomePageContent().then(data => {
      // Séparer le nom complet si nécessaire
      const nameParts = data.hero.name.split(' ')
      const surname = nameParts.length > 1 ? nameParts.pop() : 'Alcime'
      const name = nameParts.join(' ') || 'Marie-Émeraude'
      
      setHomeContent({
        hero: {
          name: name,
          surname: surname ?? 'Alcime',
          title: data.hero.title || 'Artiste lyrique'
        },
        services: data.services.length > 0 ? data.services : homeContent.services,
        biography: {
          text: data.biography.text || homeContent.biography.text
        }
      })
      setLoadingContent(false)
    })
  }, [])

  // Filtrer et préparer les médias en vedette (type vidéo seulement pour le carousel)
  const featuredMedias = medias
    ?.filter(m => m.featured && m.type.toLowerCase().includes('vidéo'))
    ?.sort((a, b) => a.order - b.order)
    ?.slice(0, 5) || []

  // Préparer les médias pour le carousel
  const mediaItems = featuredMedias.map(media => {
    let thumbnail = "/images/hero-bg.png"
    let videoUrl = media.url
    
    if (media.url.includes('youtube.com') || media.url.includes('youtu.be')) {
      const videoId = media.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]
      if (videoId) {
        thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        videoUrl = `https://www.youtube.com/watch?v=${videoId}`
      }
    }

    return {
      id: media.id,
      title: media.title,
      thumbnail,
      videoUrl,
      type: 'video',
      venue: media.description || ""
    }
  })

  // Filtrer les témoignages de presse les plus récents
  /*const recentPress = pressArticles
    ?.filter(a => a.display)
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice(0, 3) || []*/


  // Gérer le clic sur une slide
  const handleSlideClick = (item: { type: string; videoUrl: string | URL | undefined }) => {
    if (item.type === 'video' && item.videoUrl !== '#') {
      window.open(item.videoUrl, '_blank')
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero home-page">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{homeContent.hero.name}<br />{homeContent.hero.surname}</h1>
            <p className="hero-subtitle">{homeContent.hero.title}</p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="services section home-page">
        <div className="container">
          <div className="services-content">
            {/* Rectangle de fond (effet visuel seulement) */}
            <div className="services-background-box"></div>
            
            {/* Colonne gauche : Image */}
            <div className="services-image">
              <div className="microphone-image"></div>
            </div>
            
            {/* Colonne droite : Textes */}
            <div className="services-text">
              <h2 className="section-title">Services</h2>
              <div className="services-list">
                {homeContent.services.map((service, index) => {
                  return (
                <div key={index} className="service-item">{service}</div>
                  )
                })}
              </div>
              
              <div className="services-cta">
                <Link to="/contact" className="btn">En savoir plus</Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Médias Section */}
      <section className="medias section home-page">
        <div className="container">
          <h2 className="section-title">Médias</h2>
          
          {/* Container du carrousel avec styles inline pour forcer l'affichage */}
          <div style={{ 
            position: 'relative', 
            margin: '40px 0',
            height: '400px',
            width: '100%'
          }}>
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              slidesPerView={3}
              spaceBetween={30}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              modules={[EffectCoverflow, Navigation, Autoplay]}
              style={{
                width: '100%',
                height: '350px',
                paddingTop: '50px',
                paddingBottom: '50px'
              }}
            >
              {mediaItems.map((item) => (
                <SwiperSlide 
                  key={item.id}
                  style={{
                    width: '350px',
                    height: '250px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <div 
                    onClick={() => handleSlideClick(item)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      width: '100%',
                      backdropFilter: 'blur(10px)',
                      position: 'relative'
                    }}
                  >
                    {/* Image */}
                    <div style={{
                      position: 'relative',
                      height: '160px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                      
                      {/* Overlay avec bouton play */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }} className="media-overlay">
                        {item.type === 'video' && (
                          <div style={{
                            color: 'white',
                            fontSize: '48px'
                          }}>
                            ▶
                          </div>
                        )}
                        
                        {item.type === 'photo' && (
                          <div style={{
                            color: 'white',
                            fontSize: '32px'
                          }}>
                            📷
                          </div>
                        )}
                        
                        {/*item.duration && (
                          <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            background: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            {item.duration}
                          </div>
                        )*/}
                      </div>
                    </div>

                    {/* Infos */}
                    <div style={{
                      padding: '15px',
                      textAlign: 'center'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: 'var(--color-anthracite)',
                        marginBottom: '5px',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontFamily: 'var(--font-text)',
                        fontSize: '11px',
                        color: 'var(--color-emerald-deep)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: '500'
                      }}>
                        {item.venue}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation personnalisée */}
            <button 
              className="swiper-button-prev-custom"
              style={{
                position: 'absolute',
                top: '50%',
                left: '-25px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '50px',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                fontSize: '24px'
              }}
            >
              ‹
            </button>
            
            <button 
              className="swiper-button-next-custom"
              style={{
                position: 'absolute',
                top: '50%',
                right: '-25px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '50px',
                height: '50px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                fontSize: '24px'
              }}
            >
              ›
            </button>
          </div>

          {/* CTA */}
          <div className="medias-cta">
            <a href="/medias" className="btn">Voir plus</a>
          </div>
        </div>
      </section>

      {/* Biographie Section */}
      <section className="biography section home-page">
        <div className="container">
          <h2 className="section-title">Biographie</h2>
          <div className="bio-content">
            {/* Rectangle de fond (effet visuel seulement) */}
            <div className="bio-background-box"></div>
            
            {/* Colonne gauche : Texte seulement */}
            <div className="bio-text">
              {/* Afficher le texte avec mise en forme HTML */}
              <div dangerouslySetInnerHTML={{ __html: homeContent.biography.text }} />
            </div>
            
            {/* Colonne droite : Image */}
            <div className="bio-image">
              <div className="portrait-frame"></div>
            </div>
          </div>
          <div className="bio-cta">
            <Link to="/biographie" className="btn">Voir plus</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section home-page">
        <div className="container">
          <h2 className="section-title">Contact / Réservation</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" className="form-input" placeholder="Nom" required />
              <input type="email" className="form-input" placeholder="E-mail" required />
            </div>
            <div className="form-row">
              <input type="text" className="form-input" placeholder="Téléphone" />
              <input type="text" className="form-input" placeholder="Objet" required />
            </div>
            <div className="form-group">
              <textarea className="form-input form-textarea" placeholder="Message" required></textarea>
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="rgpd" required />
              <label htmlFor="rgpd">J'accepte que mes données soient utilisées pour me recontacter (RGPD)</label>
            </div>
            <button type="submit" className="submit-btn">Envoyer la demande</button>
          </form>
        </div>
      </section>
    </>
  )
}