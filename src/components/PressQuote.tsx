type Props = { quote: string; outlet: string; link: string }
export default function PressQuote({ quote, outlet, link }: Props): JSX.Element {
return (
<a
href={link}
target="_blank"
rel="noopener noreferrer"
className="group rounded-2xl border border-neutral-800 hover:border-amber-400/60 transition p-6 block"
>
<p className="text-lg leading-relaxed">{quote}</p>
<p className="mt-4 text-sm text-neutral-400">— {outlet}</p>
</a>
)
}