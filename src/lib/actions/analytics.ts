"use server";

import { authFetch } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface AdminAnalyticsData {
  totalUsers: number;
  totalEquipment: number;
  totalBookings: number;
  pendingApprovals: number;
  completedRentals: number;
  totalRevenue: number;
  monthlyStats: { month: string; bookings: number; revenue: number }[];
}

export interface OwnerAnalyticsData {
  totalListedEquipment: number;
  completedRentals: number;
  totalEarnings: number;
  monthlyEarnings: { month: string; earnings: number; bookings: number }[];
}

export async function getAdminAnalytics(): Promise<AdminAnalyticsData> {
  const fallback: AdminAnalyticsData = {
    totalUsers: 0,
    totalEquipment: 0,
    totalBookings: 0,
    pendingApprovals: 0,
    completedRentals: 0,
    totalRevenue: 0,
    monthlyStats: [],
  };
  const res = await authFetch(`${BASE_URL}/api/analytics/admin`);
  if (!res.ok) return fallback;
  return res.json();
}

export async function getOwnerAnalytics(): Promise<OwnerAnalyticsData> {
  const fallback: OwnerAnalyticsData = {
    totalListedEquipment: 0,
    completedRentals: 0,
    totalEarnings: 0,
    monthlyEarnings: [],
  };
  const res = await authFetch(`${BASE_URL}/api/analytics/owner`);
  if (!res.ok) return fallback;
  return res.json();
}
