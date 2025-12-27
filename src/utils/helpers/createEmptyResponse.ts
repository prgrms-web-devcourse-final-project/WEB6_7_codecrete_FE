import { ResponseData } from "@/types/api";

// 빈 응답 생성 함수
export const createEmptyResponse = (message: string): ResponseData<null> => ({
  status: 500,
  resultCode: "ERROR",
  msg: message,
  data: null,
});
