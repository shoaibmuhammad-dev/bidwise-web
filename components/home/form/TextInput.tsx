interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
}

export default function TextInput({
  helperText,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <>
      <input
        {...props}
        className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all ${className}`}
      />

      {helperText && (
        <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
          {helperText}
        </p>
      )}
    </>
  );
}
