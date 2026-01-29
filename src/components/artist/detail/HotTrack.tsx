import { Item } from "@/components/ui/item";
import { ArtistTopTrack } from "@/types/artists";
import Link from "next/link";

export default function HotTrack({ tracks }: { tracks: ArtistTopTrack[] }) {
  return (
    <div className="space-y-4 lg:space-y-6">
      <h3 className={"text-base font-bold lg:text-xl"}>인기 트랙</h3>
      <Item variant={"outline"} className="block p-4 lg:p-6">
        <ul className="space-y-3 lg:space-y-6">
          {tracks.map((track, index) => (
            <li
              key={track.spotifyUrl || `${track.trackName}-${index}`}
              className="flex items-center gap-2 lg:gap-4"
            >
              <span className="text-text-sub w-4 text-center text-sm lg:w-6 lg:text-base">
                {index + 1}
              </span>

              <Link
                href={track.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-main text-sm hover:underline lg:text-base"
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
