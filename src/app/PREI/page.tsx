import { ContentCard } from "@/components/content-card";
import CustomSolutions from "@/components/custom-solutions";
import { Metadata } from "next";
import PREITable from "@/components/PREITable";

export const metadata: Metadata = {
  title: "Philippine Real Estate Inventory | Empyrean Real Estate Solutions",
  description: "View all Property Listings in the Philippine Real Estate Market",
  openGraph: {
    title: "Philippine Real Estate Inventory | Empyrean Real Estate Solutions",
    description: "View all Property Listings in the Philippine Real Estate Market.",
    type: "website",
  },
};

export default function PropertyOwnerPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          The Philippine Real Estate Inventory
        </h1>

        <p className="text-[14px] md:text-lg text-center mb-16 max-w-4xl mx-auto">
          Access all Property Listings in the Philippines across multiple Real
          Estate Brokers and Agents.
        </p>

        {/* ✅ PREI Table (Supabase-powered) */}
        <div className="w-full mb-12">
          <PREITable />
        </div>

        {/* Check Availability / Schedule Viewing CTA */}
        <div className="mb-12" aria-label="Check Availability and Schedule a Viewing">
          <ContentCard title="Check Availability and Schedule a Viewing">
            <>
              Please take note of the listing code and join our dedicated channel to
              check on a property&apos;s availability and schedule a viewing. You may
              also join us as an Official Sales Partner (firms, freelancers, and agents){" "}
              <strong>for higher commission share!</strong> Contact us for partnership.
              <div className="flex flex-wrap justify-start gap-4 mt-4">
                <a
                  href="https://chat.whatsapp.com/C7Pr6gAcFxeH9dM0f6f8lO"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                >
                  Check Availability and Schedule a Viewing
                </a>

                <a
                  href="https://www.empyrean.ph/contact-us"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                >
                  Join as an Official Sales Partner
                </a>
              </div>
            </>
          </ContentCard>
        </div>

        {/* Smaller “continuously improving” paragraph */}
        <p className="text-[12px] sm:text-[14px] md:text-sm text-center mb-16 max-w-4xl mx-auto">
          We are continuously improving, expanding, and completing this inventory for
          all our partners. We appreciate your continued business partnership with us.
        </p>

        {/* Custom Solutions Section */}
        <div className="mt-12">
          <CustomSolutions />
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
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
              "Comprehensive property management services including maintenance, leasing, and sales through our extensive network.",
            offers: {
              "@type": "Offer",
              category: "Property Management",
              description:
                "Complete Real Estate Solutions including maintenance, keyholding, leasing, and sales services.",
            },
            serviceType: [
              "Property Management",
              "Maintenance Services",
              "Property Sales",
              "Property Leasing",
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
