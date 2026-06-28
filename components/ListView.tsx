import Link from "next/link";
import type { Article } from "@/mocks/data";

export default function ListView({ articles }: { articles: Article[] }) {
  return (
    // space-y-3 → 12px vertical gap between each card
    <div className="space-y-3">
      {articles.map((dt: Article) => (
        <Link
          key={dt.id}
          href={`/feed/${dt.id}`}
          // block        → make the <a> fill the row so the whole card is clickable
          // rounded-lg   → rounded corners
          // border …     → 1px border, light grey (dark grey in dark mode)
          // p-4          → 16px padding all around
          // transition-colors hover:… → smoothly highlight on hover
          className="block rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
        >
          {/* top row: source on the left, date on the right */}
          {/* flex + justify-between pushes them to opposite ends */}
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {/* unread dot — only shown when the article is unread */}
              {!dt.read && (
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" aria-hidden />
              )}
              {dt.source}
            </span>
            <time className="text-xs text-zinc-400">
              {new Date(dt.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          {/* title — dimmed once read */}
          <h2
            className={`font-semibold ${
              dt.read ? "text-zinc-500" : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            {dt.title}
          </h2>

          {/* snippet — muted, clamped to 2 lines so cards stay even height */}
          <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{dt.snippet}</p>
        </Link>
      ))}
    </div>
  );
}
