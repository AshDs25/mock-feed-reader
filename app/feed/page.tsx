'use client';

import { AnimatePresence, motion } from "motion/react";
import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import { fetchArticles, updateFilterPref } from "@/api/api";
import { useFeedStore } from "@/lib/store";
import ListView from "@/components/ListView";
import ListViewSkeleton from "@/components/ListViewSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function FeedPage() {
  const filter = useFeedStore((s) => s.filter);
  const setFilter = useFeedStore((s) => s.setFilter);

  // Articles are keyed by `filter`, so whenever the store's filter changes,
  // the key changes and TanStack refetches with the new value automatically.
  const { data: articles, isLoading, isError, isPlaceholderData, refetch } =
    useQuery({
      queryKey: ["articles", filter],
      queryFn: () => fetchArticles(filter),
      // Keep showing the previous filter's list while the new one loads,
      // instead of dropping to skeletons on every toggle.
      placeholderData: keepPreviousData,
      // Default is 3 retries (each waits on our 1.2s delay), so the error
      // takes ~5s to surface. 1 makes it snappy to see.
      retry: 1,
    });

  // Dropdown change -> persist the pref via the API -> on the response,
  // update Zustand. Updating the store flips `filter` above, which triggers
  // the articles refetch.
  const { mutate: changeFilter, isPending } = useMutation({
    mutationFn: updateFilterPref,
    onSuccess: (pref) => setFilter(pref.filter),
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Your feed</h1>
        <select
          value={filter}
          disabled={isPending}
          onChange={(e) => changeFilter(e.target.value as "all" | "unread")}
          className="rounded border border-border bg-transparent px-2 py-1 text-sm"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
        </select>
      </div>

      {/* mode="wait": finish the exit (fade out) before the enter (fade in),
          so states crossfade instead of overlapping. Each branch needs a
          unique `key` for AnimatePresence to track enter/exit. */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ListViewSkeleton />
          </motion.div>
        ) : isError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ErrorState onRetry={() => refetch()} />
          </motion.div>
        ) : articles && articles.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmptyState
              title={
                filter === "unread" ? "You're all caught up" : "No articles yet"
              }
              description={
                filter === "unread"
                  ? "No unread articles. Switch to All to see everything."
                  : "There's nothing to show here right now."
              }
            />
          </motion.div>
        ) : articles ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            // dim while the next filter's data loads (placeholder shown),
            // back to full once fresh data arrives and the cards animate
            animate={{ opacity: isPlaceholderData ? 0.5 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ListView articles={articles} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
