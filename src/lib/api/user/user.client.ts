import ClientApi from "@/utils/helpers/clientApi";
import { UserInfo } from "@/types/user";

// 이메일 알림 및 다크모드 설정 정보 가져오기
export const getUsersSettings = async () => {
  try {
    const res = await ClientApi(`/api/v1/users/settings`, {
      method: "GET",
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error retrieving user settings", error);
    return null;
  }
};

// 이메일 알림 및 다크모드 설정 수정
export const changeUsersSettings = async (data: {
  emailNotifications: boolean;
  darkMode: boolean;
}) => {
  try {
    const res = await ClientApi(`/api/v1/users/settings`, {
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating user settings:", error);
    return null;
  }
};

// 프로필 이미지 수정
export const changeProfileImage = async (data: { profileFile: File | null }) => {
  try {
    if (!data.profileFile) return { msg: "no image to upload" };

    const formData = new FormData();
    formData.append("file", data.profileFile);

    const res = await ClientApi(`/api/v1/users/profile-image`, {
      method: "PATCH",
      cache: "no-store",
      body: formData,
      // 프로필 이미지를 multipart/form-data 형식으로 전송하기 위해 FormData 사용 (필드명: "file")
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating profile image:", error);
    return null;
  }
};

// 닉네임 수정
export const changeNickname = async (data: { nickname: string }) => {
  try {
    const res = await ClientApi(`/api/v1/users/nickname`, {
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating nickname:", error);
    return null;
  }
};

// 생일 수정
export const changeBirth = async (data: { birth?: string }) => {
  try {
    const res = await ClientApi(`/api/v1/users/birth`, {
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating birthdate:", error);
    return null;
  }
};

// 비밀번호 변경
export const changePassword = async (data: { currentPassword: string; newPassword: string }) => {
  try {
    const res = await ClientApi(`/api/v1/users/password`, {
      method: "PATCH",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating password:", error);
    return null;
  }
};

// 유저 ID로 사용자 정보 조회
export const getUserInfo = async (userId: number): Promise<UserInfo> => {
  try {
    const res = await ClientApi(`/api/v1/users/${userId}`, {
      method: "GET",
    });

    let json;
    try {
      json = await res.json();
    } catch {
      throw new Error("서버 응답을 처리할 수 없습니다.");
    }

    if (!res.ok || json.resultCode !== "OK") {
      let fallbackMsg = "사용자 정보를 가져오는 중 오류가 발생했습니다.";

      if (res.status === 401) {
        fallbackMsg = "인증이 만료되었습니다. 다시 로그인해주세요.";
      } else if (res.status === 404) {
        fallbackMsg = "존재하지 않는 사용자입니다.";
      } else if (res.status >= 500) {
        fallbackMsg = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      throw new Error(json.msg ?? fallbackMsg);
    }

    return json.data;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("네트워크 연결이 원활하지 않습니다.");
    }

    if (err instanceof Error) {
      throw err;
    }

    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};
