import { CheckCircle2, DollarSign, Package } from "lucide-react";
import { getOwnerAnalytics } from "@/lib/actions/analytics";
import OwnerAnalyticsCharts from "./_components/OwnerAnalyticsCharts";

export default async function OwnerOverviewPage() {
  const stats = await getOwnerAnalytics();

  const cards = [
    {
      label: "Total Listed Equipment",
      value: stats.totalListedEquipment,
      icon: Package,
    },
    {
      label: "Completed Rentals",
      value: stats.completedRentals,
      icon: CheckCircle2,
    },
    {
      label: "Total Earnings",
      value: `$${stats.totalEarnings}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Owner Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your equipment listings, completed rentals, and monthly earnings.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
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

      <OwnerAnalyticsCharts data={stats.monthlyEarnings} />
    </div>
  );
}
