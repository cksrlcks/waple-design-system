// 표시·미디어: Card · Image frame · Carousel · Chart · Tag group. 작성 규칙은 CONTRACT.md
import { icon } from './icons.mjs';

export const css = `
  /* ── Card ── 한 대상의 정보·행동을 묶는 일반 상자. 여백은 --gp 하나(md 16 · compact 12) — 미디어·raised 머리는 그만큼 음수 여백으로 가장자리까지 붙는다 */
  .gcard{--gp:var(--dim-x4);display:flex;flex-direction:column;gap:var(--dim-x3);width:100%;min-width:0;padding:var(--gp);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);color:var(--fg-neutral);font-family:inherit;font-size:var(--font-size-t2);line-height:var(--line-height-t2);text-align:left;text-decoration:none;overflow:hidden;transition:border-color var(--duration-fast),box-shadow var(--duration-fast)}
  .gcard.compact{--gp:var(--dim-x3);gap:var(--dim-x2)}
  .gcard__media{margin:calc(var(--gp) * -1) calc(var(--gp) * -1) 0} .gcard__media .frame{border-radius:0} .gcard__media .frame::before{box-shadow:inset 0 -1px 0 var(--stroke-neutral-strong)}
  .gcard__hd{display:flex;align-items:flex-start;gap:var(--dim-x2_5);min-width:0}
  .gcard__tt{flex:1;min-width:0}
  .gcard__t{display:block;margin:0;font-size:var(--font-size-t3);line-height:var(--line-height-t3);font-weight:var(--font-weight-semibold);color:var(--fg-neutral);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .gcard.compact .gcard__t{font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
  .gcard__tt .taggroup{margin-top:var(--dim-x0_5)}
  .gcard__act{flex:none;display:flex;align-items:center;gap:var(--dim-x1);margin:calc(var(--dim-x1) * -1) calc(var(--dim-x1) * -1) 0 0}
  .gcard__act>svg{width:20px;height:20px;margin:var(--dim-x1);color:var(--fg-neutral-muted)}
  .gcard__bd{color:var(--fg-neutral-subtle)}
  .gcard__ft{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:var(--dim-x2);margin-top:auto;padding-top:var(--dim-x1)}
  .gcard__ft .taggroup{margin-right:auto}
  .gcard.raised .gcard__hd{margin:calc(var(--gp) * -1) calc(var(--gp) * -1) 0;padding:var(--dim-x3) var(--gp);background:var(--bg-layer-basement);border-bottom:1px solid var(--stroke-neutral)}
  .gcard.tinted{background:var(--bg-layer-basement);border-color:transparent}
  .gcard.clickable{cursor:pointer} .gcard.clickable:hover{border-color:var(--stroke-neutral-stronger);box-shadow:var(--shadow-1)}
  .gcard:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  /* 선택 = 잉크 2px(1px 선 + 안쪽 1px — 크기가 변하지 않게) + 체크. 틸 선은 포커스 링과 겹쳐 쓰지 않는다 */
  .gcard.selected,.gcard.selected:hover{border-color:var(--stroke-brand);box-shadow:inset 0 0 0 1px var(--stroke-brand)} .gcard.selected .gcard__act>svg{color:var(--fg-neutral)}
  .gcard.selected:focus-visible{box-shadow:inset 0 0 0 1px var(--stroke-brand),0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  /* ── Image frame ── 사진·스캔을 담는 틀. 안쪽 1px 선은 multiply 로 섞어 흰 사진 가장자리만 드러나고 어두운 사진에는 거의 안 보인다 */
  .frame{position:relative;display:block;flex:none;overflow:hidden;isolation:isolate;border-radius:var(--radius-md);background:var(--bg-neutral-weak)}
  .frame::before{content:"";position:absolute;inset:0;z-index:1;border-radius:inherit;box-shadow:inset 0 0 0 1px var(--stroke-neutral-strong);mix-blend-mode:multiply;pointer-events:none}
  .frame img{display:block;width:100%;height:100%;object-fit:cover}
  .frame.contain img{object-fit:contain}
  .frame.ratio-1{aspect-ratio:1} .frame.ratio-4-3{aspect-ratio:4/3} .frame.ratio-16-9{aspect-ratio:16/9}
  .frame.round-sm{border-radius:var(--radius-sm)} .frame.round-lg{border-radius:var(--radius-lg)}
  .frame.s28{width:28px;height:28px;border-radius:var(--radius-xs)} .frame.s40{width:40px;height:40px;border-radius:var(--radius-sm)} .frame.s56{width:56px;height:56px} .frame.s72{width:72px;height:72px} .frame.s96{width:96px;height:96px}
  .frame.broken{display:flex;align-items:center;justify-content:center;color:var(--fg-neutral-muted)} .frame.broken svg{width:24px;height:24px} .frame.s28.broken svg,.frame.s40.broken svg{width:16px;height:16px}
  .frame__fig{display:flex;flex-direction:column;gap:var(--dim-x2);margin:0;min-width:0}
  .frame__cap{font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  /* ── Tag group ── 속성을 가운뎃점으로 잇는 한 줄 메타. 인라인 글줄이라 어디서 잘리든 끝에 말줄임이 붙는다. 점은 ::before(대체 텍스트는 쉼표) — 항목의 음수 여백과 점 폭이 서로 지워져 줄머리에 오는 점은 컨테이너 밖으로 밀려 overflow 로 숨는다 */
  .taggroup{--sep:var(--dim-x3_5);display:block;min-width:0;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .taggroup>*{white-space:nowrap} .taggroup>:not(:last-child){margin-right:var(--sep)} .taggroup>*+*{margin-left:calc(var(--sep) * -1)}
  .taggroup>*+*::before{content:"·";content:"·" / ", ";display:inline-block;width:var(--sep);text-align:center;font-weight:var(--font-weight-regular);color:var(--fg-neutral-placeholder)}
  .taggroup svg{width:14px;height:14px;margin-right:var(--dim-x1);vertical-align:-2px}
  .taggroup.md{--sep:var(--dim-x4);font-size:var(--font-size-t2);line-height:var(--line-height-t2)} .taggroup.md svg{width:16px;height:16px;vertical-align:-3px}
  .taggroup.subtle{color:var(--fg-neutral-subtle)} .taggroup.accent>:first-child{color:var(--fg-accent);font-weight:var(--font-weight-semibold)}
  .taggroup.multiline{white-space:normal;text-overflow:clip;line-height:calc(var(--line-height-t1) + var(--dim-x0_5))} .taggroup.multiline.md{line-height:calc(var(--line-height-t2) + var(--dim-x0_5))}
  .taggroup .positive{color:var(--fg-positive)} .taggroup .warning{color:var(--fg-warning)} .taggroup .critical{color:var(--fg-critical)}
`;

