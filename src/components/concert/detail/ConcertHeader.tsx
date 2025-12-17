import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ConcertHeaderTitle from "@/components/concert/detail/ConcertHeaderTitle";
import ConcertHeaderInfo from "@/components/concert/detail/ConcertHeaderInfo";
import ConcertHeaderArtist from "@/components/concert/detail/ConcertHeaderArtist";
import ConcertHeaderBtn from "@/components/concert/detail/ConcertHeaderBtn";

export default function ConcertHeader() {
  return (
    <section className="header bg-bg-sub px-15 py-16">
      <div className={twMerge(`mx-auto flex w-full max-w-400 gap-8`)}>
        {/* className = "left" */}
        <Image
          src="/ConcertPoster.png"
          alt="Concert Poster"
          width={470}
          height={690}
          className="left aspect-3/4 rounded-2xl shadow-md"
        />

        <div
          className={twMerge(
            `right bg-bg-main flex flex-1 flex-col gap-8 rounded-2xl p-10 shadow-md`
          )}
        >
          <ConcertHeaderTitle />
          <ConcertHeaderInfo />
          <ConcertHeaderArtist />
          <ConcertHeaderBtn />
        </div>
      </div>
    </section>
  );
}
