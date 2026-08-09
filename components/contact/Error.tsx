import { AlertCircle } from "lucide-react";
import React from "react";

interface ComponentProps {
  errorMessage: string;
}

const Error = ({ errorMessage }: ComponentProps) => {
  return (
    <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

      <div>
        <h3 className="text-red-400 font-medium mb-1">Something went wrong</h3>

        <p className="text-sm text-red-200/70">{errorMessage}</p>
      </div>
    </div>
  );
};

export default Error;
