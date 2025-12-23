import { ArtistDetail } from "@/types/artists";

export default function ArtistDetailAbout({ artist }: { artist: ArtistDetail }) {
  const description = artist.description.trim();

  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-2xl font-bold"}>아티스트 소개</h3>
      {description ? (
        <p>{description}</p>
      ) : (
        <p className={"text-text-sub"}>아티스트 소개 정보가 아직 등록되지 않았습니다.</p>
      )}
    </div>
  );
}
