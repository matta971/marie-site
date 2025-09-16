import { NavLink, Link } from 'react-router-dom'


const links = [
{ to: '/', label: 'Accueil' },
{ to: '/biographie', label: 'Biographie' },
{ to: '/medias', label: 'Médias' },
{ to: '/agenda', label: 'Agenda' },
{ to: '/presse', label: 'Presse' },
{ to: '/enseignement', label: 'Enseignement' },
{ to: '/contact', label: 'Contact' },
]


export default function Header(): JSX.Element {
return (
<header className="sticky top-0 z-50 border-b border-neutral-900 bg-neutral-950/80 backdrop-blur">
<div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-6">
<Link to="/" className="font-extrabold tracking-tight text-lg sm:text-xl">
Marie-Émeraude Alcime
</Link>
<nav className="hidden md:flex gap-4 text-sm">
{links.map((l) => (
<NavLink
key={l.to}
to={l.to}
className={({ isActive }) =>
`px-2 py-1 rounded ${isActive ? 'text-amber-300' : 'text-neutral-300 hover:text-neutral-100'}`
}
end={l.to === '/'}
>
{l.label}
</NavLink>
))}
</nav>
<div className="ml-auto">
<Link
to="/contact"
className="rounded-xl bg-amber-400/90 hover:bg-amber-300 text-neutral-900 px-4 py-2 font-semibold"
>
Réserver
</Link>
</div>
</div>
</header>
)
}