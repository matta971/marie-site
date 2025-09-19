import React, { useState } from 'react'

// Composant ContactForm intégré
function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    objet: '',
    message: '',
    acceptePolicy: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulaire soumis:', formData)
    // Ici on traiterait l'envoi du formulaire
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="nom" className="form-label">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="telephone" className="form-label">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="objet" className="form-label">
          Objet
        </label>
        <input
          type="text"
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="form-textarea"
        />
      </div>

      <div className="form-checkbox">
        <input
          type="checkbox"
          id="acceptePolicy"
          name="acceptePolicy"
          checked={formData.acceptePolicy}
          onChange={handleChange}
          required
        />
        <label htmlFor="acceptePolicy">
          J'accepte la politique de confidentialité
        </label>
      </div>

      <button type="submit" className="submit-btn">
        Envoyer
      </button>
    </form>
  )
}

export default function Contact(): React.JSX.Element {
  return (
    <>
      {/* Hero Section */}
      <section className="hero hero-contact">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="title-hero">Contact</h1>
            <div className="hero-decoration"></div>
          </div>
        </div>
      </section>

      {/* Section principale */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Colonne de gauche - Informations */}
            <div className="contact-info">
              {/* Coordonnées professionnelles */}
              <div className="info-block">
                <h2 className="title-section">Coordonnées professionnelles</h2>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <h3 className="contact-subtitle">Booking</h3>
                    <p className="contact-text">contact@exemple.com</p>
                  </div>
                  
                  <div className="contact-item">
                    <h3 className="contact-subtitle">Agent</h3>
                    <p className="contact-text">Agence Lyrique</p>
                  </div>
                </div>
                
                {/* Réseaux sociaux */}
                <div className="social-section">
                  <h3 className="contact-subtitle">Suivez-moi</h3>
                  <div className="social-links">
                    <a href="#" className="social-link" aria-label="Instagram">
                      <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.004 5.367 18.635.001 12.017.001zm0 5.9a6.087 6.087 0 110 12.175 6.087 6.087 0 010-12.175z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="YouTube">
                      <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Twitter">
                      <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a href="#" className="social-link" aria-label="Facebook">
                      <svg className="social-icon" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Informations pratiques */}
              <div className="info-block info-pratiques">
                <h3 className="contact-subtitle">Informations pratiques</h3>
                <div className="info-content">
                  <div className="info-item">
                    <h4>Délais de réponse</h4>
                    <p>Nous nous engageons à répondre à toutes les demandes dans un délai de 48h ouvrables.</p>
                  </div>
                  <div className="info-item">
                    <h4>Disponibilités</h4>
                    <p>Planning disponible sur demande. Les réservations se font généralement 6 à 12 mois à l'avance.</p>
                  </div>
                  <div className="info-item">
                    <h4>Conditions techniques</h4>
                    <p>Fiche technique et rider disponibles sur demande.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Colonne de droite - Formulaire */}
            <div className="contact-form-section">
              <div className="form-container">
                <h2 className="title-section">Formulaire de contact</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}