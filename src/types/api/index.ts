export type ResponseData<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};
