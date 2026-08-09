"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600 uppercase tracking-widest"
    >
      <div>bidwise • beta</div>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-zinc-400 transition-colors">
          Home
        </Link>

        <Link
          href="/contact-us"
          className="hover:text-zinc-400 transition-colors"
        >
          Contact
        </Link>
      </div>
    </motion.footer>
  );
}
