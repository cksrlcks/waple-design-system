// Menu · Popover — 떠 있는 목록과 패널. .menu 목록은 Combobox·Command palette·Navigation menu·Menubar 도 그대로 쓴다(한 뜻에 한 조각)
import { icon } from './icons.mjs';

export const css = `
  /* ── Menu ── 떠 있는 목록. 마크업: .menu > .menu__label | .menu__item(> svg · .menu__text · .menu__end) | hr.menu__sep */
  .menu{display:flex;flex-direction:column;min-width:200px;max-width:320px;padding:var(--dim-x1_5);background:var(--bg-layer-floating);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);box-shadow:var(--shadow-2);text-align:left}
  .menu.scroll{max-height:320px;overflow:auto}
  .menu__label{padding:var(--dim-x2) var(--dim-x2_5) var(--dim-x1);font-size:var(--font-size-t1);line-height:var(--line-height-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted)}
  .menu__item{display:flex;align-items:center;gap:var(--dim-x2_5);width:100%;min-height:36px;padding:0 var(--dim-x2_5);border:0;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral);text-align:left;cursor:pointer;transition:background var(--duration-fast)}
  .menu__item>svg{width:18px;height:18px;color:var(--fg-neutral-muted)}
  .menu__item:hover,.menu__item.active{background:var(--bg-neutral-hover)}
  .menu__item:focus-visible,.menu__item.focus{outline:none;background:var(--bg-neutral-hover);box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .menu__text{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .menu__text small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted);white-space:normal}
  .menu__item.two{min-height:52px;align-items:flex-start;padding-top:var(--dim-x2);padding-bottom:var(--dim-x2)} .menu__item.two>svg{margin-top:1px}
  .menu__end{margin-left:auto;display:inline-flex;align-items:center;gap:var(--dim-x1);padding-left:var(--dim-x3);font-size:var(--font-size-t1);color:var(--fg-neutral-muted)} .menu__end svg{width:16px;height:16px}
  .menu__item[aria-checked="true"] .menu__end{color:var(--fg-neutral)}
  .menu__item.danger,.menu__item.danger>svg{color:var(--fg-critical)} .menu__item.danger:hover,.menu__item.danger.active{background:var(--bg-critical-weak)}
  .menu__item:disabled,.menu__item.disabled,.menu__item[aria-disabled="true"]{color:var(--fg-disabled);background:transparent;cursor:not-allowed} .menu__item:disabled>svg,.menu__item.disabled>svg,.menu__item[aria-disabled="true"]>svg{color:var(--fg-disabled)}
  .menu__item:disabled:hover,.menu__item.disabled:hover,.menu__item[aria-disabled="true"]:hover{background:transparent} /* 목록 안 비활성은 글자만 — 회색 면은 선택처럼 읽힌다 */
  .menu__sep{display:block;height:1px;border:0;margin:var(--dim-x1_5) calc(-1 * var(--dim-x1_5));background:var(--stroke-neutral)}
  /* 하위 메뉴 — role="none" 래퍼. 부모 항목 오른쪽 4px, 첫 항목 높이를 부모 항목에 맞춘다. 한 단계까지 */
  .menu__sub{position:relative;display:flex;flex-direction:column}
  .menu__sub>.menu{position:absolute;left:calc(100% + var(--dim-x1_5) + var(--dim-x1) + 1px);top:calc(-1 * var(--dim-x1_5) - 1px);z-index:1}
  /* 문서 배치 — 열린 상태를 흐름으로 보여 준다(트리거 아래 4px). 실제 화면은 트리거 기준 position:fixed 로 계산해 붙인다 */
  .menuwrap{display:inline-flex;flex-direction:column;align-items:flex-start;gap:var(--dim-x1)} .menuwrap.end{align-items:flex-end} .menuwrap.up{flex-direction:column-reverse} .menuwrap.arrow{gap:var(--dim-x2)}
  .menuctx{position:relative;width:100%;max-width:520px} .menuctx>.menu,.menuctx>.menuwrap{position:absolute;z-index:3}
  .menuctx.side{width:var(--layout-sidebar);padding:var(--dim-x1) var(--dim-x2) var(--dim-x2);background:var(--bg-layer-basement);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md)}
  .menuctx.side .sbnav__conv{padding-right:var(--dim-x8)}
  /* ── Popover ── 떠 있는 비모달 패널. 면은 .menu 와 같은 층(floating · 1px strong · shadow-2). 패딩 16 안에 input·button 이 들어가 라운드는 카드·Dialog 와 같은 lg */
  .popover{position:relative;display:flex;flex-direction:column;gap:var(--dim-x3);width:280px;max-width:100%;padding:var(--dim-x4);background:var(--bg-layer-floating);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);box-shadow:var(--shadow-2);text-align:left;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral)}
  .popover.lg{width:360px}
  .popover__hd{display:flex;align-items:center;gap:var(--dim-x2);margin:calc(-1 * var(--dim-x1)) calc(-1 * var(--dim-x2)) 0 0} .popover__hd b{flex:1;min-width:0;font-size:var(--font-size-t3);line-height:var(--line-height-t3);font-weight:var(--font-weight-semibold)}
  .popover__body{margin:0;color:var(--fg-neutral-subtle)}
  .popover__link{display:inline-flex;align-items:center;gap:var(--dim-x1);align-self:flex-start;border-radius:var(--radius-xs);font-weight:var(--font-weight-medium);color:var(--fg-neutral);text-decoration:underline;text-underline-offset:3px} .popover__link svg{width:16px;height:16px}
  .popover__sec{display:flex;flex-direction:column;gap:var(--dim-x2)} .popover__sec>b{font-size:var(--font-size-t1);line-height:var(--line-height-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted)}
  .popover__chips{display:flex;flex-wrap:wrap;gap:var(--spacing-between-chips)}
  .popover__ft{display:flex;justify-content:flex-end;gap:var(--dim-x2);margin-top:var(--dim-x1)} .popover__ft.split{justify-content:space-between}
  /* 화살표(선택) — 트리거가 아이콘 버튼일 때만. 10px 정사각을 45° 돌려 두 변만 선을 남긴다. 모서리에서 8px = 28~32px 버튼의 가운데 */
  .popover.arrow::before{content:"";position:absolute;top:-6px;left:var(--dim-x2);width:10px;height:10px;background:var(--bg-layer-floating);border:solid var(--stroke-neutral-strong);border-width:1px 0 0 1px;transform:rotate(45deg)}
  .popover.arrow.end::before{left:auto;right:var(--dim-x2)} .popover.arrow.top::before{top:auto;bottom:-6px;border-width:0 1px 1px 0}
  /* Hover card — 이름·아바타에 올리면 뜨는 프로필. 면은 Popover 그대로 */
  .hovercard__who{display:inline-flex;align-items:center;gap:var(--dim-x1_5);padding:2px var(--dim-x2) 2px 2px;border-radius:var(--radius-full);font-weight:var(--font-weight-medium);color:var(--fg-neutral);text-decoration:none} .hovercard__who:hover,.hovercard__who.on{background:var(--bg-neutral-hover)}
  .popover__link:focus-visible,.hovercard__who:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .hovercard__hd{display:flex;align-items:center;gap:var(--dim-x3)} .hovercard__hd>div{flex:1;min-width:0} .hovercard__hd b{display:block;font-size:var(--font-size-t3);line-height:var(--line-height-t3);font-weight:var(--font-weight-semibold)} .hovercard__hd small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .hovercard__meta{display:flex;flex-direction:column;gap:var(--dim-x1_5);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-subtle)} .hovercard__meta span{display:flex;align-items:center;gap:var(--dim-x2)} .hovercard__meta svg{width:16px;height:16px;color:var(--fg-neutral-muted)}
`;

