"use server";
import { authFetch, protectedMutation } from "@/lib/core/server";
import type { EquipmentItem } from "@/lib/types/equipment";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getMyEquipment(): Promise<EquipmentItem[]> {
  const res = await authFetch(`${BASE_URL}/api/equipment/my`);
  if (!res.ok) return [];
  return res.json();
}

export async function getAllAdminEquipment(): Promise<EquipmentItem[]> {
  const res = await authFetch(`${BASE_URL}/api/equipment/all`);
  if (!res.ok) return [];
  return res.json();
}

export async function createEquipmentAction(payload: Record<string, unknown>) {
  const res = await protectedMutation(`${BASE_URL}/api/equipment`, "POST", payload);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function updateEquipmentAction(
  id: string,
  payload: Record<string, unknown>
) {
  const res = await protectedMutation(
    `${BASE_URL}/api/equipment/${id}`,
    "PATCH",
    payload
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function updateEquipmentStatusAction(
  id: string,
  status: "pending" | "approved" | "rejected"
) {
  const res = await protectedMutation(
    `${BASE_URL}/api/equipment/${id}/status`,
    "PATCH",
    { status }
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function deleteEquipmentAction(id: string) {
  const res = await protectedMutation(`${BASE_URL}/api/equipment/${id}`, "DELETE");
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
