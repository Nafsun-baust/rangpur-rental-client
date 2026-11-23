"use client";
import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EQUIPMENT_CATEGORIES, RENTAL_TYPES } from "@/lib/constants";
import {
  deleteEquipmentAction,
  updateEquipmentAction,
  updateEquipmentStatusAction,
} from "@/lib/actions/equipment";
import type { EquipmentItem } from "@/lib/types/equipment";

export default function AdminEquipmentTable({
  initialItems,
}: {
  initialItems: EquipmentItem[];
}) {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState<EquipmentItem | null>(null);
  const [saving, setSaving] = useState(false);

  const handleStatus = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    const res = await updateEquipmentStatusAction(id, status);
    if (!res.ok) {
      toast.error("Failed to update status");
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status } : item))
    );
    toast.success(`Equipment ${status}`);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteEquipmentAction(id);
    if (!res.ok) {
      toast.error("Failed to delete equipment");
      return;
    }
    setItems((prev) => prev.filter((item) => item._id !== id));
    toast.success("Equipment deleted");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const res = await updateEquipmentAction(editing._id, {
      name: editing.name,
      category: editing.category,
      location: editing.location,
      rentalPrice: Number(editing.rentalPrice),
      rentalType: editing.rentalType,
      availableQuantity: Number(editing.availableQuantity),
    });
    setSaving(false);
    if (!res.ok) {
      toast.error("Failed to update equipment");
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item._id === editing._id ? editing : item))
    );
    setEditing(null);
    toast.success("Equipment updated");
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border bg-card shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Equipment</th>
                <th className="px-5 py-3.5 font-semibold">Owner</th>
                <th className="px-5 py-3.5 font-semibold">Price</th>
                <th className="px-5 py-3.5 font-semibold">Qty</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted-foreground">
                    No equipment listings found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item._id} className="hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </td>
                    <td className="px-5 py-4 text-xs">
                      <p className="font-medium">{item.ownerName || "Owner"}</p>
                      <p className="text-muted-foreground">{item.ownerEmail}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-primary">
                      ${item.rentalPrice} / {item.rentalType}
                    </td>
                    <td className="px-5 py-4">{item.availableQuantity}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          item.status === "approved"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : item.status === "rejected"
                            ? "bg-destructive/15 text-destructive"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap justify-end gap-1.5">
                        {item.status !== "approved" && (
                          <Button
                            size="sm"
                            onClick={() => handleStatus(item._id, "approved")}
                            className="gap-1 bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Check className="size-3.5" />
                            Approve
                          </Button>
                        )}
                        {item.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatus(item._id, "rejected")}
                            className="gap-1"
                          >
                            <X className="size-3.5" />
                            Reject
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setEditing(item)}
                          className="gap-1"
                        >
                          <Pencil className="size-3.5" />
                          Update
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item._id)}
                          className="gap-1"
                        >
                          <Trash2 className="size-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-bold">Update Equipment</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-md p-1 hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Equipment Name</label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {EQUIPMENT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Rental Type</label>
                  <select
                    value={editing.rentalType}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        rentalType: e.target.value as EquipmentItem["rentalType"],
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {RENTAL_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Rental Price ($)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editing.rentalPrice}
                    onChange={(e) =>
                      setEditing({ ...editing, rentalPrice: Number(e.target.value) })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Available Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editing.availableQuantity}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        availableQuantity: Number(e.target.value),
                      })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
