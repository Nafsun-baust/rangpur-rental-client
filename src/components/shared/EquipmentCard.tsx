import Link from "next/link";
import Image from "next/image";
import { MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { EquipmentItem } from "@/lib/types/equipment";

export default function EquipmentCard({ item }: { item: EquipmentItem }) {
  const isAvailable = Number(item.availableQuantity) > 0;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
        <Image
          src={item.image}
          alt={item.name}
          width={800}
          height={500}
          unoptimized
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium ${
            isAvailable ? "bg-emerald-600 text-white" : "bg-destructive text-white"
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

        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-xl font-bold text-foreground">
              ${item.rentalPrice}
            </span>
            <span className="ml-1 text-xs text-muted-foreground">
              / {item.rentalType}
            </span>
          </div>

          <Link href={`/equipment/${item._id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}