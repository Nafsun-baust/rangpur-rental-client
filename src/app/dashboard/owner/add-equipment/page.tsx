"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EQUIPMENT_CATEGORIES, RENTAL_TYPES } from "@/lib/constants";
import { uploadImageToImgbb } from "@/lib/imgbb";
import { createEquipmentAction } from "@/lib/actions/equipment";
import { useSession } from "@/lib/auth-client";

export default function AddEquipmentPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(EQUIPMENT_CATEGORIES[0]);
  const [location, setLocation] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [rentalType, setRentalType] = useState<string>(RENTAL_TYPES[0]);
  const [availableQuantity, setAvailableQuantity] = useState("1");
  const [condition, setCondition] = useState("Good");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [terms, setTerms] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToImgbb(file);
      setImage(url);
      toast.success("Equipment image uploaded");
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an equipment image or provide an image URL");
      return;
    }

    setSubmitting(true);
    const res = await createEquipmentAction({
      name,
      description,
      category,
      location,
      rentalPrice: Number(rentalPrice),
      rentalType,
      availableQuantity: Number(availableQuantity),
      condition,
      brand,
      model,
      image,
      terms,
      ownerName: session?.user?.name || "",
      ownerEmail: session?.user?.email || "",
      ownerImage: session?.user?.image || "",
    });
    setSubmitting(false);

    if (!res.ok) {
      toast.error(res.data?.message || "Failed to add equipment");
      return;
    }

    toast.success("Equipment added and waiting for admin approval");
    router.push("/dashboard/owner/my-equipment");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Equipment</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          List a new tool or machine for rent. New listings start as Pending until approved by an admin.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-5 rounded-2xl border bg-card p-6 shadow-2xs sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Equipment Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Bosch Rotary Hammer Drill"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {EQUIPMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe key specs, included accessories, and best uses"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Rental Price ($)</label>
            <input
              type="number"
              required
              min="1"
              step="0.01"
              value={rentalPrice}
              onChange={(e) => setRentalPrice(e.target.value)}
              placeholder="25"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Rental Type</label>
            <select
              value={rentalType}
              onChange={(e) => setRentalType(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {RENTAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Available Quantity</label>
            <input
              type="number"
              required
              min="1"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Dhap, Rangpur"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Equipment Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Like New">Like New</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Brand</label>
            <input
              type="text"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Bosch, Sony, Honda"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Model</label>
            <input
              type="text"
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="e.g. GBH 2-26"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Equipment Image (Upload with ImgBB or URL)
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://i.ibb.co/..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-input bg-secondary px-3 text-xs font-medium hover:bg-secondary/80">
              <Upload className="size-3.5" />
              {uploading ? "Uploading..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          {image && (
            <Image
              src={image}
              alt="Equipment preview"
              width={176}
              height={112}
              unoptimized
              className="mt-2 h-28 w-44 rounded-lg border object-cover"
            />
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Rental Terms and Conditions</label>
          <textarea
            rows={2}
            required
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            placeholder="Pickup requirements, return condition, security rules"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid gap-4 rounded-xl border bg-muted/40 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Owner Information</p>
            <p className="mt-0.5 font-medium">
              {session?.user?.name} ({session?.user?.email})
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Initial Listing Status</p>
            <p className="mt-0.5 font-medium text-amber-600">Pending Approval</p>
          </div>
        </div>

        <Button type="submit" disabled={submitting || uploading}>
          {submitting ? "Adding Equipment..." : "Add Equipment"}
        </Button>
      </form>
    </div>
  );
}
