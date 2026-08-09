import { motion } from "motion/react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center md:text-left"
    >
      <div className="flex items-center gap-2 mb-6">
        <h1 className="flex leading-none text-3xl tracking-tighter font-mono">
          <Link href={"/"}>
            <strong className="font-bold">
              bid<span className="text-emerald-400">wise</span>
            </strong>
          </Link>
        </h1>
      </div>

      <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 mb-4">
        {title}
      </h1>
      <p className="text-zinc-400 text-lg md:text-lg max-w-2xl leading-[1.35]">
        {description}
      </p>
    </motion.div>
  );
}
