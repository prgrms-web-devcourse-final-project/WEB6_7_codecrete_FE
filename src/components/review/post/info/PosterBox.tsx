"use client";

import Image from "next/image";
import { useState } from "react";

export default function PosterBox({ posterUrl }: { posterUrl: string | null }) {
  const fallbackImage = "/ConcertPoster.png";
  const [src, setSrc] = useState(posterUrl || fallbackImage);

  return (
    <div className="relative flex h-40 w-32 shrink-0 items-center justify-center rounded-lg bg-gray-300">
      <Image
        src={src}
        alt={`Concert Poster`}
        fill
        sizes={"128px"}
        onError={() => setSrc(fallbackImage)}
      />
    </div>
  );
}
