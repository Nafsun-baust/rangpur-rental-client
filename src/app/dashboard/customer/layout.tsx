import { requireRole } from "@/lib/core/server";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("customer");
  return children;
}
