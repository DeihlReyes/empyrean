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
  "Central Integrated Database",
  "Real Estate Marketplace",
  "In-App City Group Forums",
  "User-friendly Search and Filter",
  "Easy Claim or Submit Listing",
  "In-App Smooth Messaging",
  "Secured and Verified Transactions",
  "Faster Reporting & Accountability",
  "24/7 Customer Service",
  "24/7 Partner Admin Support",
  "Access to Value Added Services",
];

export default function BrokerAgentDeveloperPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* ================= HERO ================= */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Start App by Empyrean
        </h1>

        {/* Branding Section */}
        <section className="mb-4">
          <div className="flex justify-center mt-2">
            <Image
              src="/assets/startappicon.png"
              alt="Start App by Empyrean"
              width={480}
              height={480}
              priority
              className="w-72 md:w-96 lg:w-[420px] h-auto float-icon"
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-14 max-w-4xl mx-auto">
          You Access Us, You Access Everyone.
        </p>

        {/* ================= INTRO ================= */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          The First Philippine Real Estate SuperApp
        </h2>

        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Centralising Real Estate starts here. #BetterRealEstate for everyone.
          <br />
          An additional operating system for Practitioners. In One Central Real
          Estate Platform.
        </p>

        {/* ================= INVENTORY ================= */}
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

        {/* ================= FEATURES ================= */}
        <section className="mb-12" aria-label="Start App Features">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="text-sm font-semibold text-gray-900">
                Feature Board
              </div>
              <div className="text-xs text-gray-500">
                {FEATURES.length} features
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FEATURES.map((label) => (
                <div
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 hover:bg-white hover:shadow-sm transition"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-gray-400 group-hover:bg-gray-700 transition" />
                  <div className="text-sm md:text-[15px] font-medium text-gray-800 leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= REPORTING ================= */}
        <div className="mb-12">
          <ContentCard title="Anything wrong? #AccessEmpyrean">
            <>
              Yes. You can finally report to someone.
              <br />
              <br />
              As a broker, as an agent, as a client — we aim to standardise the
              industry and promote good practices. You may always contact us.
            </>
          </ContentCard>
        </div>

        {/* ================= FAQ ================= */}
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
              We are not just another listing website. We aim to become the
              Philippines&apos; first public multi-listing service complemented
              with a central platform for both practitioners and clients.
              <br />
              <br />

              <strong>
                I am a Real Estate Practitioner. How can this app help me?
              </strong>
              <br />
              <br />
              You gain access to all property listings integrated from multiple
              sources.
              <br />
              <br />

              <strong>
                I am a Real Estate Practitioner. How can I sign up?
              </strong>
              <br />
              <br />
              Brokers must verify their accounts. Agents must be claimed by
              brokers using an Empyrean Code.
              <br />
              <br />

              <strong>
                I am a freelance agent. How can I sign up?
              </strong>
              <br />
              <br />
              We require brokers to be onboarded for coordination.
              <br />
              <br />

              <strong>I am a Client. How can I sign up?</strong>
              <br />
              <br />
              Simply create an account in the app to begin.
            </p>
          </div>
        </section>

        {/* ================= FOOTER CTA ================= */}
        <p className="text-sm md:text-base text-center mb-16 max-w-4xl mx-auto">
          We’re glad to have you with us.
          <br />
          <br />
          Upwards and onwards, Empyreans!
        </p>

        <div className="mt-12">
          <CustomSolutions />
        </div>
      </div>

      {/* ================= STRUCTURED DATA ================= */}
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
            areaServed: {
              "@type": "Country",
              name: "Philippines",
            },
          }),
        }}
      />
    </main>
  );
}
