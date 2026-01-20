"use client";

import ContactForm from "@/components/contact-form";
import Link from "next/link";
import Image from "next/image";

export default function ContactUsPage() {
  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col md:flex-row">
      {/* Left: Info */}
      <section className="bg-[#494949] text-white flex flex-col justify-center items-start px-8 md:px-16 py-16 md:w-1/2 w-full">
        <div className="max-w-md w-full">
          <h1 className="font-cinzel text-3xl md:text-4xl font-bold mb-4 leading-tight">
            WE&lsquo;D LOVE TO
            <br />
            HEAR FROM YOU
          </h1>
          <p className="font-lora text-lg mb-8">
            Please tell us about yourself and share how we can assist or sort
            things for you.
          </p>
          <h2 className="font-cinzel text-2xl font-bold mb-4">GET IN TOUCH</h2>
          <div className="space-y-4">
            <div>
              <p className="font-lora text-lg font-semibold mb-1">Phone</p>
              <a
                href="tel:+639565648765"
                className="font-lora text-lg hover:text-gray-300"
              >
                +639565648765
              </a>
            </div>
            <div>
              <p className="font-lora text-lg font-semibold mb-1">Email</p>
              <a
                href="mailto:info@empyrean.ph"
                className="font-lora text-lg hover:text-gray-300"
              >
                info@empyrean.ph
              </a>
            </div>
            <div>
              <p className="font-lora text-lg font-semibold mb-1">Address</p>
              <p className="font-lora text-lg">
                Salcedo Village, Baranggay Bel-Air, Makati City 1227
              </p>
            </div>
            <div>
              <p className="font-lora text-lg font-semibold mb-3">Follow Us</p>
              <div className="flex items-center gap-6">
                <Link
                  href="https://facebook.com/empyreanrealestatesolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/assets/social/facebook.png"
                      alt="Facebook"
                      fill
                      className="object-contain bg-transparent"
                    />
                  </div>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="https://instagram.com/empyrean.res"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/assets/social/instagram.png"
                      alt="Instagram"
                      fill
                      className="object-contain bg-transparent"
                    />
                  </div>
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link
                  href="https://tiktok.com/@thegoodproperties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="/assets/social/tiktok.png"
                      alt="TikTok"
                      fill
                      className="object-contain bg-white rounded-full"
                    />
                  </div>
                  <span className="sr-only">TikTok</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Right: Form */}
      <section className="flex-1 flex items-center justify-center bg-white px-4 md:px-16 py-16">
        <div className="w-full max-w-xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
