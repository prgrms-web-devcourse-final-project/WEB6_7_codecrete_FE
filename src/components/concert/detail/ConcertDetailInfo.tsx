import Image from "next/image";

export default function ConcertDetailInfo({
  concertImageUrls,
  alt,
}: {
  concertImageUrls?: string[];
  alt?: string;
}) {
  if (!concertImageUrls || concertImageUrls.length === 0) {
    return (
      <div className="space-y-6">
        <h2 className="text-text-main text-3xl font-bold">공연 상세</h2>
        <p className="bg-bg-sub text-text-main rounded-xl p-6 font-medium">
          공연 상세 정보가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-xl">
        {concertImageUrls.map((url) => (
          <Image
            key={url}
            src={url}
            alt={alt ?? "공연 상세 이미지"}
            width={700}
            height={300}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}
