export type EventItem = { date: string; work: string; role: string; place: string; city: string; ticketUrl?: string }


type Props = { events: EventItem[] }


export default function EventTable({ events }: Props): React.JSX.Element {
return (
<div className="rounded-2xl border border-neutral-800 overflow-hidden">
<table className="w-full text-left text-sm">
<thead className="bg-neutral-900/60 text-neutral-300">
<tr>
<th className="px-4 py-3">Date</th>
<th className="px-4 py-3">Œuvre</th>
<th className="px-4 py-3">Rôle</th>
<th className="px-4 py-3">Salle</th>
<th className="px-4 py-3">Ville</th>
<th className="px-4 py-3">Billetterie</th>
</tr>
</thead>
<tbody>
{events.map((e, idx) => (
<tr key={idx} className={idx % 2 ? 'bg-neutral-900/40' : 'bg-neutral-900/20'}>
<td className="px-4 py-3 whitespace-nowrap">{e.date}</td>
<td className="px-4 py-3">{e.work}</td>
<td className="px-4 py-3">{e.role}</td>
<td className="px-4 py-3">{e.place}</td>
<td className="px-4 py-3">{e.city}</td>
<td className="px-4 py-3">
{e.ticketUrl ? (
<a className="text-amber-300 hover:underline" href={e.ticketUrl} target="_blank" rel="noopener noreferrer">Billets</a>
) : (
<span className="text-neutral-500">—</span>
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
)
};