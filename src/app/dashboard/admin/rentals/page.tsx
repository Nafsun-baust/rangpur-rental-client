import { getAllBookings } from "@/lib/actions/bookings";

export default async function AdminRentalsPage() {
  const bookings = await getAllBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Rentals</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor every rental booking and payment activity across the platform.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="px-5 py-3.5 font-semibold">Owner</th>
                <th className="px-5 py-3.5 font-semibold">Equipment Name</th>
                <th className="px-5 py-3.5 font-semibold">Rental Duration</th>
                <th className="px-5 py-3.5 font-semibold">Amount</th>
                <th className="px-5 py-3.5 font-semibold">Payment Status</th>
                <th className="px-5 py-3.5 font-semibold">Booking Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No rental bookings recorded yet.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-muted/30">
                    <td className="px-5 py-4 text-xs">
                      <p className="font-medium">{b.customerName || "Customer"}</p>
                      <p className="text-muted-foreground">{b.customerEmail}</p>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      <p className="font-medium">{b.ownerName || "Owner"}</p>
                      <p className="text-muted-foreground">{b.ownerEmail}</p>
                    </td>
                    <td className="px-5 py-4 font-medium">{b.equipmentName}</td>
                    <td className="px-5 py-4 text-xs">
                      <p>
                        {b.startDate} &rarr; {b.endDate}
                      </p>
                      <p className="text-muted-foreground">
                        {b.rentalDurationDays} day(s) (Qty: {b.quantity})
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-primary">
                      ${b.totalAmount}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700 dark:text-emerald-400">
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
                        {b.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
