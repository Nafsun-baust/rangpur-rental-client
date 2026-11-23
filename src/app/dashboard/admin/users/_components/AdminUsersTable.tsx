"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  deleteUserAction,
  updateUserRoleAction,
  type UserProfileRecord,
} from "@/lib/actions/users";

export default function AdminUsersTable({
  initialUsers,
  currentAdminEmail,
}: {
  initialUsers: UserProfileRecord[];
  currentAdminEmail: string;
}) {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = async (
    id: string,
    role: "customer" | "owner" | "admin"
  ) => {
    const res = await updateUserRoleAction(id, role);
    if (!res.ok) {
      toast.error(res.data?.message || "Failed to update role");
      return;
    }
    setUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, role } : u))
    );
    toast.success("User role updated");
  };

  const handleDelete = async (id: string) => {
    const res = await deleteUserAction(id);
    if (!res.ok) {
      toast.error(res.data?.message || "Failed to delete user");
      return;
    }
    setUsers((prev) => prev.filter((u) => u._id !== id));
    toast.success("User removed");
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Name</th>
              <th className="px-5 py-3.5 font-semibold">Email</th>
              <th className="px-5 py-3.5 font-semibold">Role</th>
              <th className="px-5 py-3.5 font-semibold">Registration Date</th>
              <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => {
              const isSelf = user.email === currentAdminEmail;
              return (
                <tr key={user._id} className="hover:bg-muted/30">
                  <td className="px-5 py-4 font-medium">{user.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-5 py-4">
                    <select
                      value={user.role || "customer"}
                      disabled={isSelf}
                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value as "customer" | "owner" | "admin"
                        )
                      }
                      className="rounded-md border border-input bg-background px-2.5 py-1 text-xs font-medium capitalize disabled:opacity-60"
                    >
                      <option value="customer">customer</option>
                      <option value="owner">owner</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={isSelf}
                      onClick={() => handleDelete(user._id)}
                      className="gap-1"
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
