"use client";

import { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

/**
 * Local source component following the React Bits copy-in philosophy:
 * the effect lives in our repo instead of a runtime UI dependency.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(199, 255, 63, 0.18)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--spot-x": "50%",
          "--spot-y": "50%",
          "--spot-color": spotlightColor,
          backgroundImage:
            "radial-gradient(500px circle at var(--spot-x) var(--spot-y), var(--spot-color), transparent 42%)",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
