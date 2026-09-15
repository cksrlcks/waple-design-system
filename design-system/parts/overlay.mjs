// 떠 있는 면·보조 조각: Sheet · Command palette · Kbd · Scroll area · Resizable. 목록은 공유 .menu(menu.mjs), 배경은 Dialog 와 같은 --bg-overlay
import { icon } from './icons.mjs';

export const css = `
  /* ── Sheet ── 가장자리에 붙는 떠 있는 면. 오른쪽 360·480(상세) · 왼쪽 280(모바일 메뉴) · 아래(모바일 half/full). 닫기·포커스는 Dialog 와 같다 */
  .sheet__stage{position:relative;width:100%;height:400px;overflow:hidden;background:var(--bg-overlay);border-radius:var(--radius-md)} /* 문서 데모용 화면 */
  .sheet__stage.phone{width:300px;height:540px;border-radius:var(--radius-xl)}
  .sheet{position:absolute;display:flex;flex-direction:column;background:var(--bg-layer-floating);box-shadow:var(--shadow-3);text-align:left}
  .sheet.right{top:0;right:0;bottom:0;width:360px;max-width:100%} .sheet.right.wide{width:480px}
  .sheet.left{top:0;left:0;bottom:0;width:280px;max-width:calc(100% - 56px)}
  .sheet.bottom{left:0;right:0;bottom:0;height:50%;border-radius:var(--radius-xl) var(--radius-xl) 0 0} .sheet.bottom.full{height:calc(100% - var(--dim-x12))}
  .sheet__handle{flex:none;width:36px;height:4px;margin:var(--dim-x2) auto 0;border-radius:var(--radius-full);background:var(--stroke-neutral-stronger)}
  .sheet__hd{flex:none;display:flex;align-items:flex-start;gap:var(--dim-x3);padding:var(--dim-x5) var(--dim-x4) var(--dim-x4) var(--dim-x6)} .sheet__hd>div{flex:1;min-width:0} .sheet__hd>.iconbtn{margin-top:-4px}
  .sheet.left .sheet__hd,.sheet.bottom .sheet__hd{padding-left:var(--dim-x5)} .sheet.bottom .sheet__hd{padding-top:var(--dim-x3)}
  .sheet__title{margin:0;font-size:var(--font-size-t4);line-height:var(--line-height-t4);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)}
  .sheet__sub{margin:2px 0 0;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .sheet__body{flex:1;min-height:0;overflow:auto;padding:0 var(--dim-x6) var(--dim-x6);font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral-subtle)}
  .sheet__body>p{margin:var(--dim-x4) 0 0} .sheet__body>:first-child{margin-top:0}
  .sheet.left .sheet__body,.sheet.bottom .sheet__body{padding:0 var(--dim-x2) var(--dim-x4)} /* 목록이 주인 몸통: 행이 제 패딩을 가진다 */
  .sheet__ft{flex:none;display:flex;justify-content:flex-end;gap:var(--dim-x2);padding:var(--dim-x4) var(--dim-x6);border-top:1px solid var(--stroke-neutral)}
  .sheet.bottom .sheet__ft{padding:var(--dim-x3) var(--dim-x4) var(--dim-x4)} .sheet.bottom .sheet__ft .btn{flex:1}
  /* ── Kbd ── 키 캡. 문서 사이트 검색창의 「Ctrl K」(.search kbd)와 같은 모양 */
  .kbd{display:inline-flex;align-items:center;justify-content:center;gap:var(--dim-x1);min-width:21px;padding:3px 6px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-xs);background:transparent;font:var(--font-size-t1)/1 var(--font-family);color:var(--fg-neutral-muted);white-space:nowrap;vertical-align:middle}
  .kbd svg.i{width:13px;height:13px} .kbd.sm{min-width:19px;padding:2px 4px}
  .kbd.combo{min-width:0;padding:0;border:0;border-radius:0} /* 조합: 바깥 kbd 가 캡들을 묶는다 */
  .kbd.inverse{color:var(--fg-neutral-placeholder);border-color:currentColor} /* 잉크 바탕(Tooltip) 위 */
  /* ── Scroll area ── 높이·폭이 정해진 상자 안의 스크롤. 막대 8px 자리에 4px, 색은 토큰 */
  .scrollarea{overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:var(--stroke-neutral-stronger) transparent}
  .scrollarea::-webkit-scrollbar{width:8px;height:8px} .scrollarea::-webkit-scrollbar-track{background:transparent}
  .scrollarea::-webkit-scrollbar-thumb{background:var(--stroke-neutral-stronger);background-clip:content-box;border:2px solid transparent;border-radius:var(--radius-full)} .scrollarea::-webkit-scrollbar-thumb:hover{background-color:var(--fg-neutral-placeholder)}
  .scrollarea:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .scrollarea.y{overflow-x:hidden} .scrollarea.x{overflow-y:hidden;padding-bottom:var(--dim-x2)}
  .scrollarea.bare{scrollbar-width:none} .scrollarea.bare::-webkit-scrollbar{display:none} .scrollarea.x.bare{padding-bottom:0}
  .scrollarea__row{display:flex;gap:var(--spacing-between-chips);width:max-content}
  /* fog — 스크롤이 남은 쪽만 흐리게(scroll-driven animation). 모르는 브라우저·넘치지 않는 상자는 흐림 없이 보인다 */
  @property --scrollarea-a{syntax:"<length>";inherits:false;initial-value:0px}
  @property --scrollarea-b{syntax:"<length>";inherits:false;initial-value:0px}
  .scrollarea.fog{mask-image:linear-gradient(to bottom,transparent,black var(--scrollarea-a),black calc(100% - var(--scrollarea-b)),transparent);animation:scrollarea-fog linear both;animation-timeline:scroll(self block)}
  .scrollarea.fog.x{mask-image:linear-gradient(to right,transparent,black var(--scrollarea-a),black calc(100% - var(--scrollarea-b)),transparent);animation-timeline:scroll(self inline)}
  @keyframes scrollarea-fog{0%{--scrollarea-a:0px;--scrollarea-b:var(--dim-x6)}8%{--scrollarea-a:var(--dim-x6)}92%{--scrollarea-b:var(--dim-x6)}100%{--scrollarea-a:var(--dim-x6);--scrollarea-b:0px}}
  /* ── Resizable ── 두 pane 사이 선을 끌어 나눈다. 선 1px · 누름 영역 8px · hover/끌기 accent */
  .resizable{display:flex;width:100%;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);overflow:hidden;text-align:left} .resizable.v{flex-direction:column}
  .resizable__pane{flex:1 1 0;min-width:0;min-height:0;overflow:auto;padding:var(--dim-x4);font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral-subtle)}
  .resizable__pane.side{background:var(--bg-layer-basement)} .resizable__pane b{display:block;margin-bottom:var(--dim-x1);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)}
  .resizable__handle{position:relative;z-index:1;flex:none;width:8px;margin:0 -4px;cursor:col-resize;touch-action:none;outline:none}
  .resizable__handle::after{content:"";position:absolute;top:0;bottom:0;left:3px;width:1px;background:var(--stroke-neutral);transition:background var(--duration-fast)}
  .resizable__handle:hover::after,.resizable__handle.hover::after,.resizable__handle.dragging::after{width:2px;background:var(--stroke-accent)}
  .resizable__handle:focus-visible::after,.resizable__handle.focus::after{width:2px;background:var(--stroke-focus)}
  .resizable__grip{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:inline-flex;align-items:center;justify-content:center;width:12px;height:24px;line-height:1;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-xs);background:var(--bg-layer-default);color:var(--fg-neutral-muted)} .resizable__grip svg{width:12px;height:12px}
  .resizable__handle:hover .resizable__grip,.resizable__handle.hover .resizable__grip,.resizable__handle.dragging .resizable__grip{border-color:var(--stroke-accent);color:var(--fg-neutral)}
  .resizable__handle:focus-visible .resizable__grip,.resizable__handle.focus .resizable__grip{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .resizable.v>.resizable__handle{width:auto;height:8px;margin:-4px 0;cursor:row-resize} .resizable.v>.resizable__handle::after{top:3px;bottom:auto;left:0;right:0;width:auto;height:1px}
  .resizable.v>.resizable__handle:hover::after,.resizable.v>.resizable__handle.hover::after,.resizable.v>.resizable__handle.dragging::after,.resizable.v>.resizable__handle.focus::after{width:auto;height:2px}
  .resizable.v .resizable__grip{width:24px;height:12px}
  .resizable.dragging{cursor:col-resize;user-select:none} .resizable.v.dragging{cursor:row-resize}
  .resizable.collapsed>.resizable__pane:last-child{display:none} .resizable.collapsed>.resizable__handle{margin:0 0 0 -8px} .resizable.collapsed>.resizable__handle::after{background:transparent} /* 접힘: grip 만 가장자리에 남는다 */
`;

