import MediaEmbed from '../components/MediaEmbed'
import { videos, press, badges, pastEvents } from '../data/site'

export default function Home(): React.JSX.Element {
  return (
    <div>
      {/* HERO Section - Comme dans la maquette */}
      <section className="relative overflow-hidden bg-emerald-800 min-h-screen">
        <div className="max-w-6xl mx-auto flex items-center min-h-screen px-8">
          {/* Image à gauche - Format maquette */}
          <div className="w-1/3 pr-12">
            <div className="bg-amber-100 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop"
                alt="Marie Émeraude Alcime"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Contenu à droite - Selon maquette */}
          <div className="w-2/3 pl-12 text-white text-center">
            <h1 className="text-6xl font-serif mb-4 leading-tight">
              <em>Marie Émeraude<br />
              Alcime</em>
            </h1>
            <p className="text-2xl text-yellow-300 mb-8 font-light"><em>Artiste lyrique</em></p>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl">
              Bienvenue sur mon site officiel. Mezzo-soprano aux multiples facettes, 
              je vous invite à découvrir mon univers artistique, ma passion pour l'opéra 
              et mes prochains projets musicaux.
            </p>
            <div className="flex space-x-4 center justify-center">
              <a href="#media" className="bg-transparent hover:bg-emerald-700 px-6 py-3 rounded border border-white transition-colors center">
                ÉCOUTER
              </a>
              <a href="#agenda" className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded transition-colors center">
                VOIR L'AGENDA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BADGES - Section existante modifiée */}
      <section className="bg-emerald-800 border-t border-emerald-700">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {badges.map((b) => (
              <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-emerald-600 hover:border-yellow-400 transition p-4 text-sm text-emerald-100 text-center">
                {b.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA - Section existante modifiée */}
      <section id="media" className="bg-emerald-800 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-serif text-white mb-4">Extraits vidéo</h2>
          <p className="text-emerald-200 mb-8">Sélection d'extraits et d'interviews (YouTube).</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MediaEmbed url={videos[0].url} title={videos[0].title} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videos.slice(1).map((v) => (
                <MediaEmbed key={v.url} url={v.url} title={v.title} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section À PROPOS, AGENDA, PRESSE - Modifiée */}
      <div className="bg-emerald-800 border-t border-emerald-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-3 gap-12">
          {/* À PROPOS - Avec image */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-amber-100 rounded overflow-hidden flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop"
                alt="Marie"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-white">À PROPOS</h3>
              <p className="text-sm text-emerald-200 leading-relaxed">
                Découvrez mon parcours, mes inspirations, et mon univers musical. 
                De la Guadeloupe aux scènes internationales...
              </p>
            </div>
          </div>

          {/* AGENDA - Avec vraies données */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">AGENDA</h3>
            <div className="space-y-3 text-sm">
              {pastEvents.slice(0, 2).map((event, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-emerald-100">{event.date}</div>
                    <div className="text-emerald-300 text-xs">{event.work}</div>
                  </div>
                  <div className="text-right text-emerald-200">
                    <div>{event.city}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRESSE - Avec vraie citation */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">PRESSE</h3>
            <blockquote className="text-sm italic text-emerald-200 leading-relaxed">
              {press[0].quote}
            </blockquote>
            <cite className="text-xs text-emerald-300 mt-2 block">— {press[0].outlet}</cite>
          </div>
        </div>
      </div>

      {/* BIO - Section existante modifiée */}
      <section className="bg-emerald-800 border-t border-emerald-700 py-16">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif text-white mb-6">Biographie</h2>
            <p className="text-emerald-100 leading-relaxed mb-6">
              Originaire de Guadeloupe, Marie-Émeraude Alcime est une mezzo-soprano formée en musicologie et en métiers de la scène (Rouen, Nancy). Membre du chœur de l'Opéra-Théâtre de Metz Métropole, elle se produit sur scène dans Offenbach (Les Contes d'Hoffmann, La vie parisienne) et développe en parallèle une activité de cheffe de chœur et pédagogue.
            </p>
            <div className="mt-6">
              <a href="/biographie" className="inline-flex rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 transition-colors">
                Lire la biographie complète
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-600 bg-emerald-900 p-5">
              <h3 className="font-semibold text-white mb-3">Répertoire & affinités</h3>
              <ul className="text-emerald-200 text-sm list-disc list-inside space-y-1">
                <li>Opéra & opérette français/italien/allemand</li>
                <li>Musique sacrée (oratorios, Stabat Mater…)</li>
                <li>Pédagogie vocale & projets choraux</li>
              </ul>
              <div className="mt-4">
                <a href="/repertoire" className="text-yellow-300 hover:text-yellow-200 text-sm underline hover:no-underline transition-colors">
                  → Voir le répertoire complet
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-600 bg-emerald-900 p-5">
              <h3 className="font-semibold text-white mb-3">Télécharger</h3>
              <ul className="text-sm text-yellow-300 space-y-2">
                <li><a href="#" className="hover:underline">Bio courte (PDF)</a></li>
                <li><a href="#" className="hover:underline">Photos HD (ZIP)</a></li>
                <li><a href="#" className="hover:underline">Répertoire (PDF)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL - Section existante modifiée */}
      <section className="bg-emerald-800 border-t border-emerald-700 py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="rounded-2xl border border-emerald-600 bg-emerald-900 p-8 flex items-center justify-between gap-6 flex-col sm:flex-row">
            <div className="text-lg text-white">Programmez Marie-Émeraude pour votre production / événement.</div>
            <a href="/contact" className="rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 font-semibold transition-colors">
              Réserver
            </a>
          </div>
        </div>
      </section>
    </div>
  )
};