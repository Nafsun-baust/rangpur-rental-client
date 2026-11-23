import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Layers,
  MapPin,
  Package,
  Tag,
  User,
} from "lucide-react";
import { getEquipmentById } from "@/lib/api/equipment";
import { getMyFavorites } from "@/lib/actions/favorites";
import { requireAuth } from "@/lib/core/server";
import FavoriteButton from "./_components/FavoriteButton";
import BookingModal from "./_components/BookingModal";

export default async function EquipmentDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { id } = await params;
  const { canceled } = await searchParams;
  const session = await requireAuth(`/equipment/${id}`);

  const item = await getEquipmentById(id);
  if (!item) {
    notFound();
  }

  let isFavorited = false;
  if (session.user.role === "customer") {
    const favorites = await getMyFavorites();
    isFavorited = favorites.some((fav) => fav.equipmentId === item._id);
  }

  const isAvailable = Number(item.availableQuantity) > 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/equipment"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to All Equipment
      </Link>

      {canceled === "1" && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
          Payment was cancelled. You can adjust your booking details and try again anytime.
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-xs">
            <Image
              src={item.image}
              alt={item.name}
              width={900}
              height={560}
              unoptimized
              className="aspect-16/10 w-full object-cover"
            />
          </div>

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>

              <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Brand</p>
                  <p className="mt-0.5 text-sm font-medium">{item.brand || "Standard"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Model</p>
                  <p className="mt-0.5 text-sm font-medium">{item.model || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Condition</p>
                  <p className="mt-0.5 text-sm font-medium">{item.condition || "Good"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2">
                <FileText className="size-5 text-primary" />
                <h2 className="text-lg font-semibold">Rental Terms and Conditions</h2>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {item.terms || "Please return the equipment clean and in good working order on the scheduled return date."}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
                <Tag className="size-3.5" />
                {item.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isAvailable
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                    : "bg-destructive/15 text-destructive"
                }`}
              >
                {isAvailable
                  ? `${item.availableQuantity} units available`
                  : "Out of stock"}
              </span>
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              {item.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold text-primary">
                ${item.rentalPrice}
              </span>
              <span className="text-sm text-muted-foreground">
                / {item.rentalType}
              </span>
            </div>

            <div className="mt-5 space-y-2.5 border-y py-4 text-sm">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Layers className="size-4 shrink-0 text-primary" />
                <span>Rental Type: {item.rentalType}</span>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Package className="size-4 shrink-0 text-primary" />
                <span>Available Quantity: {item.availableQuantity}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <BookingModal
                item={item}
                userRole={session.user.role || "customer"}
              />
              {session.user.role === "customer" && (
                <FavoriteButton
                  equipmentId={item._id}
                  initialFavorited={isFavorited}
                />
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <h2 className="text-base font-semibold">Owner Information</h2>
            <div className="mt-4 flex items-center gap-3.5">
              {item.ownerImage ? (
                <Image
                  src={item.ownerImage}
                  alt={item.ownerName}
                  width={48}
                  height={48}
                  unoptimized
                  className="size-12 rounded-full border object-cover"
                />
              ) : (
                <span className="flex size-12 items-center justify-center rounded-full bg-accent text-primary">
                  <User className="size-5" />
                </span>
              )}
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-card-foreground">
                    {item.ownerName || "Verified Owner"}
                  </p>
                  <CheckCircle2 className="size-4 text-emerald-600" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {item.ownerEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
