import { Card } from "@/components/ui/card";
import MateWriteIntro from "@/components/concert-mate/write/MateWriteIntro";
import ConcertSelectSection from "@/components/review/write/ConcertSelectSection";
import SelectedConcertCard from "@/components/review/write/SelectedConcertCard";
import MateTitleSection from "@/components/concert-mate/write/MateTitleSection";
import MateWriteSection from "@/components/concert-mate/write/MateWriteSection";
import MateTimeSection from "@/components/concert-mate/write/MeetingTimeSection";
import MeetingPlaceSection from "@/components/concert-mate/write/MeetingPlaceSection";
import ActivityTagSection from "./ActivityTagSection";
import { Separator } from "@/components/ui/separator";
import ReviewConfirmSection from "@/components/review/write/ReviewConfirmSection";
import ReviewFooterActions from "@/components/review/write/ReviewFooterActions";
import PreferenceSelectSection from "./PreferenceSelectSection";

export default function MateWriteMain() {
  return (
    <section className="bg-bg-main flex justify-center px-15 py-16">
      <div className="flex w-full max-w-400 flex-col gap-8">
        <Card className="gap-8 p-12">
          <MateWriteIntro />
          <ConcertSelectSection />
          <SelectedConcertCard />
          <MateTitleSection />
          <PreferenceSelectSection />
          <MateWriteSection />
          <MateTimeSection />
          <MeetingPlaceSection />
          <div className="px-6">
            <Separator />
          </div>
          <ActivityTagSection />
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
