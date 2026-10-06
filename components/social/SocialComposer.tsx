"use client";

import Link from "next/link";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SocialDraft, SocialPreview, type Platform } from "./SocialPreview";

const templates: { id: Platform; label: string; ratio: string; note: string }[] = [
  { id: "tiktok", label: "TikTok", ratio: "9:16", note: "Short-form video cover" },
  { id: "instagram", label: "Instagram", ratio: "4:5", note: "Feed visual" },
  { id: "x", label: "X", ratio: "16:9", note: "Post card" },
];

const defaults: SocialDraft = {
  platform: "tiktok",
  displayName: "Northside Studio",
  username: "northside.studio",
  caption: "quiet launch. loud result. made in less than a minute.",
  likes: "28.4K",
  comments: "913",
  shares: "4.2K",
  imageUrl: null,
  imageZoom: 1,
};

export function SocialComposer() {
  const [draft, setDraft] = useState(defaults);
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
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    patch("imageUrl", url);
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
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#eceae3]/88 backdrop-blur-xl">
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
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-[1500px] lg:grid-cols-[420px_1fr]">
        <aside className="border-b border-black/10 bg-[#f4f2ec] p-4 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="lg:sticky lg:top-22">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/38">Template</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {templates.map((template) => {
                  const active = draft.platform === template.id;
                  return (
                    <button
                      key={template.id}
                      onClick={() => patch("platform", template.id)}
                      className={`rounded-2xl border p-3 text-left transition ${active ? "border-black bg-black text-white" : "border-black/10 bg-white/55 hover:border-black/25"}`}
                    >
                      <span className="text-sm font-semibold">{template.label}</span>
                      <span className={`mt-1 block font-mono text-[9px] ${active ? "text-white/45" : "text-black/38"}`}>{template.ratio}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-black/40">{currentTemplate.note}</p>
            </div>

            <div className="mt-7 space-y-5">
              <Field label="Display name">
                <input value={draft.displayName} onChange={(e) => patch("displayName", e.target.value)} className="input" maxLength={40} />
              </Field>
              <Field label="Username">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-black/35">@</span>
                  <input value={draft.username.replace(/^@/, "")} onChange={(e) => patch("username", e.target.value)} className="input pl-7" maxLength={30} />
                </div>
              </Field>
              <Field label="Post text">
                <textarea value={draft.caption} onChange={(e) => patch("caption", e.target.value)} className="input min-h-24 resize-none py-3 leading-6" maxLength={220} />
              </Field>

              <div className="grid grid-cols-3 gap-2">
                <Field label="Likes"><input value={draft.likes} onChange={(e) => patch("likes", e.target.value)} className="input px-3" maxLength={8} /></Field>
                <Field label="Comments"><input value={draft.comments} onChange={(e) => patch("comments", e.target.value)} className="input px-3" maxLength={8} /></Field>
                <Field label="Shares"><input value={draft.shares} onChange={(e) => patch("shares", e.target.value)} className="input px-3" maxLength={8} /></Field>
              </div>

              <Field label="Background image">
                <label className="flex min-h-24 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-black/18 bg-white/55 px-4 text-center text-xs leading-5 text-black/48 transition hover:border-black/35 hover:bg-white">
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleFile} className="sr-only" />
                  {draft.imageUrl ? "Replace image" : "Upload JPG, PNG or WebP"}
                </label>
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

            <div className="mt-8 rounded-2xl border border-black/10 bg-[#c7ff3f] p-4 text-xs leading-5">
              <b>Local render.</b> Uploaded media stays in the browser during this MVP flow.
            </div>
            {exportError ? <p className="mt-3 text-xs text-red-700">{exportError}</p> : null}
          </div>
        </aside>

        <section className="editor-grid relative flex min-h-[720px] items-center justify-center overflow-auto p-6 sm:p-10 lg:min-h-0">
          <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-black/10 bg-[#f4f2ec]/85 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[.15em] text-black/45 backdrop-blur">
            <span className="size-1.5 rounded-full bg-green-500" /> Live preview
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={draft.platform}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="my-12"
            >
              <SocialPreview draft={draft} exportRef={exportRef} />
            </motion.div>
          </AnimatePresence>
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