// 데모 사진 — data: URI SVG(외부 파일 없음). 색 리터럴은 사진 내용이지 컴포넌트 CSS 가 아니다
const svg = (s) => 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" ' + s + '</svg>');
const zig = 'l-4 3l-4-3'.repeat(6);
const receipt = (bg, rot) => svg('viewBox="0 0 160 120"><rect width="160" height="120" fill="' + bg + '"/><g transform="rotate(' + rot + ' 80 60)"><path d="M56 8h48v100' + zig + 'z" fill="#fff"/><rect x="68" y="16" width="24" height="5" rx="1" fill="#3a3a40"/><g fill="#d6d2cb"><rect x="62" y="30" width="36" height="3" rx="1.5"/><rect x="62" y="38" width="28" height="3" rx="1.5"/><rect x="62" y="46" width="36" height="3" rx="1.5"/><rect x="62" y="54" width="22" height="3" rx="1.5"/><rect x="62" y="62" width="32" height="3" rx="1.5"/></g><rect x="62" y="76" width="36" height="1" fill="#a8a8ad"/><rect x="62" y="84" width="14" height="4" rx="1" fill="#3a3a40"/><rect x="82" y="84" width="16" height="4" rx="1" fill="#3a3a40"/></g>');
const RECEIPTS = [receipt('#cbc3b6', -5), receipt('#bcc6cc', 4), receipt('#c9c2cf', -2), receipt('#c4cbb9', 6)];
const RECEIPT = RECEIPTS[0];
const ROOM = svg('viewBox="0 0 320 180"><rect width="320" height="180" fill="#ebe7e1"/><rect y="132" width="320" height="48" fill="#bfb3a3"/><rect x="206" y="24" width="88" height="92" fill="#d3e3ec"/><path d="M250 24v92M206 70h88" stroke="#fff" stroke-width="3"/><rect x="36" y="30" width="120" height="68" rx="3" fill="#2a2a2f"/><rect x="42" y="36" width="108" height="56" fill="#41536a"/><g fill="#5a6270"><rect x="58" y="104" width="24" height="30" rx="6"/><rect x="100" y="104" width="24" height="30" rx="6"/><rect x="142" y="104" width="24" height="30" rx="6"/><rect x="184" y="104" width="24" height="30" rx="6"/></g><rect x="40" y="124" width="190" height="14" rx="7" fill="#8a7560"/><rect x="60" y="138" width="6" height="22" fill="#6d5c4b"/><rect x="204" y="138" width="6" height="22" fill="#6d5c4b"/>');
const SCAN = svg('viewBox="0 0 120 160"><rect width="120" height="160" fill="#fff"/><rect x="14" y="16" width="52" height="7" rx="1.5" fill="#3a3a40"/><circle cx="96" cy="22" r="10" fill="none" stroke="#d70015" stroke-width="2"/><circle cx="96" cy="22" r="5" fill="none" stroke="#d70015" stroke-width="1.5"/><g fill="#dcdce2"><rect x="14" y="36" width="92" height="3" rx="1.5"/><rect x="14" y="44" width="80" height="3" rx="1.5"/><rect x="14" y="52" width="88" height="3" rx="1.5"/></g><g fill="none" stroke="#e8e8ec"><rect x="14.5" y="66.5" width="91" height="48"/><path d="M14.5 82.5h91M14.5 98.5h91M50.5 66.5v48"/></g><g fill="#dcdce2"><rect x="14" y="126" width="92" height="3" rx="1.5"/><rect x="14" y="134" width="60" height="3" rx="1.5"/></g>');
const ROOM_ALT = '회의실 A — 8인 테이블과 벽걸이 화면', RECEIPT_ALT = '9월 7일 점심 영수증, 12,000원', SCAN_ALT = '연차 신청서 스캔 1쪽 — 결재 도장 있음';

