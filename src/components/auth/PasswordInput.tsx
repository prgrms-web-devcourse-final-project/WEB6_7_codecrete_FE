"use client";

import { Eye, EyeOff } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import React, { useState } from "react";

type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder = "비밀번호를 입력하세요",
  autoComplete,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup className="bg-point-sub h-13">
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="h-13"
      />
      <InputGroupAddon align="inline-end">
        <button
          type={"button"}
          aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
          className={"mr-2 cursor-pointer"}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}
