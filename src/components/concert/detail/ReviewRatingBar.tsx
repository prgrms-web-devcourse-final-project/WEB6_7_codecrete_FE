import { Progress } from "@/components/ui/progress";

export default function ReviewRatingBar() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Progress의 사용 방법은 shadcn 문서 확인 필요, 클라이언트 컴포넌트로 관리 */}
      <div className="flex items-center gap-5">
        <p className="text-text-sub text-sm">5점</p>
        <Progress className="w-[90%]" />
        <p className="text-text-sub text-sm">754</p>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-text-sub text-sm">4점</p>
        <Progress className="w-[90%]" />
        <p className="text-text-sub text-sm">650</p>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-text-sub text-sm">3점</p>
        <Progress className="w-[90%]" />
        <p className="text-text-sub text-sm">520</p>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-text-sub text-sm">2점</p>
        <Progress className="w-[90%]" />
        <p className="text-text-sub text-sm">23</p>
      </div>
      <div className="flex items-center gap-5">
        <p className="text-text-sub text-sm">1점</p>
        <Progress className="w-[90%]" />
        <p className="text-text-sub text-sm">1</p>
      </div>
    </div>
  );
}
