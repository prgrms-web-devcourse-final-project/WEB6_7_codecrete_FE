import { z } from "zod";

/**
 * 🔐 로그인 폼 검증 스키마
 * - 백엔드 Auth DTO 검증 규칙과 동일하게 맞춤
 */
export const loginSchema = z.object({
  email: z.string().trim().min(1, "이메일은 필수입니다.").email("이메일 형식이 올바르지 않습니다."),

  // TODO: 현재 테스트용으로 나중에 regex 주석 지우기
  password: z.string().trim().min(1, "비밀번호는 필수입니다."),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  //   "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
  // ),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
