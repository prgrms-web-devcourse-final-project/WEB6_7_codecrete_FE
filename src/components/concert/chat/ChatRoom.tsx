// TODO:
// - 채팅 히스토리가 많아질 경우, 날짜 단위로 메시지를 그룹화하여
//   "YYYY년 M월 D일" 형태의 날짜 구분선을 표시
// - 사용자의 입장/퇴장 이벤트를 시스템 메시지로 구분하여 렌더링
//   (ex. "OOO님이 입장했습니다", "OOO님이 퇴장했습니다")
// - 일반 채팅 메시지 / 시스템 메시지 / 날짜 구분 메시지를
//   서로 다른 타입으로 분리하여 렌더링 구조 개선
// - 과거 채팅 로딩 시 무한 스크롤 또는 페이지네이션 방식으로 확장

"use client";

import { Pin, Send } from "lucide-react";
import InfoBadge from "@/components/concert/chat/InfoBadge";
import ChatMessage from "@/components/concert/chat/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatRoom() {
  return (
    <section className="bg-bg-main flex flex-1 flex-col border-r">
      <div className={"bg-bg-sub flex gap-3 border-b px-8 py-3"}>
        <Pin size={14} className="text-text-sub mt-1 fill-current" strokeWidth={1.5} />
        <div className={"flex flex-col"}>
          <h3>채팅 가이드라인</h3>
          <p className={"text-text-sub text-xs"}>
            티켓 스크린샷이나 개인정보는 공유하지 마세요. 티켓 거래는 트랜스퍼 보드를 이용해 주세요.
            모든 참여자를 존중해 주세요.
          </p>
        </div>
      </div>
      <div className={"bg-bg-main flex flex-1 flex-col gap-6 border-b p-8"}>
        <div className={"flex justify-center"}>
          <InfoBadge>
            <span className={"text-text-sub"}>오늘 - 2025년 12월 8일</span>
          </InfoBadge>
        </div>
        <div className={"flex justify-center"}>
          <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>
        </div>
        <div className={"flex justify-center"}>
          <span className={"text-text-sub"}>User_8472님이 입장했습니다</span>
        </div>
        <ChatMessage message={"헬로우"} username={"진환"} time={"10:19"} />
        <ChatMessage message={"안녕하세요"} username={"민주"} time={"10:19"} isMe={true} />
        <ChatMessage message={"지금 뭐하세요?"} username={"민주"} time={"10:19"} isMe={true} />
        <ChatMessage message={"지금 운동중입니다"} username={"진환"} time={"10:25"} />
        <ChatMessage
          message={"이야 열심히 하시네요"}
          username={"민주"}
          time={"10:30"}
          isMe={true}
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={"bg-bg-sub flex items-center gap-3 px-6 py-4"}
      >
        <Input className={"bg-bg-main px-6 py-5"} placeholder={"채팅을 입력하세요."} />
        <Button className={"flex h-full gap-2"} size={"lg"} type={"submit"}>
          <Send className={"fill-current"} />
          전송
        </Button>
      </form>
    </section>
  );
}
