// 내비게이션: Tabs · Breadcrumb · Pagination
// .tabs · .crumb 는 문서 뼈대가 쓰므로 .tabset · .bcrumb. 떠 있는 목록은 menu.mjs 의 .menu 를 그대로 쓴다
import { icon } from './icons.mjs';

export const css = `
  /* ── Tabs ── 한 화면 안의 서로 다른 내용 영역. 밑줄 하나뿐 — 채움 알약은 Segmented control 의 몫 */
  .tabset{display:flex;flex-direction:column;gap:var(--dim-x3);width:100%;min-width:0}
  .tabset__list{display:flex;align-items:center;min-width:0;box-shadow:inset 0 -1px 0 var(--stroke-neutral-strong)}
  .tabset__tab{display:inline-flex;align-items:center;justify-content:center;gap:var(--dim-x1_5);flex:none;height:44px;padding:0 var(--dim-x3);border:0;background:transparent;font:inherit;font-size:var(--font-size-t2);font-weight:var(--font-weight-medium);line-height:1;color:var(--fg-neutral-subtle);white-space:nowrap;cursor:pointer;box-shadow:inset 0 -2px 0 transparent;transition:color var(--duration-fast) var(--easing),box-shadow var(--duration-fast)}
  .tabset__tab svg{width:18px;height:18px}
  .tabset__tab:hover{color:var(--fg-neutral);box-shadow:inset 0 -2px 0 var(--stroke-neutral-stronger)}
  .tabset__tab[aria-selected="true"]{color:var(--fg-neutral);font-weight:var(--font-weight-semibold);box-shadow:inset 0 -2px 0 var(--stroke-brand);cursor:default}
  .tabset__tab:focus-visible{outline:none;border-radius:var(--radius-sm);box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .tabset__tab:disabled{color:var(--fg-disabled);box-shadow:inset 0 -2px 0 transparent;cursor:not-allowed}
  .tabset.sm .tabset__tab{height:36px;font-size:var(--font-size-t1)} .tabset.sm .tabset__tab svg{width:16px;height:16px}
  .tabset.scroll .tabset__list{overflow-x:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(90deg,black calc(100% - var(--dim-x10)),transparent);mask-image:linear-gradient(90deg,black calc(100% - var(--dim-x10)),transparent)}
  .tabset.scroll .tabset__list::-webkit-scrollbar{display:none}
  .tabset__panel{min-width:0;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral)}
  .tabset__panel:focus-visible{outline:none;border-radius:var(--radius-sm);box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  /* ── Breadcrumb ── 지금 화면의 위치. 상위 단계는 링크, 현재는 글자(aria-current) */
  .bcrumb{display:flex;min-width:0;max-width:100%;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral-muted)}
  .bcrumb ol{display:flex;align-items:center;gap:var(--dim-x2);min-width:0;margin:0;padding:0;list-style:none}
  .bcrumb li{display:inline-flex;align-items:center;gap:var(--dim-x2);min-width:0;margin:0} .bcrumb li>svg{width:16px;height:16px}
  .bcrumb__sep{flex:none;display:inline-flex;color:var(--fg-neutral-placeholder)} .bcrumb__sep svg{width:14px;height:14px}
  .bcrumb.chev ol,.bcrumb.chev li{gap:var(--dim-x1)}
  .bcrumb__link{display:block;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-radius:var(--radius-xs);color:inherit;transition:color var(--duration-fast)} .bcrumb__link:hover{color:var(--fg-neutral)}
  .bcrumb [aria-current="page"]{display:block;max-width:240px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--fg-neutral);font-weight:var(--font-weight-medium)}
  .bcrumb.sm{font-size:var(--font-size-t1);line-height:var(--line-height-t1)} .bcrumb.sm [aria-current="page"]{font-weight:var(--font-weight-semibold)}
  .bcrumb__more{display:inline-flex;align-items:center;justify-content:center;flex:none;width:24px;height:24px;padding:0;border:0;border-radius:var(--radius-xs);background:transparent;color:var(--fg-neutral-muted);line-height:1;cursor:pointer} .bcrumb__more svg{width:16px;height:16px}
  .bcrumb__more:hover,.bcrumb__more[aria-expanded="true"]{background:var(--bg-neutral-hover);color:var(--fg-neutral)}
  .bcrumb__link:focus-visible,.bcrumb__more:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .bcrumb__pop{position:relative;display:inline-flex} .bcrumb__pop>.menu{position:absolute;top:calc(100% + var(--dim-x1_5));left:0;z-index:20} /* Menu 를 dots 버튼 왼쪽 끝에 맞춘다 */
  /* ── Pagination ── 나눠 보는 목록의 이동. compact(‹ 2 / 14 ›) · numbered · load more */
  .pager{display:inline-flex;align-items:center;gap:var(--dim-x1);font-size:var(--font-size-t2);color:var(--fg-neutral-subtle);font-variant-numeric:tabular-nums}
  .pager__page{display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:32px;padding:0 var(--dim-x1_5);border:0;border-radius:var(--radius-sm);background:transparent;font:inherit;line-height:1;color:inherit;cursor:pointer;transition:background var(--duration-fast) var(--easing)}
  .pager__page:hover{background:var(--bg-neutral-hover);color:var(--fg-neutral)}
  .pager__page[aria-current="page"]{background:var(--bg-brand-solid);color:var(--fg-on-brand);font-weight:var(--font-weight-semibold);cursor:default}
  .pager__page:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .pager__gap{display:inline-flex;align-items:center;justify-content:center;width:24px;color:var(--fg-neutral-muted)} .pager__gap svg{width:16px;height:16px}
  .pager__status{padding:0 var(--dim-x2);font-size:var(--font-size-t1);color:var(--fg-neutral-subtle)} .pager__status b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral)}
  .pager.sm{font-size:var(--font-size-t1)} .pager.sm .pager__page{min-width:28px;height:28px}
  .pager.more{display:flex;flex-direction:column;gap:var(--dim-x1_5);width:100%;padding:var(--dim-x3) 0 var(--dim-x2)}
  .tbl-ft .pager{margin-left:auto}
`;

