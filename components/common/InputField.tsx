import { useField } from "formik";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
}

export default function InputField({ label, id, ...props }: InputFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full bg-zinc-950 border ${meta.touched && meta.error ? "border-red-500/50 focus:ring-red-500/50" : "border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/50"} rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-400 text-xs mt-2" role="alert">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
}
