export type LoginResponse = {
  status: number;
  resultCode: string;
  msg: string;
  data: {
    userId: number;
    nickname: string;
  };
};
