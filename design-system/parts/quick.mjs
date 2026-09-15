// 빠른 실행: Quick action card · Work panel(대화 안 작업 패널)
import { icon } from './icons.mjs';

export const css = `
  /* ── Quick action card ── 낮고 넓은 카드. 조작은 hover 에 펼쳐지고, 옆 카드 높이는 그대로다 */
  .qgrid{--qcard-h:120px;--qgrow:77px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--dim-x2);width:100%;padding:var(--dim-x2) 0 var(--dim-x4);margin:calc(var(--dim-x2) * -1) 0 calc(var(--dim-x4) * -1)}
  .qgrid.one{grid-template-columns:minmax(0,264px)} /* 한 장짜리 예시 — 실제 칸 폭으로 */
  .qgrid.one .qcard{height:auto} .qgrid.one .qcard__body{position:static} /* 문서에서는 펼친 높이를 그대로 — 캡션을 덮지 않게 */
  .qcard{position:relative;height:var(--qcard-h);min-width:0}
  .qcard__body{position:absolute;left:0;right:0;top:0;min-height:100%;display:flex;flex-direction:column;padding:var(--dim-x3) var(--dim-x3_5) var(--dim-x3_5);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);transition:border-color var(--duration-fast),box-shadow var(--duration-fast),left var(--duration-normal) var(--easing),right var(--duration-normal) var(--easing)}
  /* 오른쪽·아래로 커진다(왼쪽 모서리 고정). 한 줄의 맨 오른쪽 칸만 자리가 없어 왼쪽·아래로 */
  .qcard:hover .qcard__body,.qcard.open .qcard__body{border-color:var(--stroke-neutral-stronger);z-index:8;box-shadow:var(--shadow-3);left:0;right:calc(var(--qgrow) * -1);padding:var(--dim-x3_5)}
  .qgrid > .qcard:nth-child(4n):hover .qcard__body,.qgrid > .qcard:nth-child(4n).open .qcard__body{left:calc(var(--qgrow) * -1);right:0}
  .qgrid.one{--qgrow:0px}
  .qcard__hd{display:flex;flex-direction:column;align-items:stretch;gap:var(--dim-x3);min-width:0;color:inherit;text-decoration:none}
  .qcard__top{display:flex;align-items:center;justify-content:space-between;gap:var(--dim-x1_5);min-height:30px}
  .qcard__ico{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:var(--radius-sm);flex:none;background:var(--bg-neutral-weak);color:var(--fg-neutral-subtle)}
  .qcard__ico svg{width:16px;height:16px}
  .qcard__ico.accent{background:var(--bg-accent-weak);color:var(--fg-accent)} .qcard__ico.info{background:var(--bg-info-weak);color:var(--fg-info)} .qcard__ico.violet{background:var(--bg-violet-weak);color:var(--fg-violet)} .qcard__ico.warning{background:var(--bg-warning-weak);color:var(--fg-warning)} .qcard__ico.positive{background:var(--bg-positive-weak);color:var(--fg-positive)}
  .qcard__t{min-width:0}
  .qcard__t b{display:block;font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .qcard__top .badge{flex:none}
  .qcard__t p{margin:2px 0 0;font-size:12px;line-height:1.3;color:var(--fg-neutral-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .qcard__more{display:grid;grid-template-rows:0fr;opacity:0;transition:grid-template-rows var(--duration-normal) var(--easing),opacity var(--duration-fast)}
  .qcard__more > div{overflow:hidden;min-height:0}
  .qcard:hover .qcard__more,.qcard.open .qcard__more{grid-template-rows:1fr;opacity:1}
  /* 설명·달력과 조작 사이 여백 — 블록 종류에 상관없이 한 규칙으로 */
  .qcard__more > div > *:first-child{margin-top:var(--dim-x3_5)}
  .qcard__more > div > * + *{margin-top:var(--dim-x2_5)}
  .qcard__ft{display:flex;flex-wrap:wrap;align-items:center;gap:var(--dim-x1)}
  .qcounts{display:flex;font-size:12px;color:var(--fg-neutral-muted);background:var(--bg-layer-basement);border-radius:var(--radius-sm);padding:var(--dim-x2) 0}
  .qcounts > span{flex:1;display:flex;align-items:center;justify-content:center;gap:var(--dim-x1);border-left:1px solid var(--stroke-neutral-strong)} .qcounts > span:first-child{border-left:0}
  .qcounts b{font-weight:var(--font-weight-bold);color:var(--fg-neutral)} .qcounts b.hot{color:var(--fg-critical)}
  /* 주간 달력 — 뒷배경 없이 카드 위에 바로. 날짜는 테두리 있는 동그란 버튼이라 누를 수 있다는 것이 보인다 */
  .qweek{display:flex;flex-direction:column}
  .qcard__more > div > .qweek:first-child{margin-top:var(--dim-x4)}
  .qweek__hd{display:flex;align-items:center;justify-content:space-between;gap:var(--dim-x2);font-size:11px;font-weight:var(--font-weight-medium);color:var(--fg-neutral-subtle);padding-bottom:var(--dim-x2);border-bottom:1px solid var(--stroke-neutral)}
  .qweek__hd b{font-size:11px;font-weight:var(--font-weight-bold);color:var(--fg-neutral)}
  .qdays{display:flex;gap:2px;padding:13px 0 11px}
  .qday{position:relative;flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 0 6px;border:0;background:none;font:inherit;cursor:pointer}
  .qday em{font-style:normal;font-size:10.5px;color:var(--fg-neutral-muted);line-height:1}
  /* 고를 수 있음 — 흰 바탕 + 또렷한 테두리 + 진한 숫자 */
  .qday b{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:var(--radius-full);border:1px solid var(--stroke-neutral-stronger);background:var(--bg-layer-default);color:var(--fg-neutral);font-size:13px;font-weight:var(--font-weight-semibold);line-height:1;transition:border-color var(--duration-fast),background var(--duration-fast),color var(--duration-fast)}
  .qday:hover b{border-color:var(--stroke-accent);background:var(--bg-accent-weak);color:var(--fg-accent)}
  .qday.today em{color:var(--fg-accent)} .qday.today b{border-color:var(--stroke-accent);color:var(--fg-accent)}
  .qday.on b{background:var(--bg-brand-solid);border-color:var(--stroke-brand);color:var(--fg-on-brand)}
  /* 못 고르는 날은 숫자만 눌러 표시한다 — 요일 글자는 어느 상태에서나 그대로 둔다 */
  .qday.past{pointer-events:none}
  .qday.past b{background:var(--bg-neutral-weak);border-color:transparent;color:var(--fg-neutral-muted)}
  /* 이미 연차가 있는 날 — 눌러도 소용없으니 점선과 점으로 미리 알린다 */
  .qday.has{pointer-events:none}
  .qday.has b{border-style:dashed;border-color:var(--stroke-neutral-stronger);color:var(--fg-neutral-muted)}
  .qday.has::after{content:'';position:absolute;left:50%;bottom:0;width:3px;height:3px;margin-left:-1.5px;border-radius:var(--radius-full);background:var(--fg-neutral-muted)}
  /* 고른 뒤 — 회색 상자로 묶는다. 이게 떠 있는 동안은 아래 버튼 줄을 감춘다 */
  .qpick{display:flex;flex-direction:column;gap:var(--dim-x2);background:var(--bg-layer-basement);border-radius:var(--radius-sm);padding:var(--dim-x2_5) var(--dim-x3)}
  .qpick:not([hidden]) + .qcard__ft{display:none}
  .qpick__hd{display:flex;align-items:center;gap:var(--dim-x1_5);font-size:11px;color:var(--fg-neutral-muted);white-space:nowrap;min-width:0}
  .qpick__hd b{font-size:12px;font-weight:var(--font-weight-semibold);color:var(--fg-accent)}
  .qpick__x{margin-left:auto;display:flex;border:0;background:none;padding:0;color:var(--fg-neutral-placeholder);cursor:pointer} .qpick__x svg{width:13px;height:13px} .qpick__x:hover{color:var(--fg-critical)}
  /* 사유 직접 입력 — 카드 안에서 신청까지 끝낸다 */
  .qpick__in{display:flex;align-items:center;gap:var(--dim-x1_5)}
  .qpick__in input{flex:1;min-width:0;height:32px;padding:0 var(--dim-x3);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default);font:inherit;font-size:12px;color:var(--fg-neutral)}
  .qpick__in input::placeholder{color:var(--fg-neutral-placeholder)}
  .qpick__in .btn{flex:none}
  .qpick__done{display:flex;align-items:flex-start;gap:var(--dim-x1);margin:0;font-size:12px;line-height:1.35;color:var(--fg-accent)}
  .qpick__done svg{width:14px;height:14px;margin-top:1px;flex:none}
  /* ── Work panel ── 대화 안에서 값을 고르고 한 번에 상신한다 */
  .wpanel{border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-xl);background:var(--bg-layer-default);padding:var(--dim-x5) var(--dim-x6) var(--dim-x4);box-shadow:var(--shadow-1);width:100%}
  .wpanel__hd{display:flex;align-items:center;gap:var(--dim-x1_5);margin-bottom:var(--dim-x3_5)}
  .wpanel__hd svg{width:17px;height:17px;color:var(--fg-accent)} .wpanel__hd b{font-size:var(--font-size-t3);font-weight:var(--font-weight-semibold)} .wpanel__hd span{font-size:12px;color:var(--fg-neutral-muted)}
  .wpanel__x{margin-left:auto;display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border:0;border-radius:var(--radius-sm);background:none;color:var(--fg-neutral-subtle);cursor:pointer} .wpanel__x:hover{background:var(--bg-neutral-hover);color:var(--fg-neutral)} .wpanel__x svg{width:15px;height:15px}
  .wstats{display:flex;flex-wrap:wrap;gap:var(--dim-x1_5);margin-bottom:var(--dim-x4)}
  .wstats span{display:inline-flex;align-items:center;gap:var(--dim-x1);height:28px;padding:0 var(--dim-x3);border-radius:var(--radius-full);background:var(--bg-neutral-weak);font-size:12px;color:var(--fg-neutral-muted)} .wstats b{font-weight:var(--font-weight-bold);color:var(--fg-neutral)}
  /* 고른 기간을 글로 되돌려 준다 — 달력만 보고 셈하지 않게 */
  .wsum{display:flex;align-items:baseline;flex-wrap:wrap;gap:var(--dim-x2);margin-bottom:var(--dim-x2_5);font-size:var(--font-size-t3);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)}
  .wsum em{font-style:normal;font-size:12px;font-weight:var(--font-weight-regular);color:var(--fg-neutral-muted)}
  .wsum.empty{font-size:var(--font-size-t2);font-weight:var(--font-weight-regular);color:var(--fg-neutral-placeholder)}
  .wsec{font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold);margin:0 0 var(--dim-x2)} .wsec em{font-style:normal;font-weight:var(--font-weight-regular);font-size:12px;color:var(--fg-neutral-muted);margin-left:var(--dim-x1_5)}
  .wchips{display:flex;flex-wrap:wrap;gap:var(--dim-x1_5);margin-bottom:var(--dim-x4)}
  .wchip{height:30px;padding:0 var(--dim-x3_5);border-radius:var(--radius-full);border:1px solid var(--stroke-neutral-strong);background:var(--bg-layer-default);font:inherit;font-size:12px;font-weight:var(--font-weight-semibold);color:var(--fg-neutral-subtle);cursor:pointer;line-height:normal}
  .wchip:hover{border-color:var(--stroke-neutral-stronger);color:var(--fg-neutral)} .wchip.on{background:var(--bg-brand-solid);border-color:var(--stroke-brand);color:var(--fg-on-brand)}
  .wchip:disabled{background:var(--bg-neutral-weak);border-color:transparent;color:var(--fg-disabled);cursor:not-allowed}
  /* 월 달력 — 시작일을 누르고 종료일을 한 번 더 누르면 사이가 채워진다 */
  .wcal{border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);padding:var(--dim-x2_5) var(--dim-x3) var(--dim-x3);margin-bottom:var(--dim-x2_5)}
  .wmonth{display:flex;align-items:center;gap:var(--dim-x2);margin-bottom:var(--dim-x2)} .wmonth b{font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold)}
  .wmonth button{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:var(--radius-sm);border:1px solid var(--stroke-neutral-strong);background:var(--bg-layer-default);color:var(--fg-neutral-subtle);cursor:pointer} .wmonth button:hover{border-color:var(--stroke-neutral-stronger);color:var(--fg-neutral)} .wmonth button svg{width:14px;height:14px}
  .wgrid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}
  .wgrid__w{font-size:11px;color:var(--fg-neutral-muted);text-align:center;padding-bottom:var(--dim-x1_5)} .wgrid__w.we{color:var(--fg-neutral-placeholder)}
  .wday{position:relative;height:38px;display:flex;align-items:center;justify-content:center;padding:0;border:0;background:none;font:inherit;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral);cursor:pointer}
  .wday::before{content:'';position:absolute;top:3px;bottom:3px;left:0;right:0;background:var(--bg-neutral-weak);opacity:0}
  .wday > span{position:relative;z-index:1;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:var(--radius-full)}
  .wday:hover > span{background:var(--bg-neutral-hover)}
  .wday.blank{pointer-events:none}
  .wday.we{color:var(--fg-neutral-placeholder);pointer-events:none}
  .wday.past{color:var(--fg-disabled);pointer-events:none}
  .wday.today{color:var(--fg-accent)} .wday.today > span{box-shadow:inset 0 0 0 1px var(--stroke-accent)}
  .wday.in::before,.wday.start::before,.wday.end::before{opacity:1}
  .wday.start::before{left:50%} .wday.end::before{right:50%} .wday.start.end::before{opacity:0}
  .wday.start > span,.wday.end > span{background:var(--bg-brand-solid);color:var(--fg-on-brand);box-shadow:none}
  .wcal__note{margin:0 0 var(--dim-x4);font-size:12px;color:var(--fg-neutral-muted)}
  .wpanel__ft{display:flex;align-items:center;gap:var(--dim-x2);padding-top:var(--dim-x3_5);border-top:1px solid var(--stroke-neutral);font-size:12px;color:var(--fg-neutral-muted)}
  .wpanel__ft b{font-weight:var(--font-weight-bold);color:var(--fg-neutral)} .wpanel__ft .btn{margin-left:auto} .wpanel__ft .btn + .btn{margin-left:0}
  .wmsg{max-width:min(460px,80%);margin:0 0 var(--dim-x3_5) auto;padding:var(--dim-x2_5) var(--dim-x4);border-radius:var(--radius-lg) var(--radius-lg) var(--radius-xs) var(--radius-lg);background:var(--bg-neutral-weak);font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
`;

