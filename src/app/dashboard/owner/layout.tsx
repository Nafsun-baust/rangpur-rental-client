import { requireRole } from "@/lib/core/server";

export default async function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("owner");
  return children;
}
