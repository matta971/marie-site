import { useState } from 'react'


type FormState = { name: string; email: string; phone: string; topic: string; message: string; consent: boolean }


export default function ContactForm(): JSX.Element {
const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', topic: 'Opéra / Oratorio', message: '', consent: false })


function onSubmit(e: React.FormEvent) {
e.preventDefault()
if (!form.email || !form.name || form.message.length < 10 || !form.consent) {
alert('Merci de remplir les champs obligatoires et de cocher le consentement.')
return
}
console.log('Contact form submitted', form)
alert('Merci ! Votre demande a été transmise.')
}


return (
<form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<input
type="text"
placeholder="Nom *"
value={form.name}
onChange={(e) => setForm({ ...form, name: e.target.value })}
className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
/>
<input
type="email"
placeholder="Email *"
value={form.email}
onChange={(e) => setForm({ ...form, email: e.target.value })}
className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
/>
<input
type="tel"
placeholder="Téléphone"
value={form.phone}
onChange={(e) => setForm({ ...form, phone: e.target.value })}
className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
/>
<select
value={form.topic}
onChange={(e) => setForm({ ...form, topic: e.target.value })}
className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
>
<option>Opéra / Oratorio</option>
<option>Concert / Récital</option>
<option>Cours / Master-class</option>
<option>Autre</option>
</select>
<textarea
placeholder="Votre message…"
value={form.message}
onChange={(e) => setForm({ ...form, message: e.target.value })}
className="sm:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-400/50"
/>
<label className="sm:col-span-2 inline-flex items-center gap-2 text-sm text-neutral-300">
<input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
J’accepte que mes données soient utilisées pour me recontacter (RGPD).
</label>
<button
type="submit"
className="sm:col-span-2 rounded-2xl bg-amber-400/90 hover:bg-amber-300 text-neutral-900 px-6 py-3 font-semibold shadow"
>
Envoyer la demande
</button>
</form>
)
}