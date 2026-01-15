"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ContentCard } from "@/components/content-card";
import Script from "next/script";
import ScrollScaleIcon from "@/components/ScrollScaleIcon";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// ✅ Icons
import {
  Database,
  Store,
  Users,
  Search,
  Upload,
  MessageCircle,
  ShieldCheck,
  MessageSquareWarning,
  Headphones,
  UserCog,
  History,
  FileSignature,
  Sparkles,
  Star,
  UserCheck,
  Home,
  CreditCard,
  ClipboardList,
  BadgeCheck,
  Compass,
} from "lucide-react";

type FeatureItem = {
  label: string;
  icon: React.ElementType;
  comingSoon?: boolean;
};

type FeatureGroup = {
  title: string;
  subtitle?: string;
  items: FeatureItem[];
};

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Explore",
    items: [
      { label: "Central Integrated Database", icon: Database },
      { label: "Real Estate Marketplace", icon: Store },
      { label: "In-App City Group Forums", icon: Users },
      { label: "User-friendly Search & Filter", icon: Search },
      { label: "Easy Claim or Submit Listing", icon: Upload },
      { label: "24/7 Partner Admin Support", icon: UserCog },
      { label: "See Agent History and Current Company", icon: History },
    ],
  },
  {
    title: "Transact",
    items: [
      { label: "Wide-variety of Verified Agents", icon: BadgeCheck },
      { label: "Explore Agents", icon: Compass },
      { label: "In-App Smooth Messaging", icon: MessageCircle },
      { label: "Secured & Verified Transactions", icon: ShieldCheck },
      { label: "Faster Reporting & Accountability", icon: MessageSquareWarning },
      { label: "Review Agents", icon: UserCheck },


      // 🔜 Coming Soon (moved here)
      { label: "Pay through Credit Card", icon: CreditCard, comingSoon: true },
    ],
  },
  {
    title: "Live",
    items: [
      { label: "Manage Current Lease", icon: FileSignature },
      { label: "Access to other Professional Services", icon: Sparkles },
      { label: "Review Landlords", icon: Home },
      { label: "Review Property", icon: Star },
      { label: "24/7 Customer Service", icon: Headphones },

      // 🔜 Coming Soon
      { label: "Lease Administration", icon: ClipboardList, comingSoon: true },

    ],
  },
];

