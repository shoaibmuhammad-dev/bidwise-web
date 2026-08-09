import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function TextArea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full h-40 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none ${className}`}
    />
  );
}
