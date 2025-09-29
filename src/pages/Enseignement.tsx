import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const servicesData = {
  cours: [
    {
      title: "Cours particuliers",
      description: "Cours de chant adaptés à votre niveau et vos objectifs. Travail personnalisé sur la technique vocale, la respiration, l'interprétation et le répertoire."
    },
    {
      title: "Coaching vocal",
      description: "Sessions de coaching pour préparer concerts à la (rego iréméts. Accompagnement ciblé sur l'expression scénique et la gestion du trac."
    },
    {
      title: "Technique respiratoire",
      description: "Cours thématiques sur la respiration et le soutien vocal. Apprentissage des fondamentaux pour une voix saine et projetée."
    },
    {
      title: "Interprétation",
      description: "Modules d'interprétation en solo ou étroite collabo alit. Exploration approfondie du texte, de la musicalité et de l'émotion."
    },
    {
      title: "Préparation audition/concours",
      description: "Conseils et accompagnement pour réussir vos auditions et concours. Stratégies de préparation mentale et techniques de présentation."
    }
  ],
  masterclasses: [
    {
      title: "Masterclass Répertoire Français",
      description: "Immersion dans le répertoire lyrique français de Massenet, Gounod et Bizet. Analyse stylistique et technique d'interprétation authentique."
    },
    {
      title: "Masterclass Opéra Italien",
      description: "Exploration des grands rôles du bel canto et du vérisme italien. Travail sur la ligne de chant, l'ornementation et l'expression dramatique."
    },
    {
      title: "Masterclass Musique Sacrée",
      description: "Approche spirituelle des oratorios, messes et requiem. Équilibre entre virtuosité technique et profondeur émotionnelle."
    },
    {
      title: "Masterclass Art Scénique",
      description: "Perfectionnement de la présence scénique et du jeu d'acteur lyrique. Techniques de déplacement, gestuelle et interaction avec l'espace."
    }
  ],
  ateliers: [
    {
      title: "Atelier Découverte du Chant",
      description: "Initiation au chant lyrique pour débutants. Découverte ludique de la voix, des bases de la technique vocale et du plaisir de chanter."
    },
    {
      title: "Atelier Ensemble Vocal",
      description: "Pratique collective du chant d'ensemble et des duos d'opéra. Développement de l'écoute, du blend vocal et de la musicalité de groupe."
    },
    {
      title: "Atelier Préparation de Rôle",
      description: "Construction complète d'un rôle d'opéra ou d'oratorio. De l'analyse du livret à la mise en scène, en passant par le coaching musical."
    },
    {
      title: "Atelier Récital et Mélodie",
      description: "Art du récital et interprétation de la mélodie française. Travail sur la diction, la poésie musicale et la communication avec le public."
    }
  ]
}

const testimonials = {
  cours: [
    {
      text: "Grâce aux cours de Marie-Émeraude, j'ai découvert le vrai potentiel de ma voix. Sa patience et sa pédagogie m'ont permis de progresser rapidement.",
      author: "Sophie M."
    },
    {
      text: "Un enseignement rigoureux mais toujours bienveillant. Marie-Émeraude sait transmettre sa passion du chant lyrique avec générosité.",
      author: "Thomas L."
    }
  ],
  masterclasses: [
    {
      text: "La masterclass sur le répertoire français a été une révélation. J'ai compris l'importance du style et de la langue dans l'interprétation.",
      author: "Claire D."
    },
    {
      text: "Une expérience enrichissante avec une artiste qui partage généreusement son expertise et son amour de l'opéra.",
      author: "Marc B."
    }
  ],
  ateliers: [
    {
      text: "L'atelier ensemble vocal m'a appris à écouter les autres chanteurs et à fusionner ma voix avec le groupe. Une belle aventure humaine.",
      author: "Isabelle P."
    },
    {
      text: "Participer à l'atelier de préparation de rôle m'a donné confiance pour mes auditions. Un accompagnement sur-mesure et professionnel.",
      author: "Antoine R."
    }
  ]
}

export default function Enseignement() {
  const [activeTab, setActiveTab] = useState<'cours' | 'masterclasses' | 'ateliers'>('cours')

  const currentServices = servicesData[activeTab]
  const currentTestimonials = testimonials[activeTab]

  return (
    <div className="enseignement-page">
      
      {/* Hero Section */}
      <section className="enseignement-hero">
        <div className="section-container">
          <div className="text-center mb-12">
            <h1 className="hero-title">Enseignement</h1>
          </div>

          {/* Navigation tabs */}
          <div className="enseignement-tabs">
            <button
              onClick={() => setActiveTab('cours')}
              className={`enseignement-tab ${activeTab === 'cours' ? 'active' : ''}`}
            >
              Cours
            </button>
            <button
              onClick={() => setActiveTab('masterclasses')}
              className={`enseignement-tab ${activeTab === 'masterclasses' ? 'active' : ''}`}
            >
              Masterclasses
            </button>
            <button
              onClick={() => setActiveTab('ateliers')}
              className={`enseignement-tab ${activeTab === 'ateliers' ? 'active' : ''}`}
            >
              Ateliers
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

      {/* Testimonials Section */}
      <section className="enseignement-testimonials">
        <div className="section-container">
          <h2 className="enseignement-testimonials-title">Témoignages élèves</h2>
          
          <div className="testimonials-grid">
            {currentTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <svg 
                  className="testimonial-quote-icon"
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                
                <p className="testimonial-text">"{testimonial.text}"</p>
                <footer className="testimonial-author">{testimonial.author}</footer>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center">
            <div className="bio-cta-buttons">
              <Link to="/contact" className="btn-secondary">
                Contactez Marie-Émeraude
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}