// 상태 표시: Callout · Progress(bar · circle · spinner) · Notification badge · Result section. 작성 규칙은 CONTRACT.md
import { icon } from './icons.mjs';

export const css = `
  /* ── Callout ── 페이지·폼·패널 안에 머무는 안내. 여섯 상태 어휘 + 페이지 배너 */
  .callout{display:flex;align-items:flex-start;gap:var(--dim-x2_5);width:100%;max-width:640px;padding:var(--dim-x3) var(--dim-x4);border-radius:var(--radius-md);background:var(--bg-neutral-weak);color:var(--fg-neutral);font-size:var(--font-size-t2);line-height:var(--line-height-t2);text-align:left}
  .callout>svg{width:16px;height:16px;margin-top:var(--dim-x0_5);color:var(--fg-neutral-subtle)}
  .callout__body{flex:1;min-width:0} .callout__title{display:block;font-weight:var(--font-weight-semibold)} .callout__text{display:block;color:var(--fg-neutral-subtle)} .callout__title+.callout__text{margin-top:var(--dim-x1)}
  .callout__actions{display:flex;flex-wrap:wrap;align-items:center;gap:var(--dim-x2);margin-top:var(--dim-x2_5)}
  .callout__link{font-weight:var(--font-weight-semibold);color:var(--fg-neutral);text-decoration:underline;text-underline-offset:2px;border-radius:var(--radius-xs)}
  .callout__link:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .callout__x{margin:calc(-1 * var(--dim-x1)) calc(-1 * var(--dim-x2)) calc(-1 * var(--dim-x1)) 0}
  .callout.info{background:var(--bg-info-weak)} .callout.info>svg{color:var(--fg-info)} .callout.success{background:var(--bg-positive-weak)} .callout.success>svg{color:var(--fg-positive)}
  .callout.warning{background:var(--bg-warning-weak)} .callout.warning>svg{color:var(--fg-warning)} .callout.danger{background:var(--bg-critical-weak)} .callout.danger>svg{color:var(--fg-critical)}
  .callout.sample{background:var(--bg-sample-weak)} .callout.sample>svg{color:var(--fg-sample)}
  .callout.banner{max-width:none;align-items:center;padding:var(--dim-x2) var(--dim-x4);border-radius:0} .callout.banner>svg{margin-top:0}
  .callout.banner .callout__title,.callout.banner .callout__text{display:inline} .callout.banner>.callout__actions{flex:none;margin:0} .callout.banner .callout__x{margin:calc(-1 * var(--dim-x1)) calc(-1 * var(--dim-x2))}
  /* ── Progress ── 막대(.prog) · 원(.pring) · 스피너(.spinner). 톤은 color 로 주고 막대·원은 currentColor 를 칠한다 */
  .prog{display:flex;flex-direction:column;gap:var(--dim-x1_5);width:100%;max-width:360px;color:var(--bg-brand-solid)}
  .prog__head{display:flex;justify-content:space-between;align-items:baseline;gap:var(--dim-x3);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-subtle)} .prog__head b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral);font-variant-numeric:tabular-nums}
  .prog__track{position:relative;height:var(--dim-x1_5);border-radius:var(--radius-full);background:var(--bg-neutral-weak);overflow:hidden}
  .prog__bar{display:block;height:100%;min-width:var(--dim-x1_5);border-radius:inherit;background:currentColor;transition:width var(--duration-normal) var(--easing)}
  .prog.sm .prog__track{height:var(--dim-x1)} .prog.lg .prog__track{height:var(--dim-x2)}
  .prog.indeterminate .prog__bar{width:40%;animation:prog-slide 1.4s var(--easing) infinite} @keyframes prog-slide{from{transform:translateX(-100%)}to{transform:translateX(250%)}}
  .pring{position:relative;display:inline-flex;align-items:center;justify-content:center;flex:none;width:48px;height:48px;line-height:1;color:var(--bg-brand-solid)}
  .pring__svg{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
  .pring__track,.pring__bar{fill:none;stroke-width:3} .pring__track{stroke:var(--bg-neutral-weak)} .pring__bar{stroke:currentColor;stroke-linecap:round;transition:stroke-dasharray var(--duration-normal) var(--easing)}
  .pring__val{font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold);color:var(--fg-neutral);font-variant-numeric:tabular-nums}
  .pring.sm{width:24px;height:24px} .pring.sm .pring__track,.pring.sm .pring__bar{stroke-width:4}
  .pring.indeterminate .pring__svg{transform:none;animation:spin .8s linear infinite}
  .prog.accent,.pring.accent{color:var(--bg-accent-solid)} .prog.positive,.pring.positive{color:var(--bg-positive-solid)} .prog.warning,.pring.warning{color:var(--bg-warning-solid)} .prog.critical,.pring.critical{color:var(--bg-critical-solid)}
  .spinner{display:inline-block;flex:none;width:20px;height:20px;border:var(--dim-x0_5) solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .8s linear infinite} /* .btn.loading .spin 과 같은 모양 */
  .spinner.sm{width:16px;height:16px} .spinner.lg{width:24px;height:24px}
  .spinner__label{display:inline-flex;align-items:center;gap:var(--dim-x2);font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral-muted)}
  @media (prefers-reduced-motion:reduce){.prog.indeterminate .prog__bar{animation:none;transform:none;margin-left:30%} .pring.indeterminate .pring__svg,.spinner{animation:none}}
  /* ── Notification badge ── 트리거 모서리의 점(비어 있으면) · 건수 알약. 링 = 놓인 바탕색 */
  .nbadge{display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:18px;height:18px;padding:0 var(--dim-x1);border-radius:var(--radius-full);background:var(--bg-critical-solid);color:var(--fg-on-critical);font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold);line-height:1;font-variant-numeric:tabular-nums;pointer-events:none}
  .nbadge:empty{width:8px;height:8px;min-width:0;padding:0}
  .nbadge.corner{position:absolute;top:calc(-1 * var(--dim-x1));left:calc(100% - 14px);box-shadow:0 0 0 2px var(--bg-layer-default)} .nbadge.corner:empty{top:var(--dim-x1);left:auto;right:var(--dim-x1)}
  :where(:has(> .nbadge.corner)){position:relative}
  .sbnav .nbadge.corner{box-shadow:0 0 0 2px var(--bg-layer-basement)} .sbnav.rail .sbnav__item .nbadge{display:inline-flex}
  /* ── Result section ── Empty state(.empty)의 레이아웃·크기를 그대로 입는다. 여기엔 결과 톤·요약·행동 줄만 */
  .result.positive i{background:var(--bg-positive-weak);color:var(--fg-positive)} /* warning · critical 은 .empty.warning / .empty.critical 그대로 */
  .result .dialog-sum{width:100%;max-width:320px;margin-top:var(--dim-x2);text-align:left} /* 설명(.empty p)과 같은 폭 */
  .result__actions{display:flex;flex-wrap:wrap;justify-content:center;gap:var(--dim-x2);margin-top:var(--dim-x3)} .result__actions .btn{margin-top:0}
  .result.compact .dialog-sum{margin-top:var(--dim-x1)} .result.compact .result__actions{margin-top:var(--dim-x2)}
`;

