"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  updateBookingStatusAction,
  type BookingRecord,
} from "@/lib/actions/bookings";

export default function OwnerRentalsTable({
  initialBookings,
}: {
  initialBookings: BookingRecord[];
}) {
  const [bookings, setBookings] = useState(initialBookings);

  const handleStatusChange = async (id: string, status: string) => {
    const res = await updateBookingStatusAction(id, status);
    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b))
    );
    toast.success("Booking status updated");
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Customer</th>
              <th className="px-5 py-3.5 font-semibold">Equipment</th>
              <th className="px-5 py-3.5 font-semibold">Duration</th>
              <th className="px-5 py-3.5 font-semibold">Qty</th>
              <th className="px-5 py-3.5 font-semibold">Amount</th>
              <th className="px-5 py-3.5 font-semibold">Payment</th>
              <th className="px-5 py-3.5 font-semibold">Booking Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                  No bookings for your equipment yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b._id} className="hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <p className="font-medium">{b.customerName || "Customer"}</p>
                    <p className="text-xs text-muted-foreground">{b.customerEmail}</p>
                    {b.contactNumber && (
                      <p className="text-xs text-muted-foreground">{b.contactNumber}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-medium">{b.equipmentName}</td>
                  <td className="px-5 py-4 text-xs">
                    <p>
                      {b.startDate} &rarr; {b.endDate}
                    </p>
                    <p className="text-muted-foreground">
                      {b.rentalDurationDays} day(s)
                    </p>
                  </td>
                  <td className="px-5 py-4">{b.quantity}</td>
                  <td className="px-5 py-4 font-semibold text-primary">
                    ${b.totalAmount}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium capitalize text-emerald-700 dark:text-emerald-400">
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={b.bookingStatus}
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                      className="rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium capitalize"
                    >
                      <option value="confirmed">confirmed</option>
                      <option value="active">active</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
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
