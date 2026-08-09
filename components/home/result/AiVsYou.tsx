interface Props {
  aiCanDo: string[];
  humanShouldDo: string[];
}

export default function AiVsYou({ aiCanDo, humanShouldDo }: Props) {
  return (
    <div>
      <h4 className="text-lg font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
        AI VS. YOU
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h5 className="text-sm font-medium text-emerald-400 uppercase tracking-widest mb-4">
            What AI can do for you
          </h5>
          <ul className="space-y-3">
            {aiCanDo?.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 relative top-2.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
          <h5 className="text-sm font-medium text-orange-400 uppercase tracking-widest mb-4">
            What you must do yourself
          </h5>
          <ul className="space-y-3">
            {humanShouldDo?.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-zinc-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 relative top-2.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
