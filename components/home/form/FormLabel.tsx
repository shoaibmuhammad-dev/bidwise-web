interface FormLabelProps {
  children: React.ReactNode;
}

export default function FormLabel({ children }: FormLabelProps) {
  return (
    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3">
      {children}
    </label>
  );
}