// ── 공통 조각 ──
const btn = (label, cls) => `<button class="btn md ${cls}">${label}</button>`;
const sum = (rows) => '<div class="dialog-sum">' + rows.map(([k, v]) => `<div><span>${k}</span><b>${v}</b></div>`).join('') + '</div>';
const kbd = (k, cls, label) => `<kbd class="kbd${cls ? ' ' + cls : ''}"${label ? ` aria-label="${label}"` : ''}>${k}</kbd>`;
const combo = (keys, cls) => `<kbd class="kbd combo">${keys.map(k => kbd(k, cls)).join('')}</kbd>`;
const UP = kbd(icon('arrow-up'), 'sm', '위 화살표'), DOWN = kbd(icon('arrow-down'), 'sm', '아래 화살표'), CMD = kbd(icon('command'), '', 'Command');

// ── Sheet ──
const sheet = (cls, title, sub, body, foot) => `<div class="sheet ${cls}" role="dialog" aria-modal="true" aria-label="${title}">${cls.includes('bottom') ? '<span class="sheet__handle" aria-hidden="true"></span>' : ''}<div class="sheet__hd"><div><h4 class="sheet__title">${title}</h4>${sub ? `<p class="sheet__sub">${sub}</p>` : ''}</div><button class="iconbtn md ghost" aria-label="닫기">${icon('x')}</button></div><div class="sheet__body scrollarea">${body}</div>${foot ? `<div class="sheet__ft">${foot}</div>` : ''}</div>`;
const stage = (inner, cls) => `<div class="sheet__stage${cls ? ' ' + cls : ''}">${inner}</div>`;
const APPR = sheet('right', '9월 지출결의', '전자결재 · 박서준 상신 · 팀장 검토 중', sum([['금액', '184,000원'], ['상신', '9/8 11:02'], ['결재선', '김부장 → 인사팀'], ['첨부', '영수증 2장']]) + '<p>고객사 미팅 교통비와 식대입니다. 식대는 1인 한도 안이고 영수증 두 장을 붙였습니다. 승인하면 인사팀 검토로 넘어갑니다.</p>', btn('반려', 'neutral-outline') + btn('승인', 'brand-solid'));
const PERSON = sheet('right', '김도윤', '인사팀 · 책임', sum([['담당', '연차·휴가 · 근태 정정'], ['지금', '<span class="badge success">자리에 있음</span>'], ['내선', '4127'], ['오늘 일정', '15:00 인사위원회']]) + '<p>담당자 찾기에서 연 결과입니다. 메시지를 보내면 이 대화에 기록이 남습니다.</p>', btn('일정 보기', 'neutral-outline') + btn('메시지 보내기', 'brand-solid'));
const DOC = sheet('right wide', '연차 신청서', '전자결재 · 초안 · 에이전트가 작성했습니다', sum([['항목', '연차'], ['날짜', '9/11 (금) · 1일'], ['잔여', '11일 → 10일'], ['결재선', '김부장 → 인사팀']]) + '<p>사유는 「개인 사정」으로 적었습니다. 상신하면 확인 창이 한 번 더 뜨고, 상신 뒤에도 결재함에서 취소할 수 있습니다.</p>', btn('초안 고치기', 'neutral-outline') + btn('상신하기', 'brand-solid'));
const sb = (on, ic, label) => `<a class="sbnav__item${on ? ' on' : ''}" href="#components/sheet">${icon(ic)}<span>${label}</span></a>`;
const conv = (t, on) => `<a class="sbnav__conv${on ? ' on' : ''}" href="#components/sheet">${t}</a>`;
const NAVD = sheet('left', 'Waple Agent', '', sb(0, 'plus', '새 대화') + sb(1, 'sparkles', '에이전트') + sb(0, 'users', '임직원 현황') + sb(0, 'chart-bar', '팀 현황판') + '<div class="sbnav__label"><span>대화</span><span>12</span></div>' + conv('연차 잔여 현황 및 사용 내역 확인', 1) + conv('출근 기록 #3') + conv('이번 주 출퇴근 현황 요약 #2'), '');
const room = (t, m, on) => `<a class="lrow${on ? ' selected' : ''}" href="#components/sheet"><span class="lrow__ico">${icon('door')}</span><span class="lrow__main"><b>${t}</b><span class="lrow__meta">${m}</span></span>${on ? `<span class="lrow__go">${icon('check')}</span>` : ''}</a>`;
const ROOMS = room('회의실 A', '6인 · 모니터 · 비어 있음', 1) + room('회의실 B', '4인 · 비어 있음') + room('회의실 C', '4인 · 화상 장비 · 비어 있음') + room('대회의실', '12인 · 14:30 부터 예약됨') + room('포커스룸 1', '2인 · 비어 있음') + room('포커스룸 2', '2인 · 비어 있음');
const bottom = (cls) => sheet('bottom' + cls, '회의실 고르기', '9/10 (목) 14:00–15:00 · 6명', ROOMS, btn('회의실 A 예약하기', 'brand-solid'));

