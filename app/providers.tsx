"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Created once per browser session (lazy initializer), so the cache
  // survives re-renders instead of being thrown away each render.
  const [queryClient] = useState(() => new QueryClient());

  // Start the MSW worker before rendering anything that fetches. This app has
  // no real backend — MSW *is* the data layer — so the worker must run in
  // production too, not just dev. Gate children until worker.start() resolves,
  // otherwise the first query can fire before MSW is listening (→ real 404).
  const [mockReady, setMockReady] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { worker } = await import("@/mocks/browser");
      await worker.start({ onUnhandledRequest: "bypass", quiet: true });
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