/* ── 달력 자료 — 2026년 9월(1일 = 화). home.html 도 이 함수를 그대로 쓴다 ── */
export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];
export const MONTH = { y: 2026, m: 9, last: 30, today: 9, lead: new Date(2026, 8, 1).getDay() };
export const dow = (d) => new Date(MONTH.y, MONTH.m - 1, d).getDay();
export const dayLabel = (d) => MONTH.m + '월 ' + d + '일(' + WEEKDAYS[dow(d)] + ')';
export const workdays = (a, b) => { let n = 0; for (let d = a; d <= b; d++) { const w = dow(d); if (w !== 0 && w !== 6) n++; } return n; };

// 요일 머리줄 + 앞 빈칸 + 날짜. a·b 를 주면 그 기간을 칠한 채로 낸다
export function monthCells(dayCls, headCls, a, b) {
  const out = WEEKDAYS.map((w, i) => '<span class="' + headCls + (i === 0 || i === 6 ? ' we' : '') + '">' + w + '</span>');
  for (let i = 0; i < MONTH.lead; i++) out.push('<span class="' + dayCls + ' blank"></span>');
  for (let d = 1; d <= MONTH.last; d++) {
    const w = dow(d), k = [];
    if (d < MONTH.today) k.push('past');
    else if (w === 0 || w === 6) k.push('we');
    if (d === MONTH.today) k.push('today');
    if (a != null && b != null) { if (d === a) k.push('start'); else if (d === b) k.push('end'); else if (d > a && d < b) k.push('in'); }
    out.push('<button class="' + dayCls + (k.length ? ' ' + k.join(' ') : '') + '" data-d="' + d + '" data-label="' + dayLabel(d) +
      '" aria-label="' + MONTH.m + '월 ' + d + '일 ' + WEEKDAYS[w] + '요일"><span>' + d + '</span></button>');
  }
  return out.join('');
}