// 항목 하나. o: cls(active·two·danger·disabled·focus) · role(menuitemcheckbox·menuitemradio) · on(체크) · end(뒤 글자) · sub(설명) · keys · dis · pop(하위 메뉴 'open'|'closed')
const it = (ico, label, o = {}) => '<button class="menu__item' + (o.cls ? ' ' + o.cls : '') + '" role="' + (o.role || 'menuitem') + '" tabindex="-1"' +
  (o.role ? ' aria-checked="' + !!o.on + '"' : '') + (o.keys ? ' aria-keyshortcuts="' + o.keys + '"' : '') + (o.dis ? ' aria-disabled="true"' : '') + (o.pop ? ' aria-haspopup="menu" aria-expanded="' + (o.pop === 'open') + '"' : '') + '>' +
  (ico ? icon(ico) : '') + '<span class="menu__text">' + label + (o.sub ? '<small>' + o.sub + '</small>' : '') + '</span>' +
  (o.end || o.on || o.pop ? '<span class="menu__end">' + (o.end || '') + (o.on ? icon('check') : '') + (o.pop ? icon('chevron-right') : '') + '</span>' : '') + '</button>';
const SEP = '<hr class="menu__sep">';
const grp = (label, items) => '<div role="group" aria-label="' + label + '"><div class="menu__label" aria-hidden="true">' + label + '</div>' + items + '</div>';
const radio = (label, on) => it(null, label, { role: 'menuitemradio', on });
const check = (label, on) => it(null, label, { role: 'menuitemcheckbox', on });
const menu = (label, items, cls, style) => '<div class="menu' + (cls ? ' ' + cls : '') + '" role="menu" aria-label="' + label + '"' + (style ? ' style="' + style + '"' : '') + '>' + items + '</div>';
const kebab = (label, open, vertical, size) => '<button class="iconbtn ' + (size || 'sm') + ' ghost' + (open ? ' selected' : '') + '" aria-label="' + label + '" aria-haspopup="menu" aria-expanded="' + !!open + '">' + icon(vertical ? 'dots-vertical' : 'dots') + '</button>';
const trig = (ico, label, open) => '<button class="btn sm neutral-outline" aria-haspopup="menu" aria-expanded="' + !!open + '"' + (open ? ' style="background:var(--bg-neutral-selected)"' : '') + '>' + (ico ? icon(ico) : '') + label + icon('chevron-down') + '</button>';
const wrap = (cls, a, b, style) => '<div class="menuwrap' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '>' + a + b + '</div>';
const ex = (inner, cap) => '<figure class="ex">' + inner + '<figcaption>' + cap + '</figcaption></figure>';

