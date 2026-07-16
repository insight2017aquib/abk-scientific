/** Responsive YouTube embed. Server component: no client JS, and the iframe is
 *  lazy so nothing loads from YouTube until the viewer scrolls to it.
 *  nocookie host keeps the privacy posture of the rest of the site. */

export function VideoEmbed({
  youtubeId,
  title,
  caption,
  className = "",
}: {
  youtubeId: string;
  title: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl bg-navy-900 shadow-xl ring-1 ring-navy-900/5">
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-slate-500">{caption}</figcaption>
      )}
    </figure>
  );
}
