// 데이터·구조: Date picker · Accordion · Collapsible list · Table
import { icon } from './icons.mjs';
const G = { cal: icon('calendar'), left: icon('chevron-left'), right: icon('chevron-right'), more: icon('dots'), doc: icon('file-text'), clock: icon('clock'), home: icon('home') };
const iconbtn = (cls, icon, label) => '<button class="iconbtn ' + cls + '" aria-label="' + label + '">' + icon + '</button>';

export const css = `
  /* ── Date picker ── */
  .datepick{width:312px;padding:var(--dim-x3);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-floating);box-shadow:var(--shadow-2);font-size:var(--font-size-t2);color:var(--fg-neutral)}
  .datepick__hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--dim-x2);font-size:var(--font-size-t3);font-weight:var(--font-weight-semibold)} .datepick__hd .nav{display:flex;gap:2px}
  .datepick__grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}
  .datepick__wd{text-align:center;height:28px;line-height:28px;font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  .datepick__d{height:36px;border:1px solid transparent;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);color:var(--fg-neutral);cursor:pointer;font-variant-numeric:tabular-nums;position:relative;line-height:normal}
  .datepick__d:hover{background:var(--bg-neutral-hover)} .datepick__d:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .datepick__d.other{color:var(--fg-neutral-placeholder)} .datepick__d.off{color:var(--fg-disabled);cursor:not-allowed;background:transparent}
  .datepick__d.today{border-color:var(--stroke-accent);color:var(--fg-accent);font-weight:var(--font-weight-semibold)}
  .datepick__d.sel{background:var(--bg-brand-solid);border-color:var(--stroke-brand);color:var(--fg-on-brand);font-weight:var(--font-weight-semibold)}
  .datepick__d.in{background:var(--bg-brand-weak);border-radius:0} .datepick__d.sel.start{border-radius:var(--radius-sm) 0 0 var(--radius-sm)} .datepick__d.sel.end{border-radius:0 var(--radius-sm) var(--radius-sm) 0}
  .datepick__d.mark::after{content:"";position:absolute;left:50%;bottom:4px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--bg-accent-solid)} .datepick__d.sel.mark::after{background:var(--fg-on-brand)}
  .datepick__ft{display:flex;justify-content:space-between;align-items:center;margin-top:var(--dim-x2);padding-top:var(--dim-x2);border-top:1px solid var(--stroke-neutral);font-size:var(--font-size-t1);color:var(--fg-neutral-subtle)} .datepick__ft b{color:var(--fg-neutral)}
  /* ── Accordion ── */
  .acc{width:100%;max-width:560px;border-top:1px solid var(--stroke-neutral-strong)} .acc.boxed{border:0;display:flex;flex-direction:column;gap:var(--dim-x2)}
  .acc__item{border-bottom:1px solid var(--stroke-neutral-strong)} .acc.boxed .acc__item{border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default)}
  .acc__item summary{display:flex;align-items:center;gap:var(--dim-x3);min-height:48px;padding:var(--dim-x3) var(--dim-x2);cursor:pointer;list-style:none;font-size:var(--font-size-t3);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .acc__item summary::-webkit-details-marker{display:none}
  .acc.boxed .acc__item summary{padding:var(--dim-x3) var(--dim-x4)}
  .acc__item summary:hover{background:var(--bg-neutral-hover)} .acc__item summary:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .acc__item summary .chev{margin-left:auto;width:18px;height:18px;color:var(--fg-neutral-muted);transition:transform var(--duration-normal) var(--easing)} .acc__item[open] summary .chev{transform:rotate(180deg)}
  .acc__item summary .meta{font-size:var(--font-size-t1);font-weight:var(--font-weight-regular);color:var(--fg-neutral-muted)}
  .acc__panel{padding:var(--dim-x1) var(--dim-x2) var(--dim-x4);font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral-subtle)} .acc.boxed .acc__panel{padding:var(--dim-x1) var(--dim-x4) var(--dim-x4)}
  .acc.compact .acc__item summary{min-height:40px;padding:var(--dim-x2);font-size:var(--font-size-t2)}
  .acc__item.disabled summary{color:var(--fg-disabled);cursor:not-allowed;pointer-events:none} .acc__item.disabled summary .chev{display:none}
  /* ── Collapsible list ── */
  .clist{width:100%;max-width:520px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);overflow:hidden}
  .clist__hd{display:flex;align-items:center;gap:var(--dim-x2);height:40px;padding:0 var(--dim-x3);cursor:pointer;list-style:none;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted);background:var(--bg-layer-basement);border-bottom:1px solid var(--stroke-neutral)} .clist__hd::-webkit-details-marker{display:none}
  .clist__hd .n{margin-left:auto;font-variant-numeric:tabular-nums} .clist__hd .chev{width:16px;height:16px;transition:transform var(--duration-normal) var(--easing)} .clist[open]>.clist__hd .chev{transform:rotate(180deg)}
  .clist__hd:hover{color:var(--fg-neutral)} .clist__hd:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .clist:not([open])>.clist__hd{border-bottom:0}
  .clist__more{border-top:1px solid var(--stroke-neutral)} .clist__more summary{display:flex;align-items:center;justify-content:center;gap:var(--dim-x1_5);height:40px;cursor:pointer;list-style:none;font-size:var(--font-size-t2);font-weight:var(--font-weight-medium);color:var(--fg-neutral-subtle)} .clist__more summary::-webkit-details-marker{display:none}
  .clist__more summary:hover{background:var(--bg-neutral-hover)} .clist__more summary .chev{width:16px;height:16px}
  .clist__more[open] summary{order:1;border-top:1px solid var(--stroke-neutral)} .clist__more[open]{display:flex;flex-direction:column;border-top:0} .clist__more[open] summary .chev{transform:rotate(180deg)} .clist__more summary .o,.clist__more[open] summary .c{display:none} .clist__more[open] summary .o{display:inline}
  .clist .lrow{border-radius:0}
  /* ── Table ── */
  .tbl-wrap{width:100%;overflow:auto;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default)}
  .tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral);margin:0}
  .tbl th{position:sticky;top:0;background:var(--bg-layer-basement);text-align:left;vertical-align:middle;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted);padding:0 var(--dim-x3);height:40px;border-bottom:1px solid var(--stroke-neutral-strong);white-space:nowrap}
  .tbl td{padding:0 var(--dim-x3);height:44px;border-bottom:1px solid var(--stroke-neutral);vertical-align:middle;white-space:nowrap}
  .tbl tr:last-child td{border-bottom:0} .tbl tbody tr:hover td{background:var(--bg-neutral-hover)} .tbl tr.selected td{background:var(--bg-brand-weak)}
  .tbl .num{text-align:right;font-variant-numeric:tabular-nums} .tbl th.num{text-align:right} .tbl .meta{color:var(--fg-neutral-muted);font-size:var(--font-size-t1)}
  .tbl th.sort{cursor:pointer} .tbl th.sort:hover{color:var(--fg-neutral)} .tbl th.sorted{color:var(--fg-neutral);font-weight:var(--font-weight-semibold)} .tbl th svg{width:14px;height:14px;vertical-align:-3px;margin-left:2px} .tbl th.sort:not(.sorted) svg{opacity:0} .tbl th.sort:hover svg{opacity:1}
  .tbl td.act{text-align:right;width:1%} .tbl .primary{font-weight:var(--font-weight-semibold)}
  .tbl.compact th{height:36px} .tbl.compact td{height:36px}
  .tbl td.emptycell{height:120px;text-align:center;color:var(--fg-neutral-muted)}
  .tbl-ft{display:flex;align-items:center;gap:var(--dim-x2);padding:var(--dim-x2) var(--dim-x3);border-top:1px solid var(--stroke-neutral);font-size:var(--font-size-t1);color:var(--fg-neutral-subtle)} .tbl-ft .pages{margin-left:auto;display:flex;align-items:center;gap:var(--dim-x1)} .tbl-ft .pages b{font-variant-numeric:tabular-nums;padding:0 var(--dim-x2)}
  .tbl.kv th{position:static;background:transparent;width:120px;height:auto;padding:var(--dim-x2_5) var(--dim-x3);border-bottom:1px solid var(--stroke-neutral);font-size:var(--font-size-t2);vertical-align:top} .tbl.kv td{height:auto;padding:var(--dim-x2_5) var(--dim-x3);white-space:normal} .tbl.kv tr:last-child th{border-bottom:0}
`;

