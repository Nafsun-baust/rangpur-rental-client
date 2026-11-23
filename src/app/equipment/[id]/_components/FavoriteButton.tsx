"use client";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addFavoriteAction, removeFavoriteAction } from "@/lib/actions/favorites";

export default function FavoriteButton({
  equipmentId,
  initialFavorited,
}: {
  equipmentId: string;
  initialFavorited: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    if (favorited) {
      const res = await removeFavoriteAction(equipmentId);
      setLoading(false);
      if (!res.ok) {
        toast.error(res.data?.message || "Failed to remove from favorites");
        return;
      }
      setFavorited(false);
      toast.success("Removed from favorites");
    } else {
      const res = await addFavoriteAction(equipmentId);
      setLoading(false);
      if (!res.ok) {
        toast.error(res.data?.message || "Failed to add to favorites");
        return;
      }
      setFavorited(true);
      toast.success("Added to favorites");
    }
  };

  return (
    <Button
      type="button"
      variant={favorited ? "default" : "outline"}
      onClick={handleToggle}
      disabled={loading}
      className="gap-2"
    >
      <Heart className={`size-4 ${favorited ? "fill-current" : ""}`} />
      {favorited ? "Saved in Favorites" : "Add to Favorites"}
    </Button>
  );
}
