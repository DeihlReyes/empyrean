import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";

const cinzel = Cinzel({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Empyrean Real Estate Solutions - Your one-stop access to Philippine Real Estate",
  description:
    "Empyrean is a one-stop gateway for all things real estate in the Philippines. Backed by strong branding, an established system, and a built-in accountability in its name, the company delivers a seamless, transparent, and results-oriented service-based experience.",
  keywords:
    "real estate, real estate solutions, brokerage, property management, consulting",
  authors: [{ name: "Empyrean" }],
  creator: "Empyrean",
  publisher: "Empyrean",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://empyrean.ph",
    title:
      "Empyrean Real Estate Solutions - Your one-stop access to Philippine Real Estate",
    description:
      "Empyrean is a one-stop gateway for all things real estate in the Philippines. Backed by strong branding, an established system, and a built-in accountability in its name, the company delivers a seamless, transparent, and results-oriented service-based experience.",
    siteName: "Empyrean",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Empyrean Real Estate Solutions - Your one-stop access to Philippine Real Estate",
    description:
      "Empyrean is a company you can always get back to for all-things Real Estate in the Philippines.",
    creator: "@empyrean",
  },
  viewport: "width=device-width, initial-scale=1",
  verification: {
    google: "your-google-site-verification", // Replace with your actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${lora.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
