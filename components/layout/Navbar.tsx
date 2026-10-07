"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Zap } from "lucide-react";
import { useState } from "react";

type NavbarProps = {
  variant?: "marketing" | "studio";
  action?: { label: string; busyLabel?: string; busy?: boolean; onClick: () => void };
};

export function Navbar({ variant = "marketing", action }: NavbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const marketingLinks = [
    ["Templates", "#templates"],
    ["How it works", "#flow"],
    ["Why nativeframe", "#why"],
    ["Pricing", "#pricing"],
  ];

  return (
    <header className={`z-50 px-4 pt-4 sm:px-6 ${variant === "studio" ? "sticky top-0" : "fixed inset-x-0"}`}>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-5 rounded-[22px] border border-white/80 bg-white/45 px-3 shadow-[0_14px_45px_rgba(17,17,15,.10),inset_0_1px_0_rgba(255,255,255,.85)] backdrop-blur-2xl backdrop-saturate-150 sm:px-4">
        <Link href="/" className="shrink-0" aria-label="nativeframe home">
          <Image src="/images/logo.png" alt="nativeframe" width={190} height={164} className="h-40 w-auto object-contain" priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex">
          {variant === "marketing" ? marketingLinks.map(([label, href]) => (
            <a key={label} href={href} className="rounded-xl px-3 py-2 text-sm text-black/65 transition hover:bg-black/[.04] hover:text-black">
              {label}
            </a>
          )) : (
            <>
              <Link href="/studio" className="rounded-xl bg-black/[.045] px-3 py-2 text-sm font-medium text-black">Dashboard</Link>
              <Link href="/studio" className="rounded-xl px-3 py-2 text-sm text-black/65 transition hover:bg-black/[.04] hover:text-black">Orders <span className="ml-1 inline-grid size-5 place-items-center rounded-full bg-black text-[10px] text-white">2</span></Link>
              <Link href="/studio" className="rounded-xl px-3 py-2 text-sm text-black/65 transition hover:bg-black/[.04] hover:text-black">Products</Link>
              <Link href="/studio" className="rounded-xl px-3 py-2 text-sm text-black/65 transition hover:bg-black/[.04] hover:text-black">Customers</Link>
              <div className="relative">
                <button type="button" onClick={() => setSettingsOpen((open) => !open)} className={`flex items-center gap-1 rounded-xl px-3 py-2 text-sm transition ${settingsOpen ? "bg-black/[.06] text-black" : "text-black/65 hover:bg-black/[.04] hover:text-black"}`}>
                  Settings <ChevronDown size={14} className={settingsOpen ? "rotate-180 transition" : "transition"} />
                </button>
                {settingsOpen ? <div className="absolute left-0 top-12 w-36 overflow-hidden rounded-xl border border-black/10 bg-white py-1 shadow-xl">
                  {["General", "Store", "Privacy", "API"].map((item) => <button key={item} type="button" className="block w-full px-3 py-2 text-left text-sm hover:bg-black/[.04]">{item}</button>)}
                </div> : null}
              </div>
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {variant === "studio" ? <>
            {searchOpen ? <input autoFocus placeholder="Search" className="hidden h-9 w-28 rounded-lg bg-black/[.04] px-3 text-sm outline-none sm:block" /> : null}
            <button type="button" onClick={() => setSearchOpen((open) => !open)} className="grid size-10 place-items-center rounded-xl transition hover:bg-black/[.05]" aria-label="Search"><Search size={18} /></button>
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#f7b1d8] via-[#8f7aff] to-[#35d5c7] text-xs font-bold text-white">NF</div>
            {action ? <button type="button" onClick={action.onClick} disabled={action.busy} className="hidden h-10 items-center gap-2 rounded-xl bg-[#11110f] px-4 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-wait disabled:opacity-60 sm:inline-flex">{action.busy ? action.busyLabel ?? action.label : <><Zap size={15} /> {action.label}</>}</button> : <Link href="/studio" className="hidden h-10 items-center gap-2 rounded-xl bg-[#11110f] px-4 text-sm font-semibold text-white transition hover:bg-black/80 sm:inline-flex"><Zap size={15} /> Upgrade</Link>}
          </> : <Link href="/studio" className="rounded-xl bg-[#11110f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black/80">Open studio <span className="ml-1">↗</span></Link>}
        </div>
      </div>
    </header>
  );
}
