// 콘텐츠·목록: List row · Segmented control · Avatar
import { icon } from './icons.mjs';
const ICO = { clock: icon('clock'), doc: icon('file-text'), pen: icon('pencil'), chev: icon('chevron-right'), more: icon('dots') };

export const css = `
  /* ── List row ── home.html 의 .appr/.row: 구분선 없이 hover 배경(라운드)으로 행을 구분한다 */
  .lrow{display:flex;align-items:center;gap:var(--dim-x3);padding:var(--dim-x2_5) var(--dim-x3);border-radius:var(--radius-sm);background:var(--bg-layer-default);color:var(--fg-neutral);text-decoration:none;font-size:var(--font-size-t2);line-height:var(--line-height-t2);cursor:pointer;transition:background var(--duration-fast) var(--easing)}
  .lrow:hover{background:var(--bg-neutral-hover)} .lrow.selected{background:var(--bg-neutral-selected);font-weight:var(--font-weight-semibold)}
  .lrow:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .lrow.compact{padding:var(--dim-x1_5) var(--dim-x3);font-size:12px;line-height:16px} /* 12px: 대화 목록·사이드바 전용, 시스템 하한(13) 예외 */
  .lrow__ico{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:var(--radius-xs);flex:none;background:var(--bg-neutral-weak);color:var(--fg-neutral-subtle)} .lrow__ico svg{width:14px;height:14px}
  .lrow__ico.accent{background:var(--bg-accent-weak);color:var(--fg-accent)} .lrow__ico.info{background:var(--bg-info-weak);color:var(--fg-info)} .lrow__ico.violet{background:var(--bg-violet-weak);color:var(--fg-violet)}
  .lrow__ico.warning{background:var(--bg-warning-weak);color:var(--fg-warning)} .lrow__ico.positive{background:var(--bg-positive-weak);color:var(--fg-positive)}
  .lrow__main{flex:1;min-width:0} .lrow__main b{display:block;font-weight:var(--font-weight-semibold);white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .lrow__meta{font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  .lrow__side{flex:none;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums} .lrow__side.warning,.lrow__side.danger,.lrow__side.success{font-size:12px;font-weight:var(--font-weight-semibold)} /* 상태 글자: 12px 600 — 하한(13) 예외 */
  .lrow__side.warning{color:var(--fg-warning)} .lrow__side.danger{color:var(--fg-critical)} .lrow__side.success{color:var(--fg-positive)}
  .lrow__go{display:inline-flex;color:var(--fg-neutral-muted);flex:none} .lrow__go svg{width:16px;height:16px}
  .lrows{width:100%;max-width:520px;padding:var(--dim-x1);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default)}
  .lrows.divided{padding:0;overflow:hidden} .lrows.divided .lrow{border-radius:0;border-bottom:1px solid var(--stroke-neutral)} .lrows.divided .lrow:last-child{border-bottom:0}
  /* ── Segmented control ── */
  .seg{display:inline-flex;padding:3px;border-radius:var(--radius-full);background:var(--bg-neutral-weak);gap:2px}
  .seg__item{display:inline-flex;align-items:center;gap:var(--dim-x1_5);line-height:normal;height:26px;padding:0 var(--dim-x3);border-radius:var(--radius-full);border:0;background:transparent;font:inherit;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-subtle);cursor:pointer;white-space:nowrap}
  .seg__item .n{color:var(--fg-neutral-muted);font-weight:var(--font-weight-regular);font-variant-numeric:tabular-nums}
  .seg__item:hover{color:var(--fg-neutral)} .seg__item.on{background:var(--bg-layer-default);color:var(--fg-neutral);font-weight:var(--font-weight-semibold);box-shadow:var(--shadow-1)}
  .seg__item:focus-visible{outline:none;box-shadow:0 0 0 2px var(--stroke-focus)} .seg__item:disabled{color:var(--fg-disabled);cursor:not-allowed}
  .seg.md .seg__item{height:32px;padding:0 var(--dim-x4);font-size:var(--font-size-t2)}
  /* ── Avatar ── */
  .avatar{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;background:var(--bg-neutral-weak);color:var(--fg-neutral);font-weight:var(--font-weight-semibold);flex:none;position:relative;line-height:normal}
  .avatar.s24{width:24px;height:24px;font-size:var(--font-size-t1)} .avatar.s28{width:28px;height:28px;font-size:var(--font-size-t1)} .avatar.s32{width:32px;height:32px;font-size:var(--font-size-t1)} .avatar.s40{width:40px;height:40px;font-size:var(--font-size-t3)} .avatar.s48{width:48px;height:48px;font-size:var(--font-size-t5)}
  .avatar.accent{background:var(--bg-accent-weak);color:var(--fg-accent)}
  .avatar .dot{position:absolute;right:0;bottom:0;width:8px;height:8px;border-radius:50%;background:var(--bg-positive-solid);box-shadow:0 0 0 2px var(--bg-layer-default)} .avatar.s32 .dot{width:10px;height:10px} .avatar.s40 .dot{width:10px;height:10px;right:1px;bottom:1px} .avatar.s48 .dot{width:10px;height:10px;right:3px;bottom:3px} .avatar .dot.away{background:var(--bg-warning-solid)} .avatar .dot.off{background:var(--stroke-neutral-stronger)}
  .avatar-lockup{display:inline-flex;align-items:center;gap:var(--dim-x2_5)} .avatar-lockup b{display:block;font-size:var(--font-size-t2);font-weight:var(--font-weight-semibold)} .avatar-lockup small{display:block;font-size:var(--font-size-t1);color:var(--fg-neutral-muted)} .avatar-lockup small em{font-style:normal;color:var(--fg-accent);font-weight:var(--font-weight-semibold)}
  .avatar-lockup.lg{gap:var(--dim-x3)} .avatar-lockup.lg b{font-size:var(--font-size-t4)} .avatar-lockup.lg small{font-size:var(--font-size-t2)}
  .avatar-group{display:inline-flex} .avatar-group .avatar{box-shadow:0 0 0 2px var(--bg-layer-default);margin-left:-8px} .avatar-group .avatar:first-child{margin-left:0}
`;