// 2026년 9월 (9/1 화요일 · 오늘 9/9 수). 주말은 off, 이미 신청한 날은 mark
const cal = (opts) => {
  const { sel = [], range = null, mark = [] } = opts;
  const cells = [];
  const push = (n, cls) => cells.push('<button class="datepick__d ' + cls + '">' + n + '</button>');
  push(30, 'other off'); push(31, 'other');
  for (let d = 1; d <= 30; d++) {
    const dow = (d + 1) % 7; // 9/1 = 화(2)
    const c = [];
    if (dow === 0 || dow === 6) c.push('off');
    if (d === 9) c.push('today');
    if (sel.includes(d)) c.push('sel');
    if (range && d > range[0] && d < range[1]) c.push('in');
    if (range && d === range[0]) c.push('sel start'); if (range && d === range[1]) c.push('sel end');
    if (mark.includes(d)) c.push('mark');
    push(d, c.join(' '));
  }
  push(1, 'other'); push(2, 'other'); push(3, 'other off');
  return '<div class="datepick"><div class="datepick__hd"><span>2026년 9월</span><span class="nav">' + iconbtn('sm ghost', G.left, '지난달') + iconbtn('sm ghost', G.right, '다음달') + '</span></div>' +
    '<div class="datepick__grid"><span class="datepick__wd">일</span><span class="datepick__wd">월</span><span class="datepick__wd">화</span><span class="datepick__wd">수</span><span class="datepick__wd">목</span><span class="datepick__wd">금</span><span class="datepick__wd">토</span>' + cells.join('') + '</div>' +
    '<div class="datepick__ft"><span>' + (opts.foot || '') + '</span><button class="btn xs neutral-weak">오늘</button></div></div>';
};
const chev = icon('chevron-down', 'chev');
const accItem = (q, a, attrs) => '<details class="acc__item"' + (attrs || '') + '><summary>' + q + chev + '</summary><div class="acc__panel">' + a + '</div></details>';
const lrow = (icon, tone, text, side) => '<a class="lrow" href="#"><span class="lrow__ico ' + tone + '">' + icon + '</span><span class="lrow__main">' + text + '</span>' + (side ? '<span class="lrow__side">' + side + '</span>' : '') + '</a>';
// 행 선택 체크박스 — forms.mjs 의 Checkbox(.cbox) 마크업 그대로. mixed = 일부 선택(전체 선택 머리)
const chk = (on, label, mixed) => '<label class="cbox"><input type="checkbox"' + (on ? ' checked' : '') + (mixed ? ' aria-checked="mixed"' : '') + ' aria-label="' + label + '"><span class="cbox__box">' + icon('check') + icon('minus') + '</span></label>';
const row = (on, title, who, when, amt, badge, sel) => '<tr' + (sel ? ' class="selected"' : '') + '><td>' + chk(on, title + ' 선택') + '</td><td class="primary">' + title + '</td><td>' + who + '</td><td class="meta">' + when + '</td><td class="num">' + amt + '</td><td>' + badge + '</td><td class="act">' + iconbtn('sm ghost', G.more, '더보기') + '</td></tr>';
const thead = '<thead><tr><th style="width:40px">' + chk(false, '전체 선택', true) + '</th><th class="sort">문서' + icon('arrows-sort') + '</th><th>기안자</th><th class="sort sorted">일시' + icon('arrow-down') + '</th><th class="num sort">금액' + icon('arrows-sort') + '</th><th>상태</th><th></th></tr></thead>';

