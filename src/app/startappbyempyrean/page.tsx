import { ContentCard } from "@/components/content-card";
import CustomSolutions from "@/components/custom-solutions";
import { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Start App by Empyrean | Empyrean Real Estate Solutions",
  description: "Learn more about Start App by Empyrean",
  openGraph: {
    title: "Start App by Empyrean | Empyrean Real Estate Solutions",
    description: "Learn more about Start App by Empyrean",
    type: "website",
  },
};

const FEATURES = [
  {
    title: "SuperApp for Philippine Real Estate",
    desc: "One central platform for practitioners and clients — listings, coordination, and support in one place.",
  },
  {
    title: "Central Listing Database",
    desc: "Access a growing inventory across cities, buildings, and units — off and on the market.",
  },
  {
    title: "User-friendly Search and Filter",
    desc: "Find the right listing faster with clean filters by location, building, unit details, and more.",
  },
  {
    title: "Verified Transactions",
    desc: "Brokers are verified. Agents are claimed. Built-in accountability to help protect clients and practitioners.",
  },
  {
    title: "In-App City Groups and Marketplace",
    desc: "City-based forums and a verified marketplace — safer coordination than random social media groups.",
  },
  {
    title: "In-App Messaging",
    desc: "Message directly inside the app to coordinate availability, viewings, and next steps.",
  },
  {
    title: "24/7 Customer Service and Admin Support",
    desc: "Get help anytime — escalations, reporting, and admin support when you need it.",
  },
  {
    title: "Easy Claim or Submit Listing",
    desc: "Claim a listing if you represent it, or submit one to receive inquiries from the market.",
  },
  {
    title: "Faster Reporting and Accountability",
    desc: "Report issues quickly with a clear escalation path — we enforce better practices.",
  },
  {
    title: "Access to Verified Added Services",
    desc: "Tap into vetted services to support transactions and property-related needs.",
  },
];

export default function BrokerAgentDeveloperPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Start App by Empyrean
        </h1>

        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Centralising Real Estate starts here. #BetterRealEstate for everyone.
          <br />
          An additional operating system for Practicioners. In One Central Real
          Estate Platform.
        </p>

        {/* Branding Section */}
        <section className="mb-4">
          <div className="flex justify-center mt-2">
            <Image
              src="/assets/startappicon.png"
              alt="Start App by Empyrean"
              width={480}
              height={480}
              priority
              className="w-72 md:w-96 lg:w-[420px] h-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.32)]"
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-14 max-w-4xl mx-auto">
          You Access Us, You Access Everyone.
        </p>

        <div className="mb-12">
          <ContentCard title="Access to All Property Listings in the Philippines">
            <>
              All listing off and on the market, per city, per street, per
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

        {/* ✅ Features Section (cleaner, less “ugly”, consistent) */}
        <section className="mb-12" aria-label="Start App Features">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">App Features</h2>
            <p className="text-sm md:text-base text-gray-600 mt-2 max-w-3xl mx-auto">
              Built to make real estate coordination faster, safer, and more
              accountable — for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="h-full [&>div]:h-full [&>div]:p-5 md:[&>div]:p-6"
              >
                <ContentCard title={f.title}>
                  <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
                    {f.desc}
                  </p>
                </ContentCard>
              </div>
            ))}
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

        <div className="mt-12">
          <CustomSolutions />
        </div>
      </div>

      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Property Management Services",
            provider: {
              "@type": "Organization",
              name: "Empyrean",
            },
            areaServed: { "@type": "Country", name: "Philippines" },
          }),
        }}
      />
    </main>
  );
}
