import EventTable from '../components/EventTable'
import { pastEvents } from '../data/site'
import React from 'react'

export default function Agenda(): React.JSX.Element {
  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-serif mb-12">Agenda</h1>
        
        {/* Prochaines dates */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-gray-800 mb-8">Prochaines représentations</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center">
            <p className="text-gray-600 italic">
              Les prochaines dates seront annoncées prochainement.
            </p>
            <a href="/contact" className="inline-block mt-4 bg-emerald-800 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-colors">
              Me programmer
            </a>
          </div>
        </div>
        
        {/* Événements passés selon la maquette */}
        <div>
          <h2 className="text-2xl font-serif text-gray-800 mb-8">Événements passés</h2>
          
          {/* Layout en grille comme dans la maquette */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="font-bold text-lg">{event.date}</div>
                  <div className="text-sm text-gray-600">{event.city}</div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium italic">{event.work}</div>
                  <div className="text-gray-600">{event.role}</div>
                  <div className="text-sm text-gray-500">{event.place}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tableau complet pour plus d'événements */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif text-gray-800 mb-8">Historique complet</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <EventTable events={pastEvents} />
          </div>
        </div>
        
        {/* Informations de booking */}
        <div className="mt-16 bg-emerald-50 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-serif text-emerald-800 mb-4">Programmation</h3>
              <p className="text-emerald-700 leading-relaxed">
                Marie-Émeraude Alcime est disponible pour des productions lyriques, 
                concerts, récitals et master-classes. Contactez notre équipe pour 
                étudier votre projet.
              </p>
            </div>
            <div className="text-center">
              <a href="/contact" className="inline-block bg-emerald-800 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
                Faire une demande de booking
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}