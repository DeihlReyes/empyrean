import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { Button } from "@/components/ui/button";
import CustomSolutions from "@/components/custom-solutions";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Property Owner Services | Empyrean Real Estate Solutions",
  description:
    "Maximize your property's potential with Empyrean. We offer comprehensive property management services, from maintenance to brokerage, ensuring effective market placement.",
  openGraph: {
    title: "Property Owner Services | Empyrean Real Estate Solutions",
    description:
      "Access our extensive network of in-house sellers and incentivized brokers. We provide complete Real Estate Solutions for maintenance, leasing, and sales.",
    type: "website",
  },
};

export default function PropertyOwnerPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          YOU ACCESS US, YOU ACCESS EVERYONE.
        </h1>

        <p className="text-[14px] md:text-lg text-center mb-16 max-w-4xl mx-auto">
          A true one-stop shop for all things real estate. More than just
          handling your property, maintenance, profit and brokering, from legal
          and compliances with relevant authorities, Empyrean Real Estate
          Solutions can be your access to everyone, backed with our brand&apos;s
          core values.
        </p>

        <div
          className="mb-12"
          aria-label="Empyrean Property Management Services"
        >
          <ContentCard title="Empyrean Property Management Services">
            <>
              You can authorise us as your SPA to hold the key of the unit for
              you <strong>for free.</strong> Plus, you get to make sure that
              your property will be maintained. You don&apos;t have to worry
              about anything! With our{" "}
              <strong>Empyrean Professional Services</strong> below, any of your
              legal and compliance, cleaning, maintenance and repair needs are
              covered.
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="Empyrean Hospitality Services">
          <ContentCard title="Empyrean Hospitality Services">
            <>
              When you partner with us. With our strong branding and strategic
              approaches, we can put up your property open for short-term
              leasing. Not just <strong>Airbnb</strong>. We will also put up
              your property to several booking platforms like{" "}
              <strong>Agoda</strong> and <strong>Booking.com</strong>, etc. to
              maximise Property Profitability in an attractive profit-sharing
              setup.
              <br />
              <br />
              You may visit our Empyrean Hospitality Page below.
              
<div className="flex justify-end mt-4">
                <a
                  href="https://empyrean.ph/hospitality-partner"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm hover:bg-gray-300 transition"
                >
                  Become a Hospitality Business Partner
                </a>
              </div>
            </>
          </ContentCard>
        </div>

        <div className="mb-12" aria-label="Brokerage Services">
          <ContentCard title="Empyrean Brokerage Services and the Empyrean Broker Circle">
            <>
              When you decide to put up your property for lease or for sale, you
              can utilise our <strong>In-House Agents</strong> as well as our{" "}
              <strong>Sales Partners</strong>. These Sales Partners are not
              within Empyrean but have partnered with us to market your property
              more effectively! When you enlist with Empyrean,{" "}
              <strong>You get to enlist with everyone</strong> through our
              Incentivised Broker Circle.
              <br />
              <br />
              Upon eligibility and with your approval, your property may also be
              featured in our following organic lead generation channels (among
              others we also utilise):
              <br />
              <br />
              <a
                href="https://www.tiktok.com/@thegoodproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-800"
              >
                Manila Luxury Real Estate
              </a>{" "}
              and{" "}
              <a
                href="https://www.tiktok.com/@budgetrealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-800"
              >
                Budget Real Estate
              </a>{" "}
              on TikTok.
            </>
          </ContentCard>
        </div>

        <div className="space-y-12 mb-10">
          <ContentCard title="Empyrean Professional Services (Complementary or Add-On)">
            <>
              We are dedicated to being your one-stop gateway to the Real Estate
              Industry. We are committed to providing you real estate solutions.
              We cultivate <strong>Empyrean Business Network</strong> and{" "}
              <strong>Empyrean Professional Circles</strong> should you need any
              more related services pertaining to your property. Empyrean offers
              in-house and partner services that deliver an Empyrean-grade
              standard—from deep cleaning, regular maintenance, repairs, and
              even home renovations and improvements. We got your back!
              <br />
              <br />
              You can tap us for an inquiry or a quote, and we&apos;ll assign a
              fitting partner for you according to your background,
              requirements, and needs. You just access us, you will access
              everyone.
            </>
          </ContentCard>
        </div>

        {/* OUR APPROACH Section */}
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">OUR APPROACH</h2>
          <div className="w-full">
            <Image
              src="/assets/our-approach-new.png"
              alt="Our approach"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>

        <p className="text-[14px] md:text-lg text-center mb-16 max-w-4xl mx-auto">
          You will be assigned an{" "}
          <span className="font-bold">Empyrean Relationship Manager</span> to
          keep track of your properties&apos; performance with us. They shall be
          the one responsible in handling your account with us and attend to all
          your inquiries in accessing our Business Network and Professional
          Circles or any concerns regarding your properties.
          <br />
          <br />
          With Empyrean, you&apos;d have our guarantee that we will reflect our
          core values in all our transactions: we are simple, we are competent,
          we are accountable, and we are setting a quality standard. We are
          centralising Real Estate so it doesn&apos;t have to be complicated for
          you. Your effective Real Estate Solutions, on us.
        </p>

        {/* Button with adjusted spacing */}
        <div className="flex justify-center my-12">
          <Button
            asChild
            className="bg-[#494949] hover:bg-[#494949]/80 text-white rounded-full py-6 px-12"
          >
            <Link href="/contact-us">Enlist with Empyrean</Link>
          </Button>
        </div>

        <div className="mt-12">
          <CustomSolutions />
        </div>
      </div>

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
