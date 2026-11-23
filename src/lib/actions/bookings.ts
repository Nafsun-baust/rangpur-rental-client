"use server";
import { authFetch, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface BookingRecord {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  equipmentImage?: string;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  endDate: string;
  rentalDurationDays: number;
  quantity: number;
  contactNumber: string;
  deliveryAddress: string;
  notes?: string;
  totalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  transactionId: string;
  sessionId: string;
  bookingDate: string;
}

export async function checkAvailabilityAction(payload: {
  equipmentId: string;
  startDate: string;
  endDate: string;
  quantity: number;
}) {
  const res = await protectedMutation(
    `${BASE_URL}/api/bookings/check-availability`,
    "POST",
    payload
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function getMyBookings(): Promise<BookingRecord[]> {
  const res = await authFetch(`${BASE_URL}/api/bookings/my`);
  if (!res.ok) return [];
  return res.json();
}

export async function getOwnerBookings(): Promise<BookingRecord[]> {
  const res = await authFetch(`${BASE_URL}/api/bookings/owner`);
  if (!res.ok) return [];
  return res.json();
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  const res = await authFetch(`${BASE_URL}/api/bookings`);
  if (!res.ok) return [];
  return res.json();
}

export async function updateBookingStatusAction(
  bookingId: string,
  bookingStatus: string
) {
  const res = await protectedMutation(
    `${BASE_URL}/api/bookings/${bookingId}/status`,
    "PATCH",
    { bookingStatus }
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
