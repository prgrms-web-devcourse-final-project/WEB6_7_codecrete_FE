import Image from "next/image";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2">
      {/* TODO: 왼쪽 이미지 */}
      <div className="bg-point-main min-h-300 flex-1">
        <Image
          src="/images/bn_2.png"
          width={1920}
          height={1920}
          alt="sign-in banner"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="bg-bg-main flex flex-1 justify-center p-20">{children}</div>
    </div>
  );
}
