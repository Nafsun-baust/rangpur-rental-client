"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import type { EquipmentItem } from "@/lib/types/equipment";

export default function EquipmentCard({ item }: { item: EquipmentItem }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isAvailable = Number(item.availableQuantity) > 0;

  const handleViewDetails = () => {
    const target = `/equipment/${item._id}`;
    if (!session?.user) {
      router.push(`/login?redirectTo=${encodeURIComponent(target)}`);
      return;
    }
    router.push(target);
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            isAvailable
              ? "bg-emerald-600 text-white"
              : "bg-destructive text-white"
          }`}
        >
          {isAvailable ? `Available (${item.availableQuantity})` : "Unavailable"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
          <Tag className="size-3.5" />
          <span>{item.category}</span>
        </div>

        <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-card-foreground">
          {item.name}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          <span className="line-clamp-1">{item.location}</span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t pt-4 mt-5">
          <div>
            <span className="text-xl font-bold text-foreground">
              ${item.rentalPrice}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
              / {item.rentalType}
            </span>
          </div>

          <Button size="sm" onClick={handleViewDetails}>
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
