import { getMyFavorites } from "@/lib/actions/favorites";
import FavoritesTable from "./_components/FavoritesTable";

export default async function CustomerFavoritesPage() {
  const favorites = await getMyFavorites();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Equipment items you have saved for quick access later.
        </p>
      </div>

      <FavoritesTable initialFavorites={favorites} />
    </div>
  );
}