const ico = (tone, n) => '<span class="qcard__ico ' + tone + '">' + icon(n) + '</span>';
const mini = (t, on) => '<button class="btn sm ' + (on ? 'brand-solid' : 'neutral-outline') + '">' + t + '</button>';
const WEEK = [['월', 7, 'past'], ['화', 8, 'past'], ['수', 9, 'today'], ['목', 10, ''], ['금', 11, 'has']];
const week = (sel) => '<div class="qweek"><div class="qweek__hd">이번주 9/7~9/11<b>잔여 12일</b></div><div class="qdays">' +
  WEEK.map(([w, d, k]) => '<button class="qday' + (k ? ' ' + k : '') + (sel === d ? ' on' : '') + '"><em>' + w + '</em><b>' + d + '</b></button>').join('') + '</div></div>';
const qhd = (sub) => '<div class="qpick__hd"><b>9월 10일(목)</b><span>' + sub + '</span><button class="qpick__x" aria-label="선택 지우기">' + icon('x') + '</button></div>';
// 고른 뒤의 세 단계 — 사유 고르기 → 직접 입력 → 신청 완료
const QPICK = {
  choose: '<div class="qpick">' + qhd('1일 · 잔여 11일') + '<div class="qcard__ft">' + mini('개인사유', true) + mini('직접입력') + '</div></div>',
  input: '<div class="qpick">' + qhd('사유 입력') + '<div class="qpick__in"><input type="text" placeholder="사유 입력" aria-label="연차 사유"><button class="btn sm brand-solid" disabled>신청</button></div></div>',
  done: '<div class="qpick">' + qhd('신청 완료') + '<div class="qpick__done">' + icon('circle-check-filled') + '<span>9월 10일(목) 연차를 신청했습니다 · 가족 행사</span></div></div>',
};

