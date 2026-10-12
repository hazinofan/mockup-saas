"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ChevronDown, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type NavbarProps = {
  variant?: "marketing" | "studio";
  action?: { label: string; busyLabel?: string; busy?: boolean; onClick: () => void };
};

export function Navbar({ variant = "marketing", action }: NavbarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const marketingLinks = [
    ["Templates", "#templates"],
    ["How it works", "#flow"],
    ["Why nativeframe", "#why"],
    ["Pricing", "#pricing"],
  ];

  return (
    <header className={`z-50 px-4 pt-4 sm:px-6 ${variant === "studio" ? "absolute inset-x-0 top-0" : "fixed inset-x-0"}`}>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-2 overflow-visible rounded-[22px] border border-white/80 bg-white/45 px-2 shadow-[0_14px_45px_rgba(17,17,15,.10),inset_0_1px_0_rgba(255,255,255,.85)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-5 sm:px-4">
        <Link href="/" className="shrink-0" aria-label="nativeframe home">
          <Image src="/images/logo.png" alt="nativeframe" width={190} height={164} className="h-20 w-auto object-contain sm:h-36" priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center gap-1 md:flex">
          {variant === "marketing" ? marketingLinks.map(([label, href]) => (
            <a key={label} href={href} className="rounded-xl px-3 py-2 text-sm text-black/65 transition hover:bg-black/[.04] hover:text-black">
              {label}
            </a>
          )) : (
            <>
              <Link href="/studio" className="rounded-xl border border-[#c6ef68] bg-white px-3 py-2 text-sm font-medium text-black shadow-[0_0_0_2px_rgba(198,239,104,.18)]">Dashboard</Link>
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

        <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
          {variant === "studio" ? <>
            {searchOpen ? <input autoFocus placeholder="Search" className="hidden h-9 w-28 rounded-lg bg-black/[.04] px-3 text-sm outline-none sm:block" /> : null}
            <button type="button" onClick={() => setSearchOpen((open) => !open)} className="grid size-10 place-items-center rounded-xl transition hover:bg-black/[.05]" aria-label="Search"><Search size={18} /></button>
            <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#f7b1d8] via-[#8f7aff] to-[#35d5c7] text-xs font-bold text-white">NF</div>
            {action ? <button type="button" onClick={action.onClick} disabled={action.busy} className="hidden h-10 items-center gap-2 rounded-xl bg-[#11110f] px-4 text-sm font-semibold text-white transition hover:bg-black/80 disabled:cursor-wait disabled:opacity-60 sm:inline-flex">{action.busy ? action.busyLabel ?? action.label : <><Zap size={15} /> {action.label}</>}</button> : <Link href="/studio" className="hidden h-10 items-center gap-2 rounded-xl bg-[#11110f] px-4 text-sm font-semibold text-white transition hover:bg-black/80 sm:inline-flex"><Zap size={15} /> Upgrade</Link>}
          </> : <>
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/studio" className="inline-flex rounded-full px-4 py-2.5 text-sm font-semibold text-black/70 transition hover:bg-black/[.05] hover:text-black">Log in</Link>
              <Link href="/studio" className="group relative isolate inline-flex h-11 items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-[#11110f] px-5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(17,17,15,.18),inset_0_1px_0_rgba(255,255,255,.32)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(17,17,15,.24),inset_0_1px_0_rgba(255,255,255,.42)]">
              <span className="pointer-events-none absolute -inset-y-8 -left-1/2 -z-10 w-1/2 rotate-12 bg-white/35 blur-md transition-transform duration-700 group-hover:translate-x-[330%]" />
              Open studio <span className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </Link>
            </div>
            <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={() => setMobileOpen((open) => !open)} className="relative grid size-10 place-items-center rounded-full bg-[#0a285b] text-white shadow-[0_6px_16px_rgba(17,17,15,.2)] md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
              <AnimatePresence mode="wait" initial={false}>{mobileOpen ? <motion.span key="close" initial={{ opacity: 0, rotate: -90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0.7 }} transition={{ duration: 0.18 }}><X size={18} /></motion.span> : <motion.span key="menu" initial={{ opacity: 0, rotate: 90, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0.7 }} transition={{ duration: 0.18 }}><Menu size={18} /></motion.span>}</AnimatePresence>
            </motion.button>
          </>}
        </div>
      </div>
      <AnimatePresence>
        {variant === "marketing" && mobileOpen ? <motion.div initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }} className="mx-auto mt-2 max-w-[1500px] overflow-hidden rounded-[24px] border border-white/90 bg-white/80 p-3 shadow-[0_18px_50px_rgba(17,17,15,.14)] backdrop-blur-2xl md:hidden">
          <nav className="grid gap-1">
            {marketingLinks.map(([label, href], index) => <motion.a key={label} href={href} onClick={() => setMobileOpen(false)} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04 }} className="rounded-2xl px-4 py-3.5 text-sm font-medium text-black/70 transition hover:bg-black/[.05] hover:text-black">{label}<span className="float-right text-black/25">↗</span></motion.a>)}
          </nav>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-black/[.08] pt-3">
            <Link href="/studio" onClick={() => setMobileOpen(false)} className="rounded-full border border-black/10 bg-white/55 px-4 py-3 text-center text-sm font-semibold text-black/75 transition hover:bg-white">Log in</Link>
            <Link href="/studio" onClick={() => setMobileOpen(false)} className="rounded-full bg-[#11110f] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_6px_16px_rgba(17,17,15,.18)] transition hover:-translate-y-0.5">Open studio ↗</Link>
          </div>
        </motion.div> : null}
      </AnimatePresence>
    </header>
  );
}