// 공통 조각
const ex = (inner, cap, style) => '<figure class="ex"' + (style ? ' style="' + style + '"' : '') + '>' + inner + '<figcaption>' + cap + '</figcaption></figure>';
const tg = (items, cls, style) => '<span class="taggroup' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '>' + items.map(t => t.startsWith('<span') ? t : '<span>' + t + '</span>').join('') + '</span>';
const fr = (cls, src, alt, style) => '<span class="frame' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '><img src="' + src + '" alt="' + alt + '"></span>';
const btn = (t, cls) => '<button class="btn sm ' + (cls || 'neutral-outline') + '">' + t + '</button>';
const kebab = (name) => '<button class="iconbtn sm ghost" aria-label="' + name + ' 더보기">' + icon('dots-vertical') + '</button>';
const chip = (tone, n) => '<span class="lrow__ico ' + tone + '">' + icon(n) + '</span>';
const card = (o) => { const t = o.tag || 'div';
  return '<' + t + ' class="gcard' + (o.cls ? ' ' + o.cls : '') + '"' + (o.attr || '') + '>' + (o.media ? '<div class="gcard__media">' + o.media + '</div>' : '') +
    '<div class="gcard__hd">' + (o.lead || '') + '<div class="gcard__tt"><h3 class="gcard__t"' + (o.id ? ' id="' + o.id + '"' : '') + '>' + o.title + '</h3>' + (o.meta ? tg(o.meta) : '') + '</div>' + (o.act ? '<div class="gcard__act">' + o.act + '</div>' : '') + '</div>' +
    (o.body ? '<div class="gcard__bd">' + o.body + '</div>' : '') + (o.ft ? '<div class="gcard__ft">' + o.ft + '</div>' : '') + '</' + t + '>'; };

// ── Card 데모
const W = 'width:300px', HOVER = 'border-color:var(--stroke-neutral-stronger);box-shadow:var(--shadow-1)', FOCUS = 'box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)';
const roomA = card({ tag: 'article', attr: ' aria-labelledby="gcard-room-a" style="width:320px"', id: 'gcard-room-a', media: fr('ratio-16-9', ROOM, ROOM_ALT), title: '회의실 A', meta: ['3층', '8인', '화상회의'], act: kebab('회의실 A'), body: '14:00–15:00 비어 있습니다. 모니터와 화이트보드가 있습니다.', ft: tg(['오늘 예약 3건']) + btn('예약하기', 'brand-solid') });
const leave = (cls) => card({ cls, title: '연차', meta: ['2026년', '입사일 기준'], act: kebab('연차'), body: '잔여 12일, 사용 3일. 9월 10일(목) 신청이 승인 대기 중입니다.', ft: btn('현황') + btn('신청', 'brand-solid') });
const trip = (style) => card({ tag: 'a', cls: 'clickable', attr: ' href="#components/card"' + (style ? ' style="' + style + '"' : ''), title: '외근 신청', meta: ['9월 12일(금)', '판교 고객사'], act: icon('chevron-right'), body: '정기 점검 13:00–17:00 — 승인 완료' });
const room = (sel, style) => card({ cls: 'clickable' + (sel ? ' selected' : ''), attr: ' role="radio" aria-checked="' + !!sel + '" tabindex="' + (sel ? 0 : -1) + '"' + (style ? ' style="' + style + '"' : ''), title: '회의실 B', meta: ['4층', '6인'], act: sel ? icon('circle-check-filled') : '', body: '14:00–15:00 비어 있음' });

