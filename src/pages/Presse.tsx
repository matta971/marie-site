import PressQuote from '../components/PressQuote'
import { press } from '../data/site'


export default function Presse(): React.JSX.Element {
return (
<div className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Presse</h1>
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
{press.map((p) => (
<PressQuote key={p.link} quote={p.quote} outlet={p.outlet} link={p.link} />
))}
</div>
</div>
)
};