import { AnalysisResult } from "./types";

interface Props {
  bidAdvice: NonNullable<AnalysisResult["bidAdvice"]>;
}

export default function BidAdvice({ bidAdvice }: string | any) {
  return (
    <div>
      <h4 className="text-lg font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
        Bid Advice
      </h4>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h5 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
            Suggested bid
          </h5>
          <div className="text-4xl font-bold text-emerald-400 mb-1 flex items-baseline gap-1">
            ${bidAdvice.suggestedBidHourly}
            <span className="text-xl text-emerald-500/70 font-normal">/hr</span>
          </div>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h5 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
            Lowest worthwhile bid
          </h5>
          <div className="text-4xl font-bold text-zinc-100 mb-1 flex items-baseline gap-1">
            ${bidAdvice.lowestWorthwhileHourly}
            <span className="text-xl text-zinc-500 font-normal">/hr</span>
          </div>
        </div>
      </div> */}
      {bidAdvice && (
        <p className="text-base text-zinc-300 mt-4 leading-relaxed">
          {bidAdvice}
        </p>
      )}
    </div>
  );
}