// ── Command palette ──
// ── Scroll area ──
const appr = (t, m, side, tone) => `<a class="lrow" href="#components/scroll-area"><span class="lrow__ico">${icon('file-text-filled')}</span><span class="lrow__main"><b>${t}</b><span class="lrow__meta">${m}</span></span><span class="lrow__side ${tone}">${side}</span></a>`;
const APPRS = appr('(AI_AGENT) 연차 신청의 건', '윤아린2 · 9/8 14:48', '승인 대기', 'warning') + appr('9월 지출결의', '박서준 · 9/8 11:02', '승인 대기', 'warning') + appr('외근 신청 — 판교 고객사', '이하은 · 9/7', '승인 대기', 'warning') + appr('출장비 정산', '최민호 · 9/5', '보완 요청', 'warning') + appr('회의실 장기 예약', '정다은 · 9/5', '반려', 'danger') + appr('업무일지 제출', '한지우 · 9/4', '승인 완료', 'success') + appr('반차 신청', '윤아린2 · 9/3', '승인 완료', 'success') + appr('교육비 지원 신청', '박서준 · 9/2', '승인 완료', 'success');
const box = (cls) => `<div class="lrows" style="padding:0;max-width:360px"><div class="scrollarea ${cls}" style="max-height:216px;padding:var(--dim-x1)" tabindex="0" role="region" aria-label="결재 대기">${APPRS}</div></div>`;
const CHIPS = '<span class="chip sm selected">전체 <span class="cnt">12</span></span>' + ['승인 대기 4', '보완 요청 1', '반려 1', '승인 완료 6', '연차', '지출결의', '외근·출장', '업무일지', '회의실'].map(c => `<span class="chip sm">${c.replace(/ (\d+)$/, ' <span class="cnt">$1</span>')}</span>`).join('');
const hrow = (cls, style) => `<div class="scrollarea ${cls}" style="${style || 'max-width:420px'}" tabindex="0" role="region" aria-label="결재 필터"><div class="scrollarea__row">${CHIPS}</div></div>`;
const nav2 = (ic, label) => `<button class="iconbtn sm outline" aria-label="${label}">${icon(ic)}</button>`;

// ── Resizable ──
const pane = (cls, t, d, style) => `<div class="resizable__pane${cls ? ' ' + cls : ''}"${style ? ` style="${style}"` : ''}><b>${t}</b>${d || ''}</div>`;
const handle = (o = {}) => `<div class="resizable__handle${o.cls ? ' ' + o.cls : ''}" role="separator" tabindex="0" aria-orientation="${o.v ? 'horizontal' : 'vertical'}" aria-label="${o.label || '컨텍스트 패널 폭'}" aria-valuenow="${o.now ?? 320}" aria-valuemin="${o.min ?? 280}" aria-valuemax="${o.max ?? 520}">${o.grip ? `<span class="resizable__grip">${icon(o.v ? 'grip-horizontal' : 'grip-vertical')}</span>` : ''}</div>`;
const split = (inner, cls, style) => `<div class="resizable${cls ? ' ' + cls : ''}" style="${style}">${inner}</div>`;
const CTX = split(pane('', '대화', '연차 잔여 현황을 알려 줘 — 잔여 11일, 이번 달 사용 1일입니다.') + handle() + pane('side', '컨텍스트 패널', '기본 320px · 끌어서 280–520', 'flex:0 0 var(--layout-context)'), '', 'height:200px');
const WF = split(pane('', '워크플로 캔버스', '연차 신청 → 잔여 확인 → 결재선 → 상신') + handle({ grip: 1, label: '속성 패널 폭', now: 340, min: 300, max: 480 }) + pane('side', '속성 패널', '340px · 300–480', 'flex:0 0 240px'), '', 'height:200px');
const tiny = (h, cls) => split(pane('', '대화') + h + pane('side', '패널', '', 'flex:0 0 88px'), cls, 'width:200px;height:112px');

