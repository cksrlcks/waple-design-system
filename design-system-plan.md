# Waple 디자인 시스템 — 계획서 (v0 · 결정 대기)

> 2026-09-09 작성. 근거는 [design_old.html](design_old.html)(현재 UI 인벤토리 · 실제 DOM 샘플 33개)이다.
> 이 문서는 **무엇을 만들지(필요한 UI 목록)와 어떤 순서로 만들지**를 정하는 문서다. 코드는 아직 손대지 않았다 —
> §11 의 결정이 회신되면 v1 로 확정하고, 그 다음에 작업계획서(WBS)를 따로 쓴다.
>
> 변경 이력 — 2026-09-09 v0 작성 · 같은 날 §11-3 글꼴 결정 반영(시스템 폰트 스택, §5.2).

---

## 0. 한 장 요약

| 항목 | 내용 |
|---|---|
| 만들 것 | 토큰 → 컴포넌트 → 패턴/템플릿 3층의 디자인 시스템. 직원 앱·관리자 콘솔·앞으로의 UXIS 제품이 같은 층을 쓴다 |
| 산출물 | ① `src/styles/tokens.css`(재작성) ② `src/styles/ui.css`(의미 클래스) ③ `src/ui/*.jsx`(프리미티브·컴포지트) ④ `DESIGN.md`(AI·사람이 읽는 규격 계약) ⑤ `design/style-guide.html` · `design/component-guide.html`(눈으로 보는 가이드 — 실제 컴포넌트에서 생성) ⑥ 토큰 린트·갤러리 스크립트 |
| 참고 모델 | Atlassian(토큰 3층) · Polaris(컴포넌트 해부·상태·문구 규칙) · Primer(명명) · Carbon(밀도·표) · Geist/Linear(중립색 UI + 강조색 하나) |
| 제약 | 런타임 의존성 추가 없음(react·react-dom 만) → Tailwind·Storybook·Radix 등 불가. 전부 자체 구현 |
| 진행 | 0 감사(완료) → 1 결정·파운데이션 → 2 프리미티브 → 3 컴포지트 → 4 화면 이관(화면당 PR) → 5 거버넌스·패키지화 |
| 지금 필요한 것 | §11 결정 12개 회신 (전부 추천안이 붙어 있다 — 「추천대로」 한마디면 된다) |

---

## 1. 현재 진단 — 왜 시스템이 필요한가

design_old.html 의 수치를 그대로 옮긴다. 「잘 만들었는데 흩어져 있다」가 결론이다 — 화면마다 좋은 판단(값 없으면 안 그리기, 예시 배너, 실패 사유 표기)이 들어 있지만 **같은 뜻의 조각이 두 벌씩** 있고, 값이 코드 곳곳에 리터럴로 박혀 있어 새 제품에 옮길 단위가 없다.

### 1.1 흩어짐

| 영역 | 지금 | 문제 |
|---|---|---|
| 색 | hex 리터럴 약 40종을 인라인 `sx()` 문자열로 직접 씀. teal 틴트 배경만 3변종(`#f0fbfa` `#eefaf8` `#f2fbfa`), 회색 12단, 주색이 둘(직원 앱 teal `#0EC8B6` · 콘솔 blue `#0066cc`) | 토큰 파일(`tokens.css`)은 있으나 컴포넌트가 읽지 않는다. 테마·다크·재브랜딩 불가 |
| 타이포 | 글자 크기 16단(9 · 10 · 10.5 · 11 · 11.5 · 12 · 12.5 · 13 · 14 · 15 · 16 · 17 · 20 · 22 · 26 · 38) · 글꼴 선언 3벌(SF Pro / Pretendard / Inter) | 단계가 없어 새 화면마다 임의 값이 생긴다. SF Pro 는 Windows 에서 없다 |
| 간격 | gap 2·3·4·6·8·10·12·14·16 혼용 · 카드 여백 4종 | 4px 격자가 없다 |
| 둥글기 | 4 ~ 18 사이 9종 | 카드가 14 와 18 로 갈린다(직원/콘솔) |
| 컴포넌트 | Btn ↔ Button, Chip 2종, Field 2종, INPUT 문자열 복사 | 콘솔이 직원 번들에 Panels 를 끌어오지 않으려던 의도적 분리지만, 결과는 「두 벌」 |
| 상태 어휘 | 결재·연결·연동·에이전트·기억·흐름도·사람·보드·우선순위·MCP·모델 — 11개 표가 각자 색을 매핑 | 「정상/주의/끊김」 같은 뜻인데 표마다 색이 다르다 |
| 피드백 | 모달 없음(네이티브 `confirm` 11곳) · 토스트 1종 · Notice 2종 | 되돌릴 수 없는 동작이 브라우저 기본 창으로 나간다 |
| 아이콘 | 유니코드 글리프 30여 종 | OS 글꼴에 따라 모양이 다름. 색·크기 통제 불가 |
| 접근성 | 버튼 대부분 `<div onClick>` · 포커스 스타일 없음 · aria 2곳 | 키보드로 못 쓴다 |
| 반응형·다크 | 없음(min-width 1180) | 노트북 1280 에서 이미 빠듯 |

### 1.2 색 대비 실측 (WCAG AA 4.5:1 기준 · 흰 배경)

| 값 | 쓰임 | 대비 | 판정 |
|---|---|---|---|
| `#1d1d1f` | 본문 | 16.8:1 | ✓ |
| `#7a7a7a` | 메타·라벨(가장 많이 씀) | 4.3:1 | **✗** (아슬아슬 미달) |
| `#a8a8ad` | 힌트·시각·비어 있음 | 2.4:1 | **✗** |
| `#0EC8B6` | 브랜드 강조 — 글자로도 씀 | 2.1:1 | **✗** (칠·아이콘 전용이어야 한다) |
| `#0b9c8e` | teal 글자(밝은) | 3.4:1 | ✗ 큰 글자만 |
| `#0b7f74` | teal 글자(진한) | 4.9:1 | ✓ |
| `#c76a00` | 주의 글자 | 3.8:1 | ✗ |
| `#d70015` | 위험 글자 | 5.4:1 | ✓ |
| `#0066cc` | 링크·콘솔 버튼 | 5.6:1 | ✓ |

→ 시스템은 **「칠 색」과 「글자 색」을 토큰 이름으로 갈라야** 한다(§5.1).

### 1.3 잘 되어 있어서 지켜야 할 것

- 모르는 값은 그리지 않는다(빈 칸·0·undefined 금지) — 사유를 amber 로 적는다.
- 예시(시드) 데이터는 배너로 알린다. 못 받은 것과 없는 것을 가른다.
- 되돌릴 수 없는 동작은 한 번 묻는다. 확정처럼 말할 수 있는 것만 확정처럼 쓴다.
- 실행 중에는 진행 줄이 반드시 있고, 끝나면 사라진다.
- 값의 원천은 한 곳(설정 트리·카탈로그). 화면이 같은 숫자를 다시 박지 않는다.

이 다섯은 시각 규칙이 아니라 **콘텐츠·상태 패턴**이다. Polaris 가 「Content guidelines」를 시스템의 일부로 두듯, §8 에 시스템 규칙으로 올린다.

---

## 2. 목표 · 원칙 · 비목표

**목표**
1. 연속성 — 새 제품(다음 사내 도구, 고객용 화면)을 만들 때 토큰·컴포넌트·문구 규칙을 그대로 가져가면 같은 회사 제품으로 보인다.
2. 단일 원천 — 색·크기·간격은 토큰에만 있다. 컴포넌트 밖에 hex 리터럴이 없다(린트가 막는다).
3. 사람·AI 공용 — `DESIGN.md` 하나를 사람도 읽고 Claude 도 읽어 적용한다(cova-apply-guide 규약과 호환).
4. 접근성 기본값 — 대비 AA · 키보드 · 포커스 링 · 실제 `<button>`.

**원칙 (다섯 줄)**
- 토큰 우선: 값을 쓰지 말고 이름을 쓴다.
- 의미로 이름 짓는다: `--color-teal-500` 이 아니라 `--color-primary`, `--text-secondary`.
- 한 뜻엔 한 조각: 버튼·칩·필드는 한 벌. 밀도(compact)는 변형이지 새 조각이 아니다.
- 상태는 여섯 어휘로만 말한다: neutral · info · success · warning · danger · sample.
- 장식은 뺀다: 그림자는 떠 있는 것(모달·토스트·드롭다운)에만. 강조색은 하나.

**비목표 (이번 라운드)**
- 마케팅 사이트·브랜드 리뉴얼. 로고·워드마크는 그대로.
- 외부 라이브러리 도입(Tailwind·Storybook·Radix·아이콘 패키지).
- 네이티브 앱·오프라인(PWA). 반응형 웹까지가 범위다(§7.1).
- 기능 변경. 이관 PR 은 「보이는 것만 바뀌고 동작은 같다」가 완료 조건.

