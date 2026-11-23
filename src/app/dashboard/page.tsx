import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/core/server";

export default async function DashboardIndexPage() {
  const session = await requireAuth("/dashboard");
  const role = session.user.role || "customer";

  if (role === "admin") {
    redirect("/dashboard/admin");
  }
  if (role === "owner") {
    redirect("/dashboard/owner");
  }
  redirect("/dashboard/customer/rentals");
}
