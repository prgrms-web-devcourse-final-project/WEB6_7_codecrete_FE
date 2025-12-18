import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MateWriteIntro() {
  return (
    <CardHeader>
      <CardTitle className="text-2xl">공연을 함께 할 일행을 구해보세요</CardTitle>
      <CardDescription>
        아래 정보를 입력하여 완벽한 콘서트 Mate를 찾아보세요. 상세한 정보를 입력할 수록 마음이 맞는
        Mate를 찾을 확률이 올라가요.
      </CardDescription>
    </CardHeader>
  );
}