---

## 3. 참고 모델 — 무엇을 가져오나

| 시스템 | 가져올 구조 | 우리 적용 |
|---|---|---|
| Atlassian Design System | 토큰 3층(global palette → alias/semantic → component) · 모드(light/dark)는 alias 층에서만 갈림 | §5.1 색 3층. 다크는 alias 층만 바꾸면 되게 설계(제공은 나중) |
| Shopify Polaris | 컴포넌트마다 해부도(anatomy)·변형·상태·Do/Don't · **콘텐츠 가이드라인**이 시스템의 일부 | §6 표의 「변형·상태」 열, §8 문구 규칙 |
| GitHub Primer | 프리미티브(primitives) ↔ 컴포넌트 분리 · 명명 규칙 `fgColor/bgColor/borderColor` | 토큰 이름에 역할 접두(`text- · bg- · border-`) |
| IBM Carbon | 밀도(default/compact) · 데이터 테이블 규격 · 4px 격자 | 콘솔 = compact 밀도 변형, 표 규격 §6 F |
| Vercel Geist · Linear | 중립색 UI + 강조색 1 · 얇은 선으로 구획 · 모노스페이스 값 표시 | 이미 이 방향이다. 그림자 최소 유지 |
| Material 3 | 타입 스케일 이름(display/headline/title/body/label) | §5.2 스케일 명명 참고(이름은 짧게) |

---

## 4. 시스템 구조

```
L3 패턴 · 템플릿     앱 셸 · 콘솔 셸 · 페이지 템플릿 6 · 상태 패턴(로딩/빈/오류/예시) · 문구 규칙
L2 컴포지트          Tabs · Notice · Toast · Modal · Table · Timeline · WeekStrip/MonthGrid/TimeGrid ·
                     RunCard · ApprovalForm · PanelShell · StatCard · Board · DiagramNode/Edge · FieldEditor …
L1 프리미티브        Button · IconButton · Chip · Badge · Tag · Input · TextArea · Select · Checkbox · Radio ·
                     Switch · Field · Card · Dot · Avatar · ProgressBar · Dots · Divider · Link · Md
L0 파운데이션(토큰)  color · type · space · size · radius · border · elevation · motion · z · icon · breakpoint
```

파일 배치(안):

| 층 | 파일 | 비고 |
|---|---|---|
| L0 | `src/styles/tokens.css` | `:root` 전역 팔레트 + alias. 다크는 `[data-theme=dark]` 블록(값만, 나중) |
| L0·L1 | `src/styles/ui.css` | `.btn .chip .field .card .notice …` 의미 클래스 ~300줄. hover·focus·active·disabled 는 여기 |
| L1·L2 | `src/ui/*.jsx` | 프리미티브 한 파일 하나. props 만으로 그려져 `render-check` 가 그린다 |
| L3 | `src/components/**` | 기존 화면. 이관하면서 `sx()` 리터럴 → 클래스·토큰 |
| 계약 | `DESIGN.md`(루트) · `DESIGN.admin.md`(콘솔 밀도 변형) | cova-make-guide 계약 형식(§9) |
| 가이드 | `design/style-guide.html` · `design/component-guide.html` | 실제 컴포넌트에서 스크립트로 생성 — 손으로 안 그린다 |
| 검사 | `scripts/tokens-lint.mjs` · `scripts/ui-gallery.mjs` | 리터럴 hex 금지 · 전 상태 렌더 |

`sx()` 는 없애지 않는다 — 레이아웃 한 줄(flex·gap·width)에는 그대로 두고, **색·글자·둥글기·간격 값**만 토큰·클래스로 옮긴다.

---

## 5. 파운데이션 설계안

### 5.1 색

**3층.** 전역 팔레트는 값을 갖고, alias 는 역할을 갖고, 컴포넌트는 alias 만 쓴다.

전역 팔레트(현재 값을 단계에 앉힌 것 — 새 색을 만들지 않았다):

| 단계 | neutral | teal(brand) | blue(info·link) | red(danger) | orange(warning) | amber(sample) |
|---|---|---|---|---|---|---|
| 50 | `#fafafc` | `#f0fbfa` | `#f0f4ff` | `#fdf0f0` | `#fff7ea` | `#fdf6e8` |
| 100 | `#f5f5f7` | `#b8ece6` | `#b8c8f0` | `#f0c9cc` | `#f0c98a` | `#f0dfb8` |
| 200 | `#f0f0f0` | `#8fdcd3` | — | — | — | — |
| 300 | `#e0e0e0` | — | `#2997ff` | — | — | — |
| 400 | `#d2d2d7` | — | — | — | — | — |
| 500 | `#a8a8ad`→`#86868b` | `#0EC8B6` | `#0066cc` | `#d70015` | `#c76a00` | — |
| 600 | `#7a7a7a`→`#6e6e73` | `#0b9c8e` | `#0071e3`(hover) | — | `#a35a00` | — |
| 700 | `#333333` | `#0b7f74` | `#2b4c9b` | `#98262f` | `#8a5a00` | `#8a6d3b` |
| 900 | `#1d1d1f` | `#0f4f4a` | — | — | — | — |

- teal 틴트 3변종은 50 하나로 합친다. 회색 12단은 9단으로.
- `→` 두 곳은 **대비 때문에 값을 바꾸는 제안**이다: 보조 글자 `#6e6e73`(5.1:1 ✓), 힌트·비활성 `#86868b`(3.6:1 — 12px 이상 본문에는 못 쓰고 placeholder·disabled 전용).

alias(역할) — cova 규약의 canonical 이름을 그대로 쓰고 필요한 것만 더한다:

| 역할 | 변수 | 값(light) | 규칙 |
|---|---|---|---|
| 배경 | `--color-bg` / `--color-bg-soft` | `#ffffff` / `#f5f5f7` | 페이지 / 패널·말풍선 |
| 표면 | `--color-surface` / `--color-surface-raised` | `#ffffff` / `#fafafc` | 카드 / 카드 머리·네비 |
| 글자 | `--color-text` / `--color-text-secondary` / `--color-text-tertiary` | `#1d1d1f` / `#6e6e73` / `#86868b` | 본문 / 메타·라벨 / placeholder·disabled 만 |
| 선 | `--color-border` / `--color-divider` | `#e0e0e0` / `#f0f0f0` | 카드·입력 / 행 구분 |
| 주색 | `--color-primary` / `--color-primary-strong` / `--color-primary-text` / `--color-primary-soft` | `#0EC8B6` / `#0b9c8e` / `#0b7f74` / `#f0fbfa` | 칠·아이콘 / hover / **글자** / 틴트 배경 |
| 보조 | `--color-secondary` | `#1d1d1f` | 검정 버튼·선택 칩(ink) |
| 상태 | `--color-success` `--color-warning` `--color-danger` `--color-info` `--color-sample` | teal-500 · orange-500 · red-500 · blue-500 · amber-700 | 각각 `-text`(700) · `-soft`(50) · `-border`(100) 짝을 갖는다 |
| 포커스 | `--color-focus` | `#0071e3` | 포커스 링(2px) |

컴포넌트 토큰은 alias 를 참조만 한다(`--button-primary-bg: var(--color-primary)`). 다크 모드는 alias 블록 하나로 뒤집을 수 있게 팔레트/alias 를 가른다 — 제공은 비목표.

**상태 어휘 통합** — 11개 표를 여섯으로:

| 어휘 | 색 | 지금의 표현들 |
|---|---|---|
| success | teal | 정상 · 실행중 · 승인 완료 · 등록됨 · 근무 · 적재 |
| warning | orange | 주의 · 중지 · 보완 요청 · 부재 · 기본값과 다름 · stdio · 모름 |
| danger | red | 끊김 · 반려 · 삭제 · 긴급 · 휴가·미출근 · 키 없음 |
| info | blue | 링크 · 예정 · 신원 시드+기록 · 소통 |
| neutral | gray | 없음 · 해당 없음 · 완료(보드) · 설치만 · 비어 있음 |
| sample | amber | 예시 데이터 · 못 받은 사유 · 산식으로 뺀 값 |

### 5.2 타이포

