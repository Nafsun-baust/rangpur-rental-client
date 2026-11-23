"use client";
import { useMemo, useState } from "react";
import { Calendar, CreditCard, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { checkAvailabilityAction } from "@/lib/actions/bookings";
import type { EquipmentItem } from "@/lib/types/equipment";

export default function BookingModal({
  item,
  userRole,
}: {
  item: EquipmentItem;
  userRole: string;
}) {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const isAvailable = Number(item.availableQuantity) > 0;
  const isCustomer = userRole === "customer";

  const estimate = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      return null;
    }
    const days = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    );
    const units =
      item.rentalType === "Weekly"
        ? Math.max(1, Math.ceil(days / 7))
        : item.rentalType === "Monthly"
        ? Math.max(1, Math.ceil(days / 30))
        : days;
    const totalAmount = Number((units * Number(item.rentalPrice) * quantity).toFixed(2));
    return { days, units, totalAmount };
  }, [startDate, endDate, quantity, item.rentalPrice, item.rentalType]);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!estimate) {
      toast.error("Please select a valid start and end date");
      return;
    }

    setLoading(true);
    try {
      const check = await checkAvailabilityAction({
        equipmentId: item._id,
        startDate,
        endDate,
        quantity,
      });

      if (!check.ok || !check.data?.available) {
        toast.error(check.data?.message || "Equipment is not available for these dates");
        setLoading(false);
        return;
      }

      const checkoutRes = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipmentId: item._id,
          equipmentName: item.name,
          ownerId: item.ownerId,
          startDate,
          endDate,
          days: check.data.days,
          quantity,
          contactNumber,
          deliveryAddress,
          notes,
          totalAmount: check.data.totalAmount,
        }),
      });

      const checkoutData = await checkoutRes.json();
      if (!checkoutRes.ok || !checkoutData.url) {
        toast.error(checkoutData.error || "Could not start Stripe checkout");
        setLoading(false);
        return;
      }

      window.location.assign(checkoutData.url);
    } catch {
      toast.error("Something went wrong while starting checkout");
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        size="lg"
        disabled={!isAvailable || !isCustomer}
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Calendar className="size-4" />
        {!isAvailable
          ? "Currently Unavailable"
          : !isCustomer
          ? "Customers Only"
          : "Book Now"}
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-card p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b pb-4">
              <div>
                <h2 className="text-lg font-bold">Book Equipment</h2>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleConfirm} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Rental Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Rental End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">
                    Required Quantity (Max {item.availableQuantity})
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={item.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+880 17..."
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House, Road, Area, Rangpur"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any pickup instructions or special requests"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="rounded-xl border bg-muted/40 p-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">
                    ${item.rentalPrice} / {item.rentalType}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-muted-foreground">Duration &amp; Qty</span>
                  <span className="font-medium">
                    {estimate ? `${estimate.days} day(s) × ${quantity}` : "Select dates"}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t pt-2.5 text-base font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">
                    {estimate ? `$${estimate.totalAmount}` : "$0.00"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading || !estimate} className="gap-2">
                  <CreditCard className="size-4" />
                  {loading ? "Redirecting..." : "Proceed to Payment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
