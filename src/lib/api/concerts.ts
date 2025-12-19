import { Concert, ResponseData } from "@/types/home";
import { axiosInstance } from "@/lib/axios";

// 임박한 콘서트 목록 조회
export const getUpcomingConcerts = async ({
  page = 0,
  size = 10,
}: {
  page?: number;
  size?: number;
} = {}): Promise<ResponseData<Concert[]>> => {
  try {
    const res = await axiosInstance.get(`/api/v1/concerts/list/UPCOMING`, {
      params: {
        page,
        size,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching upcoming concerts:", error);
    throw error;
  }
};
