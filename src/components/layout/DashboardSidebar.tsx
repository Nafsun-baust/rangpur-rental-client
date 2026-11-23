"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  CalendarCheck,
  Heart,
  Home,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  User,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";
import ThemeToggle from "@/components/shared/ThemeToggle";

interface SidebarUser {
  name: string;
  email: string;
  image?: string | null;
  role?: string | null;
}

const navByRole = {
  customer: [
    { label: "My Rentals", href: "/dashboard/customer/rentals", icon: CalendarCheck },
    { label: "Favorites", href: "/dashboard/customer/favorites", icon: Heart },
    { label: "Profile", href: "/dashboard/customer/profile", icon: User },
  ],
  owner: [
    { label: "Overview", href: "/dashboard/owner", icon: BarChart3 },
    { label: "Add Equipment", href: "/dashboard/owner/add-equipment", icon: PlusCircle },
    { label: "My Equipment", href: "/dashboard/owner/my-equipment", icon: Package },
    { label: "My Equipment Rental", href: "/dashboard/owner/rentals", icon: CalendarCheck },
    { label: "My Profile", href: "/dashboard/owner/profile", icon: User },
  ],
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: BarChart3 },
    { label: "All Users", href: "/dashboard/admin/users", icon: Users },
    { label: "All Equipment", href: "/dashboard/admin/equipment", icon: Package },
    { label: "All Rentals", href: "/dashboard/admin/rentals", icon: CalendarCheck },
    { label: "My Profile", href: "/dashboard/admin/profile", icon: User },
  ],
};

export default function DashboardSidebar({ user }: { user: SidebarUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const role = (user.role || "customer") as keyof typeof navByRole;
  const links = navByRole[role] || navByRole.customer;

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.refresh();
    router.push("/");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between gap-2 border-b px-5">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="size-4" />
          </span>
          <span>
            Equipment Rental <span className="text-primary">Rangpur</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="border-b px-5 py-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              unoptimized
              className="size-10 rounded-full border object-cover"
            />
          ) : (
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
              {user.name?.[0]?.toUpperCase() || "U"}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs capitalize text-muted-foreground">
              {role} Dashboard
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Home className="size-4" />
          Back to Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b bg-card px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold">
          <Wrench className="size-4 text-primary" />
          <span>Equipment Rental Rangpur</span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle dashboard menu"
          className="rounded-md border p-1.5"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-68 border-r bg-card shadow-xl">{sidebarContent}</div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      <aside className="hidden w-68 shrink-0 border-r bg-card lg:block">
        <div className="sticky top-0 h-screen">{sidebarContent}</div>
      </aside>
    </>
  );
}
