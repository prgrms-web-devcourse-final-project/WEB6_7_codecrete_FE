import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PreferenceFieldsProps } from "@/types/my-page";

export default function PreferenceFields({
  emailNotifications,
  darkMode,
  handleEmailAlertChange,
  handleDarkModeChange,
}: PreferenceFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="border-border relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <Switch
          id="emailAlert"
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
          aria-describedby="이메일 수신 스위치"
          checked={emailNotifications}
          onCheckedChange={handleEmailAlertChange}
        />
        <div className="flex grow gap-3">
          <div className="grid grow gap-2">
            <Label htmlFor="emailAlert">이메일 알림</Label>
            <p className="text-text-sub text-sm">이메일 알림을 받습니다</p>
          </div>
        </div>
      </div>
      <div className="border-border relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
        <Switch
          id="darkMode"
          className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
          aria-describedby="다크모드 스위치"
          checked={darkMode}
          onCheckedChange={handleDarkModeChange}
        />
        <div className="flex grow gap-3">
          <div className="grid grow gap-2">
            <Label htmlFor="darkMode">다크모드</Label>
            <p className="text-text-sub text-sm">다크모드를 사용합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}
