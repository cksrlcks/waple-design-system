// 셸: FAB · Navigation menu · Menubar · Footer. 떠 있는 목록은 전부 공유 .menu(menu.mjs) — 항목 CSS 를 새로 만들지 않는다
import { icon } from './icons.mjs';

export const css = `
  /* ── Navigation menu ── 데스크톱 상단 가로 내비. 펼침 트리거는 공유 .menu(두 줄 항목)를 패널로 연다 */
  .navmenu>ul{display:flex;align-items:center;gap:var(--dim-x1);margin:0;padding:0;list-style:none}
  .navmenu li{position:relative;margin:0}
  .navmenu__link{display:inline-flex;align-items:center;justify-content:center;gap:var(--dim-x1);height:36px;padding:0 var(--dim-x3);border:0;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);font-weight:var(--font-weight-medium);line-height:1;color:var(--fg-neutral-subtle);white-space:nowrap;cursor:pointer;transition:background var(--duration-fast),color var(--duration-fast)}
  .navmenu__link svg{width:16px;height:16px;color:var(--fg-neutral-muted);transition:transform var(--duration-normal) var(--easing)}
  .navmenu__link:hover,.navmenu__link[aria-expanded="true"]{background:var(--bg-neutral-hover);color:var(--fg-neutral)} .navmenu__link[aria-expanded="true"] svg{transform:rotate(180deg)}
  .navmenu__link[aria-current="page"],.navmenu__link.current{background:var(--bg-neutral-selected);color:var(--fg-neutral);font-weight:var(--font-weight-semibold)} /* .current = 하위 페이지에 있을 때의 부모 트리거 */
  .navmenu__link:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .navmenu__panel{position:absolute;top:calc(100% + var(--dim-x1));left:0;z-index:2;width:300px}
  /* ── Menubar ── 편집기 머리의 메뉴 줄(파일·편집·보기·도움말). 항목마다 공유 .menu 를 연다 — roving tabindex */
  .menubar{display:inline-flex;align-items:center;gap:var(--dim-x0_5)}
  .menubar__slot{position:relative}
  .menubar__item{display:inline-flex;align-items:center;justify-content:center;height:28px;padding:0 var(--dim-x2_5);border:0;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);line-height:1;color:var(--fg-neutral);white-space:nowrap;cursor:pointer;transition:background var(--duration-fast)}
  .menubar__item:hover{background:var(--bg-neutral-hover)} .menubar__item[aria-expanded="true"]{background:var(--bg-neutral-selected)}
  .menubar__item:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .menubar__panel{position:absolute;top:calc(100% + var(--dim-x1));left:0;z-index:2;width:220px}
  .menubar__sub{position:relative} .menubar__sub>.menu{position:absolute;top:calc(-1 * var(--dim-x1_5));left:calc(100% + var(--dim-x1_5));z-index:3;width:200px}
`;

const PLUS = icon('message-plus'), CHEV = icon('chevron-down'), SEP = '<hr class="menu__sep">';
const C1 = '<colgroup><col style="width:120px"></colgroup>'; // 표 첫 열(짧은 라벨)이 음절 단위로 쪼개지지 않게

// FAB — 375px 화면 틀: 대화 목록 + FAB + 하단 탭 자리
const RING = 'box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)';

// Navigation menu — 패널은 공유 .menu 두 줄 항목(링크 목록, disclosure 패턴)
const two = (ic, t, d) => '<a class="menu__item two" href="#">' + icon(ic) + '<span class="menu__text">' + t + '<small>' + d + '</small></span></a>';
const PANELS = {
  wf: two('sitemap', '단계 편집', '요청이 거치는 단계와 결재선') + two('adjustments-horizontal', '조건 값', '기준 시간·한도·예시 문구') + two('history', '실행 기록', '최근 실행과 실패 사유') + SEP + '<a class="menu__item" href="#">' + icon('help-circle') + '<span class="menu__text">워크플로 도움말</span><span class="menu__end">' + icon('external-link') + '</span></a>',
  link: two('plug-connected', '연동 현황', '사내 시스템 9종의 연결 상태') + two('book', '외부 시스템 대장', '주소·자격증명 이름·상태') + two('settings', '공유 MCP 서버', 'waple · uxis-rag 점검과 재시작'),
};
const trig = (t, id, open) => '<li><button class="navmenu__link" aria-expanded="' + open + '"' + (open ? ' aria-controls="nm-' + id + '"' : '') + '>' + t + CHEV + '</button>' + (open ? '<div class="menu navmenu__panel" id="nm-' + id + '">' + PANELS[id] + '</div>' : '') + '</li>';
const navmenu = (open) => '<nav class="navmenu" aria-label="관리자 메뉴"><ul><li><a class="navmenu__link" href="#" aria-current="page">대시보드</a></li><li><a class="navmenu__link" href="#">직원</a></li>' + trig('워크플로', 'wf', open === 'wf') + trig('연동', 'link', open === 'link') + '</ul></nav>';