const ib = (cls, name, label, attr) => '<button class="iconbtn ' + cls + '" aria-label="' + label + '"' + (attr || '') + '>' + icon(name) + '</button>';

// Tabs — tab(라벨, 선택, 추가 속성) · tabs(변형, 라벨들, 목록 이름, .tabset 스타일)
const tab = (label, on, attr) => '<button class="tabset__tab" role="tab" aria-selected="' + (on ? 'true' : 'false') + '"' + (on ? '' : ' tabindex="-1"') + (attr || '') + '>' + label + '</button>';
const tabs = (cls, labels, name, style) => '<div class="tabset' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '><div class="tabset__list" role="tablist" aria-label="' + (name || '결재함') + '">' + labels.map((l, i) => tab(l, i === 0)).join('') + '</div></div>';
const one = (t, cap) => '<figure class="ex"><div class="tabset"><div class="tabset__list" role="tablist">' + t + '</div></div><figcaption>' + cap + '</figcaption></figure>';
const appr = (t, meta, side, tone) => '<a class="lrow" href="#"><span class="lrow__main"><b>' + t + '</b><span class="lrow__meta">' + meta + '</span></span><span class="lrow__side ' + tone + '">' + side + '</span></a>';

const TABS = `
<section class="page" id="components/tabs">
  <h1>Tabs</h1>
  <p class="desc">한 화면 안에서 <b>서로 다른 내용 영역</b>을 오갑니다(결재함의 수신함 · 발신함 · 참조 · 임시 저장). 선택한 탭만 2px 잉크 밑줄로 표시하고, 탭 목록 아래에는 그 탭의 패널 하나만 보입니다. 모양은 <b>밑줄 하나뿐</b>입니다 — 채움 알약은 Segmented control 의 모양이고, 같은 데이터의 보기·범위만 바꾸는 2~4칸도 Segmented control 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><div class="tabset"><div class="tabset__list" role="tablist" aria-label="결재함"><button class="tabset__tab" role="tab" id="tab-in" aria-selected="true" aria-controls="panel-in">수신함</button>${tab('발신함')}${tab('참조')}</div><div class="tabset__panel" role="tabpanel" id="panel-in" aria-labelledby="tab-in" tabindex="0">${appr('(AI_AGENT) 연차 신청의 건', '박지웅 · 09-08 11:43', '승인 대기', 'warning')}${appr('(AI_AGENT) 구매/지출결의서', '윤아린2 · 09-08 10:30', '승인 대기', 'warning')}</div></div></div>
    <ol><li><b>Tab list</b> — 탭을 한 줄로 담는 <code>role="tablist"</code>. 넘치면 줄바꿈 대신 가로 스크롤</li><li><b>Tab</b> — 명사 한두 단어, 44px. 목록 아래에는 1px 선</li><li><b>Selected</b> — 2px 잉크 밑줄 + 600. 선택은 항상 하나</li><li><b>Tab panel</b> — 선택한 탭의 내용. <code>aria-controls</code> ↔ <code>aria-labelledby</code> 로 탭과 묶입니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo col">
    <figure class="ex">${tabs('sm', ['수신함', '발신함', '참조'])}<figcaption>sm — 36px · t1. 카드·패널 머리</figcaption></figure>
    <figure class="ex">${tabs('', ['수신함', '발신함', '참조'])}<figcaption>md — 44px · t2. 화면 상단</figcaption></figure>
  </div>
  <table><tr><th>크기</th><th>탭 높이</th><th>글자 · 아이콘</th><th>쓰임</th></tr><tr><td>sm</td><td>36px</td><td>t1 · 16px(<code>-filled</code>)</td><td>카드·패널 머리, 다이얼로그 안</td></tr><tr><td>md</td><td>44px</td><td>t2 · 18px</td><td>화면 상단 — 기본</td></tr></table>
  <h3>Icon</h3>
  <div class="demo col">
    <figure class="ex">${tabs('', [icon('inbox') + '수신함', icon('send') + '발신함', icon('archive') + '임시 저장'])}<figcaption>icon + label — 아이콘은 라벨 앞. 라벨은 빼지 않습니다</figcaption></figure>
  </div>
  <table><tr><th>덧붙임</th><th>규칙</th></tr><tr><td>icon</td><td>탭마다 모두 달거나 모두 빼거나. 아이콘만 있는 탭은 없습니다</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${one(tab('발신함'), '기본')}${one(tab('발신함', false, ' style="color:var(--fg-neutral);box-shadow:inset 0 -2px 0 var(--stroke-neutral-stronger)"'), 'hover')}${one(tab('수신함', true), 'selected')}${one(tab('참조', false, ' style="border-radius:var(--radius-sm);box-shadow:inset 0 0 0 2px var(--stroke-focus)"'), 'focus')}${one(tab('임시 저장', false, ' disabled'), 'disabled')}
  </div>
  <h3>Overflow</h3>
  <div class="demo col">
    <figure class="ex">${tabs('scroll', ['개요', '결재선', '첨부', '의견', '이력', '관련 문서', '참조자'], '결재 문서', 'max-width:340px')}<figcaption>overflow — 한 줄을 지키고 가로 스크롤, 오른쪽 40px 페이드</figcaption></figure>
  </div>
  <table><tr><th>상황</th><th>동작</th></tr><tr><td>탭이 폭을 넘칠 때</td><td>줄바꿈·말줄임 없이 가로 스크롤. 스크롤바는 숨기고 넘친 쪽 끝을 페이드 — 끝에 닿은 쪽은 페이드를 뗍니다</td></tr><tr><td>선택 탭이 가려질 때</td><td>선택·포커스가 옮겨 가면 그 탭이 보이게 목록을 스크롤합니다(<code>scrollIntoView({inline:'nearest'})</code>)</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${tabs('sm', ['수신함', '발신함', '참조'])}</div>라벨은 명사 한두 단어, 탭은 2~7개. 넘치면 한 줄을 지키고 가로로 스크롤합니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="tabset sm"><div class="tabset__list" role="tablist" style="flex-wrap:wrap;max-width:230px">${['수신함', '발신함', '참조', '임시 저장', '반려 문서', '회수 문서'].map((l, i) => tab(l, i === 0)).join('')}</div></div></div>탭을 두 줄로 접지 않습니다 — 어느 줄이 선택 줄인지 헷갈리고, 폭이 바뀌면 탭 자리가 뜁니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>탭은 <b>다른 내용</b>을 나눕니다. 같은 목록을 상태로 거르는 것(전체 · 승인 대기 · 반려)은 Chip, 같은 데이터의 보기 전환은 Segmented control 입니다. home.html 결재함 카드 머리의 채움 알약 탭은 밑줄 Tabs 로 옮기거나, 같은 데이터의 보기 전환이면 Segmented control 로 바꿉니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="tabset"><div class="tabset__list" role="tablist">${tab('수신함', true, ' style="border-radius:var(--radius-full);background:var(--bg-brand-solid);color:var(--fg-on-brand);box-shadow:none"')}${tab('발신함')}</div></div></div>선택 탭을 채워 알약으로 만들지 않습니다 — 채움 알약은 Segmented control 의 모양이고, Tabs 의 선택 표시는 밑줄 하나입니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>탭을 바꿔도 화면은 그대로입니다. 탭마다 스크롤·입력값을 기억하고 주소에 <code>?tab=</code> 로 남겨, 새로 고쳐도 같은 탭이 열립니다.</div>
    <div class="dont"><b>Don&#39;t</b>탭 안에 탭을 겹치지 않습니다 — 밑줄 두 단이 나란히 놓이면 어느 쪽이 지금 영역인지 알 수 없습니다. 두 단이 필요하면 화면을 나눕니다.</div>
  </div>
  <h2>Tabs vs. Segmented control</h2>
  <p>Tabs(밑줄)는 <b>서로 다른 내용 영역</b>을 가릅니다 — 결재함의 수신함 · 발신함처럼 아래 목록 자체가 다른 것으로 바뀝니다. Segmented control 은 <b>같은 데이터의 보기·범위</b>를 바꿉니다 — 목록은 그대로이고 무엇을 어떻게 보여 줄지만 달라집니다. 화면 상단에서 영역을 가르는 자리라면 Tabs 를 먼저 집고, 카드·패널 안에서 같은 목록의 보기만 고르는 자리라면 Segmented control 을 집습니다.</p>
  <div class="demo">
    <figure class="ex">${tabs('sm', ['수신함', '발신함', '참조'])}<figcaption>Tabs — 결재함 화면. 아래 패널이 통째로 바뀝니다</figcaption></figure>
    <figure class="ex"><div class="seg" role="tablist" aria-label="최근 전자결재"><button class="seg__item on" role="tab" aria-selected="true">수신함 <span class="n">47</span></button><button class="seg__item" role="tab" aria-selected="false" tabindex="-1">발신함 <span class="n">50</span></button></div><figcaption>Segmented control — 홈 카드 머리. 같은 목록의 보기만 바뀝니다</figcaption></figure>
  </div>
  <table style="word-break:keep-all"><tr><th></th><th>Tabs</th><th>Segmented control</th></tr>
    <tr><td>뜻</td><td>서로 다른 내용 영역을 가름 — 아래 목록·패널이 통째로 바뀜</td><td>같은 데이터의 보기·범위 전환 — 목록은 그대로</td></tr>
    <tr><td>항목&nbsp;수</td><td>2~7, 넘치면 가로 스크롤</td><td>2~4, 항상 다 보임</td></tr>
    <tr><td>모양</td><td>바탕 없는 탭 줄. 선택은 2px 잉크 밑줄 하나</td><td>회색 트랙 안에서 선택 칸만 흰색 + 그림자</td></tr>
    <tr><td>자리</td><td>화면·패널 상단, 전체 폭</td><td>카드·패널 머리 오른쪽</td></tr>
    <tr><td>예</td><td>결재함 화면 — 수신함 · 발신함 · 참조 · 임시 저장</td><td>홈 「최근 전자결재」 카드 머리 — 수신함 47 · 발신함 50 (home.html <code>.tabs</code>)</td></tr>
    <tr><td>aria</td><td><code>tablist</code> + <code>tabpanel</code></td><td><code>tablist</code> — 패널 없이 같은 목록이 바뀜</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Tab</td><td>sm 36 · md 44px · 좌우 <code>--dim-x3</code> · t1 / t2 500 <code>--fg-neutral-subtle</code> · 탭 사이 간격 없음</td></tr>
    <tr><td>Tab&nbsp;list</td><td>아래 1px <code>--stroke-neutral-strong</code> — 목록 전체 폭</td></tr>
    <tr><td>hover</td><td><code>--fg-neutral</code> + 2px <code>--stroke-neutral-stronger</code> 밑줄</td></tr>
    <tr><td>selected</td><td><code>--fg-neutral</code> 600 + 2px <code>--stroke-brand</code> 밑줄</td></tr>
    <tr><td>Icon</td><td>sm 16px(<code>-filled</code>) · md 18px, 간격 <code>--dim-x1_5</code></td></tr>
    <tr><td>focus / disabled</td><td>안쪽 2px <code>--stroke-focus</code> + <code>--radius-sm</code> / <code>--fg-disabled</code>, 배경·밑줄 없음(Segmented·Menu 항목과 같음)</td></tr>
    <tr><td>Panel</td><td>목록과 <code>--dim-x3</code> · t2 · <code>tabindex="0"</code></td></tr>
    <tr><td>Overflow</td><td>가로 스크롤 · 스크롤바 숨김 · 끝 <code>--dim-x10</code> <code>mask-image</code> 페이드</td></tr>
    <tr><td>접근성</td><td><code>role="tablist"/"tab"/"tabpanel"</code> · <code>aria-selected</code> · 로빙 tabindex(선택 탭만 0) · ← → 이동, Home/End 처음·끝 · 가벼운 패널은 옮기는 즉시 선택, 무거우면 Enter/Space · Tab 은 패널로</td></tr></table>
</section>
`;

