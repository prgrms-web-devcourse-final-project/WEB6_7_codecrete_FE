import Link from "next/link";

export default function BrandInfo() {
  return (
    <div className="lg:x-1/2 space-y-2 lg:space-y-4 xl:w-1/3">
      <h2 className="text-text-main text-xl font-black lg:text-2xl">CodeCrete</h2>
      <div className="text-text-sub lg:text-base">
        <p>
          Powered by
          <Link
            href="https://www.kopis.or.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 ml-1 hover:underline"
          >
            KOPIS
          </Link>
          &copy; Arts Management Support Center
        </p>
        <p>Website &copy; 2025 Team CodeCrete. All rights reserved.</p>
        <p>
          UI/UX Design by <strong>@garlatonic</strong>
        </p>
      </div>
    </div>
  );
}
