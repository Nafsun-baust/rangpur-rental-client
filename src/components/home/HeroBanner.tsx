"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            router.push(`/equipment?search=${encodeURIComponent(trimmed)}`);
        } else {
            router.push("/equipment");
        }
    };

    return (
        <section className="relative overflow-hidden border-b bg-gradient-to-br from-blue-50/80 via-background to-slate-100/70 dark:from-zinc-900 dark:via-background dark:to-zinc-950">
            <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-sky-500/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6 lg:col-span-7"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/90 px-4 py-1.5 text-xs font-medium text-foreground shadow-xs">
                        <MapPin className="size-3.5 text-primary" />
                        <span>Trusted Equipment Marketplace in Rangpur</span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                        Rent quality tools &amp; machines without buying them
                    </h1>

                    <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        Find construction tools, cameras, generators, farm gear, and event equipment from verified local owners. Book by the day, week, or month.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="flex max-w-xl flex-col gap-2.5 rounded-2xl border bg-card p-2 shadow-md sm:flex-row sm:items-center"
                    >
                        <div className="flex flex-1 items-center gap-2.5 px-3">
                            <Search className="size-4 shrink-0 text-muted-foreground" />
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search drills, cameras, generators, or area..."
                                className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            />
                        </div>
                        <Button type="submit" size="lg" className="gap-1.5 rounded-xl px-6">
                            Search Gear
                            <ArrowRight className="size-4" />
                        </Button>
                    </form>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 pt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />
                            Admin-approved listings
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />
                            Clear daily &amp; weekly rates
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="size-4 text-primary" />
                            Safe Stripe checkout
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="relative lg:col-span-5"
                >
                    <div className="relative overflow-hidden rounded-2xl border bg-card shadow-xl">
                        <Image
                            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                            alt="Equipment ready for rent in Rangpur"
                            width={1200}
                            height={900}
                            unoptimized
                            
                        />
                        <div className="grid grid-cols-3 divide-x border-t bg-card px-4 py-4 text-center">
                            <div>
                                <p className="text-lg font-bold text-foreground">6+</p>
                                <p className="text-xs text-muted-foreground">Categories</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-foreground">100%</p>
                                <p className="text-xs text-muted-foreground">Verified Owners</p>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-primary">24/7</p>
                                <p className="text-xs text-muted-foreground">Online Booking</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}