// Breadcrumb — crumb(변형, 상위 단계들, 현재, {sep, lead, st(첫 링크 상태 스타일), title}). '<' 로 시작하는 단계는 그대로 넣는다
const SL = '<span class="bcrumb__sep" aria-hidden="true">/</span>';
const CV = '<span class="bcrumb__sep" aria-hidden="true">' + icon('chevron-right') + '</span>';
const crumb = (cls, links, cur, o = {}) => '<nav class="bcrumb' + (cls ? ' ' + cls : '') + '" aria-label="브레드크럼"><ol>' + links.map((l, i) => '<li>' + (i ? (o.sep || SL) : (o.lead || '')) + (l.startsWith('<') ? l : '<a class="bcrumb__link" href="#"' + (o.title ? ' title="' + l + '"' : '') + (i === 0 && o.st ? ' style="' + o.st + '"' : '') + '>' + l + '</a>') + '</li>').join('') + '<li>' + (o.sep || SL) + '<span aria-current="page"' + (o.title ? ' title="' + cur + '"' : '') + '>' + cur + '</span></li></ol></nav>';
const MORE = '<div class="bcrumb__pop"><button class="bcrumb__more" aria-label="숨긴 경로 2개" aria-haspopup="menu" aria-expanded="true">' + icon('dots') + '</button><div class="menu" role="menu" aria-label="숨긴 경로"><button class="menu__item" role="menuitem">' + icon('users') + '<span class="menu__text">직원</span></button><button class="menu__item" role="menuitem">' + icon('building') + '<span class="menu__text">디자인1팀1</span></button></div></div>';
const SPARK = icon('sparkles');

