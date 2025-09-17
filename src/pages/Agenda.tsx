import EventTable from '../components/EventTable'
import { pastEvents } from '../data/site'


export default function Agenda(): React.JSX.Element {
return (
<div className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Agenda</h1>
<h2 className="mt-6 text-xl font-semibold">Passées</h2>
<EventTable events={pastEvents} />
<p className="mt-4 text-sm text-neutral-400">Prochaines dates à venir.</p>
</div>
)
};