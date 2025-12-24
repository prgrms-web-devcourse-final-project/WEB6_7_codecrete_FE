"use server";

interface Place {
  place_name: string;
  address_name: string;
}

export async function searchPlaces(keyword: string) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(keyword)}`,
    {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch places");
  }

  const data = await res.json();
  return data.documents as Place[];
}
