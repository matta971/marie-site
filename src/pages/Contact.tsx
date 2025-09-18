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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
          Nom
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
          Téléphone (optionnel)
        </label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="objet" className="block text-sm font-medium text-gray-700 mb-2">
          Objet
        </label>
        <input
          type="text"
          id="objet"
          name="objet"
          value={formData.objet}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
        />
      </div>

      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id="acceptePolicy"
          name="acceptePolicy"
          checked={formData.acceptePolicy}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
        />
        <label htmlFor="acceptePolicy" className="text-sm text-gray-600 leading-relaxed">
          J'accepte la politique de confidentialité
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Envoyer
      </button>
    </form>
  )
}

export default function Contact(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Section hero avec image d'arrière-plan */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative max-w-6xl mx-auto px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              Contact
            </h1>
            <div className="w-16 h-1 bg-emerald-500"></div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Colonne de gauche - Informations */}
          <div className="space-y-12">
            
            {/* Coordonnées professionnelles */}
            <div>
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
                Coordonnées professionnelles
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                    Booking
                  </h3>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                    <a 
                      href="mailto:contact@example.com" 
                      className="hover:underline transition-colors"
                      style={{ color: '#046D5D' }}
                      onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#D4AF37'}
                      onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#046D5D'}
                    >
                      contact@example.com
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                    Agent
                  </h3>
                  <p style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                    Agence Lyrique
                  </p>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div>
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                Réseaux sociaux
              </h3>
              <div className="flex space-x-6">
                <a 
                  href="#" 
                  className="transition-colors"
                  style={{ color: '#1D1D1D' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#046D5D')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#1D1D1D')}
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987s11.987-5.366 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.32-1.297L6.3 14.53c.636.636 1.52 1.03 2.497 1.03 1.934 0 3.503-1.569 3.503-3.503s-1.569-3.503-3.503-3.503c-.977 0-1.861.394-2.497 1.03L4.129 8.422c.872-.807 2.023-1.297 3.32-1.297 2.726 0 4.939 2.213 4.939 4.939s-2.213 4.924-4.939 4.924z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="transition-colors"
                  style={{ color: '#1D1D1D' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#046D5D')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#1D1D1D')}
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.993 2.993 0 00-2.107-2.107C19.513 3.639 12 3.639 12 3.639s-7.513 0-9.391.44A2.993 2.993 0 00.502 6.186C.062 8.064.062 12 .062 12s0 3.936.44 5.814a2.993 2.993 0 002.107 2.107c1.878.44 9.391.44 9.391.44s7.513 0 9.391-.44a2.993 2.993 0 002.107-2.107C23.938 15.936 23.938 12 23.938 12s0-3.936-.44-5.814zM9.692 15.692V8.308L15.692 12l-6 3.692z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="transition-colors"
                  style={{ color: '#1D1D1D' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#046D5D'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#1D1D1D'}
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="#" 
                  className="transition-colors"
                  style={{ color: '#1D1D1D' }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#046D5D')}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#1D1D1D'}
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Informations pratiques */}
            <div style={{ backgroundColor: '#F5F5F5' }} className="p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                Informations pratiques
              </h3>
              <div className="space-y-4 text-sm" style={{ fontFamily: 'Lato, sans-serif', color: '#1D1D1D' }}>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#1D1D1D' }}>Délais de réponse</h4>
                  <p>Nous nous engageons à répondre à toutes les demandes dans un délai de 48h ouvrables.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#1D1D1D' }}>Disponibilités</h4>
                  <p>Planning disponible sur demande. Les réservations se font généralement 6 à 12 mois à l'avance.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1" style={{ color: '#1D1D1D' }}>Conditions techniques</h4>
                  <p>Fiche technique et rider disponibles sur demande.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite - Formulaire */}
          <div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#046D5D' }}>
                Formulaire de contact
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}