const cardPage = `
<section class="page" id="components/card">
  <h1>Card</h1>
  <p class="desc">한 대상(회의실 · 연차 · 결재 문서)의 정보와 행동을 한 상자에 묶습니다. 머리(제목 · 메타 · 더보기) · 본문 · 하단(행동)이 기본이고, 위에 사진을 얹을 수 있습니다. 가만히 있는 카드에는 그림자가 없습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${roomA}</div>
    <ol><li><b>Media</b> (선택) — <a href="#components/image-frame">Image frame</a>. 위·좌·우 여백 없이 붙고 아래에만 1px 선</li><li><b>Header</b> — 제목 t3 600 한 줄 + 메타(<a href="#components/tag-group">Tag group</a>) + 오른쪽 더보기(iconbtn sm ghost)</li><li><b>Body</b> — t2 subtle, 두세 줄</li><li><b>Footer</b> (선택) — 왼쪽 메타, 오른쪽 Button sm. 주요 행동은 하나</li><li><b>Container</b> — 1px 선 · radius-lg · 여백 md 16px</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(leave(''), 'plain — 1px 선. 기본', W)}
    ${ex(card({ cls: 'raised', title: '최근 전자결재', meta: ['수신함 47'], act: kebab('최근 전자결재'), body: '(AI_AGENT) 연차 신청의 건 외 5건이 내 처리를 기다립니다.', ft: btn('결재함 열기') }), 'raised — 머리를 basement 띠로 나눔', W)}
    ${ex(card({ cls: 'tinted', lead: chip('positive', 'circle-check-filled'), title: '업무일지 초안을 만들었습니다', meta: ['9월 9일(수)', 'SVN 커밋 4건', '일정 2건'], body: '확인하고 저장하면 일지에 올라갑니다.', ft: btn('열어 보기') }), 'tinted — 선 없이 톤으로. 흰 바탕 위 결과·요약', W)}
    ${ex(trip(), 'clickable — 카드 전체가 링크 하나', W)}
  </div>
  <table><tr><th>Variant</th><th>표현</th><th>쓰임</th></tr><tr><td>plain</td><td>1px <code>--stroke-neutral-strong</code></td><td>기본 — 연차·회의실·내 현황</td></tr><tr><td>raised</td><td>머리 <code>--bg-layer-basement</code> 띠 + 아래 선</td><td>안에 목록·표를 품을 때(최근 전자결재). 머리와 내용을 톤으로 나눕니다</td></tr><tr><td>tinted</td><td><code>--bg-layer-basement</code>, 선 없음</td><td>흰 바탕 위의 결과·요약(에이전트 완료). basement 바탕 위에서는 plain 을 씁니다</td></tr><tr><td>clickable</td><td>hover 에 선 진하게 + <code>--shadow-1</code></td><td>카드 전체가 한 곳으로 가는 링크(외근 상세·문서 열기)</td></tr></table>
  <h3>Padding</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(card({ title: '내 처리 대기', meta: ['전자결재'], body: '6건 — 가장 오래된 건 2일 전', ft: btn('결재함 열기') }), 'md — 16px · 부위 간격 12px', W)}
    ${ex(card({ cls: 'compact', title: '내 처리 대기', meta: ['전자결재'], body: '6건 — 가장 오래된 건 2일 전', ft: btn('결재함 열기') }), 'compact — 12px · 8px · 제목 t2', W)}
  </div>
  <table><tr><th>여백</th><th>값</th><th>쓰임</th></tr><tr><td>md</td><td><code>--dim-x4</code> · 간격 <code>--dim-x3</code></td><td>기본 — 본문 영역·대시보드</td></tr><tr><td>compact</td><td><code>--dim-x3</code> · 간격 <code>--dim-x2</code> · 제목 t2</td><td>320px 컨텍스트 패널·캐러셀 슬라이드·관리자 콘솔</td></tr></table>
  <h3>State</h3>
  <div class="demo" style="align-items:flex-start" role="radiogroup" aria-label="회의실 고르기">
    ${ex(room(false), 'default', W)}
    ${ex(room(false, HOVER), 'hover — 선 stronger + shadow-1', W)}
    ${ex(room(false, FOCUS), 'focus — accent 링', W)}
    ${ex(room(true), 'selected — 잉크 2px + 체크', W)}
  </div>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>hover</td><td>clickable 만 — <code>--stroke-neutral-stronger</code> + <code>--shadow-1</code>. 누르지 않는 카드는 hover 가 없습니다</td></tr><tr><td>focus</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px 링</td></tr><tr><td>selected</td><td><b>잉크</b> <code>--stroke-brand</code> 2px + circle-check-filled 20px. 칩·날짜·wchip 의 선택이 모두 잉크이고, 틸 선은 포커스 링과 겹쳐 키보드 사용자가 선택과 포커스를 구분할 수 없어 쓰지 않습니다. 색만으로 전하지 않게 체크를 함께 둡니다</td></tr></table>
  <h3>Media</h3>
  <div class="demo">${ex(card({ media: fr('ratio-4-3', RECEIPT, RECEIPT_ALT), title: '점심 식대', meta: ['9월 7일', '12,000원'], act: kebab('점심 식대'), ft: btn('지출결의에 붙이기') }), '4:3 영수증 — 사진은 가장자리까지, 아래 1px 선만', 'width:280px')}</div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${trip('width:240px')}</div>카드 전체가 링크면 누르는 곳은 하나입니다. 상세에서 할 일은 상세에서.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${card({ tag: 'a', cls: 'clickable', attr: ' href="#components/card" style="width:240px"', title: '외근 신청', meta: ['9월 12일(금)'], ft: btn('취소') + btn('수정') })}</div>링크 카드 안에 버튼을 넣지 않습니다 — 어디를 누르면 무엇이 실행되는지 알 수 없습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>구분은 여백 → 톤 → 선 순서로. 카드 안의 묶음은 basement 톤 상자로 나눕니다.</div>
    <div class="dont"><b>Don&#39;t</b>카드 안에 카드를 넣지 않습니다. 가만히 있는 카드에 그림자를 주지 않습니다 — 그림자는 떠 있는 것과 clickable hover 에만.</div>
  </div>
  <h2>Card vs. Quick action card vs. List row</h2>
  <table><tr><th></th><th>Card</th><th><a href="#components/quick-card">Quick action card</a></th><th><a href="#components/list-row">List row</a></th></tr><tr><td>목적</td><td>한 대상의 정보와 행동</td><td>자주 하는 일로 가는 입구</td><td>목록의 한 항목</td></tr><tr><td>높이</td><td>내용만큼</td><td>120px 고정, hover 에 펼침</td><td>40px 한 줄·두 줄</td></tr><tr><td>조작</td><td>더보기·하단 버튼, 또는 카드 전체가 링크</td><td>hover 에 펼쳐지는 버튼·주간 달력</td><td>행 전체 링크 + 보조 버튼 하나</td></tr><tr><td>경계</td><td>1px 선(tinted 는 톤)</td><td>1px 선, hover 에 shadow-3</td><td>없음 — hover 배경</td></tr><tr><td>자리</td><td>대시보드·패널·상세</td><td>홈 상단 4열</td><td>패널·사이드바·카드 안</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Container</td><td><code>--bg-layer-default</code> · <code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 여백 <code>--dim-x4</code>(compact <code>--dim-x3</code>) · 부위 간격 <code>--dim-x3</code>(<code>--dim-x2</code>)</td></tr><tr><td>Header</td><td>제목 t3 600 한 줄 ellipsis(compact t2) · 메타 Tag group t1 muted · 더보기 iconbtn sm ghost dots-vertical</td></tr><tr><td>Body / Footer</td><td>t2 <code>--fg-neutral-subtle</code> / 오른쪽 정렬 Button sm, 간격 <code>--dim-x2</code>, 메타는 왼쪽</td></tr><tr><td>Media</td><td>Image frame, 음수 여백으로 가장자리까지 · 라운드는 카드가 자름 · 아래 1px <code>--stroke-neutral-strong</code></td></tr><tr><td>raised / tinted</td><td>머리 <code>--bg-layer-basement</code> + 아래 <code>--stroke-neutral</code> / 카드 전체 <code>--bg-layer-basement</code>, 선 투명</td></tr><tr><td>hover / selected</td><td><code>--stroke-neutral-stronger</code> + <code>--shadow-1</code> / <code>--stroke-brand</code> + inset 1px + 체크 <code>--fg-neutral</code></td></tr><tr><td>접근성</td><td>정보 카드는 <code>&lt;article aria-labelledby=제목&gt;</code>. clickable 은 <code>&lt;a&gt;</code> 하나(Enter). 옵션 카드는 <code>role="radiogroup"</code> 안 <code>role="radio" aria-checked</code>, ← → 로 이동·Space 로 선택. 더보기에 <code>aria-label="회의실 A 더보기"</code></td></tr></table>
</section>`;

