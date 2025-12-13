import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReviewWriteHeader from "@/components/review/write/ReviewWriteHeader";
import ConcertSelectSection from "@/components/review/write/ConcertSelectSection";
import SelectedConcertCard from "@/components/review/write/SelectedConcertCard";
import ReviewTitleSection from "@/components/review/write/ReviewTitleSection";
import ReviewRatingSection from "@/components/review/write/ReviewRatingSection";
import ReviewConcertSection from "@/components/review/write/ReviewConcertSection";
import SeatInfoSection from "@/components/review/write/SeatInfoSection";
import PhotoUploadSection from "@/components/review/write/PhotoUploadSection";
import ReviewTagSection from "@/components/review/write/ReviewTagSection";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";

export default function ReviewWriteMain() {
  return (
    <section className={"bg-bg-main flex justify-center px-15 py-16"}>
      <div className={"flex w-full max-w-400 flex-col gap-8"}>
        <Card className={"gap-8 p-12"}>
          <ReviewWriteHeader />
          <ConcertSelectSection />
          <SelectedConcertCard />
          <ReviewTitleSection />
          <ReviewRatingSection />
          <ReviewConcertSection />
          <SeatInfoSection />
          <PhotoUploadSection />
          <div className="px-6">
            <Separator />
          </div>
          <ReviewTagSection />
          <div className="px-6">
            <Separator />
          </div>
          <ReviewConfirmSection />
          <ReviewFooterActions />
        </Card>
      </div>
    </section>
  );
}
