"use client";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";
import UnsavedChangesModal from "@/components/my-page/setting/UnsavedChangesModal";
import useSetting from "@/hooks/useSetting";
import ProfileImgFields from "@/components/my-page/setting/ProfileImgFields";
import NicknameFields from "@/components/my-page/setting/NicknameFields";
import PasswordFields from "@/components/my-page/setting/PasswordFields";
import EmailField from "@/components/my-page/setting/EmailField";
import BirthField from "@/components/my-page/setting/BirthField";
import PreferenceFields from "@/components/my-page/setting/PreferenceFields";

// TODO : 참고 변경 시도 : 데이터 패칭을 레이아웃이 아닌 컴포넌트로 바꾸었으니 리렌더링 가능, 적용 버튼을 통해 강제 새로 고침 하지 않아도 값이 바뀌면 바로 반영됨?
export default function MyPageSetting({ userData }: { userData: User }) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { state, actions, validation } = useSetting(userData, showEditDialog, setShowEditDialog);

  return (
    <>
      <Button
        size="icon-sm"
        variant="outline"
        aria-label="설정"
        className="absolute top-0 right-0"
        onClick={actions.handleEditDialog}
      >
        <SettingsIcon className="size-5" />
      </Button>
      <Dialog open={showEditDialog} onOpenChange={actions.handleClose} aria-description="설정">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>설정</DialogTitle>
          </DialogHeader>

          <FieldGroup className="max-h-[60vh] overflow-y-auto p-4">
            <ProfileImgFields
              previewImg={state.previewImg}
              handleImgChange={actions.handleImgChange}
              handleImgClear={actions.handleImgClear}
            />
            <NicknameFields
              nickname={state.nickname}
              handleNicknameChange={actions.handleNicknameChange}
            />
            {state.isSocial ? (
              <>
                <Label htmlFor="nickname">비밀번호 수정</Label>
                <div className="text-text-sub flex justify-center text-xs">
                  <span>소셜 로그인은 비밀번호 변경이 불가합니다.</span>
                </div>
              </>
            ) : (
              <PasswordFields
                currentPassword={state.currentPassword}
                password={state.password}
                passwordConfirm={state.passwordConfirm}
                handleCurrentPassword={actions.handleCurrentPassword}
                handlePasswordChange={actions.handlePasswordChange}
                handlePasswordConfirmChange={actions.handlePasswordConfirmChange}
                isCurrentPasswordFormatValid={validation.isCurrentPasswordFormatValid}
                isPasswordValid={validation.isPasswordValid}
                isPasswordMatch={validation.isPasswordMatch}
              />
            )}
            <EmailField email={state.email} />
            <BirthField date={state.date} handleDateChange={actions.handleDateChange} />
            <Separator />
            <PreferenceFields
              emailNotifications={state.emailNotifications}
              darkMode={state.darkMode}
              handleEmailAlertChange={actions.handleEmailAlertChange}
              handleDarkModeChange={actions.handleDarkModeChange}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            <Button type="submit" onClick={actions.handleSubmit}>
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 모달 닫기 확인 모달 */}
      <UnsavedChangesModal
        open={state.isConfirmOpen}
        handleConfirm={() => {
          actions.setIsConfirmOpen(false);
          actions.setShowEditDialog(false);
          actions.resetFields();
        }}
        handleCancel={() => {
          actions.setIsConfirmOpen(false);
        }}
      />
    </>
  );
}
