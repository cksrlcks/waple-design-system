# Waple DS — 빠진 컴포넌트 (seed-design · shadcn/ui 대비) — 2026-09-11 갱신

> **상태(2026-09-15):** 42개를 문서화한 뒤 디자인 리뷰에서 **10개를 다시 뺐다** → 컴포넌트 **57개**. 뺀 것과 이유는 맨 아래 「도입 후 삭제」. 이 표는 「왜 이 순서였나」의 기록으로 남긴다. 파트별 원본은 `design-system/parts/<파트>.mjs`.

기준: 문서화된 25개(Accordion · Agent notice · Avatar · Badge · Button · Chip · Collapsible list · Composer · Date picker · Dialog · Empty state · Icon button · List row · Quick action card · Segmented control · Select · Settings dialog · Sidebar nav · Skeleton · Switch · Table · Text input · Toast · Tooltip · Work panel) ↔ seed 현행 53개 · shadcn/ui 64개.
중요도: ① 지금 화면(home.html·앱)에 이미 그려져 있는데 규격이 없는 것 → ② seed·shadcn 둘 다 가진 기본기 → ③ 한쪽만 있거나 모바일·특수.
「파트」 열은 이 목록을 채우는 `parts/*.mjs` 파일.

## P0-A — 대화 세트 (가장 큰 구멍)
shadcn 이 대화 컴포넌트(Message · Bubble · Marker · Message Scroller · Attachment · Questionnaire)를 새로 넣었다. 에이전트 제품의 본체인데 계획서 §6 G 의 대화 조각 13개(P0) 중 문서화된 것은 Composer · Quick action card · Work panel 뿐이다.

| 컴포넌트 | seed | shadcn | 우리 화면 근거 | 파트 |
|---|---|---|---|---|
| **Message** (+ Bubble) — 사용자 말풍선 · 답변 · 실행 카드 · 완료 카드 · 후속 칩 | — | Message · Bubble | Thread.jsx `Message`, home.html `.msg` | chat |
| **Marker** — 실행 상태 · 입력 중 점 · 시스템 줄 · 날짜 구분 | — | Marker | Thread.jsx `RunStatus` · `Typing` | chat |
| **Questionnaire** — 실행 전 확인 폼 · 단계형 질문 | — | Questionnaire | Message form — CTA 가 틸 하드코딩(Thread.jsx:311) | chat |
| **Attachment** (+ File dropzone) | Attachment Input | Attachment | Composer 첨부 · SessionFiles · 경비 영수증 | chat |
| **Message scroller** | — | Message Scroller | home.html `.stream` | chat |

## P0-B — 화면에 이미 그려져 있는데 규격이 없음
| 컴포넌트 | seed | shadcn | 근거 | 파트 |
|---|---|---|---|---|
| **Menu** (Dropdown · Context) — 케밥 버튼이 여는 목록. 가장 많이 쓰일 조각 | Menu · Menu Sheet | Dropdown Menu · Context Menu | 카드마다 `card__more` 9개 · `sb__more` · `sec__more` — 누르면 열릴 것이 없음 | menu |
| **Tabs** | Tabs | Tabs | home.html 결재함 탭 | navigation |
| **Breadcrumb** | (Top Navigation 일부) | Breadcrumb | home.html `crumb` · 설정 `settings__crumb` | navigation |
| **Callout** / Alert | Callout · Page Banner | Alert | 계획서 Notice P0 — Agent notice 는 에이전트 전용 | status |
| **Progress** (bar · circle · spinner) | Progress Circle | Progress · Spinner | 막대 4곳 · 버튼 loading | status |
| **Divider** | Divider | Separator | 라벨 있는 구분선 | status |
| **Pagination** | Pagination · Table Pagination | Pagination | 콘솔 첨부 표 | navigation |

