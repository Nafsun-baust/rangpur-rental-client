import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

export async function POST(req: Request) {
  const userSession = await getSession();
  if (!userSession?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const body = await req.json();
    const totalAmount = Number(body.totalAmount);
    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid rental amount" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: userSession.user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(totalAmount * 100),
            product_data: {
              name: `${body.equipmentName} (Qty: ${body.quantity}, ${body.days} day(s))`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        equipmentId: String(body.equipmentId || ""),
        equipmentName: String(body.equipmentName || ""),
        ownerId: String(body.ownerId || ""),
        customerId: String(userSession.user.id || ""),
        customerName: String(userSession.user.name || ""),
        customerEmail: String(userSession.user.email || ""),
        startDate: String(body.startDate || ""),
        endDate: String(body.endDate || ""),
        days: String(body.days || 1),
        quantity: String(body.quantity || 1),
        contactNumber: String(body.contactNumber || ""),
        deliveryAddress: String(body.deliveryAddress || ""),
        notes: String(body.notes || ""),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/equipment/${body.equipmentId}?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