export const pages = `
<section class="page" id="components/date-picker">
  <h1>Date picker</h1>
  <p class="desc">한 달 달력에서 날짜 하나 또는 기간을 고릅니다. 입력 필드 아래 떠 있는 팝오버이며, 연차·외근·경비처럼 <b>날짜를 직접 골라야 할 때</b> 씁니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex-direction:column;align-items:flex-start;gap:var(--dim-x2)"><div class="field md" style="min-width:200px"><label>시작일</label><div class="ctrl">${G.cal}<input value="2026-09-10"></div></div>${cal({ sel: [10], mark: [3], foot: '9/10 (목) · 1일' })}</div>
    <ol><li><b>Trigger</b> — Text input(아이콘 prefix). 값은 <code>YYYY-MM-DD</code></li><li><b>Header</b> — 년·월 + ‹ › 달 이동</li><li><b>Weekday row</b> — 일~토, t1 muted</li><li><b>Day cell</b> — 36px, 오늘 = accent 테두리, 선택 = 검정, 주말·휴일 = off</li><li><b>Mark</b> — 이미 신청한 날의 점</li><li><b>Footer</b> — 선택 요약 + 「오늘」</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="align-items:flex-start">${cal({ sel: [10], mark: [3], foot: '9/10 (목) · 1일' })}${cal({ range: [14, 16], foot: '9/14 (월) – 9/16 (수) · 3일' })}</div>
  <table><tr><th>Variant</th><th>쓰임</th><th>선택 방식</th></tr><tr><td>single</td><td>외근일 · 경비 발생일 · 회의 날짜</td><td>한 번 누르면 확정, 팝오버 닫힘</td></tr><tr><td>range</td><td>연속 연차 · 출장 기간</td><td>시작 → 끝 두 번. 사이는 brand-weak 로 채움</td></tr></table>
  <h3>State</h3>
  <div class="demo"><button class="datepick__d" style="width:36px">11</button><button class="datepick__d" style="width:36px;background:var(--bg-neutral-hover)">11</button><button class="datepick__d today" style="width:36px">9</button><button class="datepick__d sel" style="width:36px">10</button><button class="datepick__d in" style="width:36px">15</button><button class="datepick__d mark" style="width:36px">3</button><button class="datepick__d other" style="width:36px">31</button><button class="datepick__d off" style="width:36px">12</button></div>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>default / hover</td><td>투명 / <code>--bg-neutral-hover</code></td></tr><tr><td>today</td><td><code>--stroke-accent</code> 테두리 + <code>--fg-accent</code></td></tr><tr><td>selected</td><td><code>--bg-brand-solid</code> 검정 채움</td></tr><tr><td>in-range</td><td><code>--bg-brand-weak</code>, 라운드 없음</td></tr><tr><td>marked</td><td>아래 4px 틸 점 — 이미 신청·기록된 날</td></tr><tr><td>other month</td><td><code>--fg-neutral-placeholder</code>, 누르면 그 달로 이동</td></tr><tr><td>off</td><td>주말·휴일·마감 지난 날. <code>--fg-disabled</code>, 눌리지 않음</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>Footer 에 고른 날짜를 요약합니다(9/14 – 9/16 · 3일). 사용자가 셈하지 않게 일수를 붙입니다.</div>
    <div class="dont"><b>Don&#39;t</b>팝오버 안에 「확인」 버튼을 두지 않습니다 — 날짜를 누르면 곧 값입니다. 실행 확인은 폼의 버튼·Dialog 가 합니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>주말·공휴일·마감 지난 날은 off 로 보여 주고, 왜 안 되는지 툴팁으로 알립니다.</div>
    <div class="dont"><b>Don&#39;t</b>날짜 하나를 고르는 단순 폼에 이 컴포넌트를 쓰지 않습니다 — <code>&lt;input type="date"&gt;</code> 로 충분합니다.</div>
  </div>
  <h2>Date picker vs. Date input</h2>
  <table><tr><th></th><th>Date picker</th><th>Date input</th></tr><tr><td>범위</td><td>아무 달, 달력에서 고름</td><td>아무 날짜(타이핑·브라우저 달력)</td></tr><tr><td>기간 선택</td><td>있음</td><td>없음</td></tr><tr><td>표시·휴일</td><td>신청한 날 표시, 주말·휴일 off</td><td>없음</td></tr><tr><td>구현</td><td>이 컴포넌트</td><td>브라우저 기본</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>패널</td><td>312px · <code>--bg-layer-floating</code> · <code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · <code>--shadow-2</code></td></tr><tr><td>헤더</td><td>t1 600</td></tr><tr><td>요일 / 날짜</td><td>t1 <code>--fg-neutral-muted</code> / t1 <code>tabular-nums</code>, 셀 36px <code>--radius-sm</code></td></tr><tr><td>today / selected / in-range</td><td><code>--stroke-accent</code>+<code>--fg-accent</code> / <code>--bg-brand-solid</code> / <code>--bg-brand-weak</code></td></tr><tr><td>mark</td><td><code>--bg-accent-solid</code> 4px</td></tr><tr><td>접근성</td><td><code>role="grid"</code>, 셀 <code>aria-label="9월 10일 목요일"</code>, ← → ↑ ↓ 이동 · PageUp/Down 달 이동 · Esc 닫기</td></tr></table>
</section>

<section class="page" id="components/accordion">
  <h1>Accordion</h1>
  <p class="desc">제목만 보이고 눌러야 본문이 펼쳐지는 묶음. 사내 규정·자주 묻는 질문·설정 그룹처럼 <b>한 번에 다 읽지 않아도 되는</b> 내용에 씁니다. 브라우저 기본 <code>&lt;details&gt;</code> 로 만들어 스크립트 없이 열리고 닫힙니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1"><div class="acc">${accItem('연차는 언제까지 신청해야 하나요?', '사용일 3일 전까지 상신하면 됩니다. 당일·전일 신청은 팀장 승인이 필요하고, 에이전트가 상신할 때 이를 요약 카드에 표시합니다.', ' open')}</div></div>
    <ol><li><b>Header (summary)</b> — 제목 t1 600, 48px. 전체가 눌립니다</li><li><b>Chevron</b> — 오른쪽 끝, 열리면 180° 회전</li><li><b>Panel</b> — 본문 t1, subtle 색</li><li><b>Divider</b> — 항목 사이 1px 선</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="align-items:flex-start">
    <div class="acc">${accItem('연차는 언제까지 신청해야 하나요?', '사용일 3일 전까지 상신하면 됩니다.', ' open')}${accItem('외근·출장 경비는 어떻게 청구하나요?', '경비·지출 카드에서 금액·내용·영수증을 첨부해 제출합니다.')}${accItem('업무일지는 꼭 매일 써야 하나요?', '연동 소스가 있으면 에이전트가 초안을 만들고, 사용자는 확인만 합니다.')}</div>
    <div class="acc boxed">${accItem('알림 설정 <span class="meta">3개 켜짐</span>', '결재 알림 · 일정 알림 · 브리핑 알림', ' open')}${accItem('연동 <span class="meta">4개</span>', '근태 · 전자결재 · 일정 · 경비')}</div>
  </div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>divider (기본)</td><td>FAQ·규정처럼 글이 많은 묶음</td></tr><tr><td>boxed</td><td>설정 그룹·카드 안. 항목마다 상자</td></tr><tr><td>exclusive</td><td><code>&lt;details name="faq"&gt;</code> — 같은 name 은 하나만 열림. 긴 FAQ 에서 화면이 늘어지지 않게</td></tr></table>
  <h3>Size — 기본 / compact</h3>
  <div class="demo" style="align-items:flex-start">
    <figure class="ex" style="flex:1 1 320px"><div class="acc">${accItem('기본 · 48px', '규정·FAQ 처럼 독립된 페이지에서', ' open')}${accItem('외근·출장 경비는 어떻게 청구하나요?', '')}</div><figcaption>기본 — 머리글 48px · t3</figcaption></figure>
    <figure class="ex" style="flex:1 1 320px"><div class="acc compact">${accItem('compact · 40px', '패널·카드 안에 들어갈 때', ' open')}${accItem('연동 4개', '')}</div><figcaption>compact — 머리글 40px · t2</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo" style="align-items:flex-start">
    <figure class="ex" style="flex:1 1 260px"><div class="acc">${accItem('닫힘', '')}</div><figcaption>closed</figcaption></figure>
    <figure class="ex" style="flex:1 1 260px"><div class="acc">${accItem('열림', '본문이 펼쳐지고 chevron 이 180° 돕니다.', ' open')}</div><figcaption>open</figcaption></figure>
    <figure class="ex" style="flex:1 1 260px"><div class="acc"><details class="acc__item disabled"><summary>disabled — 권한 없음</summary></details></div><figcaption>disabled — chevron 없음, 눌리지 않음</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>제목은 질문이나 명사구 한 줄. 본문에 링크·버튼은 되지만 header 안에는 글자와 메타만.</div>
    <div class="dont"><b>Don&#39;t</b>꼭 읽어야 하는 내용(마감·금액·경고)을 접어 두지 않습니다 — 접힘은 「나중에 봐도 되는 것」의 표시입니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>첫 항목을 열어 두어 무엇이 들어 있는지 보여 줍니다(FAQ). 설정 그룹은 모두 닫힘.</div>
    <div class="dont"><b>Don&#39;t</b>아코디언 안에 아코디언을 넣지 않습니다. 두 단계가 필요하면 페이지를 나눕니다.</div>
  </div>
  <h2>Accordion vs. Collapsible list vs. Tabs</h2>
  <table><tr><th></th><th>Accordion</th><th>Collapsible list</th><th>Tabs</th></tr><tr><td>안에 든 것</td><td>글·설정</td><td>같은 모양의 행</td><td>서로 다른 화면</td></tr><tr><td>여러 개 열림</td><td>가능(exclusive 옵션)</td><td>가능</td><td>하나</td></tr><tr><td>세로 길이</td><td>변함</td><td>변함</td><td>고정</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>header</td><td>48px · t1 600 · hover <code>--bg-neutral-hover</code></td></tr><tr><td>chevron</td><td>18px <code>--fg-neutral-muted</code> · <code>--duration-normal</code> 회전</td></tr><tr><td>panel</td><td>t1 <code>--fg-neutral-subtle</code> · 아래 여백 <code>--dim-x4</code></td></tr><tr><td>divider / boxed</td><td><code>--stroke-neutral-strong</code> / <code>--radius-md</code></td></tr><tr><td>접근성</td><td><code>&lt;details&gt;/&lt;summary&gt;</code> 가 <code>aria-expanded</code> 를 대신합니다. Space·Enter 로 토글, disabled 는 <code>pointer-events:none</code> + <code>aria-disabled</code></td></tr></table>
</section>

<section class="page" id="components/collapsible-list">
  <h1>Collapsible list</h1>
  <p class="desc">행 목록을 접는 두 가지 방법. <b>그룹 접기</b>는 머리글을 눌러 그 그룹의 행을 감추고(사이드바 「사내 시스템」), <b>더보기 접기</b>는 처음 몇 행만 보이고 「펼쳐보기」로 나머지를 엽니다(홈 「빠른 실행」). 둘 다 <code>&lt;details&gt;</code> 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><details class="clist" open><summary class="clist__hd">오늘의 브리핑<span class="n">3</span>${chev}</summary>${lrow(G.doc, 'violet', '결재 6건이 내 처리를 기다립니다')}${lrow(G.clock, 'accent', '오늘 업무일지가 아직 비어 있습니다')}${lrow(G.home, 'info', '잔여 연차 0일')}</details></div>
    <ol><li><b>Group header (summary)</b> — 라벨 t1 500 + 건수 + chevron, 40px, basement 바탕</li><li><b>Rows</b> — List row 그대로</li><li><b>More row</b> — 「펼쳐보기 · N개 더」, 열리면 목록 끝으로 내려가 「접기」</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    <figure class="ex" style="width:100%"><details class="clist"><summary class="clist__hd">사내 시스템<span class="n">7</span>${chev}</summary>${lrow(G.home, 'accent', '종합현황')}${lrow(G.doc, 'violet', '전자결재', '6')}${lrow(G.clock, 'info', '근태')}</details><figcaption>group — 머리글을 눌러 접은 상태. 다시 누르면 열립니다</figcaption></figure>
    <figure class="ex" style="width:100%"><div class="clist">${lrow(G.clock, 'accent', '출퇴근 기록')}${lrow(G.home, 'info', '연차')}${lrow(G.doc, 'violet', '전자결재', '6건')}<details class="clist__more"><summary><span class="c">펼쳐보기 · 6개 더</span><span class="o">접기</span>${chev}</summary>${lrow(G.doc, 'warning', '업무일지')}${lrow(G.clock, 'info', '일정·회의 등록')}${lrow(G.home, 'positive', '담당자 찾기')}</details></div><figcaption>more — 처음 3행만 보이고 「펼쳐보기」로 나머지를 엽니다</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>쓰임</th><th>기본 상태</th></tr><tr><td>group</td><td>사이드바 섹션 · 패널의 묶음. 머리글에 건수</td><td>열림. 사용자가 접은 상태를 기억합니다</td></tr><tr><td>more</td><td>빠른 실행 9개 중 3개만 · 대화 목록 최근 5개</td><td>닫힘. 「펼쳐보기 · N개 더」에 남은 수</td></tr></table>
  <h3>State</h3>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>open / closed</td><td>chevron 180° · 닫히면 머리글 아래 선 없음</td></tr><tr><td>hover</td><td>머리글 글자 <code>--fg-neutral</code> · 더보기 행 <code>--bg-neutral-hover</code></td></tr><tr><td>focus</td><td>안쪽 2px accent 링</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>「더보기」로 감추는 행은 뒤쪽·덜 급한 것. 처리 대기가 있는 행은 항상 보이는 앞쪽에.</div>
    <div class="dont"><b>Don&#39;t</b>그룹 안에 행이 둘뿐이면 접지 않습니다 — 접힘 자체가 한 번의 클릭 비용입니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>남은 개수를 씁니다(「6개 더」). 사용자가 열지 말지 판단할 정보입니다.</div>
    <div class="dont"><b>Don&#39;t</b>「펼쳐보기」가 페이지 이동(「모두 보기」)과 섞이지 않게 — 이동은 링크 문구·화살표로.</div>
  </div>
  <h2>Collapsible list vs. Accordion</h2>
  <table><tr><th></th><th>Collapsible list</th><th>Accordion</th></tr><tr><td>내용</td><td>List row 여러 개</td><td>글·설정 한 덩이</td></tr><tr><td>머리글</td><td>섹션 라벨(t1 muted) 또는 더보기 행</td><td>제목(t1 600)</td></tr><tr><td>자리</td><td>사이드바·홈 패널</td><td>규정·FAQ·설정</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>그룹 머리글</td><td>40px · <code>--bg-layer-basement</code> · t1 500 <code>--fg-neutral-muted</code></td></tr><tr><td>더보기 행</td><td>40px · t1 500 <code>--fg-neutral-subtle</code> · 위 선 <code>--stroke-neutral</code></td></tr><tr><td>컨테이너</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code></td></tr><tr><td>접근성</td><td>머리글은 <code>&lt;summary&gt;</code>, 더보기 행은 남은 수를 문구에 포함(스크린리더가 읽음)</td></tr></table>
</section>

<section class="page" id="components/table">
  <h1>Table</h1>
  <p class="desc">열 다섯 개 이상을 정렬·비교해야 하는 목록 — 관리자 콘솔의 결재·직원·연동 현황. 직원 앱에서는 List row 를 먼저 씁니다. 형태는 <b>데이터 표</b>와 <b>키-값 표</b> 둘입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%"><div class="tbl-wrap"><table class="tbl">${thead}<tbody>${row(true, '(AI_AGENT) 연차 신청의 건', '윤아린2', '09-08 14:48', '—', '<span class="badge warning">승인 대기</span>', true)}${row(false, '9월 지출결의', '박지웅', '09-08 11:43', '184,000', '<span class="badge danger">반려</span>')}</tbody></table><div class="tbl-ft"><span>2건 선택 · 총 57건</span><span class="pages">${iconbtn('sm ghost', G.left, '이전')}<b>1 / 6</b>${iconbtn('sm ghost', G.right, '다음')}</span></div></div></div>
    <ol><li><b>Header</b> — t1 500 muted, basement 바탕, 스크롤해도 고정(sticky)</li><li><b>Sort indicator</b> — 정렬된 열 하나만 진한 글자 + 화살표(arrow-down/up). 정렬 가능한 다른 열은 hover 때만 arrows-sort</li><li><b>Row</b> — 44px, hover 톤, 선택은 brand-weak</li><li><b>Cell</b> — 글자 왼쪽 · 숫자 오른쪽(tabular) · 상태는 Badge</li><li><b>Action column</b> — 맨 오른쪽 iconbtn 하나</li><li><b>Footer</b> — 선택·총 건수 + 페이지 이동</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col" style="padding:0;overflow:hidden;background:transparent;border:0;gap:var(--dim-x4)">
    <div class="tbl-wrap"><table class="tbl compact">${thead}<tbody>${row(false, '(AI_AGENT) 연차 신청의 건', '윤아린2', '09-08 14:48', '—', '<span class="badge warning">승인 대기</span>')}${row(false, '(AI_AGENT) 구매/지출결의서 제출의 건', '윤아린2', '09-08 10:30', '184,000', '<span class="badge danger">반려</span>')}${row(false, '9월 외근 신청', '박지웅', '09-07 16:20', '—', '<span class="badge success">승인 완료</span>')}</tbody></table></div>
    <div class="tbl-wrap" style="max-width:480px"><table class="tbl kv"><tr><th>문서</th><td>(AI_AGENT) 연차 신청의 건</td></tr><tr><th>기안자</th><td>윤아린2 · 디자인1팀1</td></tr><tr><th>기간</th><td>2026-09-10 (목) · 1일</td></tr><tr><th>결재선</th><td>김부장 → 인사팀</td></tr><tr><th>상태</th><td><span class="badge warning">승인 대기</span></td></tr></table></div>
  </div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>data (기본, 44px)</td><td>결재함·직원 목록·연동 현황 — 정렬·선택·행 액션</td></tr><tr><td>data compact (36px)</td><td>수백 행을 훑는 관리자 화면, 로그</td></tr><tr><td>key-value</td><td>상세 정보 한 건 — 라벨 열 120px, 값은 줄바꿈 허용</td></tr></table>
  <h3>State</h3>
  <div class="demo"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>상태</th><th>문서</th><th class="num">금액</th></tr></thead><tbody><tr><td>기본</td><td>9월 지출결의</td><td class="num">184,000</td></tr><tr><td style="background:var(--bg-neutral-hover)">hover</td><td style="background:var(--bg-neutral-hover)">9월 지출결의</td><td class="num" style="background:var(--bg-neutral-hover)">184,000</td></tr><tr class="selected"><td>selected</td><td>9월 지출결의</td><td class="num">184,000</td></tr><tr><td colspan="3" class="emptycell">조건에 맞는 결재가 없습니다</td></tr></tbody></table></div></div>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>hover</td><td>행 전체 <code>--bg-neutral-hover</code></td></tr><tr><td>selected</td><td><code>--bg-brand-weak</code> + 체크박스 검정</td></tr><tr><td>sorted</td><td>헤더 글자 <code>--fg-neutral</code> 600 + arrow-down/up 14px. 다른 정렬 가능 열은 hover 에 arrows-sort</td></tr><tr><td>empty</td><td>한 셀로 합쳐 120px, 문구는 Empty state 규칙</td></tr><tr><td>loading</td><td>행 자리에 Skeleton 3줄, 헤더는 유지</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>숫자·금액·일시는 오른쪽 정렬 + <code>tabular-nums</code>. 단위는 헤더에(금액(원)).</div>
    <div class="dont"><b>Don&#39;t</b>행마다 버튼을 여럿 두지 않습니다 — 액션 열은 「더보기」 하나, 나머지는 행 선택 후 상단 툴바.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>첫 열은 그 행을 알아보게 하는 이름(문서 제목)이고 굵게. 나머지는 400.</div>
    <div class="dont"><b>Don&#39;t</b>줄무늬(zebra)·세로 선을 넣지 않습니다. 행 구분은 <code>--stroke-neutral</code> 한 줄과 hover 로 충분합니다.</div>
  </div>
  <h2>Table vs. List row</h2>
  <table><tr><th></th><th>Table</th><th>List row</th></tr><tr><td>열</td><td>4열 이상, 정렬·비교</td><td>2~3 슬롯</td></tr><tr><td>폭</td><td>≥ 768px, 좁으면 가로 스크롤</td><td>어디서나</td></tr><tr><td>쓰임</td><td>관리자 콘솔</td><td>직원 앱</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>컨테이너</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 가로 스크롤</td></tr><tr><td>헤더</td><td>40px · <code>--bg-layer-basement</code> · t1 500 <code>--fg-neutral-muted</code>(정렬된 열만 <code>--fg-neutral</code> 600) · 아래 선 strong</td></tr><tr><td>셀</td><td>44px(compact 36) · t1 · 좌우 <code>--dim-x3</code> · 아래 선 <code>--stroke-neutral</code></td></tr><tr><td>hover / selected</td><td><code>--bg-neutral-hover</code> / <code>--bg-brand-weak</code></td></tr><tr><td>키-값 라벨</td><td>120px · t1 <code>--fg-neutral-muted</code></td></tr><tr><td>접근성</td><td><code>&lt;th scope="col"&gt;</code>, 정렬 열 <code>aria-sort</code>, 선택 체크박스에 행 이름 라벨, 액션 iconbtn 에 <code>aria-label</code></td></tr></table>
</section>
`;

export const nav = [['components/date-picker', 'Date picker'], ['components/accordion', 'Accordion'], ['components/collapsible-list', 'Collapsible list'], ['components/table', 'Table']];
