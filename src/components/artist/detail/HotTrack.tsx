import { Item } from "@/components/ui/item";
import { ArtistTopTrack } from "@/types/artists";
import Link from "next/link";

export default function HotTrack({ tracks }: { tracks: ArtistTopTrack[] }) {
  return (
    <div className={"flex flex-col gap-6"}>
      <h3 className={"text-xl font-bold"}>인기 트랙</h3>
      <Item variant={"outline"} className={"p-6"}>
        <ul className="flex list-inside list-decimal flex-col gap-6">
          {tracks.map((track, index) => (
            <li key={track.trackName} className="flex items-center gap-4">
              {/* 순번 */}
              <span className="text-text-sub w-6 text-center text-base">{index + 1}</span>

              {/* 트랙 이름만 링크 */}
              <Link
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-main text-base hover:underline"
              >
                {track.trackName}
              </Link>
            </li>
          ))}
        </ul>
      </Item>
    </div>
  );
}