- 글꼴: **시스템 폰트 스택** (결정됨 · §11-3). 웹폰트를 내려받지 않는다 — `tokens.css` 의 Inter `@import` 와 SF Pro·Pretendard 이름을 뺀다.
  ```css
  --font-sans: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
               "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  ```
  - 실제로 무엇이 뜨나: macOS = SF Pro + Apple SD Gothic Neo · Windows = Segoe UI + 한글은 스택에 없어 브라우저 폴백(맑은 고딕) · Linux/Android = Roboto/Noto Sans. 한글 글꼴을 이름으로 못 박지 않으므로 **글꼴 모양이 아니라 크기·굵기·자간·행간 스케일이 시스템의 정체성**이다.
  - 굵기 제약: 맑은 고딕은 400·700 두 굵기뿐이라 Windows 한글에서 500 과 600 이 700 처럼 합성된다. **뜻을 굵기 한 단계 차이에만 싣지 않는다** — 강조는 굵기 + 크기 또는 색으로 짝을 짓는다. 갤러리는 macOS·Windows 양쪽에서 본다.
  - 이모지 폰트가 스택 끝에 있어도 UI 아이콘은 SVG 다(§5.6). 이모지는 사용자가 쓴 글에만 나온다.
- 굵기 4: 400 · 500 · 600 · 700(300 은 뺀다).
- 행간 3: tight 1.2(제목) · normal 1.45(본문) · relaxed 1.6(설명·긴 글).
- 스케일 — 16단을 **9단**으로. 현재 값 → 새 단계:

| 토큰 | px | 행간 | 자간 | 지금의 용례 |
|---|---|---|---|---|
| `--text-4xl` | 36 | 1.1 | -0.02em | 홈 인사말(38) |
| `--text-3xl` | 28 | 1.15 | -0.02em | 진입 코드(26) |
| `--text-2xl` | 22 | 1.2 | -0.018em | 화면 제목 · 지표 숫자 |
| `--text-xl` | 17 | 1.3 | -0.012em | 로고 · 폼 제목 · 카드 제목(16·17·20) |
| `--text-lg` | 15 | 1.45 | -0.01em | 패널 제목 · 사용자 말풍선 · 답변(16) |
| `--text-base` | 14 | 1.45 | 0 | 기본(13·14) |
| `--text-sm` | 12 | 1.45 | 0 | 메타 · 표 · 힌트(11.5·12·12.5) |
| `--text-xs` | 11 | 1.35 | 0 | 라벨 · 캡션 · 칩 부제(10.5·11) |
| `--text-2xs` | 10 | 1.3 | -0.02em | 배지 · 네비 라벨(9·10) |

- 숫자: 표·타이머·지표는 `font-variant-numeric: tabular-nums`.
- 제목 글꼴을 따로 두지 않는다(SF Pro Display 역할은 굵기·자간으로 대신).

### 5.3 간격 · 크기

- 4px 격자. `--space-1…12` = 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64. cova 이름 매핑: xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 40.
- 컨트롤 높이 3: sm 28 · md 32 · lg 40 (지금 버튼 26~38 제각각). 입력은 md 기본.
- 카드 안 여백: 직원 앱 16/18 · 콘솔 14/16 → **md 16** 하나, compact 밀도에서 12.
- 레이아웃 폭(§7): 레일 64 · 목록 240 · 우측 360 · 콘솔 사이드 240 · 대화 열 800/내용 720 · 설정 열 720. 지금의 244/340/212/820/740 은 8 격자로 반올림한 것.

### 5.4 둥글기 · 선 · 그림자

- `--radius-sm 6` (작은 버튼·배지 안쪽) · `--radius-md 10` (입력·행·칩 사각) · `--radius-lg 16` (카드·패널·말풍선) · `--radius-full 999` (알약).
- 카드 14/18 을 16 으로 통일. 사용자 말풍선은 `16 16 4 16`.
- 선: 1px `--color-border` 만. 강조는 2px(선택 노드·포커스).
- 그림자 3: `--shadow-sm`(드롭다운) · `--shadow-md`(모달·토스트) · `--shadow-lg`(안 씀, 예비). 카드에는 그림자 없음(지금과 같다).

### 5.5 모션

- `--duration-fast 120ms` (hover·press) · `--duration-base 200ms` (열림·토스트) · `--duration-slow 320ms` (패널 진입).
- easing `cubic-bezier(.2,.8,.2,1)`.
- 키프레임 2개 유지: `wrise`(메시지 등장) · `wblink`(진행 점). 이름을 `ds-rise` · `ds-blink` 로.
- `prefers-reduced-motion` 이면 전부 끈다.

### 5.6 아이콘

유니코드 글리프를 **Tabler Icons** 로 바꾼다(결정됨 · §11-7). 저장소 규칙(런타임 의존성 추가 없음) 때문에 `@tabler/icons-react` 패키지는 쓰지 않고, 필요한 아이콘의 SVG path 만 `src/ui/icons.jsx` 한 파일에 옮겨 담는다(MIT — 파일 머리에 저작권 표기). 24px 격자 · stroke 2 · `currentColor` 가 Tabler 기본이고, 크기는 16(글자 옆) · 20(버튼·네비) 두 가지로 쓴다. 새 아이콘이 필요하면 tabler.io/icons 에서 찾아 같은 파일에 더한다 — 세트 밖 아이콘을 직접 그리지 않는다.

지금 글리프 → Tabler 이름 대응(1차 목록 · 32개):

| 글리프 | Tabler | 글리프 | Tabler | 글리프 | Tabler |
|---|---|---|---|---|---|
| ✦ 에이전트 | `sparkles` | ▦ 임직원·보드 | `layout-grid` | ▤ 전자결재 | `clipboard-check` |
| ✎ 업무일지 | `notebook` | ◷ 연차 | `calendar-off` | ⏻ 출퇴근 | `clock` |
| ⇄ 외근·출장 | `map-pin` | ◑ 시차출퇴근 | `clock-hour-4` | ▣ 일정·회의 | `calendar-event` |
| ₩ 경비 | `receipt` | ⚇ 담당자 | `user-search` | ⌕ 사내 규정 | `book-2` |
| ≡ 피드 | `menu-2` | ✓ | `check` | ✕ | `x` |
| ◍ 진행 | `loader-2`(회전) | ↑ 전송 | `arrow-up` | ⌂ 첫 화면 | `home` |
| ← 뒤로 | `arrow-left` | ‹ › | `chevron-left/right` | ▸ ▾ | `chevron-right/down` |
| ⚙ 공통 설정 | `settings` | ⛭ MCP 툴 | `tool` | 印 결재 마커 | `rubber-stamp` |
| 클립 | `paperclip` | 소통 말풍선 | `message-circle` | ＋ 첨부 | `plus` |
| ! 이상 감지 | `alert-circle` | ⏻ 접속 종료 | `power` | 복사 | `copy` |
| 삭제 | `trash` | 보관 | `archive` | — | — |

印 은 Tabler `rubber-stamp` 로 바꾸되, 결재 마커의 붉은 원 테두리는 그대로 둔다(모양은 바뀌고 뜻은 같다).

### 5.8 브랜드 표현 — 오로라 · 하프톤 · 글로우 CTA (참고 이미지 4장 반영)

기본 UI 는 **밝고 조용한 SaaS 톤**(Ace Studio 참고: 가는 회색 선 · 작은 색 아이콘 · 넉넉한 여백 · 주색은 절제). 브랜드 teal 은 넓게 칠하지 않고 **「빛나는 면」과 「화면당 하나의 글로우 버튼」**으로만 강하게 쓴다. 목업: design/mood-samples.html · 주색별 비교: design/color-samples.html.

| 요소 | 정의 | 토큰(안) | 쓰는 자리 · 금지 |
|---|---|---|---|
| 오로라 그라데이션 | teal → blue → mint 선형(120°) | `--gradient-brand: linear-gradient(120deg, #0EC8B6, #2f7bff 58%, #8be3d2)` | 글로우 CTA 채움 · 진행 막대 · 로딩 표시. 텍스트 색으로는 쓰지 않는다 |
| 글로우 CTA | 알약 · 오로라 채움 · 흰 글자 · 부드러운 teal 그림자 · 위쪽 하이라이트 · hover 1.02 배 | `.btn--glow` · `--shadow-glow: 0 10px 28px rgba(14,200,182,.32)` | **화면(템플릿)당 하나** — 홈 히어로의 「에이전트에게 맡기기」(입력창으로 초점). 나머지 주 버튼은 주색 채움, 보조는 외곽선. 콘솔에는 없다 |
| 브랜드 면 3종 | ① 오로라 링(네이비 → 하늘 동심원) ② 메시(teal → 민트 → 흰빛) ③ 하프톤(네이비 + 시안 파도 점) — 전부 CSS 만(이미지 파일 없음) | `--surface-brand-*` 클래스 3개 | 로그인 배경 · 온보딩 · 빈 상태 · (결정에 따라) 홈 히어로. 표·폼·목록·대화 스트림에는 금지 |
| 밝은 히어로 | 흰 카드 + 오로라 틴트(radial · 22%) + 하프톤 결(마스크) | `.hero` | 홈 상단 한 칸. 제목은 주색 900 |
| 어두운 면 색 | 주색 900(= 주색을 62% 어둡게) — 주색이 바뀌면 함께 바뀐다 | `--color-brand-dark` | 로그인 배경 · 어두운 히어로 · 어두운 면 위의 CTA(A · D · E) |
| 아이콘 색 타일 | 도구·카드 아이콘은 26px 둥근 타일에 상태색과 다른 6색(파랑·주황·틸·보라·초록·슬레이트) | `--tile-*` 6쌍(배경 8% 틴트 + 글자 700) | 사이드바 「도구」 · 빠른 실행 카드 머리. 상태색(빨강·주황·초록)과 뜻이 겹치지 않게 |

