interface Props {
  estimatedHours: {
    minimum: number;
    maximum: number;
  };
  aiHours: {
    minimum: number;
    maximum: number;
  };
  jobValue?: number;
  hourlyRate?: number;
  hoursNote?: string;
}

export default function Earnings({
  estimatedHours,
  aiHours,
  jobValue,
  hourlyRate,
  hoursNote,
}: Props) {
  console.log(jobValue);
  return (
    <div>
      {jobValue !== undefined && (
        <>
          <h4 className="text-lg font-mono text-zinc-500 uppercase tracking-widest mb-6 border-b border-zinc-800 pb-2">
            Your Earnings
          </h4>
          <p className="text-sm text-zinc-300 mb-4 font-mono">
            Job value:{" "}
            <span className="font-bold text-zinc-100">
              ${jobValue.toLocaleString()}
            </span>
          </p>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between">
          <h5 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
            Hours by hand
          </h5>
          <div className="text-4xl font-bold text-zinc-100 mb-2">
            {estimatedHours.minimum}–{estimatedHours.maximum} hours
          </div>
          {hourlyRate !== undefined && (
            <div className="text-sm text-zinc-500 font-mono">
              ${hourlyRate}/hr paid
            </div>
          )}
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 flex flex-col justify-between">
          <h5 className="text-xs font-medium text-emerald-500 uppercase tracking-widest mb-3">
            Hours with AI
          </h5>
          <div className="text-4xl font-bold text-emerald-400 mb-2">
            {aiHours.minimum}–{aiHours.maximum} hours
          </div>
          {hourlyRate !== undefined && (
            <div className="text-sm text-emerald-500/70 font-mono">
              ${hourlyRate}/hr paid
            </div>
          )}
        </div>
      </div>
      {hoursNote && (
        <p className="text-xs text-zinc-500 italic mt-4 leading-relaxed">
          {hoursNote}
        </p>
      )}
    </div>
  );
}
