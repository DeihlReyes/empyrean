"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#efefef] text-gray-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Description */}
          <div className="space-y-4">
           <Link href="https://empyrean.ph" target="_blank" rel="noopener noreferrer">
  <Image
    src="/assets/empyrean.png"
    alt="Empyrean Real Estate Solutions"
    width={169}
    height={100}
    className="bg-transparent hover:opacity-80 transition-opacity"
  />
</Link>
            <h2 className="text-gray-850 text-xl font-bold">
              Empyrean Real Estate Solutions
            </h2>
            <p className="text-gray-800 max-w-md">
              Your all-in-one access, a one-stop gateway for all things real estate in the Philippines.
              You access us, you access everyone.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-gray-900 text-lg font-semibold">Contact Us</h3>
            <div className="space-y-1">
              <p className="flex items-center gap-2">
                <a
                  href="mailto:info@empyrean.ph"
                  className="text-gray-800 hover:text-gray-900 transition-colors"
                >
                  info@empyrean.ph
                </a>
              </p>
              <p className="flex items-center gap-2">
                <a
                  href="tel:+639565648765"
                  className="text-gray-800 hover:text-gray-900 transition-colors"
                >
                  +639565648765 (Viber/WhatsApp/Telegram)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gray-800">
                  Salcedo Village, Baranggay Bel-Air, Makati City 1227
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-400">
          <div className="flex items-center justify-between">
            <p className="text-gray-800 text-sm">
              © {new Date().getFullYear()} Empyrean Real Estate Corporation. All
              rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="https://facebook.com/empyreanrealestateph/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/assets/social/facebook.png"
                    alt="Facebook"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com/empyreanrealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/assets/social/instagram.png"
                    alt="Instagram"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://tiktok.com/@thegoodproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="/assets/social/tiktok.png"
                    alt="TikTok"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