const ico = (tone, icon) => '<span class="lrow__ico ' + tone + '">' + icon + '</span>';
const go = '<span class="lrow__go">' + ICO.chev + '</span>';
const rows = (cls, inner) => '<div class="lrows' + (cls ? ' ' + cls : '') + '">' + inner + '</div>';
const row = (o) => '<a class="lrow' + (o.cls ? ' ' + o.cls : '') + '" href="#"' + (o.style ? ' style="' + o.style + '"' : '') + '>' + (o.lead || '') + '<span class="lrow__main">' + (o.title ? '<b>' + o.title + '</b>' : '') + (o.text || '') + (o.meta ? '<span class="lrow__meta">' + o.meta + '</span>' : '') + '</span>' + (o.side ? '<span class="lrow__side' + (o.tone ? ' ' + o.tone : '') + '">' + o.side + '</span>' : '') + (o.trail || '') + '</a>';

export const pages = `
<section class="page" id="components/list-row">
  <h1>List row</h1>
  <p class="desc">목록의 한 줄. 왼쪽 슬롯(아이콘·아바타) · 본문(한 줄 또는 두 줄) · 오른쪽 슬롯(상태·시간·화살표·버튼)의 조합이고, home.html 처럼 <b>행 사이 구분선 없이</b> hover 배경으로 행을 나눕니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${rows('', row({ lead: ico('violet', ICO.doc), title: '(AI_AGENT) 연차 신청의 건', meta: '윤아린2 · 2026-09-08 14:48', side: '승인 대기', tone: 'warning' }))}</div>
    <ol><li><b>Leading</b> (선택) — 24px 아이콘 칩 또는 아바타</li><li><b>Main</b> — 제목 t2 600 (+ 메타 t1 muted). 넘치면 …</li><li><b>Side</b> (선택) — 상태 글자(12px 600) · 시간·건수(t1)</li><li><b>Container</b> — 40px, 라운드 sm, hover 시 <code>--bg-neutral-hover</code></li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Lines — 한 줄 / 두 줄</h3>
  <div class="demo col">
    <figure class="ex">${rows('', row({ text: '결재 6건이 내 처리를 기다립니다' }))}<figcaption>한 줄 — 본문 t2</figcaption></figure>
    <figure class="ex">${rows('', row({ title: '(AI_AGENT) 연차 신청의 건', meta: '윤아린2 · 2026-09-08 14:48' }))}<figcaption>두 줄 — 제목 t2 600 + 메타 t1 muted</figcaption></figure>
  </div>
  <table><tr><th>형태</th><th>구성</th><th>쓰임</th></tr><tr><td>한 줄</td><td>본문 t2</td><td>브리핑 · 메뉴 · 설정 항목</td></tr><tr><td>두 줄</td><td>제목 t2 600 + 메타 t1 muted</td><td>결재·요청·문서처럼 누가·언제가 필요한 것</td></tr></table>
  <h3>Leading — 없음 / 아이콘 / 아바타</h3>
  <div class="demo col">
    <figure class="ex">${rows('', row({ text: '잔여 연차 0일' }))}<figcaption>없음</figcaption></figure>
    <figure class="ex">${rows('', row({ lead: ico('accent', ICO.clock), text: '오늘 업무일지가 아직 비어 있습니다' }))}<figcaption>아이콘 칩 24px — 카테고리 틴트</figcaption></figure>
    <figure class="ex">${rows('', row({ lead: '<span class="avatar s24">윤</span>', text: '윤아린2 — 디자인1팀1 · 부장' }))}<figcaption>아바타 24px — 사람</figcaption></figure>
  </div>
  <h3>Trailing — 상태 / 시간·건수 / 화살표 / 버튼</h3>
  <div class="demo col">
    <figure class="ex">${rows('', row({ title: '(AI_AGENT) 연차 신청의 건', meta: '윤아린2 · 2026-09-08 14:48', side: '승인 대기', tone: 'warning' }))}<figcaption>상태 글자 — 상태 어휘 색</figcaption></figure>
    <figure class="ex">${rows('', row({ text: '이번 주 출퇴근 현황 요약', side: '13:07' }))}<figcaption>시간·건수 — t1 muted, tabular-nums</figcaption></figure>
    <figure class="ex">${rows('', row({ lead: ico('violet', ICO.doc), text: '결재 6건이 내 처리를 기다립니다', trail: go }))}<figcaption>화살표 — 행 전체가 상세로 이동</figcaption></figure>
    <figure class="ex">${rows('', row({ text: '근태 시스템 연동', trail: '<button class="iconbtn sm ghost" aria-label="더보기">' + ICO.more + '</button>' }))}<figcaption>버튼 — 행 안의 보조 행동 하나</figcaption></figure>
  </div>
  <table><tr><th>Trailing</th><th>뜻</th><th>규칙</th></tr><tr><td>상태 글자</td><td>승인 대기 · 반려 · 승인 완료</td><td>상태 어휘 색, 12px 600. 배지 대신 글자 — 행 안에서는 글자가 조용합니다</td></tr><tr><td>시간·건수</td><td>13:07 · 6건</td><td>t1 muted, <code>tabular-nums</code></td></tr><tr><td>화살표</td><td>누르면 상세로</td><td>행 전체가 링크일 때만</td></tr><tr><td>버튼</td><td>더보기·삭제</td><td>iconbtn sm ghost 하나. 둘 이상이면 「더보기」 메뉴</td></tr></table>
  <h3>Density — 기본 / compact</h3>
  <div class="demo col">
    <figure class="ex">${rows('', row({ text: '연차 잔여 현황 및 사용 내역 확인', side: '13:07' }))}<figcaption>기본 — 40px · t2</figcaption></figure>
    <figure class="ex">${rows('', row({ text: '연차 잔여 현황 및 사용 내역 확인', cls: 'compact', side: '13:07' }))}<figcaption>compact — 32px · 12px. 사이드바 대화 목록 전용</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo col">
    <figure class="ex">${rows('', row({ text: '출근 기록 #3', side: '13:06' }))}<figcaption>기본</figcaption></figure>
    <figure class="ex">${rows('', row({ text: '출근 기록 #3', side: '13:06', style: 'background:var(--bg-neutral-hover)' }))}<figcaption>hover — <code>--bg-neutral-hover</code></figcaption></figure>
    <figure class="ex">${rows('', row({ text: '출근 기록 #3', side: '13:06', cls: 'selected' }))}<figcaption>selected — <code>--bg-neutral-selected</code> + 600</figcaption></figure>
  </div>
  <h3>Divided — 구분선 있는 목록</h3>
  <div class="demo col">
    <figure class="ex">${rows('divided', row({ lead: ico('violet', ICO.doc), title: '(AI_AGENT) 연차 신청의 건', meta: '박지웅(기업부설연구소) · 09-08 11:43', side: '승인 대기', tone: 'warning' }) + row({ lead: ico('warning', ICO.pen), title: '(AI_AGENT) 구매/지출결의서 제출의 건', meta: '윤아린2 · 09-08 10:30', side: '반려', tone: 'danger' }) + row({ lead: ico('positive', ICO.doc), title: '9월 외근 신청', meta: '윤아린2 · 09-07 16:20', side: '승인 완료', tone: 'success' }))}<figcaption>divided — 두 줄 행이 길게 이어질 때만. 선은 <code>--stroke-neutral</code></figcaption></figure>
  </div>
  <table><tr><th>구분</th><th>언제</th></tr><tr><td>기본(구분선 없음)</td><td>홈·사이드바·패널. 행이 짧고 hover 로 충분할 때 — home.html 기본</td></tr><tr><td>divided</td><td>두 줄 행이 여덟 개 이상 이어져 경계가 필요할 때(결재함 전체 목록)</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>상태는 오른쪽에 글자로(승인 대기 · 반려). 어휘 색은 상태 어휘 표 그대로.</div>
    <div class="dont"><b>Don&#39;t</b>행 안에 버튼을 둘 이상 두지 않습니다 — 승인/반려 쌍이 필요하면 상세로 가거나 확인 Dialog.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>긴 제목은 한 줄에서 자릅니다(…). 전체는 상세나 툴팁.</div>
    <div class="dont"><b>Don&#39;t</b>행 사이에 강한 선·그림자를 넣지 않습니다. 필요하면 divided 의 옅은 선 하나.</div>
  </div>
  <h2>List row vs. Table row</h2>
  <table><tr><th></th><th>List row</th><th>Table row</th></tr><tr><td>열</td><td>2~3 슬롯</td><td>4열 이상, 정렬</td></tr><tr><td>정렬·비교</td><td>없음</td><td>있음</td></tr><tr><td>쓰임</td><td>직원 앱 전반</td><td>관리자 콘솔</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>높이 / 패딩 / 라운드</td><td>40px · <code>--dim-x2_5 --dim-x3</code> · <code>--radius-sm</code> (compact 32px · 12px)</td></tr><tr><td>hover / selected</td><td><code>--bg-neutral-hover</code> / <code>--bg-neutral-selected</code> + 600</td></tr><tr><td>메타 / 시간</td><td>t1 <code>--fg-neutral-muted</code></td></tr><tr><td>상태 글자</td><td>12px 600 · <code>--fg-warning</code> · <code>--fg-critical</code> · <code>--fg-positive</code></td></tr><tr><td>아이콘 칩</td><td>24px · <code>--radius-xs</code> · <code>--bg-{tint}-weak</code> + <code>--fg-{tint}</code></td></tr><tr><td>divided 선</td><td><code>--stroke-neutral</code></td></tr><tr><td>접근성</td><td>행은 <code>&lt;a&gt;</code> 또는 <code>&lt;button&gt;</code>, 목록은 <code>&lt;ul&gt;</code>. 포커스는 안쪽 2px 링</td></tr></table>
</section>

<section class="page" id="components/segmented-control">
  <h1>Segmented control</h1>
  <p class="desc">같은 자리에서 보기를 바꾸는 2~4개의 선택지(수신함 47 / 발신함 50). 알약 컨테이너 안에서 선택된 항목만 흰색으로 떠 있습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><div class="seg" role="tablist"><button class="seg__item on" role="tab" aria-selected="true">수신함 <span class="n">47</span></button><button class="seg__item" role="tab">발신함 <span class="n">50</span></button></div></div>
    <ol><li><b>Container</b> — 알약, <code>--bg-neutral-weak</code>, 3px 패딩</li><li><b>Item</b> — 라벨 t1 500 + 건수 muted</li><li><b>Selected</b> — 흰 배경 + shadow-1 + 600</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><div class="seg"><button class="seg__item on">일정</button><button class="seg__item">회의</button></div><div class="seg md"><button class="seg__item on">일정</button><button class="seg__item">회의</button></div></div>
  <table><tr><th>크기</th><th>항목 높이</th><th>쓰임</th></tr><tr><td>sm</td><td>26px</td><td>패널 머리, 카드 안</td></tr><tr><td>md</td><td>32px</td><td>화면 상단, 폼(일정/회의 구분)</td></tr></table>
  <h3>State</h3>
  <div class="demo"><figure class="ex"><div class="seg"><button class="seg__item on">수신함 <span class="n">47</span></button><button class="seg__item">발신함 <span class="n">50</span></button></div><figcaption>기본 — 선택 하나 + 나머지</figcaption></figure><figure class="ex"><div class="seg"><button class="seg__item on">수신함</button><button class="seg__item" style="color:var(--fg-neutral)">발신함</button></div><figcaption>hover — 글자만 진해짐</figcaption></figure><figure class="ex"><div class="seg"><button class="seg__item on">수신함</button><button class="seg__item" disabled>발신함</button></div><figcaption>disabled 항목</figcaption></figure></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>항목은 2~4개, 라벨은 한두 단어. 건수는 라벨 뒤에 muted.</div>
    <div class="dont"><b>Don&#39;t</b>다섯 개 이상이면 Tabs 나 Select 로. 항목 폭이 서로 크게 다르면 안 됩니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>바꾸면 즉시 아래 내용이 바뀝니다 — 저장·확인 버튼 없음.</div>
    <div class="dont"><b>Don&#39;t</b>선택 항목에 틸·검정을 칠하지 않습니다 — 흰색 + 그림자가 「눌려 올라옴」을 뜻합니다.</div>
  </div>
  <h2>Segmented vs. Tabs vs. Chip</h2>
  <table><tr><th></th><th>Segmented</th><th>Tabs</th><th>Chip</th></tr><tr><td>항목 수</td><td>2~4</td><td>2~7</td><td>제한 없음</td></tr><tr><td>뜻</td><td>같은 데이터의 보기 전환</td><td>다른 내용 영역</td><td>필터(다중 가능)</td></tr><tr><td>자리</td><td>패널·카드 안</td><td>화면 상단 전체 폭</td><td>목록 위</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>컨테이너</td><td><code>--bg-neutral-weak</code> · <code>--radius-full</code> · 3px</td></tr><tr><td>항목</td><td>t1 500 <code>--fg-neutral-subtle</code> · 건수 <code>--fg-neutral-muted</code></td></tr><tr><td>selected</td><td><code>--bg-layer-default</code> + <code>--shadow-1</code> + 600</td></tr><tr><td>포커스</td><td><code>--stroke-focus</code> 2px</td></tr><tr><td>접근성</td><td><code>role="tablist"/"tab" aria-selected</code>, ← → 로 이동, 선택은 즉시</td></tr></table>
</section>

<section class="page" id="components/avatar">
  <h1>Avatar</h1>
  <p class="desc">사람을 나타내는 원. 사진 대신 이름 첫 글자를 쓰고, 접속 상태 점과 이름·소속 묶음(lockup)으로 확장합니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><div class="avatar-lockup lg"><span class="avatar s48">윤<span class="dot"></span></span><span><b>윤아린2</b><small>디자인1팀1 · 부장 · <em>연결 4</em></small></span></div></div>
    <ol><li><b>Circle</b> — 첫 글자, <code>--bg-neutral-weak</code>. 옆 글자 두 줄 높이에 맞춰 48px</li><li><b>Status dot</b> (선택) — 8~10px, 접속 positive · 자리 비움 warning · 오프라인 neutral</li><li><b>Name / Meta</b> — t4 600 / t2 muted (lockup lg)</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><span class="avatar s24">윤</span><span class="avatar s28">박</span><span class="avatar s32">김</span><span class="avatar s40">이</span><span class="avatar s48">최</span></div>
  <table><tr><th>크기</th><th>쓰임</th></tr><tr><td>24</td><td>행 안, 아바타 그룹</td></tr><tr><td>28</td><td>사이드바 하단 사용자, 대화 말풍선</td></tr><tr><td>32</td><td>담당자 카드, lockup 기본</td></tr><tr><td>40 · 48</td><td>프로필·담당자 상세, lockup lg</td></tr></table>
  <h3>Variant</h3>
  <div class="demo"><span class="avatar s32">윤<span class="dot"></span></span><span class="avatar s32">박<span class="dot away"></span></span><span class="avatar s32">김<span class="dot off"></span></span><span class="avatar s32 accent">AI</span><div class="avatar-group"><span class="avatar s24">윤</span><span class="avatar s24">박</span><span class="avatar s24">김</span><span class="avatar s24">+3</span></div><div class="avatar-lockup"><span class="avatar s32">윤</span><span><b>윤아린2</b><small>디자인1팀1 · 부장</small></span></div></div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>status dot</td><td>담당자 찾기 — 지금 자리에 있는지. 색만이 아니라 툴팁 「자리에 있음」</td></tr><tr><td>accent</td><td>에이전트 자신. 사람과 구분되는 유일한 틸 아바타</td></tr><tr><td>group</td><td>참석자 3명 + 「+N」. 겹침 8px</td></tr><tr><td>lockup / lockup lg</td><td>이름 + 소속. 사이드바 하단(32) · 담당자 상세(48)</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>이름 첫 글자 하나. 성이 아니라 사용자가 표시하는 이름의 첫 글자.</div>
    <div class="dont"><b>Don&#39;t</b>사람마다 다른 배경색을 주지 않습니다 — 회색 하나. 색은 상태 점이 맡습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>lockup 의 「연결 4」처럼 틸 글자는 에이전트 관련 수치 한 곳.</div>
    <div class="dont"><b>Don&#39;t</b>아바타를 버튼처럼 쓰려면 <code>&lt;button aria-label="윤아린2 프로필"&gt;</code> 로 감쌉니다 — 원 자체에 onClick 을 두지 않습니다.</div>
  </div>
  <h2>Avatar vs. Icon chip</h2>
  <table><tr><th></th><th>Avatar</th><th>Icon chip(List row 의 leading)</th></tr><tr><td>뜻</td><td>사람·에이전트</td><td>기능 카테고리</td></tr><tr><td>모양</td><td>원</td><td>라운드 사각</td></tr><tr><td>색</td><td>회색(에이전트만 틸)</td><td>카테고리 틴트</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>배경 / 글자</td><td><code>--bg-neutral-weak</code> / <code>--fg-neutral</code> 600 · 24~32 t1 · 40 t3 · 48 t5</td></tr><tr><td>에이전트</td><td><code>--bg-accent-weak</code> / <code>--fg-accent</code></td></tr><tr><td>상태 점</td><td><code>--bg-positive-solid</code> · <code>--bg-warning-solid</code> · <code>--stroke-neutral-stronger</code>, 2px 흰 링</td></tr><tr><td>lockup</td><td>이름 t2 600 · 메타 t1 muted (lg: t4 / t2) · 연결 <code>--fg-accent</code></td></tr><tr><td>접근성</td><td><code>role="img" aria-label="윤아린2"</code>; 상태 점은 <code>title</code> 로 문구</td></tr></table>
</section>
`;

export const nav = [['components/list-row', 'List row'], ['components/segmented-control', 'Segmented control'], ['components/avatar', 'Avatar']];
