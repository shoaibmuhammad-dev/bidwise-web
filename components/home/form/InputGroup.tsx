import FormLabel from "./FormLabel";
import TextInput from "./TextInput";

interface InputGroupProps {
  label: string;
  helperText?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function InputGroup({
  label,
  helperText,
  inputProps,
}: InputGroupProps) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>

      <TextInput helperText={helperText} {...inputProps} />
    </div>
  );
}
