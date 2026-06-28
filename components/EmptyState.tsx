export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    // border-dashed sets it apart from real content cards
    <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {title}
      </p>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
