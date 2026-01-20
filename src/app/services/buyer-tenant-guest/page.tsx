import ContactForm from "@/components/contact-form";
import { ContentCard } from "@/components/content-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Looking Client Services | Empyrean Real Estate Solutions",
  description:
    "Find your perfect property with Empyrean. We provide comprehensive real estate services for buyers and tenants, ensuring accountability throughout your transaction.",
  openGraph: {
    title: "Looking Client Services | Empyrean Real Estate Solutions",
    description:
      "Experience exceptional real estate services with Empyrean. We're with you before, during, and after your transaction, ensuring your requirements are met.",
    type: "website",
  },
};

export default function BuyerTenantGuestPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          WHY DEAL WITH AN EMPYREAN?
        </h1>

        <p className="text-[14px] md:text-lg text-center mb-16 max-w-4xl mx-auto">
          Regardless of the nationality, the location, the type of deal, and its price,
          whoever all associated persons are: Property Owner, Broker, or Agent,{" "}
          <span className="font-bold">you deserve accountability</span> and a
          company that will be with you before, during, and most especially
          after your real estate transaction.
        </p>

        <div className="mb-16" aria-label="Service Benefits">
          <ContentCard
            title="Your Requirements Matter."
            description="Send us your information and requirements, we'll tap everything we can reach to find a property that matches your budget, personality, lifestyle, and preferences!"
          />
        </div>

                <div className="space-y-12 mb-10">
          <ContentCard title="Empyrean Professional Services (Complementary and Add-On)">
            <>
              We are dedicated to being your one-stop gateway to the Real Estate
              Industry. We are committed to providing you real estate solutions.
              We cultivate <strong>Empyrean Business Network</strong> and{" "}
              <strong>Empyrean Professional Circles</strong> should you need any
              more related services pertaining to your property. Empyrean offers in-house and partner services that deliver an
              Empyrean-grade standard—from deep cleaning, regular maintenance,
              repairs, and even home renovations and improvements. We got your
              back!
              <br />
              <br />
              You can tap us for an inquiry or a quote, and we&apos;ll assign a
              fitting partner for you according to your background,
              requirements, and needs. You just access us, you will access
              everyone.
            </>
          </ContentCard>
        </div>

   <p className="text-[14px] md:text-lg text-center mb-16 max-w-4xl mx-auto">
          You will be assigned an <span className="font-bold">Empyrean Relationship Manager</span> to search the market for you with our In-House Sellers and our Broker Circle to get started. They shall also be the one responsible in handling your account with us and attend to all your inquiries in accessing our Business Network and Professional Circles or any concerns regarding your properties.
        </p>
        
        <div className="mb-16" aria-label="Contact Form Section">
          <div className="border border-gray-300 rounded-lg p-8 md:p-12 max-w-5xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Real Estate Buyer and Tenant Services",
            provider: {
              "@type": "Organization",
              name: "Empyrean",
            },
            description:
              "Comprehensive real estate services for buyers and tenants, ensuring accountability throughout your transaction.",
            offers: {
              "@type": "Offer",
              category: "Real Estate Services",
              description:
                "We provide end-to-end support for buyers and tenants, from property search to transaction completion and beyond.",
            },
            serviceType: [
              "Property Search",
              "Real Estate Consultation",
              "Transaction Support",
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
