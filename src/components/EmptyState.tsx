interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function EmptyState({
  icon = "🔍",
  title,
  description,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-5">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      )}
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="px-4 py-2 rounded-lg bg-[#8b5cf6]/15 text-[#a78bfa] text-sm font-medium hover:bg-[#8b5cf6]/25 transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
