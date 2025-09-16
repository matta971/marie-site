import MediaEmbed from '../components/MediaEmbed'
import PressQuote from '../components/PressQuote'
import EventTable from '../components/EventTable'
import { videos, press, badges, pastEvents } from '../data/site'

export default function Home(): JSX.Element {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop"
            alt="Concert hall backdrop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">Marie-Émeraude Alcime</h1>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-neutral-300">
            Mezzo-soprano — une voix chaleureuse au service de la scène et de la pédagogie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#media" className="rounded-2xl bg-amber-400/90 hover:bg-amber-300 text-neutral-900 px-5 py-3 font-semibold shadow">Écouter</a>
            <a href="#agenda" className="rounded-2xl border border-neutral-700 hover:border-neutral-500 px-5 py-3 font-semibold">Voir l’agenda</a>
            <a href="/contact" className="rounded-2xl border border-amber-400/40 hover:border-amber-400 px-5 py-3 font-semibold">Réserver une prestation</a>
          </div>
        </div>
      </section>

      {/* BADGES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {badges.map((b) => (
            <a key={b.label} href={b.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-neutral-800 hover:border-amber-400/60 transition p-4 text-sm text-neutral-300">
              {b.label}
            </a>
          ))}
        </div>
      </section>

      {/* MEDIA */}
      <section id="media" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Extraits vidéo</h2>
        <p className="mt-2 text-neutral-300">Sélection d’extraits et d’interviews (YouTube).</p>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MediaEmbed url={videos[0].url} title={videos[0].title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.slice(1).map((v) => (
              <MediaEmbed key={v.url} url={v.url} title={v.title} />
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Biographie</h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Originaire de Guadeloupe, Marie-Émeraude Alcime est une mezzo-soprano formée en musicologie et en métiers de la scène (Rouen, Nancy). Membre du chœur de l’Opéra-Théâtre de Metz Métropole, elle se produit sur scène dans Offenbach (<em>Les Contes d’Hoffmann</em>, <em>La vie parisienne</em>) et développe en parallèle une activité de cheffe de chœur et pédagogue.
            </p>
            <div className="mt-6">
              <a href="/biographie" className="inline-flex rounded-xl bg-neutral-800 hover:bg-neutral-700 px-5 py-3">Lire la biographie complète</a>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 p-5">
              <h3 className="font-semibold">Répertoire & affinités</h3>
              <ul className="mt-3 text-neutral-300 text-sm list-disc list-inside space-y-1">
                <li>Opéra & opérette français/italien/allemand</li>
                <li>Musique sacrée (oratorios, Stabat Mater…)</li>
                <li>Pédagogie vocale & projets choraux</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-neutral-800 p-5">
              <h3 className="font-semibold">Télécharger</h3>
              <ul className="mt-3 text-sm text-amber-300/90 space-y-2">
                <li><a href="#" className="hover:underline">Bio courte (PDF)</a></li>
                <li><a href="#" className="hover:underline">Photos HD (ZIP)</a></li>
                <li><a href="#" className="hover:underline">Répertoire (PDF)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRESSE */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Presse</h2>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {press.map((p) => (
            <PressQuote key={p.link} quote={p.quote} outlet={p.outlet} link={p.link} />
          ))}
        </div>
      </section>

      {/* AGENDA */}
      <section id="agenda" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Agenda</h2>
        <EventTable events={pastEvents} />
        <div className="mt-4 text-sm text-neutral-400">
          <p>*Les prochaines dates seront publiées ici. Pour programmer Marie-Émeraude, utilisez le formulaire ci-dessous.</p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl border border-neutral-800 p-8 flex items-center justify-between gap-6 flex-col sm:flex-row">
          <div className="text-lg">Programmez Marie-Émeraude pour votre production / événement.</div>
          <a href="/contact" className="rounded-xl bg-amber-400/90 hover:bg-amber-300 text-neutral-900 px-6 py-3 font-semibold">Réserver</a>
        </div>
      </section>
    </div>
  )
}