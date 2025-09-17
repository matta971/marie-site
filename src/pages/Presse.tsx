import { press } from '../data/site'
import React from 'react'

export default function Presse(): React.JSX.Element {
  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif mb-12">Presse</h1>
        
        {/* Citations principales selon la maquette */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          {press.map((item, index) => (
            <div key={index} className="space-y-4">
              <blockquote className="text-xl italic leading-relaxed text-gray-800">
                {item.quote}
              </blockquote>
              <cite className="text-sm text-gray-600 not-italic">
                — <span className="font-medium">{item.outlet}</span>
              </cite>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-emerald-700 hover:text-emerald-800 text-sm underline hover:no-underline transition-colors"
              >
                Lire l'article complet →
              </a>
            </div>
          ))}
        </div>
        
        {/* Citations supplémentaires */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-serif text-gray-800 mb-8">Autres mentions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <blockquote className="text-sm italic text-gray-700 mb-3">
                "Une interprète sensible qui sait allier technique et émotion."
              </blockquote>
              <cite className="text-xs text-gray-500">— ConcertoNet</cite>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <blockquote className="text-sm italic text-gray-700 mb-3">
                "Présence scénique remarquable et voix chaleureuse."
              </blockquote>
              <cite className="text-xs text-gray-500">— Le Figaro</cite>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <blockquote className="text-sm italic text-gray-700 mb-3">
                "Une artiste complète au service de la musique."
              </blockquote>
              <cite className="text-xs text-gray-500">— Diapason</cite>
            </div>
          </div>
        </div>
        
        {/* Revue de presse */}
        <div className="mt-16 bg-emerald-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif text-emerald-800 mb-4">Revue de presse</h3>
              <p className="text-emerald-700 leading-relaxed mb-4">
                Retrouvez l'ensemble des articles et critiques dans notre dossier 
                de presse complet, disponible en téléchargement.
              </p>
              <div className="space-y-2">
                <a href="#" className="block text-emerald-700 hover:text-emerald-800 text-sm underline hover:no-underline">
                  📄 Dossier de presse complet (PDF)
                </a>
                <a href="#" className="block text-emerald-700 hover:text-emerald-800 text-sm underline hover:no-underline">
                  📸 Photos haute résolution
                </a>
              </div>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-serif text-emerald-800 mb-3">Contact presse</h4>
              <p className="text-emerald-600 text-sm mb-4">
                <a href="mailto:presse@marie-emeraude.com" className="hover:underline">
                  presse@marie-emeraude.com
                </a>
              </p>
              <a href="/contact" className="inline-block bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors">
                Demande d'interview
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}