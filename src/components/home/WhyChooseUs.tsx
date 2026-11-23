import { CalendarClock, CreditCard, ShieldCheck, Wallet } from "lucide-react";

const benefits = [
  {
    title: "Affordable Rental Prices",
    description:
      "Rent heavy tools and gear only for the days you need instead of paying full purchase cost.",
    icon: Wallet,
    badge: "bg-blue-100 text-blue-700",
    border: "border-t-blue-500",
  },
  {
    title: "Verified Equipment Owners",
    description:
      "Every item is reviewed and approved by our admin team before it goes live on the site.",
    icon: ShieldCheck,
    badge: "bg-emerald-100 text-emerald-700",
    border: "border-t-emerald-500",
  },
  {
    title: "Flexible Rental Periods",
    description:
      "Book by the day, week, or month depending on how long your job or event runs.",
    icon: CalendarClock,
    badge: "bg-indigo-100 text-indigo-700",
    border: "border-t-indigo-500",
  },
  {
    title: "Secure Online Payments",
    description:
      "Complete bookings safely through Stripe Checkout with clear pricing and instant records.",
    icon: CreditCard,
    badge: "bg-amber-100 text-amber-700",
    border: "border-t-amber-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Why Choose Us
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Simple, Safe &amp; Reliable Local Rentals
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Built to make renting and lending equipment around Rangpur clear, fair, and hassle-free.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`flex flex-col rounded-2xl border border-t-4 ${item.border} bg-card p-6 shadow-xs transition-shadow hover:shadow-md`}
            >
              <span
                className={`flex size-12 items-center justify-center rounded-xl ${item.badge}`}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-card-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
