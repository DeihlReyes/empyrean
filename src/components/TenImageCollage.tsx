"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  images: string[];
  alt?: string;
};

export default function TenImageCollage({
  images,
  alt = "Empyrean gallery image",
}: Props) {
  return (
    <div className="mx-auto max-w-6xl py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {images.slice(0, 10).map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: i * 0.05,
            }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl aspect-square"
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              width={600}
              height={600}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
