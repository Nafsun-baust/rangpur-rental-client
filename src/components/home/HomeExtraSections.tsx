"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CUSTOMER_REVIEWS, TRUSTED_OWNERS } from "@/lib/constants";

const steps = [
  {
    step: "01",
    title: "Find Your Equipment",
    description: "Search by tool name, category, price range, or area in Rangpur.",
  },
  {
    step: "02",
    title: "Select Dates & Quantity",
    description: "Choose your start and end dates and check live unit availability.",
  },
  {
    step: "03",
    title: "Pay Safely Online",
    description: "Confirm your rental securely through Stripe Checkout.",
  },
  {
    step: "04",
    title: "Pick Up & Return",
    description: "Collect your gear on time, finish your job, and return it smoothly.",
  },
];

export default function HomeExtraSections() {
  return (
    <>
      <section
        id="how-it-works"
        className="scroll-mt-20 border-y border-indigo-100 bg-indigo-50/50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Rent Equipment in 4 Easy Steps
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((item) => (
              <div
                key={item.step}
                className="relative flex flex-col rounded-2xl border border-indigo-100 bg-card p-6 shadow-xs dark:border-zinc-800"
              >
                <span className="inline-flex w-fit items-center rounded-lg bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  Step {item.step}
                </span>
                <h3 className="mt-4 text-base font-semibold text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Trusted Owners
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Meet Our Local Equipment Owners
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Verified owners who keep their tools serviced and ready for work.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {TRUSTED_OWNERS.map((owner) => {
            const initials = owner.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2);
            return (
              <div
                key={owner.name}
                className="flex flex-col rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50/40 to-card p-6 shadow-xs transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:from-zinc-900/60"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="truncate font-semibold text-card-foreground">
                        {owner.name}
                      </h3>
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5 shrink-0 text-blue-600" />
                      <span className="truncate">{owner.area}</span>
                    </p>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-sm text-muted-foreground">
                  {owner.specialty}
                </p>

                <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs font-medium">
                  <span className="rounded-full bg-blue-100/80 px-2.5 py-0.5 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {owner.listings} active listings
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <Star className="size-3.5 fill-current" />
                    {owner.rating}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-100/80 py-20 dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Customer Reviews
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              What Renters Say About Us
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CUSTOMER_REVIEWS.map((review) => (
              <div
                key={review.name}
                className="flex flex-col rounded-2xl border bg-card p-6 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`size-4 ${
                          idx < review.rating ? "fill-current" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="size-4 text-blue-500/40" />
                </div>

                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="mt-5 flex items-center gap-3 border-t pt-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {review.name[0]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-card-foreground">
                      {review.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#134e4a] px-8 py-12 text-white shadow-xl ring-1 ring-white/10 sm:px-12 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Have idle tools or machines sitting around?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              Register as an equipment owner, list your gear in minutes, and earn extra income from verified local bookings.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/register">
              <Button
                size="lg"
                className="gap-1.5 bg-emerald-500 text-white hover:bg-emerald-400"
              >
                Start Listing
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/equipment">
              <Button
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              >
                Browse Equipment
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
