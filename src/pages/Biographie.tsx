export default function Biographie(): JSX.Element {
return (
<div className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Biographie</h1>
<div className="mt-8 grid md:grid-cols-3 gap-10">
<div className="md:col-span-2 space-y-6 leading-relaxed text-neutral-300">
<p>
Marie-Émeraude Alcime est une mezzo-soprano originaire de Guadeloupe. Issue d’une famille de musiciens, elle débute très tôt le piano, la flûte traversière et les percussions traditionnelles. Après un baccalauréat littéraire option musique, elle poursuit des études supérieures en musicologie et métiers de la scène (Rouen, Nancy), avant d’intégrer le chœur de l’Opéra-Théâtre de Metz Métropole.
</p>
<p>
Sur scène, on a pu l’entendre dans <em>Les Contes d’Hoffmann</em> d’Offenbach (Metz) et <em>La vie parisienne</em> (Metz, Massy). Au concert, son répertoire inclut l’<em>Oratorio de Noël</em> (Saint-Saëns), le <em>Stabat Mater</em> (Pergolèse) et la <em>Petite messe solennelle</em> (Rossini). Parallèlement, elle développe une activité de cheffe de chœur et professeure de chant.
</p>
</div>
<aside className="space-y-4">
<div className="rounded-2xl border border-neutral-800 p-5">
<div className="font-semibold">Téléchargements</div>
<ul className="mt-3 text-sm text-amber-300/90 space-y-2">
<li><a href="#">Bio courte (PDF)</a></li>
<li><a href="#">Photos HD (ZIP)</a></li>
<li><a href="#">Répertoire (PDF)</a></li>
</ul>
</div>
</aside>
</div>
</div>
)
}