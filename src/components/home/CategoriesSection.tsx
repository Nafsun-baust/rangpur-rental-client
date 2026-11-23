"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Camera,
  Cpu,
  HardHat,
  Music,
  Tractor,
  Truck,
} from "lucide-react";

const categories = [
  {
    name: "Construction Equipment",
    description: "Drills, concrete mixers, cutters, and heavy site tools",
    tag: "Site & Renovation",
    icon: HardHat,
    iconStyle: "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    name: "Photography Equipment",
    description: "Mirrorless cameras, lenses, tripods, and studio lights",
    tag: "Photo & Video",
    icon: Camera,
    iconStyle: "bg-violet-100 text-violet-700 group-hover:bg-violet-600 group-hover:text-white",
  },
  {
    name: "Vehicles & Transportation",
    description: "Mini pickups, cargo vans, and local utility transport",
    tag: "City Delivery",
    icon: Truck,
    iconStyle: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    name: "Agriculture Equipment",
    description: "Power tillers, irrigation pumps, and seasonal farm gear",
    tag: "Farm Ready",
    icon: Tractor,
    iconStyle: "bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    name: "Electronics",
    description: "Portable generators, HD projectors, and backup power",
    tag: "Power & Office",
    icon: Cpu,
    iconStyle: "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-600 group-hover:text-white",
  },
  {
    name: "Event Equipment",
    description: "Sound systems, wireless mics, and stage lighting kits",
    tag: "Weddings & Shows",
    icon: Music,
    iconStyle: "bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white",
  },
];

export default function CategoriesSection() {
  return (
    <section className="border-y border-blue-100 bg-blue-50/60 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Categories
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Browse by Equipment Category
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Choose a category to see available items with daily, weekly, and monthly rates.
            </p>
          </div>
          <Link
            href="/equipment"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Explore all listings &rarr;
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/equipment?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col justify-between rounded-2xl border border-blue-100/80 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-zinc-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex size-12 items-center justify-center rounded-xl transition-colors ${cat.iconStyle}`}
                  >
                    <Icon className="size-6" />
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
                    {cat.tag}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-card-foreground group-hover:text-blue-600">
                      {cat.name}
                    </h3>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600" />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
