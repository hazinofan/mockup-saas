"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { domToPng } from "modern-screenshot";
import {
  Download,
  ImagePlus,
  Move,
  RotateCcw,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "@/components/auth/AuthProvider";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

type Point = { x: number; y: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function MockupEditor({ compact = false }: { compact?: boolean }) {
  const captureRef = useRef<HTMLDivElement>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: Point;
  } | null>(null);

  const [logoUrl, setLogoUrl] = useState("/mockups/sample-logo.svg");
  const [isBlobLogo, setIsBlobLogo] = useState(false);
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const { user, oauthEnabled } = useAuth();

  useEffect(() => {
    return () => {
      if (isBlobLogo && logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl);
    };
  }, [isBlobLogo, logoUrl]);

  const transform = useMemo(
    () =>
      `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale}) rotate(${rotation}deg)`,
    [position, rotation, scale],
  );

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    if (isBlobLogo && logoUrl.startsWith("blob:")) URL.revokeObjectURL(logoUrl);
    const objectUrl = URL.createObjectURL(file);
    setLogoUrl(objectUrl);
    setIsBlobLogo(true);
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setRotation(0);
  };

  const startDrag = (event: ReactPointerEvent<HTMLImageElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: position,
    };
  };

  const moveDrag = (event: ReactPointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    setPosition({
      x: clamp(drag.origin.x + event.clientX - drag.startX, -90, 90),
      y: clamp(drag.origin.y + event.clientY - drag.startY, -100, 100),
    });
  };

  const endDrag = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null;
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
    setRotation(0);
  };

  const exportPng = async () => {
    if (!captureRef.current || exporting) return;

    if (oauthEnabled && !user) {
      setShowAuthGate(true);
      return;
    }

    setExporting(true);
    setShowAuthGate(false);
    try {
      await document.fonts.ready;
      const dataUrl = await domToPng(captureRef.current, {
        scale: compact ? 2.4 : 2.8,
        backgroundColor: "#d7d2c8",
      });
      const link = document.createElement("a");
      link.download = `dropstage-oversized-tee-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      className={`overflow-hidden border border-black/10 bg-[#ebe7de] ${
        compact
          ? "rounded-[26px] shadow-[0_32px_90px_rgba(17,17,15,.14)]"
          : "rounded-[28px] shadow-[0_30px_80px_rgba(17,17,15,.08)]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-black/10 bg-[#f7f4ed]/85 px-3 py-2.5 backdrop-blur-xl sm:px-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#d9ff56] ring-4 ring-[#d9ff56]/20" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
            Live garment studio
          </span>
        </div>
        <span className="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-black/45">
          browser render
        </span>
      </div>

      <div className={`${compact ? "p-3 sm:p-4" : "p-3 sm:p-5"}`}>
        <div
          ref={captureRef}
          className="mockup-stage relative mx-auto aspect-[4/5] w-full max-w-[720px] overflow-hidden rounded-[22px] bg-[#d7d2c8]"
        >
          <div className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(17,17,15,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,.08)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-black/10 bg-[#efebe2]/85 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-black/45 backdrop-blur-md">
            Drop 001 <span className="h-1 w-1 rounded-full bg-black/35" /> Stone
          </div>

          <img
            src="/mockups/tee-base.svg"
            alt="Blank oversized t-shirt mockup"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain"
          />

          <div
            ref={printRef}
            className="absolute left-1/2 top-[43.7%] z-20 h-[31%] w-[37%] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          >
            <img
              src={logoUrl}
              alt="Your uploaded artwork"
              draggable={false}
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="absolute left-1/2 top-1/2 max-h-[64%] w-[72%] touch-none select-none object-contain opacity-[0.86] mix-blend-multiply [filter:contrast(.92)_saturate(.88)]"
              style={{ transform, transformOrigin: "center" }}
            />
          </div>

          <img
            src="/mockups/tee-shading.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute inset-0 z-30 h-full w-full select-none object-contain opacity-80 mix-blend-multiply"
          />
          <img
            src="/mockups/tee-highlights.svg"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="pointer-events-none absolute inset-0 z-40 h-full w-full select-none object-contain opacity-70 mix-blend-screen"
          />

          <div className="pointer-events-none absolute bottom-5 left-5 z-50 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-black/36">
            <Sparkles size={12} /> light + fold compositing
          </div>
        </div>

        <div className={`mt-3 grid gap-2 ${compact ? "grid-cols-[1fr_auto]" : "sm:grid-cols-[1fr_auto]"}`}>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/70 px-4 text-sm font-medium transition hover:bg-white"
          >
            <ImagePlus size={16} /> Upload logo
            <span className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.14em] text-black/35 sm:inline">PNG / WEBP</span>
          </button>
          <input ref={fileRef} type="file" accept="image/png,image/webp,image/jpeg,image/svg+xml" onChange={onFileChange} className="hidden" />
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-white/70 transition hover:bg-white"
            aria-label="Reset artwork"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="rounded-2xl border border-black/10 bg-white/60 px-3 py-2.5">
            <span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-black/45">
              <ZoomIn size={13} /> scale
            </span>
            <input
              type="range"
              min="0.55"
              max="1.65"
              step="0.01"
              value={scale}
              onChange={(event) => setScale(Number(event.target.value))}
              className="range-acid w-full"
            />
          </label>
          <label className="rounded-2xl border border-black/10 bg-white/60 px-3 py-2.5">
            <span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.13em] text-black/45">
              <Move size={13} /> rotate
            </span>
            <input
              type="range"
              min="-18"
              max="18"
              step="1"
              value={rotation}
              onChange={(event) => setRotation(Number(event.target.value))}
              className="range-acid w-full"
            />
          </label>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={exportPng}
          className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#11110f] px-4 text-sm font-semibold text-white transition hover:bg-black"
        >
          <Download size={16} /> {exporting ? "Rendering 2K…" : "Export high-res PNG"}
        </motion.button>

        {showAuthGate ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-3 rounded-2xl border border-black/10 bg-[#d9ff56] p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-xs font-medium leading-5">Sign in once to unlock the export.</p>
            <GoogleSignInButton compact />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
