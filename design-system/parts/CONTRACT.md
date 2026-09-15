# 파트 작성 계약 (컴포넌트·패턴 페이지)

각 파트는 `parts/<group>.mjs` 로, 아래 셋을 export 한다:

```js
export const css = `...`;            // 컴포넌트 CSS 블록. index.html <style> 의 {{COMPONENT_CSS}} 자리에 붙는다
export const pages = `...`;          // <section class="page" id="components/<slug>"> … </section> 들. {{COMPONENT_PAGES}} 자리
export const nav = [['components/<slug>','표시 이름'], …];  // NAV 등록 순서
```
패턴 파트는 id 가 `patterns/<slug>`, nav 도 `patterns/…`.

## 반드시 지킬 것
1. **토큰만 쓴다.** 색·간격·라운드·글자 크기는 `design/design-system/tokens.css` 의 **semantic** 변수만(`--bg-*` `--fg-*` `--stroke-*` `--dim-*` `--radius-*` `--font-size-t*` `--line-height-t*` `--font-weight-*` `--shadow-*` `--spacing-*` `--duration-*` `--easing`). `--palette-*` 와 hex 리터럴은 컴포넌트 CSS 에 **0건**. 예외: `--gradient-glow` `--shadow-glow` 는 Composer CTA 에만.
2. **주색은 검정, 틸은 강조.** 주요 버튼·선택 칩 = `--bg-brand-solid`(잉크). 틸(`--bg-accent-*` `--fg-accent` `--stroke-accent`)은 선택 상태·아이콘 칩·포커스 링·글로우 CTA·틴트에만. 틸 위 글자는 `--fg-on-accent`(검정) — 흰 글자 금지.
3. **페이지 구조는 Button 과 동일** (index.html 의 `components/button` 섹션을 그대로 따른다):
   `<h1>이름 <span class="tag">분류</span></h1>` → `<p class="desc">` → `<h2>Anatomy</h2>`(`.anatomy` 안에 `.demo` + `<ol>`) → `<h2>Properties</h2>`(h3 로 Size·Variant·State·그 외, 각각 `.demo` + 표) → `<h2>Guidelines</h2>`(`.dd` 안에 `.do`/`.dont` 쌍 2개 이상, 데모 포함 가능) → `<h2>A vs. B</h2>` 비교 표(비슷한 컴포넌트가 있을 때) → `<h2>Specification</h2>`(부위 × 토큰 표).
   패턴은 `patterns/loading` 섹션 구조: 개요 → Components 비교 표 → Use cases 표 → 기준 표 → 단계 → 관련 문서 링크.
