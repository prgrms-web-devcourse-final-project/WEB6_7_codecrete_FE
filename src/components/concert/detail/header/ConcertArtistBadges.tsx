import { Badge } from "@/components/ui/badge";
import { getArtistDetail } from "@/lib/api/artists/artists.server";

interface ConcertArtistBadgesProps {
  concertArtists: number[];
}

export default async function ConcertArtistBadges({ concertArtists }: ConcertArtistBadgesProps) {
  const artists = (
    await Promise.all(concertArtists.map((artistId) => getArtistDetail(artistId)))
  ).filter(Boolean);

  return (
    <>
      {concertArtists.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {artists.map((artist) => (
            <Badge
              key={artist.id}
              className="bg-point-main text-text-point-main text-xs md:text-sm"
            >
              {artist.artistType}
            </Badge>
          ))}
        </div>
      )}
    </>
  );
}
