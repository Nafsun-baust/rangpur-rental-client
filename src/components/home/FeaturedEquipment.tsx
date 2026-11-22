"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EquipmentCard from "@/components/shared/EquipmentCard";
import type { EquipmentItem } from "@/lib/types/equipment";

export default function FeaturedEquipment({ items }: { items: EquipmentItem[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Featured Listings
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Popular Equipment Ready to Rent
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Approved and well-maintained equipment available right now.
          </p>
        </div>
        <Link href="/equipment">
          <Button variant="outline" className="gap-1.5">
            View All Equipment
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <p className="text-base font-medium">No approved equipment listed yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Owners can add equipment from their dashboard and admins can approve listings to display here.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <EquipmentCard key={item._id} item={item} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
