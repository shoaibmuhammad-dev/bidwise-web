import { CheckCircle2 } from "lucide-react";

interface Props {
  strengths: string[];
}

export default function Strengths({ strengths }: Props) {
  return (
    <div>
      <h4 className="text-lg font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
        Strengths
      </h4>
      <ul className="space-y-4">
        {strengths.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base text-zinc-300"
          >
            <div className="bg-transparent text-emerald-400 p-0.5 rounded shrink-0 relative top-1">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
