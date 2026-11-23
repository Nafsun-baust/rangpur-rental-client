"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  removeFavoriteAction,
  type FavoriteRecord,
} from "@/lib/actions/favorites";

export default function FavoritesTable({
  initialFavorites,
}: {
  initialFavorites: FavoriteRecord[];
}) {
  const [items, setItems] = useState(initialFavorites);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (equipmentId: string) => {
    setRemovingId(equipmentId);
    const res = await removeFavoriteAction(equipmentId);
    setRemovingId(null);
    if (!res.ok) {
      toast.error("Failed to remove favorite");
      return;
    }
    setItems((prev) => prev.filter((item) => item.equipmentId !== equipmentId));
    toast.success("Removed from favorites");
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Equipment</th>
              <th className="px-5 py-3.5 font-semibold">Category</th>
              <th className="px-5 py-3.5 font-semibold">Location</th>
              <th className="px-5 py-3.5 font-semibold">Rate</th>
              <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                  No favorite equipment saved yet.
                </td>
              </tr>
            ) : (
              items.map((fav) => (
                <tr key={fav._id} className="hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={fav.equipment.image}
                        alt={fav.equipment.name}
                        width={44}
                        height={44}
                        unoptimized
                        className="size-11 rounded-lg border object-cover"
                      />
                      <span className="font-medium">{fav.equipment.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">{fav.equipment.category}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {fav.equipment.location}
                  </td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    ${fav.equipment.rentalPrice} / {fav.equipment.rentalType}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/equipment/${fav.equipmentId}`}>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={removingId === fav.equipmentId}
                        onClick={() => handleRemove(fav.equipmentId)}
                        className="gap-1"
                      >
                        <Trash2 className="size-3.5" />
                        Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