## P1 — 다음 화면에서 필요 / 지금은 흉내
| 컴포넌트 | seed | shadcn | 근거 | 파트 |
|---|---|---|---|---|
| Combobox | — | Combobox · Command | 참석자 · 담당자 찾기 | forms |
| Time picker | Time Picker | — | 회의 패널 TimeGrid · SlotPicker | forms |
| Field | Field | Field · Label · Form | 필수·변경 점·검증 시점 규칙 없음, 콘솔 FieldEditor | forms |
| Checkbox | Checkbox | Checkbox | 표의 가짜 `.chk` | forms |
| Radio group | Radio | Radio Group | 모델 선택을 행으로 그림 | forms |
| Card (범용) | — | Card · Item | card 문자열 4벌 | media |
| Popover (+ Hover card) | Help Bubble | Popover · Hover Card | 필터 · 빠른 편집 · 프로필 | menu |
| Sheet (side · bottom) | Bottom Sheet · Side Panel | Sheet · Drawer | 모바일 셸(계획서 §7.1) | overlay |
| Bottom navigation | Bottom Navigation | — | 모바일 셸(계획서 §7.1) | navigation |
| Notification badge | Notification Badge | — | 알림 종 · 탭 · 사이드바 | status |

## P2 — 나중 (모바일·대시보드·특수)
| 컴포넌트 | seed | shadcn | 파트 |
|---|---|---|---|
| Command palette · Kbd | — | Command · Kbd | overlay |
| Scroll area (+ Scroll fog) · Resizable | Scroll Fog | Scroll Area · Resizable | overlay |
| Slider · Toggle group · Button group · Input group · Input OTP · Number input | Slider · Quantity Picker | Slider · Toggle · Toggle Group · Button Group · Input Group · Input OTP | controls |
| Image frame (+ Aspect ratio) · Carousel · Chart · Tag group | Image Frame · Tag Group | Aspect Ratio · Carousel · Chart | media |
| Result section | Result Section | — | status |
| Top navigation | Top Navigation | — | navigation |
| FAB · Navigation menu · Menubar · Footer | Floating Action Button · Contextual Floating Button · Footer | Navigation Menu · Menubar | shell |

## 제외
- 당근 고유: Manner temp · Reaction button · Wheel picker. RTL: Direction.
- 이미 있음: Alert dialog → Dialog destructive · Textarea → Text input 여러 줄 · Calendar → Date picker · Quick card 월 달력 · Snackbar · Sonner → Toast · List · Item → List row · Side navigation → Sidebar nav · Typography → Foundations · Action button → Button · Identity placeholder → Avatar 이니셜 · Content placeholder → Skeleton · Input button → Select · Time picker 트리거.

## 우리에게만 있는 것
Composer · Agent notice · Sidebar nav(통합) · Collapsible list · Quick action card · Work panel · Settings dialog — 에이전트 제품의 고유 컴포넌트로 유지.

## 도입 후 삭제 — 2026-09-15 디자인 리뷰
만들어 놓고 보니 **지금 제품에 자리가 없는 것 10개**를 뺐다(67 → 57). 「우리 화면에 이미 있는가」로 한 번 더 거른 결과다. 되살릴 일이 생기면 이 표의 근거부터 다시 본다.

| 뺀 것 | 대신 쓰는 것 |
|---|---|
| Bottom navigation · Top navigation · FAB | 모바일 셸을 아직 그리지 않는다. 계획서 §7.1 을 실제로 할 때 다시 만든다 |
| Footer | 직원 앱·관리자 콘솔에 바닥글이 없다 |
| Carousel · Chart | 대시보드·이미지 화면이 아직 없다 |
| Combobox · Command palette | 검색은 표·목록 화면에서 한다(Select 는 스무 개까지) |
| Divider | 규칙(여백 → 톤 → 선)은 Foundations 가 갖는다 — 컴포넌트까지는 필요 없다 |
| Input OTP | 진입 코드는 Text input 한 칸으로 받는다 |

같은 리뷰에서 바꾼 것 — **Tabs 는 밑줄 하나만**(pill 은 Segmented control 과 역할이 겹친다) · **Result section 은 Empty state 규격을 따른다**(너무 컸다) · **Attachment** 는 메타 12px · 제거 버튼을 우상단 검은 원으로 · 확장자 썸네일을 회색 하나로 · State 절 삭제.
