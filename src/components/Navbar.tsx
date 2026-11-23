"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, LogOut, Menu, Wrench, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/", hash: "" },
  { label: "All Equipment", href: "/equipment", hash: "" },
  { label: "How It Works", href: "/#how-it-works", hash: "#how-it-works" },
  { label: "About", href: "/#why-choose-us", hash: "#why-choose-us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const syncHash = () => setActiveHash(window.location.hash || "");
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = activeHash || window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    let attempts = 0;
    const interval = setInterval(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        clearInterval(interval);
      } else if (++attempts > 20) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [pathname, activeHash]);

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  const isLinkActive = (item: (typeof navLinks)[number]) => {
    if (item.hash) {
      return pathname === "/" && activeHash === item.hash;
    }
    if (item.href === "/") {
      return pathname === "/" && activeHash === "";
    }
    return pathname.startsWith(item.href);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navLinks)[number]
  ) => {
    setMobileOpen(false);
    if (item.hash && pathname === "/") {
      e.preventDefault();
      setActiveHash(item.hash);
      window.history.replaceState(null, "", item.hash);
      const target = document.getElementById(item.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }
    if (item.href === "/" && pathname === "/") {
      e.preventDefault();
      setActiveHash("");
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveHash(item.hash);
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    setMobileOpen(false);
    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setActiveHash("")} className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <Wrench className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Equipment Rental <span className="text-primary">Rangpur</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex">
          {navLinks.map((item) => {
            const isActive = isLinkActive(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={cn(
                  "rounded-lg px-4 py-2 text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <ThemeToggle />
          {isPending ? (
            <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
          ) : session?.user ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2 px-4 text-sm font-medium">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="gap-2 px-4 text-sm font-medium">
                <LogOut className="size-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="px-4 text-sm font-medium">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="px-5 text-sm font-medium">Register</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className="inline-flex size-9 items-center justify-center rounded-md border text-foreground"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = isLinkActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2 border-t pt-4">
            {session?.user ? (
              <>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full">Dashboard</Button>
                </Link>
                <Button variant="destructive" className="flex-1" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
