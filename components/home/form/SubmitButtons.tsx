import { Loader2, Sparkles, RotateCcw } from "lucide-react";
import { AnalysisResult } from "../result/types";

interface SubmitButtonsProps {
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  onClear: () => void;
}

export default function SubmitButtons({
  isAnalyzing,
  analysisResult,
  onClear,
}: SubmitButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      {!analysisResult ? (
        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onClear}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 hover:border-zinc-600"
        >
          <RotateCcw className="w-4 h-4" />
          Analyze Another Job
        </button>
      )}

      <span className="text-xs text-zinc-500 font-mono tracking-wide uppercase sm:ml-2">
        No login • free assessment
      </span>
    </div>
  );
}
