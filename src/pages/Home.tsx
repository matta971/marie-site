import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNotionData } from '../hooks/useNotionData'
import { getMedias } from '../services/notionService'
import { getHomePageContent } from '../services/homePageService'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTranslation } from 'react-i18next'
import { useTranslatedContent } from '../hooks/useTranslatedContent'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules'


export default function Home(): React.JSX.Element {
  const reveal = useScrollReveal()
  const { t } = useTranslation()

  // Récupérer les médias depuis Notion (ceux en featured)
  const { data: medias } = useNotionData(getMedias)

  // Récupérer les contenus statiques de la page Notion
  const [homeContent, setHomeContent] = useState({
    hero: {
      name: 'Marie-Émeraude',
      surname: 'Alcime',
      title: 'Mezzo-soprano'
    },
    services: ['OPERA & ORATORIO', 'CONCERT RECITAL', 'COURS MASTER CLASSE'],
    biography: {
      text: `Originaire de Guadeloupe, Marie-Émeraude Alcime est une mezzo-soprano formée en musicologie et en métiers de la scène (Rouen, Nancy).

      Membre du chœur de l'Opéra-Théâtre de Metz Métropole, elle se produit sur scène dans Orphée (Les Contes d'Hoffmann, La Vie parisienne) et développe en parallèle une activité de cheffe de chœur et pédagogue.`
    }
  })
  const [, setLoadingContent] = useState(true)

  // Traduire le texte de biographie
  const translatedBioText = useTranslatedContent(homeContent.biography.text)

  // Charger les contenus depuis la page Notion
  useEffect(() => {
    getHomePageContent().then(data => {
      const nameParts = data.hero.name.split(' ')
      const surname = nameParts.length > 1 ? nameParts.pop() : 'Alcime'
      const name = nameParts.join(' ') || 'Marie-Émeraude'

      setHomeContent({
        hero: {
          name: name,
          surname: surname ?? 'Alcime',
          title: data.hero.title || 'Mezzo-soprano'
        },
        services: data.services.length > 0 ? data.services : homeContent.services,
        biography: {
          text: data.biography.text || homeContent.biography.text
        }
      })
      setLoadingContent(false)
    })
  }, [])

  // Filtrer et préparer les médias en vedette
  const featuredMedias = medias
    ?.filter(m => m.featured && m.type.toLowerCase().includes('vidéo'))
    ?.sort((a, b) => a.order - b.order)
    ?.slice(0, 5) || []

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
            <h1 className="hero-title">
              {homeContent.hero.name}<br />{homeContent.hero.surname}
            </h1>
            <p className="hero-subtitle">{homeContent.hero.title}</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section home-page">
        <div className="container">
          <div className="services-content">
            <div className="services-background-box"></div>

            <div className="services-image reveal-left" ref={reveal}>
              <div className="microphone-image"></div>
            </div>

            <div className="services-text reveal" ref={reveal}>
              <h2 className="section-title">{t('home.servicesTitle')}</h2>
              <div className="services-list">
                {homeContent.services.map((service, index) => (
                  <div key={index} className="service-item">{service}</div>
                ))}
              </div>
              <div className="services-cta">
                <Link to="/contact" className="btn">{t('home.servicesBtn')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Médias Section */}
      <section className="medias section home-page">
        <div className="container">
          <h2 className="section-title reveal" ref={reveal}>{t('home.mediasTitle')}</h2>

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
                rotate: 15,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false,
              }}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                  coverflowEffect: {
                    rotate: 0, stretch: 0, depth: 0, modifier: 0, slideShadows: false,
                  },
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  coverflowEffect: {
                    rotate: 10, stretch: 0, depth: 150, modifier: 1, slideShadows: false,
                  },
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  coverflowEffect: {
                    rotate: 15, stretch: 0, depth: 200, modifier: 1, slideShadows: false,
                  },
                },
              }}
              modules={[EffectCoverflow, Navigation, Autoplay]}
              style={{
                width: '100%',
                height: '350px',
                paddingTop: '50px',
                paddingBottom: '50px'
              }}
              className="media-swiper"
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
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      height: '100%',
                      width: '100%',
                      backdropFilter: 'blur(10px)',
                      position: 'relative'
                    }}
                  >
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
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      />

                      <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0, 0, 0, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      }} className="media-overlay">
                        {item.type === 'video' && (
                          <div style={{
                            width: '44px',
                            height: '44px',
                            border: '2px solid white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px'
                          }}>
                            ▶
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{
                      padding: '14px 16px',
                      textAlign: 'left'
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: 'white',
                        marginBottom: '4px',
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
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.5)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        fontWeight: '300'
                      }}>
                        {item.venue}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation buttons */}
            <button
              className="swiper-button-prev-custom"
              aria-label="Slide précédente"
              style={{
                position: 'absolute',
                top: '50%',
                left: '-20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)',
                fontSize: '18px'
              }}
            >
              ‹
            </button>

            <button
              className="swiper-button-next-custom"
              aria-label="Slide suivante"
              style={{
                position: 'absolute',
                top: '50%',
                right: '-20px',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '44px',
                height: '44px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(10px)',
                fontSize: '18px'
              }}
            >
              ›
            </button>
          </div>

          <div className="medias-cta">
            <a href="/medias" className="btn">{t('home.mediasBtn')}</a>
          </div>
        </div>
      </section>

      {/* Biographie Section */}
      <section className="biography section home-page">
        <div className="container">
          <h2 className="section-title reveal" ref={reveal}>{t('home.bioTitle')}</h2>
          <div className="bio-content">
            <div className="bio-background-box"></div>

            <div className="bio-text reveal" ref={reveal}>
              <div dangerouslySetInnerHTML={{ __html: translatedBioText }} />
            </div>

            <div className="bio-image reveal-right" ref={reveal}>
              <div className="portrait-frame"></div>
            </div>
          </div>
          <div className="bio-cta">
            <Link to="/biographie" className="btn">{t('home.bioBtn')}</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact section home-page">
        <div className="container">
          <h2 className="section-title reveal" ref={reveal}>{t('home.contactTitle')}</h2>
          <form className="contact-form reveal" ref={reveal}>
            <div className="form-row">
              <input type="text" className="form-input" placeholder={t('home.formName')} required />
              <input type="email" className="form-input" placeholder={t('home.formEmail')} required />
            </div>
            <div className="form-row">
              <input type="text" className="form-input" placeholder={t('home.formPhone')} />
              <input type="text" className="form-input" placeholder={t('home.formSubject')} required />
            </div>
            <div className="form-group">
              <textarea className="form-input form-textarea" placeholder={t('home.formMessage')} required></textarea>
            </div>
            <div className="form-checkbox">
              <input type="checkbox" id="rgpd" required />
              <label htmlFor="rgpd">{t('home.formRgpd')}</label>
            </div>
            <button type="submit" className="submit-btn">{t('home.formSubmit')}</button>
          </form>
        </div>
      </section>
    </>
  )
}
