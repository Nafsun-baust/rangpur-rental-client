import type { EquipmentItem } from "@/lib/types/equipment";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getFeaturedEquipment(): Promise<EquipmentItem[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/equipment/featured`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getAllEquipment(
  params?: Record<string, string | undefined>
): Promise<EquipmentItem[]> {
  try {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== "all") {
          query.set(key, value);
        }
      });
    }
    const qs = query.toString();
    const res = await fetch(`${BASE_URL}/api/equipment${qs ? `?${qs}` : ""}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getEquipmentById(
  id: string
): Promise<EquipmentItem | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/equipment/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}