성공 상태색은 teal 대신 **초록 `#1f9d63`** 으로 옮긴다 — teal 이 브랜드 전용이 되면서 「정상」 점이 브랜드처럼 읽히지 않게.

### 5.7 z-index · 브레이크포인트

- z: base 0 · sticky 10 · dropdown 20 · toast 40 · modal 50.
- 브레이크포인트(값 · cova 규약과 같게): sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1440. **태블릿·모바일까지 이번 라운드에 포함**(결정됨 · §11-5). 폭별 규칙은 §7.1. `min-width` 미디어 쿼리 + flex/grid 재배치만 쓰고 컨테이너 쿼리·JS 폭 감지는 쓰지 않는다. 모바일(<768)에서는 본문 15px · 컨트롤 높이 40 · 터치 목표 44px.

---

## 6. 컴포넌트 인벤토리 — 필요한 UI 목록

design_old.html 의 33개 샘플에서 뽑아 **한 뜻에 한 조각**으로 합쳤다. 열 설명 — 지금: 현재 코드의 조각 / 샘플: design_old.html 절 / 우선: P0 = 지금 화면을 다시 그리는 데 필요 · P1 = 지금 없는데 시스템에 있어야 하는 것 · P2 = 다음 제품에서.

### A. 액션

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Button | primary(teal) · secondary(ink 검정) · outline · ghost · danger · size sm/md/lg · icon 앞/뒤 · wide | default · hover · active(press) · focus · disabled · busy(「처리 중…」) | Btn 5종 + Button 3톤 | §5 §6 §10 전부 | P0 |
| IconButton | 32px 원형 · 사각 | 위와 같음 | 클립 · 전송 · ✕ · ‹ › | §5.5 §6 | P0 |
| Link | inline · standalone(→) | hover · visited 없음 | `<a>` · 「공통 설정에서 편집 →」 | §4 §10.2 | P0 |
| ActionText | 행 오른쪽 작은 글자 버튼(보관·삭제·되돌리기) | hover 노출(row-act) | Act | §5.1 | P0 |

### B. 선택 · 입력

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Input | text · number · search · mono · size md/lg · prefix/suffix 단위 | focus · invalid · disabled · readonly | INPUT 문자열 3벌 | §6 §10.3 | P0 |
| TextArea | 고정 줄 · 자동 확장(최대 6줄) | 위와 같음 | Composer · 일지 · 지침 | §5.5 §6 | P0 |
| Select | native · 폭 auto | focus · disabled | Select(콘솔) | §10.3 | P0 |
| Checkbox / Radio | 단일 · 그룹 | checked · indeterminate · disabled | 없음(라디오는 Row 로 그림) | §10.4 | P1 |
| Switch | on/off + 라벨 | disabled | 「켜짐/꺼짐」 버튼 · 「예/아니오」 버튼 | §10.2 | P1 |
| Chip (선택형) | single · multi · with sub(두 줄) · counter(「N건」) · size sm/md | active · hover · disabled(+title 사유) | Chip(직원) · Button 토글(콘솔) | §5.3 §6 | P0 |
| SegmentedControl | 2~4칸 · 트랙형 | selected | LeadPanel 탭 | §8 | P0 |
| Tabs | pill(검정 채움) · pill-soft(teal 틴트) · underline(P2) · count 배지 | selected · disabled | 결재함 탭 · 최근 전자결재 탭 | §5.6 §6 | P0 |
| Field | label + hint + error + 「기본값으로」 + 변경 점 · inline(라벨 96px 좌측) | required · invalid · changed | Field 2종 · FieldEditor 머리 | §6 §10.2 | P0 |
| FileDropzone | 점선 상자 · 드래그 오버 | over · disabled | 경비 영수증 · Composer 드롭 | §5.5 §6 | P0 |
| AttachmentChip | image(썸네일) · doc(ExtBadge) · size 28/32/44 | uploading(%) · preparing · ready(읽음/보관용) · failed(+재시도) | AttachChip · 말풍선 칩 · SessionFiles | §5.4 §5.5 | P0 |
| WeekStrip | 평일 5 · 주말 포함 7 · 주 이동 ‹ › · 라벨 | today · past · selected · out-of-range | 홈 연차 카드 · 회의 · 외근 DayRow | §5.3 §6 | P0 |
| MonthGrid | 평일 달력 · 월 이동 · 연속 선택 표시 | today · past · beyond · picked-span | 연차 패널 | §6 | P0 |
| TimeGrid | 시 칩 + 분 칩(00/15/30/45) | selected · disabled | TimeGrid | §6 | P0 |
| SlotPicker | 시간대 칩 목록 · 길이 선택 | taken(예약됨 · title 예약자) | 회의 패널 | §6 | P0 |
| SearchSuggest | input + 후보 목록(이름 · 부서 · 상태 점) · 선택 칩(✕) | open · empty | 참석자 · 담당자 | §6 | P0 |
| ListEditor | 문자열 목록 · 열 여러 개(동작쌍) · ↑↓✕ · 추가 | invalid | ListEditor | §10.2 | P0 |
| FieldEditor 위젯 | int · choice · time · bool · text · nullableText · stringList · intList · subset · pair · tripleList · toolList | changed · invalid | FieldEditor | §10.2 §10.3 | P0 |

