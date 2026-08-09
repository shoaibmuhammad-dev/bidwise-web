import { AnalysisResult } from "./types";

interface Props {
  subscores: NonNullable<AnalysisResult["subscores"]>;
}

export default function OverallScore({ subscores }: Props) {
  return (
    <div>
      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
        Overall Score
      </h4>
      <div className="space-y-6">
        {subscores.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-end mb-2">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">
                {item.label}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {item.score}/100
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-emerald-500/80 rounded-full"
                style={{ width: `${item.score}%` }}
              />
            </div>
            <p className="text-xs text-zinc-500">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