export const pages = `
<section class="page" id="components/sheet">
  <h1>Sheet</h1>
  <p class="desc">화면 가장자리에 붙어 밀려 나오는 떠 있는 면입니다. 목록을 떠나지 않고 한 건의 상세를 보거나(오른쪽), 좁은 화면에서 메뉴를 열거나(왼쪽), 모바일에서 고르고 확정할 때(아래) 씁니다. 배경·닫기·포커스 규칙은 <a href="#components/dialog">Dialog</a> 와 같습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%;padding:0;overflow:hidden">${stage(APPR)}</div>
    <ol><li><b>Overlay</b> — <code>--bg-overlay</code>. 누르면 닫힙니다</li><li><b>Container</b> — 가장자리에 붙는 면, <code>--shadow-3</code>. 오른쪽 360 · 480</li><li><b>Header</b> — 제목 t4 600 + 부제 t1 muted + 닫기 iconbtn. 고정</li><li><b>Body</b> — 여기만 스크롤합니다(<a href="#components/scroll-area">Scroll area</a>)</li><li><b>Footer</b> (선택) — 아래 고정, 주요 행동 하나 + 보조 하나</li><li><b>Handle</b> (아래 시트만) — 36×4 알약. 끌어서 높이를 바꾸거나 닫습니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Side</h3>
  <div class="demo col">
    <figure class="ex">${stage(PERSON)}<figcaption>right · 360 — 결재·요청·담당자 한 건의 상세. 기본</figcaption></figure>
    <figure class="ex">${stage(DOC)}<figcaption>right · wide 480 — 신청서·지출결의 같은 문서 미리보기</figcaption></figure>
    <figure class="ex">${stage(NAVD, 'phone')}<figcaption>left · 280 — 768px 아래의 메뉴. Sidebar nav 항목을 그대로 담습니다</figcaption></figure>
  </div>
  <table><tr><th>변형</th><th>크기</th><th>쓰임</th></tr><tr><td>right</td><td>360</td><td>기본 — 목록 행의 상세, 1280px 아래로 접힌 컨텍스트 패널</td></tr><tr><td>right wide</td><td>480</td><td>요약·표가 긴 문서 미리보기</td></tr><tr><td>left</td><td>280 (최대 화면 폭 - 56)</td><td>모바일 메뉴 — 사이드바 대신</td></tr><tr><td>bottom</td><td>화면 폭 · half / full</td><td>모바일에서 고르기·필터·짧은 폼</td></tr></table>
  <h3>Bottom — snap</h3>
  <div class="demo">
    <figure class="ex">${stage(bottom(''), 'phone')}<figcaption>half · 50% — 처음 열 때. 위쪽 화면이 보여 맥락이 남습니다</figcaption></figure>
    <figure class="ex">${stage(bottom(' full'), 'phone')}<figcaption>full · 화면 - 48px — 위로 끌거나 입력할 때</figcaption></figure>
  </div>
  <table><tr><th>Snap</th><th>높이</th><th>언제</th></tr><tr><td>half</td><td>50%</td><td>처음 열림. 아래로 끌면 닫힙니다</td></tr><tr><td>full</td><td>화면 - 48px (<code>--dim-x12</code>)</td><td>위로 끌었을 때 · 키보드가 올라올 때. 끌다 놓으면 가까운 높이로 붙습니다</td></tr></table>
  <h3>Behavior</h3>
  <table style="word-break:keep-all"><tr><th>항목</th><th>규칙 — Dialog 와 같음</th></tr><tr><td>닫기</td><td>× · ESC · 배경 클릭은 모두 「닫기」. 아래 시트는 아래로 끌어도 닫힙니다. 고치던 내용이 있으면 닫기 전에 확인 Dialog</td></tr><tr><td>포커스</td><td>열리면 시트 안 첫 컨트롤(없으면 ×)로 가고, Tab 은 시트 안에서만 돌며, 닫히면 연 버튼으로 돌아갑니다</td></tr><tr><td>스크롤</td><td>본문만 굴러갑니다. 머리·푸터는 고정, 뒤 페이지는 잠급니다</td></tr><tr><td>겹침</td><td>시트 위 확인 Dialog 는 됩니다(상신·승인). 시트 위에 시트는 겹치지 않고 내용을 바꿉니다</td></tr><tr><td>모션</td><td>가장자리에서 밀려 들어옴 <code>--duration-normal</code> <code>--easing</code>, 나갈 때 <code>--duration-fast</code>. 움직임 줄이기 설정이면 페이드만</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>목록 행을 누르면 오른쪽 시트로 상세를 엽니다. 닫았을 때 목록의 스크롤 위치와 선택이 그대로 남습니다.</div>
    <div class="dont"><b>Don&#39;t</b>확인 한 번을 받으려고 시트를 열지 않습니다(<a href="#components/dialog">Dialog</a>). 시트 안에서 다른 화면으로 이동시키지 않습니다 — 이동은 페이지로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>푸터에는 주요 행동 하나(brand-solid)와 보조 하나. 모바일 아래 시트의 버튼은 폭을 채웁니다.</div>
    <div class="dont"><b>Don&#39;t</b>아래 시트를 끌기로만 닫게 하지 않습니다 — 끌 수 없는 사람을 위해 × 를 함께 둡니다. 핸들만 두고 제목을 빼지 않습니다.</div>
  </div>
  <h2>Sheet vs. Dialog vs. Settings dialog</h2>
  <table><tr><th></th><th>Sheet</th><th>Dialog</th><th>Settings dialog</th></tr><tr><td>목적</td><td>자리를 지킨 채 상세 보기·짧은 편집</td><td>행동 하나를 확인</td><td>여러 설정을 둘러보며 바꿈</td></tr><tr><td>자리</td><td>가장자리(오른쪽·왼쪽·아래)</td><td>가운데</td><td>가운데</td></tr><tr><td>크기</td><td>360 · 480 / 280 / half·full</td><td>360 · 480</td><td>880 × 80vh</td></tr><tr><td>내용</td><td>스크롤 본문 + 고정 푸터</td><td>질문 + 요약 + 버튼 둘</td><td>목차 + 설정 행</td></tr><tr><td>저장</td><td>푸터 주요 버튼(읽기만이면 없음)</td><td>주요 버튼 하나</td><td>행마다 즉시</td></tr><tr><td>닫기</td><td>× · ESC · 바깥 · (아래) 끌기</td><td>취소 · ESC · 바깥</td><td>× · ESC · 바깥</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Overlay</td><td><code>--bg-overlay</code></td></tr><tr><td>Container</td><td><code>--bg-layer-floating</code> · <code>--shadow-3</code> · 가장자리 쪽 라운드 없음 · 아래 시트는 위 모서리 <code>--radius-xl</code></td></tr><tr><td>Header</td><td>패딩 <code>--dim-x5</code> <code>--dim-x4</code> <code>--dim-x4</code> <code>--dim-x6</code> · 제목 t4 600 <code>--fg-neutral</code> · 부제 t1 <code>--fg-neutral-muted</code> · 닫기 iconbtn md ghost</td></tr><tr><td>Body</td><td>t2 <code>--fg-neutral-subtle</code> · 패딩 0 <code>--dim-x6</code> <code>--dim-x6</code>(목록 몸통은 <code>--dim-x2</code>) · Scroll area</td></tr><tr><td>Footer</td><td>위 선 <code>--stroke-neutral</code> · 패딩 <code>--dim-x4</code> <code>--dim-x6</code> · 오른쪽 정렬 Button md, 간격 <code>--dim-x2</code>(아래 시트는 폭 채움)</td></tr><tr><td>Handle</td><td>36×4 · <code>--stroke-neutral-stronger</code> · <code>--radius-full</code> · 위 <code>--dim-x2</code></td></tr><tr><td>접근성</td><td><code>role="dialog" aria-modal="true" aria-labelledby=제목</code> · 포커스 트랩 · ESC = 닫기 · 닫힌 뒤 연 버튼으로 포커스 · 핸들은 장식(<code>aria-hidden</code>), 끌기 대신 × 가 같은 일을 합니다</td></tr></table>
</section>



<section class="page" id="components/kbd">
  <h1>Kbd</h1>
  <p class="desc">단축키를 알려 주는 키 캡입니다. 누르는 버튼이 아니라 <b>읽는 표시</b>라서 배경 없이 선만 긋습니다. 문서 사이트 검색창 끝의 「Ctrl K」가 이 모양입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${combo(['Ctrl', 'K'])}</div>
    <ol><li><b>Cap</b> — 1px <code>--stroke-neutral-strong</code> 선, <code>--radius-xs</code>, 배경 없음</li><li><b>Label</b> — t1 400 muted. 키보드에 새겨진 이름 그대로</li><li><b>Group</b> (조합) — 캡을 4px 간격으로 나란히 두고 바깥 <code>&lt;kbd&gt;</code> 로 묶습니다</li><li><b>Icon</b> (선택) — 13px. command · 화살표처럼 글자가 없는 키</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><figure class="ex">${kbd('Esc', 'sm')}<figcaption>sm · 19px — 메뉴 항목·툴팁·버튼 안</figcaption></figure><figure class="ex">${kbd('Esc')}<figcaption>md · 21px — 본문·검색창 끝</figcaption></figure></div>
  <table><tr><th>크기</th><th>높이</th><th>패딩</th><th>최소 폭</th><th>쓰임</th></tr><tr><td>sm</td><td>19px</td><td>2px 4px</td><td>19px</td><td>메뉴 항목 끝 · 툴팁 · 버튼 안 · 명령 팔레트 푸터</td></tr><tr><td>md</td><td>21px</td><td>3px 6px</td><td>21px</td><td>기본 — 본문 문장 · 검색창 끝(문서 사이트 <code>.search kbd</code> 와 같은 값)</td></tr></table>
  <h3>Variant</h3>
  <div class="demo">
    <figure class="ex">${kbd('Esc')}<figcaption>single — 키 하나</figcaption></figure>
    <figure class="ex">${combo(['Ctrl', 'Shift', 'K'])}<figcaption>combo — 함께 누르는 키, 캡마다</figcaption></figure>
    <figure class="ex">${kbd('Ctrl K')}<figcaption>joined — 한 캡에 합침</figcaption></figure>
    <figure class="ex"><span>${kbd(icon('arrow-up'), '', '위 화살표')} ${kbd(icon('arrow-down'), '', '아래 화살표')}</span><figcaption>icon — 글자가 없는 키</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>마크업</th><th>쓰임</th></tr><tr><td>single</td><td><code>&lt;kbd class="kbd"&gt;</code></td><td>Esc · Enter · Tab</td></tr><tr><td>combo</td><td>바깥 <code>.kbd.combo</code> 안에 키마다 <code>.kbd</code>. 사이에 + 를 쓰지 않습니다</td><td>기본 — 본문·메뉴·툴팁</td></tr><tr><td>joined</td><td>한 캡에 「Ctrl K」</td><td>좁은 자리만 — 검색창 끝, 버튼 안</td></tr><tr><td>icon</td><td>캡 안에 아이콘 13px + <code>aria-label</code></td><td>화살표 · macOS command</td></tr></table>
  <h3>Platform</h3>
  <div class="demo"><figure class="ex">${combo(['Ctrl', 'K'])}<figcaption>Windows — Ctrl</figcaption></figure><figure class="ex"><kbd class="kbd combo">${CMD}${kbd('K')}</kbd><figcaption>macOS — command 아이콘</figcaption></figure></div>
  <table><tr><th>역할</th><th>Windows</th><th>macOS</th></tr><tr><td>주 조합 키</td><td>${kbd('Ctrl')}</td><td>${CMD}</td></tr><tr><td>보조</td><td>${kbd('Alt')}</td><td>${kbd('Option')}</td></tr><tr><td>확장</td><td>${kbd('Shift')}</td><td>${kbd('Shift')}</td></tr><tr><td>실행</td><td>${kbd('Enter')}</td><td>${kbd('Return')}</td></tr></table>
  <p>운영체제는 처음 한 번 정하고 화면 전체가 같은 표기를 씁니다. 한 화면에 Ctrl 과 command 를 섞지 않습니다.</p>
  <h3>In context</h3>
  <div class="demo" style="padding-top:64px;align-items:flex-end">
    <figure class="ex"><button class="btn sm neutral-outline" aria-keyshortcuts="Control+K">${icon('search')}검색${kbd('Ctrl K', 'sm')}</button><figcaption>button — 라벨 뒤, sm joined</figcaption></figure>
    <figure class="ex"><div class="menu" role="menu"><button class="menu__item" role="menuitem">${icon('command')}<span class="menu__text">명령 팔레트</span><span class="menu__end">${combo(['Ctrl', 'K'], 'sm')}</span></button><button class="menu__item" role="menuitem">${icon('settings')}<span class="menu__text">설정</span><span class="menu__end">${combo(['Ctrl', ','], 'sm')}</span></button></div><figcaption>menu item — 끝 슬롯에 sm</figcaption></figure>
    <figure class="ex" style="align-items:center"><span class="tip-host"><button class="iconbtn md outline" aria-label="명령 팔레트" aria-keyshortcuts="Control+K">${icon('command')}</button><span class="tip on" role="tooltip">명령 팔레트 ${kbd('Ctrl K', 'sm inverse')}</span></span><figcaption>tooltip — 이름 뒤, inverse</figcaption></figure>
    <figure class="ex"><span>어느 화면에서든 ${combo(['Ctrl', 'K'])} 로 엽니다.</span><figcaption>text — 문장 안, md</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>키 이름은 키보드에 새겨진 영어 그대로 — Ctrl · Shift · Enter · Esc. 조합은 캡을 나누고, 좁은 자리에서만 한 캡으로 합칩니다.</div>
    <div class="dont"><b>Don&#39;t</b>「컨트롤」「엔터」처럼 한글로 풀어 쓰지 않습니다. macOS 기호를 글자로 넣지 않습니다 — 글꼴마다 모양이 달라 command 는 아이콘으로 씁니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>단축키는 찾을 수 있는 자리에 둡니다 — 메뉴 항목 끝, 툴팁, 명령 팔레트 푸터.</div>
    <div class="dont"><b>Don&#39;t</b>단축키를 유일한 방법으로 두지 않습니다. 브라우저가 쓰는 조합(Ctrl T · W · L · R)과 겹치게 정하지 않습니다.</div>
  </div>
  <h2>Kbd vs. Badge</h2>
  <table><tr><th></th><th>Kbd</th><th>Badge</th></tr><tr><td>뜻</td><td>누를 키</td><td>상태 한 단어·건수</td></tr><tr><td>모양</td><td>선만, <code>--radius-xs</code>, t1 400</td><td>weak 채움, 알약, 12px 600</td></tr><tr><td>색</td><td>muted 한 가지</td><td>상태 어휘 여섯</td></tr><tr><td>요소</td><td><code>&lt;kbd&gt;</code></td><td><code>&lt;span&gt;</code></td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Cap</td><td>선 <code>--stroke-neutral-strong</code> · <code>--radius-xs</code> · 배경 없음</td></tr><tr><td>Label</td><td>t1 / 1 <code>--font-family</code> 400 · <code>--fg-neutral-muted</code> · 줄바꿈 없음</td></tr><tr><td>Size</td><td>md 패딩 3px 6px, 최소 21 · sm 2px 4px, 최소 19</td></tr><tr><td>Icon</td><td>13px · <code>currentColor</code></td></tr><tr><td>Group</td><td>캡 사이 <code>--dim-x1</code></td></tr><tr><td>inverse</td><td>잉크 바탕(Tooltip) 위 — 글자 <code>--fg-neutral-placeholder</code>, 선은 같은 색(<code>currentColor</code>)</td></tr><tr><td>접근성</td><td><code>&lt;kbd&gt;</code> 요소 — 조합은 바깥 <code>&lt;kbd&gt;</code> 안에 키마다 <code>&lt;kbd&gt;</code> · 아이콘 키는 <code>aria-label</code>(「위 화살표」「Command」) · 단축키가 있는 버튼은 <code>aria-keyshortcuts="Control+K"</code></td></tr></table>
</section>

<section class="page" id="components/scroll-area">
  <h1>Scroll area</h1>
  <p class="desc">높이나 폭이 정해진 상자 안에서만 내용을 굴립니다. 사이드바 본문 · 컨텍스트 패널 · 시트 본문 · 드롭다운 · 표처럼 가장자리가 고정된 자리에 쓰고, 막대는 얇게, 색은 토큰으로 맞춥니다. 페이지 본문은 브라우저 스크롤 그대로 둡니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${box('y')}</div>
    <ol><li><b>Viewport</b> — <code>overflow:auto</code> + <code>max-height</code>. 테두리·라운드는 바깥 상자가 가집니다</li><li><b>Content</b> — 넘치는 내용. 손대지 않습니다</li><li><b>Scrollbar</b> — 8px 자리에 4px 막대, <code>--stroke-neutral-stronger</code>. 트랙 없음</li><li><b>Fog</b> (선택) — 남은 쪽 가장자리 24px 를 흐리게</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Orientation</h3>
  <div class="demo col">
    <figure class="ex">${box('y')}<figcaption>vertical — 목록·패널. max-height 를 넘으면 세로로</figcaption></figure>
    <figure class="ex">${hrow('x')}<figcaption>horizontal — 칩·카드 한 줄. 막대와 내용 사이 8px</figcaption></figure>
  </div>
  <h3>Variant</h3>
  <div class="demo col">
    <figure class="ex">${box('y fog')}<figcaption>fog — 남은 쪽 24px 가 흐려지고, 끝에 닿으면 사라집니다(굴려 보세요)</figcaption></figure>
    <figure class="ex">${hrow('x fog')}<figcaption>fog · horizontal — 오른쪽에 더 있다는 표시</figcaption></figure>
    <figure class="ex"><div style="display:flex;align-items:center;gap:var(--dim-x2);max-width:480px">${nav2('chevron-left', '이전')}${hrow('x bare', 'flex:1;min-width:0')}${nav2('chevron-right', '다음')}</div><figcaption>bare — 막대를 숨기고 이전/다음 버튼으로. 홈 빠른 실행 카드 줄</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>모양</th><th>쓰임</th></tr><tr><td>default</td><td>얇은 막대만</td><td>사이드바·패널·시트 본문·드롭다운</td></tr><tr><td>fog</td><td>남은 쪽 가장자리 흐림</td><td>끝이 안 보이는 목록·가로 칩 줄 — 「더 있다」를 알릴 때</td></tr><tr><td>bare</td><td>막대 없음</td><td>이전/다음 버튼이 있을 때만 — 카드 레일</td></tr></table>
  <h3>Scrollbar</h3>
  <table><tr><th>항목</th><th>값</th></tr><tr><td>자리</td><td>8px (세로는 폭, 가로는 높이)</td></tr><tr><td>막대</td><td>4px 알약(2px 투명 테두리) · <code>--stroke-neutral-stronger</code> → hover <code>--fg-neutral-placeholder</code></td></tr><tr><td>트랙</td><td>투명 — 선·배경 없음</td></tr><tr><td>브라우저</td><td>Chromium·Firefox 는 <code>scrollbar-width:thin</code> + <code>scrollbar-color</code>, Safari 는 <code>::-webkit-scrollbar</code></td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>가장자리가 고정된 곳에만 씁니다 — 머리·푸터는 두고 본문만 굴립니다(시트 본문, 사이드바 본문).</div>
    <div class="dont"><b>Don&#39;t</b>페이지 본문을 max-height 상자에 가두지 않습니다 — 스크롤바가 둘이 되고 휠이 어디서 멈출지 모릅니다. 같은 방향 스크롤 영역을 겹치지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>가로 스크롤엔 fog 나 이전/다음 버튼으로 「더 있다」를 알립니다. 키보드로 굴려야 하는 영역엔 <code>tabindex="0"</code> 과 이름을 줍니다.</div>
    <div class="dont"><b>Don&#39;t</b>막대를 숨기고(bare) 아무 단서도 두지 않습니다. 표처럼 머리가 붙은 내용에 세로 fog 를 씌우지 않습니다 — 첫 행이 흐려집니다.</div>
  </div>
  <h2>Scroll area vs. Page scroll</h2>
  <table><tr><th></th><th>Scroll area</th><th>Page scroll</th></tr><tr><td>언제</td><td>높이가 정해진 영역 — 사이드바·컨텍스트 패널·시트·드롭다운·표·캔버스</td><td>본문 — 기본</td></tr><tr><td>막대</td><td>얇은 8px, 토큰 색</td><td>브라우저 기본</td></tr><tr><td>키보드</td><td><code>tabindex="0"</code> 로 포커스를 받아야 화살표로 굴러감</td><td>Space · Page Down 기본</td></tr><tr><td>개수</td><td>한 방향에 하나 — 중첩 금지</td><td>화면에 하나</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Viewport</td><td><code>overflow:auto</code> · <code>overscroll-behavior:contain</code>(끝에 닿아도 뒤 페이지가 굴러가지 않음) · 높이는 쓰는 곳이 정함</td></tr><tr><td>Scrollbar</td><td><code>scrollbar-color: --stroke-neutral-stronger transparent</code> · 8px 자리, 막대 4px <code>--radius-full</code> · hover <code>--fg-neutral-placeholder</code></td></tr><tr><td>Fog</td><td><code>mask-image</code> 선형 그라디언트 transparent → black <code>--dim-x6</code> · scroll-driven animation 으로 남은 쪽만 — 지원하지 않는 브라우저는 흐림 없이</td></tr><tr><td>Horizontal</td><td>아래 여백 <code>--dim-x2</code> · 내용 한 줄(<code>width:max-content</code>), 칩 사이 <code>--spacing-between-chips</code></td></tr><tr><td>Focus</td><td>안쪽 2px <code>--stroke-focus</code></td></tr><tr><td>접근성</td><td>포커스 받을 요소가 없는 영역은 <code>tabindex="0" role="region" aria-label</code> — 화살표·Page Up/Down 으로 굴립니다. 막대를 숨긴 bare 는 버튼에 <code>aria-label</code>(이전·다음)</td></tr></table>
</section>

<section class="page" id="components/resizable">
  <h1>Resizable</h1>
  <p class="desc">두 영역 사이의 선을 끌어 폭(높이)을 나눕니다. 홈의 <b>대화 | 컨텍스트 패널</b>(기본 320, 280–520)과 콘솔의 <b>워크플로 캔버스 | 속성 패널</b>에 씁니다. 끈 폭은 기억하고, 선을 두 번 누르면 기본값으로 돌아갑니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${split(pane('', '대화', '연차 잔여 현황을 알려 줘 — 잔여 11일, 이번 달 사용 1일입니다.') + handle({ grip: 1 }) + pane('side', '컨텍스트 패널', '기본 320px · 끌어서 280–520', 'flex:0 0 var(--layout-context)'), '', 'height:220px')}</div>
    <ol><li><b>Pane</b> — 나뉜 영역. 내용은 pane 안에서 스크롤합니다</li><li><b>Handle</b> — 1px 선 + 양쪽 4px 씩 8px 누름 영역. hover·끌기에 accent 2px, 커서 col-resize</li><li><b>Grip</b> (선택) — 12×24 손잡이 + grip 아이콘 12px</li><li><b>Sized pane</b> — 크기를 가진 쪽(컨텍스트 320). 반대쪽은 남은 폭을 채웁니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Orientation</h3>
  <div class="demo col">
    <figure class="ex">${CTX}<figcaption>horizontal — 좌우로 나눔, col-resize. 홈 대화 | 컨텍스트 패널</figcaption></figure>
    <figure class="ex">${split(pane('', '워크플로 캔버스', '연차 신청 → 잔여 확인 → 결재선 → 상신') + handle({ grip: 1, v: 1, label: '속성 패널 높이', now: 96, min: 80, max: 240 }) + pane('side', '속성 패널', '1024px 아래에서 캔버스 밑으로 쌓일 때', 'flex:0 0 96px'), 'v', 'height:240px')}<figcaption>vertical — 위아래로 나눔, row-resize. 좁은 폭의 워크벤치</figcaption></figure>
  </div>
  <h3>Handle</h3>
  <div class="demo col">
    <figure class="ex">${CTX}<figcaption>line — 선만. 앱 셸 경계처럼 가끔 끄는 곳. hover 에 accent 선 + 커서로 알림</figcaption></figure>
    <figure class="ex">${WF}<figcaption>grip — 손잡이. 워크플로 캔버스 | 속성 패널처럼 자주 끄는 편집 화면</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo">
    <figure class="ex">${tiny(handle({ grip: 1 }))}<figcaption>default</figcaption></figure>
    <figure class="ex">${tiny(handle({ grip: 1, cls: 'hover' }))}<figcaption>hover — accent 2px</figcaption></figure>
    <figure class="ex">${tiny(handle({ grip: 1, cls: 'dragging' }), 'dragging')}<figcaption>dragging — 글자 선택 막음</figcaption></figure>
    <figure class="ex">${tiny(handle({ grip: 1, cls: 'focus' }))}<figcaption>focus — 키보드, focus 링</figcaption></figure>
    <figure class="ex">${tiny(handle({ grip: 1, now: 0 }), 'collapsed')}<figcaption>collapsed — grip 만 가장자리에</figcaption></figure>
  </div>
  <h3>Constraints</h3>
  <table><tr><th>쓰는 곳</th><th>기본</th><th>최소</th><th>최대</th><th>두 번 누름</th><th>기억</th></tr><tr><td>홈 컨텍스트 패널</td><td>320 (<code>--layout-context</code>)</td><td>280</td><td>520</td><td>320 으로</td><td>브라우저에 저장</td></tr><tr><td>워크플로 속성 패널</td><td>340</td><td>300</td><td>480</td><td>340 으로</td><td>브라우저에 저장</td></tr></table>
  <p>최소에서 더 끌면 멈추고, 최소보다 80px 넘게 더 끌면 접힙니다(collapsed). 접힌 pane 은 가장자리에 남은 grip 을 끌거나 핸들에서 Enter 로 다시 엽니다.</p>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>기본·최소·최대를 정하고, 끈 폭은 기억하고, 두 번 누르면 기본값으로 — 홈 컨텍스트 패널이 이 규칙입니다.</div>
    <div class="dont"><b>Don&#39;t</b>최소 없이 끝까지 줄이게 두지 않습니다 — 글이 한 글자씩 꺾이는 폭이 생깁니다. 반대쪽(대화 열)의 최소 폭도 지킵니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>가끔 끄는 앱 셸 경계는 선만, 자주 끄는 편집 화면은 grip 을 둡니다.</div>
    <div class="dont"><b>Don&#39;t</b>1280px 아래·터치 화면에 핸들을 두지 않습니다 — 그 폭에서 컨텍스트 패널은 <a href="#components/sheet">Sheet</a>(오른쪽 360)로 바뀝니다(계획서 §7.1).</div>
  </div>
  <h2>Resizable vs. Sheet</h2>
  <table><tr><th></th><th>Resizable</th><th>Sheet</th></tr><tr><td>관계</td><td>본문 옆에 나란히 — 본문이 좁아짐</td><td>본문 위에 뜸 — 본문을 가림</td></tr><tr><td>크기</td><td>사용자가 끌어 정하고 기억</td><td>고정 360 · 480</td></tr><tr><td>닫기</td><td>접기(collapsed) · Enter</td><td>× · ESC · 바깥 클릭</td></tr><tr><td>폭</td><td>≥ 1280</td><td>&lt; 1280 에서 같은 패널이 Sheet 로</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Line</td><td>1px <code>--stroke-neutral</code> · hover·끌기 2px <code>--stroke-accent</code> · focus 2px <code>--stroke-focus</code></td></tr><tr><td>Hit&nbsp;area</td><td>8px(선 양쪽 4px) · 커서 col-resize / row-resize · 끄는 동안 <code>user-select:none</code></td></tr><tr><td>Grip</td><td>12×24(세로 24×12) · <code>--bg-layer-default</code> · 선 <code>--stroke-neutral-strong</code>(hover <code>--stroke-accent</code>) · <code>--radius-xs</code> · 아이콘 12px <code>--fg-neutral-muted</code></td></tr><tr><td>Pane</td><td><code>min-width:0</code> · 안에서 스크롤 · 크기를 가진 쪽은 <code>flex-basis</code>(홈 <code>--layout-context</code>), 보조 pane 은 <code>--bg-layer-basement</code></td></tr><tr><td>Motion</td><td>끄는 동안은 즉시(전환 없음) · 두 번 누름·접기는 <code>--duration-normal</code> <code>--easing</code></td></tr><tr><td>접근성</td><td><code>role="separator" tabindex="0" aria-orientation</code>(좌우로 나누면 vertical) · <code>aria-valuenow·min·max</code>(px) · <code>aria-controls</code>=크기를 가진 pane · <code>aria-label="컨텍스트 패널 폭"</code> · ←→(↑↓) 16px · Home/End 최소/최대 · Enter 접기/펼치기</td></tr></table>
</section>
`;

export const nav = [['components/sheet', 'Sheet'], ['components/kbd', 'Kbd'], ['components/scroll-area', 'Scroll area'], ['components/resizable', 'Resizable']];
export const tint = ['scroll-area'];
