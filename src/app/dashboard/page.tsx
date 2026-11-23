import { requireAuth } from "@/lib/core/server";

export default async function DashboardIndexPage() {
  const session = await requireAuth("/dashboard");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome, {session.user.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Use the sidebar menu to manage your {session.user.role || "customer"} dashboard.
        </p>
      </div>
    </div>
  );
}
