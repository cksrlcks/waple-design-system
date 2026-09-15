# Waple DS 컴포넌트 목록 — 스냅숏(자동 생성, 고치지 않는다)

컴포넌트 57개. `slug` 로 `components/<slug>.html`(규격 · 예시 마크업) 과 `components/<slug>.css`(구현) 를 연다.
- 「함께 싣기」 — 그 컴포넌트의 기본 구조(Anatomy 예시) 안에 들어 있는 다른 컴포넌트. **항상** 그 CSS 도 옮긴다.
- 「그 모양을 쓸 때만」 — 페이지의 다른 예시(변형 · 지침 · 비교)에만 나오는 컴포넌트. 그 예시 모양을 화면에 **실제로 쓸 때만** 옮긴다.

## Components

| 컴포넌트 | slug | 무엇 | 함께 싣기 | 그 모양을 쓸 때만 |
|---|---|---|---|---|
| Accordion | `accordion` | 제목만 보이고 눌러야 본문이 펼쳐지는 묶음. | — | — |
| Avatar | `avatar` | 사람을 나타내는 원. | — | — |
| Badge | `badge` | 상태 한 단어(승인 대기 · 반려 · 연결됨)나 건수(6)를 붙이는 작은 표식. | — | — |
| Breadcrumb | `breadcrumb` | 지금 화면이 어디에 있는지 상위 단계부터 보여 주고, 한 번에 위로 올라가게 합니다. | — | `menu` |
| Button | `button` | 사용자가 행동을 실행하게 하는 가장 기본적인 요소. | — | — |
| Button group | `button-group` | 관련된 버튼을 선을 공유해 한 덩어리로 붙입니다. | `button` | `menu` |
| Callout | `callout` | 페이지·폼·패널 안, 관련 내용 바로 위에 머무는 안내입니다. | `button` `icon-button` | `list-row` |
| Card | `card` | 한 대상(회의실 · 연차 · 결재 문서)의 정보와 행동을 한 상자에 묶습니다. | `image-frame` `tag-group` `icon-button` `button` | `list-row` |
| Checkbox | `checkbox` | 목록에서 여럿을 고르거나, 하나를 켜고 끄되 저장 버튼과 함께 제출할 때 씁니다. | — | `field` `table` `badge` |
| Chip | `chip` | 목록을 좁히는 필터, 그리고 「이렇게 물어보셔도 됩니다」의 제안 프롬프트. | — | — |
| Collapsible list | `collapsible-list` | 행 목록을 접는 두 가지 방법. | `list-row` | — |
| Date picker | `date-picker` | 한 달 달력에서 날짜 하나 또는 기간을 고릅니다. | `text-input` `icon-button` `button` | — |
| Dialog | `dialog` | 에이전트가 실행하기 전에 무엇을 할지 확인받는 창입니다. | `button` | — |
| Empty state | `empty-state` | 보여 줄 내용이 없을 때 그 자리를 채우는 안내입니다. | `button` | — |
| Field | `field` | 폼의 한 칸 — 라벨 · 컨트롤 · 도움말 · 오류가 한 묶음입니다. | `text-input` | `select` `switch` `checkbox` `callout` `radio-group` `button` |
| Icon button | `icon-button` | 라벨 없이 아이콘만으로 뜻이 통하는 보조 행동(첨부·닫기·더보기·이전/다음)에 씁니다. | — | — |
| Image frame | `image-frame` | 사진·스캔 한 장을 담는 틀. | — | `skeleton` |
| Input group | `input-group` | Text input 한 칸에 아이콘 · 단위 · 버튼 · 셀렉트를 붙인 묶음. | `text-input` `icon-button` | — |
| Kbd | `kbd` | 단축키를 알려 주는 키 캡입니다. | — | `button` `menu` `tooltip` `icon-button` |
| List row | `list-row` | 목록의 한 줄. | — | `avatar` `icon-button` |
| Menu | `menu` | kebab(⋯)·버튼·우클릭으로 여는 행동 목록입니다. | `icon-button` | `button` `list-row` `tooltip` `quick-card` `sidebar-nav` `table` `badge` `dialog` |
| Menubar | `menubar` | 업무일지 편집기·워크플로 캔버스처럼 명령이 많은 편집 화면 위쪽의 메뉴 줄입니다(파일 · 편집 · 보기 · 도움말). | `menu` | — |
| Navigation menu | `navigation-menu` | 관리자 콘솔·포털 상단의 가로 내비게이션입니다. | `menu` | — |
| Notification badge | `notification-badge` | 아이콘 버튼·아바타·탭·사이드바 항목의 모서리에 붙어 「처리할 새 것이 있다」를 알리는 빨간 점 또는 건수입니다. | `icon-button` | `avatar` `segmented-control` `sidebar-nav` |
| Number input | `number-input` | − 값 + 로 정확한 수를 한 step 씩 바꾸고, 가운데를 눌러 직접 칠 수도 있습니다(seed 의 Quantity picker). | `text-input` `icon-button` | — |
| Pagination | `pagination` | 많은 결과를 쪽으로 나눠 보여 줄 때의 이동입니다. | `icon-button` | `list-row` `button` `table` `select` |
| Popover | `popover` | 트리거 옆에 뜨는 비모달 패널입니다. | `icon-button` `text-input` `button` | `badge` `chip` `switch` `avatar` |
| Progress | `progress` | 작업이 얼마나 진행됐는지(determinate) 또는 진행 중이라는 사실(indeterminate)을 보여 줍니다. | — | — |
| Quick action card | `quick-card` | 홈에서 자주 하는 일을 한 줄로 세운 카드. | `button` | `badge` |
| Radio group | `radio-group` | 2~5개 중 하나만 고르고, 선택지를 전부 보여 비교하게 할 때 씁니다(연차 종류 · 결재 방식). | `field` | `text-input` |
| Resizable | `resizable` | 두 영역 사이의 선을 끌어 폭(높이)을 나눕니다. | — | — |
| Result section | `result-section` | 신청·상신처럼 여러 단계를 거친 행동이 끝났을 때 패널(또는 화면) 전체를 바꿔 결과를 보여 줍니다. | `empty-state` `dialog` `button` | — |
| Scroll area | `scroll-area` | 높이나 폭이 정해진 상자 안에서만 내용을 굴립니다. | `list-row` | `chip` `icon-button` |
| Segmented control | `segmented-control` | 같은 자리에서 보기를 바꾸는 2~4개의 선택지(수신함 47 / 발신함 50). | — | — |
| Select | `select` | 몇 개 안 되는 선택지에서 하나를 고릅니다. | `text-input` | — |
| Settings dialog | `settings-dialog` | 프로필·알림·에이전트·연동·화면·계정을 한 레이어에 모은 설정 창. | `dialog` `avatar` `icon-button` `switch` `select` | `button` `badge` `text-input` |
| Sheet | `sheet` | 화면 가장자리에 붙어 밀려 나오는 떠 있는 면입니다. | `icon-button` `scroll-area` `dialog` `button` | `badge` `sidebar-nav` `list-row` |
| Sidebar nav | `sidebar-nav` | 248px 통합 사이드바(계획서 §11-15). | `icon-button` `avatar` | — |
| Skeleton | `skeleton` | 내용이 오기 전에 화면 구조를 먼저 그려 두는 회색 자리표시입니다. | — | — |
| Slider | `slider` | 정해진 범위 안에서 값을 끌어서 고릅니다. | — | — |
| Switch | `switch` | 켜고 끄는 즉시 반영되는 설정(알림 · 자동 초안 · 연동). | — | — |
| Table | `table` | 열 다섯 개 이상을 정렬·비교해야 하는 목록 — 관리자 콘솔의 결재·직원·연동 현황. | `checkbox` `badge` `icon-button` | — |
| Tabs | `tabs` | 한 화면 안에서 서로 다른 내용 영역을 오갑니다(결재함의 수신함 · 발신함 · 참조 · 임시 저장). | `list-row` | `segmented-control` |
| Tag group | `tag-group` | 한 대상의 속성 두셋(팀 · 직급 · 상태, 형식 · 용량 · 날짜)을 가운뎃점으로 이어 한 줄에 놓는 메타 글줄입니다. | — | `badge` |
| Text input | `text-input` | 라벨 · 입력 상자 · 도움말(또는 오류)이 한 묶음. | — | — |
| Time picker | `time-picker` | 회의 시작·외근 출발처럼 시각을 고릅니다. | `text-input` `button` | `select` `field` |
| Toast | `toast` | 방금 한 행동의 결과를 짧게 알리고 사라지는 떠 있는 알림입니다. | — | — |
| Toggle group | `toggle-group` | 눌림 상태를 가진 버튼(Toggle)의 묶음. | — | — |
| Tooltip | `tooltip` | 아이콘 버튼처럼 라벨이 없는 요소에 마우스를 올리거나 포커스하면 이름을 보여 주는 짧은 말풍선입니다. | `icon-button` | `button` |
| Work panel | `work-panel` | 카드에서 다 담지 못하는 선택을 대화 안에서 이어 받는 패널. | `button` | — |

## AI 답변

| 컴포넌트 | slug | 무엇 | 함께 싣기 | 그 모양을 쓸 때만 |
|---|---|---|---|---|
| Composer | `composer` | 에이전트에게 말을 거는 입력창. | `icon-button` `button` | `attachment` |
| Message | `message` | 대화의 한 턴. | `icon-button` | `attachment` `button` `chip` `avatar` |
| Marker | `marker` | 대화 사이에 끼는 한 줄 표식 — 지금 무엇을 하는지(진행), 무엇이 바뀌었는지(시스템 메모), 어디서 날이 바뀌는지(구분선). | `button` | — |
| Questionnaire | `questionnaire` | 에이전트가 실행 전에 확인을 받는 카드. | `dialog` `button` | `radio-group` `checkbox` `badge` |
| Attachment | `attachment` | 대화에 붙인 파일 하나를 보여 주는 칩입니다. | — | `message` |
| Message scroller | `message-scroller` | 대화가 흐르는 상자. | `marker` `message` `icon-button` `chip` | `button` |
| Agent notice | `agent-notice` | 에이전트가 무엇을 해 주는지, 지금 상태가 어떤지 화면 위쪽에 놓는 사라지지 않는 안내. | — | — |
