"use client";

import { motion } from "motion/react";
import React from "react";

interface AnimateProps {
  children: React.ReactNode;
  y: number;
}

const Animate = ({ children, y }: AnimateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Animate;