// ── Image frame 데모
const broken = (cls, ico, style) => '<span class="frame ' + cls + ' broken" role="img" aria-label="영수증 사진 — 불러오지 못함"' + (style ? ' style="' + style + '"' : '') + '>' + icon(ico) + '</span>';
const framePage = `
<section class="page" id="components/image-frame">
  <h1>Image frame</h1>
  <p class="desc">사진·스캔 한 장을 담는 틀. 비율(<code>aspect-ratio</code>)과 맞춤(<code>object-fit</code>)을 정하고, 안쪽 1px 선으로 흰 영수증·문서가 흰 바탕에 번지지 않게 합니다. 불러오는 중·깨짐도 이 틀이 맡습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><figure class="frame__fig" style="width:240px">${fr('ratio-4-3', RECEIPT, RECEIPT_ALT)}<figcaption class="frame__cap">점심 식대 영수증 · 897KB</figcaption></figure></div>
    <ol><li><b>Frame</b> — 비율 · 라운드 · <code>--bg-neutral-weak</code> 바탕(불러오기 전·contain 여백)</li><li><b>Image</b> — <code>object-fit</code> cover(기본) 또는 contain</li><li><b>Stroke</b> — 안쪽 1px <code>--stroke-neutral-strong</code>, multiply 로 섞음</li><li><b>Caption</b> (선택) — t1 muted, 틀 아래 8px</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Ratio</h3>
  <div class="demo" style="align-items:flex-end">${ex(fr('ratio-1', ROOM, ROOM_ALT, 'width:120px'), '1:1')}${ex(fr('ratio-4-3', ROOM, ROOM_ALT, 'width:160px'), '4:3')}${ex(fr('ratio-16-9', ROOM, ROOM_ALT, 'width:213px'), '16:9')}${ex(fr('', SCAN, SCAN_ALT, 'width:90px'), 'free — 원본')}</div>
  <table><tr><th>비율</th><th>쓰임</th></tr><tr><td>1:1</td><td>썸네일·첨부 격자·말풍선 안 사진</td></tr><tr><td>4:3</td><td>영수증·현장 사진 기본</td></tr><tr><td>16:9</td><td>카드 머리·회의실 사진·화면 캡처</td></tr><tr><td>free</td><td>원본 비율 그대로 — 상세 보기 한 장. 폭만 정합니다</td></tr></table>
  <h3>Fit</h3>
  <div class="demo">${ex(fr('ratio-4-3', SCAN, SCAN_ALT, 'width:200px'), 'cover — 채우고 넘치는 곳은 자름')}${ex(fr('ratio-4-3 contain', SCAN, SCAN_ALT, 'width:200px'), 'contain — 전부 보이고 남는 곳은 바탕')}</div>
  <table><tr><th>맞춤</th><th>쓰임</th></tr><tr><td>cover (기본)</td><td>사진 — 회의실·현장. 가장자리가 잘려도 뜻이 남는 것</td></tr><tr><td>contain</td><td>문서·영수증 — 합계·도장·서명이 잘리면 안 되는 것</td></tr></table>
  <h3>Radius</h3>
  <div class="demo">${ex(fr('ratio-4-3 round-sm', ROOM, ROOM_ALT, 'width:140px'), 'sm 8px')}${ex(fr('ratio-4-3', ROOM, ROOM_ALT, 'width:140px'), 'md 10px — 기본')}${ex(fr('ratio-4-3 round-lg', ROOM, ROOM_ALT, 'width:140px'), 'lg 14px')}</div>
  <table><tr><th>라운드</th><th>쓰임</th></tr><tr><td>sm</td><td>행·목록 안, 56px 이하 썸네일</td></tr><tr><td>md</td><td>기본 — 첨부·본문 사진</td></tr><tr><td>lg</td><td>단독 사진·캐러셀 — 카드(radius-lg)와 같은 곡률</td></tr></table>
  <h3>Size — 썸네일</h3>
  <div class="demo" style="align-items:flex-end">${[28, 40, 56, 72, 96].map(s => ex(fr('s' + s, RECEIPT, RECEIPT_ALT), s + 'px')).join('')}</div>
  <table><tr><th>크기</th><th>라운드</th><th>쓰임</th></tr><tr><td>28</td><td>xs</td><td>첨부 칩·말풍선 안</td></tr><tr><td>40</td><td>sm</td><td>파일 행(설정 「첨부」)</td></tr><tr><td>56</td><td>md</td><td>컴포저 첨부 타일</td></tr><tr><td>72 · 96</td><td>md</td><td>첨부 격자·영수증 목록</td></tr></table>
  <h3>State</h3>
  <div class="demo" style="align-items:flex-end">${ex(fr('ratio-4-3', RECEIPT, RECEIPT_ALT, 'width:160px'), 'loaded')}${ex('<span class="frame ratio-4-3" style="width:160px" aria-busy="true"><span class="skel" style="height:100%" aria-hidden="true"></span></span>', 'loading — Skeleton')}${ex(broken('ratio-4-3', 'photo', 'width:160px'), 'broken — photo 24px')}${ex(broken('s40', 'photo-filled'), 'broken 40 — filled 16px')}</div>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>loading</td><td>틀 크기 그대로 <a href="#components/skeleton">Skeleton</a>(shimmer). 비율을 먼저 잡아 두어 사진이 와도 화면이 튀지 않습니다</td></tr><tr><td>broken</td><td><code>--bg-neutral-weak</code> + photo 아이콘 <code>--fg-neutral-muted</code>(40px 이하는 photo-filled 16px). 누르면 다시 불러옵니다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${fr('ratio-1 contain', SCAN, SCAN_ALT, 'width:120px')}</div>흰 스캔·영수증도 틀의 바탕과 안쪽 선이 경계를 그려 줍니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><img src="${SCAN}" alt="${SCAN_ALT}" style="width:120px;aspect-ratio:1;object-fit:cover;border-radius:var(--radius-md)"></div>틀 없이 넣은 흰 이미지는 바탕으로 번져 크기와 경계가 보이지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b><code>alt</code> 에는 내용을 씁니다 — 「9월 7일 점심 영수증, 12,000원」. 꾸밈 사진은 <code>alt=""</code>.</div>
    <div class="dont"><b>Don&#39;t</b><code>alt="image.png"</code> · 「사진」처럼 파일 이름이나 종류만 적지 않습니다. 캡션과 같은 말을 되풀이하지도 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>문서·영수증은 contain — 합계·도장이 잘리지 않게.</div>
    <div class="dont"><b>Don&#39;t</b>틀에 맞추려고 사진을 늘리거나(<code>fill</code>) 비율을 바꾸지 않습니다.</div>
  </div>
  <h2>Image frame vs. Avatar vs. File thumbnail</h2>
  <table><tr><th></th><th>Image frame</th><th><a href="#components/avatar">Avatar</a></th><th>File thumbnail(첨부 행)</th></tr><tr><td>담는 것</td><td>사진·스캔의 실제 내용</td><td>사람 — 이름 첫 글자</td><td>문서 — 확장자 라벨(PDF·HWP)</td></tr><tr><td>모양</td><td>라운드 사각, 비율 자유</td><td>원</td><td>36·48px 라운드 사각, 역할 틴트</td></tr><tr><td>관계</td><td>—</td><td>사진이 생겨도 원 안 글자</td><td>이미지 파일이면 Image frame 썸네일로 바뀝니다</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Frame</td><td><code>--bg-neutral-weak</code> · <code>--radius-md</code>(sm · lg) · <code>aspect-ratio</code> 1 · 4/3 · 16/9 · <code>overflow:hidden</code></td></tr><tr><td>Image</td><td><code>object-fit:cover</code> · contain · 폭 100%</td></tr><tr><td>Stroke</td><td>::before 안쪽 1px <code>--stroke-neutral-strong</code> · <code>mix-blend-mode:multiply</code> · 틀 <code>isolation:isolate</code></td></tr><tr><td>Thumbnail</td><td>28 xs · 40 sm · 56 · 72 · 96 md</td></tr><tr><td>Broken / Loading</td><td>photo 24px(40 이하 photo-filled 16) <code>--fg-neutral-muted</code> / Skeleton 블록</td></tr><tr><td>Caption</td><td>t1 <code>--fg-neutral-muted</code> · 위 <code>--dim-x2</code></td></tr><tr><td>접근성</td><td>내용 사진은 <code>alt</code> 에 내용, 꾸밈은 <code>alt=""</code>. 깨짐은 <code>role="img" aria-label</code> 로 무엇이 안 보이는지. 로딩은 <code>aria-busy</code>. 누르면 커지는 사진은 <code>&lt;button aria-label="영수증 크게 보기"&gt;</code> 로 감쌉니다</td></tr></table>
</section>`;

