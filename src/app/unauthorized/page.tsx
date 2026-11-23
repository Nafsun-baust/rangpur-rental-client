import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <ShieldAlert className="size-7" />
      </span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Access Denied</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You do not have permission to view this dashboard section.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/dashboard">
          <Button>Go to My Dashboard</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
