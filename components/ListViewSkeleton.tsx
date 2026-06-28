// Mirrors ListView's card layout, but with grey bars instead of text.
// `count` controls how many placeholder cards to render.
export default function ListViewSkeleton({ count = 5 }: { count?: number }) {
  return (
    // aria-hidden: it's decorative, hide it from screen readers
    <div className="space-y-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        // animate-pulse on the card → every bar inside pulses together
        <div
          key={i}
          className="animate-pulse rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
        >
          {/* top row: source + date bars */}
          <div className="mb-3 flex items-center justify-between">
            {/* h-3 = height, w-20 = width, bg-… = the grey, rounded = soft corners */}
            <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* title bar — wider + taller than the rest */}
          <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />

          {/* two snippet lines, second one shorter for a natural look */}
          <div className="mt-2 h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="mt-2 h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}
