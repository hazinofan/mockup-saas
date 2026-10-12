"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BarChart3, Sparkles, UsersRound, Zap } from "lucide-react";
import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Navbar } from "@/components/layout/Navbar";

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
      <Navbar />

      <main>
        <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
          <div className="pointer-events-none absolute right-[4%] top-20 h-72 w-72 rounded-full bg-[#c7ff3f]/45 blur-3xl sm:h-[34rem] sm:w-[34rem]" />

          <div className="grid items-center gap-16 lg:grid-cols-[.88fr_1.18fr] lg:gap-0">
            <div className="relative z-10 max-w-2xl lg:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium"
              >
                <span className="size-1.5 rounded-full bg-[#98e51d]" />
                Browse-native social mockups
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[700px] text-[clamp(3.7rem,7vw,6.8rem)] font-semibold leading-[.84] tracking-[-0.075em]"
              >
                Make social posts that look <span className="text-[#98e51d]">native.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.16 }}
                className="mt-7 max-w-xl text-base leading-7 text-black/58 sm:text-lg"
              >
                Create polished TikTok, Instagram and X mockups in seconds. No prompt, no render queue, no AI image API. It all happens in your browser.
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
                  Open studio
                  <span className="transition group-hover:translate-x-1">↗</span>
                </Link>
                <GoogleSignIn compact />
              </motion.div>

              <div className="mt-9 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[12, 32, 47, 5].map((avatar, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={index} src={`https://i.pravatar.cc/80?img=${avatar}`} alt="" className="size-9 rounded-full border-2 border-[#f4f2ec] object-cover" />
                  ))}
                </div>
                <div className="text-xs leading-5 text-black/55">
                  <div className="tracking-[.2em] text-[#98e51d]">★★★★★</div>
                  <span className="font-semibold text-black">10,000+ creators</span> use nativeframe<br />to mock their content faster.
                </div>
              </div>
            </div>

            <HeroImage />
          </div>
        </section>

        <section id="templates" className="border-y border-black/10 bg-[#11110f] py-6 text-white">
          <div className="flex w-full items-center gap-7 overflow-hidden px-4 sm:px-8">
            <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[.24em] text-white/45 sm:block">Launch templates</p>
            <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-[marquee_24s_linear_infinite] items-center gap-12 pr-12 text-sm font-semibold sm:gap-20 sm:text-base">
                {[...Array(2)].flatMap((_, copy) => [
                  <TemplateBrand key={`tiktok-${copy}`} type="tiktok" label="TikTok" />,
                  <TemplateBrand key={`instagram-${copy}`} type="instagram" label="Instagram" />,
                  <TemplateBrand key={`x-${copy}`} type="x" label="X" />,
                  <TemplateBrand key={`youtube-${copy}`} type="youtube" label="YouTube" />,
                  <TemplateBrand key={`linkedin-${copy}`} type="linkedin" label="LinkedIn" />,
                  <TemplateBrand key={`threads-${copy}`} type="threads" label="Threads" />,
                  <TemplateBrand key={`pinterest-${copy}`} type="pinterest" label="Pinterest" />,
                  <TemplateBrand key={`snapchat-${copy}`} type="snapchat" label="Snapchat" />,
                  <span key={`export-${copy}`} className="text-[#c7ff3f]">Export PNG</span>,
                  <span key={`local-${copy}`} className="text-white/80">100% client-side</span>,
                ])}
              </div>
            </div>
          </div>
        </section>

        <section id="flow" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <p className="font-mono text-xs uppercase tracking-[.22em] text-black/45">One clean workflow</p>
              <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[.91] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
                From blank canvas to share-ready in <span className="relative whitespace-nowrap"><span className="absolute inset-x-0 bottom-1 h-3 -rotate-1 rounded-full bg-[#c7ff3f]/60" /><span className="relative">under a minute.</span></span>
              </h2>
              <p className="mt-8 max-w-md text-lg leading-7 text-black/55">Choose a platform, write your content, and export a beautiful, on-brand visual — instantly. No design skills, no waiting, no fuss.</p>
              <div className="mt-12 inline-flex h-[62px] w-[338px] max-w-full items-center gap-4 rounded-full border border-black/[.08] bg-white/45 px-3 pr-5 shadow-[0_8px_24px_rgba(17,17,15,.04)]">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e2ff9b]"><svg viewBox="0 0 24 24" aria-hidden="true" className="size-5"><path d="M13.2317 1.35987C13.8635.601694 15.0952 1.11999 14.9948 2.10179L14.2893 9.00005H20c.8478 0 1.311.98886.7682 1.64015l-10 12c-.6318.7582-1.8641.2401-1.7631-.7419l.7055-6.8982H3.99996c-.84784 0-1.31099-.9889-.76822-1.6402l10-12.00003Z" fill="#212830" /></svg></span>
                <span className="text-[13px] leading-[18px] text-black/55"><b className="text-black">Used by 100K+ creators</b><br />to create scroll-stopping visuals</span>
              </div>
            </div>

            <div className="relative grid gap-4 pl-0 sm:pl-8">
              <div className="absolute bottom-12 left-3 top-12 hidden w-px bg-black/10 sm:block" />
              {[
                ["01", "Choose the platform", "Start with TikTok, Instagram or X. Each canvas is already shaped for the right visual language."],
                ["02", "Write the moment", "Set the username, caption and any metrics. See a live preview as you type."],
                ["03", "Export clean PNG", "Render the interface locally in your browser and download a crisp image. Nothing waits on a server."],
              ].map(([number, title, text], index) => (
                <SpotlightCard key={number} className="relative overflow-visible rounded-[30px] border border-black/10 bg-white/55 p-6 shadow-[0_18px_55px_rgba(17,17,15,.04)] sm:p-8" spotlightColor="rgba(199,255,63,.32)">
                  <span className="absolute -left-[37px] top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-[#f4f2ec] text-[#a1e51d] shadow-sm sm:grid"><span className="size-2.5 rounded-full bg-[#a1e51d]" /></span>
                  <div className="grid gap-6 md:grid-cols-[1fr_250px] md:items-center">
                    <div>
                      <span className="inline-grid size-9 place-items-center rounded-full bg-[#e2ff9b]/35 font-mono text-xs">{number}</span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                      <p className="mt-2 max-w-lg leading-7 text-black/55">{text}</p>
                    </div>
                    <WorkflowPreview index={index} />
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
        <CreateSection />
        <WhySection />
        <section id="why-legacy" className="hidden mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:pb-32">
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

        <section className="hidden mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <div data-reveal className="rounded-[36px] bg-[#c7ff3f] px-6 py-12 sm:px-10 sm:py-16 lg:flex lg:items-end lg:justify-between">
            <div>
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

      <footer className="mx-auto max-w-[1500px] px-4 pb-8 pt-2 sm:px-6">
        <div className="flex flex-col gap-5 border-t border-black/[.1] py-7 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" aria-label="nativeframe home" className="inline-flex items-center">
            <Image src="/images/logo.png" alt="nativeframe" width={190} height={164} className="h-40 w-auto object-contain" />
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#templates" className="transition hover:text-black">Templates</a>
            <a href="#flow" className="transition hover:text-black">How it works</a>
            <a href="#why" className="transition hover:text-black">Why nativeframe</a>
            <Link href="/studio" className="transition hover:text-black">Open studio ↗</Link>
          </nav>
          <span className="text-xs">© 2026 nativeframe</span>
        </div>
      </footer>
    </div>
  );
}

function CreateSection() {
  const formats = [
    ["TikTok", "/images/tiktok.png"],
    ["Instagram", "/images/instagram.png"],
    ["X", "/images/x.png"],
  ];
  return (
    <section className="mx-auto w-full max-w-[1500px] px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative grid items-center gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 rounded-full border border-[#dfff76] bg-[#efffc9]/70 px-5 py-3 font-mono text-xs uppercase tracking-[.22em] text-black"><span className="size-4 rounded-full bg-[#b8ff22] shadow-[0_0_12px_rgba(184,255,34,.75)]" />What you can create</div>
          <h2 className="mt-9 max-w-[550px] text-[clamp(3.2rem,5.3vw,5.2rem)] font-semibold leading-[.91] tracking-[-0.07em]">Three native formats, one fast workflow.</h2>
          <p className="mt-8 max-w-[530px] text-lg leading-7 text-black/55 sm:text-xl">Start with the right canvas for the moment — build a post, short-form screen, or social update that already feels platform-ready.</p>
          <div className="mt-9 grid max-w-[520px] grid-cols-2 gap-3">
            {[["Launch updates", Zap], ["Product teasers", BarChart3], ["Social proof", UsersRound], ["Team announcements", Sparkles]].map(([label, Icon]) => <div key={label as string} className="flex items-center gap-3 rounded-full border border-black/[.1] bg-white/45 px-3 py-2 text-sm sm:px-4 sm:py-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#efffc1] text-black"><Icon className="size-4" strokeWidth={2} /></span>{label as string}</div>)}
          </div>
        </div>
        <div className="relative grid grid-cols-3 items-end gap-2 sm:gap-4">
          <div className="pointer-events-none absolute -inset-8 rounded-full border border-[#d4ef54] opacity-80" />
          <div className="pointer-events-none absolute -top-6 left-1/2 size-4 -translate-x-1/2 rounded-full bg-[#b8ff22] shadow-[0_0_16px_6px_rgba(184,255,34,.6)]" />
          {formats.map(([title, src]) => <Image key={title} src={src} alt={`${title} template`} width={640} height={900} className="relative z-10 h-auto w-full object-contain" />)}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 pb-10 sm:px-6">
      <div data-reveal className="relative min-h-[500px] overflow-hidden rounded-[30px] border border-white/80 bg-[#f8f7f2] shadow-[0_24px_80px_rgba(17,17,15,.06)] sm:min-h-[460px] sm:rounded-[36px]">
        <Image src="/images/bg.png" alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1500px" />
        <div className="relative z-10 flex min-h-[500px] flex-col justify-center px-6 py-12 sm:min-h-[460px] sm:px-16 sm:py-14 lg:px-20">
          <h2 className="mt-8 max-w-[800px] text-[clamp(2.8rem,6vw,5.3rem)] font-semibold leading-[.9] tracking-[-0.07em] sm:mt-9">Make something worth<br className="hidden sm:block" /> stopping the scroll for.</h2>
          <p className="mt-7 max-w-[650px] text-base leading-6 text-black/55 sm:mt-8 sm:text-xl sm:leading-7">The Nativeframe MVP is live locally — a browser-native studio for turning ideas into real products, faster.</p>
          <Link href="/studio" className="mt-8 inline-flex w-fit items-center gap-4 rounded-full bg-[#11110f] px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-1 sm:absolute sm:bottom-24 sm:right-16 sm:mt-0 sm:px-10 sm:py-5 sm:text-lg lg:right-20">Open the studio <span className="text-2xl">↗</span></Link>
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const cards = [
    ["bolt", "Fast", "Instant visual feedback. No generation queue."],
    ["lock", "Private", "User media stays in the browser."],
    ["target", "Focused", "One job: believable social-media visuals."],
    ["phone", "Launchable", "Mobile-first flow built for TikTok traffic."],
  ];
  return (
    <section id="why" className="mx-auto w-full max-w-[1500px] px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="relative overflow-hidden rounded-[34px] border border-black/[.1] bg-[#f8f7f2] p-6 shadow-[0_24px_80px_rgba(17,17,15,.04)] sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -left-16 top-16 size-[430px] rounded-full bg-[#eaff8f]/35 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[20%] size-[330px] rounded-full bg-[#dfff68]/30 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal className="relative flex flex-col justify-between lg:min-h-[560px]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.25em] text-black/45">Local by design</p>
              <h2 className="mt-7 max-w-[520px] text-[clamp(2.85rem,4.6vw,4.45rem)] font-semibold leading-[.92] tracking-[-0.07em]">Your visuals stay<br className="hidden sm:block" /> on your device.</h2>
              <p className="mt-7 max-w-[500px] text-lg leading-[1.35] text-black/55 sm:text-xl">Everything runs in the browser, with no server-side image generation. Your media never leaves your device.</p>
            </div>
            <div className="relative mt-12 overflow-hidden rounded-[32px] border border-[#d7dfa9] bg-white/75 p-5 shadow-[0_14px_40px_rgba(129,145,33,.12)] sm:p-7 lg:mt-16">
              <Image src="/images/steps.png" alt="Upload, browser, template, and export workflow" width={2172} height={724} className="h-auto w-full object-contain" />
              <div className="mt-5 border-t border-black/[.08] pt-4 font-mono text-xs text-black/65 sm:mt-6 sm:pt-5 sm:text-sm">AI image API cost: <span className="font-semibold text-[#56a500]">$0</span></div>
            </div>
          </div>
          <div className="relative grid gap-4 sm:grid-cols-2">
            <div className="pointer-events-none absolute -left-36 top-[34%] hidden h-48 w-56 rounded-[50%] border-l border-t border-[#d4ef54] sm:block" />
            <div className="pointer-events-none absolute -left-14 top-[40%] hidden size-4 rounded-full bg-[#c7ff3f] shadow-[0_0_14px_5px_rgba(199,255,63,.65)] sm:block" />
            {cards.map(([icon, title, text]) => <div key={title} data-reveal className="relative min-h-[245px] rounded-[30px] border border-black/[.08] bg-white/65 p-7 shadow-[0_12px_32px_rgba(17,17,15,.045)] backdrop-blur-sm sm:p-8"><div className="mb-7 grid size-16 place-items-center rounded-full bg-[#efffc1] text-black"><FeatureIcon name={icon} /></div><h3 className="text-2xl font-semibold tracking-[-0.045em]">{title}</h3><p className="mt-3 max-w-[290px] text-lg leading-7 text-black/55">{text}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  const paths: Record<string, string> = { bolt: "M13 2 4 13h6l-1 9 9-11h-6l1-9Z", lock: "M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zM12 15v2", target: "M12 5a7 7 0 1 0 7 7M12 9a3 3 0 1 0 3 3", phone: "M8 3h8v18H8zM11 18h2", image: "m4 17 4-5 3 3 3-4 6 6M5 5h14v14H5z", browser: "M4 5h16v14H4zM4 9h16", grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z", download: "M12 3v12m0 0 5-5m-5 5-5-5M4 20h16" };
  return <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

function WorkflowPreview({ index }: { index: number }) {
  const assets = [
    ["/images/socials.png", "Choose a platform"],
    ["/images/post.png", "Write your post"],
    ["/images/export.png", "Export your visual"],
  ] as const;
  const [src, alt] = assets[index];
  return <div className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(17,17,15,.08)]"><Image src={src} alt={alt} width={640} height={420} className="h-32 w-full object-cover object-center" /></div>;
}

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[390px] sm:min-h-[560px] lg:min-h-[650px]"
    >
      <div className="absolute inset-x-0 top-8 h-[76%] rounded-full bg-[#c7ff3f]/20 blur-3xl" />
      <Image
        src="/images/hero.png"
        alt="TikTok, Instagram and X mockups displayed on a pedestal"
        width={1536}
        height={1024}
        priority
        className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_28px_rgba(17,17,15,.14)]"
      />
    </motion.div>
  );
}

function TemplateBrand({ type, label }: { type: "tiktok" | "instagram" | "x" | "youtube" | "linkedin" | "threads" | "pinterest" | "snapchat"; label: string }) {
  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap text-white">
      {type === "instagram" ? <span className="grid size-7 place-items-center rounded-[8px] bg-gradient-to-tr from-[#ffd600] via-[#ff0069] to-[#7638fa] p-1.5"><svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg></span> : null}
      {type === "tiktok" ? <span className="grid size-7 place-items-center rounded-full bg-white text-black"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.7 3c.4 2.3 1.7 3.7 4.3 3.9v3.1a9 9 0 0 1-4.3-1.3v6.7a5.6 5.6 0 1 1-4.8-5.5v3.2a2.5 2.5 0 1 0 1.7 2.3V3h3.1Z" /></svg></span> : null}
      {type === "x" ? <span className="grid size-7 place-items-center rounded-full bg-white text-black"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.2 4h3.7l3.5 4.8L16.4 4H19l-5.3 6.1L19.4 20h-3.7l-4-5.5L6.8 20H4.2l5.6-6.5L5.2 4Zm3.1 1.8H7.1l8.9 12.4h1.2L8.3 5.8Z" /></svg></span> : null}
      {type === "youtube" ? <span className="grid size-7 place-items-center"><svg viewBox="0 -7 48 48" className="size-7"><path fill="#CE1312" d="M219.044 391.27 219.043 377.688l12.969 6.814-12.968 6.768ZM247.52 375.334s-.47-3.33-1.908-4.798c-1.826-1.926-3.872-1.935-4.809-2.047C234.086 368 224.01 368 224.01 368h-.02s-10.076 0-16.793.489c-.939.112-2.984.121-4.812 2.047-1.438 1.467-1.905 4.798-1.905 4.798S200 379.247 200 383.158v3.668c0 3.912.48 7.823.48 7.823s.468 3.331 1.906 4.798c1.827 1.926 4.226 1.866 5.294 2.067 3.84.372 16.32.486 16.32.486s10.086-.015 16.803-.505c.937-.113 2.983-.122 4.81-2.048 1.438-1.467 1.907-4.798 1.907-4.798s.48-3.911.48-7.823v-3.668c0-3.911-.48-7.824-.48-7.824Z" transform="translate(-200 -368)" /></svg></span> : null}
      {type === "linkedin" ? <span className="grid size-7 place-items-center"><svg viewBox="0 0 16 16" className="size-7"><path fill="#0A66C2" d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14ZM4.67 5.715a1.037 1.037 0 1 1 0-2.063 1.037 1.037 0 0 1 0 2.063Zm.889 6.51h-1.78V6.498h1.78v5.727ZM13.11 2H2.885A.88.88 0 0 0 2 2.866v10.268c0 .478.397.866.885.866h10.226a.882.882 0 0 0 .889-.866V2.865A.88.88 0 0 0 13.11 2Z" /></svg></span> : null}
      {type === "threads" ? <span className="grid size-7 place-items-center rounded-full bg-white text-lg font-bold text-black">@</span> : null}
      {type === "pinterest" ? <span className="grid size-7 place-items-center"><svg viewBox="0 0 48 48" className="size-7"><circle cx="24" cy="24" r="24" fill="#CC2127" /><path fill="white" d="M24 8c-8.8 0-14.3 5.7-14.3 11.9 0 3.3 1.2 6.2 3.8 7.3.4.2.8 0 .9-.5l.4-1.6c.1-.5 0-.7-.3-1.1-.8-.9-1.3-2.1-1.3-3.8 0-4.9 3.7-9.3 9.7-9.3 5.3 0 8.2 3.2 8.2 7.4 0 5.6-2.5 10.3-6.2 10.3-2 0-3.5-1.7-3-3.8.6-2.5 1.7-5.2 1.7-7 0-1.6-.9-2.9-2.7-2.9-2.1 0-3.8 2.2-3.8 5.2 0 1.9.6 3.2.6 3.2s-2 8.3-2.3 9.8c-.7 2.9-.1 6.5-.1 6.5.1.1.2.1.2 0 .1-.1 2.1-2.6 2.9-5.1.2-.7 1.2-4.6 1.2-4.6.6 1.2 2.5 2.3 4.5 2.3 5.9 0 9.9-5.4 9.9-12.7C34 13.1 30 8 24 8Z" /></svg></span> : null}
      {type === "snapchat" ? <span className="grid size-7 place-items-center"><svg viewBox="0 0 512 512" className="size-7"><rect width="512" height="512" rx="15%" fill="#fffc00" /><path fill="#fff" stroke="#000" strokeWidth="7" d="M203 414c-18-13-32-20-66-14-5 1-14 4-15-5-2-7-2-18-7-19-31-4-42-10-47-16-2-2-3-7 1-8 53-10 78-61 83-71 6-15-4-24-23-30-9-3-24-7-24-17 0-5 5-8 10-10 4-1 8-2 12 0 12 5 23 7 29 2 0-27-7-61 4-89 13-31 45-59 96-59s83 28 96 59c11 28 4 62 4 89 6 5 17 3 29-2 4-2 8-1 12 0 5 2 10 5 10 10 0 10-15 14-24 17-19 6-29 15-23 30 5 10 30 61 83 71 4 1 3 6 1 8-5 6-16 12-47 16-5 1-5 12-7 19-1 9-10 6-15 5-34-6-48 1-66 14a82 82 0 0 1-53 20c-21 1-38-8-53-20z" /></svg></span> : null}
      {label}
    </span>
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