const ex = (inner, cap) => '<figure class="ex">' + inner + '<figcaption>' + cap + '</figcaption></figure>';
const btn = (label, cls) => '<button class="btn ' + (cls || 'sm neutral-outline') + '">' + label + '</button>';

// Callout — tone 별 아이콘은 16px filled(있는 이름만). sample 은 flask(「시연용」)
const CI = { info: 'info-circle-filled', success: 'circle-check-filled', warning: 'alert-triangle-filled', danger: 'alert-circle-filled', neutral: 'bulb-filled', sample: 'flask-filled' };
const callout = (tone, title, text, o = {}) => {
  const act = o.act ? '<div class="callout__actions">' + o.act + '</div>' : '';
  return '<div class="callout ' + tone + (o.banner ? ' banner' : '') + '"' + (o.role ? ' role="' + o.role + '"' : '') + '>' + icon(CI[tone]) +
    '<div class="callout__body">' + (title ? '<b class="callout__title">' + title + '</b>' : '') + (title && text && o.banner ? ' ' : '') + (text ? '<span class="callout__text">' + text + '</span>' : '') + (o.banner ? '' : act) + '</div>' +
    (o.banner ? act : '') + (o.x ? '<button class="iconbtn sm ghost callout__x" aria-label="안내 닫기">' + icon('x') + '</button>' : '') + '</div>';
};
const lrow = (tone, ic, title, meta, side, sideTone) => '<a class="lrow" href="#"><span class="lrow__ico ' + tone + '">' + icon(ic) + '</span><span class="lrow__main"><b>' + title + '</b><span class="lrow__meta">' + meta + '</span></span><span class="lrow__side ' + sideTone + '">' + side + '</span></a>';
const frame = (inner) => '<div class="card" style="width:100%;padding:0;overflow:hidden">' + inner + '</div>';

// Progress
const prog = (o) => {
  const max = o.max || 100, det = o.value != null;
  return '<div class="prog' + (o.cls ? ' ' + o.cls : '') + '"' + (o.style ? ' style="' + o.style + '"' : '') + ' role="progressbar" aria-label="' + o.label + '"' + (det ? ' aria-valuenow="' + o.value + '" aria-valuemin="0" aria-valuemax="' + max + '"' + (o.text ? ' aria-valuetext="' + o.text + '"' : '') : '') + '>' +
    (o.head === false ? '' : '<div class="prog__head"><span>' + o.label + '</span>' + (o.text ? '<b>' + o.text + '</b>' : '') + '</div>') +
    '<div class="prog__track"><span class="prog__bar"' + (det ? ' style="width:' + Math.round(o.value / max * 100) + '%"' : '') + '></span></div></div>';
};
const ring = (o) => {
  const det = o.value != null;
  return '<div class="pring' + (o.cls ? ' ' + o.cls : '') + '" role="progressbar" aria-label="' + o.label + '"' + (det ? ' aria-valuenow="' + o.value + '" aria-valuemin="0" aria-valuemax="100"' : '') + '>' +
    '<svg class="pring__svg" viewBox="0 0 36 36" aria-hidden="true"><circle class="pring__track" cx="18" cy="18" r="15.9155"/><circle class="pring__bar" cx="18" cy="18" r="15.9155" stroke-dasharray="' + (det ? o.value : 25) + ' 100"/></svg>' +
    (det && !(o.cls || '').includes('sm') ? '<span class="pring__val">' + o.value + '%</span>' : '') + '</div>';
};
const spinner = (size, text) => '<span class="spinner__label" role="status"><span class="spinner ' + size + '" aria-hidden="true"></span>' + text + '</span>';

// Notification badge
const bell = (label, badge, cls) => '<button class="iconbtn md ' + (cls || 'ghost') + '" aria-label="' + label + '">' + icon('bell') + (badge == null ? '' : '<span class="nbadge corner" aria-hidden="true">' + badge + '</span>') + '</button>';
const rail = '<div class="sbnav rail" style="height:auto;border-radius:var(--radius-md)"><div class="sbnav__body" style="padding:var(--dim-x2)">' +
  '<a class="sbnav__item on" href="#components/notification-badge" aria-label="에이전트">' + icon('sparkles') + '<span>에이전트</span></a>' +
  '<a class="sbnav__item" href="#components/notification-badge" aria-label="전자결재, 처리할 결재 6건">' + icon('file-text') + '<span>전자결재</span><span class="nbadge corner" aria-hidden="true"></span></a>' +
  '<a class="sbnav__item" href="#components/notification-badge" aria-label="근태">' + icon('clock') + '<span>근태</span></a></div></div>';

// Result section — Empty state 의 .empty 마크업 그대로(아이콘 i · h4 · p)에 요약(.dialog-sum)과 행동 줄만 더한다
const RI = { positive: 'circle-check', critical: 'circle-x', warning: 'hourglass' };
const result = (tone, title, desc, o = {}) => '<div class="empty result ' + tone + (o.compact ? ' compact' : '') + '" role="' + (tone === 'critical' ? 'alert' : 'status') + '"><i>' + icon(RI[tone]) + '</i><h4 tabindex="-1">' + title + '</h4>' +
  (desc ? '<p>' + desc + '</p>' : '') +
  (o.sum ? '<div class="dialog-sum">' + o.sum.map(([k, v]) => '<div><span>' + k + '</span><b>' + v + '</b></div>').join('') + '</div>' : '') +
  (o.act ? '<div class="result__actions">' + o.act + '</div>' : '') + '</div>';
