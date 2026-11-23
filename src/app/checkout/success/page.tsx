import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import { checkoutVerifyAction } from "@/lib/actions/payments";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) {
    redirect("/");
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"],
    });
  } catch {
    redirect("/");
  }

  if (session.status !== "complete" || session.payment_status !== "paid") {
    redirect("/equipment");
  }

  await checkoutVerifyAction(session_id);

  const paymentIntent =
    typeof session.payment_intent === "object" ? session.payment_intent : null;
  const transactionId = paymentIntent?.id || session.id;
  const amountPaid = ((session.amount_total || 0) / 100).toFixed(2);
  const meta = session.metadata || {};

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-xl items-center justify-center px-4 py-14">
      <div className="w-full rounded-2xl border bg-card p-8 text-center shadow-sm">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
          <CheckCircle2 className="size-9" />
        </span>

        <h1 className="mt-5 text-2xl font-bold tracking-tight">
          Payment Successful
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your rental booking has been confirmed and your payment receipt has been saved.
        </p>

        <div className="mt-6 rounded-xl border bg-muted/40 p-4 text-left text-sm">
          <div className="flex items-center gap-2 border-b pb-3 font-medium">
            <ShieldCheck className="size-4 text-primary" />
            <span>Booking Receipt</span>
          </div>
          <dl className="mt-3 space-y-2.5">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Equipment</dt>
              <dd className="font-medium text-right">{meta.equipmentName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Rental Dates</dt>
              <dd className="font-medium">
                {meta.startDate} to {meta.endDate}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Quantity</dt>
              <dd className="font-medium">{meta.quantity}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Amount Paid</dt>
              <dd className="font-bold text-primary">${amountPaid}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Transaction ID</dt>
              <dd className="max-w-[200px] truncate font-mono text-xs">
                {transactionId}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/customer/rentals" className="flex-1">
            <Button className="w-full gap-1.5">
              View My Rentals
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/equipment" className="flex-1">
            <Button variant="outline" className="w-full">
              Browse More
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
