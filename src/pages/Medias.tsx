import React from 'react'
import MediaEmbed from '../components/MediaEmbed'
import { videos } from '../data/site'

export default function Medias(): React.JSX.Element {
  return (
    <div className="bg-emerald-800 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif mb-4">Médias</h1>
        <p className="text-emerald-200 mb-12">Vidéos sélectionnées et galerie photos</p>
        
        {/* Section Vidéos */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-yellow-300 mb-8">Extraits vidéo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((v) => (
              <MediaEmbed key={v.url} url={v.url} title={v.title} />
            ))}
          </div>
        </div>
        
        {/* Galerie Photos selon la maquette */}
        <div>
          <h2 className="text-3xl font-serif text-yellow-300 mb-8">Galerie photos</h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Image principale - Grande à gauche */}
            <div className="bg-amber-100 rounded-2xl overflow-hidden row-span-2">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop"
                alt="Marie Émeraude Alcime en concert"
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
            
            {/* Galerie d'images plus petites à droite */}
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-amber-100 rounded-2xl overflow-hidden aspect-square">
                  <img 
                    src={`https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop&ixid=${i}`}
                    alt={`Performance ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation galerie */}
          <div className="flex justify-center mt-8 space-x-4">
            <button className="bg-emerald-700 hover:bg-emerald-600 rounded-full p-3 transition-colors">
              <span className="text-xl">‹</span>
            </button>
            <button className="bg-emerald-700 hover:bg-emerald-600 rounded-full p-3 transition-colors">
              <span className="text-xl">›</span>
            </button>
          </div>
        </div>
        
        {/* Informations additionnelles */}
        <div className="mt-16 grid md:grid-cols-2 gap-12 border-t border-emerald-700 pt-12">
          <div>
            <h3 className="text-xl font-serif text-yellow-300 mb-4">Crédits photos</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Photos de concert : © Photographe Officiel<br/>
              Photos de studio : © Studio Portrait<br/>
              Utilisation presse autorisée avec mention des crédits
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif text-yellow-300 mb-4">Demandes médias</h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Pour obtenir des photos haute résolution ou organiser 
              une séance photo, contactez notre équipe.
            </p>
            <a href="/contact" className="inline-block mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-xl transition-colors">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}