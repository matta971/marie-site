import { Link } from 'react-router-dom'


export default function Footer(): JSX.Element {
return (
<footer className="border-t border-neutral-900 mt-16">
<div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-3 gap-8 text-sm text-neutral-400">
<div>
<div className="font-semibold text-neutral-200">Marie-Émeraude Alcime</div>
<div className="mt-2">Mezzo-soprano — site vitrine artistique.</div>
</div>
<div className="flex gap-4 flex-wrap">
<Link to="/">Accueil</Link>
<Link to="/biographie">Biographie</Link>
<Link to="/medias">Médias</Link>
<Link to="/agenda">Agenda</Link>
<Link to="/presse">Presse</Link>
<Link to="/enseignement">Enseignement</Link>
<Link to="/contact">Contact</Link>
</div>
<div className="space-y-2">
<div>© {new Date().getFullYear()} — Tous droits réservés.</div>
<div className="text-xs">Crédits photos : à compléter</div>
</div>
</div>
</footer>
)
}