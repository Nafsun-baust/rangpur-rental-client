import { Suspense } from "react";
import EquipmentCard from "@/components/shared/EquipmentCard";
import { getAllEquipment } from "@/lib/api/equipment";
import EquipmentFilters from "./_components/EquipmentFilters";

export default async function AllEquipmentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const items = await getAllEquipment(params);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Marketplace
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">All Equipment</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Browse approved tools and machines available for rent. Showing {items.length} item{items.length === 1 ? "" : "s"}.
        </p>
      </div>

      <Suspense fallback={<div className="mb-8 h-40 animate-pulse rounded-2xl bg-muted" />}>
        <EquipmentFilters />
      </Suspense>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-card p-14 text-center">
          <h2 className="text-lg font-semibold">No equipment found</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search keywords, category, or price filter.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <EquipmentCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
