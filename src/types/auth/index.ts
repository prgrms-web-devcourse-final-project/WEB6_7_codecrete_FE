import React from "react";

export type LoginResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: {
    userId: number;
    nickname: string;
  };
};

export type PasswordInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
};

export type NicknameFieldProps = {
  checked: boolean | null;
  setChecked: (value: boolean | null) => void;
};
