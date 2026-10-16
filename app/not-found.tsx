import { Clapperboard } from "lucide-react";
import Link from "next/link";

import { buttonClass } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import PageShell from "@/components/ui/PageShell";
import { ROUTES } from "@/config/navigation";

export default function NotFound() {
  return (
    <PageShell className="pt-32">
      <EmptyState
        icon={Clapperboard}
        title="Esta página no existe"
        description="Puede que el título haya sido removido o que el enlace esté mal escrito."
        action={
          <Link href={ROUTES.home} className={buttonClass("primary")}>
            Volver al inicio
          </Link>
        }
      />
    </PageShell>
  );
}
