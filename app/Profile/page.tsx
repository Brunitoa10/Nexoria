import type { Metadata } from "next";

import MyListView from "@/components/catalog/MyListView";
import PageShell from "@/components/ui/PageShell";

export const metadata: Metadata = {
  title: "Mi Lista",
  description: "Las películas y series que guardaste para ver más tarde.",
};

export default function MyListPage() {
  return (
    <PageShell>
      <MyListView />
    </PageShell>
  );
}
