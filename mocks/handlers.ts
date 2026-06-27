import { http, HttpResponse } from "msw";
import { articles } from "./data";

export const handlers = [
  // List + unread filter on the SAME route.
  // MSW matches on the path only — query strings like `?unread=true` are NOT
  // part of the match, so read them off the request URL inside the handler.
  http.get("/api/articles", ({ request }) => {
    const url = new URL(request.url);
    const unreadOnly = url.searchParams.get("unread") === "true";

    const result = unreadOnly ? articles.filter((a) => !a.read) : articles;
    return HttpResponse.json(result);
  }),

  // Persist the user's filter preference. Echoes back what was saved so the
  // client can update its store from the server's response.
  http.put("/api/preferences/filter", async ({ request }) => {
    const { filter } = (await request.json()) as { filter: "all" | "unread" };
    return HttpResponse.json({ filter });
  }),

  // Mark an article as read. Mutates the "server" copy (the module-level
  // `articles` array), so subsequent GETs reflect the change.
  http.patch("/api/articles/:id/read", ({ params }) => {
    const article = articles.find((a) => a.id === params.id);
    if (!article) return new HttpResponse(null, { status: 404 });
    article.read = true;
    return HttpResponse.json(article);
  }),

  // Article detail.
  http.get("/api/articles/:id", ({ params }) => {
    const article = articles.find((a) => a.id === params.id);
    return article
      ? HttpResponse.json(article)
      : new HttpResponse(null, { status: 404 });
  }),
];
