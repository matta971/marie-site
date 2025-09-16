import MediaEmbed from '../components/MediaEmbed'
import { videos } from '../data/site'


export default function Medias(): JSX.Element {
return (
<div className="max-w-6xl mx-auto px-6 py-12">
<h1 className="text-3xl font-bold">Médias</h1>
<p className="mt-2 text-neutral-300">Vidéos sélectionnées (YouTube)</p>
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
{videos.map((v) => (
<MediaEmbed key={v.url} url={v.url} title={v.title} />
))}
</div>
</div>
)
}