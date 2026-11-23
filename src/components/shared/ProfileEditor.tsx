"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { uploadImageToImgbb } from "@/lib/imgbb";
import {
  updateMyProfileAction,
  type UserProfileRecord,
} from "@/lib/actions/users";

export default function ProfileEditor({
  initialProfile,
}: {
  initialProfile: UserProfileRecord;
}) {
  const [name, setName] = useState(initialProfile.name || "");
  const [image, setImage] = useState(initialProfile.image || "");
  const [phone, setPhone] = useState(initialProfile.phone || "");
  const [address, setAddress] = useState(initialProfile.address || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadImageToImgbb(file);
      setImage(url);
      toast.success("Profile photo uploaded");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await updateMyProfileAction({ name, image, phone, address });
    setSaving(false);
    if (!res.ok) {
      toast.error(res.data?.message || "Failed to update profile");
      return;
    }
    toast.success("Profile updated successfully");
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-6 shadow-2xs sm:p-8">
      <div className="flex items-center gap-4 border-b pb-6">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            unoptimized
            className="size-16 rounded-full border object-cover"
          />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-full bg-accent text-xl font-bold text-primary">
            {name?.[0]?.toUpperCase() || "U"}
          </span>
        )}
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{initialProfile.email}</p>
          <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
            {initialProfile.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            disabled
            value={initialProfile.email}
            className="flex h-10 w-full rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Profile Image</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <label className="inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-input bg-secondary px-3 text-xs font-medium hover:bg-secondary/80">
              <Upload className="size-3.5" />
              {uploading ? "..." : "Upload"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+880 17..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Address</label>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your address in Rangpur"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Saving..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
}
