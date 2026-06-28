export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    // border-dashed sets it apart from real content cards
    <div className="flex flex-col items-center gap-1 rounded-lg border border-dashed border-border p-10 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}