// 자주 쓰는 묶음 — 페이지마다 같은 문구
const CONV = it('pencil', '이름 바꾸기', { end: 'F2', keys: 'F2' }) + it('pin', '고정') + it('archive', '보관') + SEP + it('trash', '삭제', { cls: 'danger', end: 'Del', keys: 'Delete' });
const LEAVE = it('history', '신청 내역 보기') + it('pin', '카드 고정') + it('eye-off', '홈에서 숨기기');
const DOC = it('external-link', '열기') + it('link', '링크 복사', { end: 'Ctrl C', keys: 'Control+C' }) + SEP + it('arrow-back-up', '회수', { cls: 'danger' });
const SORT = grp('정렬', radio('최신순', 1) + radio('이름순') + radio('오래된순'));
const FORMS = ['지출결의', '휴가 신청', '품의서', '출장 신청', '외근 신청', '구매 요청', '법인카드 사용', '경조사 신청', '교육 신청', '재택근무 신청', '명함 신청', '기타 문서'].map(t => it('file-text', t)).join('');
const lrow = (tone, ico, t, meta, side, cls) => '<a class="lrow' + (cls ? ' ' + cls : '') + '" href="#"><span class="lrow__ico ' + tone + '">' + icon(ico) + '</span><span class="lrow__main"><b>' + t + '</b><span class="lrow__meta">' + meta + '</span></span><span class="lrow__side">' + side + '</span></a>';
const trow = (t, when, amt, badge, open) => '<tr><td class="primary">' + t + '</td><td class="meta">' + when + '</td><td class="num">' + amt + '</td><td>' + badge + '</td><td class="act">' + kebab('문서 메뉴', open) + '</td></tr>';
const CONVS = ['출근 기록 #3', '이번 주 출퇴근 현황 요약 #2', '식대와 교통비 한도가 있는지', '이번 주 출퇴근 현황 요약', '9월 지출결의 상신', '회의실 7층 예약 변경'].map(t => '<a class="sbnav__conv" href="#">' + t + '</a>').join('');

// Popover 조각 — 패널은 role="dialog"(비모달)
const pop = (cls, label, inner) => '<div class="popover' + (cls ? ' ' + cls : '') + '" role="dialog" aria-label="' + label + '">' + inner + '</div>';
const phd = (t) => '<div class="popover__hd"><b>' + t + '</b><button class="iconbtn sm ghost" aria-label="닫기">' + icon('x') + '</button></div>';
const pbtn = (t, cls) => '<button class="btn sm ' + (cls || 'neutral-outline') + '">' + t + '</button>';
const ptrig = (ico, label, open) => '<button class="iconbtn sm ghost' + (open ? ' selected' : '') + '" aria-label="' + label + '" aria-haspopup="dialog" aria-expanded="' + !!open + '">' + icon(ico) + '</button>';
const chips = (label, items) => '<div class="popover__sec"><b>' + label + '</b><div class="popover__chips">' + items.map((t, i) => '<button class="chip sm' + (i === 0 ? ' selected' : '') + '" aria-pressed="' + (i === 0) + '">' + t + '</button>').join('') + '</div></div>';
const INFO = pop('arrow', '잔여 연차 계산', '<p class="popover__body">입사일 기준으로 매년 1월 1일에 새로 붙습니다. 반차는 0.5일, 다음 해로 넘기는 것은 5일까지입니다.</p><a class="popover__link" href="#">연차 규정 보기' + icon('external-link') + '</a>');
const EDIT = pop('arrow', '회의 제목', phd('회의 제목') + '<div class="field md focus" style="min-width:0"><div class="ctrl"><input value="디자인1팀 주간 회의" aria-label="회의 제목"></div></div><div class="popover__ft">' + pbtn('취소') + pbtn('저장', 'brand-solid') + '</div>');
const FILTER = pop('lg', '결재함 필터', phd('결재함 필터') + chips('상태', ['대기', '승인', '반려', '회수']) + chips('문서 종류', ['지출결의', '휴가 신청', '품의서', '출장 신청']) + '<label class="switch" style="justify-content:space-between"><span>내가 상신한 문서만</span><input type="checkbox" checked><span class="track"></span></label><div class="popover__ft split">' + pbtn('초기화', 'neutral-weak') + pbtn('적용 · 12건', 'brand-solid') + '</div>');
const FTRIG = '<button class="btn sm neutral-outline" aria-haspopup="dialog" aria-expanded="true" style="background:var(--bg-neutral-selected)">' + icon('filter-filled') + '필터 <span class="badge count">2</span></button>';
const WHO = '<a class="hovercard__who on" href="#"><span class="avatar s24">김</span>김도윤</a>';
const HOVER = pop('', '김도윤 프로필', '<div class="hovercard__hd"><span class="avatar s40">김<span class="dot"></span></span><div><b>김도윤</b><small>경영지원팀 · 과장</small></div><span class="badge success">자리에 있음</span></div><div class="hovercard__meta"><span>' + icon('briefcase-filled') + '담당 · 전자결재 · 경비 정산</span><span>' + icon('map-pin-filled') + '본사 7층 · 09:12 출근</span><span>' + icon('phone-filled') + '내선 2031</span></div><button class="btn sm neutral-outline fill">' + icon('message-filled') + '메시지</button>');
const WORK = '<p class="popover__body">주 40시간에 연장 12시간까지 셉니다. 외근·출장은 신청한 시간으로 들어갑니다.</p>';

