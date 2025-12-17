"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  helperText?: string;
};

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1">
      <Label>{label}</Label>

      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pr-9"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setVisible((v) => !v)}
          className="absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
          <span className="sr-only">{visible ? "Hide password" : "Show password"}</span>
        </Button>
      </div>

      {helperText && <p className="text-text-sub text-xs">{helperText}</p>}
    </div>
  );
}
