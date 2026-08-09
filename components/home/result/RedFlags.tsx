import { AlertCircle } from "lucide-react";

interface Props {
  redFlags: string[];
}

export default function RedFlags({ redFlags }: Props) {
  return (
    <div>
      <h4 className="text-lg font-mono text-red-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
        Red Flags
      </h4>
      <ul className="space-y-4">
        {redFlags.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base text-zinc-300"
          >
            <div className="bg-transparent text-orange-400 p-0.5 rounded shrink-0 relative top-1">
              <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
