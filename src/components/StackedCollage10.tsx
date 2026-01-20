"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  images?: string[];
  alt?: string;
  spacingClass?: string;
};

export default function StackedCollage10({
  images = [],
  alt = "Empyrean gallery image",
  spacingClass = "mt-8 sm:mt-12", // Default spacing above gallery
}: Props) {
  const placeholder = "/assets/placeholder.jpg";
  const imgList = Array.from({ length: 10 }).map(
    (_, i) => images[i] || images[images.length - 1] || placeholder
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const MAX_PEEK = 4;

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setActiveIndex((prev) =>
        prev + 1 < imgList.length ? prev + 1 : prev
      );
    } else {
      setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${spacingClass}`}>
      {/* Gallery container */}
      <div className="relative w-[350px] sm:w-[380px] h-[550px] overflow-visible flex justify-center">
        {imgList.map((img, i) => {
          const relative = i - activeIndex;

          // Only render max 4 left and 4 right cards
          if (Math.abs(relative) > MAX_PEEK) return null;

          const offsetX = 16; // more obvious peeks
          const offsetY = 14;
          const rotateOffset = 2;
          const scaleOffset = 0.03;

          let x = 0,
            y = 0,
            rotate = 0,
            scale = 1,
            zIndex = 0;

          if (relative === 0) {
            // Main card slightly smaller + lowered
            x = 0;
            y = 18; // lowered to cover peeks
            rotate = 0;
            scale = 1.07; // smaller than previous version
            zIndex = 200;
          } else if (relative > 0) {
            // Right side
            const i2 = relative;
            x = offsetX * i2;
            y = offsetY * i2;
            rotate = (i2 - 2) * rotateOffset;
            scale = 1 - scaleOffset * i2;
            zIndex = 200 - i2;
          } else if (relative < 0) {
            // Left side mirrored
            const i2 = Math.abs(relative);
            x = -offsetX * i2;
            y = offsetY * i2;
            rotate = -(i2 - 2) * rotateOffset;
            scale = 1 - scaleOffset * i2;
            zIndex = 200 - i2;
          }

          return (
            <motion.div
              key={i}
              drag={relative === 0 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              whileDrag={relative === 0 ? { scale: 1.10, rotate: 0 } : {}}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) handleSwipe("right");
                if (info.offset.x > 60) handleSwipe("left");
              }}
              style={{ zIndex }}
              className="absolute w-[300px] h-[450px] rounded-2xl shadow-2xl overflow-hidden bg-black/10 backdrop-blur-sm"
              animate={{ x, y, rotate, scale }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover select-none"
                draggable={false}
                unoptimized
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
