'use client';

import { useEffect, useState } from "react";
import { useThemeStore } from "@/lib/theme-store";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  // Avoid a hydration mismatch: the store may rehydrate to "dark" on the
  // client while the server rendered "light". Only show the real icon once
  // mounted; before that, render a stable placeholder.
  const [mounted, setMounted] = useState(false);
  // Standard "mounted" guard: the store may rehydrate to a different theme
  // than the server rendered, so we only show the real icon after mount.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Keep the <html> class in sync with the store so `dark:` utilities apply.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "light"  : "dark");
  }, [theme]);

   return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-md border border-border p-2 text-muted transition-colors hover:bg-surface"
    >
      {mounted && (
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 180 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {theme === 'dark' ? (
            // sun
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            // moon
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </motion.div>
      )}
    </button>
  )

  // return (
  //   <button
  //     type="button"
  //     onClick={toggleTheme}
  //     aria-label="Toggle theme"
  //     className="rounded-md border border-border p-2 text-muted transition-colors hover:bg-surface"
  //   >
  //     {mounted && theme === "dark" ? (
  //       // sun
  //       <svg
  //         width="16"
  //         height="16"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         aria-hidden
  //       >
  //         <circle cx="12" cy="12" r="4" />
  //         <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  //       </svg>
  //     ) : (
  //       // moon
  //       <svg
  //         width="16"
  //         height="16"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         aria-hidden
  //       >
  //         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  //       </svg>
  //     )}
  //   </button>
  // );
}