const card = (o) => '<div class="qcard' + (o.open ? ' open' : '') + '"><div class="qcard__body"><a class="qcard__hd" href="#">' +
  '<span class="qcard__top">' + ico(o.tone, o.icon) + (o.badge || '') + '</span>' +
  '<span class="qcard__t"><b>' + o.title + '</b><p>' + o.desc + '</p></span></a>' +
  '<div class="qcard__more"><div>' + (o.more || '') + '</div></div></div></div>';

// 연차 카드 — 달력 아래에 붙는 단계만 갈아 끼운다
const leaveFt = '<div class="qcard__ft">' + mini('기간으로 고르기') + mini('현황') + '</div>';
const leaveCard = (more) => ({ tone: 'info', icon: 'calendar', title: '연차', desc: '잔여 12일 · 날짜를 누르면 바로 신청', open: true, more });

const CARDS = [
  { tone: 'accent', icon: 'clock', title: '출퇴근 기록', desc: '이번주 현황 요약 · 버튼으로 기록', more: '<div class="qcard__ft">' + mini('출근') + mini('퇴근') + '</div>' },
  { tone: 'info', icon: 'calendar', title: '연차', desc: '잔여 12일 · 날짜를 누르면 바로 신청', more: week() + '<div class="qcard__ft">' + mini('기간으로 고르기') + mini('현황') + '</div>' },
  { tone: 'violet', icon: 'file-text', title: '전자결재', desc: '결재함에서 바로 승인·반려', badge: '<span class="badge danger">6건</span>', more: '<div class="qcounts"><span>대기 <b class="hot">6</b></span><span>내 상신 <b>50</b></span><span>반려 <b>2</b></span></div>' },
  { tone: 'warning', icon: 'pencil', title: '업무일지', desc: '연동 소스로 초안 자동 작성', badge: '<span class="badge">미작성</span>', more: '<div class="qcard__ft">' + mini('초안 만들기') + mini('오늘 일지') + '</div>' },
];
const grid = (cards) => '<div class="qgrid' + (cards.length === 1 ? ' one' : '') + '">' + cards.map(card).join('') + '</div>';