// ── Carousel 데모 — 넘기기는 scroll-snap 이 맡는다. 버튼·도트·카운터는 상태를 보여 주는 정적 마크업(실제 앱은 scrollTo 한 줄)
// ── Chart 데모 — viewBox 0 0 100 100 + preserveAspectRatio none: 좌표가 곧 퍼센트. 글자 · 점 · 툴팁은 HTML 이라 늘어나지 않는다
 // 눈금 0–5일
 // 눈금 30–50h
let acc = 0;
 // 8주 · 눈금 36–46h
// ── Tag group 데모
const tagPage = `
<section class="page" id="components/tag-group">
  <h1>Tag group</h1>
  <p class="desc">한 대상의 속성 두셋(팀 · 직급 · 상태, 형식 · 용량 · 날짜)을 가운뎃점으로 이어 한 줄에 놓는 메타 글줄입니다. 배경도 선도 없어 제목 아래 · 행 오른쪽 어디에나 놓입니다. 점은 CSS 가 그리고 스크린리더에는 쉼표로 읽힙니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${tg([icon('sitemap-filled') + '디자인1팀', '부장', '<span class="warning">' + icon('clock-filled') + '자리 비움</span>'], 'md')}</div>
    <ol><li><b>Item</b> — 짧은 명사 하나, 줄바꿈 없음</li><li><b>Separator</b> — 「·」 <code>::before</code>, 첫 항목에는 없음. 대체 텍스트 「, 」</li><li><b>Leading icon</b> (선택) — 14px(md 16px) filled, 글자 앞 4px</li><li><b>Ellipsis</b> — 자리가 모자라면 끝에서 말줄임. 잘리는 것은 늘 뒤쪽 항목</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo col">
    ${ex(tg(['PDF', '3.0MB', '9월 7일']), 'sm — t1 13px. 기본, 카드 메타 · 행 메타')}
    ${ex(tg(['PDF', '3.0MB', '9월 7일'], 'md'), 'md — t2 14px. 페이지 머리 · 상세 화면')}
  </div>
  <table><tr><th>크기</th><th>글자</th><th>점 폭</th><th>아이콘</th><th>쓰임</th></tr><tr><td>sm</td><td>t1</td><td>14px</td><td>14px</td><td>카드 머리 · List row 메타 · 첨부 행</td></tr><tr><td>md</td><td>t2</td><td>16px</td><td>16px</td><td>화면 제목 아래 · 담당자 상세</td></tr></table>
  <h3>Tone</h3>
  <div class="demo col">
    ${ex(tg([icon('sitemap-filled') + '디자인1팀', '부장', '자리 비움']), 'muted — 기본. 제목 옆의 보조 정보')}
    ${ex(tg([icon('sitemap-filled') + '디자인1팀', '부장', '자리 비움'], 'subtle'), 'subtle — 한 단계 진하게. 표 · 본문처럼 글줄이 곧 내용일 때')}
    ${ex(tg([icon('sparkles') + 'AI 초안', '9월 9일(수)', 'SVN 커밋 4건'], 'accent'), 'accent — 첫 항목만 틸 600. 에이전트가 만든 것 · 오늘')}
    ${ex(tg(['<span class="positive">' + icon('circle-check-filled') + '승인</span>', '9월 10일(목)', '김지훈 부장']), 'status — 항목 하나에 상태색 + 아이콘. 글자가 뜻을 말합니다')}
  </div>
  <table><tr><th>Tone</th><th>글자</th><th>쓰임</th></tr><tr><td>muted</td><td><code>--fg-neutral-muted</code></td><td>기본 — 제목이 주인공이고 메타는 뒤로</td></tr><tr><td>subtle</td><td><code>--fg-neutral-subtle</code></td><td>표 셀 · 카드 본문 안</td></tr><tr><td>accent</td><td>첫 항목 <code>--fg-accent</code> 600</td><td>출처가 에이전트인 것 · 오늘 표시. 한 줄에 하나</td></tr><tr><td>status</td><td>항목 <code>.positive .warning .critical</code></td><td>승인 · 자리 비움 · 반려처럼 항목 자체가 상태일 때. 색만 두지 않고 16px 이하 filled 아이콘</td></tr></table>
  <h3>Overflow</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(tg(['연차 신청의 건', '(AI_AGENT) 윤아린2', '2026-09-10 14:32', '결재 대기'], '', 'width:240px'), 'truncate — 기본. 끝에서 말줄임, 앞 항목은 지킴')}
    ${ex(tg(['연차 신청의 건', '(AI_AGENT) 윤아린2', '2026-09-10 14:32', '결재 대기'], 'multiline', 'width:240px'), 'multiline — 줄을 바꿈. 줄머리에 점이 남지 않음')}
  </div>
  <table><tr><th>넘침</th><th>표현</th><th>쓰임</th></tr><tr><td>truncate</td><td>항목 <code>white-space:nowrap</code> + 컨테이너 <code>text-overflow:ellipsis</code> — 잘리는 자리에 말줄임</td><td>한 줄이어야 하는 곳 — 카드 머리 · 행. 가장 덜 중요한 것을 마지막에</td></tr><tr><td>multiline</td><td><code>white-space:normal</code> · 줄 간격 +<code>--dim-x0_5</code> · 줄머리 점은 음수 여백으로 숨김</td><td>상세 화면 · 폭이 좁은 패널. 전부 읽혀야 할 때</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${tg([icon('sitemap-filled') + '디자인1팀', '부장', '<span class="warning">' + icon('clock-filled') + '자리 비움</span>'])}</div>식별에 중요한 것부터 — 팀 · 직급 · 상태. 셋 안쪽, 상태는 글자 + 아이콘.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><span class="badge">디자인1팀</span><span class="badge">부장</span><span class="badge warning">자리 비움</span></div>속성마다 <a href="#components/badge">Badge</a> 를 칠하지 않습니다 — 배경 셋이 제목보다 눈에 띕니다. 배지는 상태 하나에.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>항목은 짧은 명사 — 「3.0MB」 「9월 7일」 「자리 비움」. 단위 · 날짜 형식은 시스템대로.</div>
    <div class="dont"><b>Don&#39;t</b>문장(「지금 자리를 비웠습니다」)이나 항목 안의 쉼표 · 점(「디자인1팀, 부장」). 점은 하나뿐입니다.</div>
  </div>
  <h2>Tag group vs. Badge vs. Chip</h2>
  <table><tr><th></th><th>Tag group</th><th><a href="#components/badge">Badge</a></th><th><a href="#components/chip">Chip</a></th></tr><tr><td>뜻</td><td>대상의 속성 나열 — 읽는 것</td><td>상태 하나 강조 — 읽는 것</td><td>필터 · 선택 — 누르는 것</td></tr><tr><td>모양</td><td>글자 + 가운뎃점, 배경 없음</td><td>알약 틴트, 22px · 12px 600</td><td>알약 선, 26 · 32px, 선택 시 잉크 채움</td></tr><tr><td>개수</td><td>2–4개 한 줄</td><td>하나(건수 배지는 숫자만)</td><td>여러 개, 선택 상태 있음</td></tr><tr><td>색</td><td>muted, 항목 하나만 상태색</td><td>상태 여섯 어휘 weak 배경</td><td>중립 · selected 잉크</td></tr><tr><td>자리</td><td>제목 아래 · 카드 머리 · 행 메타</td><td>행 오른쪽 · 카드 우상단</td><td>필터 줄 · 컴포저 제안</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Text</td><td>t1 <code>--fg-neutral-muted</code>(md t2) · <code>white-space:nowrap</code> · 항목 간격 = 점 폭 <code>--dim-x3_5</code>(md <code>--dim-x4</code>)</td></tr><tr><td>Separator</td><td><code>::before</code> 「·」 <code>--fg-neutral-placeholder</code> 400 · 폭 <code>--dim-x3_5</code> 가운데 · 대체 텍스트 <code>", "</code></td></tr><tr><td>Icon</td><td>14px(md 16px) · <code>-filled</code> · 오른쪽 <code>--dim-x1</code> · 글자색 그대로</td></tr><tr><td>Tone</td><td>subtle <code>--fg-neutral-subtle</code> · accent 첫 항목 <code>--fg-accent</code> 600 · 항목 <code>--fg-positive</code> <code>--fg-warning</code> <code>--fg-critical</code></td></tr><tr><td>Overflow</td><td>컨테이너 <code>overflow:hidden</code> + <code>text-overflow:ellipsis</code> · multiline 은 <code>white-space:normal</code>, 줄 간격 +<code>--dim-x0_5</code>, 줄머리 점은 항목의 음수 <code>margin-left</code> 로 밖에 밀려 숨음</td></tr><tr><td>접근성</td><td>글자만 — 포커스 없음. 점은 <code>content:"·" / ", "</code> 로 쉼표로 읽힘(대체 텍스트를 모르는 리더는 점을 건너뜀). 아이콘 <code>aria-hidden</code>, 뜻은 늘 글자에. 말줄임된 항목은 <code>title</code> 에 전체 문구</td></tr></table>
</section>`;

export const pages = [cardPage, framePage,   tagPage].join('\n');

export const nav = [['components/card', 'Card'], ['components/image-frame', 'Image frame'], ['components/tag-group', 'Tag group']];

export const tint = [];
