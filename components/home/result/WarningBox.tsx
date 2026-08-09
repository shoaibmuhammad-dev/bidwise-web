interface Props {
  decision: string;
  redFlags: string[];
  tierStyle: {
    box: string;
    title: string;
    text: string;
  };
}

export default function WarningBox({ decision, redFlags, tierStyle }: Props) {
  return (
    <div className={`${tierStyle.box} border rounded-xl p-6`}>
      <h3 className={`${tierStyle.title} font-semibold mb-2`}>{decision}</h3>
      <p className={`${tierStyle.text} text-sm leading-relaxed`}>
        {redFlags.length === 1
          ? "There's one thing worth checking before you bid."
          : `There are ${redFlags.length} things worth checking before you bid.`}{" "}
        See red flags below.
      </p>

      <ul className="space-y-3 mt-5">
        {redFlags.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70 mt-1.5 shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
