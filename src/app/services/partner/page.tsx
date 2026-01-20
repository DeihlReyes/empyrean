import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/Marquee";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner | Empyrean Real Estate Solutions",
  description:
    "Partner with Empyrean for more opportunities. We work with several individuals and firms to bring quality properties to market.",
  openGraph: {
    title: "Partner | Empyrean Real Estate Solutions",
    description:
      "Connect with Empyrean's network of premium real estate developers. We partner with industry leaders to deliver exceptional properties and development opportunities.",
    type: "website",
  },
};

export default function PartnerPage() {
  const partners = [
    {
      name: "Ms. Joy",
      image: "/assets/partners/msjoyph.jpeg",
    },
    {
      name: "Remax One",
      image: "/assets/partners/remaxone.jpg",
    },
    {
      name: "PHRCS",
      image: "/assets/partners/remaxone.jpg",
    },
  ];

  const morePartners = [
    {
      name: "Vista Land",
      image: "/assets/partners/vistaland.png",
    },
    {
      name: "DMCI Homes",
      image: "/assets/partners/dmci.png",
    },
    {
      name: "Filinvest",
      image: "/assets/partners/filinvest.png",
    },
    {
      name: "Ortigas Land",
      image: "/assets/partners/ortigas.png",
    },
    {
      name: "Robinsons Land",
      image: "/assets/partners/robinsons.png",
    },
    {
      name: "SM Prime",
      image: "/assets/partners/smprime.png",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* First Developer Section */}
        <section className="mb-20" aria-label="Developer Partners">
          <h1 className="text-2xl font-bold text-center mb-12">
            OUR DEVELOPER PARTNERS
          </h1>
          <Marquee speed={50}>
            {partners.map((partner) => (
              <Image
                key={partner.name}
                src={partner.image}
                alt={`${partner.name} - Real Estate Developer Partner`}
                width={300}
                height={300}
                className="object-contain"
              />
            ))}
          </Marquee>
        </section>

        {/* Second Developer Section with different images */}
        <section className="mb-20" aria-label="More Developer Partners">
          <h1 className="text-2xl font-bold text-center mb-12">
            OUR DEVELOPER PARTNERS
          </h1>
          <Marquee speed={50}>
            {morePartners.map((partner) => (
              <Image
                key={partner.name}
                src={partner.image}
                alt={`${partner.name} - Real Estate Developer Partner`}
                width={300}
                height={300}
                className="object-contain"
              />
            ))}
          </Marquee>
        </section>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            asChild
            className="bg-[#494949] hover:bg-[#494949]/80 text-white rounded-full py-6 px-12"
          >
            <Link href="/contact-us">PARTNER WITH US TODAY!!</Link>
          </Button>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Real Estate Developer Services",
            provider: {
              "@type": "Organization",
              name: "Empyrean",
            },
            description:
              "Partner with Empyrean for real estate development services. We collaborate with leading developers to bring quality properties to market.",
            offers: {
              "@type": "Offer",
              category: "Real Estate Development",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Developer Partners",
              itemListElement: [...partners, ...morePartners].map(
                (partner, index) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Organization",
                    name: partner.name,
                  },
                  position: index + 1,
                })
              ),
            },
          }),
        }}
      />
    </main>
  );
}
