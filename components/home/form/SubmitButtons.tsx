import { Loader2, Sparkles } from "lucide-react";

interface SubmitButtonsProps {
  isAnalyzing: boolean;
}

export default function SubmitButtons({ isAnalyzing }: SubmitButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="submit"
        disabled={isAnalyzing}
        className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Analyze
          </>
        )}
      </button>

      {/* <button
        type="button"
        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 hover:border-zinc-600"
      >
        Download PDF
      </button> */}

      <span className="text-xs text-zinc-500 font-mono tracking-wide uppercase sm:ml-2">
        No login • free assessment
      </span>
    </div>
  );
}
