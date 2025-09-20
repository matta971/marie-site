import React from 'react'
import { Link } from 'react-router-dom'

// Import Swiper React components  
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'


export default function Home(): React.JSX.Element {
  // Données des médias de Marie-Émeraude
  const mediaItems = [
    {
      id: 1,
      title: "Ponchielli — Voce di donna o d'angelo",
      thumbnail: "/images/hero-bg.png",
      videoUrl: "https://www.youtube.com/watch?v=hCBhh4J9J_8",
      type: "video",
      duration: "4:32",
      venue: "La Cieca"
    },
    {
      id: 2,
      title: "Rossini — Di tanti palpiti",
      thumbnail: "https://img.youtube.com/vi/7LEYnKna9XU/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=7LEYnKna9XU",
      type: "video",
      duration: "3:45",
      venue: "Tancredi"
    },
    {
      id: 3,
      title: "Verdi — Ulrica, Re dell'abisso",
      thumbnail: "https://img.youtube.com/vi/gM1b4WjahMI/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=gM1b4WjahMI",
      type: "video",
      duration: "5:12",
      venue: "Il ballo in maschera"
    },
    {
      id: 4,
      title: "Interview — Talents d'Outre-Mer",
      thumbnail: "https://img.youtube.com/vi/_S2GjuBozJg/maxresdefault.jpg",
      videoUrl: "https://www.youtube.com/watch?v=_S2GjuBozJg",
      type: "interview",
      duration: "8:15",
      venue: "Remise de prix"
    },
    {
      id: 5,
      title: "Les Contes d'Hoffmann",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
      videoUrl: "#",
      type: "photo",
      venue: "Voix de la Mère"
    }
  ]
  // Gérer le clic sur une slide
  const handleSlideClick = (item: { type: string; videoUrl: string | URL | undefined }) => {
    if (item.type === 'video' && item.videoUrl !== '#') {
      window.open(item.videoUrl, '_blank')
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Marie-Émeraude<br />Alcime</h1>
            <p className="hero-subtitle">Artiste lyrique</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
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
                <div className="service-item">Opéra & Oratorio</div>
                <div className="service-item">Concert Récital</div>
                <div className="service-item">Cours Master Classe</div>
              </div>
              <div className="services-cta">
                <Link to="/contact" className="btn">En savoir plus</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Médias Section */}
      <section className="medias section">
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
                        
                        {item.duration && (
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
                        )}
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
      <section className="biography section">
        <div className="container">
          <h2 className="section-title">Biographie</h2>
          <div className="bio-content">
            {/* Rectangle de fond (effet visuel seulement) */}
            <div className="bio-background-box"></div>
            
            {/* Colonne gauche : Texte seulement */}
            <div className="bio-text">
              <p>Originaire de Guadeloupe, Marie-Émeraude Alcime est une mezzo-soprano formée en musicologie et en métiers de la scène (Rouen, Nancy).</p>
              
              <p>Membre du chœur de l'Opéra-Théâtre de Metz Métropole, elle se produit sur scène dans Orphée (Les Contes d'Hoffmann, La Vie parisienne) et développe en parallèle une activité de cheffe de chœur et pédagogue.</p>
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
      <section className="contact section">
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