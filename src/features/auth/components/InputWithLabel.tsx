import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function InputWithLabel({
  label,
  id,
  placeholder,
  ...props
}: {
  label: string;
  id: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Input type="text" id={id} placeholder={placeholder} {...props} />
    </div>
  );
}