const panel = (inner) => '<div style="background:var(--bg-layer-default);border-radius:var(--radius-md)">' + inner + '</div>';

export const pages = `
<section class="page" id="components/callout">
  <h1>Callout</h1>
  <p class="desc">페이지·폼·패널 안, 관련 내용 바로 위에 머무는 안내입니다. 지금 화면의 조건·상태(연동 끊김, 예시 데이터, 규칙)를 여섯 상태 어휘로 알리고, 필요하면 행동 하나를 붙입니다. 방금 한 행동의 결과는 Toast, 에이전트 소개는 Agent notice 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${callout('warning', '근태 시스템 연동이 끊겼습니다', '출퇴근 기록은 복구될 때까지 저장되지 않습니다. 연결 상태에서 원인을 확인해 주세요.', { act: btn('연결 상태 보기'), x: true })}</div>
    <ol><li><b>Container</b> — 상태 <code>weak</code> 배경, 라운드 md, 선 없음</li><li><b>Icon</b> — 16px filled, 같은 역할의 <code>fg</code></li><li><b>Title</b> (선택) — 결론 한 줄, t2 600</li><li><b>Body</b> (선택) — 이유·조건, t2 subtle, 두 줄 이내</li><li><b>Action</b> (선택) — sm outline 버튼 또는 링크 하나</li><li><b>Dismiss</b> (선택) — iconbtn sm ghost ×</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Tone — 상태 어휘</h3>
  <div class="demo col">
    ${ex(callout('info', '결재선은 인사 시스템 기준입니다', '팀장이 바뀌었다면 인사팀에 먼저 알려 주세요.'), 'info — 알아 둘 조건·규칙')}
    ${ex(callout('success', '근태 시스템과 연결되었습니다', '이제 출퇴근 기록이 바로 반영됩니다.'), 'success — 설정이 제대로 됐다는 확인(화면에 남아야 할 때)')}
    ${ex(callout('warning', '잔여 연차가 1일 남았습니다', '신청한 2일 중 1일은 무급 휴가로 처리됩니다.'), 'warning — 진행은 되지만 주의할 것')}
    ${ex(callout('danger', '사내 규정 연결이 끊겼습니다', '규정 검색 결과가 비어 보입니다. 관리자에게 문의해 주세요.'), 'danger — 막혀 있는 상태·실패')}
    ${ex(callout('neutral', '외근은 결재 없이 기록만 남깁니다', '출장비가 있으면 경비 신청을 따로 올려 주세요.'), 'neutral — 참고·팁')}
    ${ex(callout('sample', '예시 데이터입니다', '연동을 켜면 실제 근태·결재 수치로 바뀝니다.'), 'sample — 실데이터가 아닌 시연 값')}
  </div>
  <table><tr><th>Tone</th><th>배경 / 아이콘</th><th>아이콘</th><th>문구 예</th></tr><tr><td>info</td><td>info-weak / fg-info</td><td>info-circle</td><td>결재선은 인사 시스템 기준입니다</td></tr><tr><td>success</td><td>positive-weak / fg-positive</td><td>circle-check</td><td>근태 시스템과 연결되었습니다</td></tr><tr><td>warning</td><td>warning-weak / fg-warning</td><td>alert-triangle</td><td>잔여 연차가 1일 남았습니다</td></tr><tr><td>danger</td><td>critical-weak / fg-critical</td><td>alert-circle</td><td>사내 규정 연결이 끊겼습니다</td></tr><tr><td>neutral</td><td>neutral-weak / fg-neutral-subtle</td><td>bulb</td><td>외근은 결재 없이 기록만 남깁니다</td></tr><tr><td>sample</td><td>sample-weak / fg-sample</td><td>flask</td><td>예시 데이터입니다</td></tr></table>
  <h3>Content</h3>
  <div class="demo col">
    ${ex(callout('info', '회의실 예약은 2주 뒤까지만 됩니다'), '제목만 — 한 줄로 끝날 때')}
    ${ex(callout('neutral', '', '업무일지는 매일 18:00 에 연동 소스(SVN·일정·결재)로 초안을 만듭니다.'), '본문만 — 제목이 본문을 되풀이할 때는 뺍니다')}
    ${ex(callout('danger', '결재선을 불러오지 못했습니다', '인사 시스템이 응답하지 않습니다. 작성한 내용은 그대로 남아 있습니다.', { act: btn('다시 시도') }), '버튼 — 이 자리에서 풀 수 있는 행동 하나')}
    ${ex(callout('info', '지출결의 담당자가 바뀌었습니다', '박지웅 → 김서연. 문의는 새 담당자에게 보내 주세요.', { act: '<a class="callout__link" href="#components/callout">담당자 찾기</a>' }), '링크 — 다른 화면으로 가서 확인할 때')}
    ${ex(callout('success', '업무일지 자동 초안을 켰습니다', '내일부터 18:00 에 초안이 준비됩니다.', { x: true }), '닫기 — 한 번 읽으면 끝나는 안내만. 닫은 상태는 기억합니다')}
  </div>
  <h3>Variant — inline / page banner</h3>
  <div class="demo col">
    ${ex(callout('warning', '잔여 연차가 1일 남았습니다', '신청한 2일 중 1일은 무급 휴가로 처리됩니다.'), 'inline — 폼·섹션 안, 관련 내용 바로 위. 최대 640px')}
    ${ex(frame(callout('danger', '사내 규정 연결이 끊겼습니다', '관리자에게 문의해 주세요.', { banner: true, act: btn('연결 상태', 'xs neutral-outline') }) + '<div style="padding:var(--dim-x1)">' + lrow('info', 'book-filled', '연차·휴가 규정', '2026-03-02 개정 · 저장된 사본', '보기', '') + lrow('info', 'book-filled', '경비 처리 기준', '2025-11-20 개정 · 저장된 사본', '보기', '') + '</div>'), 'page banner (danger) — 화면·패널 맨 위 전체 폭 띠. 라운드 없이 가장자리에 붙고, 한 줄에 제목 · 본문 · 행동')}
    ${ex(frame(callout('sample', '예시 데이터입니다', '연동을 켜면 실제 결재 수치로 바뀝니다.', { banner: true }) + '<div style="padding:var(--dim-x1)">' + lrow('violet', 'file-text-filled', '(예시) 연차 신청의 건', '홍길동 · 09-08 11:43', '승인 대기', 'warning') + lrow('warning', 'receipt-filled', '(예시) 9월 지출결의', '홍길동 · 09-07 16:20', '반려', 'danger') + '</div>'), 'page banner (sample) — 화면 전체가 예시일 때. 행마다 배지를 붙이는 대신 띠 하나')}
  </div>
  <table><tr><th>Variant</th><th>자리</th><th>모양</th></tr><tr><td>inline</td><td>폼·섹션·패널 본문 안</td><td>라운드 md, 제목·본문 두 줄, 행동은 아래</td></tr><tr><td>page banner</td><td>화면·패널 머리 바로 아래, 스크롤해도 머리와 함께</td><td>라운드 0, 전체 폭, 한 줄 — 넘치면 본문만 줄바꿈. 행동은 오른쪽 xs</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${callout('danger', '결재선을 불러오지 못했습니다', '작성한 내용은 그대로 남아 있습니다.', { act: btn('다시 시도') })}</div>제목에 결론, 본문에 이유, 행동은 하나. 두 줄을 넘기지 않습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo col">${callout('info', '결재선은 인사 시스템 기준입니다')}${callout('warning', '잔여 연차가 1일 남았습니다')}</div>한 자리에 둘 이상 쌓지 않습니다 — 더 급한 하나만 남기거나 한 문장으로 합칩니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>danger 는 지금 막혀 있는 것(연동 끊김·불러오기 실패)에만. 풀리면 Callout 도 사라집니다.</div>
    <div class="dont"><b>Don&#39;t</b>필드 오류를 폼 위 Callout 으로 모으지 않습니다 — 오류는 그 필드 아래(<a href="#components/text-input">Text input</a>). 홍보·새 기능 소개에 상태색을 빌리지 않습니다.</div>
  </div>
  <h2>Callout vs. Agent notice vs. Toast vs. Dialog</h2>
  <table><tr><th style="width:80px"></th><th>Callout</th><th><a href="#components/agent-notice">Agent notice</a></th><th><a href="#components/toast">Toast</a></th><th><a href="#components/dialog">Dialog</a></th></tr>
    <tr><td>알리는 것</td><td>이 화면·섹션의 조건·상태</td><td>에이전트가 하는 일·에이전트 상태</td><td>방금 한 행동의 결과</td><td>실행 전 확인 질문</td></tr>
    <tr><td>자리</td><td>내용 흐름 안, 관련 내용 위 · 배너는 화면 머리</td><td>홈 상단 하나</td><td>떠서 하단 가운데</td><td>화면 가운데, 배경 차단</td></tr>
    <tr><td>수명</td><td>조건이 풀릴 때까지(닫기 선택)</td><td>머무름, 닫기 없음</td><td>4초(오류는 sticky)</td><td>답할 때까지</td></tr>
    <tr><td>색</td><td>여섯 상태 어휘</td><td>틸 틴트 · warning · sample</td><td>흰 면 + 상태색 아이콘</td><td>흰 면</td></tr>
    <tr><td>행동</td><td>버튼·링크 하나</td><td>없음</td><td>링크 하나</td><td>취소 + 주요 버튼</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Container</td><td><code>--bg-{tone}-weak</code>(neutral <code>--bg-neutral-weak</code>, sample <code>--bg-sample-weak</code>) · <code>--radius-md</code> · 패딩 <code>--dim-x3</code> <code>--dim-x4</code> · 최대 640px</td></tr><tr><td>Icon</td><td>16px filled · <code>--fg-{tone}</code> · 위 <code>--dim-x0_5</code> · 글자와 간격 <code>--dim-x2_5</code></td></tr><tr><td>Title / Body</td><td>t2 600 <code>--fg-neutral</code> / t2 <code>--fg-neutral-subtle</code> · 둘 다 있으면 사이 <code>--dim-x1</code>(배너는 한 줄이라 없음)</td></tr><tr><td>Action</td><td>Button sm neutral-outline 또는 링크 t2 600 밑줄 · 위 <code>--dim-x2_5</code></td></tr><tr><td>Dismiss</td><td>iconbtn sm ghost · x 16px</td></tr><tr><td>Page banner</td><td>라운드 0 · 패딩 <code>--dim-x2</code> <code>--dim-x4</code> · 가운데 정렬 · 행동 Button xs</td></tr><tr><td>접근성</td><td>처음부터 있는 Callout 은 역할 없이 읽힙니다. 나중에 나타나면 info·success·neutral·sample <code>role="status"</code>, warning·danger <code>role="alert"</code> · 아이콘 <code>aria-hidden</code>(뜻은 글자에) · 닫기 <code>&lt;button aria-label="안내 닫기"&gt;</code>, 닫은 뒤 포커스는 다음 요소로</td></tr></table>
</section>

<section class="page" id="components/progress">
  <h1>Progress</h1>
  <p class="desc">작업이 얼마나 진행됐는지(determinate) 또는 진행 중이라는 사실(indeterminate)을 보여 줍니다. 모양은 막대 · 원 · 스피너 셋이고, 막대가 기본입니다. 설정 「첨부」의 용량 막대(<a href="#components/settings-dialog">Settings dialog</a>)도 Progress bar md · neutral 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${prog({ label: '업무일지 초안 작성', value: 3, max: 5, text: '3 / 5단계' })}</div>
    <ol><li><b>Label</b> — 무엇이 진행 중인지, t1 subtle</li><li><b>Value</b> — 「3 / 5단계」「62%」, t1 600 tabular-nums. 오른쪽 끝</li><li><b>Track</b> — 전체 길이, <code>--bg-neutral-weak</code> 알약</li><li><b>Indicator</b> — 진행분, 톤 색. 최소 6px 라서 1% 도 보입니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Type</h3>
  <div class="demo" style="gap:var(--dim-x10)">
    ${ex(prog({ label: '첨부 올리는 중', value: 62, text: '62%', style: 'width:260px' }), 'bar — 기본. 폭이 있는 자리')}
    ${ex(ring({ label: '첨부 올리는 중', value: 62 }), 'circle — 좁은 정사각 자리')}
    ${ex(spinner('md', '불러오는 중'), 'spinner — 끝을 모르는 짧은 대기')}
  </div>
  <h3>Size</h3>
  <div class="demo col">
    ${ex(prog({ label: '이번 주 근무', value: 38, max: 40, text: '38 / 40시간', cls: 'sm' }), 'sm · 4px — 카드·행 안의 보조 지표')}
    ${ex(prog({ label: '파일 4개 · 6.9MB / 2.0GB', value: 1, head: true, cls: '' }), 'md · 6px — 기본. 설정 용량 막대')}
    ${ex(prog({ label: '경비 영수증 12장 가져오는 중', value: 7, max: 12, text: '7 / 12장', cls: 'lg' }), 'lg · 8px — 화면의 주인공인 긴 작업(가져오기·일괄 처리)')}
  </div>
  <div class="demo" style="gap:var(--dim-x8)">
    ${ex(ring({ label: '영수증.jpg 올리는 중', value: 40, cls: 'sm' }), 'circle 24 — 칩 안')}
    ${ex(ring({ label: '첨부 올리는 중', value: 62 }), 'circle 48')}
    ${ex('<span class="spinner sm" aria-hidden="true"></span>', 'spinner 16 — 버튼 안')}
    ${ex('<span class="spinner md" aria-hidden="true"></span>', 'spinner 20 — 글자 옆')}
    ${ex('<span class="spinner lg" aria-hidden="true"></span>', 'spinner 24 — 패널')}
  </div>
  <table><tr><th>종류</th><th>크기</th><th>토큰</th><th>쓰임</th></tr><tr><td rowspan="3">bar</td><td>sm 4px</td><td><code>--dim-x1</code></td><td>카드·행 안 보조 지표(근무 시간·연차 사용률)</td></tr><tr><td>md 6px</td><td><code>--dim-x1_5</code></td><td>기본 — 용량·업로드·단계</td></tr><tr><td>lg 8px</td><td><code>--dim-x2</code></td><td>화면의 주인공인 긴 작업</td></tr><tr><td>circle</td><td>24 · 48px</td><td>stroke 3(24 는 4) / viewBox 36</td><td>첨부 칩 · 패널 가운데</td></tr><tr><td>spinner</td><td>16 · 20 · 24px</td><td>선 <code>--dim-x0_5</code></td><td>버튼 · 글자 옆 · 패널 가운데</td></tr></table>
  <p>계획서의 3 / 4 / 6px 중 3px 은 4px 격자에 토큰이 없어 쓰지 않고, <b>4 · 6 · 8px</b>(<code>--dim-x1</code> · <code>--dim-x1_5</code> · <code>--dim-x2</code>) 세 단계로 맞췄습니다. 6px 은 설정 용량 막대와 같은 값입니다.</p>
  <h3>Tone</h3>
  <div class="demo col">
    ${ex(prog({ label: '첨부 올리는 중', value: 62, text: '62%' }), 'neutral (ink) — 기본')}
    ${ex(prog({ label: '에이전트 실행', value: 3, max: 5, text: '3 / 5단계', cls: 'accent' }), 'accent — 에이전트가 하는 일의 진행. 화면에 하나')}
    ${ex(prog({ label: '이번 주 근무', value: 40, max: 40, text: '40 / 40시간', cls: 'positive' }), 'positive — 목표를 채움')}
    ${ex(prog({ label: '첨부 용량', value: 88, text: '1.76GB / 2.0GB', cls: 'warning' }), 'warning — 한도에 가까움(80% 이상)')}
    ${ex(prog({ label: '첨부 용량', value: 100, text: '2.0GB / 2.0GB · 가득 참', cls: 'critical' }), 'critical — 한도 초과·실패')}
  </div>
  <table><tr><th>Tone</th><th>막대·원 색</th><th>언제</th></tr><tr><td>neutral</td><td style="white-space:nowrap"><code>--bg-brand-solid</code></td><td>기본. 값에 좋고 나쁨이 없을 때</td></tr><tr><td>accent</td><td style="white-space:nowrap"><code>--bg-accent-solid</code></td><td>에이전트 실행 단계(Run card) — 틸은 화면에 한 곳</td></tr><tr><td>positive / warning / critical</td><td style="white-space:nowrap"><code>--bg-{role}-solid</code></td><td>값이 기준을 넘을 때 톤이 바뀝니다 — 용량은 80% 에서 warning, 100% 에서 critical. 색만이 아니라 값 문구도 바꿉니다</td></tr></table>
  <h3>Determinate / indeterminate</h3>
  <div class="demo col">
    ${ex(prog({ label: '9월 지출결의 첨부 올리는 중', value: 62, text: '62%' }), 'bar determinate — 끝을 알 때. 값을 글자로 함께')}
    ${ex(prog({ label: '첨부에서 글자를 뽑는 중', cls: 'indeterminate' }), 'bar indeterminate — 끝을 모를 때. 40% 조각이 1.4초마다 지나갑니다')}
    ${ex('<span style="display:inline-flex;gap:var(--dim-x6)">' + ring({ label: '첨부 올리는 중', value: 62 }) + ring({ label: '결재함 불러오는 중', cls: 'indeterminate' }) + '</span>', 'circle determinate / indeterminate — 원 indeterminate 는 0.8초에 한 바퀴')}
    ${ex(spinner('sm', '결재함을 불러오는 중'), 'spinner + 문구 — 3초를 넘기면 무엇을 기다리는지 적습니다')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${prog({ label: '첨부 올리는 중', value: 2, max: 4, text: '2 / 4개', cls: 'accent' })}</div>값을 글자로 같이 둡니다. 틸·상태색 막대는 바탕 대비가 3:1 에 못 미칠 수 있어 막대만으로 뜻을 전하지 않습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${prog({ label: '첨부 올리는 중', value: 50, head: false, cls: 'accent' })}</div>라벨·값 없는 막대 하나. 무엇이 얼마나 남았는지 알 수 없습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>0.3초 안에 끝나면 아무것도 보이지 않습니다. 10초를 넘기면 determinate 막대 + 「취소」, 끝나면 Toast 또는 <a href="#components/result-section">Result section</a>.</div>
    <div class="dont"><b>Don&#39;t</b>한 화면에 스피너를 여럿 돌리지 않습니다 — 목록 전체가 처음 오는 중이면 Skeleton 하나로. 진행률을 모르면서 가짜 퍼센트를 올리지 않습니다.</div>
  </div>
  <h2>Skeleton vs. Spinner vs. Progress</h2>
  <table><tr><th style="width:64px"></th><th><a href="#components/skeleton">Skeleton</a></th><th>Spinner · circle indeterminate</th><th>Progress bar · circle</th></tr><tr><td>뜻</td><td>무엇이 올지(구조)</td><td>진행 중이라는 사실</td><td>얼마나 남았는지</td></tr><tr><td>언제</td><td>첫 진입, 목록·카드가 1–3초</td><td>버튼 안, 새로고침·더 불러오기(기존 내용 유지)</td><td>업로드·가져오기·에이전트 단계처럼 끝을 아는 작업, 10초 이상</td></tr><tr><td>문구</td><td>없음</td><td>3초가 넘으면 「불러오는 중」</td><td>라벨 + 값 항상</td></tr><tr><td>취소</td><td>없음</td><td>없음</td><td>10초가 넘으면 「취소」</td></tr></table>
  <p>Skeleton 페이지의 「Progress circle」은 여기의 Spinner(인라인·버튼)와 원형 indeterminate 를 가리킵니다.</p>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Track</td><td><code>--bg-neutral-weak</code> · <code>--radius-full</code> · 높이 sm <code>--dim-x1</code> / md <code>--dim-x1_5</code> / lg <code>--dim-x2</code></td></tr><tr><td>Indicator</td><td>neutral <code>--bg-brand-solid</code> · accent <code>--bg-accent-solid</code> · <code>--bg-positive/warning/critical-solid</code> · 최소 6px · 폭 전환 <code>--duration-normal</code> <code>--easing</code></td></tr><tr><td>Label / Value</td><td>t1 <code>--fg-neutral-subtle</code> / t1 600 <code>--fg-neutral</code> tabular-nums · 막대와 간격 <code>--dim-x1_5</code></td></tr><tr><td>Circle</td><td>SVG 원 r 15.9155(둘레 100) · <code>stroke-dasharray="값 100"</code> · 트랙 <code>--bg-neutral-weak</code> · 숫자 t1 600</td></tr><tr><td>Spinner</td><td><code>--dim-x0_5</code> 선 <code>currentColor</code>, 오른쪽만 비움 · 0.8초 한 바퀴(<code>@keyframes spin</code> — Button loading 과 같음)</td></tr><tr><td>접근성</td><td><code>role="progressbar"</code> + <code>aria-label</code> · determinate 는 <code>aria-valuenow/min/max</code>(단계면 <code>aria-valuetext="3 / 5단계"</code>), indeterminate 는 valuenow 없음 · 불러오는 영역에 <code>aria-busy="true"</code> · 스피너 문구는 <code>role="status"</code> · <code>prefers-reduced-motion</code> 이면 애니메이션 정지(막대는 가운데 조각으로 멈춤)</td></tr></table>
</section>

<section class="page" id="components/notification-badge">
  <h1>Notification badge</h1>
  <p class="desc">아이콘 버튼·아바타·탭·사이드바 항목의 모서리에 붙어 「처리할 새 것이 있다」를 알리는 빨간 점 또는 건수입니다. 눌리는 것은 배지가 아니라 그 트리거이고, 건수는 트리거의 이름(<code>aria-label</code>)에 함께 적습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${bell('알림, 읽지 않음 3개', '3', 'outline')}</div>
    <ol><li><b>Trigger</b> — 배지가 붙는 요소(여기선 iconbtn). 이름에 건수를 담습니다</li><li><b>Badge</b> — 18px 알약, <code>--bg-critical-solid</code> + 흰 글자 t1 600</li><li><b>Ring</b> — 2px, 놓인 바탕색. 아래 아이콘을 끊어 배지를 떼어 보이게 합니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Type</h3>
  <div class="demo" style="gap:var(--dim-x10)">
    ${ex(bell('알림, 새 알림 있음', ''), 'dot — 8px. 새 것이 있다는 사실만')}
    ${ex(bell('알림, 읽지 않음 3개', '3'), 'count — 1–99. 최소 18px 알약')}
    ${ex(bell('알림, 읽지 않음 128개', '99+'), 'overflow — 100 이상은 「99+」')}
  </div>
  <table><tr><th>Type</th><th>모양</th><th>언제</th></tr><tr><td>dot</td><td>8px 원 — 내용이 비어 있는 <code>.nbadge</code></td><td>수가 의미 없거나 셀 수 없을 때(새 대화·새 공지)</td></tr><tr><td>count</td><td>18px 알약, 좌우 <code>--dim-x1</code></td><td>처리할 건수(결재 대기·안 읽은 알림)</td></tr><tr><td>overflow</td><td>「99+」</td><td>100 이상 — 정확한 수는 열어서 봅니다</td></tr></table>
  <h3>Anchor</h3>
  <div class="demo" style="gap:var(--dim-x10);align-items:flex-start">
    ${ex(bell('알림, 읽지 않음 3개', '3', 'outline'), 'icon button — 상단 바 알림')}
    ${ex('<span class="avatar s40" role="img" aria-label="윤아린2, 새 메시지 2개">윤<span class="nbadge corner" aria-hidden="true">2</span></span>', 'avatar — 오른쪽 위')}
    ${ex('<div class="seg" role="tablist"><button class="seg__item on" role="tab" aria-selected="true" aria-label="대기, 처리할 결재 3건">대기<span class="nbadge" aria-hidden="true">3</span></button><button class="seg__item" role="tab">완료</button></div>', 'tab — 라벨 뒤 인라인, 링 없음')}
    ${ex(rail, 'sidebar rail — 점')}
  </div>
  <table><tr><th>Anchor</th><th>위치</th><th>규칙</th></tr><tr><td>icon button</td><td>corner — 알약은 아이콘 오른쪽 위에서 오른쪽으로 자람, 점은 아이콘 모서리</td><td>상단 바 알림 · 메시지</td></tr><tr><td>avatar</td><td>corner(오른쪽 위)</td><td>오른쪽 아래는 <a href="#components/avatar">상태 점</a> 자리 — 겹치지 않습니다</td></tr><tr><td>tab</td><td>라벨 뒤 인라인</td><td>Segmented · Tabs 의 처리할 건수. 전체 건수는 muted 숫자(<code>.n</code>)</td></tr><tr><td>sidebar item</td><td>펼침: muted 숫자(<a href="#components/sidebar-nav">Sidebar nav</a>) · 레일: corner 점</td><td>레일은 라벨이 사라지므로 점으로 알립니다. 링은 basement</td></tr></table>
  <h3>State — 건수</h3>
  <div class="demo" style="gap:var(--dim-x10)">
    ${ex(bell('알림', null), '0 — 그리지 않습니다(요소를 빼거나 <code>hidden</code>)')}
    ${ex(bell('알림, 읽지 않음 1개', '1'), '1–99 — 그대로')}
    ${ex(bell('알림, 읽지 않음 100개', '99+'), '100 이상 — 99+')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${bell('알림, 읽지 않음 3개', '3', 'outline')}<span class="avatar s40" role="img" aria-label="윤아린2, 새 메시지 2개">윤<span class="nbadge corner" aria-hidden="true">2</span></span></div>처리하면 줄어드는 수만 셉니다 — 결재 대기 · 안 읽은 알림.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><span class="avatar s40" role="img" aria-label="윤아린2">윤<span class="nbadge corner" aria-hidden="true" style="top:auto;left:auto;right:0;bottom:0"></span></span></div>아바타 오른쪽 아래에 빨간 점 — 상태 점(자리 비움)과 헷갈립니다. 전체 대화 124개처럼 줄지 않는 수도 배지로 세지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>트리거 이름에 수를 담습니다: <code>aria-label="알림, 읽지 않음 3개"</code>. 배지는 <code>aria-hidden</code>. 수가 바뀌면 이름도 바꿉니다.</div>
    <div class="dont"><b>Don&#39;t</b>한 트리거에 점과 숫자를 같이 두지 않습니다. 빨강은 처리할 것에만 — 새 기능 홍보에 쓰지 않습니다.</div>
  </div>
  <h2>Notification badge vs. Badge vs. Status dot</h2>
  <table><tr><th style="width:64px"></th><th>Notification badge</th><th><a href="#components/badge">Badge</a> (count 포함)</th><th><a href="#components/avatar">Avatar</a> status dot</th></tr><tr><td>뜻</td><td>처리할 새 것이 있다</td><td>상태 한 단어 · 목록 안 건수</td><td>그 사람이 지금 자리에 있는지</td></tr><tr><td>자리</td><td>트리거 모서리에 겹침(탭은 인라인)</td><td>글자 옆 인라인</td><td>아바타 오른쪽 아래</td></tr><tr><td>모양</td><td>점 8px · 알약 18px · 링 2px</td><td>알약 22·26px, 링 없음</td><td>점 8–10px · 링 2px</td></tr><tr><td>색</td><td><code>--bg-critical-solid</code> + 흰 글자, 한 가지</td><td>상태 weak 배경 + fg(여섯 어휘)</td><td>positive · warning · neutral solid</td></tr><tr><td>이름</td><td>트리거 <code>aria-label</code> 에 수</td><td><code>aria-label</code> 「처리 대기 6건」</td><td><code>title</code> 「자리에 있음」</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Count</td><td>높이 18 · 최소 폭 18 · 좌우 <code>--dim-x1</code> · <code>--radius-full</code> · <code>--bg-critical-solid</code> + <code>--fg-on-critical</code> · t1 600 tabular-nums</td></tr><tr><td>Dot</td><td>8px · 같은 색 · 내용이 비면 점(<code>:empty</code>)</td></tr><tr><td>Corner</td><td>알약: 위 <code>-4px</code>, 왼쪽 = 트리거 폭 - 14px(오른쪽으로 자람) · 점: 위·오른쪽 <code>--dim-x1</code> · 부모는 자동으로 <code>position:relative</code></td></tr><tr><td>Ring</td><td>2px <code>--bg-layer-default</code>(사이드바 안 <code>--bg-layer-basement</code>) — corner 일 때만</td></tr><tr><td>접근성</td><td>배지 <code>aria-hidden="true"</code> · 트리거 <code>aria-label</code> 에 건수 · 수가 실시간으로 늘면 트리거 밖 <code>role="status"</code> 영역에 「새 결재 1건」을 한 번 알림 · 포커스 받지 않음(<code>pointer-events:none</code>)</td></tr></table>
</section>

<section class="page" id="components/result-section">
  <h1>Result section</h1>
  <p class="desc">신청·상신처럼 여러 단계를 거친 행동이 끝났을 때 패널(또는 화면) 전체를 바꿔 결과를 보여 줍니다. <a href="#components/empty-state">Empty state</a> 의 레이아웃·크기를 그대로 쓰고, 아이콘 톤과 요약·행동 줄만 결과에 맞춰 바뀝니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${panel(result('positive', '연차 신청을 올렸습니다', '팀장 승인 뒤 인사팀에서 확정합니다.', { sum: [['문서', '연차 신청 · 9/15 (월) 1일'], ['결재선', '팀장 → 본부장']], act: btn('홈으로', 'md neutral-outline') + btn('결재 문서 보기', 'md brand-solid') }))}</div>
    <ol><li><b>Icon</b> — 48px 원, 결과 톤의 <code>weak</code> 배경 + 24px 아이콘</li><li><b>Title</b> — 무엇이 됐는지 사실로, t3 600</li><li><b>Description</b> (선택) — 다음에 일어날 일, t2 subtle, 320px 안</li><li><b>Summary</b> (선택) — 라벨·값 쌍. Dialog 요약 상자와 같은 모양</li><li><b>Actions</b> — 보조(outline) + 주요(solid) 둘까지, 주요가 오른쪽</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Tone</h3>
  <div class="demo" style="display:grid;grid-template-columns:1fr 1fr;align-items:start">
    ${ex(panel(result('positive', '연차 신청을 올렸습니다', '결재선: 팀장 → 본부장', { act: btn('홈으로', 'md neutral-outline') + btn('결재 문서 보기', 'md brand-solid') })), 'positive — circle-check. 됐다')}
    ${ex(panel(result('critical', '상신하지 못했습니다', '전자결재 서버가 응답하지 않습니다. 작성한 내용은 그대로 남아 있습니다.', { act: btn('다시 시도', 'md brand-solid') })), 'critical — circle-x. 원인 + 입력 보존 + 다시 시도')}
    ${ex(panel(result('warning', '결재 대기 중입니다', '팀장 승인을 기다리고 있습니다. 승인되면 알림으로 알려 드립니다.', { act: btn('결재 문서 보기', 'md neutral-outline') })), 'warning — hourglass. 올렸지만 아직 끝나지 않았다')}
  </div>
  <table><tr><th>Tone</th><th>아이콘 · 색</th><th>제목 예</th><th>버튼</th></tr><tr><td>positive</td><td>circle-check · positive</td><td>연차 신청을 올렸습니다</td><td>홈으로 · <b>결재 문서 보기</b></td></tr><tr><td>critical</td><td>circle-x · critical</td><td>상신하지 못했습니다</td><td><b>다시 시도</b></td></tr><tr><td>warning</td><td>hourglass · warning</td><td>결재 대기 중입니다</td><td>결재 문서 보기</td></tr></table>
  <h3>Size</h3>
  <div class="demo">
    ${ex('<div class="card" style="width:300px;padding:0">' + result('positive', '연차 신청을 올렸습니다', '결재선: 팀장 → 본부장', { act: btn('결재 문서 보기', 'md brand-solid') }) + '</div>', 'default — 패널·화면 전체를 대신할 때')}
    ${ex('<div class="card" style="width:300px;padding:0">' + result('critical', '상신하지 못했습니다', '', { compact: true, act: btn('다시 시도', 'sm neutral-outline') }) + '</div>', 'compact — 카드·패널 안. Empty state 와 같은 이름')}
  </div>
  <table><tr><th>크기</th><th>아이콘</th><th>제목</th><th>쓰임</th></tr><tr><td>default</td><td>48px</td><td>t3</td><td>폼이 있던 패널·화면을 대신할 때. 패널 머리(제목·×)는 남깁니다</td></tr><tr><td>compact</td><td>32px</td><td>t3</td><td>카드·패널 안(빠른 실행 카드 한 칸의 결과)</td></tr></table>
  <p>요약에는 에이전트가 실제로 올린 값만 담습니다(문서 · 날짜 · 결재선). 넷을 넘기면 「결재 문서 보기」로 보냅니다. 모바일에서는 버튼을 fill 로 아래에 쌓고 주요를 위에 둡니다.</p>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${result('positive', '연차 신청을 올렸습니다', '결재선: 팀장 → 본부장', { compact: true, act: btn('홈으로', 'sm neutral-outline') + btn('결재 문서 보기', 'sm brand-solid') })}</div>제목은 무엇이 됐는지 과거형 사실로. 다음 행동은 둘까지, 주요 하나.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${result('positive', '완료!', '', { compact: true, act: btn('확인', 'sm brand-solid') + btn('홈', 'sm brand-solid') + btn('결재함', 'sm brand-solid') })}</div>「완료!」「성공」처럼 무엇이 끝났는지 모르는 제목, solid 버튼 여럿.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>실패면 원인 한 줄 + 입력이 남아 있다는 사실 + 「다시 시도」. 결과가 나타나면 포커스를 제목으로 옮깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>한 번 누르는 행동(출근 기록·복사)에 Result section 을 쓰지 않습니다 — Toast. 실패를 Toast 로만 알리고 폼을 닫아 입력을 날리지 않습니다.</div>
  </div>
  <h2>Result section vs. Empty state vs. Toast</h2>
  <table><tr><th style="width:64px"></th><th>Result section</th><th><a href="#components/empty-state">Empty state</a></th><th><a href="#components/toast">Toast</a></th></tr><tr><td>뜻</td><td>내가 한 행동의 결과 — 됐다 · 못 했다 · 기다리는 중</td><td>빈 목록 안내 — 불러왔는데 보여 줄 내용이 없다</td><td>한 번 누른 행동의 결과</td></tr><tr><td>계기</td><td>여러 단계를 거친 신청·상신이 끝났을 때</td><td>화면에 들어왔는데 데이터가 0건일 때</td><td>한 번에 끝나는 행동(출근 기록·복사) 직후</td></tr><tr><td>모양</td><td colspan="2" style="text-align:center">같은 레이아웃(<code>.empty</code>) — 아이콘 48(compact 32) · 제목 t3. 아이콘 톤만 다릅니다</td><td>떠 있는 한 줄</td></tr><tr><td>수명</td><td>사용자가 떠날 때까지</td><td>내용이 생길 때까지</td><td>4초</td></tr><tr><td>행동</td><td>보조 + 주요 버튼</td><td>CTA 하나</td><td>링크 하나</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Container</td><td>Empty state 와 같음 — 세로 가운데 · 패딩 <code>--dim-x10</code> <code>--dim-x6</code>(compact <code>--dim-x5</code> <code>--dim-x4</code>) · 간격 <code>--dim-x1_5</code></td></tr><tr><td>Icon</td><td>48px 원(compact 32) · 아이콘 24 outline · <code>--bg-{tone}-weak</code> + <code>--fg-{tone}</code></td></tr><tr><td>Title</td><td>t3 600 <code>--fg-neutral</code></td></tr><tr><td>Description</td><td>t2 <code>--fg-neutral-subtle</code> · 최대 320px</td></tr><tr><td>Summary</td><td><code>.dialog-sum</code> — <code>--bg-layer-basement</code> · <code>--radius-md</code> · 위 <code>--dim-x2</code></td></tr><tr><td>Actions</td><td>Button md(compact sm) · 간격 <code>--dim-x2</code> · 위 <code>--dim-x3</code></td></tr><tr><td>접근성</td><td>컨테이너 <code>role="status"</code>(critical 은 <code>role="alert"</code>) · 나타나면 제목(<code>tabindex="-1"</code>)으로 포커스 · 제목은 패널 수준에 맞는 h2–h4 · 아이콘 <code>aria-hidden</code></td></tr></table>
</section>
`;

export const nav = [['components/callout', 'Callout'], ['components/progress', 'Progress'], ['components/notification-badge', 'Notification badge'], ['components/result-section', 'Result section']];
export const tint = ['result-section'];
