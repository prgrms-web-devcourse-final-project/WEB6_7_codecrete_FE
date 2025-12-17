import { SortSelect } from "../common/SortSelect";
import MyPageLikedArtistListItem from "./MyPageLikedArtistListItem";

export default function MyPageLikedArtistList() {
  return (
    <div className="mx-auto max-w-400 space-y-8">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-bold">찜한 아티스트</h3>
          <p className="text-text-sub text-sm">총 24명</p>
        </div>
        <SortSelect />
      </div>
      <div className="grid grid-cols-5 gap-8">
        {/* TODO: 나중에 아티스트 카드로 바꾸기 */}
        {Array.from({ length: 10 }).map((_, index) => (
          <MyPageLikedArtistListItem key={index} />
        ))}
      </div>
    </div>
  );
}
