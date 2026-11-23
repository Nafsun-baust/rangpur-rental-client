import { redirect } from "next/navigation";

export default function CustomerDashboardIndex() {
  redirect("/dashboard/customer/rentals");
}
