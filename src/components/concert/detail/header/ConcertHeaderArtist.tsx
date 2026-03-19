import { MicVocalIcon } from "lucide-react";
import { ArtistDetail } from "@/types/artists";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import ConcertArtistCard from "./ConcertArtistCard";
import { getArtistDetail, getIsLikedArtist } from "@/lib/api/artists/artists.server";

interface ConcertHeaderArtistProps {
  concertArtists: number[];
}

export default async function ConcertHeaderArtist({ concertArtists }: ConcertHeaderArtistProps) {
  const artists = (
    await Promise.all(
      concertArtists.map(async (artistId) => {
        const artistDetail = await getArtistDetail(artistId);
        const isLiked = await getIsLikedArtist(artistId);
        return { ...artistDetail, liked: isLiked } as ArtistDetail & { liked: boolean };
      })
    )
  ).filter(Boolean);

  if (!artists.length) {
    return (
      <div className="about-Artist flex flex-col gap-3 lg:gap-4">
        <strong className="text-lg lg:text-xl">아티스트 정보</strong>
        <div className="bg-background rounded-lg py-10">
          <Empty>
            <EmptyContent className="gap-4">
              <EmptyHeader>
                <EmptyMedia variant="icon" className="m-0">
                  <MicVocalIcon />
                </EmptyMedia>
                <EmptyTitle>등록된 아티스트 정보가 없습니다.</EmptyTitle>
              </EmptyHeader>
              <EmptyDescription>
                제공처 사정으로 아티스트 정보가 누락되어 있을 수 있습니다.
                <br />
                <Link href="mailto:garlatonic@kakao.com" className="underline">
                  관리자
                </Link>
                에게 문의해 주세요.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    );
  }

  return (
    <div className="about-Artist flex flex-col gap-3 lg:gap-4">
      <strong className="text-lg lg:text-xl">아티스트 정보</strong>
      <div className="flex flex-col gap-3 lg:gap-4">
        {artists.map((artist) => (
          <ConcertArtistCard key={artist.id} {...artist} />
        ))}
      </div>
    </div>
  );
}
