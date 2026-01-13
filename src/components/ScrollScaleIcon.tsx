"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "ref"> & {
  /** Starting scale at the very top (e.g. 1.08 = 8% bigger) */
  startScale?: number;
  /** Minimum scale after scrolling down (e.g. 1.0 = normal size) */
  endScale?: number;
  /** How many px of scroll to reach the endScale */
  scrollRangePx?: number;
};

export default function ScrollScaleIcon({
  startScale = 1.08,
  endScale = 1.0,
  scrollRangePx = 420,
  className = "",
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

  // Wrapper scales; Image keeps float animation & drop-shadow
  return (
    <div
      style={{ transform: `scale(${scale})` }}
      className="will-change-transform transition-transform duration-150"
    >
      <Image className={className} {...props} />
    </div>
  );
}
