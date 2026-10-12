"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { BarChart3, Camera, Image as ImageIcon, Info, LayoutGrid, Lock, Menu, Play, Smartphone, UploadCloud, UsersRound, Video } from "lucide-react";
import { SocialDraft, SocialPreview, type Platform } from "./SocialPreview";
import { Navbar } from "@/components/layout/Navbar";

const templates: { id: Platform; label: string; ratio: string; note: string; logo: string }[] = [
  { id: "tiktok", label: "TikTok", ratio: "9:16", note: "Short-form video cover", logo: "/icons/tiktok.png" },
  { id: "instagram", label: "Instagram", ratio: "4:5", note: "Feed visual", logo: "/icons/instagram.png" },
  { id: "x", label: "X", ratio: "16:9", note: "Post card", logo: "/icons/x.png" },
];

const defaults: SocialDraft = {
  platform: "tiktok",
  displayName: "Northside Studio",
  username: "northside.studio",
  avatarUrl: null,
  caption: "quiet launch. loud result. made in less than a minute.",
  postText: "quiet launch. loud result. made in less than a minute.",
  music: "original sound - Northside Studio",
  secondaryLine: "Original audio",
  badge: "none",
  likes: "28.4K",
  comments: "913",
  replies: "48",
  favorites: "151",
  shares: "4.2K",
  views: "125K",
  timestamp: "2 HOURS AGO",
  liked: false,
  saved: false,
  favorited: false,
  bottomScrim: true,
  darkTheme: false,
  framed: true,
  imageUrl: null,
  mediaType: null,
  imageZoom: 1,
};

