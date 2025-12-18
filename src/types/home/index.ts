export type Concert = {
  id: number;
  name: string;
  placeName: string;
  ticketTime: string;
  startDate: string;
  endDate: string;
  posterUrl: string;
  maxPrice: number;
  minPrice: number;
  viewCount: number;
  likeCount: number;
};

export type ResponseData<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};
