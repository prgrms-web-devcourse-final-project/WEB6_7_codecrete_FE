import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type BreadcrumbNavProps = {
  items: BreadcrumbItemType[];
};

/*
 * BreadcrumbNavbar
 *
 * 공통 Breadcrumb 네비게이션 컴포넌트
 *
 * - Breadcrumb UI 구조는 shadcn/ui 기본 구조를 그대로 사용
 *   (BreadcrumbList의 직계 자식은 BreadcrumbItem / BreadcrumbSeparator만 허용)
 *
 * - items 배열을 받아 breadcrumb 경로를 렌더링
 *   각 item은 다음 형태를 가짐:
 *     {
 *       label: string;   // 화면에 표시할 텍스트
 *       href?: string;   // 이동 가능한 경우에만 지정
 *     }
 *
 * - 마지막 item 또는 href가 없는 item은
 *   현재 페이지로 간주하여 BreadcrumbPage로 렌더링
 *
 * - BreadcrumbNavbar 내부에서는
 *   라우트 파라미터(id), step 상태 등을 직접 알지 않음
 *   → page.tsx 또는 상위 컴포넌트에서 items를 만들어 전달
 *
 * 사용 예시:
 *
 * <BreadcrumbNavbar
 *   items={[
 *     { label: "홈", href: "/home" },
 *     { label: "리뷰 게시판", href: "/review" },
 *     { label: "글 작성" },
 *   ]}
 * />
 *
 * step 기반 사용 예시:
 *
 * <BreadcrumbNavbar
 *   items={[
 *     { label: "홈", href: "/home" },
 *     { label: "리뷰", href: "/review" },
 *     { label: "글 작성", href: "/review/write" },
 *     { label: stepLabelMap[step] },
 *   ]}
 * />
 *
 * 주의사항:
 * - BreadcrumbList 하위에 div 등 wrapper를 추가하지 말 것 (레이아웃 깨짐)
 * - Fragment(<></>)만 사용하여 JSX 반복 처리
 */

export default function BreadcrumbNavbar({ items }: BreadcrumbNavProps) {
  return (
    <nav className={"border-border border-b px-15 py-4"}>
      <Breadcrumb className={"mx-auto max-w-400"}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <Fragment key={`${item.label}-${index}`}>
                <BreadcrumbItem key={item.label}>
                  {item.href && !isLast ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
