import ContactForm from '../components/ContactForm'


export default function Contact(): JSX.Element {
return (
<div className="max-w-4xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Contact / Booking</h1>
<div className="mt-8 grid md:grid-cols-2 gap-10">
<div className="space-y-3 text-neutral-300">
<p>Email pro : <a href="mailto:booking@example.com" className="text-amber-300 hover:underline">booking@example.com</a></p>
<p>Langues : FR / EN</p>
<p>Réseaux : YouTube · Instagram · Facebook · Threads · LinkedIn</p>
</div>
<div className="rounded-2xl border border-neutral-800 p-6">
<ContactForm />
</div>
</div>
</div>
)
}