import { ArtistDetail } from "@/types/artists";

export default function ArtistDetailAbout({ artist }: { artist: ArtistDetail }) {
  const description = artist.description.trim();

  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className={"text-text-main text-xl font-bold lg:text-2xl"}>아티스트 소개</h3>
      {description ? (
        <p>{description}</p>
      ) : (
        <p className={"text-text-sub"}>아티스트 소개 정보가 아직 등록되지 않았습니다.</p>
      )}
    </div>
  );
}
