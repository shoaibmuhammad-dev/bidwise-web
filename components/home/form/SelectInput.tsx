import { ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export default function SelectInput({
  options,
  className = "",
  ...props
}: SelectInputProps) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 appearance-none focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
    </div>
  );
}
