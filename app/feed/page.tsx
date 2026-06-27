'use client';

import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchArticles, updateFilterPref } from "@/api/api";
import { useFeedStore } from "@/lib/store";

export default function FeedPage() {
  const filter = useFeedStore((s) => s.filter);
  const setFilter = useFeedStore((s) => s.setFilter);

  // Articles are keyed by `filter`, so whenever the store's filter changes,
  // the key changes and TanStack refetches with the new value automatically.
  const { data: articles, isLoading, isError } = useQuery({
    queryKey: ["articles", filter],
    queryFn: () => fetchArticles(filter),
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
          className="rounded border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700"
        >
          <option value="all">All</option>
          <option value="unread">Unread</option>
        </select>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occured</div>}
      {articles && articles.length === 0 && <div>No data available</div>}
      {articles && articles.length > 0 && (
        <ol type="1" style={{ listStyle: "numeric" }}>
          {articles.map((dt: any) => (
            <li key={dt.id} className={dt.read ? "text-zinc-500" : ""}>
              <Link href={`/feed/${dt.id}`} className="hover:underline">
                {!dt.read && (
                  <span aria-hidden className="mr-1 text-blue-500">
                    •
                  </span>
                )}
                {dt.title}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