// Menubar — 메뉴 내용(업무일지 편집기)
const mi = (text, end, o = {}) => '<button class="menu__item' + (o.cls ? ' ' + o.cls : '') + '" role="' + (o.role || 'menuitem') + '"' + (o.attrs || '') + '>' + (o.icon ? icon(o.icon) : '') + '<span class="menu__text">' + text + '</span>' + (end ? '<span class="menu__end">' + end + '</span>' : '') + '</button>';
const chk = (t, on) => mi(t, on ? icon('check') : '', { role: 'menuitemcheckbox', attrs: ' aria-checked="' + on + '"' });
const FILE = mi('새 업무일지', 'Ctrl+N') + mi('열기…', 'Ctrl+O') + SEP + mi('저장', 'Ctrl+S') + mi('사본 만들기') + SEP + mi('결재 상신…') + mi('인쇄', 'Ctrl+P');
const VIEW = chk('미리보기 패널', true) + chk('연동 소스 표시', true) + chk('줄 간격 넓게', false) + SEP + mi('확대', 'Ctrl+=') + mi('축소', 'Ctrl+-');
const FORMAT = mi('굵게', 'Ctrl+B', { icon: 'bold' }) + mi('기울임', 'Ctrl+I', { icon: 'italic' }) + mi('밑줄', 'Ctrl+U', { icon: 'underline' });
const subT = (open) => mi('서식', icon('chevron-right'), { cls: open ? 'active' : '', attrs: ' aria-haspopup="menu" aria-expanded="' + open + '"' });
const EDIT = (open) => mi('실행 취소', 'Ctrl+Z') + mi('다시 실행', 'Ctrl+Y', { cls: 'disabled', attrs: ' aria-disabled="true"' }) + SEP + mi('잘라내기', 'Ctrl+X') + mi('복사', 'Ctrl+C') + mi('붙여넣기', 'Ctrl+V') + SEP + (open ? '<div class="menubar__sub" role="none">' + subT(true) + '<div class="menu" role="menu" aria-label="서식">' + FORMAT + '</div></div>' : subT(false)) + SEP + mi('삭제', 'Del', { cls: 'danger' });
const menu = (label, body) => '<div class="menu" role="menu" aria-label="' + label + '">' + body + '</div>';
const menubar = (open, body) => '<div class="menubar" role="menubar" aria-label="업무일지 편집기">' + ['파일', '편집', '보기', '도움말'].map(t => '<div class="menubar__slot" role="none"><button class="menubar__item" role="menuitem" aria-haspopup="menu" aria-expanded="' + (t === open) + '"' + (t === open ? '' : ' tabindex="-1"') + '>' + t + '</button>' + (t === open ? '<div class="menu menubar__panel" role="menu" aria-label="' + t + '">' + body + '</div>' : '') + '</div>').join('') + '</div>';

