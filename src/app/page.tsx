import HeroSection from "@/components/hero/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Empyrean Real Estate Solutions",
  description:
    "Empyrean is a one-stop gateway for all things real estate in the Philippines. Backed by strong branding, an established system, and a built-in accountability in its name, the company delivers a seamless, transparent, and results-oriented service-based experience.",
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <article>
        <HeroSection />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Empyrean",
            url: "https://empyrean.ph",
            description:
              "Empyrean is a one-stop gateway for all things real estate in the Philippines. Backed by strong branding, an established system, and a built-in accountability in its name, the company delivers a seamless, transparent, and results-oriented service-based experience.",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://empyrean.ph/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </main>
  );
}
