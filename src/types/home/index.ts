export type Concert = {
  id: string;
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

export type ConcertWithTicket = Concert & {
  ticketOfficeName?: string;
  ticketOfficeUrl?: string;
};

export type ResponseData<T> = {
  status: number;
  resultCode: string;
  msg: string;
  data: T;
};