export const pages = `
<section class="page" id="components/menu">
  <h1>Menu</h1>
  <p class="desc">kebab(⋯)·버튼·우클릭으로 여는 <b>행동 목록</b>입니다. 행·카드·표에서 자리를 차지하지 않고 보조 행동을 모아 두었다가, 고르면 바로 실행하고 닫힙니다. 값을 고르는 것은 Select, 설명·입력은 Popover 입니다.</p>

  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${wrap('end', kebab('대화 메뉴', true, false, 'md'), menu('대화 메뉴', CONV))}</div>
    <ol><li><b>Trigger</b> — ghost 아이콘 버튼. <code>aria-haspopup="menu"</code> · <code>aria-expanded</code>, 열려 있는 동안 <code>.selected</code></li><li><b>Container</b> — <code>role="menu"</code>. 떠 있는 면 · 1px 선 · shadow-2 · radius-md, 폭 200~320</li><li><b>Item</b> — <code>role="menuitem"</code> 36px: 아이콘 18 · 동사 라벨 · 뒤(단축키·체크·›)</li><li><b>Separator</b> — 성격이 다른 묶음 사이 <code>&lt;hr&gt;</code>, 좌우 끝까지</li><li><b>Destructive</b> — 맨 끝, 선 아래, critical 글자. 누르면 확인 Dialog</li><li><b>Group label</b> (선택) — 묶음이 둘 이상일 때만. 아래 Item 참고</li></ol>
  </div>

  <h2>Properties</h2>
  <h3>Trigger</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x8)">
    ${ex(wrap('end', kebab('연차 카드 메뉴', true, true), menu('연차 카드 메뉴', LEAVE)), 'kebab → bottom-end — 오른쪽 모서리를 트리거에 맞춥니다')}
    ${ex(wrap('', trig('arrows-sort', '최신순', true), menu('정렬', SORT)), 'button → bottom-start — 라벨이 현재 값')}
    ${ex('<div class="menuctx" style="width:340px">' + '<div class="lrows">' + lrow('violet', 'file-text-filled', '9월 지출결의', '184,000원 · 팀장 검토 중', '9/10', 'selected') + lrow('info', 'car-filled', '외근 신청 — 판교', '9/12 · 승인', '9/5') + lrow('positive', 'calendar-filled', '연차 신청', '9/15 · 승인', '9/3') + '</div>' + menu('문서 메뉴', DOC, '', 'left:130px;top:36px') + '</div>', 'context → 커서 오른쪽 아래 — 우클릭 · Shift+F10 · 메뉴 키')}
  </div>
  <table><tr><th>트리거</th><th>모양</th><th>배치</th><th>쓰임</th></tr>
    <tr><td>kebab</td><td><code>iconbtn sm ghost</code> — <code>dots</code>(행·표·사이드바) / <code>dots-vertical</code>(카드 우상단). 행·카드에 hover·focus 때 보이고, 터치에서는 항상</td><td>bottom-end</td><td>보조 행동이 2개 이상</td></tr>
    <tr><td>button</td><td><code>btn sm neutral-outline</code> + chevron-down. 라벨 = 지금 값(「최신순」)</td><td>bottom-start</td><td>정렬·보기 전환</td></tr>
    <tr><td>context</td><td>행·카드 자체</td><td>커서 오른쪽 아래</td><td>데스크톱 지름길 — 같은 항목이 kebab 에도 있어야 합니다</td></tr></table>
  <h3>Placement · Size</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x8)">
    ${ex(wrap('end up', kebab('대화 메뉴', true), menu('대화 메뉴', it('pin', '고정') + it('archive', '보관') + SEP + it('trash', '삭제', { cls: 'danger' }))), 'flip — 아래가 모자라면 top-end 로')}
    ${ex(menu('회의록', it('file-text', '디자인1팀 주간 회의록 — 9월 둘째 주 안건과 후속 조치') + it('file-text', '9월 첫째 주 회의록')), 'max 320 — 넘는 라벨은 말줄임, 전체는 툴팁')}
    ${ex(menu('결재 양식', FORMS, 'scroll'), '.scroll — 8개(320px)를 넘으면 안에서 스크롤')}
  </div>
  <table><tr><th>규칙</th><th>값</th></tr><tr><td>간격</td><td>트리거에서 4px(<code>--dim-x1</code>). 하위 메뉴도 부모 오른쪽 4px</td></tr><tr><td>뒤집기 · 밀기</td><td>아래 공간이 메뉴 높이보다 적으면 위로, 오른쪽이 모자라면 start↔end. 화면 가장자리와 8px 는 남깁니다</td></tr><tr><td>폭</td><td>최소 200 · 최대 320. 트리거보다 좁아지지 않습니다</td></tr><tr><td>높이</td><td>최대 320(항목 8개) — 넘으면 <code>.scroll</code>, 스무 개가 넘으면 메뉴가 아니라 표·목록 화면에서 고르게 합니다</td></tr></table>

  <h3>Item</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(menu('문서 메뉴', it('external-link', '열기') + it('link', '링크 복사') + it('message', '담당자에게 메시지')), 'icon + label — 기본. 아이콘은 모두 있거나 모두 없게')}
    ${ex(menu('업무일지', it('sparkles', '초안 만들기', { cls: 'two', sub: 'SVN·일정·결재에서 오늘 한 일을 모읍니다' }) + it('pencil', '빈 일지로 시작', { cls: 'two', sub: '처음부터 직접 씁니다' })), '.two — 라벨만으로 결과가 모호할 때')}
    ${ex(menu('대화 메뉴', it('copy', '복사', { end: 'Ctrl C', keys: 'Control+C' }) + it('pencil', '이름 바꾸기', { end: 'F2', keys: 'F2' }) + it('trash', '삭제', { end: 'Del', keys: 'Delete' })), 'shortcut — 실제로 동작하는 단축키만')}
    ${ex(menu('홈 카드', grp('홈에 보일 카드', check('출퇴근 기록', 1) + check('연차', 1) + check('전자결재', 1) + check('업무일지'))), 'checkbox — 여러 개. 눌러도 열린 채')}
    ${ex(menu('정렬', SORT), 'radio — 묶음에서 하나. 고르면 닫힘')}
    ${ex(menu('대화', grp('대화', it('plus', '새 대화') + it('list', '모든 대화 보기')) + SEP + grp('내보내기', it('download', 'PDF 로 저장') + it('link', '링크 복사'))), 'group label — 묶음이 둘 이상일 때만')}
    ${ex(menu('대화 메뉴', it('pin', '고정') + it('archive', '보관') + SEP + it('trash', '삭제', { cls: 'danger' })), 'destructive — 맨 끝 · 선 아래 · 확인 Dialog')}
    ${ex(menu('문서 메뉴', it('external-link', '열기') + it('link', '링크 복사') + SEP + '<span class="tip-host">' + it('arrow-back-up', '회수', { cls: 'danger', dis: 1 }) + '<span class="tip bottom on" role="tooltip">결재가 끝난 문서는 회수할 수 없습니다</span></span>', '', 'margin-bottom:var(--dim-x8)'), 'disabled — 숨기지 않고 이유를 툴팁으로')}
  </div>
  <table><tr><th>종류</th><th>role</th><th>규칙</th></tr><tr><td>기본 · 설명 · 단축키</td><td><code>menuitem</code></td><td>실행하고 닫힙니다. 단축키는 <code>aria-keyshortcuts</code> 로도 알립니다</td></tr><tr><td>checkbox · radio</td><td><code>menuitemcheckbox</code> · <code>menuitemradio</code> + <code>aria-checked</code></td><td>체크는 오른쪽 16px. radio 는 <code>role="group"</code> 으로 묶고 라벨을 붙입니다</td></tr><tr><td>disabled</td><td><code>aria-disabled="true"</code></td><td>포커스는 받고 실행은 안 됩니다. 이유는 <code>aria-describedby</code> 툴팁 — 터치에서는 <code>.two</code> 설명으로</td></tr></table>
  <h3>Submenu</h3>
  <div class="demo">${ex(menu('문서 메뉴', it('external-link', '열기') + '<div class="menu__sub" role="none">' + it('download', '내보내기', { pop: 'open', cls: 'active' }) + menu('내보내기', it(null, 'PDF') + it(null, '한글(HWP)') + it(null, '엑셀(XLSX)')) + '</div>' + it('link', '링크 복사') + SEP + it('arrow-back-up', '회수', { cls: 'danger' })), 'submenu — › 항목 오른쪽 4px, 첫 항목 높이를 맞춥니다. 한 단계까지, 오른쪽이 모자라면 왼쪽으로')}</div>
  <h3>State</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(kebab('대화 메뉴', false, false, 'md'), 'closed — <code>aria-expanded="false"</code>')}
    ${ex(wrap('', kebab('대화 메뉴', true, false, 'md'), menu('대화 메뉴', it('pin', '고정') + it('archive', '보관'))), 'open — 트리거는 .selected')}
    ${ex(menu('대화 메뉴', it('pin', '고정', { cls: 'active' }) + it('archive', '보관')), 'hover · active')}
    ${ex(menu('대화 메뉴', it('pin', '고정') + it('archive', '보관', { cls: 'focus' })), 'focus-visible — 안쪽 2px 링')}
    ${ex(menu('대화 메뉴', it('pin', '고정') + it('archive', '보관', { dis: 1 })), 'disabled — 글자만 흐리게')}
  </div>
  <h3>Waple 예시</h3>
  <div class="demo col">
    ${ex('<div class="qgrid one"><div class="qcard open"><div class="qcard__body"><a class="qcard__hd" href="#"><span class="qcard__top"><span class="qcard__ico info">' + icon('calendar') + '</span></span><span class="qcard__t"><b>연차</b><p>잔여 12일 · 날짜를 누르면 바로 신청</p></span></a><div class="qcard__more"><div><div class="qcard__ft"><button class="btn sm neutral-outline">기간으로 고르기</button><button class="btn sm neutral-outline">현황</button></div></div></div>' + wrap('end', kebab('연차 카드 메뉴', true, true), menu('연차 카드 메뉴', LEAVE), 'position:absolute;top:var(--dim-x3);right:var(--dim-x3)') + '</div></div></div>', '빠른 실행 카드 — 우상단 dots-vertical, bottom-end. 카드 안 주요 행동(기간으로 고르기)은 밖에 둡니다')}
    ${ex('<div class="menuctx side"><div class="sbnav__label"><span>대화</span><span>12</span></div><div class="menuctx"><a class="sbnav__conv on" href="#">연차 잔여 현황 및 사용 내역 확인</a>' + wrap('end', kebab('대화 메뉴', true), menu('대화 메뉴', CONV), 'top:1px;right:1px') + '</div>' + CONVS + '</div>', '대화 행 — hover 한 행에만 kebab. 이름 바꾸기 · 고정 · 보관 · 삭제')}
    ${ex('<div class="menuctx"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>문서</th><th>상신일</th><th class="num">금액</th><th>상태</th><th></th></tr></thead><tbody>' + trow('9월 지출결의', '9/10', '184,000', '<span class="badge warning">검토 중</span>', 1) + trow('9월 법인카드 사용', '9/8', '62,500', '<span class="badge success">승인</span>') + trow('외근 신청 — 판교', '9/5', '—', '<span class="badge danger">반려</span>') + trow('연차 신청 9/15', '9/3', '—', '<span class="badge success">승인</span>') + '</tbody></table></div>' + menu('문서 메뉴', DOC, '', 'top:82px;right:var(--dim-x3)') + '</div>', '표 행 — 마지막 열 kebab. 열기 · 링크 복사 · 회수(danger)')}
    ${ex(wrap('', trig('arrows-sort', '최신순 · 카드', true), menu('정렬과 보기', grp('정렬', radio('최신순', 1) + radio('이름순')) + SEP + grp('보기', radio('카드', 1) + radio('목록')))), '정렬·보기 — radio 묶음 둘. 라벨이 지금 값을 말합니다')}
    ${ex('<div class="dialog-stage" style="padding:var(--dim-x6)"><div class="dialog sm" role="dialog" aria-modal="true"><h4>대화를 삭제할까요?</h4><p>「연차 잔여 현황 및 사용 내역 확인」 대화와 첨부 2개를 지웁니다. 되돌릴 수 없습니다.</p><div class="dialog-foot"><button class="btn md neutral-outline">취소</button><button class="btn md critical-solid">삭제</button></div></div></div>', '삭제 → 확인 Dialog(sm) — 메뉴는 먼저 닫고, 취소하면 포커스는 kebab 으로')}
  </div>
  <h3>Keyboard</h3>
  <table><tr><th>키</th><th>동작</th></tr><tr><td>Enter · Space · ↓ (트리거)</td><td>열고 첫 항목에 포커스. ↑ 는 마지막 항목</td></tr><tr><td>↑ ↓ · Home · End</td><td>이전·다음(끝에서 처음으로 돌아감) · 처음 · 마지막. 비활성 항목에도 멈춥니다</td></tr><tr><td>글자 입력</td><td>그 글자로 시작하는 다음 항목(typeahead)</td></tr>
    <tr><td>→ · ←</td><td>하위 메뉴를 열고 첫 항목으로 · 닫고 부모 항목으로</td></tr><tr><td>Enter · Space (항목)</td><td>실행하고 닫은 뒤 트리거로 포커스. checkbox 는 토글하고 열린 채</td></tr><tr><td>Esc · Tab</td><td>Esc 는 닫고 트리거로, Tab 은 닫고 다음 요소로. 메뉴 안에서 Tab 순환은 없습니다</td></tr></table>

  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${menu('대화 메뉴', CONV)}</div>파괴적 행동은 맨 끝, 선 아래. 누르면 확인 Dialog 를 엽니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${menu('대화 메뉴', it('trash', '삭제', { cls: 'danger' }) + it('pencil', '이름 바꾸기') + it('pin', '고정') + it('archive', '보관'))}</div>삭제를 맨 위·중간에 두지 않습니다 — 손이 먼저 닿는 자리입니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>항목은 3~7개. 여덟 개가 넘으면 묶음 라벨로 나누거나 목록·설정 화면으로 옮깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>항목 하나짜리 kebab — 그 행동을 버튼으로 바로 보여 줍니다. kebab 은 보조 행동이 <b>2개 이상</b>일 때만.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>주요 행동은 밖에. 결재 행의 「승인」은 버튼, kebab 에는 링크 복사·회수 같은 보조만 넣습니다.</div>
    <div class="dont"><b>Don&#39;t</b>화면의 주요 행동을 메뉴에 숨기지 않습니다 — 사용자는 메뉴를 열어 보지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>라벨은 동사: <b>이름 바꾸기 · 고정 · 보관 · 삭제</b>. 대상은 행이 이미 말하므로 되풀이하지 않습니다.</div>
    <div class="dont"><b>Don&#39;t</b>「설정」「기타」「관리」처럼 무엇이 일어나는지 모르는 명사, 「대화 삭제」처럼 대상을 반복하는 라벨.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>지금 못 하는 항목은 disabled 로 남기고 이유를 알립니다 — 자리가 매번 바뀌면 위치를 외울 수 없습니다.</div>
    <div class="dont"><b>Don&#39;t</b>하위 메뉴를 두 단계 이상 겹치거나, 한 화면에서 <code>dots</code> 와 <code>dots-vertical</code> 을 섞지 않습니다.</div>
  </div>

  <h2>Menu vs. Select vs. Popover vs. Segmented control</h2>
  <table><tr><th></th><th>Menu</th><th>Select</th><th>Popover</th><th>Segmented control</th></tr>
    <tr><td>목적</td><td>행동 실행</td><td>값 하나 고르기(폼)</td><td>설명 · 빠른 편집 · 필터</td><td>보기 2~4개 전환</td></tr>
    <tr><td>보이는 것</td><td>열어야 보임</td><td>고른 값</td><td>열어야 보임</td><td>전부</td></tr>
    <tr><td>고른 뒤</td><td>실행하고 닫힘</td><td>값이 바뀌고 닫힘</td><td>열린 채 — 저장·적용 버튼</td><td>즉시 전환</td></tr>
    <tr><td>role · 포커스</td><td><code>menu</code> · 첫 항목으로</td><td>기본 <code>&lt;select&gt;</code> · 브라우저</td><td><code>dialog</code>(비모달) · 입력이 있을 때만 안으로</td><td><code>radiogroup</code> · 제자리</td></tr></table>

  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Container</td><td><code>--bg-layer-floating</code> · 1px <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · <code>--shadow-2</code> · 패딩 <code>--dim-x1_5</code> · 폭 200~320 · <code>.scroll</code> 최대 320</td></tr>
    <tr><td>Item</td><td>36px(<code>.two</code> 52) · 좌우 <code>--dim-x2_5</code> · 간격 <code>--dim-x2_5</code> · <code>--radius-sm</code> · t2 <code>--fg-neutral</code></td></tr>
    <tr><td>Icon · Description</td><td>18px <code>--fg-neutral-muted</code> · 설명 t1 <code>--fg-neutral-muted</code></td></tr>
    <tr><td>Trailing</td><td>t1 <code>--fg-neutral-muted</code> · 체크·› 16px, 체크된 항목은 <code>--fg-neutral</code></td></tr>
    <tr><td>Group label · Separator</td><td>t1 500 <code>--fg-neutral-muted</code> · 1px <code>--stroke-neutral</code> 좌우 끝까지, 위아래 <code>--dim-x1_5</code></td></tr>
    <tr><td>Hover · Focus</td><td><code>--bg-neutral-hover</code> · 안쪽 2px <code>--stroke-focus</code></td></tr>
    <tr><td>Destructive</td><td><code>--fg-critical</code>, hover <code>--bg-critical-weak</code></td></tr>
    <tr><td>Disabled</td><td><code>--fg-disabled</code>, 배경 없음 — 목록 안의 회색 면은 선택처럼 읽혀 글자만 흐립니다</td></tr>
    <tr><td>Trigger (열림)</td><td>iconbtn <code>.selected</code>(<code>--bg-neutral-selected</code>) · 버튼은 같은 배경</td></tr>
    <tr><td>Motion</td><td>열 때 페이드 + 4px 이동 <code>--duration-fast</code> <code>--easing</code>, 닫을 때는 바로</td></tr>
    <tr><td>접근성</td><td>트리거 <code>aria-haspopup="menu"</code> · <code>aria-expanded</code> · 목록 <code>role="menu"</code> + 이름 · 항목 <code>menuitem</code>/<code>menuitemcheckbox</code>/<code>menuitemradio</code> · 포커스는 roving <code>tabindex</code> · 키보드는 위 표</td></tr></table>
</section>

<section class="page" id="components/popover">
  <h1>Popover</h1>
  <p class="desc">트리거 옆에 뜨는 <b>비모달 패널</b>입니다. Tooltip 보다 풍부한 내용 — 설명과 링크, 한 칸짜리 빠른 편집, 필터, 프로필 — 을 담고, 열려 있어도 뒤 화면을 그대로 쓸 수 있습니다. 행동 목록은 Menu, 화면을 멈추고 확인받을 것은 Dialog 입니다.</p>

  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${wrap('arrow', ptrig('pencil', '회의 제목 바꾸기', true), EDIT)}</div>
    <ol><li><b>Trigger</b> — 클릭으로 엽니다. <code>aria-haspopup="dialog"</code> · <code>aria-expanded</code>, 열린 동안 <code>.selected</code></li><li><b>Arrow</b> (선택) — 트리거가 아이콘 버튼일 때만. CSS 로 돌린 10px 정사각</li><li><b>Header</b> (선택) — 제목 t3 600 + 닫기 iconbtn sm</li><li><b>Body</b> — 설명(t2 subtle) · 입력 · 칩 · 스위치</li><li><b>Footer</b> (선택) — sm 버튼, 주요 행동은 brand-solid 하나</li></ol>
  </div>

  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x8)">
    ${ex(wrap('arrow', ptrig('help-circle-filled', '잔여 연차 계산 안내', true), INFO), 'info — 짧은 설명 + 링크 하나, 닫기 버튼 없이')}
    ${ex(wrap('arrow', ptrig('pencil', '회의 제목 바꾸기', true), EDIT), 'quick edit — 입력 하나 + 취소·저장')}
    ${ex(wrap('', FTRIG, FILTER), 'filter — 칩·스위치 + 초기화·적용 (lg)')}
    ${ex(wrap('', WHO, HOVER), 'hover card — 이름·아바타에 올리면 프로필')}
  </div>
  <table><tr><th>Variant</th><th>트리거</th><th>열기</th><th>포커스</th><th>닫기</th></tr>
    <tr><td>info</td><td>help-circle 아이콘 버튼</td><td>클릭 · Enter</td><td>트리거에 남고, Tab 으로 패널 안</td><td>바깥 클릭 · Esc</td></tr>
    <tr><td>quick edit</td><td>pencil 아이콘 버튼</td><td>클릭 · Enter</td><td>첫 입력으로</td><td>저장 · 취소 · Esc — 입력이 바뀌었으면 바깥 클릭은 무시</td></tr>
    <tr><td>filter</td><td>「필터」 버튼 + 적용 개수 배지</td><td>클릭 · Enter</td><td>첫 칩으로</td><td>적용 · Esc · 바깥 클릭(적용하지 않음)</td></tr>
    <tr><td>hover card</td><td>이름·아바타 링크</td><td>hover 500ms · focus</td><td>옮기지 않음</td><td>벗어나고 300ms · Esc</td></tr></table>
  <h3>Size</h3>
  <div class="demo" style="align-items:flex-start">
    ${ex(pop('', '기본 폭', '<p class="popover__body">한 줄 입력과 버튼 둘, 두세 문장의 설명이 들어가는 폭입니다.</p>'), 'default · 280 — 안내 · 빠른 편집 · 프로필')}
    ${ex(pop('lg', '넓은 폭', '<p class="popover__body">칩 줄이 여럿이거나 필드가 둘일 때. 그보다 크면 Dialog·작업 패널로 옮깁니다.</p>'), 'lg · 360 — 필터')}
  </div>
  <h3>Placement</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x8)">
    ${ex(wrap('arrow end', ptrig('help-circle-filled', '근무 시간 계산 안내', true), pop('arrow end', '근무 시간 계산', WORK)), 'bottom-end — 오른쪽 끝 트리거, 화살표도 오른쪽')}
    ${ex(wrap('arrow up', ptrig('help-circle-filled', '근무 시간 계산 안내', true), pop('arrow top', '근무 시간 계산', WORK)), 'flip — 아래가 모자라면 위로, 화살표는 아래를')}
  </div>
  <table><tr><th>규칙</th><th>값</th></tr><tr><td>기본</td><td>bottom-start. 트리거가 오른쪽 끝이면 bottom-end — Menu 와 같은 규칙</td></tr><tr><td>간격</td><td>4px(<code>--dim-x1</code>), 화살표가 있으면 8px(<code>--dim-x2</code>) — 화살표가 그 틈을 채웁니다</td></tr><tr><td>뒤집기 · 밀기</td><td>아래가 모자라면 위로, 옆이 모자라면 start↔end. 화면 가장자리와 8px. 트리거를 가리지 않습니다</td></tr></table>

  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${pop('', '반차 안내', '<p class="popover__body">반차는 0.5일로 셉니다. 오전·오후를 고를 수 있습니다.</p><a class="popover__link" href="#">연차 규정 보기' + icon('external-link') + '</a>')}</div>설명은 두세 문장 + 링크 하나. 바깥 클릭으로 닫힙니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${pop('', '안내', phd('안내') + '<p class="popover__body">9월 지출결의는 9/25 까지 상신해야 합니다. 늦으면 다음 달로 넘어가며 영수증을 다시 첨부해야 합니다.</p><div class="popover__ft">' + pbtn('닫기') + pbtn('확인', 'brand-solid') + '</div>')}</div>읽고 「확인」해야 하는 내용은 Dialog, 늘 보여야 하는 마감·경고는 Notice 로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>입력은 한두 칸 — 회의 제목·사유처럼. 필드가 셋을 넘거나 검증이 길면 Dialog·작업 패널로 옮깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>팝오버 안에서 팝오버·메뉴를 또 열거나, 패널 안에 스크롤을 만들지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>hover card 는 지름길입니다 — 같은 정보가 이름을 누르면 여는 화면에도 있어야 터치·키보드 사용자가 볼 수 있습니다.</div>
    <div class="dont"><b>Don&#39;t</b>고친 입력이 바깥 클릭 한 번에 사라지게 하지 않습니다. 바뀌었으면 바깥 클릭은 무시하고 Esc·취소로만 닫습니다.</div>
  </div>

  <h2>Popover vs. Tooltip vs. Dialog vs. Menu</h2>
  <table><tr><th></th><th>Popover</th><th>Tooltip</th><th>Dialog</th><th>Menu</th></tr>
    <tr><td>내용</td><td>설명·링크 · 짧은 입력 · 필터 · 프로필</td><td>이름 한두 단어</td><td>질문 + 요약 + 버튼 둘</td><td>행동 목록</td></tr>
    <tr><td>열기</td><td>클릭(hover card 는 hover·focus)</td><td>hover·focus 300ms</td><td>행동의 결과로</td><td>클릭 · 우클릭 · 키</td></tr>
    <tr><td>모달</td><td>아니오 — 뒤 화면 사용</td><td>아니오</td><td>예 — overlay + 포커스 가둠</td><td>아니오</td></tr>
    <tr><td>포커스</td><td>입력이 있을 때만 안으로</td><td>안 옮김</td><td>창 안 첫 버튼</td><td>첫 항목</td></tr>
    <tr><td>면</td><td>floating · 1px 선 · shadow-2 · radius-lg</td><td>잉크 · radius-sm</td><td>floating · shadow-3 · radius-lg</td><td>floating · 1px 선 · shadow-2 · radius-md</td></tr></table>

  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Container</td><td><code>--bg-layer-floating</code> · 1px <code>--stroke-neutral-strong</code> · <code>--shadow-2</code>(Menu 와 같은 층) · <code>--radius-lg</code> · 패딩 <code>--dim-x4</code> · 간격 <code>--dim-x3</code> · 폭 280 / lg 360</td></tr>
    <tr><td>라운드</td><td><code>--radius-lg</code> — 16px 패딩 안에 input(radius-sm)·button(radius-md)이 들어가 카드·Dialog 와 같은 곡률이 맞습니다. Menu 는 6px 패딩의 빽빽한 목록이라 한 단계 작은 radius-md</td></tr>
    <tr><td>Header</td><td>제목 t3 600 <code>--fg-neutral</code> · 닫기 iconbtn sm ghost, 오른쪽 위 패딩 안으로 당겨 맞춤</td></tr>
    <tr><td>Body</td><td>t2 <code>--fg-neutral-subtle</code> · 링크 500 <code>--fg-neutral</code> 밑줄 + external-link 16px</td></tr>
    <tr><td>Section</td><td>라벨 t1 500 <code>--fg-neutral-muted</code> · Chip sm, 간격 <code>--spacing-between-chips</code> · Switch 행</td></tr>
    <tr><td>Footer</td><td>Button sm · 간격 <code>--dim-x2</code> · 오른쪽 정렬(필터는 초기화 왼쪽 · 적용 오른쪽)</td></tr>
    <tr><td>Arrow</td><td>10px 정사각 45° · 두 변 1px <code>--stroke-neutral-strong</code> · 모서리에서 <code>--dim-x2</code></td></tr>
    <tr><td>Hover card</td><td>Avatar s40 + 상태 dot · 상태 Badge(success 자리에 있음 · warning 자리 비움 · neutral 퇴근) · 메타 t1 subtle + 16px filled 아이콘 · 메시지 btn sm</td></tr>
    <tr><td>Motion</td><td>페이드 + 4px 이동 <code>--duration-fast</code> <code>--easing</code> · hover card 는 열기 500ms · 닫기 300ms 지연</td></tr>
    <tr><td>접근성</td><td>트리거 <code>aria-haspopup="dialog"</code> · <code>aria-expanded</code> · 패널 <code>role="dialog"</code>(<code>aria-modal</code> 없음) + 이름 · Esc·바깥 클릭으로 닫고 포커스는 트리거로 · Tab 이 패널 끝을 지나면 닫힘 · hover card 는 focus 로도 열립니다</td></tr></table>
</section>
`;

export const nav = [['components/menu', 'Menu'], ['components/popover', 'Popover']];

export const tint = ['menu', 'popover'];
