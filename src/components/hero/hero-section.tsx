"use client";

import { useRef } from "react";
import Link from "next/link";
import CategorySection from "./category-section";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Create transforms for different elements
  const headerOpacity = useTransform(
    scrollY,
    [0, 20, 100], // Adjust these values based on when you want elements to disappear
    [1, 0.5, 0]
  );

  const subheaderOpacity = useTransform(
    scrollY,
    [0, 10, 90], // Subheader disappears slightly earlier
    [1, 0.5, 0]
  );

  const buttonOpacity = useTransform(
    scrollY,
    [0, 10, 80], // Button disappears slightly later
    [1, 0.5, 0]
  );

  // Parallax effect for background
  const bgY = useTransform(
    scrollY,
    [0, 1000],
    [0, 150] // Adjust these values to control parallax intensity
  );

  // Zoom effect for background
  const bgScale = useTransform(
    scrollY,
    [0, 500],
    [1, 1.5] // Start at scale 1, zoom to 1.2 as user scrolls
  );

  return (
    <section className="w-full">
      <div
        ref={heroSectionRef}
        className="flex flex-col items-center justify-center h-[calc(100vh-6rem)] relative overflow-hidden"
      >
        {/* Background Image with Parallax and Zoom */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 z-0 will-change-transform"
          initial={{ y: 0 }}
        >
          <motion.div
            className="h-full w-full"
            style={{
              backgroundImage: "url('/assets/hero-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              scale: bgScale,
              transformOrigin: "center center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
          </motion.div>
        </motion.div>

        {/* Content with fade effect */}
        <div className="relative z-10 text-center text-white px-4 max-w-7xl mx-auto">
          <motion.h2
            style={{ opacity: headerOpacity }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            ACCESS EVERYONE, THROUGH EMPYREAN
          </motion.h2>

          <motion.p
            style={{ opacity: subheaderOpacity }}
            className="md:text-lg mb-18 max-w-3xl mx-auto"
          >
            Centralising all-things Real Estate in the Philippines. Streamlining the process.
            <br />
            You access us, you access everyone.
          </motion.p>

          <motion.div style={{ opacity: buttonOpacity }}>
            <Link
              href="/about-us"
              className="inline-block bg-white text-gray-800 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              DISCOVER EMPYREAN
            </Link>
          </motion.div>
        </div>
      </div>

      <CategorySection />
    </section>
  );
}
