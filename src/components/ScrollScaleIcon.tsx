"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "ref"> & {
  startScale?: number;     // scale at top (bigger)
  endScale?: number;       // scale after scrolling (smaller)
  scrollRangePx?: number;  // px to reach endScale
};

export default function ScrollScaleIcon({
  startScale = 1.1,
  endScale = 1.0,
  scrollRangePx = 520,
  className = "",
  alt, // ensure alt is explicitly received and passed
  ...props
}: Props) {
  const rafRef = useRef<number | null>(null);
  const [scale, setScale] = useState(startScale);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const y = window.scrollY || 0;
        const t = Math.min(1, Math.max(0, y / scrollRangePx)); // 0 -> 1
        const nextScale = startScale + (endScale - startScale) * t; // shrink

        setScale(nextScale);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [startScale, endScale, scrollRangePx]);

  // Wrapper scales; Image keeps float animation & drop shadow
  return (
    <div style={{ transform: `scale(${scale})` }} className="will-change-transform">
      <Image
        {...props}
        alt={alt ?? ""}  // satisfies jsx-a11y/alt-text even if caller forgets
        className={className}
      />
    </div>
  );
}
