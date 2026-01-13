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

export default function BrokerAgentDeveloperPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Start App by Empyrean!
        </h1>

        {/* reduced spacing below */}
        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Centralising Real Estate starts here. #BetterRealEstate for everyone!
          Practitioners, Clients, and Business Owners.
        </p>

        {/* Branding Section */}
        <section className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            The Empyrean Hospitality Branding
          </h2>

          {/* larger icon + drop shadow */}
          <div className="flex justify-center mt-2">
            <Image
              src="/assets/startappicon.png"
              alt="Start App by Empyrean"
              width={320}
              height={320}
              priority
              className="
                w-56 md:w-72 h-auto
                drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)]
              "
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-14 max-w-4xl mx-auto">
          You Access Us, You Access Everyone.
        </p>

        <div className="mb-12" aria-label="The Business Partnership Offer">
          <ContentCard title="The Business Partnership Offer">
            <>
              Empyrean Hospitality will be managing your property as your
              Official Property Manager. We will maintain and take care of your
              property while maximizing its profitability.
              <br />
              <br />
              Your property will be fixed, courtesy of both the owner and
              Empyrean, according to Empyrean branding and standards. Empyrean
              shall also be responsible for securing decorations and essentials
              for the property should it deem necessary.
              <br />
              <br />
              At Empyrean, we believe that trust is the foundation of every
              partnership. When a property is placed under our care, it becomes
              our full professional responsibility. We respectfully ask that
              day-to-day operational control be entrusted to our team, allowing
              us to manage your property proactively while keeping you fully
              informed through transparent reporting.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="Documents Needed">
          <ContentCard title="Documents Needed">
            <>
              Empyrean Real Estate Corporation and the owner shall execute two (2)
              documents: <strong>The SPA Document</strong> and the{" "}
              <strong>Memorandum of Agreement for Property Management</strong>.
              <br />
              <br />
              The SPA Document serves as official authorization for Empyrean to
              act as Property Manager and perform property management and
              leasing-related actions. The Memorandum of Agreement details the
              business partnership and its specifics.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="The Partnership Setups">
          <ContentCard title="The Partnership Setups">
            <>
              Each property is evaluated individually. Partnership setups are
              offered based on location, demographics, and revenue potential.
              We currently offer three setups: subleasing or 65/35 (utilities
              included). Association dues and real estate taxes are excluded.
              Final setup is subject to mutual agreement.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="Transparency and Reporting">
          <ContentCard title="Transparency and Reporting">
            <>
              We value accountability and transparency. Property owners are
              provided access to a Google Sheet to monitor bookings and payout
              schedules. A centralized platform is currently in development to
              replace this system.
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
                What is Empyrean Property Management and Hospitality?
              </strong>
              <br />
              <br />
              Empyrean’s real estate arm responsible for property management and
              guest accommodation services.
              <br />
              <br />
              <strong>What does Empyrean Property Management do?</strong>
              <br />
              <br />
              A free-of-charge designation that authorizes Empyrean as Official
              Property Manager and keyholder, allowing us to manage, lease, and
              market properties. Maintenance, repair, and cleaning services are
              provided on a quote basis and require a Special Power of Attorney
              (SPA).
              <br />
              <br />
              <strong>What does Empyrean Hospitality do?</strong>
              <br />
              <br />
              A guest accommodation service for short-term leasing that requires
              Property Management and a Memorandum of Agreement.
            </p>
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-16 max-w-4xl mx-auto">
          We’re glad to have you with us. For questions or feedback, please
          contact your Relationship Manager or reach us through our official
          channels.
          <br />
          <br />
          Upwards and onwards, Empyreans!
        </p>

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
