import { NextResponse } from "next/server";
import ServerApi from "@/utils/helpers/serverApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "20";
  const requestedSort = searchParams.get("sort");
  const sort = requestedSort === "NAME" || requestedSort === "LIKE" ? requestedSort : "NAME";

  const res = await ServerApi(`/api/v1/artists?page=${page}&size=${size}&sort=${sort}`);

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
