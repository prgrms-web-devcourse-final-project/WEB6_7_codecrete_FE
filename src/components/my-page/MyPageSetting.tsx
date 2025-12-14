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
import { useId, useState } from "react";
import { FileUploadBox } from "../review/write/FileUploadBox";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";

export default function MyPageSetting() {
  const id = useId();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleEditDialog = () => setShowEditDialog((prevState) => !prevState);

  const handlePWVisible = () => setIsVisible((prevState) => !prevState);
  const handlePWCVisible = () => setIsVisibleConfirm((prevState) => !prevState);

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
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog} aria-description="설정">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정</DialogTitle>
          </DialogHeader>
          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <Field>
              <Label htmlFor="file">프로필 이미지</Label>
              <FileUploadBox />
            </Field>
            <Field>
              <Label htmlFor="nickname">닉네임 *</Label>
              <Input id="nickname" placeholder="닉네임을 입력해주세요." />
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
                <Input type="email" placeholder="이메일을 입력하세요." className="pr-9" />
                <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="emailConfirm">이메일 확인 *</Label>
              <div className="relative space-y-1">
                <div className="flex gap-1">
                  <Input type="emailConfirm" placeholder="이메일을 입력하세요." className="pr-9" />
                  <Button>확인</Button>
                </div>
                <p className="text-text-sub text-xs">유효한 이메일 주소를 입력하세요.</p>
              </div>
            </Field>
            <Field>
              <Label htmlFor="birth">생년월일</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
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
            <Card className="flex-row">
              <CardHeader className="flex-1">
                <CardTitle className="text-base">이메일 알림</CardTitle>
                <CardDescription className="text-xs">
                  입력한 이메일로 알림을 받습니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Switch
                  id={id}
                  aria-describedby={`${id}-description`}
                  className="h-6 w-10 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-4.5 data-[state=checked]:[&_span]:rtl:-translate-x-4.5"
                />
              </CardContent>
            </Card>
            <Card className="flex-row">
              <CardHeader className="flex-1">
                <CardTitle className="text-base">다크모드</CardTitle>
                <CardDescription className="text-xs">다크모드를 사용합니다</CardDescription>
              </CardHeader>
              <CardContent>
                <Switch
                  id={id}
                  aria-describedby={`${id}-description`}
                  className="h-6 w-10 [&_span]:size-5 data-[state=checked]:[&_span]:translate-x-4.5 data-[state=checked]:[&_span]:rtl:-translate-x-4.5"
                />
              </CardContent>
            </Card>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit">수정</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
