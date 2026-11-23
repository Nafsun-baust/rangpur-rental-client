import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <Link href="/equipment">
          <Button variant="outline">Browse Equipment</Button>
        </Link>
      </div>
    </div>
  );
}
