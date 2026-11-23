"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Wrench className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              Equipment Rental <span className="text-blue-400">Rangpur</span>
            </span>
          </Link>
          <p className="max-w-md text-sm leading-relaxed text-slate-400">
            A local rental marketplace connecting equipment owners and renters across Rangpur. Rent reliable tools, cameras, generators, and machines whenever you need them.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-blue-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-blue-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V21h3.3z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-blue-500 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
                <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link href="/" className="transition-colors hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link href="/equipment" className="transition-colors hover:text-blue-400">All Equipment</Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="transition-colors hover:text-blue-400">How It Works</Link>
            </li>
            <li>
              <Link href="/dashboard" className="transition-colors hover:text-blue-400">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
            Contact
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-blue-400" />
              <span>Jahaj Company More, Rangpur 5400, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-blue-400" />
              <span>+880 1712-000900</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-blue-400" />
              <span>support@rentalrangpur.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Equipment Rental Rangpur. All rights reserved.
      </div>
    </footer>
  );
}
