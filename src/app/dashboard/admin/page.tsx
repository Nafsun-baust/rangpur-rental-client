import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { getAdminAnalytics } from "@/lib/actions/analytics";
import AdminAnalyticsCharts from "./_components/AdminAnalyticsCharts";

export default async function AdminOverviewPage() {
  const stats = await getAdminAnalytics();

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users },
    { label: "Total Equipment", value: stats.totalEquipment, icon: Package },
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck },
    { label: "Pending Approvals", value: stats.pendingApprovals, icon: Clock },
    { label: "Completed Rentals", value: stats.completedRentals, icon: CheckCircle2 },
    { label: "Total Revenue", value: `$${stats.totalRevenue}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Platform-wide metrics across users, equipment listings, bookings, and payments.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="flex items-center justify-between rounded-2xl border bg-card p-6 shadow-2xs"
            >
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {card.label}
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight">
                  {card.value}
                </p>
              </div>
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-6" />
              </span>
            </div>
          );
        })}
      </div>

      <AdminAnalyticsCharts data={stats.monthlyStats} />
    </div>
  );
}
