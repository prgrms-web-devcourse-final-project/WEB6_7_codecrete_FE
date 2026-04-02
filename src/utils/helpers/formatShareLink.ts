import { PlannerShareLink, PlannerShareLinkResponse } from "@/types/planner";
import { getShareBaseUrl } from "./domain";

/**
 * @description 공유 링크 API 응답을 기반으로 PlannerShareLink 객체를 생성하는 헬퍼 함수
 * @param {string} domain
 * @param {PlannerShareLinkResponse} shareData
 * @param {boolean} isShareLoading
 * @returns {PlannerShareLink}
 */
export function formatShareLink(
  domain: string,
  shareData: PlannerShareLinkResponse | undefined,
  isShareLoading: boolean
) {
  const shareLink: PlannerShareLink = { domain, url: "", status: "" };

  if (shareData?.status === "ok") {
    const baseUrl = getShareBaseUrl(domain);
    shareLink.url = `${baseUrl}/planner/share?code=${shareData.data.shareToken}`;
  } else if (isShareLoading) {
    shareLink.status = "공유 링크를 불러오는 중입니다...";
  } else if (shareData?.status === "not_created") {
    shareLink.status = "아직 공유 링크가 생성되지 않았습니다.";
  } else if (shareData?.status === "forbidden") {
    shareLink.status = shareData.message;
  } else if (shareData?.status === "error") {
    shareLink.status = shareData.message;
  }

  return shareLink;
}