// Footer
export const pages = `


<section class="page" id="components/navigation-menu">
  <h1>Navigation menu</h1>
  <p class="desc">관리자 콘솔·포털 상단의 가로 내비게이션입니다. 최상위 항목은 페이지로 가는 <b>링크</b>이거나 하위 페이지 목록을 여는 <b>트리거</b>이고, 펼친 패널은 공유 Menu 의 두 줄 항목을 그대로 씁니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%;align-items:flex-start;min-height:300px">${navmenu('wf')}</div>
    <ol><li><b>List</b> — <code>&lt;nav&gt;</code> 안의 가로 목록, 항목 사이 <code>--dim-x1</code></li><li><b>Link</b> — 36px, t2 500 subtle. 현재 페이지는 회색 채움 + 600</li><li><b>Trigger</b> — 라벨 + chevron-down 16px. 열리면 hover 배경 + chevron 180°</li><li><b>Panel</b> — 공유 Menu(<code>.menu</code>) 300px. 두 줄 항목(아이콘 18 + 제목 + 설명), 트리거 왼쪽 끝에 맞춰 4px 아래</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Item</h3>
  <div class="demo">
    <figure class="ex"><a class="navmenu__link" href="#">직원</a><figcaption>link — 누르면 그 페이지로</figcaption></figure>
    <figure class="ex"><button class="navmenu__link" aria-expanded="false">연동${CHEV}</button><figcaption>trigger — 누르면 패널을 엽니다</figcaption></figure>
  </div>
  <table><tr><th>종류</th><th>마크업</th><th>규칙</th></tr><tr><td>link</td><td><code>&lt;a href&gt;</code></td><td>하위 페이지가 없는 섹션(대시보드·직원)</td></tr><tr><td>trigger</td><td><code>&lt;button aria-expanded aria-controls&gt;</code> + chevron-down</td><td>하위 페이지가 둘 이상인 섹션. 자기 페이지가 없고, 하나뿐이면 link 로 바꿉니다</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    <figure class="ex"><a class="navmenu__link" href="#">직원</a><figcaption>기본</figcaption></figure>
    <figure class="ex"><a class="navmenu__link" href="#" style="background:var(--bg-neutral-hover);color:var(--fg-neutral)">직원</a><figcaption>hover</figcaption></figure>
    <figure class="ex"><a class="navmenu__link" href="#" aria-current="page">대시보드</a><figcaption>현재 — aria-current</figcaption></figure>
    <figure class="ex"><button class="navmenu__link" aria-expanded="true">워크플로${CHEV}</button><figcaption>열림 — chevron 180°</figcaption></figure>
    <figure class="ex"><a class="navmenu__link" href="#" style="${RING}">직원</a><figcaption>focus</figcaption></figure>
  </div>
  <table>${C1}<tr><th>상태</th><th>표현</th></tr><tr><td>hover · 열림</td><td><code>--bg-neutral-hover</code> + 글자 <code>--fg-neutral</code></td></tr><tr><td>현재</td><td><code>--bg-neutral-selected</code> + 600. 하위 페이지에 있을 때는 부모 트리거에 <code>.current</code>(같은 채움), 패널 안 링크에 <code>aria-current="page"</code></td></tr><tr><td>focus</td><td>바깥 틸 링. 패널 항목은 Menu 규칙대로 안쪽 2px</td></tr></table>
  <h3>Panel</h3>
  <div class="demo" style="align-items:flex-start;min-height:250px">${navmenu('link')}</div>
  <table><tr><th>규칙</th><th>내용</th></tr><tr><td>항목</td><td>공유 Menu 의 <code>.menu__item.two</code> — 아이콘 18 · 제목 t2 · 설명 t1 muted 한 줄. 3~6개</td></tr><tr><td>폭 · 자리</td><td>300px, 트리거 왼쪽 끝에 맞춰 <code>--dim-x1</code> 아래. 오른쪽 자리가 모자라면 트리거 오른쪽 끝에 맞춥니다</td></tr><tr><td>묶음</td><td>6개를 넘으면 <code>.menu__label</code> 로 나눕니다. 바깥 문서는 구분선 아래 한 줄 + external-link</td></tr></table>
  <h3>Open · close</h3>
  <table>${C1}<tr><th>입력</th><th>동작</th></tr><tr><td>마우스</td><td>트리거 위에 150ms 머물면 엽니다(hover-intent). 트리거·패널을 벗어나고 300ms 뒤 닫습니다. 열린 채 옆 트리거로 옮기면 지연 없이 바꿉니다</td></tr><tr><td>클릭 · 터치</td><td>트리거를 누를 때마다 열고 닫습니다. 바깥을 누르면 닫힙니다</td></tr><tr><td>키보드</td><td>← → 로 최상위 항목 사이, ↓ · Enter · Space 로 열고 첫 항목에, 패널 안 ↑ ↓, Esc 로 닫고 트리거로 돌아갑니다</td></tr><tr><td>항목 선택</td><td>페이지로 이동하며 패널이 닫힙니다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo"><a class="navmenu__link" href="#" aria-current="page">대시보드</a><a class="navmenu__link" href="#">직원</a></div>현재 페이지는 회색 채움 + 600 — Sidebar nav 와 같은 표시입니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><a class="navmenu__link" href="#" aria-current="page" style="background:var(--bg-accent-weak);color:var(--fg-accent)">대시보드</a><a class="navmenu__link" href="#">직원</a></div>현재 표시에 틸을 칠하지 않습니다. 밑줄로 바꾸면 Tabs 와 헷갈립니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>최상위 항목은 5~7개, 명사 한 단어(대시보드 · 직원 · 워크플로 · 연동). 트리거는 여는 일만 하고, 섹션 첫 페이지는 패널 첫 항목으로 둡니다.</div>
    <div class="dont"><b>Don&#39;t</b>라벨은 이동·chevron 은 열기처럼 한 항목에 두 동작을 싣지 않습니다. 패널 안에 또 펼침(3단)을 두지 않습니다 — 더 깊으면 그 페이지의 Tabs 로.</div>
  </div>
  <h2>Navigation menu vs. Tabs vs. Sidebar nav</h2>
  <table>${C1}<tr><th></th><th>Navigation menu</th><th>Tabs</th><th>Sidebar nav</th></tr><tr><td>뜻</td><td>사이트 섹션 사이 이동(페이지가 바뀜)</td><td>같은 화면 안 내용 영역 전환</td><td>앱 전체 이동 + 대화 이력</td></tr><tr><td>자리</td><td>화면 상단 가로, 전역</td><td>내용 위, 그 영역에만</td><td>왼쪽 세로 248px</td></tr><tr><td>하위 목록</td><td>펼침 패널(두 줄 항목)</td><td>없음</td><td>접히는 그룹</td></tr><tr><td>마크업</td><td><code>&lt;nav&gt;</code> 링크 + <code>aria-current</code></td><td><code>role="tablist"</code> + <code>aria-selected</code></td><td><code>&lt;nav&gt;</code> 링크 + <code>aria-current</code></td></tr><tr><td>쓰는 곳</td><td>관리자 콘솔 · 포털 · 문서</td><td>패널 · 설정 · 상세 화면</td><td>직원 앱</td></tr></table>
  <h2>Specification</h2>
  <table>${C1}<tr><th>부위</th><th>토큰</th></tr><tr><td>List</td><td>가로 flex · 사이 <code>--dim-x1</code> · <code>&lt;ul&gt;</code> 기본 여백 없음</td></tr><tr><td>Item</td><td>36px · 좌우 <code>--dim-x3</code> · <code>--radius-sm</code> · t2 500 <code>--fg-neutral-subtle</code></td></tr><tr><td>hover · 열림</td><td><code>--bg-neutral-hover</code> + <code>--fg-neutral</code> · chevron 16px <code>--fg-neutral-muted</code>, 열리면 180°(<code>--duration-normal</code>)</td></tr><tr><td>현재</td><td><code>--bg-neutral-selected</code> + 600 <code>--fg-neutral</code></td></tr><tr><td>Panel</td><td>공유 <code>.menu</code> — <code>--bg-layer-floating</code> · <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · <code>--shadow-2</code> · 300px · 트리거 아래 <code>--dim-x1</code></td></tr><tr><td>focus</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px</td></tr><tr><td>접근성</td><td><code>&lt;nav aria-label="관리자 메뉴"&gt;</code> 안 <code>&lt;ul&gt;</code> · 트리거 <code>&lt;button aria-expanded aria-controls&gt;</code> · 패널은 <code>role="menu"</code> 없이 링크 목록(disclosure 패턴) · 키보드는 위 표</td></tr></table>
</section>

<section class="page" id="components/menubar">
  <h1>Menubar</h1>
  <p class="desc">업무일지 편집기·워크플로 캔버스처럼 명령이 많은 편집 화면 위쪽의 메뉴 줄입니다(파일 · 편집 · 보기 · 도움말). 항목마다 공유 Menu 를 열고, 그 화면의 모든 명령과 단축키를 한곳에서 찾게 합니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%;align-items:flex-start;min-height:400px">${menubar('편집', EDIT(true))}</div>
    <ol><li><b>Bar</b> — <code>role="menubar"</code> 가로 줄, 배경 없음(편집기 머리에 얹힘)</li><li><b>Item</b> — 28px, t2 400 ink. 열린 항목은 selected 배경</li><li><b>Menu</b> — 공유 <code>.menu</code> 220px. 오른쪽에 단축키(t1 muted)</li><li><b>Submenu</b> — chevron-right 가 붙은 항목, 부모 메뉴 오른쪽에 붙어 열림(200px)</li><li><b>Separator</b> — 명령 묶음 사이 <code>hr.menu__sep</code>. 위험 항목은 맨 아래</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Item state</h3>
  <div class="demo">
    <figure class="ex"><button class="menubar__item">편집</button><figcaption>기본</figcaption></figure>
    <figure class="ex"><button class="menubar__item" style="background:var(--bg-neutral-hover)">편집</button><figcaption>hover</figcaption></figure>
    <figure class="ex"><button class="menubar__item" aria-expanded="true">편집</button><figcaption>열림 — selected</figcaption></figure>
    <figure class="ex"><button class="menubar__item" style="box-shadow:inset 0 0 0 2px var(--stroke-focus)">편집</button><figcaption>focus — 안쪽 2px</figcaption></figure>
  </div>
  <h3>Menu</h3>
  <div class="demo" style="align-items:flex-start">
    <figure class="ex">${menu('파일', FILE)}<figcaption>파일 — 단축키</figcaption></figure>
    <figure class="ex">${menu('보기', VIEW)}<figcaption>보기 — 체크 항목</figcaption></figure>
    <figure class="ex">${menu('편집', EDIT(false))}<figcaption>편집 — 하위 메뉴 · 비활성 · 위험</figcaption></figure>
  </div>
  <table>${C1}<tr><th>항목</th><th>role</th><th>표시</th></tr><tr><td>명령</td><td><code>menuitem</code></td><td>라벨 + 단축키. 「…」로 끝나면 Dialog 가 열립니다(열기… · 결재 상신…)</td></tr><tr><td>체크</td><td><code>menuitemcheckbox</code> + <code>aria-checked</code></td><td>켜짐이면 오른쪽 check 16px</td></tr><tr><td>하위 메뉴</td><td><code>menuitem aria-haspopup="menu" aria-expanded</code></td><td>오른쪽 chevron-right. 한 단계까지</td></tr><tr><td>비활성</td><td><code>aria-disabled="true"</code></td><td><code>--fg-disabled</code>. 숨기지 않고 자리를 지킵니다</td></tr><tr><td>위험</td><td><code>menuitem</code> + <code>.danger</code></td><td>삭제처럼 되돌릴 수 없는 것. 구분선 뒤 맨 아래</td></tr></table>
  <h3>Keyboard</h3>
  <table><tr><th>키</th><th>동작</th></tr><tr><td>← →</td><td>최상위 항목 사이(끝에서 순환). 메뉴가 열려 있으면 옆 메뉴를 바로 엽니다</td></tr><tr><td>↓ · Enter · Space</td><td>메뉴를 열고 첫 항목으로(↑ 는 마지막 항목으로)</td></tr><tr><td>메뉴 안 ↑ ↓</td><td>항목 사이 이동, 비활성 항목에도 멈춥니다. 글자를 치면 그 글자로 시작하는 항목으로</td></tr><tr><td>메뉴 안 → ←</td><td>하위 메뉴를 열고 닫습니다. 하위 메뉴가 없으면 옆 최상위 메뉴로</td></tr><tr><td>Esc</td><td>메뉴를 닫고 그 최상위 항목으로 포커스를 돌립니다</td></tr><tr><td>Alt · F10</td><td>편집 영역에서 메뉴바 첫 항목으로</td></tr><tr><td>Tab</td><td>메뉴바를 떠납니다 — 줄 안에서 Tab 이 멈추는 곳은 하나(roving tabindex)</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>명령이 스무 개를 넘고 단축키가 있는 편집 화면에만 둡니다. 순서는 관례대로 파일 · 편집 · 보기 · 도움말.</div>
    <div class="dont"><b>Don&#39;t</b>홈·설정·목록 화면에 메뉴바를 두지 않습니다 — Button 과 「더보기」 Menu 로 충분합니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>모든 명령은 메뉴바에 있고, 자주 쓰는 것(굵게 · 기울임)만 툴바에 한 번 더 둡니다. 단축키는 메뉴에 적어 익히게 합니다.</div>
    <div class="dont"><b>Don&#39;t</b>최상위 항목을 누르면 바로 실행되게 하지 않습니다 — 최상위는 메뉴를 여는 일만 합니다. 하위 메뉴는 한 단계까지.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>지금 쓸 수 없는 명령은 비활성으로 남깁니다 — 메뉴 모양이 늘 같아야 위치로 기억합니다.</div>
    <div class="dont"><b>Don&#39;t</b>상황마다 항목을 숨겨 메뉴 길이가 바뀌게 하지 않습니다.</div>
  </div>
  <h2>Menubar vs. Menu vs. Toolbar</h2>
  <table>${C1}<tr><th></th><th>Menubar</th><th>Menu</th><th>Toolbar(Button group)</th></tr><tr><td>모양</td><td>가로 글자 줄 — 파일 · 편집 · 보기</td><td>버튼 하나에 붙은 떠 있는 목록</td><td>아이콘 버튼 줄</td></tr><tr><td>담는 것</td><td>그 화면의 명령 전부 + 단축키</td><td>한 대상의 행동 몇 개(이름 바꾸기 · 삭제)</td><td>자주 쓰는 명령 몇 개(굵게 · 기울임)</td></tr><tr><td>보이는 때</td><td>줄은 늘, 목록은 열어야</td><td>「더보기」를 눌렀을 때만</td><td>늘 — 바로 누름</td></tr><tr><td>키보드</td><td><code>role="menubar"</code> · ← → 로 메뉴 사이</td><td><code>role="menu"</code> · ↑ ↓</td><td><code>role="toolbar"</code> · ← → 로 버튼 사이</td></tr><tr><td>쓰는 곳</td><td>업무일지 편집기 · 워크플로 캔버스</td><td>어디나 — 행·카드의 더보기</td><td>편집기 본문 위</td></tr></table>
  <h2>Specification</h2>
  <table>${C1}<tr><th>부위</th><th>토큰</th></tr><tr><td>Bar</td><td>inline-flex · 사이 <code>--dim-x0_5</code> · 배경·선 없음</td></tr><tr><td>Item</td><td>28px · 좌우 <code>--dim-x2_5</code> · <code>--radius-sm</code> · t2 400 <code>--fg-neutral</code></td></tr><tr><td>hover / 열림</td><td><code>--bg-neutral-hover</code> / <code>--bg-neutral-selected</code></td></tr><tr><td>Menu</td><td>공유 <code>.menu</code> 220px · 항목 아래 <code>--dim-x1</code> · <code>--shadow-2</code> · 단축키 <code>.menu__end</code> t1 <code>--fg-neutral-muted</code></td></tr><tr><td>Submenu</td><td>공유 <code>.menu</code> 200px · 부모 메뉴 오른쪽 바깥, 첫 항목이 트리거와 같은 높이 · 트리거는 <code>.active</code> 로 열린 채 표시</td></tr><tr><td>focus</td><td>항목 안쪽 2px <code>--stroke-focus</code> — 촘촘한 줄이라 바깥 링 대신</td></tr><tr><td>접근성</td><td><code>role="menubar" aria-label</code> · 최상위 <code>role="menuitem" aria-haspopup="menu" aria-expanded</code> · 칸 사이 <code>role="none"</code> · roving <code>tabindex</code> · 비활성도 포커스는 받습니다(<code>aria-disabled</code>)</td></tr></table>
</section>


`;

export const nav = [['components/navigation-menu', 'Navigation menu'], ['components/menubar', 'Menubar']];

export const tint = ['navigation-menu', 'menubar'];
