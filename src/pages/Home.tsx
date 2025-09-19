import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(): React.JSX.Element {
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
          <div className="video-container">
            <div className="video-frame">
              ▶️
            </div>
            <div className="video-controls">
              <div className="video-nav">‹</div>
              <div className="video-nav">›</div>
            </div>
            <div className="medias-cta">
              <Link to="/medias" className="btn">Voir plus</Link>
            </div>
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