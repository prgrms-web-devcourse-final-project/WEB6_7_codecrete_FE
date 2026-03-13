import Image from "next/image";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full lg:grid lg:grid-cols-2">
      {/* TODO: 왼쪽 이미지 */}
      <div className="bg-point-main relative hidden flex-1 lg:block lg:min-h-[calc(100dvh-360px)]">
        <Image
          src="/images/bn_2.png"
          width={1920}
          height={1920}
          alt="sign-in banner"
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
      </div>
      <div className="bg-bg-main flex flex-1 justify-center px-5 py-15 lg:px-25 lg:py-20">
        {children}
      </div>
    </div>
  );
}
