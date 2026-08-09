import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <h1 className="flex leading-none text-3xl tracking-tighter font-mono">
        <Link href={"/"} className="outline-none">
          <strong className="font-bold">
            bid<span className="text-emerald-400">wise</span>
          </strong>
        </Link>
      </h1>
    </div>
  );
};

export default Logo;
