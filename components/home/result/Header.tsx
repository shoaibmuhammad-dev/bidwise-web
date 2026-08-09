import React from "react";

interface HeaderProps {
  decision: string;
  overallScore: number;
}

const Header = ({ decision, overallScore }: HeaderProps) => {
  return (
    <div className="flex items-end justify-between border-b border-zinc-800 pb-4">
      <h2 className="text-5xl uppercase font-bold tracking-tight text-zinc-100">
        {decision}
      </h2>

      <div className="text-right flex items-baseline gap-1">
        <span className="text-4xl font-bold text-zinc-100">{overallScore}</span>

        <span className="text-zinc-500 text-sm font-semibold">/100</span>

        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest ml-3 hidden sm:inline-block">
          • Overall score
        </span>
      </div>
    </div>
  );
};

export default Header;
