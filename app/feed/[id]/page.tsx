'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticleDetailById, markAsRead } from "@/api/api";
import type { Article } from "@/mocks/data";

export default function ArticleDetailPage() {
  // The route is /feed/[id], so useParams() gives us { id }.
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: article, isLoading, isError } = useQuery({
    // Per-article cache entry, keyed by id.
    queryKey: ["article", id],
    // queryFn receives TanStack's own context, not our args — so wrap the call
    // and pass the id ourselves.
    queryFn: () => fetchArticleDetailById({ id }),
  });

  const { mutate: markRead } = useMutation({
    mutationFn: markAsRead,
    onSuccess: (updatedArticle) => {
      // Write the new article straight into the cache — no refetch.
      // setQueriesData (plural) prefix-matches, so it updates both
      // ["articles","all"] and ["articles","unread"]. The updater MUST return
      // the new array, and `old` can be undefined if a list isn't cached yet.
      queryClient.setQueriesData<Article[]>(
        { queryKey: ["articles"] },
        (old) =>
          old?.map((a) => (a.id === updatedArticle.id ? updatedArticle : a)),
      );
    },
  });

  // Mark as read once the article is opened.
  useEffect(() => {
    if (id) markRead(id);
  }, [id, markRead]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occured</div>;
  if (!article) return null;

  return (
    <article className="space-y-4">
      <Link href="/feed" className="text-sm text-zinc-500 hover:underline">
        ← Back to feed
      </Link>
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{article.title}</h1>
        <p className="text-sm text-zinc-500">{article.source}</p>
      </header>
      <div className="space-y-4 leading-relaxed">
        {article.content.split("\n\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
