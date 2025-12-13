"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbNav({
  itemType,
  itemDetail,
}: {
  itemType: string;
  itemDetail?: string;
}) {
  const parentHref = itemType === "아티스트" ? "/artists" : "/concerts";

  return (
    <nav className={"border-border border-b px-13 py-4"}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">홈</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {itemDetail ? (
              <BreadcrumbLink href={parentHref}>{itemType}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{itemType}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {itemDetail && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            <BreadcrumbPage>{itemDetail}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
