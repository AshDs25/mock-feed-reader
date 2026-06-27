# Feed Reader

A small, frontend-only RSS-style feed reader. Built to demonstrate clean separation
of server state and UI state, plus polished loading/empty/error handling.

## Stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **TanStack Query** — server state / data fetching _(planned)_
- **Zustand** — UI state: filters, read/unread _(planned)_
- **MSW** — mock data layer _(planned)_
- **Framer Motion** — light transitions _(optional)_

## Getting started

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to `/feed`.

## Routes

- `/feed` — feed list view
- `/feed/[id]` — article detail view _(planned)_

## Project structure

```
app/
  layout.tsx          app shell (header + main)
  page.tsx            redirects to /feed
  feed/
    page.tsx          feed list
    [id]/page.tsx     article detail (planned)
components/            FeedList, FeedCard, FilterBar, EmptyState, ErrorState, SkeletonCard (planned)
lib/                  store.ts (Zustand), queries.ts (TanStack Query) (planned)
mocks/                handlers.ts, data.ts (MSW) (planned)
```

## What I'd add with more time

- Source filtering and search
- Optimistic mark-as-read with rollback
- Infinite Scroll (Pagination)
- A sidebar with sources which takes to a list page of all source feeds
