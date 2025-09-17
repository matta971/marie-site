type Props = { url: string; title: string }
export default function MediaEmbed({ url, title }: Props): React.JSX.Element {
return (
    <div className="aspect-video rounded-2xl overflow-hidden border border-emerald-600 shadow">
        <iframe
            className="w-full h-full"
            src={url}
            title={title}
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>
)
};