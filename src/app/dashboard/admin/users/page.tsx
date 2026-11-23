import { getAllUsers } from "@/lib/actions/users";
import { requireRole } from "@/lib/core/server";
import AdminUsersTable from "./_components/AdminUsersTable";

export default async function AdminUsersPage() {
  const session = await requireRole("admin");
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Users</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage registered accounts and assign Customer, Owner, or Admin roles.
        </p>
      </div>

      <AdminUsersTable
        initialUsers={users}
        currentAdminEmail={session.user.email}
      />
    </div>
  );
}
