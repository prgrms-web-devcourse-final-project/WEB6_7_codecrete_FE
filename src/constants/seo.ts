import type { Metadata } from "next";

export const SITE_NAME = "내 콘서트를 부탁해" as const;
export const SITE_DESCRIPTION =
  "공연 예매 일정 확인부터 동행 구하기까지, 내콘부와 함께하세요!" as const;
export const SITE_URL = process.env.BASE_URL ?? ("https://www.naeconcertbutakhae.shop" as const);

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
} as const;

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  authors: [
    {
      name: "CodeCrete - FE Team",
      url: "https://github.com/prgrms-web-devcourse-final-project/WEB6_7_codecrete_FE",
    },
    {
      name: "CodeCrete - BE Team",
      url: "https://github.com/prgrms-web-devcourse-final-project/WEB7_9_codecrete_BE",
    },
  ],

  generator: "Next.js",
  keywords: [
    "공연",
    "콘서트",
    "외출 플래너",
    "공연 일정",
    "동행구인",
    "내콘부",
    "내콘서트를부탁해",
    "공연 예매",
    "공연 정보",
    "공연 알림",
    "공연 추천",
  ],

  creator: "CodeCrete",
  publisher: "CodeCrete",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
    images: [DEFAULT_OG_IMAGE],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};
