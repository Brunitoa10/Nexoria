import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-line bg-surface/50 px-6 py-20 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-white/5">
        <Icon className="h-7 w-7 text-muted" aria-hidden />
      </span>
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description && <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
