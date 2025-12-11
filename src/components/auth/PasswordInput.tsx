import { Eye } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export default function PasswordInput({
  placeholder = "Enter Your Password",
}: {
  placeholder?: string;
}) {
  return (
    <InputGroup className="h-13">
      <InputGroupInput placeholder={placeholder} className="h-13" />
      <InputGroupAddon align="inline-end">
        <Eye />
      </InputGroupAddon>
    </InputGroup>
  );
}
