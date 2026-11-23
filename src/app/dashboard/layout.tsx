import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { requireAuth } from "@/lib/core/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAuth("/dashboard");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/30 lg:flex-row">
      <DashboardSidebar user={session.user} />
      <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
    </div>
  );
}
