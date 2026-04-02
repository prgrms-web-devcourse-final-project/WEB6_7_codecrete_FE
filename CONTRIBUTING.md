# 🤝 Contributing to 내 콘서트를 부탁해

> 이 문서는 내 콘서트를 부탁해(내콘부) 프론트엔드 레포지토리에 기여할 때 따라야 하는 **협업 규칙과 코드 컨벤션**을 정리한 가이드입니다.

---

## 🌿 기본 워크플로우

1. Issue 생성 (작업 범위와 목적 정의)
2. 브랜치 생성 후 작업
3. PR 작성 및 리뷰 요청
4. 코드 리뷰 및 PR 승인 (2인 이상)
5. `dev`에 병합 후 작업 브랜치 삭제

---


## 🌱 브랜치 전략

### 브랜치 종류

| 구분 | 브랜치명 |
| --- | --- |
| 배포용 | `main` |
| 개발용 | `dev` |
| 기능 개발용 | `feat` |
| 버그 수정용 | `fix` |
| 리팩토링용 | `refactor` |
| 스타일용 | `style` |
| 환경 설정용 | `chore` |
| 문서용 | `docs` |

### 브랜치 네이밍 규칙

**형식:** `type`/`#이슈번호`/`작업명`

- `type`: `feat` / `fix` / `refactor` / `style` / `chore` / `docs`
- `#이슈번호`: GitHub Issue 번호 (없다면 먼저 이슈 생성)
- `작업명`: `kebab-case`로 작성

**예시:**
```text
feat/#23/concert-detail
```
---

## 🔁 Pull Request 규칙
### PR 제목 규칙

**형식:** `[#이슈번호] 타입(페이지) : 작업 요약`
```text
[#23] feat(login) : 로그인 페이지 작성
```
**PR 전 체크리스트**
- [ ] PR 제목이 규칙에 맞게 작성되었는지 확인
- [ ] 작업 내용이 명확하게 설명되었는지 확인
- [ ] console.log, debugger 제거
- [ ] npm run lint 통과 확인
- [ ] UX에 영향을 주는 변경이라면 스크린샷/영상 첨부
- [ ] 필요 시 @garlatonic(박상아) 멘션하여 Copilot 코드 리뷰 요청
---
## 🪄 커밋 컨벤션
**형식:** `타입(페이지) : 작업 요약`

```text
feat(login) : 로그인 페이지 작성
```

### 커밋 타입
| 타입 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `perf` | 성능 개선 |
| `refactor` | 코드 리팩토링 (기능 변경 없음) |
| `style` | UI/스타일, 포맷팅 변경 (로직 변화 X) |
| `chore` | 빌드, 설정, 기타 잡무 |
| `docs` | 문서 작업 |
| `test` | 테스트 코드 작성/수정 |

---

## 💻 코드 컨벤션
```text
탭 크기: 2
컴마: es5 기준
문자열: 더블 쿼터 `"`
세미콜론 `;` 사용
PR 전 `console.log` / `debugger` 제거
```

### 컴포넌트 작성
- 컴포넌트는 함수 선언식 사용
```typescript
export default function Component() {};
```
- 이벤트 핸들러: `handle~` (예: `handleDelete`)
- 콜백 Props: `on~` (예: `onEdit`, `onChange`, `onSubmit`)
- 공통 컴포넌트의 Props에는 가능한 기본값을 지정해 사용성을 높임

### 타입 작성
- 타입 파일: `.ts` 확장자 사용 (예: `/types/{페이지명}/index.ts`)
- `type` 우선 사용 (`interface`는 필요한 경우만)
- 타입 불분명 시:
  - 우선 `unknown`으로 선언
  - TODO 주석으로 보완 필요성을 명시
- `null`보다 `undefined` 선호
  - 옵셔널 체이닝 `?.`, 널 병합 연산자 `??` 적극 사용

### 클래스/스타일
- 클래스 병합 시 `twMerge` 사용
- 외부에서 전달받은 `className`은 항상 마지막에 병합하여 오버라이드 가능하게 유지
- 공용 스타일/변수는 `global.css`에 정의
---
## 📁 파일 & 폴더
### 파일 & 네이밍 규칙
| 구분 | 컨벤션 |
| --- | --- |
| 파일/폴더 | `kebab-case` |
| 컴포넌트 | `PascalCase` |
| Hook | `useName` |
| Boolean | `isName`, `hasName`, `canName`, `shouldName` |
| Type/Interface | `Name`, `NameProps`, `NameType` |
| Zustand Store | `useNameStore` |

---

## 🧭 Next.js 작업 가이드
- `"use client"`는 가능한 한 하위 컴포넌트에만 선언
- 데이터 패칭은 가능한 한 Server Component에서 수행 후 Client Component로 전달
- `<Suspense>`를 적극 사용해 구역별 로딩 상태를 명확하게 분리
- 이미지와 링크는 Next.js 컴포넌트(`<Image>`, `<Link>`) 사용 (import 경로 주의)
- `page.tsx`는 기본적으로 Server Component로 유지, 클라이언트 기능이 필요한 경우 하위 컴포넌트에서 `"use client"` 선언

