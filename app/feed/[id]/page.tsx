'use client';

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "motion/react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchArticleDetailById, markAsRead } from "@/api/api";
import type { Article } from "@/mocks/data";
import DetailSkeleton from "@/components/DetailSkeleton";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function ArticleDetailPage() {
  // The route is /feed/[id], so useParams() gives us { id }.
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: article, isLoading, isError, refetch } = useQuery({
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

  // Mark as read once the article has actually loaded (skip 404s / errors).
  useEffect(() => {
    if (article) markRead(article.id);
  }, [article, markRead]);

  if (isLoading) return <DetailSkeleton />;
  if (isError)
    return (
      <ErrorState
        message="Couldn't load this article."
        onRetry={() => refetch()}
      />
    );
  if (!article)
    return (
      <div className="space-y-4">
        <Link href="/feed" className="text-sm text-muted hover:underline">
          ← Back to feed
        </Link>
        <EmptyState
          title="Article not found"
          description="This article doesn’t exist or may have been removed."
        />
      </div>
    );

  return (
    <motion.article
      className="space-y-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Link href="/feed" className="text-sm text-muted hover:underline">
        ← Back to feed
      </Link>
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{article.title}</h1>
        <p className="text-sm text-muted">{article.source}</p>
      </header>
      <div className="space-y-4 leading-relaxed">
        {article.content.split("\n\n").map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </motion.article>
  );
}
