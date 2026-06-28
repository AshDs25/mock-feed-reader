'use client';

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { Article } from "@/mocks/data";

export default function ListView({ articles }: { articles: Article[] }) {
  return (
    // gap (not space-y) plays nicer with layout animations
    <div className="flex flex-col gap-3">
      {/* popLayout: an exiting card is pulled out of flow immediately, so the
          remaining cards animate up to fill the gap (via `layout`). */}
      <AnimatePresence mode="popLayout">
        {articles.map((dt: Article, i: number) => (
          <motion.div
            key={dt.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            // index delay = the stagger on enter
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, delay: i * 0.04 } }}
            // read cards fade + shrink away when they leave (all → unread)
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={`/feed/${dt.id}`}
              className="block rounded-lg border border-border p-4 transition-colors hover:bg-surface"
            >
              {/* top row: source on the left, date on the right */}
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-accent">
                  {/* unread dot — only shown when the article is unread */}
                  {!dt.read && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                  )}
                  {dt.source}
                </span>
                <time className="text-xs text-muted">
                  {new Date(dt.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              {/* title — dimmed once read */}
              <h2
                className={`font-semibold ${
                  dt.read ? "text-muted" : "text-foreground"
                }`}
              >
                {dt.title}
              </h2>

              {/* snippet — muted, clamped to 2 lines so cards stay even height */}
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {dt.snippet}
              </p>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
