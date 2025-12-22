import { ArtistListItem, ArtistListResponse, LikeArtistResponse } from "@/types/artists";

export async function getArtists(): Promise<ArtistListItem[]> {
  try {
    // fetch (네트워크 단계)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/artists`, {
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
    return json.data;
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

export async function likeArtist(id: number): Promise<void> {
  try {
    // fetch (네트워크 단계)
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/artists/likes/${id}`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    // JSON 파싱 단계 (여기서도 에러 날 수 있음)
    let json: LikeArtistResponse;

    try {
      json = (await res.json()) as LikeArtistResponse;
    } catch {
      // JSON 파싱 실패 (빈 응답, HTML 응답 등)
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    // HTTP / 비즈니스 에러 분기
    if (!res.ok || json.resultCode !== "OK") {
      throw new Error(json.msg ?? "아티스트 좋아요 요청에 실패했습니다.");
    }

    // 성공
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