4. **매 페이지에 실제 CSS 로 렌더링된 데모가 있다.** 이미지·설명만인 페이지 금지. 데모 안 문구는 home.html 도메인(출퇴근·연차·전자결재·업무일지·담당자 찾기·에이전트)으로.
5. 클래스 접두는 컴포넌트마다 고유하게(`.chip` `.badge` `.card` `.row` `.stat` `.seg` `.avatar` `.field` `.switch` `.iconbtn` `.dialog` `.toast` `.empty` `.skel` `.tip` `.composer` `.sbnav` `.daypick` `.notice` · 2차: `.menu` `.popover` `.hovercard` `.msg` `.bubble` `.marker` `.qnr` `.attach` `.dropzone` `.mscroll` `.sheet` `.kbd` `.scrollarea` `.resizable` `.tabset` `.bcrumb` `.pager` `.callout` `.prog` `.pring` `.spinner` `.nbadge` `.result` `.cbox` `.radio` `.timepick` `.form` `.fset` `.slider` `.toggle` `.tgroup` `.btngroup` `.igroup` `.numin` `.gcard` `.frame` `.taggroup` `.navmenu` `.menubar`). 새 파트는 `build.mjs` 의 MORE 배열에 등록하고 `export const tint` 로 옅은 바탕이 필요한 slug 를 알린다. 떠 있는 목록(드롭다운·메뉴바·내비 메뉴)은 `.menu` 마크업(menu.mjs)을 그대로 쓴다 — 항목 CSS 를 새로 만들지 않는다. AI 답변 화면의 조각은 `build.mjs` 의 `AI` 목록에 slug 를 더해 「AI 답변」 그룹으로 모은다(화면 흐름 순서, 나머지 컴포넌트는 ABC 순). 문서 뼈대 클래스(`.demo .card .cards .sw .dd .anatomy .tag .ref .page`)와 **겹치면 안 된다** → 카드 컴포넌트는 `.qcard`, 리스트 행은 `.lrow` 로.
6. 작은 박스(버튼·칩·배지)는 `display:inline-flex;align-items:center;justify-content:center;line-height:1` 로 글자 세로 중앙.
7. 상태(hover·focus-visible·disabled·selected·loading)는 Foundations/State 규칙대로: hover `filter:brightness(.96)`, focus `box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)`, disabled 배경 `--bg-neutral-weak` + 글자 `--fg-disabled`(opacity 금지).
8. 문체 「-합니다」. 한 페이지 HTML 은 120줄 안쪽. 접근성 한 줄(키보드·aria)을 Guidelines 나 Specification 에 넣는다.
9. **아이콘은 `import { icon } from './icons.mjs'` 로만** — `icon('calendar')` 가 Tabler SVG 를 준다. path 를 손으로 쓰거나 글리프(✦ ✓ × + ☰)를 아이콘 대신 쓰지 않는다. 새 아이콘은 `fetch-icons.mjs` 의 NAMES 에 Tabler 이름을 더하고 `node parts/fetch-icons.mjs`. 컴포넌트 CSS 는 svg 의 **크기만** 정한다(`svg.i` 가 stroke 1.75·currentColor 를 정함). **16px 이하는 `name-filled`** (있는 이름만 — icons.mjs 의 PATHS 에 `-filled` 키가 있는지 본다).
10. **Properties 데모는 변형마다 별도 인스턴스** — 한 컨테이너에 한 줄/두 줄, 상태 여러 개를 섞어 넣지 않는다. `<figure class="ex">인스턴스<figcaption>이름 — 한 줄 설명</figcaption></figure>` 로 하나씩, 여러 개면 `.demo.col`.
11. **Anatomy 데모 안에는 컴포넌트만** — 번호 배지·설명 목록을 데모 안에 넣지 않는다(HTML 스니펫이 그 안을 그대로 복사한다). 폭이 넓은 컴포넌트(컴포저·표)는 데모에 `style="flex:1 1 100%"`.
12. 흰 면이 주가 되는 컴포넌트는 build.mjs 의 `TINT` 목록에 넣으면 데모 바탕이 옅어진다.

## 참고 — home.html 에서 본 실제 모양
- 사이드바 248px `--bg-layer-basement`, 항목 hover `--bg-neutral-hover`, 선택 `--bg-neutral-selected` + 굵기 600. 섹션 라벨 t2 muted.
- 빠른 실행 카드: 아이콘 칩(36px, 틴트 배경 + 색 아이콘) · 제목 t6 600 · 설명 t4 subtle · 하단에 작은 outline 버튼들 + 오른쪽 `›` · 우상단 건수 배지(critical-weak/critical). 라운드 lg, 선 `--stroke-neutral-strong`.
- 칩: 알약, t4, `--bg-layer-default` + `--stroke-neutral-strong`; 선택 시 잉크 채움. 제안 프롬프트 칩은 왼쪽에 ✦ 아이콘.
- 배지: t2 500, 알약, 상태별 weak 배경 + fg. 건수 배지는 숫자만.
- 내 현황 stat: 라벨 t3 muted 위, 값 t8 600 아래, 두 칸을 얇은 세로선으로 구분. KV 행은 라벨 subtle / 값 오른쪽 정렬 600.
- 브리핑 행: 아이콘 칩 24px + 문구 + 오른쪽 `›`, 행 사이 `--stroke-neutral`.
- 세그먼트(수신함 47 / 발신함 50): 알약 컨테이너 `--bg-neutral-weak`, 선택 항목 흰 배경 + shadow-1.
- 컴포저: 큰 입력 상자(라운드 lg, 선 strong, focus 시 accent 링), 하단 좌측 첨부 아이콘 버튼 + 「계획 세우기」 outline, 우측 글로우 CTA(`--gradient-glow` + `--shadow-glow`, 글자 흰색 600 15px — 글로우는 15px Bold 이상만 허용되는 유일한 흰 글자).
- 에이전트 안내 말풍선: `--bg-accent-weak` 배경, 왼쪽 ✦ 아이콘, 라운드 md.
- 주간 day picker: 요일 t2 muted 위, 날짜 t5 600 아래, 오늘 = accent 테두리 + fg-accent, 지난 날 = muted.
