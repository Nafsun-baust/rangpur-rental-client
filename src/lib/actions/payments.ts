"use server";

import { protectedMutation } from "@/lib/core/server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function checkoutVerifyAction(sessionId: string) {
  const res = await protectedMutation(
    `${BASE_URL}/api/payments/checkout-verify`,
    "POST",
    { sessionId }
  );
  return res.json().catch(() => ({ success: false }));
}
