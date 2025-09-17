import ContactForm from '../components/ContactForm'
import React from 'react'

export default function Contact(): React.JSX.Element {
  return (
    <div className="bg-emerald-800 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Colonne de gauche - Informations et palette */}
          <div className="space-y-8">
            <h1 className="text-5xl font-serif mb-8">Contact</h1>
            
            {/* Palette décorative selon la maquette */}
            <div className="flex space-x-3 mb-8">
              <div className="w-20 h-12 bg-yellow-600 rounded-lg"></div>
              <div className="w-20 h-12 bg-amber-200 rounded-lg"></div>
            </div>
            
            {/* Informations de contact */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-yellow-300 mb-4">Booking & Management</h2>
                <div className="space-y-3 text-emerald-100">
                  <p>
                    <span className="font-medium">Email professionnel :</span><br/>
                    <a href="mailto:booking@marie-emeraude.com" className="text-yellow-300 hover:text-yellow-200 underline hover:no-underline transition-colors">
                      booking@marie-emeraude.com
                    </a>
                  </p>
                  <p><span className="font-medium">Langues :</span> FR / EN</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-yellow-300 mb-3">Réseaux sociaux</h3>
                <div className="flex flex-wrap gap-4 text-emerald-200">
                  <a href="#" className="hover:text-yellow-300 transition-colors">YouTube</a>
                  <a href="#" className="hover:text-yellow-300 transition-colors">Instagram</a>
                  <a href="#" className="hover:text-yellow-300 transition-colors">Facebook</a>
                  <a href="#" className="hover:text-yellow-300 transition-colors">LinkedIn</a>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-yellow-300 mb-3">Prestations</h3>
                <ul className="text-emerald-200 space-y-2 text-sm">
                  <li>• Productions d'opéra et opérette</li>
                  <li>• Concerts et récitals</li>
                  <li>• Musique sacrée (oratorios, messes)</li>
                  <li>• Master-classes et coaching vocal</li>
                  <li>• Direction de chœur</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Colonne de droite - Formulaire */}
          <div>
            <div className="bg-emerald-900 rounded-2xl border border-emerald-600 p-8">
              <h2 className="text-2xl font-serif text-white mb-6">Demande de contact</h2>
              <ContactForm />
            </div>
          </div>
        </div>
        
        {/* Section informations pratiques */}
        <div className="mt-16 border-t border-emerald-700 pt-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Délais de réponse</h3>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Nous nous engageons à répondre à toutes les demandes dans un délai de 48h ouvrables.
                Pour les urgences, n'hésitez pas à le préciser dans votre message.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Disponibilités</h3>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Planning disponible sur demande. Les réservations se font généralement 
                6 à 12 mois à l'avance pour les productions importantes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-serif text-yellow-300 mb-4">Conditions techniques</h3>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Fiche technique et rider disponibles sur demande. 
                Possibilité d'adaptation selon les contraintes du lieu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}