export default function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-zinc-200 p-8 text-center dark:border-zinc-800">
      <p className="text-sm text-zinc-500">
        Couldn&apos;t load your feed. Something went wrong.
      </p>
      <button
        onClick={onRetry}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Try again
      </button>
    </div>
  );
}
