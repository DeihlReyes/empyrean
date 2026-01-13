"use client";

import { useEffect, useMemo, useState } from "react";
import { ContentCard } from "@/components/content-card";
import CustomSolutions from "@/components/custom-solutions";
import Script from "next/script";
import ScrollScaleIcon from "@/components/ScrollScaleIcon";
import Image from "next/image";

const FEATURES = [
  "Central Integrated Database",
  "Real Estate Marketplace",
  "In-App City Group Forums",
  "User-friendly Search and Filter",
  "Easy Claim or Submit Listing",
  "In-App Smooth Messaging",
  "Secured and Verified Transactions",
  "Faster Reporting & Accountability",
  "Access to Value Added Services",
  "24/7 Customer Service",
  "24/7 Partner Admin Support",
];

export default function BrokerAgentDeveloperPage() {
  const screenshots = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + 1),
    []
  );

  const [activeImage, setActiveImage] = useState<number | null>(null);

  const goPrev = () => {
    if (activeImage === null) return;
    const idx = screenshots.indexOf(activeImage);
    setActiveImage(
      screenshots[(idx - 1 + screenshots.length) % screenshots.length]
    );
  };

  const goNext = () => {
    if (activeImage === null) return;
    const idx = screenshots.indexOf(activeImage);
    setActiveImage(screenshots[(idx + 1) % screenshots.length]);
  };

  useEffect(() => {
    if (activeImage === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx > 0 ? goPrev() : goNext();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Start App by Empyrean
        </h1>

        <section className="mb-4">
          <div className="flex justify-center mt-2">
            <ScrollScaleIcon
              src="/assets/startappicon.png"
              alt="Start App by Empyrean"
              width={480}
              height={480}
              priority
              startScale={1.1}
              endScale={1.0}
              scrollRangePx={520}
              className="w-72 md:w-96 lg:w-[420px] h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.32)] float-icon"
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-14 max-w-4xl mx-auto">
          You Access Us, You Access Everyone.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          The First Philippine Real Estate SuperApp
        </h2>

        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Centralising Real Estate starts here. #BetterRealEstate for everyone.
          <br />
          An additional operating system for Practitioners.
        </p>

        <h2 className="text-2xl font-bold text-center mb-6">
          Application Rough Snapshots
        </h2>

        {/* Thumbnail Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {screenshots.map((index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[9/16]">
                  <Image
                    src={`/assets/SS${index}.png`}
                    alt={`Screenshot ${index}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </section>

        <CustomSolutions />
      </div>

      {/* FULLSCREEN MODAL (FIXED SCALING) */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <span className="text-xs text-gray-500">
                SS{activeImage} / {screenshots.length}
              </span>
              <div className="flex gap-2">
                <button onClick={goPrev} className="px-2 py-1 bg-gray-100 rounded">
                  ←
                </button>
                <button onClick={goNext} className="px-2 py-1 bg-gray-100 rounded">
                  →
                </button>
                <button
                  onClick={() => setActiveImage(null)}
                  className="px-2 py-1 bg-gray-900 text-white rounded"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* IMAGE — NOT FULLSCREEN, NO CROP */}
            <div className="flex justify-center items-center bg-white py-4">
              <div className="relative w-[92vw] max-w-[420px] h-[72vh] sm:h-[78vh]">
                <Image
                  src={`/assets/SS${activeImage}.png`}
                  alt={`Screenshot ${activeImage}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="text-xs text-center text-gray-500 py-3 border-t">
              Swipe / Arrow Keys • ESC to close
            </div>
          </div>
        </div>
      )}

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Start App by Empyrean",
            areaServed: "Philippines",
          }),
        }}
      />
    </main>
  );
}
