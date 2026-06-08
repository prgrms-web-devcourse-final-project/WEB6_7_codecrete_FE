import {
  changeBirth,
  changeNickname,
  changePassword,
  changeProfileImage,
  changeUsersSettings,
  getUsersSettings,
} from "@/lib/api/user/user.client";
import { User } from "@/types/user";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function useSetting(
  userData: User,
  showEditDialog: boolean,
  setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>
) {
  /**
   * // TODO
   * 1. 계정 복구 기능 추가
   * 2. 이메일 변경 및 확인 기능 추가 (emailConfirm 상태 사용)
   * 3. 다크모드 : 시스템 상태가 다크인 경우에 반영 x
   * 4. 유효성 검사 단순화
   * 5. PreferenceFields : useEffect 부분 속도 개선
   * 6. 비밀번호 변경 횟수 제한 기능 추가 고려
   */
  const router = useRouter();
  const { setTheme } = useTheme();

  const [previewImg, setPreviewImg] = useState(""); // 프로필 이미지 프리뷰
  const [profileFile, setProfileFile] = useState<File | null>(null); // 프로필 이미지 파일
  const [nickname, setNickname] = useState(userData.nickname);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState(""); // 새 비밀번호
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState(userData.email);
  // const [emailConfirm, setEmailConfirm] = useState(""); // 이메일 확인
  const [date, setDate] = useState<Date | null>(
    userData.birthdate ? new Date(userData.birthdate) : null
  );
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const initialUsersSettings = useRef<{ emailNotifications: boolean; darkMode: boolean } | null>(
    null
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 닫기 확인 모달
  const handleEditDialog = () => setShowEditDialog((prevState) => !prevState);

  // 로그인 소셜 타입 확인
  const isSocial = userData.socialType === "KAKAO" || userData.socialType === "GOOGLE";

  /**
   * ProfileImgFields
   * - 프로필 이미지 프리뷰
   * - 프로필 이미지 지우기
   * - 프로필 이미지 파일 클린업 (useEffect)
   */
  const handleImgChange = (file: File | null) => {
    if (file) {
      setProfileFile(file);

      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }

      const url = URL.createObjectURL(file);
      setPreviewImg(url);
    }
  };

  const handleImgClear = (e: React.MouseEvent) => {
    if (previewImg) {
      e.preventDefault();
      setPreviewImg("");
      setProfileFile(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewImg) {
        URL.revokeObjectURL(previewImg);
      }
    };
  }, [previewImg]);

  /**
   * NicknameFields
   * - 닉네임 변경
   */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  /**
   * PasswordFields
   * - 현재 비밀번호 입력
   * - 새 비밀번호 변경
   * - 새 비밀번호 확인
   */
  const handleCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value.replace(/\s/g, ""));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.replace(/\s/g, ""));
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value.replace(/\s/g, ""));
  };

  /**
   * EmailField
   * - 이메일 변경
   */

  /**
   * BirthField
   * - 날짜 변경
   */
  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
  };

  /**
   * PreferenceFields
   * - 이메일알림 및 다크모드 설정 상태 가져오기
   * - 이메일 알림 설정 변경
   * - 다크모드 실시간 반영
   */
  useEffect(() => {
    if (showEditDialog) {
      const loadData = async () => {
        const res = await getUsersSettings();
        if (res) {
          setEmailNotifications(res.emailNotifications);
          setDarkMode(res.darkMode);
          initialUsersSettings.current = {
            emailNotifications: res.emailNotifications,
            darkMode: res.darkMode,
          };
        }
      };
      loadData();
    }
  }, [showEditDialog]);

  const handleEmailAlertChange = (checked: boolean) => setEmailNotifications(checked);

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  /**
   * UnsavedChangesModal
   * - 닫기 검문 조건
   * - 모달을 닫으면 입력한 데이터 날아가도록 함
   */
  const handleClose = (open: boolean) => {
    // const emailChanged = userData.email !== email;
    const nickNameChanged = userData.nickname !== nickname;
    const birthDateChanged =
      (userData.birthdate ? new Date(userData.birthdate).getTime() : 0) !==
      (date ? date.getTime() : 0);
    const ProfileImageChanged = previewImg !== "" && userData.profileImageUrl !== previewImg;
    const emailAlertChanged =
      initialUsersSettings.current?.emailNotifications !== emailNotifications;
    const darkModeChanged = initialUsersSettings.current?.darkMode !== darkMode;
    const currentPasswordChanged = "" !== currentPassword;
    const passwordChanged = "" !== password;
    const passwordConfirmChanged = "" !== passwordConfirm;
    const isChanged =
      // emailChanged ||
      nickNameChanged ||
      birthDateChanged ||
      ProfileImageChanged ||
      emailAlertChanged ||
      darkModeChanged ||
      currentPasswordChanged ||
      passwordChanged ||
      passwordConfirmChanged;

    if (!open) {
      if (isChanged) {
        setIsConfirmOpen(true);
      } else {
        setIsConfirmOpen(false);
        setShowEditDialog(false);
      }
    }
  };

  const resetFields = () => {
    setPreviewImg("");
    setNickname(userData.nickname);
    setEmail(userData.email);
    setDate(userData.birthdate ? new Date(userData.birthdate) : null);
    if (initialUsersSettings.current) {
      const { emailNotifications: originalEmail, darkMode: originalDark } =
        initialUsersSettings.current;

      setEmailNotifications(originalEmail);
      setDarkMode(originalDark);

      setTheme(originalDark ? "dark" : "light");
    }
    setCurrentPassword("");
    setPassword("");
    setPasswordConfirm("");
  };

  /**
   * 비밀번호 유효성 검사
   */
  // 비밀번호 조합 조건
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isCurrentPasswordFormatValid = passwordRegex.test(currentPassword);
  // 비밀번호 === 비밀번호 확인
  const isPasswordMatch = password === passwordConfirm;

  // 수정 사항 제출
  const handleSubmit = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    /*
    if (!email.trim()) {
      toast.error("이메일을 입력해주세요.");
      return;
    }
    */

    const birth = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : undefined;

    const isPasswordInputted = password.length > 0;
    const isConfirmInputted = passwordConfirm.length > 0;

    if (!isSocial && (isPasswordInputted || isConfirmInputted)) {
      if (!currentPassword) {
        toast.error("비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.");
        return;
      }

      if (!isPasswordInputted || !isConfirmInputted) {
        toast.error("비밀번호 칸을 모두 입력해주세요.");
        return;
      }

      if (!isPasswordValid) {
        toast.error("비밀번호가 형식에 맞지 않습니다.");
        return;
      }

      if (!isPasswordMatch) {
        toast.error("비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    /**
     * submit
     */
    try {
      // 수정 사항이 있는 경우에만 제출이 가능
      // 변경된 항목만 체크
      const nickNameChanged = userData.nickname !== nickname;
      const profileImageChanged = profileFile !== null;
      const birthDateChanged =
        (userData.birthdate ? new Date(userData.birthdate).getTime() : 0) !==
        (date ? date.getTime() : 0);
      const settingsChanged =
        initialUsersSettings.current?.emailNotifications !== emailNotifications ||
        initialUsersSettings.current?.darkMode !== darkMode;

      if (nickNameChanged) {
        const nicknameResult = await changeNickname({ nickname: nickname });
        if (nicknameResult === null) {
          toast.error("닉네임 변경에 실패했습니다.");
          return;
        }
      }

      if (profileImageChanged) {
        const profileResult = await changeProfileImage({ profileFile: profileFile });
        if (profileResult === null) {
          toast.error("프로필 이미지 변경에 실패했습니다.");
          return;
        }
      }

      if (settingsChanged) {
        const settingsResult = await changeUsersSettings({
          emailNotifications: emailNotifications,
          darkMode: darkMode,
        });
        if (settingsResult === null) {
          toast.error("설정 변경에 실패했습니다.");
          return;
        }
      }

      if (birthDateChanged) {
        const birthResult = await changeBirth({ birth: birth });
        if (birthResult === null) {
          toast.error("생년월일 변경에 실패했습니다.");
          return;
        }
      }

      if (!isSocial && isPasswordInputted) {
        const passwordResult = await changePassword({
          currentPassword: currentPassword,
          newPassword: password,
        });
        if (passwordResult === null) {
          toast.error("현재 비밀번호가 일치하지 않습니다.");
          return;
        }
      }

      if (
        !nickNameChanged &&
        !profileImageChanged &&
        !settingsChanged &&
        !birthDateChanged &&
        !isPasswordInputted
      ) {
        toast.info("변경된 사항이 없습니다.");
        return;
      }

      toast.success("프로필 설정이 성공적으로 저장되었습니다.");
      initialUsersSettings.current = { emailNotifications, darkMode };
      setShowEditDialog(false);
      router.refresh();
      setPreviewImg("");
    } catch (error) {
      console.error(error);
      toast.error("서버 통신 중 오류가 발생했습니다.");
    }
  };

  return {
    state: {
      showEditDialog,
      previewImg,
      nickname,
      currentPassword,
      password,
      passwordConfirm,
      email,
      date,
      emailNotifications,
      darkMode,
      isConfirmOpen,
      isSocial,
    },
    actions: {
      setShowEditDialog,
      handleImgClear,
      handleNicknameChange,
      handleCurrentPassword,
      handlePasswordChange,
      handlePasswordConfirmChange,
      handleDateChange,
      handleEmailAlertChange,
      handleDarkModeChange,
      setIsConfirmOpen,
      handleEditDialog,
      handleImgChange,
      handleClose,
      resetFields,
      handleSubmit,
    },
    validation: {
      isPasswordValid,
      isCurrentPasswordFormatValid,
      isPasswordMatch,
    },
  };
}