const BCRUMB = `
<section class="page" id="components/breadcrumb">
  <h1>Breadcrumb</h1>
  <p class="desc">지금 화면이 어디에 있는지 상위 단계부터 보여 주고, 한 번에 위로 올라가게 합니다. 상단 바의 「에이전트 / 홈」, 설정 창 머리의 「설정 / 알림」, 관리자 콘솔의 「직원 / 윤아린2」가 모두 이 컴포넌트입니다. 상위 단계는 링크, 마지막(현재)은 링크가 아닌 글자입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${crumb('', ['에이전트', '대화'], '연차 신청', { lead: SPARK })}</div>
    <ol><li><b>Leading icon</b> (선택) — 영역 아이콘 16px. 첫 단계에만</li><li><b>Link</b> — 상위 단계, muted. hover 에 진해집니다</li><li><b>Separator</b> — 「/」 placeholder 색, 스크린리더에서 숨김</li><li><b>Current</b> — 지금 화면. ink, 링크 아님(<code>aria-current="page"</code>)</li><li><b>Collapse</b> (넘칠 때) — 가운데 단계를 dots 버튼 하나로 접고 Menu 로 엽니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    <figure class="ex">${crumb('', ['설정'], '알림')}<figcaption>slash (기본) — 「/」. 상단 바·설정 창 머리 모두</figcaption></figure>
    <figure class="ex">${crumb('chev', ['관리자 콘솔', '직원'], '윤아린2', { sep: CV })}<figcaption>chevron — chevron-right 14px. 목록에서 상세로 「들어가는」 콘솔 화면</figcaption></figure>
    <figure class="ex">${crumb('', ['에이전트'], '홈', { lead: SPARK })}<figcaption>leading icon — 첫 단계 앞에 영역 아이콘(home.html 상단 바)</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>구분자</th><th>쓰임</th></tr><tr><td>slash (기본)</td><td>「/」 글자, <code>--fg-neutral-placeholder</code></td><td>직원 앱 상단 바 · 설정 창 머리</td></tr><tr><td>chevron</td><td>chevron-right 14px</td><td>관리자 콘솔 — 목록 → 상세 → 하위 탭처럼 깊이가 셋 이상</td></tr><tr><td>leading icon</td><td>첫 단계 앞 16px 아이콘</td><td>영역(에이전트 · 관리자 콘솔)을 알려야 할 때 한 곳만</td></tr></table>
  <h3>Size</h3>
  <div class="demo col">
    <figure class="ex">${crumb('sm', ['에이전트'], '홈', { lead: SPARK })}<figcaption>sm — t1 13px, 현재 600. 46px 상단 바</figcaption></figure>
    <figure class="ex">${crumb('', ['설정'], '알림')}<figcaption>md — t2 14px, 현재 500. 설정 창·콘솔 페이지 머리</figcaption></figure>
  </div>
  <table><tr><th>크기</th><th>글자</th><th>현재 단계</th><th>쓰임</th></tr><tr><td>sm</td><td>t1 13px</td><td>600 — 작은 글자에서도 현재가 보이게</td><td>직원 앱 상단 바(home.html <code>.crumb</code>)</td></tr><tr><td>md</td><td>t2 14px</td><td>500</td><td>설정 창 머리(<code>.settings__crumb</code>) · 콘솔 페이지 머리</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    <figure class="ex">${crumb('', ['설정'], '알림')}<figcaption>기본 — 링크 muted</figcaption></figure>
    <figure class="ex">${crumb('', ['설정'], '알림', { st: 'color:var(--fg-neutral)' })}<figcaption>hover — ink</figcaption></figure>
    <figure class="ex">${crumb('', ['설정'], '알림', { st: 'box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)' })}<figcaption>focus — 틸 링</figcaption></figure>
  </div>
  <h3>Overflow</h3>
  <div class="demo col">
    <figure class="ex"><div style="height:132px">${crumb('', ['관리자 콘솔', MORE, '윤아린2'], '연결 상태')}</div><figcaption>collapse — 다섯 단계 → 처음 하나 + 끝 둘. 가운데는 dots 버튼, 누르면 Menu</figcaption></figure>
    <figure class="ex">${crumb('', ['전자결재', '박지웅(기업부설연구소) 결재 요청'], '(AI_AGENT) 구매/지출결의서 제출의 건 — 9월 법인카드 영수증', { title: 1 })}<figcaption>truncate — 링크 160px · 현재 240px 에서 말줄임, 전체 문구는 title</figcaption></figure>
  </div>
  <table style="word-break:keep-all"><tr><th>상황</th><th>규칙</th></tr><tr><td>네&nbsp;단계&nbsp;이상</td><td>첫 단계와 마지막 둘만 남기고 가운데를 dots 버튼 하나로 접습니다. 접힌 단계는 Menu 항목 — 위에서 아래로 원래 순서</td></tr><tr><td>긴 이름</td><td>링크 160px · 현재 240px 에서 한 줄 말줄임. <code>title</code> 에 전체 이름. 줄바꿈하지 않습니다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${crumb('', ['설정'], '알림')}</div>상위 단계만 링크, 현재는 글자. 단계가 둘 이상일 때만 둡니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><nav class="bcrumb" aria-label="브레드크럼"><ol><li><a class="bcrumb__link" href="#">설정</a></li><li>${SL}<a class="bcrumb__link" href="#">알림</a></li></ol></nav></div>현재 화면을 링크로 두지 않습니다 — 눌러도 제자리이고, 어디에 있는지 흐려집니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>브레드크럼은 <b>계층</b>입니다. 방문 순서(뒤로 가기)가 아니므로 어떤 길로 들어와도 같은 경로를 보여 줍니다.</div>
    <div class="dont"><b>Don&#39;t</b>768px 아래에는 두지 않습니다 — 좁은 화면에서는 화면 머리의 뒤로 버튼과 제목이 이 일을 맡습니다.</div>
  </div>
  <h2>Breadcrumb vs. Back link</h2>
  <table><tr><th></th><th>Breadcrumb</th><th>Back link (뒤로)</th></tr><tr><td>보여 주는 것</td><td>전체 경로(계층)</td><td>한 단계 위</td></tr><tr><td>자리</td><td>데스크톱 상단 바 · 설정 창 · 콘솔 머리</td><td>모바일 화면 머리 · 콘솔 「항목 개요」로 돌아가기</td></tr><tr><td>깊이</td><td>2단계 이상, 4단계부터 접힘</td><td>깊이와 상관없이 하나</td></tr><tr><td>현재 위치</td><td>마지막 단계(링크 아님)</td><td>화면 제목이 맡음</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>글자</td><td>md t2 · sm t1 · 링크 <code>--fg-neutral-muted</code>, hover <code>--fg-neutral</code></td></tr>
    <tr><td>Current</td><td><code>--fg-neutral</code> · md 500 · sm 600 · 링크 아님</td></tr>
    <tr><td>Separator</td><td>「/」 <code>--fg-neutral-placeholder</code> · chevron-right 14px · 양옆 <code>--dim-x2</code> (chevron <code>--dim-x1</code>)</td></tr>
    <tr><td>Leading icon</td><td>16px, 링크 글자 색(currentColor)</td></tr>
    <tr><td>말줄임</td><td>링크 최대 160px · 현재 240px · <code>title</code> 에 전체</td></tr>
    <tr><td>Collapse</td><td>dots 24px 버튼 · <code>--radius-xs</code> · 열리면 <code>--bg-neutral-hover</code> · Menu 는 <code>--dim-x1_5</code> 아래</td></tr>
    <tr><td>focus</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px</td></tr>
    <tr><td>접근성</td><td><code>&lt;nav aria-label="브레드크럼"&gt;</code> + <code>&lt;ol&gt;</code> · 현재 <code>aria-current="page"</code> · 구분자 <code>aria-hidden</code> · 접힘 버튼 <code>aria-haspopup="menu" aria-expanded</code> + 「숨긴 경로 2개」 · Tab 으로 링크 순서대로, Menu 안은 ↑ ↓ · Esc 로 닫고 버튼으로 포커스</td></tr></table>
</section>
`;