// 작업 패널 — 9월 10일(목)~14일(월) 을 고른 상태. 사이 주말 이틀은 일수에서 빠진다
const A = 10, B = 14, N = workdays(A, B);
const presets = ['오늘 하루', '내일 하루', '이번 주 남은 날'].map(t => '<button class="wchip">' + t + '</button>').join('');
const reasons = ['개인사유', '경조사', '병가', '직접입력'].map((t, i) => '<button class="wchip' + (i === 0 ? ' on' : '') + '">' + t + '</button>').join('');
const panel = `<div class="wpanel">
      <div class="wpanel__hd">${icon('clock')}<b>연차 신청</b><span>잔여 12일</span><button class="wpanel__x" aria-label="닫기">${icon('x')}</button></div>
      <div class="wstats"><span>총 <b>15</b></span><span>사용 <b>3</b></span><span>잔여 <b>12</b></span><span>소진율 <b>20%</b></span></div>
      <div class="wsum">${dayLabel(A)} – ${dayLabel(B)}<em>${N}일 · 주말 2일 제외</em></div>
      <div class="wchips">${presets}</div>
      <div class="wcal">
        <div class="wmonth"><button aria-label="이전 달">${icon('chevron-left')}</button><b>2026년 9월</b><button aria-label="다음 달">${icon('chevron-right')}</button></div>
        <div class="wgrid">${monthCells('wday', 'wgrid__w', A, B)}</div>
      </div>
      <p class="wcal__note">시작일을 누르고 종료일을 한 번 더 누르면 기간이 잡힙니다. 주말·공휴일은 일수에서 빠집니다.</p>
      <div class="wsec">사유</div>
      <div class="wchips">${reasons}</div>
      <div class="wpanel__ft"><span>신청 <b>${N}일</b> · 잔여 12일 → <b>${12 - N}일</b></span><button class="btn sm neutral-weak">지우기</button><button class="btn sm brand-solid">신청하기</button></div>
    </div>`;

