"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "ref"> & {
  /** Max extra scale added by scrolling (e.g. 0.06 = up to 6% bigger) */
  maxScaleIncrease?: number;
  /** How many px of scroll to reach max scale */
  scrollRangePx?: number;
};

export default function ScrollScaleIcon({
  maxScaleIncrease = 0.06,
  scrollRangePx = 420,
  className = "",
  ...props
}: Props) {
  const rafRef = useRef<number | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;

        const y = window.scrollY || 0;
        const t = Math.min(1, Math.max(0, y / scrollRangePx));
        const nextScale = 1 + maxScaleIncrease * t;

        setScale(nextScale);
      });
    };

    onScroll(); // initialize
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [maxScaleIncrease, scrollRangePx]);

  /**
   * IMPORTANT:
   * - Float animation uses transform on the Image element.
   * - Scroll scaling also needs transform.
   * So we apply scale on a WRAPPER div, and keep float on the Image itself.
   */
  return (
    <div
      style={{ transform: `scale(${scale})` }}
      className="transition-transform duration-150 will-change-transform"
    >
      <Image className={className} {...props} />
    </div>
  );
}
