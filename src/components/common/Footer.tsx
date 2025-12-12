import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// 멤버 데이터를 분리해서 관리 (유지보수 용이)
const TEAM_MEMBERS = {
  frontend: [
    { name: "garlatonic", url: "https://github.com/garlatonic" },
    { name: "stupilman", url: "https://github.com/stupilman" },
    { name: "varYeon", url: "https://github.com/varYeon" },
  ],
  backend: [
    { name: "Creamcheesepie", url: "https://github.com/Creamcheesepie" },
    { name: "heygeeji", url: "https://github.com/heygeeji" },
    { name: "ys0221", url: "https://github.com/ys0221" },
    { name: "tobbot16", url: "https://github.com/tobbot16" },
    { name: "larama-C", url: "https://github.com/larama-C" },
    { name: "kms152000", url: "https://github.com/kms152000" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-border bg-bg-main border-t-border w-full border-t">
      <div className="m-auto flex w-full max-w-400 gap-20 px-15 py-10">
        <div className="w-1/3 space-y-4">
          <h2 className="text-text-main text-2xl font-black">CodeCrete</h2>
          <div className="text-text-sub space-8">
            <p>&copy; 2025 Team CodeCrete. All rights reserved.</p>
            <p>
              Design by <strong>@garlatonic</strong>
            </p>
          </div>
        </div>
        <div className="flex flex-1 gap-10">
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold">Frontend Developers</h3>
            <div className="grid grid-cols-1 gap-2">
              {TEAM_MEMBERS.frontend.map((member) => (
                <Link
                  key={member.name}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-sub text-xs font-medium transition-colors hover:text-black"
                >
                  @{member.name}
                </Link>
              ))}
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="flex-1 space-y-3">
            <h3 className="font-semibold">Backend Developers</h3>
            <div className="grid grid-cols-2 gap-2">
              {TEAM_MEMBERS.backend.map((member) => (
                <Link
                  key={member.name}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-sub text-xs font-medium transition-colors hover:text-black"
                >
                  @{member.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
