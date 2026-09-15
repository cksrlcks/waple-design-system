---
name: building-waple-ui
description: Use when building, restyling, or reviewing UI in a React or plain HTML/CSS (PHP·JSP·static) project for a UXIS/Waple product — buttons, forms, menus, dialogs, cards, tables, AI chat or answer screens — or when asked to apply the Waple design system (와플 디자인 시스템으로 컴포넌트·화면 만들기), including screens that need a component the system does not have.
---

# Waple DS 로 UI 만들기

스냅숏은 이 스킬 폴더 `${CLAUDE_SKILL_DIR}` 에 있고 **원본은 이 폴더뿐이다** — 다른 곳의 디자인 시스템 소스(`parts/*.mjs`, `CONTRACT.md` 같은 문서 작성용 파일)는 읽지 않는다.

- `catalog.md` — 컴포넌트 목록: slug · 한 줄 설명 · 「함께 싣기」 · 「그 모양을 쓸 때만」
- `components/<slug>.html` — 규격 페이지: Anatomy 예시 · 변형 · Guidelines · Specification(접근성)
- `components/<slug>.css` — 구현 CSS
- `foundation/tokens.css` · `foundation/base.css` — 토큰 · 글꼴 · 아이콘 기본(`svg.i`)
- `icons.json` — Tabler 아이콘 이름 → SVG 내부

## 순서

1. **기반부터(프로젝트에 한 번).** `tokens.css` → `base.css` 를 복사해 모든 컴포넌트 CSS 보다 먼저 싣는다 — React 는 진입 파일 import, HTML 은 `<link>`. 이미 있으면 스냅숏과 같은지 확인한다.
2. **catalog.md 에서 고른다.** UI 마다 컴포넌트를 찾아 `components/<slug>.html` 을 읽는다. 목록에 있는 것을 기본 컨트롤이나 새 모양으로 대신하지 않는다 — 날짜 → Date picker, 고르기 → Select · Radio group, 되돌릴 수 없는 행동 확인 → Dialog, 행·카드의 보조 행동 → Menu.
3. **CSS 는 클래스 이름째 옮긴다.** 쓰는 컴포넌트의 `.css` 와 「함께 싣기」 CSS 는 항상, 「그 모양을 쓸 때만」 CSS 는 그 예시 모양을 화면에 실제로 쓸 때만 옮긴다. 값을 고치거나 비슷한 새 클래스로 다시 쓰지 않고, 화면 전용 배치만 새 접두로 덧붙인다.
4. **마크업은 Anatomy 예시대로** — 부위 순서 · 클래스 · `role`/`aria-*`. React 에서 떠 있는 층(Menu · Popover · Tooltip · Sheet · Dialog)은 `createPortal(…, document.body)` 로 그리고 트리거의 `getBoundingClientRect()` 로 `position:fixed` 위치를 잡는다 — 부모 `overflow:hidden` 에 잘리지 않게.
5. **아이콘은 icons.json 값.** 쓰는 이름만 옮긴다. 16px 이하로 그릴 때 `이름-filled` 가 icons.json 에 있으면 그것을 쓴다.
   - HTML: `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">값</svg>` — `-filled` 는 `class="i filled"`
   - React:
     ```jsx
     import ICONS from './icons.json'; // 쓰는 이름만 남긴 사본
     export const Icon = ({ name }) => (
       <svg className={'i' + (name.endsWith('-filled') ? ' filled' : '')} viewBox="0 0 24 24"
         aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
     );
     ```
6. **목록에 없으면** 가까운 컴포넌트를 조합하고, 새 CSS 는 시맨틱 토큰(`--bg-*` `--fg-*` `--stroke-*` `--dim-*` `--radius-*` `--font-size-t*`)만으로 새 접두에 쓴다. 최종 보고에 「디자인 시스템에 없는 컴포넌트: ○○ — 조합한 것 · 새로 정한 값」 한 줄을 남긴다. 디자인 시스템 레포는 고치지 않는다.

## 새로 쓰는 CSS 의 규칙

- 주색은 잉크(`--bg-brand-solid`). 틸(`--bg-accent-*` `--fg-accent` `--stroke-accent`)은 선택 표시 · 아이콘 칩 · 포커스 링 · 틴트에만, 틸 위 글자는 `--fg-on-accent`.
- hex · `--palette-*` · `rgb()` 를 쓰지 않는다.
- 글자는 `--font-size-t1`(13px) 이상. 옮긴 컴포넌트 CSS 의 크기는 그대로 둔다 — 배지 · 메타 · 툴팁의 12px 이하도 규격이다.
- hover `--bg-neutral-hover` · focus `box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)` · disabled `--bg-neutral-weak` + `--fg-disabled`(opacity 로 흐리게 하지 않는다).

## 끝내기 전 확인

- [ ] tokens.css · base.css 가 컴포넌트 CSS 보다 먼저 실린다
- [ ] 쓴 컴포넌트 CSS 를 클래스 이름째 옮겼다 — 「함께 싣기」는 모두 있고, 「그 모양을 쓸 때만」 중 화면에 안 쓰는 것은 없다
- [ ] 새로 쓴 CSS 에 hex · palette · rgb 가 없다
- [ ] 아이콘은 icons.json 값이다
- [ ] 목록에 없는 것을 만들었다면 보고에 적었다
