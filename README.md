
<p align="center">
  <a href="https://www.naeconcertbutakhae.shop/home" target="_blank">
    <img width="360" height="103" alt="image" src="https://github.com/user-attachments/assets/9f416fa2-a839-4ffe-9ab1-f7f151827708" />
  </a>
</p>

# 🎤 내 콘서트를 부탁해

> 예매부터 뒤풀이까지, 공연 관람의 하루를 관리하는 올인원 매니지먼트 플랫폼

---

## 1️⃣ 프로젝트 개요

### 📖 소개

공연 관람은 단순한 2시간의 경험이 아닙니다.  
**탐색 → 예매 → 이동 → 관람 → 뒤풀이**로 이어지는 하루의 플로우를 하나의 플랫폼 안에서 관리합니다.

- **개발 기간**: 2025.12.04 ~ 2026.01.13
- **서비스 링크**: [내콘부 바로가기](https://www.naeconcertbutakhae.shop/home)
- **레포지토리**: [Frontend](https://github.com/prgrms-web-devcourse-final-project/WEB6_7_codecrete_FE) | [Backend](https://github.com/prgrms-web-devcourse-final-project/WEB7_9_codecrete_BE)

> _서버 운영시간은 09:00 ~ 18:00이며, 이 시간 외에는 서버가 꺼져 있을 수 있습니다. 양해 부탁드립니다._

### ✅ 주요 기능

- **공연 일정 탐색** : 아티스트/장소/날짜 기준으로 공연을 탐색하고 관심 공연 저장
- **예매 오픈 알림** : 티켓팅 일정 알림 설정으로 오픈을 절대 놓치지 않음
- **외출 계획 수립** : 이동 동선, 식사, 집합 장소까지 공연 하루를 한눈에 계획
- **동행자 구인 및 조율** : 함께 갈 동행자 모집, 일정 공유

### 🔎 팀원 소개
**프론트엔드**
| 이름 | 역할 | GitHub |
|---|---|---|
| 박상아 | 팀장, Git 총괄, UI/UX 디자인, 공연·마이페이지·검색·외출플래너 퍼블리싱 및 개발 | [@garlatonic](https://github.com/garlatonic) |
| 변수연 | 팀원, 구인·공연·마이페이지 퍼블리싱 및 개발 | [@varYeon](https://github.com/varYeon) |
| 정진환 | 팀원, 인증/인가 구현, 실시간 채팅·공연 후기·아티스트 퍼블리싱 및 개발 | [@stupilman](https://github.com/stupilman) |

**백엔드**
| 이름 | 역할 | GitHub |
|---|---|---|
| 최병준 | PO, 인증/인가·회원·커뮤니티 아키텍처 설계 및 개발 | [@larama-C](https://github.com/larama-C) |
| 강휘윤 | 팀장, Git 총괄, 공연 아키텍처 설계 및 개발 | [@Creamcheesepie](https://github.com/Creamcheesepie) |
| 김민석 | 팀원, 플래너 일정 아키텍처 설계 및 개발, 모니터링 | [@kms152000](https://github.com/kms152000) |
| 김윤수 | 팀원, 플래너 장소 아키텍처 설계 및 개발, E2E 테스트 | [@tobbot16](https://github.com/tobbot16) |
| 이혜지 | 팀원, 채팅 아키텍처 설계 및 개발, CI/CD, AWS 인프라 관리 | [@heygeeji](https://github.com/heygeeji) |
| 정윤서 | 팀원, 아티스트·시스템 아키텍처 설계 및 개발 | [@ys0221](https://github.com/ys0221) |

---

## 2️⃣ 기술 스택

### 🖥 프론트엔드

| 분류 | 기술 |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 (Strict Mode) |
| Styling | Tailwind CSS v4, shadcn/ui (Radix UI) |
| 상태 관리 | Zustand v5, TanStack Query v5 |
| 폼 관리 | React Hook Form v7, Zod v4 |
| 실시간 통신 | STOMP.js (WebSocket) |
| 지도 | Kakao Maps SDK |
| 기타 | date-fns, Swiper |

### 🛠 개발 환경 & 협업 도구

| 분류 | 기술 |
|---|---|
| 코드 품질 | ESLint v9, Prettier v3 |
| Git 훅 | Husky v9, lint-staged |
| CI/CD | Vercel |
| 브랜치 전략 | GitHub Flow |

---

## 3️⃣ 개발 환경 설정

### 📋 요구 사항

- **Node.js**: `>= 18.0.0`
- **패키지 매니저**: `npm`
- **추천 IDE 플러그인**: ESLint, Prettier, Tailwind CSS IntelliSense

### 🚀 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/prgrms-web-devcourse-final-project/WEB6_7_codecrete_FE.git
cd WEB6_7_codecrete_FE

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
# 예시 파일을 복사한 뒤 .env 에 값을 채워주세요.
cp .env.example .env
# 각 키 값은 팀 노션/슬랙 등의 내부 문서를 참고해 입력합니다.

# 4. 개발 서버 실행
npm run dev
```

> ⚠️ 이 프로젝트는 백엔드 서버와 함께 실행해야 합니다.  
> 백엔드 레포지토리: [WEB6_7_codecrete_BE](https://github.com/prgrms-web-devcourse-final-project/WEB7_9_codecrete_BE)

### 📜 주요 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run format` | Prettier 자동 포맷팅 |

---

## 4️⃣ 프로젝트 구조

```
src/
├── app/              # Next.js App Router (라우트 + 페이지)
├── components/       # 재사용 가능한 UI 컴포넌트 (Atomic Design)
├── hooks/            # 커스텀 React Hook
├── queries/          # TanStack Query (queryKey 정의)
├── stores/           # Zustand 전역 상태 스토어
├── types/            # TypeScript 공용 타입 정의
├── utils/            # 유틸리티 함수
├── lib/              # 외부 라이브러리 설정 (Backend API, zod, shadcn/io 등)
├── providers/        # Context Provider 모음
├── constants/        # 상수 정의
├── assets/           # 이미지, 아이콘 등 정적 파일
├── css/              # 전역 스타일
└── proxy.ts          # Next.js API Route Proxy 설정
```

---

## 5️⃣ 핵심 구현 포인트

### 📅 일정 관리 및 캘린더 연동
- Context API를 활용하여 마이페이지 내부 캘린더에 효과적으로 공연 / 아티스트 / 플래너 일정 표시

### ⚡ 성능 최적화

- Next.js App Router의 동적 라우트 특성을 고려해 **`prefetch` 전략과 Streaming 기반 Suspense**를 도입
- Suspense boundary를 라우트 단위로 분리해, 레이아웃은 즉시 렌더링하고 데이터 영역만 Skeleton UI로 대기하는 구조로 체감 지연 개선

### 🔄 실시간 채팅 (WebSocket + STOMP)

- `@stomp/stompjs` 기반 WebSocket 연결로 동행자 간 실시간 소통 구현
- 연결 상태 관리를 Custom Hook(`useStompClient`)으로 캡슐화

### 🗺 카카오 지도 연동

- `react-kakao-maps-sdk`를 활용해 공연장 주변 동선 및 맛집 정보를 지도 위에 시각화

### 📋 폼 유효성 검사

- `react-hook-form` + `zod` 조합으로 타입 안전한 폼 유효성 검사 구현
- 스키마 기반 검증으로 서버·클라이언트 공통 유효성 로직 일원화

---

더 자세한 개발 컨벤션과 PR 작성 가이드라인은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참고해주세요.
