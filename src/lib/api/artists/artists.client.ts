import { ArtistListContent, ArtistListResponse, IsLikedArtistsResponse } from "@/types/artists";
import ClientApi from "@/utils/helpers/clientApi";

// 아티스트 목록 불러오기
export async function getArtists(
  page = 0,
  size = 20,
  sort = "NAME",
  cookie?: string
): Promise<ArtistListContent[]> {
  // typeof window가 undefined면 서버 object면 브라우저
  const isServer = typeof window === "undefined";

  const baseUrl = isServer ? process.env.BASE_URL : "";

  try {
    // fetch (네트워크 단계)
    const res = await fetch(`${baseUrl}/api/artists?page=${page}&size=${size}&sort=${sort}`, {
      method: "GET",
      headers: {
        ...(cookie ? { Cookie: cookie } : {}),
      },
      cache: "no-store",
    });

    // JSON 파싱 단계 (여기서도 에러 날 수 있음)
    let json: ArtistListResponse;

    try {
      json = (await res.json()) as ArtistListResponse;
    } catch {
      // JSON 파싱 실패 (빈 응답, HTML 응답 등)
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    // HTTP / 비즈니스 에러 분기
    if (!res.ok || json.resultCode !== "OK") {
      throw new Error(json.msg ?? "아티스트 목록을 불러오는 중 오류가 발생했습니다.");
    }

    // 성공
    return json.data.content;
  } catch (err) {
    // 네트워크 에러 (Failed to fetch)
    if (err instanceof TypeError) {
      throw new Error("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
    }

    // 내가 던진 Error는 그대로 전달
    if (err instanceof Error) {
      throw err;
    }

    // 정말 예외적인 케이스
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

// 아티스트 좋아요
export async function postLikeArtist(artistId: number): Promise<boolean> {
  try {
    const res = await ClientApi(`/api/v1/artists/likes/${artistId}`, {
      method: "POST",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// 아티스트 좋아요 취소
export async function deleteLikeArtist(artistId: number): Promise<boolean> {
  try {
    const res = await ClientApi(`/api/v1/artists/likes/${artistId}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// 아티스트 좋아요 여부 반환

export async function isLikedArtist(artistId: number): Promise<boolean> {
  try {
    const res = await ClientApi(`/api/v1/artists/likes/${artistId}`);

    if (!res.ok) {
      return false;
    }

    const json = (await res.json()) as IsLikedArtistsResponse;

    return json.data?.isLiked ?? false;
  } catch {
    return false;
  }
}
