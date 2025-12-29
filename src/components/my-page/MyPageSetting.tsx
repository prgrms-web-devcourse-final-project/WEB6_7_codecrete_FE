"use client";
import { CalendarIcon, EyeIcon, EyeOffIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { FileUploadBox } from "@/components/review/write/FileUploadBox";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { User } from "@/types/user";
import {
  changeNickname,
  changeProfileImage,
  changeUsersSettings,
  getUsersSettings,
} from "@/lib/api/users";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MyPageSetting({ userData }: { userData: User }) {
  // TODO : 주석 다 지우기
  // TODO : 기본 핸들러 다 채우고 이슈 다시 체크
  const router = useRouter();
  const { setTheme } = useTheme();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [open, setOpen] = useState(false);

  // 설정 값들
  const [previewImg, setPreviewImg] = useState(""); // 프로필 이미지
  const [profileFile, setProfileFile] = useState<File | null>(null); // 프로필 이미지
  const [nickname, setNickname] = useState(userData.nickname); // 닉네임
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인
  const [email, setEmail] = useState(userData.email); // 이메일
  const [emailConfirm, setEmailConfirm] = useState(""); // 이메일 확인
  const [date, setDate] = useState<Date | undefined>(
    userData.birthdate ? new Date(userData.birthdate) : undefined
  ); // 생일
  const [emailAlert, setEmailAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const initialUsersSettings = useRef<{ emailAlert: boolean; darkMode: boolean } | null>(null);
  // 값 비교를 위한 초기값 저장

  const [isVisible, setIsVisible] = useState(false); // 비밀번호 가리기 관련
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false); // 비밀번호 가리기 관련
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 닫기 확인 모달

  const handleEditDialog = () => setShowEditDialog((prevState) => !prevState);

  const handlePWVisible = () => setIsVisible((prevState) => !prevState); // 비밀번호 가리기 관련
  const handlePWCVisible = () => setIsVisibleConfirm((prevState) => !prevState); // 비밀번호 가리기 관련

  // 이메일알림 및 다크모드 설정 상태 가져오기
  useEffect(() => {
    if (showEditDialog) {
      const loadData = async () => {
        const res = await getUsersSettings();
        if (res) {
          setEmailAlert(res.emailNotifications);
          setDarkMode(res.darkMode);
          // TODO : 네트워크 느리면 느리게 뜰 수 있는 문제점
          initialUsersSettings.current = res;
        }
      };
      loadData();
    }
  }, [showEditDialog]);

  // 다크모드 실시간 반영
  const onSwitchChange = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  // 이미지 파일 프리뷰 띄우기
  const handleImgChange = (file: File | null) => {
    if (file) {
      setProfileFile(file);

      const url = URL.createObjectURL(file);
      setPreviewImg(url);
    }
  };

  // 모달 닫을 때 변한 값이 있을 때 막기
  const handleClose = (open: boolean) => {
    // 닫기 검문 조건
    const emailChanged = userData.email !== email;
    const nickNameChanged = userData.nickname !== nickname;
    const birthDateChanged = userData.birthdate !== date;
    const ProfileImageChanged = userData.profileImageUrl !== previewImg;
    const emailAlertChanged = initialUsersSettings.current?.emailAlert !== emailAlert;
    const darkModeChanged = initialUsersSettings.current?.darkMode !== darkMode;
    const isChanged =
      emailChanged ||
      nickNameChanged ||
      birthDateChanged ||
      ProfileImageChanged ||
      emailAlertChanged ||
      darkModeChanged;

    if (!open) {
      if (isChanged) {
        setIsConfirmOpen(true);
      } else {
        setIsConfirmOpen(false);
      }
    }
  };

  // 모달을 닫으면 입력한 데이터 날아가도록 함
  const resetFields = () => {
    setPreviewImg("");
    setNickname(userData.nickname);
    setEmail(userData.email);
    setEmailConfirm("");
    setDate(userData.birthdate ? new Date(userData.birthdate) : undefined);
    if (initialUsersSettings.current) {
      const { emailAlert: originalEmail, darkMode: originalDark } = initialUsersSettings.current;

      setEmailAlert(originalEmail);
      setDarkMode(originalDark);

      setTheme(originalDark ? "dark" : "light");
    }
    setPassword("");
    setPasswordConfirm("");
  };

  // 수정 사항 제출
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      toast.error("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordConfirm.trim()) {
      toast.error("비밀번호 확인이 필요합니다.");
      return;
    }
    if (!email.trim()) {
      toast.error("이메일을 입력해주세요.");
      return;
    }

    // TODO : 수정 사항이 있는 경우에만 제출이 가능하도록 함

    try {
      const results = await Promise.all([
        changeNickname({ nickname: nickname }),
        changeProfileImage({ profileFile: profileFile }),
        changeUsersSettings({
          emailNotifications: emailAlert,
          darkMode: darkMode,
        }),
      ]);

      if (results.every((res) => res !== null)) {
        toast.success("프로필 설정이 성공적으로 저장되었습니다.");

        initialUsersSettings.current = { emailAlert, darkMode };
        setShowEditDialog(false);

        router.refresh();
        setPreviewImg("");
      } else {
        toast.error("일부 설정 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      toast.error("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        aria-label="설정"
        className="absolute -top-1 -left-1"
        onClick={handleEditDialog}
      >
        <SettingsIcon className="text-background size-8 fill-white stroke-zinc-900" />
      </Button>
      {/* open -> true면 나타나, onOpenChange -> 닫기 버튼 누르기 등의 상태 변화가 생겼을 때 false로 바꿔 */}
      <Dialog open={showEditDialog} onOpenChange={handleClose} aria-description="설정">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <Field>
              <Label htmlFor="file">프로필 이미지</Label>
              <FileUploadBox value={previewImg} onFileChange={handleImgChange} />
            </Field>
            <Field>
              <Label htmlFor="nickname">닉네임 *</Label>
              <Input
                id="nickname"
                placeholder="닉네임을 입력해주세요."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="nickname">비밀번호 *</Label>
              <div className="relative space-y-1">
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-9"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePWVisible}
                  className="text-text-sub focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                >
                  {isVisible ? <EyeOffIcon /> : <EyeIcon />}
                  <span className="sr-only">{isVisible ? "Hide password" : "Show password"}</span>
                </Button>
                <p className="text-text-sub text-xs">영문, 숫자 8자 이상 입력하세요. 명령입니다.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="nickname">비밀번호 확인 *</Label>
              <div className="relative space-y-1">
                <Input
                  type={isVisibleConfirm ? "text" : "password"}
                  placeholder="비밀번호를 입력하세요."
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="pr-9"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePWCVisible}
                  className="text-text-sub focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
                >
                  {isVisibleConfirm ? <EyeOffIcon /> : <EyeIcon />}
                  <span className="sr-only">
                    {isVisibleConfirm ? "Hide password" : "Show password"}
                  </span>
                </Button>
                <p className="text-text-sub text-xs">영문, 숫자 8자 이상 입력하세요. 명령입니다.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="email">이메일 *</Label>
              <div className="relative space-y-1">
                <Input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  className="pr-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="emailConfirm">이메일 확인</Label>
              <div className="relative space-y-1">
                <div className="flex gap-1">
                  <Input
                    type="emailConfirm"
                    placeholder="이메일을 입력하세요."
                    className="pr-9"
                    value={emailConfirm}
                  />
                  <Button>확인</Button>
                </div>
                <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="birth">생년월일</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  {/* TODO : 저장된 생일 값이 잘 들어오고 있는지 확인 필요 */}
                  <Button variant="outline" id="date" className="w-48 justify-between font-normal">
                    {date ? date.toLocaleDateString() : "생년월일을 입력하세요."}
                    <CalendarIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Separator />
            <div className="space-y-4">
              <div className="border-border relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                <Switch
                  id="emailAlert"
                  className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2.5 data-[state=checked]:[&_span]:rtl:-translate-x-2.5"
                  aria-describedby="이메일 수신 스위치"
                  checked={emailAlert}
                  onCheckedChange={(checked) => setEmailAlert(checked)}
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
                  onCheckedChange={onSwitchChange}
                />
                <div className="flex grow gap-3">
                  <div className="grid grow gap-2">
                    <Label htmlFor="darkMode">다크모드</Label>
                    <p className="text-text-sub text-sm">다크모드를 사용합니다</p>
                  </div>
                </div>
              </div>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 모달 닫기 확인 모달 */}
      <AlertDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        aria-description="모달 닫기"
      >
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>변경 사항을 저장하지 않고 나가시겠습니까?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsConfirmOpen(false);
                setShowEditDialog(false);
                resetFields();
              }}
            >
              네
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsConfirmOpen(false)}>
              아니오
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
