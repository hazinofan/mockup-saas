"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const platforms = ["TikTok", "Instagram", "X"];

export function LandingPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup = () => {};

    async function setupGsap() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { y: 38, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 84%", once: true },
            },
          );
        });
      }, pageRef);

      cleanup = () => ctx.revert();
    }

    setupGsap();
    return () => cleanup();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen overflow-hidden bg-[#f4f2ec] text-[#11110f]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full border border-black/10 bg-[#f4f2ec]/85 px-4 shadow-[0_8px_30px_rgba(17,17,15,.05)] backdrop-blur-xl sm:px-5">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-[-0.03em]">
            <span className="grid size-7 place-items-center rounded-full bg-black text-[10px] text-[#c7ff3f]">NF</span>
            nativeframe
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-black/60 md:flex">
            <a href="#templates" className="transition hover:text-black">Templates</a>
            <a href="#flow" className="transition hover:text-black">How it works</a>
            <a href="#why" className="transition hover:text-black">Why nativeframe</a>
          </nav>
          <Link
            href="/studio"
            className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/85"
          >
            Open studio
          </Link>
        </div>
      </header>

      <main>
        <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 sm:pt-44 lg:pb-32">
          <div className="pointer-events-none absolute left-[60%] top-16 h-72 w-72 rounded-full bg-[#c7ff3f]/35 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-8">
            <div className="relative z-10 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium"
              >
                <span className="size-1.5 rounded-full bg-[#11110f]" />
                Browser-native social mockups
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[900px] text-[clamp(3.6rem,9vw,8.2rem)] font-semibold leading-[.82] tracking-[-0.075em]"
              >
                Make posts that look native.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-7 max-w-xl text-base leading-7 text-black/58 sm:text-lg"
              >
                Build polished TikTok, Instagram and X visual mockups in seconds. No prompt, no render queue, no AI image API. Your browser does the work.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.24 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/studio"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Create your first mockup
                  <span className="transition group-hover:translate-x-1">↗</span>
                </Link>
                <GoogleSignIn compact />
              </motion.div>
            </div>

            <HeroPreview />
          </div>
        </section>

        <section id="templates" className="border-y border-black/10 bg-[#11110f] py-6 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 overflow-hidden px-4 sm:px-6">
            <p className="shrink-0 font-mono text-[10px] uppercase tracking-[.24em] text-white/45">Launch templates</p>
            <div className="flex min-w-max flex-1 justify-around gap-10 text-sm font-semibold sm:text-base">
              {platforms.map((platform) => (
                <span key={platform}>{platform}</span>
              ))}
              <span className="text-[#c7ff3f]">Export PNG</span>
              <span className="hidden md:inline">100% client-side</span>
            </div>
          </div>
        </section>

        <section id="flow" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-xs uppercase tracking-[.22em] text-black/45">One clean workflow</p>
              <h2 className="mt-4 max-w-sm text-4xl font-semibold leading-[.95] tracking-[-0.05em] sm:text-5xl">
                From blank canvas to share-ready in under a minute.
              </h2>
            </div>

            <div className="grid gap-3">
              {[
                ["01", "Choose the platform", "Start with TikTok, Instagram or X. Each canvas is already shaped for the right visual language."],
                ["02", "Write the moment", "Set the username, caption, metrics and upload a visual. The preview updates instantly."],
                ["03", "Export clean PNG", "Render the interface locally in the browser and download a crisp image. Nothing waits on a server."],
              ].map(([number, title, text]) => (
                <SpotlightCard
                  key={number}
                  className="rounded-[28px] border border-black/10 bg-white/55 p-6 sm:p-8"
                  spotlightColor="rgba(199,255,63,.32)"
                >
                  <div data-reveal className="grid gap-5 sm:grid-cols-[80px_1fr]">
                    <span className="font-mono text-xs text-black/35">{number}</span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                      <p className="mt-3 max-w-xl leading-7 text-black/55">{text}</p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
          <div className="grid overflow-hidden rounded-[34px] border border-black/10 bg-[#dfddd5] md:grid-cols-2">
            <div data-reveal className="noise min-h-[480px] border-b border-black/10 p-7 md:border-b-0 md:border-r sm:p-10">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[.22em] text-black/45">Local by design</p>
                  <h2 className="mt-5 max-w-md text-4xl font-semibold leading-[.95] tracking-[-0.05em] sm:text-5xl">
                    Your visual stays on your device.
                  </h2>
                </div>
                <div className="mt-16 rounded-3xl border border-black/10 bg-[#f4f2ec] p-5 font-mono text-xs leading-7 text-black/58">
                  upload → browser → template → PNG<br />
                  <span className="text-black">image API cost: $0</span>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              {[
                ["Fast", "Instant visual feedback. No generation queue."],
                ["Private", "User media does not need to leave the browser."],
                ["Focused", "One job: believable social-media visuals."],
                ["Launchable", "Mobile-first flow built for TikTok traffic."],
              ].map(([title, text]) => (
                <div key={title} data-reveal className="min-h-60 border-b border-black/10 p-7 odd:sm:border-r last:border-b-0 sm:p-8">
                  <div className="mb-12 size-2 rounded-full bg-black" />
                  <h3 className="text-xl font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-black/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <div data-reveal className="rounded-[36px] bg-[#c7ff3f] px-6 py-12 sm:px-10 sm:py-16 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.22em]">MVP is live locally</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[.92] tracking-[-0.055em] sm:text-6xl">
                Make something worth stopping the scroll for.
              </h2>
            </div>
            <Link href="/studio" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white lg:mt-0">
              Open the studio ↗
            </Link>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <span>nativeframe / prototype 01</span>
        <span>Built for validation, not feature bloat.</span>
      </footer>
    </div>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[530px] sm:min-h-[620px]"
    >
      <div className="absolute inset-x-4 top-6 h-[470px] rounded-[36px] border border-black/10 bg-[#e7e3d9] shadow-[0_30px_100px_rgba(17,17,15,.1)] sm:inset-x-10 sm:h-[540px]" />

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-5, -3.5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[3%] top-24 z-20 w-[44%] max-w-56 -rotate-5 rounded-[28px] border-[7px] border-black bg-black p-1 shadow-2xl"
      >
        <div className="relative aspect-[9/16] overflow-hidden rounded-[19px] bg-[radial-gradient(circle_at_40%_20%,#ff895c,transparent_30%),linear-gradient(160deg,#293448,#0d0d0d_70%)]">
          <div className="absolute inset-x-3 bottom-4 text-[7px] text-white sm:text-[9px]">
            <p className="font-semibold">@northside.studio</p>
            <p className="mt-1 text-white/75">quiet launch. loud result.</p>
          </div>
          <div className="absolute bottom-5 right-2 grid gap-2 text-center text-[7px] text-white sm:text-[8px]">
            <span>♥<br />28k</span><span>◉<br />913</span><span>↗<br />4.2k</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 9, 0], rotate: [5, 3.5, 5] }}
        transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[4%] top-12 z-10 w-[48%] max-w-64 rotate-5 rounded-[26px] border border-black/10 bg-white p-3 shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-black/8 pb-2 text-[8px] sm:text-[10px]">
          <span className="size-5 rounded-full bg-[#c7ff3f]" />
          <div><b>studio.archive</b><br /><span className="text-black/40">Original audio</span></div>
        </div>
        <div className="mt-3 aspect-[4/5] rounded-2xl bg-[linear-gradient(145deg,#b7c8ff,#efd4c5_48%,#111_49%,#111_53%,#c7ff3f_54%)]" />
        <div className="mt-3 text-[8px] leading-4 sm:text-[10px]"><b>4,821 likes</b><br />studio.archive Small detail, big shift.</div>
      </motion.div>

      <motion.div
        whileHover={{ y: -8, rotate: 0 }}
        className="absolute bottom-3 left-[20%] z-30 w-[72%] max-w-sm -rotate-2 rounded-[24px] border border-black/10 bg-white p-4 shadow-2xl sm:left-[24%]"
      >
        <div className="flex gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-black text-[9px] font-bold text-white">NF</span>
          <div className="text-[10px] leading-4 sm:text-xs sm:leading-5">
            <p><b>Nativeframe</b> <span className="text-black/40">@nativeframe · now</span></p>
            <p className="mt-1">What if your next launch visual took 40 seconds instead of 40 minutes?</p>
            <div className="mt-3 flex justify-between text-black/35"><span>♡ 128</span><span>◯ 24</span><span>↗ 31</span><span>⌑</span></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
