"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function PromoBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group"
    >
      {/* subtle flare */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full transition-opacity group-hover:opacity-70 opacity-40" />

      <div className="flex-1 relative z-10">
        <h3 className="text-xl font-semibold text-zinc-100 mb-2 flex items-center gap-2">
          Get it right on the job page
        </h3>

        <p className="text-zinc-400 leading-relaxed text-sm">
          The bidwise browser extension puts this analysis directly on Upwork
          job postings — no copying, no pasting. It reads the budget, the
          competing bids, the client's history and the brief, and tells you
          whether to bid.
        </p>
      </div>

      <button className="whitespace-nowrap bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 relative z-10 hover:border-zinc-600">
        {/* <Chrome className="w-4 h-4" /> */}
        Add to Chrome
        <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
      </button>
    </motion.div>
  );
}
