"use server";

import { authFetch, protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface UserProfileRecord {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "customer" | "owner" | "admin";
  phone?: string;
  address?: string;
  createdAt?: string;
}

export async function getMyProfile(): Promise<UserProfileRecord | null> {
  const res = await authFetch(`${BASE_URL}/api/users/me`);
  if (!res.ok) return null;
  return res.json();
}

export async function updateMyProfileAction(payload: {
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
}) {
  const res = await protectedMutation(`${BASE_URL}/api/users/me`, "PATCH", payload);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function getAllUsers(): Promise<UserProfileRecord[]> {
  const res = await authFetch(`${BASE_URL}/api/users`);
  if (!res.ok) return [];
  return res.json();
}

export async function updateUserRoleAction(
  id: string,
  role: "customer" | "owner" | "admin"
) {
  const res = await protectedMutation(`${BASE_URL}/api/users/${id}/role`, "PATCH", {
    role,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

export async function deleteUserAction(id: string) {
  const res = await protectedMutation(`${BASE_URL}/api/users/${id}`, "DELETE");
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}
