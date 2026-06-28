// Mirrors the article detail layout: back link, title + source, paragraphs.
export default function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden>
      {/* back link */}
      <div className="h-3 w-24 rounded bg-skeleton" />

      {/* header: title + source */}
      <div className="space-y-2">
        <div className="h-7 w-3/4 rounded bg-skeleton" />
        <div className="h-3 w-24 rounded bg-skeleton" />
      </div>

      {/* a couple of paragraph blocks */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-skeleton" />
        <div className="h-3 w-full rounded bg-skeleton" />
        <div className="h-3 w-5/6 rounded bg-skeleton" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-skeleton" />
        <div className="h-3 w-11/12 rounded bg-skeleton" />
        <div className="h-3 w-2/3 rounded bg-skeleton" />
      </div>
    </div>
  );
}
