// zod 스키마 저장 파일

import { z } from "zod";

export const signInSchema = z.object({
  // TODO: 현재 테스트용으로 나중에 regex 주석 지우기
  email: z.string().trim().min(1, "이메일은 필수입니다.").email("이메일 형식이 올바르지 않습니다."),
  password: z.string().trim().min(1, "비밀번호는 필수입니다."),
  // .regex(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
  //   "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
  // ),
});

export const signUpSchema = z
  .object({
    // 이메일
    email: z.string().min(1, "이메일은 필수입니다.").email("이메일 형식이 올바르지 않습니다."),
    // 인증코드
    emailCode: z
      .string()
      .transform((v) => v.toUpperCase())
      .refine((value) => /^[A-Z0-9]{6}$/.test(value), {
        message: "인증 코드는 영문 대문자와 숫자를 포함한 6자리여야 합니다.",
      })
      .optional(),
    // 닉네임
    nickname: z.string().min(1, "닉네임은 필수입니다."),
    // 비밀번호
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/,
        "비밀번호는 영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다."
      ),
    // 비밀번호 확인
    passwordConfirm: z.string().min(1, "비밀번호 확인은 필수입니다."),
    // 생년월일
    birth: z
      .string()
      .min(1, "생년월일은 필수입니다.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일은 yyyy-MM-dd 형식이어야 합니다."),
    // 프로필 이미지
    profileImage: z.string().url("프로필 이미지 URL 형식이 올바르지 않습니다.").optional(),
    // 약관동의
    agree: z.boolean().refine((val) => val === true, {
      message: "약관에 동의해야 합니다.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
