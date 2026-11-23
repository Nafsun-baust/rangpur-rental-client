import { getOwnerBookings } from "@/lib/actions/bookings";
import OwnerRentalsTable from "./_components/OwnerRentalsTable";

export default async function OwnerRentalsPage() {
  const bookings = await getOwnerBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Equipment Rental</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review customer bookings for your listed equipment and update rental status.
        </p>
      </div>

      <OwnerRentalsTable initialBookings={bookings} />
    </div>
  );
}