export const pages = `
<section class="page" id="components/quick-card">
  <h1>Quick action card</h1>
  <p class="desc">홈에서 자주 하는 일을 한 줄로 세운 카드. <b>낮고 넓게</b> 네 개씩 놓이고, 조작(버튼·주간 달력·건수)은 <b>가리키면 펼쳐집니다</b>. 펼쳐져도 격자 칸 높이는 그대로여서 옆 카드가 밀리지 않습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${grid([{ ...CARDS[0], open: true }])}</div>
    <ol><li><b>Icon</b> — 30px 칩, 카테고리 틴트. 제목 <b>위</b> 줄에</li><li><b>Badge</b> (선택) — 같은 줄 <b>오른쪽 끝</b>. 건수·상태</li><li><b>Title</b> — t1 600, 한 줄. 넘치면 …</li><li><b>Description</b> — 12px muted, 한 줄</li><li><b>More</b> — 가리킬 때만 열리는 조작 영역. 카드 칸 밖으로 덮어 내려온다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Layout — 4열 격자</h3>
  <div class="demo tinted">${grid(CARDS)}</div>
  <p>칸 높이는 120px 로 고정이고 칸 사이 간격은 좌우·위아래 모두 8px 입니다. 폭은 본문 기준(container query)으로 4 → 3 → 2 → 1 열로 줄고, 화면 폭이 아니라 <b>본문 폭</b>을 보므로 컨텍스트 패널을 열고 접어도 어긋나지 않습니다.</p>
  <h3>More — 조작 종류</h3>
  <div class="demo tinted col" style="gap:var(--dim-x8)">
    <figure class="ex" style="width:264px">${grid([{ ...CARDS[0], open: true }])}<figcaption>버튼 — 바로 실행하는 두세 가지</figcaption></figure>
    <figure class="ex" style="width:264px">${grid([{ ...CARDS[2], open: true }])}<figcaption>건수 — 숫자를 먼저 보여 줄 때</figcaption></figure>
    <figure class="ex" style="width:264px">${grid([{ ...CARDS[1], open: true }])}<figcaption>주간 달력 — 잔여를 함께. 점은 이미 연차가 있는 날</figcaption></figure>
    <figure class="ex" style="width:264px">${grid([leaveCard(week(10) + QPICK.choose + leaveFt)])}<figcaption>고른 뒤 — 달력은 그대로, 아래에 결과가 붙는다</figcaption></figure>
    <figure class="ex" style="width:264px">${grid([leaveCard(week(10) + QPICK.input + leaveFt)])}<figcaption>직접입력 — 카드 안에서 사유를 받는다</figcaption></figure>
    <figure class="ex" style="width:264px">${grid([leaveCard(week(10) + QPICK.done + leaveFt)])}<figcaption>신청 완료 — 대화로 넘기지 않고 카드에서 끝난다</figcaption></figure>
  </div>
  <table><tr><th>조작</th><th>쓰임</th></tr><tr><td>버튼</td><td>출근·퇴근처럼 바로 실행. <a href="#components/button">Button</a> sm 을 그대로 쓴다(neutral-outline, 고른 것은 brand-solid). 두세 개까지</td></tr><tr><td>건수(qcounts)</td><td>대기·상신·반려처럼 숫자가 먼저 필요할 때</td></tr><tr><td>주간 달력(qweek)</td><td>이번주 안에서 날짜를 고를 때. 머리줄은 <b>잔여</b>를 오른쪽에 적고 <b>아래 선</b>으로 날짜와 나눈다. 날짜는 <b>테두리 있는 동그란 버튼</b>이라 누를 수 있다는 것이 보인다(Work panel 의 월 달력은 칸이 빽빽해 테두리 없이 원만 쓴다). 이미 연차가 있는 날은 <code>.has</code> 로 점선과 점을 찍어 누를 수 없게 한다. 이번주 밖은 작업 패널로</td></tr><tr><td>선택 뒤(qpick)</td><td>달력을 지우지 않고 그 <b>아래</b>에 가는 선으로 나눠 붙는다. 한 번 눌러 날짜를 바꿀 수 있다. 세 단계로 바뀐다 — <b>사유 고르기</b> → (직접입력이면) <b>사유 입력 + 신청</b> → <b>신청 완료</b>. 고른 동안은 <code>.open</code> 으로 열어 둔다</td></tr></table>
  <h3>State</h3>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>기본</td><td>120px, 선 <code>--stroke-neutral-strong</code> · 아래를 넉넉히 비워 둔다</td></tr><tr><td>hover</td><td>선 진하게 + <code>--shadow-3</code> + <code>z-index</code> · 여백은 사방 <code>--dim-x3_5</code> 로 <b>균등</b>해진다. 칸의 <b>약 1.4배</b>(192 → 269px)로 <b>오른쪽·아래</b>를 향해 커지고 More 가 열린다. 왼쪽 모서리는 제자리 — 한 줄의 <b>맨 오른쪽 칸만</b> 본문 밖으로 나가지 않도록 왼쪽·아래로 커진다</td></tr><tr><td>open</td><td>값을 고른 뒤 hover 가 끝나도 열어 둔다 — 고른 것이 사라지지 않게</td></tr><tr><td>접기(전체)</td><td>기본은 펼침(4열 격자). 「접기」는 <b>네 장씩 가로 슬라이드</b>로 바뀌고 양옆 화살표가 나온다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>제목은 한 줄에 들어가는 이름으로. 배지는 제목 옆에 붙여 설명 줄을 가리지 않게 합니다.</div>
    <div class="dont"><b>Don&#39;t</b>펼쳐지는 영역이 카드 칸을 밀지 않게 합니다 — 칸은 고정 높이, 펼침은 그 위에 덮습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>한 번에 끝낼 수 있는 일은 카드 안에서 끝냅니다 — 하루짜리 연차는 사유를 받아 신청까지, 기간이 필요하면 <a href="#components/work-panel">작업 패널</a>로 넘깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>가리켜야만 보이는 곳에 꼭 필요한 정보를 두지 않습니다 — 건수·상태는 접힌 상태에서도 보이게.</div>
  </div>
  <h2>Quick action card vs. List row</h2>
  <table><tr><th></th><th>Quick action card</th><th>List row</th></tr><tr><td>개수</td><td>4~9개 고정</td><td>많고 변함</td></tr><tr><td>조작</td><td>hover 에 펼쳐짐</td><td>행 안에 하나</td></tr><tr><td>자리</td><td>홈 상단 격자</td><td>패널·목록</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>칸 / 간격</td><td>120px · <code>--dim-x2</code>(좌우·위아래 같은 값) · 4열</td></tr><tr><td>상자</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 패딩 <code>--dim-x3 --dim-x3_5</code></td></tr><tr><td>아이콘 칩</td><td>30px · <code>--radius-sm</code> · <code>--bg-{tint}-weak</code> + <code>--fg-{tint}</code></td></tr><tr><td>제목 / 설명</td><td>t1 600(아이콘 아래) / 12px <code>--fg-neutral-muted</code> — 둘 다 한 줄 ellipsis</td></tr><tr><td>hover</td><td><code>--shadow-3</code> · <code>z-index:8</code> · More 는 <code>grid-template-rows 0fr → 1fr</code> <code>--duration-normal</code></td></tr><tr><td>선택 상태</td><td>버튼은 <code>brand-solid</code>, qday <code>.on</code> = <code>--bg-brand-solid</code> + <code>--fg-on-brand</code>(검정 채움)</td></tr><tr><td>접근성</td><td>머리는 <code>&lt;a&gt;</code>, 조작은 <code>&lt;button&gt;</code>. hover 로만 열리므로 키보드는 포커스에도 열리게(<code>:focus-within</code>)</td></tr></table>
</section>

<section class="page" id="components/work-panel">
  <h1>Work panel</h1>
  <p class="desc">카드에서 다 담지 못하는 선택을 <b>대화 안에서</b> 이어 받는 패널. 사용자의 말풍선 아래에 붙고, 값을 다 고르면 아래쪽 한 버튼으로 상신합니다 — <a href="#components/dialog">실행 전 확인</a>과 같은 규칙입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo tinted" style="flex:1 1 100%;flex-direction:column;align-items:stretch"><div class="wmsg">연차 신청</div>${panel}</div>
    <ol><li><b>Message</b> — 무엇을 부탁했는지 한 줄. 오른쪽 정렬</li><li><b>Header / Stats</b> — 이름 + 잔여, 그리고 결정에 필요한 숫자를 알약으로</li><li><b>Summary</b> — 고른 기간을 <b>글로</b> 되돌려 준다. 달력만 보고 셈하지 않게</li><li><b>Preset</b> — 가장 흔한 기간 두세 개. 달력을 열지 않고 끝난다</li><li><b>Calendar</b> — 월 달력. 시작 → 끝 두 번 눌러 기간을 잡는다</li><li><b>Footer</b> — 신청 일수와 <b>남게 될 잔여</b> + 주요 버튼 하나</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>날짜 고르기 — 시작 → 끝</h3>
  <p>첫 번째 누름이 <b>시작</b>, 두 번째 누름이 <b>끝</b>입니다. 사이는 저절로 채워지고, 세 번째 누름은 다시 시작이 됩니다. 끝을 고르기 전에는 가리키는 날까지 미리 칠해 어디까지 잡히는지 보여 줍니다. 하루만 쓸 때는 <b>Preset</b> 이나 카드의 주간 달력으로 끝납니다.</p>
  <table><tr><th>칸</th><th>표현</th></tr><tr><td>기본</td><td>38px 칸 · 숫자는 32px 원 안에</td></tr><tr><td>오늘</td><td><code>--stroke-accent</code> 원 테두리 + <code>--fg-accent</code></td></tr><tr><td>시작 · 끝</td><td><code>--bg-brand-solid</code> 원 채움. 사이 띠는 원 가운데에서 시작해 이어진다</td></tr><tr><td>사이</td><td><code>--bg-neutral-weak</code> 띠. 칸 사이 간격이 0 이어야 띠가 끊기지 않는다</td></tr><tr><td>주말</td><td>기간에는 들어가지만 <b>시작·끝이 될 수 없다</b> — 흐리게 + <code>pointer-events:none</code>. 일수에서도 빠진다</td></tr><tr><td>지난 날</td><td><code>--fg-disabled</code> · 누를 수 없음</td></tr></table>
  <h3>고르는 것</h3>
  <table><tr><th>형태</th><th>쓰임</th></tr><tr><td>wsum</td><td>고른 기간 + 일수 + 빠진 주말. 아무것도 안 골랐으면 <code>.empty</code> 로 「날짜를 고르세요」</td></tr><tr><td>wchip</td><td>Preset·사유처럼 값이 몇 개 안 될 때. 선택은 검정 채움</td></tr><tr><td>wday</td><td>월 달력 한 칸. 위 표</td></tr><tr><td>wstats</td><td>총·사용·잔여·소진율 — 누르지 않는 읽기 값</td></tr></table>
  <h3>Footer</h3>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>덜 골랐을 때</td><td>무엇을 더 골라야 하는지 한 줄(「날짜를 고르세요」). 주요 버튼 없음</td></tr><tr><td>다 골랐을 때</td><td>「신청 3일 · 잔여 12일 → 9일」처럼 <b>남게 될 값</b>까지 + <code>brand-solid</code> 버튼 하나. 옆에 「지우기」</td></tr><tr><td>보낸 뒤</td><td>요약 자리에 결과 문구, 버튼은 사라짐. 되돌리기는 Toast 로</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>고른 기간을 글로 다시 적고, 신청 뒤 <b>남게 될 잔여</b>까지 보여 줍니다 — 셈은 화면이 합니다.</div>
    <div class="dont"><b>Don&#39;t</b>「연속 3일」처럼 일수만 고르게 하지 않습니다. 며칠이 아니라 <b>어느 날</b>이 결정입니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>패널 하나에 결정 하나. 연차 신청이면 기간·사유까지만 담습니다.</div>
    <div class="dont"><b>Don&#39;t</b>카드에서 이미 고른 값을 다시 묻지 않습니다 — 넘어올 때 채워 둡니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>고를 수 없는 값(주말·지난 날·잔여 없음)은 흐리게 두고 왜인지 달력 아래에 적습니다.</div>
    <div class="dont"><b>Don&#39;t</b>패널 안에 「취소」를 따로 두지 않습니다 — 닫기 ×, 되돌리기는 「지우기」, 상신은 버튼 하나.</div>
  </div>
  <h2>Work panel vs. Dialog</h2>
  <table><tr><th></th><th>Work panel</th><th>Dialog</th></tr><tr><td>자리</td><td>대화 흐름 안</td><td>화면 위에 떠서 멈춤</td></tr><tr><td>목적</td><td>값을 고른다</td><td>이미 정한 것을 확인한다</td></tr><tr><td>남는가</td><td>대화 기록에 남는다</td><td>닫으면 사라진다</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>패널</td><td><code>--stroke-neutral-strong</code> · <code>--radius-xl</code> · <code>--shadow-1</code> · 패딩 <code>--dim-x5 --dim-x6</code></td></tr><tr><td>말풍선</td><td><code>--bg-neutral-weak</code> · 오른쪽 정렬 · 최대 460px</td></tr><tr><td>요약(wsum)</td><td>t3 600 + 12px <code>--fg-neutral-muted</code> 보조</td></tr><tr><td>달력 상자</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 7열 <code>grid</code>, 간격 0</td></tr><tr><td>날짜 칸</td><td>38px 칸 · 32px 원 <code>--radius-full</code> · 오늘 <code>--stroke-accent</code> · 시작·끝 <code>--bg-brand-solid</code> · 사이 <code>--bg-neutral-weak</code></td></tr><tr><td>Footer</td><td>위 선 <code>--stroke-neutral</code> · 요약 12px muted · 버튼 sm <code>neutral-weak</code> + <code>brand-solid</code></td></tr><tr><td>접근성</td><td>날짜는 <code>&lt;button aria-label="9월 11일 금요일"&gt;</code>, 고른 값은 <code>aria-pressed</code>. 패널이 열리면 제목으로 포커스</td></tr></table>
</section>
`;

export const nav = [['components/quick-card', 'Quick action card'], ['components/work-panel', 'Work panel']];