export function SocialComposer() {
  const [draft, setDraft] = useState(defaults);
  const [contentType, setContentType] = useState<"posts" | "videos">("videos");
  const [zoom, setZoom] = useState(100);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState("");
  const exportRef = useRef<HTMLDivElement>(null);

  const currentTemplate = useMemo(
    () => templates.find((template) => template.id === draft.platform) ?? templates[0],
    [draft.platform],
  );

  function patch<K extends keyof SocialDraft>(key: K, value: SocialDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) return;

    const url = URL.createObjectURL(file);
    patch("imageUrl", url);
    patch("mediaType", file.type.startsWith("video/") ? "video" : "image");
  }

  async function exportPng() {
    if (!exportRef.current) return;
    setExporting(true);
    setExportError("");

    try {
      const { domToPng } = await import("modern-screenshot");
      await document.fonts.ready;
      const scale = draft.platform === "x" ? 3 : 3;
      const dataUrl = await domToPng(exportRef.current, { scale });
      const link = document.createElement("a");
      link.download = `nativeframe-${draft.platform}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      setExportError("Export failed. Try again after the image finishes loading.");
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#eceae3] text-[#11110f]">
      <Navbar variant="studio" action={{ label: "Export PNG ↓", busyLabel: "Rendering…", busy: exporting, onClick: exportPng }} />
      {/* Export controls stay with the editor workflow below. */}
      {/*
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-[-0.03em]">
              <span className="grid size-7 place-items-center rounded-full bg-black text-[10px] text-[#c7ff3f]">NF</span>
              nativeframe
            </Link>
            <span className="hidden h-5 w-px bg-black/10 sm:block" />
            <span className="hidden text-xs text-black/40 sm:block">Social studio / MVP</span>
          </div>
          <button
            onClick={exportPng}
            disabled={exporting}
            className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {exporting ? "Rendering…" : "Export PNG ↓"}
          </button>
        </div>
      </header> */}

      <div className="grid min-h-screen w-full lg:grid-cols-[420px_1fr]">
        <aside className="border-b border-black/10 bg-[#f4f2ec] p-4 sm:p-6 sm:pt-24 lg:border-b-0 lg:border-r">
          <div className="lg:sticky lg:top-22">
            <div className="rounded-2xl border border-black/[.08] bg-white/55 p-1">
              <div className="grid grid-cols-2 gap-1">
                {([["posts", ImageIcon], ["videos", Video]] as const).map(([type, Icon]) => <button key={type} type="button" onClick={() => setContentType(type)} className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold capitalize transition ${contentType === type ? "border-[#c6ef68] bg-white text-black shadow-[0_0_0_2px_rgba(198,239,104,.22),0_4px_12px_rgba(142,175,44,.1)]" : "border-transparent text-black/55 hover:bg-white"}`}><Icon size={16} />{type}</button>)}
              </div>
            </div>
            <div className="mt-7">
              <div className="flex items-center gap-2"><LayoutGrid size={17} /><h2 className="text-sm font-semibold">Choose a template</h2></div>
              <p className="mt-1 text-xs text-black/45">Select the platform and format for your visual.</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(contentType === "videos" ? templates : templates.filter((template) => template.id !== "tiktok")).map((template) => {
                  const active = draft.platform === template.id;
                  return (
                    <button
                      key={template.id}
                      onClick={() => patch("platform", template.id)}
                      className={`rounded-2xl border p-3 text-left transition ${active ? "border-[#b8ff22] bg-white text-black shadow-[0_0_0_2px_rgba(184,255,34,.28),0_8px_18px_rgba(142,175,44,.1)]" : "border-black/10 bg-white/55 hover:border-black/25"}`}
                    >
                      <Image src={template.logo} alt="" width={40} height={40} className="mb-2 size-10 object-contain" />
                      <span className="block text-sm font-semibold">{template.label}</span>
                      <span className={`mt-1 block font-mono text-[9px] ${active ? "text-black/45" : "text-black/38"}`}>{template.ratio}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-black/40">{contentType === "videos" ? currentTemplate.note : "Feed post format"}</p>
            </div>

            <div className="mt-7 space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold"><UsersRound size={17} /> Creator info</div>
              <Field label="Display name">
                <input value={draft.displayName} onChange={(e) => patch("displayName", e.target.value)} className="input" maxLength={40} />
              </Field>
              <Field label="Username">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-black/35">@</span>
                  <input value={draft.username.replace(/^@/, "")} onChange={(e) => patch("username", e.target.value)} className="input pl-7" maxLength={30} />
                </div>
              </Field>
              <div className="flex items-center gap-2 text-sm font-semibold"><ImageIcon size={17} /> Caption / Post text</div>
              <Field label="Post text">
                <textarea value={draft.caption} onChange={(e) => patch("caption", e.target.value)} className="input min-h-24 resize-none py-3 leading-6" maxLength={220} />
              </Field>

              <div className="flex items-center gap-2 text-sm font-semibold"><BarChart3 size={17} /> Metrics</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <Field label="Likes"><input value={draft.likes} onChange={(e) => patch("likes", e.target.value)} className="input px-3" maxLength={8} /></Field>
                <Field label="Comments"><input value={draft.comments} onChange={(e) => patch("comments", e.target.value)} className="input px-3" maxLength={8} /></Field>
                <Field label="Shares"><input value={draft.shares} onChange={(e) => patch("shares", e.target.value)} className="input px-3" maxLength={8} /></Field>
                <Field label="Views"><input value={draft.views} onChange={(e) => patch("views", e.target.value)} className="input px-3" maxLength={8} /></Field>
              </div>

              <div className="flex items-center gap-2 text-sm font-semibold"><ImageIcon size={17} /> Media</div>
              <Field label="Upload a cover image or video thumbnail">
                <label className="flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-black/18 bg-white/55 px-4 text-center text-xs leading-5 text-black/48 transition hover:border-black/35 hover:bg-white">
                  <input type="file" accept="image/png,image/jpeg,image/webp,video/mp4,video/webm" onChange={handleFile} className="sr-only" />
                  <UploadCloud size={22} className="text-black/70" />
                  <b className="text-black/75">{draft.imageUrl ? "Replace image" : "Upload image or video"}</b>
                  <span>JPG, PNG or WebP</span>
                </label>
                {draft.imageUrl ? <button type="button" onClick={() => patch("imageUrl", null)} className="mt-2 text-xs font-medium text-red-600 hover:underline">Remove uploaded media</button> : null}
              </Field>

              {draft.imageUrl ? (
                <Field label="Image zoom">
                  <input
                    type="range"
                    min="1"
                    max="1.6"
                    step="0.02"
                    value={draft.imageZoom}
                    onChange={(e) => patch("imageZoom", Number(e.target.value))}
                    className="range w-full"
                  />
                </Field>
              ) : null}
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[#c9ef68] bg-[#efffc9] p-4 text-xs leading-5">
              <Lock size={17} className="mt-0.5 shrink-0" /><p><b>Local render</b><br />Your media stays in your browser during this MVP flow.</p>
            </div>
            {exportError ? <p className="mt-3 text-xs text-red-700">{exportError}</p> : null}
          </div>
        </aside>

        <section className="editor-grid relative flex min-h-[420px] flex-col items-center justify-center overflow-auto p-6 sm:p-10 lg:min-h-0">
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f2ec]/85 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[.15em] text-black/45 backdrop-blur">
            <span className="size-1.5 rounded-full bg-green-500" /> Live preview
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f2ec]/85 px-2 py-1.5 text-xs text-black/65 backdrop-blur"><button type="button" onClick={() => setZoom((value) => Math.max(70, value - 10))}>−</button><span className="min-w-10 text-center">{zoom}%</span><button type="button" onClick={() => setZoom((value) => Math.min(130, value + 10))}>+</button><span className="mx-1 h-4 w-px bg-black/10" /><Smartphone size={15} /><Menu size={15} /></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={draft.platform}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="my-12 origin-center"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <SocialPreview draft={draft} exportRef={exportRef} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1 rounded-xl border border-black/[.08] bg-white/80 p-1 text-xs shadow-sm"><button className="rounded-lg border border-[#c6ef68] bg-white px-4 py-2 text-black shadow-[0_0_0_1px_rgba(198,239,104,.2)]">Preview</button><button className="rounded-lg px-4 py-2 text-black/60">Canvas</button></div>
        </section>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          min-height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(17,17,15,.12);
          background: rgba(255,255,255,.7);
          padding-left: 14px;
          padding-right: 14px;
          outline: none;
          color: #11110f;
          font-size: 14px;
          transition: border-color .2s, background .2s, box-shadow .2s;
        }
        .input:focus {
          border-color: rgba(17,17,15,.45);
          background: white;
          box-shadow: 0 0 0 3px rgba(199,255,63,.4);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold text-black/52">{label}</span>
      {children}
    </label>
  );
}
