// Single source of truth for the mock feed.
// One `Article` object carries everything: the list view reads the summary
// fields (title, source, snippet, publishedAt, read); the detail view also
// reads `content`. MSW handlers serve this array; nothing here knows about
// HTTP, filtering, or React — it's just data.

export type Source = "The Verge" | "Ars Technica" | "Hacker News";

export interface Article {
  id: string;
  title: string;
  source: Source;
  /** Short preview shown in the list. */
  snippet: string;
  /** Full body shown on the detail page. Plain paragraphs separated by "\n\n". */
  content: string;
  /** ISO 8601 timestamp. */
  publishedAt: string;
  read: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "The browser is becoming the operating system again",
    source: "The Verge",
    snippet:
      "A new wave of web APIs is quietly closing the gap between native apps and the tab you already have open.",
    content:
      "For years the conventional wisdom was that the web could never quite match native. That assumption is starting to look dated.\n\nBetween the File System Access API, WebGPU, and persistent background workers, the browser now reaches into capabilities that used to require a download and an install prompt. The result is a class of apps that feel native but ship as a URL.\n\nThe trade-offs haven't vanished — battery use and memory pressure remain real — but the line between 'website' and 'application' has never been blurrier.",
    publishedAt: "2026-06-27T08:15:00Z",
    read: false,
  },
  {
    id: "2",
    title: "A practical guide to caching server state on the client",
    source: "Hacker News",
    snippet:
      "Most apps don't need a global store. They need a cache that knows when its data went stale.",
    content:
      "The most common state-management mistake is treating fetched data like local UI state. They behave nothing alike.\n\nServer state is shared, asynchronous, and can change without you touching it. UI state is local, synchronous, and only you change it. Conflating the two is why so many stores grow into unmaintainable sprawl.\n\nThe fix is boring: cache server data under a key, mark it stale when it changes, and keep genuinely local state somewhere small and separate. Do that and most of your 'state management' problem disappears.",
    publishedAt: "2026-06-27T06:40:00Z",
    read: false,
  },
  {
    id: "3",
    title: "Why your skeleton screens still feel slow",
    source: "The Verge",
    snippet:
      "A loading placeholder is a promise. Break it too often and users trust it less than a spinner.",
    content:
      "Skeleton screens were supposed to make waiting feel shorter. Done badly, they do the opposite.\n\nThe problem is mismatch: a skeleton that looks nothing like the content it's replacing produces a jarring 'pop' on load. The eye notices the layout shift even when the wait is short.\n\nGood skeletons mirror the real layout closely — same shapes, same spacing — so the transition to real content is almost invisible. The goal isn't to entertain during the wait; it's to make the arrival feel like nothing happened.",
    publishedAt: "2026-06-26T19:05:00Z",
    read: true,
  },
  {
    id: "4",
    title: "Service workers, explained without the magic",
    source: "Ars Technica",
    snippet:
      "It's just a script that sits between your app and the network. That's the whole idea.",
    content:
      "Service workers have a reputation for being confusing, but the core concept is simple: it's a script the browser runs separately from your page, and it can intercept network requests.\n\nThat single ability unlocks offline support, background sync, push notifications — and, usefully for development, request mocking. A tool like MSW registers a service worker that catches your fetch calls and answers them with fake data, so your app talks to a 'server' that doesn't exist.\n\nOnce you see it as a programmable proxy rather than a mysterious background process, most of the confusion evaporates.",
    publishedAt: "2026-06-26T14:20:00Z",
    read: false,
  },
  {
    id: "5",
    title: "The quiet comeback of server-rendered HTML",
    source: "Ars Technica",
    snippet:
      "After a decade of shipping everything to the client, the pendulum is swinging back — with nuance.",
    content:
      "Single-page apps promised app-like fluidity. They also shipped enormous JavaScript bundles and pushed rendering work onto the user's device.\n\nThe current generation of frameworks splits the difference: render on the server by default, send HTML first, and hydrate only the interactive bits. Pages arrive fast and stay interactive where it matters.\n\nIt's not a return to 2005. It's a recognition that not every component needs to be a client component, and that the network is still the slowest part of the stack.",
    publishedAt: "2026-06-26T09:50:00Z",
    read: true,
  },
  {
    id: "6",
    title: "Optimistic updates: faster apps, harder bugs",
    source: "Hacker News",
    snippet:
      "Updating the UI before the server confirms feels instant — until the server says no.",
    content:
      "Optimistic updates trade certainty for speed. You apply the change locally the moment the user acts, then reconcile with the server's response.\n\nWhen it works, the app feels weightless. When the request fails, you have to roll back cleanly — restore the previous state, and ideally tell the user what happened without yanking the interface out from under them.\n\nThe pattern is worth it for high-frequency actions like marking items read or toggling likes. For anything destructive or rare, the latency of waiting for confirmation is usually the safer choice.",
    publishedAt: "2026-06-25T22:10:00Z",
    read: false,
  },
  {
    id: "7",
    title: "Designing empty states people actually read",
    source: "The Verge",
    snippet:
      "A blank screen is a missed conversation. The empty state is where you set expectations.",
    content:
      "Empty states are the most overlooked screens in most products, and the most telling. They're the first thing a new user sees and the thing a filtered list shows when nothing matches.\n\nA good empty state does three things: it explains why the space is empty, it reassures the user nothing is broken, and it points to the next action. 'No articles match your filter' beats a blank rectangle every time.\n\nTreat empty states as part of the happy path, not an edge case, and the whole product feels more considered.",
    publishedAt: "2026-06-25T15:30:00Z",
    read: false,
  },
  {
    id: "8",
    title: "What 'stale-while-revalidate' really buys you",
    source: "Ars Technica",
    snippet:
      "Show the cached data instantly, refresh it quietly in the background. Users get both speed and freshness.",
    content:
      "Stale-while-revalidate is a caching strategy with an unusually good name: it tells you exactly what it does.\n\nWhen data is requested, you serve whatever's in the cache immediately — even if it's slightly out of date — then kick off a background refresh. If the data changed, the UI updates a moment later; if it didn't, the user never waited.\n\nThe insight is that 'instant but slightly stale' beats 'fresh but slow' for the vast majority of reads. It's why the pattern shows up everywhere from HTTP headers to client data libraries.",
    publishedAt: "2026-06-24T18:45:00Z",
    read: true,
  },
  {
    id: "9",
    title: "Type-safe routing is finally boring, and that's good",
    source: "Hacker News",
    snippet:
      "Generated route types mean a typo in a link is now a compile error, not a 404 in production.",
    content:
      "For a long time, links in web apps were just strings, and strings lie. A mistyped path compiled fine and broke silently for users.\n\nModern frameworks now generate types from your file-based routes, so the set of valid paths is known at build time. Reference a route that doesn't exist and the typechecker stops you before you ship.\n\nIt's an unglamorous improvement — no demo dazzles with it — but it removes an entire category of bug, which is exactly what good tooling should do.",
    publishedAt: "2026-06-24T11:00:00Z",
    read: false,
  },
  {
    id: "10",
    title: "The case against premature global state",
    source: "Hacker News",
    snippet:
      "Reach for a store when you have shared, cross-cutting state — not because the tutorial did.",
    content:
      "Global state libraries are excellent tools and a terrible default. The reflex to put everything in one store is how apps become impossible to reason about.\n\nMost state is local: it belongs to one component or a small subtree. Some state is server state: it belongs in a data cache. Only the leftover — genuinely shared, cross-cutting UI concerns like a theme or an active filter — earns a spot in a global store.\n\nStart local. Lift state only when sharing forces you to. The store you don't create is the bug you don't write.",
    publishedAt: "2026-06-23T20:25:00Z",
    read: false,
  },
  {
    id: "11",
    title: "Reading apps and the lost art of the unread count",
    source: "The Verge",
    snippet:
      "The humble unread badge shaped how a generation related to information. Then it became a source of dread.",
    content:
      "There was a time when the unread count was a feature, not a stressor. It told you what was new and let you feel on top of things.\n\nSomewhere along the way the number grew faster than anyone could read, and the badge flipped from helpful to oppressive. The best modern readers treat 'unread' as a filter you opt into, not a debt you owe.\n\nThe shift is subtle but meaningful: information you haven't seen is an option, not an obligation. Designing for that distinction is what separates a calm reader from an anxious one.",
    publishedAt: "2026-06-23T13:40:00Z",
    read: true,
  },
  {
    id: "12",
    title: "Mock servers are an underrated way to design an API",
    source: "Ars Technica",
    snippet:
      "Write the responses before the backend exists, and the frontend tells you what the API should be.",
    content:
      "The usual order is backend first, frontend second. Flipping it has a quiet advantage.\n\nWhen you mock the API responses up front, the shape of the data is driven by what the UI actually needs, not by what happened to be convenient in the database. You discover awkward fields and missing data while it's still cheap to change.\n\nBy the time the real backend gets built, the contract is already proven against a working interface. The mock becomes a specification — and your frontend never had to wait on a server to make progress.",
    publishedAt: "2026-06-22T10:15:00Z",
    read: false,
  },
];
