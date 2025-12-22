import type { ChangeEvent } from "react";
import { User } from "../user";

export type LoginResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: {
    userId: number;
    nickname: string;
  };
};

export type SignUpResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: string; // 서버가 실제로 뭐 주는지에 따라 수정 가능
};

export type PasswordInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  id?: string;
};

export type NicknameFieldProps = {
  checked: boolean | null;
  setChecked: (value: boolean | null) => void;
};

export interface GetMeResponse {
  status: number;
  resultCode: string;
  msg: string;
  data: User | null;
}
