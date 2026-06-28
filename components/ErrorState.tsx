export default function ErrorState({
  onRetry,
  message = "Couldn't load your feed. Something went wrong.",
}: {
  onRetry: () => void;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-border p-8 text-center">
      <p className="text-sm text-muted">{message}</p>
      <button
        onClick={onRetry}
        className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
