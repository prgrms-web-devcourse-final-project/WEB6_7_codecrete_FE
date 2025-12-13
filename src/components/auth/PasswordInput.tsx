import { Eye } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function PasswordInput({
  placeholder = "Enter Your Password",
}: {
  placeholder?: string;
}) {
  return (
    <InputGroup className="bg-point-sub h-13">
      <InputGroupInput placeholder={placeholder} className="h-13" />
      <InputGroupAddon align="inline-end">
        <Eye />
      </InputGroupAddon>
    </InputGroup>
  );
}
