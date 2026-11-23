import { getAllBookings } from "@/lib/actions/bookings";
import AdminRentalsTable from "./_components/AdminRentalsTable";

export default async function AdminRentalsPage() {
  const bookings = await getAllBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Rentals</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor and manage every rental booking and payment activity across the platform.
        </p>
      </div>

      <AdminRentalsTable initialBookings={bookings} />
    </div>
  );
}
