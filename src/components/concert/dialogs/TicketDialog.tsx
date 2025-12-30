import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TicketOffice } from "@/types/concerts";
import Link from "next/link";

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketingData: TicketOffice[] | null;
}

export default function TicketDialog({ open, onOpenChange, ticketingData }: TicketModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} aria-description="티켓 예매처 목록">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>티켓 예매하기</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {ticketingData?.length ? (
              ticketingData.map((ticket: TicketOffice) => (
                <Link
                  key={ticket.ticketOfficeName}
                  href={ticket.ticketOfficeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border-border hover:border-point-main hover:bg-point-main/5 block rounded-lg border px-4 py-3 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-foreground text-sm font-medium">
                        {ticket.ticketOfficeName}
                      </span>
                      <span className="text-text-sub text-xs">
                        {ticket.ticketOfficeName} 공식 예매처로 이동합니다.
                      </span>
                    </div>
                    <span className="bg-point-main text-bg-main rounded-full px-3 py-1 text-xs font-semibold">
                      예매하기
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-text-sub py-6 text-center text-sm">
                등록된 티켓 예매처가 없습니다.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
