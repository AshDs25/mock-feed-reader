import type { Article } from "@/mocks/data";

export type Filter = "all" | "unread";

export async function fetchArticles(filter: Filter = "all"): Promise<Article[]> {
  const url =
    filter === "unread" ? "/api/articles?unread=true" : "/api/articles";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export async function fetchArticleDetailById({
  id,
}: {
  id: string;
}): Promise<Article> {
  const res = await fetch(`/api/articles/${id}`);
  if (!res.ok) throw new Error("Failed to load");
  return res.json();
}

export async function updateFilterPref(
  filter: Filter,
): Promise<{ filter: Filter }> {
  const res = await fetch("/api/preferences/filter", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filter }),
  });
  if (!res.ok) throw new Error("Failed to update filter preference");
  return res.json(); // { filter }
}

export async function markAsRead(id: string): Promise<Article> {
  const res = await fetch(`/api/articles/${id}/read`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to mark as read");
  return res.json(); // the updated article
}