export default function BrokerAgentDeveloperPage() {
  const screenshots = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + 1),
    []
  );

  const [activeImage, setActiveImage] = useState<number | null>(null);

  const goPrev = useCallback(() => {
    setActiveImage((current) => {
      if (current === null) return null;
      const idx = screenshots.indexOf(current);
      return screenshots[(idx - 1 + screenshots.length) % screenshots.length];
    });
  }, [screenshots]);

  const goNext = useCallback(() => {
    setActiveImage((current) => {
      if (current === null) return null;
      const idx = screenshots.indexOf(current);
      return screenshots[(idx + 1) % screenshots.length];
    });
  }, [screenshots]);

  // Keyboard navigation: ESC closes, arrows navigate
  useEffect(() => {
    if (activeImage === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage, goNext, goPrev]);

  // Simple touch swipe on the modal
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const dx = endX - touchStartX;
    const dy = endY - touchStartY;

    // horizontal swipe only
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) goPrev();
      else goNext();
    }

    setTouchStartX(null);
    setTouchStartY(null);
  };

  const totalFeatures = useMemo(
    () => FEATURE_GROUPS.reduce((sum, g) => sum + g.items.length, 0),
    []
  );

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Start App by Empyrean
        </h1>

        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Your Real Estate Journey, in one place.
        </p>

        {/* Branding Section */}
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
              className="
                w-72 md:w-96 lg:w-[420px] h-auto
                drop-shadow-[0_20px_45px_rgba(0,0,0,0.32)]
                float-icon
              "
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-8 max-w-4xl mx-auto">
          One Real Estate System where properties, practitioners, clients, and
          all transactions live.
          <br />
          <br />
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          The Philippine Real Estate in your pocket.
        </h2>

        <div className="mb-12">
          <ContentCard title="Access to All Property Listings in the Philippines">
            <>
              All listings off and on the market, per city, per street, per
              building, all units. Easier search, easier filter. With our{" "}
              <strong>Philippine Real Estate Inventory</strong>. You&apos;d only
              need to submit or claim a property listing to receive inquiries
              from other practitioners and clients!
              <br />
              <br />
              You may also access the Inventory below.
              <div className="flex justify-end mt-4">
                <a
                  href="https://empyrean.ph/philippinerealestateinventory"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                >
                  Philippine Real Estate Inventory
                </a>
              </div>
            </>
          </ContentCard>
        </div>

        {/* ✅ Features Board (3 divisions) */}
        <section className="mb-12" aria-label="Start App Features">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="text-base md:text-lg font-bold text-gray-900">
                Feature Board
              </div>

              {/* 🔼 increased font size for “features” */}
              <div className="text-sm md:text-base font-semibold text-gray-600">
                {totalFeatures} features
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {FEATURE_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-bold text-gray-900">
                      {group.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {group.items.length}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {group.items.map(({ label, icon: Icon, comingSoon }) => (
                      <div
                        key={label}
                        className={`
                          group flex items-center gap-4
                          rounded-xl border px-4 py-3
                          transition
                          ${
                            comingSoon
                              ? "bg-gray-100 border-dashed border-gray-300 text-gray-400 cursor-not-allowed"
                              : "bg-white border-gray-200 hover:shadow-sm"
                          }
                        `}
                      >
                        <div
                          className={`
                            flex items-center justify-center
                            w-9 h-9 rounded-lg border
                            ${
                              comingSoon
                                ? "bg-gray-50 border-gray-300 text-gray-400"
                                : "bg-gray-50 border-gray-200 text-gray-700 group-hover:text-gray-900"
                            }
                          `}
                          aria-hidden="true"
                        >
                          <Icon size={18} strokeWidth={1.75} />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm md:text-[15px] font-medium text-gray-800">
                            {label}
                          </span>

                          {comingSoon && (
                            <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                              Coming soon
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <h2 className="text-2xl font-bold text-center mb-6">
          Application Rough Snapshots V1
        </h2>

        {/* Clickable Collage */}
        <section className="mb-16">
          <div className="relative mx-auto max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {screenshots.map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  className="
                    relative rounded-2xl overflow-hidden
                    border border-gray-200 bg-white
                    shadow-md hover:shadow-xl
                    transition-transform duration-300
                    hover:-translate-y-1
                    focus:outline-none
                  "
                >
                  <div className="relative w-full aspect-[9/16] bg-white">
                    <Image
                      src={`/assets/SS${index}.png`}
                      alt={`Start App Screenshot ${index}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.endsWith(`SS${index}.jpg`)) {
                          target.src = `/assets/SS${index}.jpg`;
                        }
                      }}
                    />
                  </div>

                  <div className="px-3 py-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">SS{index}</div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Tip: Swipe left/right in the fullscreen viewer to browse
              screenshots.
            </p>
          </div>
        </section>

        <div className="mb-12">
          <ContentCard title="Anything wrong? #AccessEmpyrean">
            <>
              Yes. You can finally report to someone.
              <br />
              <br />
              As a broker, as an agent, as a client. We aim to standardise the
              industry, we aim to promote good practices. You may always contact
              us!
            </>
          </ContentCard>
        </div>

        {/* FAQs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Frequently Asked Questions
          </h2>

          <div className="bg-white border border-gray-300 rounded-lg p-8 md:p-12 text-gray-700 text-justify">
            <p>
              <strong>
                How is Start App different from other listing websites?
              </strong>
              <br />
              <br />
              We aim to become the Philippine Infrustructure for Philippine Real
              Estate. From accomplishing the inventory to handling ongoing
              contracts. The central platform, the Philippine&apos;s first public
              multi-listing service complemented with a program for
              practitioners and clients. Simply put, we aim to become the
              backbone of Real Estate Operations in the Philippines.
              <br />
              <br />
              <strong>
                I am a Real Estate Practitioner. How can this app help me?
              </strong>
              <br />
              <br />
              You get to have access to all property listings in our database
              integrated from multiple sources. No need to go to facebook, or
              post online (or you still may). Eitherway, the app will empower
              you further! Close deals faster.
              <br />
              <br />
              <strong>I am a Real Estate Practitioner. How can I sign up?</strong>
              <br />
              <br />
              We require our Brokers to verify their account. Simply create an
              account and submit the requirements. Same for agents, only that
              they must be claimed by respective brokers through an Empyrean
              Code we will provide them.
              <br />
              <br />
              <strong>I am a freelance agent. How can I sign up?</strong>
              <br />
              <br />
              We require all practicing agents to urge their brokers to sign up
              and access our platform for coordination.
              <br />
              <br />
              <strong>I am a Client. How can I sign up?</strong>
              <br />
              <br />
              Simply create an account in our app to begin coordination. Most of
              our listings will be claimed by a professional. If your
              transaction is direct to owner, we will provide you one.
              <br />
              <br />
            </p>
          </div>
        </section>

        {/* ✅ FIX B: Button ALWAYS visible on the page */}
        <div className="flex justify-center mb-14">
          <Button
            asChild
            className="bg-[#494949] hover:bg-[#494949]/80 text-white rounded-full py-6 px-12"
          >
            <a
              href="https://form.jotform.com/260127945833461"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join our Waiting List
            </a>
          </Button>
        </div>

        {/* Fullscreen Modal Viewer */}
        {activeImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot viewer"
          >
            <div
              className="relative w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Header / Controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="text-xs text-gray-500">
                  SS{activeImage} / {screenshots.length}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 transition"
                    aria-label="Previous screenshot"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 transition"
                    aria-label="Next screenshot"
                  >
                    →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage(null)}
                    className="px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-black transition"
                    aria-label="Close viewer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal image sizing */}
              <div className="flex items-center justify-center bg-white py-4">
                <div className="relative w-[92vw] max-w-[420px] h-[72vh] sm:h-[78vh]">
                  <Image
                    src={`/assets/SS${activeImage}.png`}
                    alt={`Start App Screenshot ${activeImage}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 92vw, 420px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.endsWith(`SS${activeImage}.jpg`)) {
                        target.src = `/assets/SS${activeImage}.jpg`;
                      }
                    }}
                  />
                </div>
              </div>

              {/* Footer hint */}
              <div className="px-4 py-3 border-t border-gray-100 text-center">
                <div className="text-xs text-gray-500">
                  Swipe left/right or use arrow keys to navigate
                </div>
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
              name: "Property Management Services",
              provider: { "@type": "Organization", name: "Empyrean" },
              description:
                "Comprehensive property management services including maintenance, leasing, and sales.",
              offers: {
                "@type": "Offer",
                category: "Property Management",
                description:
                  "End-to-end real estate solutions including keyholding, leasing, and maintenance.",
              },
              serviceType: [
                "Property Management",
                "Maintenance Services",
                "Property Leasing",
                "Property Sales",
              ],
              areaServed: { "@type": "Country", name: "Philippines" },
            }),
          }}
        />
      </div>
    </main>
  );
}
