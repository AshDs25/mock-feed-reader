# Feed Reader

A small, frontend-only RSS-style feed reader. Built to demonstrate clean
separation of **server state** (TanStack Query) from **UI state** (Zustand),
a fully-mocked API layer, and polished loading / empty / error handling.

> **Live demo:** _add your Vercel URL here_

There's no real backend — **MSW intercepts the requests and serves mock data**,
in production as well as development. So the deployed app is fully interactive.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4** — token-based theming (CSS variables + light/dark)
- **TanStack Query** — server state: queries, mutations, cache invalidation /
  `setQueriesData`, `keepPreviousData`
- **Zustand** — UI state (filter) and a persisted theme store
- **MSW** — the mock API: latency, a failure switch, a stateful mark-as-read
- **Motion** (Framer Motion) — list stagger, state crossfades, per-card
  exit/enter, detail fade-in

## Features

- **Feed list** with an All / Unread filter (UI state in Zustand, data in TanStack)
- **Article detail** — marks the article read on open and reflects it back in the
  list by updating the query cache (no refetch)
- **Every state handled**, on both list and detail: skeleton loaders,
  error + retry, empty state, and not-found
- **Light/dark theme** toggle, persisted to `localStorage`, with no flash on load
- **Animation**: staggered cards, crossfaded states, cards animate out when
  filtered away

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) — the root redirects to `/feed`.

> Seeing the states: `mocks/handlers.ts` has `FAIL_ARTICLES` / `ZERO_ARTICLES`
> flags to force the error / empty states, and an artificial `delay()` so the
> skeletons are visible.

## Routes

- `/feed` — feed list
- `/feed/[id]` — article detail

## Project structure

```
api/
  api.ts              fetch functions used as queryFn / mutationFn
app/
  layout.tsx          app shell (header + theme toggle) + no-FOUC theme script
  page.tsx            redirects to /feed
  providers.tsx       TanStack QueryClient + MSW worker startup
  feed/
    page.tsx          feed list: query, filter, all states
    [id]/page.tsx     article detail: mark-as-read on open
components/
  ListView.tsx        article cards (stagger + per-card exit/enter)
  ListViewSkeleton.tsx
  DetailSkeleton.tsx
  ErrorState.tsx      reusable error + retry
  EmptyState.tsx      reusable empty / not-found
  ThemeToggle.tsx
lib/
  store.ts            Zustand — filter state
  theme-store.ts      Zustand (persisted) — theme
mocks/
  handlers.ts         MSW request handlers
  data.ts             mock article data
```

## What I'd add with more time

- Source filtering and search
- Optimistic mark-as-read with rollback
- Infinite Scroll (Pagination)
- A sidebar with sources which takes to a list page of all source feeds