### C. 표시

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Card | plain(선) · raised(#fafafc 머리) · tinted(soft) · clickable(hover 테두리) · padding md/compact | hover · selected(teal 선) | card 문자열 4벌 · CARD 2벌 | 전부 | P0 |
| StatCard | 라벨 + 22px 숫자 · 가로 5~7개 띠 | — | 지표 카드 | §7 §8 | P0 |
| Stat (inline) | 라벨 + 굵은 값 | tone | Stat(첨부 요약) · 연차 요약 알약 | §6 §10.3 | P0 |
| Badge | count(붉은) · status(틴트) · dot | tone 6 | 카드 배지 · 「작성됨」 · Badge(모델) | §5.3 §10.4 | P0 |
| Tag | 색 글자 + 10% 배경 · outline | tone 6 | Chip(콘솔) · Chips | §10 | P0 |
| StatusDot | 6/8/10px · ring(아바타 위) | tone 6 | 상태 점 여러 곳 | §3 §9 §10.5 | P0 |
| Avatar | initial · 크기 18/30/32 · 상태 링 | — | 회색 원 · 이름 첫 글자 | §3 §7 §8 | P0 |
| ExtBadge | 확장자 정사각 · 크기 4종 | — | ExtBadge | §5 §9 | P0 |
| Thumbnail | 28~96px 이미지 · 링크 | broken | img | §5.4 | P0 |
| ProgressBar | 3/4/6px · tone | — | 막대 4곳 | §5.6 §8 §9 | P0 |
| Dots (typing) | 점 3 점멸 | — | Typing | §5.4 | P0 |
| Divider | 가로 · 세로 · 라벨 있음(「항목에 속하지 않는 설정」) | — | 1px 선 | 전부 | P0 |
| KeyValue | 라벨 64/84/96px + 값 · 세로 목록 | empty(「확인되지 않음」) | Field(Me) · Line(모델) · 폼 행 | §5.4 §9 §10.4 | P0 |
| Md (마크다운) | 굵게 · 코드 · 불릿 · 번호 · 제목 | — | Md | §5.4 | P0 |
| CodeBlock | pre 스크롤 · 모노 · 빈 값 | — | MemoryPanel pre | §10.1 | P0 |
| MonoText | 경로 · id · 엔드포인트 | — | MONO 문자열 | §10 | P0 |
| Tooltip | title 대체 · 지연 | — | `title` 속성만 | 전부 | P1 |
| Skeleton | 카드·행 자리 | — | 없음(글자 「불러오는 중…」) | — | P2 |

### D. 피드백

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Notice | info · success · warning · danger · sample(예시 배너) · 제목/본문 · 닫기 | — | Notice 2종 · SampleBanner · amber 상자 · 붉은 상자 | §6 §10 | P0 |
| Toast | 하단 중앙 · 2.6초 · 단일 | — | Toast | §3 | P0 |
| Modal · ConfirmDialog | 확인(기본/danger) · 폼 모달(P2) · 포커스 트랩 · ESC | — | `window.confirm` 11곳 | §13 | **P1** |
| InlineError | 필드 아래 붉은 글 | — | FieldEditor err | §10.2 | P0 |
| EmptyState | 짧은 문장 · 행동 버튼 | — | Empty · 「해당하는 첨부가 없습니다」 | §6 §10.3 | P0 |
| LoadingState | 가운데 회색 글 · (P2 Skeleton) | — | 「불러오는 중…」 5곳 | §10 | P0 |
| RunStatus | 점/도트 + 라벨 + 경과 + [중단] | thinking · tool · writing · awaiting · stopping | RunStatus | §5.4 | P0 |

### E. 내비게이션 · 셸

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Sidebar (통합 · 248) | 브랜드 줄(로고 · 검색 · 접기) · 「새 대화」 · 화면 항목 3(아이콘 + 라벨) · 섹션 소제목 · 도구 6(색 아이콘 타일) · 고정 · 대화 이력(hover 액션) · 접속자(아바타 · 상태 점 · 설정) · 접힘(64 아이콘) | selected · badge(연결 N · 대기 N) · collapsed | SideNav + SessionList(합침 — §11-15) | §3 §5.1 · mood-samples | P0 |
| SidebarMenu | 240px · 제목 · 소제목 · 항목(라벨+힌트) · 바닥 버튼 | selected(흰 카드) | 콘솔 aside | §10.0 | P0 |
| ListNav | 왼쪽 3px 강조선 · 글리프 · 라벨 · 부제 · 변경 점 · 소제목 구분 | selected | ItemList | §10.2 | P0 |
| PageHeader | 제목 22 · 메타 · 우측 액션 | — | 화면 머리 5곳 | §7 §8 §9 §10 | P0 |
| BackLink | ← 글자 링크 | — | 「← 항목 개요」 | §10.2 | P0 |
| ThreadNav (pill) | 알약 1개(⌂/←) | disabled(+사유) | ThreadNav | §5.2 | P0 |
| SessionRow | 제목 · 시각 · 요약 · 상태 · hover 액션 | current(teal 선) · archived | SessionList 행 | §5.1 | P0 |
| Disclosure | ▸/▾ + 라벨 + 개수 | open | 보관함 · FAQ · 결재 아코디언 | §5.1 §6 | P0 |
| Brand | 로고 + 「Waple Agent」 + 상태 배지 | away · unknown | Brand | §5.1 | P0 |
| Drawer | 좌(목록·메뉴) · 우(현황) · 폭 280/360 · 배경 클릭·ESC 닫힘 | open · closing | 없음 — §7.1 반응형에서 새로 | — | P0 |
| BottomTabBar | 4칸 · 아이콘 + 라벨 · 배지 · < 768 에서만 | selected | 없음 — §7.1 | — | P0 |

### F. 데이터

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| Table | 기본 · compact · 확장 행(펼침) · 우측 정렬 액션 열 · 빈 상태 · 가로 스크롤 · **responsive(< 768 에서 ListRow 카드로)** | row hover · row open · dim(꺼진 툴) | TH/TD · Row · ToolsPanel · ProfileTable | §10 | P0 |
| Pagination | 이전/다음 + 「N / M」 | disabled | 첨부 표 | §10.3 | P0 |
| FilterBar | Select 여럿 + 검색 + 결과 수 | — | Band | §10.3 | P0 |
| ListRow | 2줄 행(제목 / 메타 · 상태) · 클릭 | hover · handled(연한) | HandledRow · 결재 행 · 프로젝트 행 · 지시 행 | §5.6 §6 §7 §8 | P0 |
| Timeline (세로) | 시각 · 점 색 · 문장 · 태그 | last | AdminPanel 로그 | §7 | P0 |
| GanttRow | 07~21 눈금 · 세그먼트 막대(2두께) · 노트 ≤3 · sticky 헤더 | selected 행 | StaffTimeline · 미니 타임라인 | §7 | P0 |
| Legend | 색 상자 + 라벨 · 글리프 + 라벨 | — | 범례 3곳 | §7 §10.2 §10.5 | P0 |
| Board | 4열 · 열 머리(점·이름·수) · TaskCard(제목 · 프로젝트 · 우선순위 · 막대 · 담당 · 초과 배지) | overdue | TaskBoard | §8 | P0 |
| CardGrid | 3열 균등 · 2열 | — | 홈 카드 · 팀원 카드 · 규정 카드 | §5.3 §6 §8 | P0 |
| MetricRow | StatCard 5~7 가로 | — | 지표 띠 | §7 §8 | P0 |

### G. 대화 · 에이전트 전용 (이 제품군의 고유 조각 — 다음 제품에서도 그대로 쓴다)

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| MessageBubble (user) | 글 · 첨부(썸네일/문서 칩) · 최대 78% | — | Message user | §5.4 | P0 |
| AssistantText | Md · 최대 720 | streaming | Message text | §5.4 | P0 |
| RunCard | 머리(점 · 제목 · N/M) · 단계 줄 | step done/active/failed/pending · finished(접힘) | Message run | §5.4 | P0 |
| ApprovalForm | 제목 · 안내 · KeyValue · 버튼 줄 | pending · resolving · settled(승인/거부/제출/취소) · mock(수정 있음) | Message form | §5.4 | P0 |
| DoneCard | soft 카드 · ✓ · Md · 링크 버튼 | — | Message done · Done(패널) | §5.4 §6 | P0 |
| FollowChips | 알약 열 · primary 하나 | — | Message follow | §5.4 | P0 |
| SessionFilesBand | 머리 문장 + 칩 | — | SessionFiles | §5.4 | P0 |
| Composer | 첨부 칩 · 안내 줄 3 · textarea · 도구 줄(클립 · 계획 · 힌트 · 전송) | drag-over · locked(+힌트) · plan-on | Composer | §5.5 | P0 |
| PanelShell | 글리프 · 제목 · 부제 · right · ✕ · 본문 | loading(스토어 전) | PanelShell · WorkPanel | §6 | P0 |
| QuickCard (홈) | 글리프 · 배지 · 서브 버튼 · 라벨 · 힌트 · 집계 · 확장 영역(WeekStrip) | hover · picking | 홈 카드 | §5.3 | P0 |
| OcrStrip | 읽는 중 · 채움 · 낮은 신뢰 · 실패 · 되돌림 | — | OcrStrip | §6 | P0 |
| ContextCard 묶음 | 내 현황 · 이상 감지 · 브리핑 · 최근 실행 · 최근 전자결재 | blocked 행 · empty | ContextPanel | §5.6 | P0 |
| Clock | 머리 고정 날짜·시각 | — | Clock | §5.6 | P0 |

### H. 다이어그램 (SVG)

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| DiagramNode | 종류 7 색(request · query · rule · block · gate · submit · api) · 상태 점형(연동) · 2줄 라벨 · 말줄임 | selected(2px ink) · dim | WorkflowCanvas · TopologyCanvas | §10.2 §10.5 | P0 |
| DiagramEdge | 화살표 · 점선 · 라벨 | highlighted | 간선 | §10.2 §10.5 | P0 |
| DiagramRowLabel | 왼쪽 여백 행 이름 + 점선 | — | rows | §10.2 | P0 |
| DiagramCanvas | 스크롤 컨테이너 · max-height · (P2 확대) | — | overflow div | §10.2 §10.5 | P0 |

### I. 콘솔 편집 전용

| 컴포넌트 | 변형 | 상태 | 지금 | 샘플 | 우선 |
|---|---|---|---|---|---|
| SaveBar | 상태 글 · 마지막 저장 · 버튼 4 | dirty · invalid · saving · all-default | SaveBar · SettingsCard 머리 | §10.2 §10.3 | P0 |
| ChangedMarker | ● orange + 「기본값으로」 | — | FieldEditor | §10.2 | P0 |
| CodePanel | teal 카드 · 26px 모노 · 복사 | copied ok/fail | CodePanel | §10.1 | P0 |
| MemoryPanel | 파일 블록(라벨 · 모노 · Tag · pre) | busy | MemoryPanel | §10.1 | P0 |
| ServiceControls | [재시작][중지]/[시작] | busy | ServiceControls | §10.5 | P0 |
| ApiCheckCell | [점검] → 결과 Tag + 실패 요약 | checking · ok · fail | ApiCheckCell | §10.5 | P0 |
| ModelRow | 라디오 행 · 모노 id · 배지들 · 연결 확인 | picked · blocked | Row(모델) | §10.4 | P0 |
| ModelDot | ● ○ ? + 모노 + 메타 | loaded/installed/unknown | ModelDot | §10.4 | P0 |

**합계** — A 액션 4 · B 선택·입력 18 · C 표시 18 · D 피드백 7 · E 내비 9 · F 데이터 10 · G 대화 전용 13 · H 다이어그램 4 · I 콘솔 전용 8 = **91개**. 이 중 P1 4(Checkbox/Radio · Switch · Tooltip · Modal) · P2 1(Skeleton). 나머지 **P0 86개는 전부 지금 화면에 이미 「모양」이 있다** — 새로 그리는 것이 아니라 두세 벌을 하나로 합치는 일이다. 프리미티브(A · B 앞 9 · C · D 앞 5)와 컴포지트(그 외)의 경계는 §10 의 2·3단계 목록이 정한다.

---

## 7. 레이아웃 · 템플릿

> **껍데기가 이미 있다** — [design/layout-samples.html](layout-samples.html)(갤러리) · [design/layout/](layout/)(`home` `chat` `staff` `team` `settings` `console` + `layout.css`).
> 색·문구·아이콘 없이 구조·폭·반응형만 담은 HTML/CSS 이고, **지금 앱의 메뉴 구조를 그대로 지켰다** — 좌측 64px 레일(로고 · 바로가기 2 · 화면 3 · 메뉴 8 · 접속자 · 종료)과
> 에이전트 화면에서만 서는 대화 세션 열 244. 지금 화면에 없는 것(워크스페이스 전환 · 도구 목록 · 빵부스러기 상단바)은 넣지 않았다.
> 회색 상자마다 `data-slot="rail|session-list|greeting|quick-cards|week-strip|run-card|work-panel|composer|context|timeline|board|workbench…"` 로 **무엇이 들어갈 자리인지**가 적혀 있다.
> 링크가 걸려 있어 눌러서 돌아다닐 수 있다 — **홈(에이전트 메뉴 활성)이 첫 화면**이고 빠른 실행 카드·예시 칩·세션 행을 누르면 대화 화면으로 간다.
> 2단계에서 프리미티브를 만들 때 이 슬롯 이름이 컴포넌트를 꽂는 계약이 되고, `layout.css` 상단의 `:root` 폭 변수는 그대로 `tokens.css` 로 옮긴다.

| 템플릿 | 구조 | 쓰는 화면 |
|---|---|---|
| AppShell | **통합 Sidebar 248**(브랜드 · 새 대화 · 화면 3 · 도구 6 · 고정 · 대화 이력 · 접속자 — 결정됨 §11-15) + 상단 바 46(빵부스러기 · 검색 · 알림) + 본문(flex · 내용 열 최대 800 가운데) + [우측 320~360] · 폭별 재배치는 §7.1 | S1 · S2 · S3 · S4 |
| ConsoleShell | SidebarMenu 240 + main(여백 32 · 최대 1280) · 알림 영역(Notice · CodePanel · MemoryPanel)이 머리 아래 고정 | 콘솔 5 메뉴 |
| Auth | 배경 soft · 카드 420 가운데 | S0 · 콘솔 로그인 |
| Home | 히어로(인사 · 날짜 · 설명) + CardGrid 3 + 칩 열 | S1 홈 |
| Thread | 알약 내비(스크롤 밖) + 스트림(맨 아래 고정) + Composer | S1 대화 |
| Board | PageHeader + MetricRow + FilterBar/칩 + (GanttRow 목록 | CardGrid + Board + 2열 목록) + 우측 카드 스택 | S2 · S3 |
| Settings | PageHeader + 카드 스택(폭 720) | S4 |
| Console List | PageHeader + 안내문 + 검색 + Table | 직원 |
| Console Workbench | ListNav 240 + 캔버스(카드 · 스크롤) + DetailPanel 340 | 워크플로 · 연동 현황 |
| Console Form | 요약 띠 + FilterBar + Table + 카드 스택(2열 FieldEditor) | 첨부 · 모델 |

격자: 카드 그리드 gap 12 · 보드 gap 12 · 카드 스택 gap 16 · 섹션 gap 32.

### 7.1 반응형 규칙 (폭별 재배치)

원칙 — **컴포넌트는 폭을 모른다.** 재배치는 템플릿(셸)이 하고, 컴포넌트는 주어진 폭을 채운다. 숨기지 않고 옮긴다(우측 패널은 드로어로, 표는 카드로).

| 폭 | AppShell (직원 앱) | ConsoleShell (콘솔) | 그리드 · 표 |
|---|---|---|---|
| ≥ 1280 xl | Sidebar 248 + 본문 + 우측 320~360 | 사이드 240 + main | 지금 그대로 |
| 1024 ~ 1279 lg | 우측 패널 → 접힘(상단 바의 「현황」 버튼으로 Drawer) · Sidebar 248 유지 | 사이드 200 | 카드 그리드 3 → 2열 · 워크벤치 상세 패널 300 |
| 768 ~ 1023 md | Sidebar → 접힘(아이콘 64 · 펼치면 Drawer) · 본문 전폭 · 우측 → Drawer | 사이드 → Drawer · 워크벤치(목록·캔버스·상세) 세로 스택 · 캔버스 가로 스크롤 | 표 → 가로 스크롤 컨테이너 · 보드 4 → 2열 · 지표 띠 줄바꿈 |
| < 768 sm | Sidebar → 하단 탭 바(홈 · 대화 · 도구 · 나) + Drawer(대화 이력) · 홈 카드 1열 · 대화 열 전폭 · Composer 하단 고정 · 패널 카드 전폭 · 우측 카드는 홈 아래로 | 「PC 에서 열어 주세요」 안내(§11-13 기본안) | 표 → ListRow 카드(주요 열만) · 타임라인 가로 스크롤 · 2열 목록 1열 |

이를 위해 셸 프리미티브 둘이 더 필요하다 — **Drawer**(좌/우 슬라이드 · 배경 클릭 닫힘 · ESC)와 **BottomTabBar**(4칸 · 아이콘+라벨 · 배지). §6 E 에 P0 로 더한다. 표는 **ResponsiveTable** 변형(좁으면 카드로)을 §6 F Table 의 변형으로 둔다.

---

## 8. 패턴 · 문구 규칙 (콘텐츠 가이드라인)

시각 규칙이 아니라 **행동 규칙**이다. 새 제품이 이걸 지키면 「같은 회사 제품」으로 느껴진다.

| 규칙 | 내용 |
|---|---|
| 모르는 값 | 빈 칸·0·`—` 로 메우지 않는다. 카드를 안 그리거나 sample 톤 Notice 로 **사유**를 적는다 |
| 예시 데이터 | 시드로 채운 영역은 화면 맨 위에 sample Notice(「사내 시스템 미연동 · 예시 데이터입니다.」) |
| 못 받음 vs 없음 | 목록이 비면 「없습니다」, 거절당했으면 「읽지 못했습니다 — {사유} ({상태})」 |
| 되돌릴 수 없는 동작 | ConfirmDialog 1회. 제목 = 동작, 본문 = 무엇이 사라지고 무엇이 남는지, 버튼 = 동사(「삭제」/「취소」) |
| 결과 알림 | Toast 한 줄(「…했습니다.」). 실패는 Toast + 자리에 남는 InlineError/Notice |
| 진행 | 실행 중엔 RunStatus 가 반드시 있고 끝나면 사라진다. 버튼은 busy 글자(「저장 중…」)로 바뀐다 |
| 확정 문장 | 우리가 아는 사실까지만(「전달됐다」 ≠ 「멈췄다」) |
| 문체 | 「-합니다」 통일(직원 앱 일부 「-해요」 → 결정 §11-8). 버튼은 명사/동사 2~5자, 말줄임(…)은 진행 중에만 |
| 숫자·날짜 | 천 단위 콤마 · 표는 tabular · 날짜 `2026-09-15 (화)` / 짧게 `9/15` · 시각 `14:05` · 기간 `~` |
| 라벨 | 라벨은 명사, 힌트는 한 문장, 오류는 「무엇을 어떻게」(「2~200자로 입력하세요」) |
| 비활성 | 숨기지 않고 흐리게 + `title` 사유(「잔여 8일로는 신청할 수 없습니다」). 단 **권한이 없는 화면 항목은 아예 그리지 않는다** |

---

## 9. 구현 방식 — 세 안 비교

| 안 | 방식 | 장점 | 단점 | 판단 |
|---|---|---|---|---|
| A | 지금처럼 `sx()` 인라인 유지 + 토큰을 JS 상수(`src/ui/tokens.js`)로 + 프리미티브 컴포넌트 | 저장소 관례 그대로 · 캐스케이드 없음 | 테마·다크 불가(값이 문자열에 박힘) · hover/focus 는 어차피 클래스 필요 · 번들에 같은 문자열 반복 · 요소 검사해도 토큰 이름이 안 보임 | 보류 |
| **B** | CSS 변수(`tokens.css`) + 의미 클래스(`ui.css` ~300줄) + React 프리미티브(`src/ui/*.jsx`). `sx()` 는 레이아웃 한 줄에만 | 테마는 alias 블록 교체 · hover/focus/active/disabled 를 CSS 가 담당 · 요소 검사에 토큰 이름이 보임 · cova-apply-guide 의 「클래스 기반」 번역과 맞음 · 새 제품은 css 2개 + DESIGN.md 복사로 시작 | 이관 기간에 두 방식 공존 → 기한과 린트로 막는다 | **추천** |
| C | Tailwind / CSS-in-JS / Radix | 생태계 | 저장소 규칙(의존성 추가 없음) 위반 · 콘솔 번들 분리 원칙과 충돌 | 제외 |

B 의 세부:
- `ui.css` 는 컴포넌트 클래스만(`.btn .btn--primary .btn--sm .chip .chip--on .field .notice--danger …`). 유틸리티 클래스(`.mt-2` 류)는 두지 않는다 — 레이아웃은 `sx()`.
- 프리미티브는 **props → 클래스 조합**만 한다. 상태 로직은 넣지 않는다(그래야 render-check 가 그린다).
- 콘솔 밀도: `<html data-density="compact">` 하나로 토큰 값이 바뀐다(간격 · 컨트롤 높이 · 카드 여백). 컴포넌트를 두 벌 두지 않는다.
- 직원 번들에 콘솔 코드가 실리지 않게 하려던 분리는 유지된다 — 프리미티브는 양쪽이 공유하는 것이 맞고, 콘솔 전용 컴포지트(§6 I)는 콘솔 청크에 남긴다.
- 가이드 HTML 은 `scripts/ui-gallery.mjs` 가 실제 프리미티브를 전 상태로 렌더해 만든다(render-check 와 같은 방식). 손으로 그린 가이드는 반드시 어긋난다. cova-make-guide 의 `style-guide.html` 템플릿(토큰 견본)은 그대로 쓰고, `component-guide.html` 만 생성본으로 대체한다.
- `DESIGN.md` 는 cova-make-guide 계약 형식(frontmatter · 토큰 표 · 컴포넌트 인벤토리 · 적용 힌트)으로 쓴다. 인터뷰 항목은 §11 결정으로 미리 답한다 — 스코프 admin 은 `DESIGN.admin.md` 를 따로 두되 **토큰은 같고 밀도만 compact** 임을 명시한다. 글꼴은 cova 규약(Pretendard CDN)과 달리 시스템 스택이다 — 템플릿의 CDN `<link>` 를 빼고 `--font-sans` 를 §5.2 값으로 둔다.

---

## 10. 진행 계획 — 단계 · 산출물 · 완료 조건

앞 단계 PR 이 머지된 뒤 다음 단계. 단계당 PR 1개, 4단계만 화면당 PR.

| 단계 | 이름 | 산출물 | 완료 조건(게이트) | 소요(안) | 상태 |
|---|---|---|---|---|---|
| 0 | 감사 | design_old.html(인벤토리 + 샘플 33) | — | 완료 | ✅ 2026-09-09 |
| 1 | 결정 · 파운데이션 | §11 결정 확정 → 계획 v1 · `tokens.css` 재작성(팔레트 + alias + compact · Inter `@import` 제거 · 시스템 폰트 스택) · `DESIGN.md`/`DESIGN.admin.md` v1 · `design/style-guide.html` · `scripts/tokens-lint.mjs`(src/components·src/ui 안 hex 리터럴 0 — 처음엔 경고, 4단계 끝에 오류) · 대비 검사(토큰 글자/배경 짝 AA) | `npm test` 통과 · 린트 기준선 수치 기록 · 스타일가이드가 브라우저에서 열림 | 1~2일 | ⬜ |
| 2 | 프리미티브 | `ui.css` · `src/ui/` Button · IconButton · Link · Input · TextArea · Select · Checkbox · Radio · Switch · Chip · SegmentedControl · Tabs · Field · Card · Badge · Tag · StatusDot · Avatar · ExtBadge · ProgressBar · Dots · Divider · KeyValue · Notice · Toast · **Modal/ConfirmDialog** · **Drawer** · **BottomTabBar** · EmptyState · Md · icons.jsx(Tabler) · `scripts/ui-gallery.mjs` → `design/component-guide.html` | 프리미티브마다 render-check 케이스(전 상태) · 갤러리 생성 · Btn/Button 두 벌 → Button 하나로 교체(콘솔·직원 모두) · `window.confirm` 11곳 → ConfirmDialog | 3~4일 | ⬜ |
| 3 | 컴포지트 · 셸 | WeekStrip · MonthGrid · TimeGrid · SlotPicker · SearchSuggest · AttachmentChip · FileDropzone · RunStatus · RunCard · ApprovalForm · DoneCard · FollowChips · PanelShell · QuickCard · StatCard · MetricRow · Table(+responsive) · Pagination · FilterBar · ListRow · Timeline · GanttRow · Legend · Board · DiagramNode/Edge/RowLabel · SaveBar · ListEditor · FieldEditor(위젯을 프리미티브로) · **AppShell · ConsoleShell 의 §7.1 폭별 재배치** | 각각 render-check · 갤러리에 포함 · 셸은 1280/1024/768/390 네 폭 캡처 · 기존 화면은 아직 안 건드림 | 4~6일 | ⬜ |
| 4 | 화면 이관 (화면당 PR) | ① S0 로그인 ② S4 개인화 ③ 콘솔 셸+직원 ④ 콘솔 첨부·모델 ⑤ 콘솔 워크플로·연동 ⑥ S1 홈+셸 ⑦ S1 대화+패널 8 ⑧ S2 ⑨ S3 — 각 PR 에 반응형 포함 | PR 마다 **동작 변화 없음** · 이관 전/후 DOM 캡처(capture 스크립트 재사용) 나란히 첨부 · **1280/1024/768/390 네 폭 캡처** · render-check · `npm run build` · 린트 수치가 PR 마다 줄어듦 | 화면당 1~1.5일 | ⬜ |
| 5 | 거버넌스 · 패키지화 | CLAUDE.md 에 규칙 추가(「색·크기는 토큰만 · 새 조각은 갤러리 케이스와 함께」) · 린트를 오류로 승격 · `DESIGN.md` 버전·변경 기록 · 다음 제품이 가져가는 방법(`design/ADOPT.md`: tokens.css + ui.css + src/ui + DESIGN.md 복사 → 나중에 `packages/waple-ui`) · 유니코드 글리프 잔존 0 | 린트 0 · 문서 3종 최신 · 이전 값(§1)이 코드에 없음 | 1일 | ⬜ |

검증 도구는 전부 있는 것으로 한다: `npm test`(순수 모듈) · `npm run render-check`(컴포넌트) · 이번에 만든 DOM 캡처 스크립트(전/후 비교) · Playwright(스크린샷). 픽셀 회귀 도구는 들이지 않는다 — 캡처 DOM 을 나란히 두고 사람이 본다.

---

## 11. 결정 필요 — 회신 부탁 (추천안이 붙어 있다)

| # | 결정 | 선택지 | 추천 | 이유 |
|---|---|---|---|---|
| 1 | 시스템 이름 | ~~Waple DS / UXIS DS~~ | ✅ **Waple DS** (2026-09-09 결정) | 문서·패키지 이름에만 쓴다. 토큰 접두는 붙이지 않는다 |
| 2 | 주색 | **teal 단일** / teal(직원)+blue(콘솔) 유지 | teal 단일 | 연속성의 핵심. blue 는 링크·info 로 내려감. 콘솔 primary 버튼이 teal 로 바뀐다 |
| 3 | 글꼴 | ~~Pretendard / Inter / SF Pro~~ | ✅ **시스템 폰트 스택** (2026-09-09 결정) | 웹폰트 없음 · OS 기본 글꼴. 스택 값과 제약은 §5.2 |
| 4 | 콘솔 톤 | ~~같은 시스템의 compact 밀도 / 별도 톤~~ | ✅ **compact 밀도** (2026-09-09 결정) | 두 벌 금지 원칙. 톤 차이는 밀도·회색 배경(`bg-soft`)으로 낸다 |
| 5 | 반응형 | ~~데스크톱만 / 태블릿·모바일 포함~~ | ✅ **태블릿·모바일까지 이번 라운드에 포함** (2026-09-09 결정) | 규칙은 §7.1. 콘솔의 모바일 범위는 §11-13 |
| 6 | 다크 모드 | **토큰 구조만 준비** / 이번에 제공 | 준비만 | alias 층 분리로 비용 0. 제공은 수요 확인 뒤 |
| 7 | 아이콘 | ~~자체 SVG 세트 / 유니코드 유지~~ | ✅ **Tabler Icons** (2026-09-09 결정) | npm 의존성 없이 SVG 를 `src/ui/icons.jsx` 에 옮겨 담는다(MIT). 대응표는 §5.6 |
| 8 | 문체 | **「-합니다」 통일** / 「-해요」 혼용 유지 | -합니다 | 콘솔·직원 앱·에이전트 답변까지 한 톤 |
| 9 | 스타일 방식 | ~~B안 / A안~~ | ✅ **B안 — CSS 변수 + 의미 클래스 + 프리미티브** (2026-09-09 결정) | §9 |
| 10 | 가이드 산출 | ~~생성 / 손 채움~~ | ✅ **실제 컴포넌트에서 스크립트로 생성** (2026-09-09 결정) | style-guide 템플릿은 그대로, component-guide 는 생성본 |
| 11 | 이번 라운드 범위 | **1~3단계 + 4단계 ①~③** / 4단계 전부 / 1~2단계만 | 1~3 + ①~③ | 작은 화면(로그인·개인화·콘솔 직원)으로 이관 절차를 검증한 뒤 큰 화면 |
| 12 | 회색 보정 | **`#7a7a7a`→`#6e6e73` · `#a8a8ad`→`#86868b`(placeholder 전용)** / 지금 값 유지 | 보정 | AA 미달(§1.2). 눈에 띄는 차이는 거의 없다 |
| 13 | 콘솔의 모바일 범위 | **태블릿(≥768)까지 · 모바일은 「PC 에서 열어 주세요」 안내** / 모바일 읽기 전용 / 모바일 전체 지원 | 태블릿까지 | 콘솔은 표·캔버스·편집기라 좁은 폭에서 얻는 것이 적다. 직원 앱은 모바일까지 전부 |
| 14 | Windows 한글 글꼴 | **스택에 `"Malgun Gothic"` 을 명시** / 주신 스택 그대로(브라우저 폴백) | 명시 | 폴백에 맡기면 브라우저 설정에 따라 다른 글꼴이 뜰 수 있다. 값은 §5.2 |
| 15 | 직원 앱 셸 구조 | ~~레일 64 + 목록 244 / 통합 사이드바~~ | ✅ **Ace Studio 식 통합 사이드바 248** (2026-09-09 결정) | 화면 이동 · 도구 · 고정 · 대화 이력 · 접속자를 한 열로. §7 · design/mood-samples.html |
| 16 | 글로우 CTA 스타일 | A 오로라 채움 / B 민트 / C 틴트 / D 유리 테두리(어두운 면) / E 주색 채움 + teal 링 | A | 화면당 하나 규칙(§5.8). design/color-samples.html 에서 주색과 함께 본다 |
| 17 | 히어로 · 브랜드 면 범위 | 밝은 히어로 + 로그인만 어두운 면 / 어두운 히어로 / 히어로 없이 글로우 버튼만 | 밝은 히어로 + 로그인만 어두운 면 | 일하는 화면은 밝게, 어두운 오로라·하프톤은 로그인·온보딩·빈 상태에만(§5.8) |

회신 형식은 자유다 — 「전부 추천대로」 또는 「2번은 유지, 7번은 나중에」 같은 한 줄이면 v1 으로 확정한다.

---

## 12. 리스크 · 대응

| 리스크 | 대응 |
|---|---|
| 직원이 쓰는 서비스에서 이관 중 회귀 | 화면당 PR · 동작 변화 없음 조건 · 전/후 DOM 캡처 첨부 · 운영 서버는 worktree 로만 |
| 두 벌 공존이 길어짐 | 린트 수치를 PR 마다 기록, 4단계 끝에 오류로 승격 · 기한을 작업계획서에 박는다 |
| `<div onClick>` → `<button>` 으로 바꾸면 기본 스타일이 새어 들어옴 | `ui.css` 첫 줄에 button/input 리셋 |
| 모달·포커스 트랩·툴팁을 직접 구현 | 최소 구현(ESC · Tab 순환 · 배경 클릭) · 갤러리 케이스로 고정 |
| 시스템 폰트라 OS 마다 한글 모양·굵기가 다름(맑은 고딕은 400·700 뿐) | 글꼴 이름을 규격에 박지 않고 스케일·굵기 짝(굵기+크기/색)으로 위계를 만든다 · 갤러리를 macOS·Windows 에서 각각 확인 · 필요하면 Windows 만 `"Malgun Gothic"` 을 스택에 명시하는 것을 §11 후속 결정으로 |
| 주색을 바꾸면 콘솔·직원 앱의 인상이 동시에 바뀜 | 후보를 실제 화면에 입힌 샘플(design/color-samples.html)로 보고 결정(§11-2) · 상태색은 주색과 무관하게 고정 |
| 반응형 포함으로 범위·기간 확대 | 셸 2종(Drawer · BottomTabBar)과 폭별 규칙(§7.1)을 3단계에서 먼저 만들고, 화면 PR 은 재배치만 · 네 폭 캡처를 PR 조건으로 · 콘솔은 태블릿까지(§11-13) |

---

## 13. 다음 행동

- [ ] §11 결정 12개 회신 → 이 문서 v1 확정(변경 이력 표 추가)
- [ ] 작업계획서 작성(`docs/design-system-workplan.md` — 기존 workplan 형식: 단계 · 작업 번호 · 검증 게이트 · 상태 표)
- [ ] 브랜치 `feat/design-system-1` 에서 1단계 착수
- [ ] 1단계 끝에 스타일가이드 링크와 린트 기준선 수치를 이 문서에 기록

---

## 부록 A. 현재 값 → 토큰 매핑표 (이관할 때 찾아보는 표)

### 색

| 지금 | 토큰 |
|---|---|
| `#1d1d1f` | `--color-text` · `--color-secondary`(검정 버튼) |
| `#333333` | `--color-text` 로 합친다 — 보조 본문·칩 글자용 별도 단을 두지 않는다(대비 12.6:1 → 16.8:1, 눈에 띄는 차이 없음) |
| `#7a7a7a` | `--color-text-secondary`(값 `#6e6e73`) |
| `#a8a8ad` `#c7c7cc` | `--color-text-tertiary`(값 `#86868b`) — placeholder·disabled 만. 본문이면 secondary 로 승격 |
| `#d2d2d7` | `--color-border-strong`(고스트 버튼 테두리 · 아바타 · 스크롤바) |
| `#e0e0e0` | `--color-border` |
| `#f0f0f0` `#f7f7f7` `#ececf0` `#ededed` | `--color-divider` |
| `#f5f5f7` | `--color-bg-soft` |
| `#fafafc` `#fafafa` | `--color-surface-raised` |
| `#0EC8B6` | `--color-primary`(칠) · 글자면 `--color-primary-text` |
| `#0b9c8e` | `--color-primary-strong`(hover) — 글자로 쓰지 않음 |
| `#0b7f74` `#17706a` `#0f4f4a` | `--color-primary-text` |
| `#f0fbfa` `#eefaf8` `#eefbf9` `#f2fbfa` | `--color-primary-soft` |
| `#b8ece6` `#b8e8e2` `#b8ebe6` `#8fdcd3` | `--color-primary-border` |
| `#0066cc` | `--color-info` · 링크 |
| `#0071e3` `#2997ff` | `--color-focus` · 링크 hover |
| `#f0f4ff` `#b8c8f0` `#2b4c9b` | `--color-info-soft` · `-border` · `-text` |
| `#d70015` | `--color-danger` |
| `#98262f` | `--color-danger-text` |
| `#fdf0f0` `#ffeceb` | `--color-danger-soft` |
| `#f0c9cc` `#f0c4c4` | `--color-danger-border` |
| `#c76a00` | `--color-warning` |
| `#a35a00` `#8a5a00` | `--color-warning-text` |
| `#fff7ea` `#f0c98a` | `--color-warning-soft` · `-border` |
| `#8a6d3b` `#fdf6e8` `#f0dfb8` `#f2dfc4` | `--color-sample-text` · `-soft` · `-border` |
| `#8e8e93` `#c8c8cc` | `--color-text-tertiary` · `--color-border-strong` |
| `rgba(14,200,182,.14)` `rgba(199,106,0,.12)` | `--color-primary-soft` · `--color-warning-soft` |
| `rgba(29,29,31,.92)` | `--color-overlay-ink`(토스트) |

### 글자 크기 → §5.2 표 · 둥글기 → §5.4 · 간격 → 가장 가까운 4의 배수

### 컴포넌트 이름

| 지금 | 새 이름 |
|---|---|
| Btn(직원) · Button(콘솔) | Button |
| Chip(직원 선택형) | Chip |
| Chip(콘솔 색 배지) · Chips | Tag |
| Field(직원) · Field(콘솔) · FieldEditor 머리 | Field |
| Notice · SampleBanner · amber/red 상자 | Notice(tone) |
| card 문자열 · CARD · PANEL_SHELL | Card |
| Empty · 「해당하는 첨부가 없습니다」 | EmptyState |
| Typing | Dots |
| Act | ActionText |
| Row(모델) | ModelRow → Radio + ListRow |
| `window.confirm` | ConfirmDialog |
