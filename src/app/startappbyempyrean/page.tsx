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
          Start App by Empyrean
        </h1>

        <p className="text-sm md:text-base text-center mb-6 max-w-4xl mx-auto">
          Centralising Real Estate starts here. #BetterRealEstate for everyone!
          Practitioners or Clients, for All Key Players.
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
              className="
                w-72 md:w-96 lg:w-[420px] h-auto
                drop-shadow-[0_20px_45px_rgba(0,0,0,0.32)]
              "
            />
          </div>
        </section>

        <p className="text-sm md:text-base text-center mb-14 max-w-4xl mx-auto">
          You Access Us, You Access Everyone.
        </p>

        <div className="mb-12" aria-label="The Business Partnership Offer">
          <ContentCard title="Access to All Property Listings in the Philippines">
            <>
              All listing off and on the market, per city, per street, per
              building, all units. With our{" "}
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

        <div className="mb-12" aria-label="Central Platform for All">
          <ContentCard title="Central Platform">
            <>
              Practicioners go here, clients go here. From the Philippine Real Estate Inventory, you may request availability status and coordiante viewings through our application.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="Verified Transactions">
          <ContentCard title="Verified Transactions">
            <>
              Brokers are verified, agents are claimed. Accountability is in our core values, if you do not have a professional, you will be provided one.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="In-App City-based Groups and Verified Marketplace">
          <ContentCard title="In-App City-based Groups and Verified Marketplace">
            <>
              Exploring in Social Media Groups and Marketplace is dangerous, as central platform, we offer in-app city-based
              group forums, and a very own marketplace. From agent to agent, client to
              agent. This is the central platform for Philippine Real Estate.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="In-App City-based Groups and Verified Marketplace">
          <ContentCard title="Anything wrong? #AccessEmpyrean">
            <>
              Yes. You can finally report to someone. As a broker, as an agent, as a client. We aim to standardise the industry, we aim to promote good practices. You may always contact us!
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
