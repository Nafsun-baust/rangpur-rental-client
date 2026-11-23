"use server";
import { authFetch, protectedMutation } from "@/lib/core/server";
import type { EquipmentItem } from "@/lib/types/equipment";

const BASE_URL =process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface FavoriteRecord {
  _id: string;
  userId: string;
  userEmail: string;
  equipmentId: string;
  createdAt: string;
  equipment: EquipmentItem;
}

export async function getMyFavorites(): Promise<FavoriteRecord[]> {
  const res = await authFetch(`${BASE_URL}/api/favorites`);
  if (!res.ok) return [];
  return res.json();
}

export async function addFavoriteAction(equipmentId: string) {
  const res = await protectedMutation(`${BASE_URL}/api/favorites`, "POST", {
    equipmentId,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function removeFavoriteAction(equipmentId: string) {
  const res = await protectedMutation(
    `${BASE_URL}/api/favorites/${equipmentId}`,
    "DELETE"
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
