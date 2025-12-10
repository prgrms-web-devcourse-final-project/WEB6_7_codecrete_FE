# WEB6_7_codecrete_FE
🔥 코드크리트 프론트엔드 최종 프로젝트 레포지토리

## 🌿 워크플로우
1. Issue 생성
2. PR 작성
3. 코드 리뷰, PR 승인(2인 이상)
4. 병합 (해당 브랜치 삭제)

## 🌱 브랜치 전략
### 브랜치 용도
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

### 브랜치 작성 방법
- `type`/`#이슈번호`/`작업명`
```markdown
- 브랜치 type : `feat` / `fix` / `refactor` / `style` / `chore` / `docs`
- issue 번호 : Github Issue 번호 작성 (이슈번호가 없을 경우 꼭 생성할 것)
- 작업명 : 케밥케이스로 작성 요망
- e.g., feat/#23/concert-detail
```
### PR 주의사항
- 제목 작성시 `[#이슈번호] 타입(페이지) : 작업 요약`
```
[#23] feat(login) : 로그인 페이지 작성
```

## 🪄 커밋 컨벤션
- 타입(페이지) : 작업 요약
```
feat(login) : 로그인 페이지 작성
```

## 💻 코드 컨벤션
```markdown
탭 크기 : 2
컴마 : es5 기준
더블 쿼터 `"` 사용
세미콜론 `;`
PR 전 `console.log()`나 `debugger` 삭제
PR 전에 @박상아 에게 요청 => Copilot 코드리뷰 추가하겠습니다
```
### 컴포넌트 작성
- 컴포넌트는 함수 선언식으로 사용
```
export default function Component() {};
```
- 이벤트 핸들러 명명법 : `handle~` (e.g., `handleDelete`)
- 콜백 Props : on~ (e.g., `onEdit`, `onChange`, `onSubmit`)
- 공통 컴포넌트의 파라미터에 디폴트 값 할당해주기
### 타입 작성
- 파일 : `.ts` 확장자로 작성 / 페이지 구분해서 파일 생성 `/types/{페이지명}/index.ts`
- type / interface : 기본적으로 `type`
- 타입 불분명할 경우 : `unknown` 처리 후 TODO 주석
- `null`보다 `undefined` 선호 → 옵셔널 체이닝(`?.`) & 널 병합 (`??`) 사용
### 코드 작성
- 클래스 병합 시 `twMerge` 사용
- 외부에서 `className` 전달 시 마지막 순서에 병합
### CSS
- `global.css` 에 공용 스타일 변수 작성

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

### Next 작업 시
- `"use client"`를 사용할 경우 최대한 하위 컴포넌트에 작성
- 데이터를 받아올 때 최대한 server 컴포넌트에서 받고 넘겨주는 방식 차용
- `<Suspense>` 적극 사용
- `<Image>`, `<Link>` 컴포넌트 사용 (import 시 주의 필요)
- `page.tsx` : 무조건 `server` 컴포넌트

