import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";

  if (!query.trim()) {
    return NextResponse.json({ documents: [] }, { status: 200 });
  }

  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
  if (!API_KEY) {
    return NextResponse.json({ error: "Missing KAKAO_REST_API_KEY" }, { status: 500 });
  }

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: API_KEY!,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 200 });
}