// Pagination — nums(크기, 쪽 목록(0 = 생략), 현재) · compact(현재, 전체)
const GAP = '<span class="pager__gap" aria-hidden="true">' + icon('dots') + '</span>';
const pnav = (sz, inner, style) => '<nav class="pager' + (sz === 'sm' ? ' sm' : '') + '" aria-label="페이지 이동"' + (style ? ' style="' + style + '"' : '') + '>' + inner + '</nav>';
const pg = (n, cur, attr) => '<button class="pager__page"' + (cur ? ' aria-current="page"' : '') + (attr || '') + '>' + n + '</button>';
const arrows = (sz, first, last, mid) => ib(sz + ' ghost', 'chevron-left', '이전 페이지', first ? ' disabled' : '') + mid + ib(sz + ' ghost', 'chevron-right', '다음 페이지', last ? ' disabled' : '');
const nums = (sz, list, cur, style) => pnav(sz, arrows(sz, cur === list[0], cur === list[list.length - 1], list.map(n => n ? pg(n, n === cur) : GAP).join('')), style);
const compact = (cur, total) => pnav('sm', arrows('sm', cur === 1, cur === total, '<span class="pager__status" aria-live="polite"><b>' + cur + '</b> / ' + total + '</span>'));
const PAGES = [1, 2, 3, 4, 5, 0, 14];

