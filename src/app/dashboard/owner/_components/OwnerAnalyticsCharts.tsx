"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function OwnerAnalyticsCharts({
  data,
}: {
  data: { month: string; earnings: number; bookings: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">
        Monthly earnings chart will appear here once customers complete bookings for your equipment.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-2xs">
      <h2 className="text-base font-semibold">Monthly Earnings ($)</h2>
      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Bar dataKey="earnings" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
