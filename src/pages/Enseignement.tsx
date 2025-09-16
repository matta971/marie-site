export default function Enseignement(): JSX.Element {
return (
<div className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Enseignement</h1>
<div className="mt-6 grid md:grid-cols-3 gap-6">
{[ 'Cours de chant', 'Coaching audition', 'Chef de chœur / Master-classes' ].map((title) => (
<div key={title} className="rounded-2xl border border-neutral-800 p-6">
<div className="font-semibold">{title}</div>
<p className="mt-2 text-neutral-300 text-sm">Description 3–5 lignes, public visé, format, durée.</p>
</div>
))}
</div>
<div className="mt-8">
<a href="/contact" className="rounded-xl bg-amber-400/90 hover:bg-amber-300 text-neutral-900 px-6 py-3 font-semibold">Demander un devis</a>
</div>
</div>
)
}