const PAGER = `
<section class="page" id="components/pagination">
  <h1>Pagination</h1>
  <p class="desc">많은 결과를 쪽으로 나눠 보여 줄 때의 이동입니다. 관리자 콘솔 표는 쪽 번호(numbered)나 짧은 「‹ 2 / 14 ›」(compact)로 넘기고, 직원 앱 목록은 끝에 「더 보기」(load more)로 이어 붙입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${nums('md', PAGES, 2)}</div>
    <ol><li><b>Previous / Next</b> — Icon button ghost. 끝에서는 disabled 로 자리를 지킵니다</li><li><b>Page</b> — 32px, 숫자 tabular-nums</li><li><b>Current</b> — 잉크 채움 + 600, <code>aria-current="page"</code></li><li><b>Gap</b> — 건너뛴 쪽. dots 16px, 눌리지 않음</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    <figure class="ex">${nums('md', [1, 0, 6, 7, 8, 0, 14], 7)}<figcaption>numbered — 처음 · 현재 ±1 · 끝. 칸 수를 7로 고정해 폭이 흔들리지 않습니다</figcaption></figure>
    <figure class="ex">${compact(2, 14)}<figcaption>compact — 「‹ 2 / 14 ›」. 표 푸터·패널처럼 좁은 자리(콘솔 첨부 표)</figcaption></figure>
    <figure class="ex"><div class="lrows">${appr('(AI_AGENT) 연차 신청의 건', '박지웅 · 09-08 11:43', '승인 대기', 'warning')}${appr('9월 외근 신청', '윤아린2 · 09-07 16:20', '승인 완료', 'success')}<div class="pager more"><button class="btn md neutral-outline">${icon('chevron-down')}더 보기</button><span class="pager__status">132건 중 20건</span></div></div><figcaption>load more — 목록 끝에 20건씩 이어 붙입니다. 직원 앱·모바일</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>모양</th><th>쓰임</th></tr><tr><td>numbered</td><td>이전 · 쪽 번호 7칸 · 다음</td><td>콘솔 목록·표 — 몇 쪽째인지가 의미 있을 때</td></tr><tr><td>compact</td><td>이전 · 「현재 / 전체」 · 다음</td><td>표 푸터·패널 머리처럼 좁은 자리</td></tr><tr><td>load more</td><td>목록 끝 Button + 보여 준 수</td><td>직원 앱 결재함·대화 목록, 모바일 전부</td></tr></table>
  <h3>Size</h3>
  <div class="demo col">
    <figure class="ex">${nums('sm', PAGES, 3)}<figcaption>sm — 28px · t1. 표 푸터</figcaption></figure>
    <figure class="ex">${nums('md', PAGES, 3)}<figcaption>md — 32px · t2. 목록 아래 단독</figcaption></figure>
  </div>
  <table><tr><th>크기</th><th>쪽 버튼</th><th>이전 · 다음</th><th>쓰임</th></tr><tr><td>sm</td><td>28px · t1</td><td>Icon button sm 28</td><td>표 푸터(<code>.tbl-ft</code>)</td></tr><tr><td>md</td><td>32px · t2</td><td>Icon button md 32</td><td>목록·카드 그리드 아래 단독</td></tr></table>
  <h3>Table footer — 전체 건수 · 쪽 크기</h3>
  <div class="demo col">
    <figure class="ex"><div class="tbl-wrap"><table class="tbl compact"><thead><tr><th>파일</th><th>올린 사람</th><th class="num">크기</th></tr></thead><tbody><tr><td class="primary">20260829_202529-영수증.jpg</td><td>윤아린2</td><td class="num">897KB</td></tr><tr><td class="primary">U+_통화매니저_기업관리자_매뉴얼_v2.pdf</td><td>박지웅</td><td class="num">3.0MB</td></tr></tbody></table><div class="tbl-ft"><span>전체 <b>132</b>건</span><label class="select sm" style="min-width:104px"><select aria-label="쪽당 행 수"><option>10개씩</option><option>20개씩</option><option>50개씩</option></select>${icon('chevron-down')}</label>${nums('sm', PAGES, 1)}</div></div><figcaption>표 푸터 — 왼쪽 전체 건수 · 쪽 크기(Select sm), 오른쪽 이동. 첫 쪽이라 이전은 disabled</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo">
    <figure class="ex"><span class="pager">${pg(3)}</span><figcaption>기본</figcaption></figure>
    <figure class="ex"><span class="pager">${pg(3, false, ' style="background:var(--bg-neutral-hover);color:var(--fg-neutral)"')}</span><figcaption>hover</figcaption></figure>
    <figure class="ex"><span class="pager">${pg(2, true)}</span><figcaption>current</figcaption></figure>
    <figure class="ex"><span class="pager">${pg(3, false, ' style="box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)"')}</span><figcaption>focus</figcaption></figure>
    <figure class="ex">${compact(1, 14)}<figcaption>첫 쪽 — 이전 disabled</figcaption></figure>
    <figure class="ex">${compact(14, 14)}<figcaption>마지막 쪽 — 다음 disabled</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${nums('sm', [1, 0, 6, 7, 8, 0, 14], 7)}</div>칸은 7개 — 처음 · 현재 ±1 · 끝, 나머지는 생략합니다. 쪽을 넘겨도 폭과 버튼 자리가 그대로입니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${nums('sm', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 7, 'flex-wrap:wrap')}</div>쪽 번호를 전부 늘어놓지 않습니다 — 폭이 쪽 수만큼 늘고, 좁은 자리에서 두 줄이 됩니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>직원 앱 목록은 load more — 읽던 자리를 잃지 않고, 보여 준 수(「132건 중 20건」)를 버튼 아래에 적습니다. 콘솔 표는 numbered · compact.</div>
    <div class="dont"><b>Don&#39;t</b>끝에 닿았다고 이전·다음을 숨기지 않습니다 — disabled 로 두어야 다른 버튼이 제자리에 있습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>쪽을 넘기면 표 머리로 스크롤하고 포커스를 첫 행으로 옮깁니다. 쪽 크기를 바꾸면 1쪽으로 돌아갑니다.</div>
    <div class="dont"><b>Don&#39;t</b>스크롤만으로 저절로 붙는 무한 스크롤을 쓰지 않습니다 — 목록 아래 푸터에 닿을 수 없게 됩니다. 사용자가 「더 보기」를 누를 때만 붙입니다.</div>
  </div>
  <h2>Pagination vs. Collapsible list</h2>
  <table><tr><th></th><th>Numbered · Compact</th><th>Load more</th><th>Collapsible list 「펼쳐보기」</th></tr><tr><td>목적</td><td>많은 결과를 쪽으로 나눔</td><td>목록을 이어서 봄</td><td>짧은 목록의 나머지 몇 개</td></tr><tr><td>전체 수</td><td>수십 ~ 수천</td><td>수십 ~ 수백</td><td>10개 안팎</td></tr><tr><td>위치 기억</td><td>주소 <code>?page=3</code></td><td>스크롤 위치</td><td>없음(열림·닫힘만)</td></tr><tr><td>자리</td><td>콘솔 표 푸터</td><td>직원 앱 목록 끝</td><td>홈 카드 · 사이드바</td></tr></table>
  <h2>Specification</h2>
  <table style="word-break:keep-all"><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Page</td><td>sm 28 · md 32px(최소 폭, 두 자리부터 늘어남) · <code>--radius-sm</code> · t1 / t2 tabular-nums <code>--fg-neutral-subtle</code> · 사이 <code>--dim-x1</code></td></tr>
    <tr><td>hover / current</td><td><code>--bg-neutral-hover</code> + <code>--fg-neutral</code> / <code>--bg-brand-solid</code> + <code>--fg-on-brand</code> 600</td></tr>
    <tr><td>Previous / Next</td><td>Icon button ghost sm · md. 끝에서 disabled — <code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr>
    <tr><td>Gap</td><td>dots 16px <code>--fg-neutral-muted</code>, 24px 폭</td></tr>
    <tr><td>Compact&nbsp;상태</td><td>t1 · 현재 600 <code>--fg-neutral</code> / 전체 <code>--fg-neutral-subtle</code> · 좌우 <code>--dim-x2</code></td></tr>
    <tr><td>표 푸터</td><td><code>.tbl-ft</code> 안 — 전체 건수 t1 subtle · Select sm · 이동은 오른쪽 끝</td></tr>
    <tr><td>Load more</td><td>Button md neutral-outline + 보여 준 수 t1 · 위 <code>--dim-x3</code> 아래 <code>--dim-x2</code></td></tr>
    <tr><td>접근성</td><td><code>&lt;nav aria-label="페이지 이동"&gt;</code> · 현재 <code>aria-current="page"</code> · 이전/다음 <code>aria-label</code> + 끝에서 <code>disabled</code> · compact 숫자는 <code>aria-live="polite"</code> · 넘긴 뒤 포커스는 표 첫 행, load more 는 새로 붙은 첫 항목</td></tr></table>
</section>
`;

export const pages = TABS + BCRUMB + PAGER;

export const nav = [['components/tabs', 'Tabs'], ['components/breadcrumb', 'Breadcrumb'], ['components/pagination', 'Pagination']];

export const tint = [];
