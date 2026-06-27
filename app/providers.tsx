"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Created once per browser session (lazy initializer), so the cache
  // survives re-renders instead of being thrown away each render.
  const [queryClient] = useState(() => new QueryClient());

  // Start the MSW worker before rendering anything that fetches.
  // In production there's no mocking, so we start "ready". In dev we gate
  // children until worker.start() resolves — otherwise the first query can
  // fire before MSW is listening and escape to the real network (404).
  const [mockReady, setMockReady] = useState(
    process.env.NODE_ENV !== "development",
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    let active = true;
    (async () => {
      const { worker } = await import("@/mocks/browser");
      await worker.start({ onUnhandledRequest: "bypass" });
      if (active) setMockReady(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!mockReady) return null;

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
