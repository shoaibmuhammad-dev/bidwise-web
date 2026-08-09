"use client";

import { motion } from "motion/react";

export default function BetaBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center"
    >
      <div className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
        Beta
      </div>

      <p className="text-sm text-orange-200/80 leading-relaxed flex-1">
        {/* bidwise is free while in beta. The browser extension asks for an email
        after three analyses so we can follow up with users. Paid plans will
        come later — early users will be told first. */}
        bidwise is free while in beta. After three analyses we'll ask for your
        email so we can follow up and get your feedback. Paid plans will come
        later — early users will be told first.
      </p>
    </motion.div>
  );
}
