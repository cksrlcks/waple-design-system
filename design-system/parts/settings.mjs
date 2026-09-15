// 설정: Select · Settings dialog(설정 레이어). settingsMarkup() 은 home.html 주입 스크립트도 같이 쓴다 — 마크업의 단일 원천
import { icon } from './icons.mjs';

export const css = `
  /* ── Select ── 브라우저 기본 <select> 에 시스템 옷만 입힌다. 항목이 많아 검색이 필요하면 Select 가 아니라 표·목록 화면에서 고르게 한다 */
  .select{position:relative;display:inline-flex;align-items:center;min-width:160px;max-width:100%}
  .select select{appearance:none;-webkit-appearance:none;width:100%;height:36px;padding:0 var(--dim-x8) 0 var(--dim-x3);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-sm);background:var(--bg-layer-default);font:inherit;font-size:var(--font-size-t2);color:var(--fg-neutral);cursor:pointer;transition:border-color var(--duration-fast),box-shadow var(--duration-fast)}
  .select>svg{position:absolute;right:var(--dim-x2_5);width:16px;height:16px;color:var(--fg-neutral-muted);pointer-events:none}
  .select select:hover{border-color:var(--stroke-neutral-stronger)} .select select:focus-visible{outline:none;border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  .select.sm select{height:32px;font-size:var(--font-size-t1);padding-left:var(--dim-x2_5)} .select.lg select{height:44px;font-size:var(--font-size-t3)}
  .select.error select{border-color:var(--stroke-critical)} .select select:disabled{background:var(--bg-neutral-weak);color:var(--fg-disabled);border-color:transparent;cursor:not-allowed}
  .select.ghost select{border-color:transparent;background:transparent;padding-left:var(--dim-x2)} .select.ghost select:hover{background:var(--bg-neutral-hover)}
  /* ── Settings dialog ── 왼쪽 목차 + 오른쪽 설정 행. Dialog 의 큰 변형 */
  .settings{display:grid;grid-template-columns:200px minmax(0,1fr);grid-template-rows:100%;width:100%;max-width:880px;height:520px;background:var(--bg-layer-floating);border-radius:var(--radius-xl);box-shadow:var(--shadow-3);overflow:hidden;text-align:left;position:relative;font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
  .settings__nav{display:flex;flex-direction:column;gap:2px;padding:var(--dim-x5) var(--dim-x3);background:var(--bg-layer-basement);border-right:1px solid var(--stroke-neutral);overflow:auto}
  .settings__title{font-size:var(--font-size-t4);font-weight:var(--font-weight-semibold);color:var(--fg-neutral);padding:0 var(--dim-x2) var(--dim-x3)}
  .settings__me{display:flex;align-items:center;gap:var(--dim-x2_5);padding:var(--dim-x2);margin-bottom:var(--dim-x2);border-radius:var(--radius-md)} .settings__me b{display:block;font-size:var(--font-size-t2);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .settings__me small{display:block;font-size:var(--font-size-t1);color:var(--fg-neutral-muted)} .settings__me .avatar{background:var(--bg-neutral-solid);color:var(--fg-on-neutral)} /* 목차 위 프로필: basement 바탕에서 묻히지 않게 잉크색 */
  .settings__label{font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted);padding:var(--dim-x3) var(--dim-x2) var(--dim-x1)}
  .settings__item{display:flex;align-items:center;gap:var(--dim-x2_5);width:100%;height:36px;padding:0 var(--dim-x2_5);border:0;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);color:var(--fg-neutral-subtle);text-align:left;cursor:pointer;transition:background var(--duration-fast),color var(--duration-fast)}
  .settings__item svg{width:18px;height:18px;color:var(--fg-neutral-muted)} .settings__item:hover{background:var(--bg-neutral-hover);color:var(--fg-neutral)}
  .settings__item.on{background:var(--bg-neutral-selected);color:var(--fg-neutral);font-weight:var(--font-weight-semibold)} .settings__item.on svg{color:var(--fg-neutral)}
  .settings__item:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .settings__ver{margin-top:auto;padding:var(--dim-x3) var(--dim-x2) 0;font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  .settings__body{display:flex;flex-direction:column;min-width:0;min-height:0}
  .settings__hd{display:flex;align-items:center;justify-content:space-between;flex:none;height:56px;padding:0 var(--dim-x4) 0 var(--dim-x8);border-bottom:1px solid var(--stroke-neutral)}
  .settings__crumb{display:flex;align-items:center;gap:var(--dim-x2);font-size:var(--font-size-t2);color:var(--fg-neutral-muted)} .settings__crumb i{font-style:normal;color:var(--fg-neutral-placeholder)} .settings__crumb b{font-weight:var(--font-weight-medium);color:var(--fg-neutral)}
  .settings__pane{flex:1;min-height:0;overflow:auto;padding:var(--dim-x5) var(--dim-x8) var(--dim-x8)} .settings__pane[hidden]{display:none}
  .settings__sec{font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold);color:var(--fg-neutral-muted);margin:var(--dim-x6) 0 var(--dim-x1)} .settings__sec:first-child{margin-top:0}
  .srow{display:flex;align-items:center;justify-content:space-between;gap:var(--dim-x6);padding:var(--dim-x3_5) 0;border-bottom:1px solid var(--stroke-neutral)} .srow:last-child{border-bottom:0}
  .srow__main{min-width:0} .srow__main>b{display:block;font-size:var(--font-size-t2);font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .srow__main small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted);margin-top:2px} .srow__main small b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral-subtle)}
  .srow__ctl{flex:none;display:flex;align-items:center;gap:var(--dim-x2)} .srow__ctl .field{min-width:220px}
  .srows{width:100%;max-width:560px;padding:0 var(--dim-x4);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default)} /* 문서 데모용 컨테이너 */
  /* 첨부 행 · 용량 바 */
  .sfile{display:flex;align-items:center;gap:var(--dim-x3);padding:var(--dim-x2_5) 0;border-bottom:1px solid var(--stroke-neutral)} .sfile:last-child{border-bottom:0}
  .sfile__thumb{width:36px;height:36px;border-radius:var(--radius-sm);flex:none;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;background:var(--bg-neutral-weak);color:var(--fg-neutral-subtle);font-size:12px;font-weight:var(--font-weight-bold);letter-spacing:.02em} .sfile__thumb img{width:100%;height:100%;object-fit:cover;display:block}
  .sfile__thumb.pdf{background:var(--bg-critical-weak);color:var(--fg-critical)} .sfile__thumb.hwp,.sfile__thumb.docx{background:var(--bg-info-weak);color:var(--fg-info)} .sfile__thumb.xlsx{background:var(--bg-positive-weak);color:var(--fg-positive)}
  .sfile__name{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--fg-neutral)} .sfile__meta{flex:none;width:56px;text-align:right;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums}
  .sbar{height:6px;border-radius:var(--radius-full);background:var(--bg-neutral-weak);overflow:hidden;margin:var(--dim-x2) 0 var(--dim-x3)} .sbar i{display:block;height:100%;min-width:6px;background:var(--bg-brand-solid);border-radius:inherit}
  .ssum{font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  /* 연결 상태 행 */
  .sstat{display:flex;align-items:center;gap:var(--dim-x3);min-height:40px;padding:var(--dim-x1) 0;border-bottom:1px solid var(--stroke-neutral)} .sstat:last-child{border-bottom:0}
  .sstat__dot{width:8px;height:8px;border-radius:50%;flex:none} .sstat__name{width:96px;flex:none;font-weight:var(--font-weight-medium);color:var(--fg-neutral)} .sstat__v{width:44px;flex:none;font-size:var(--font-size-t1);font-weight:var(--font-weight-semibold)} .sstat__note{font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  .sstat.ok .sstat__dot{background:var(--bg-positive-solid)} .sstat.ok .sstat__v{color:var(--fg-positive)} .sstat.part .sstat__dot{background:var(--bg-warning-solid)} .sstat.part .sstat__v{color:var(--fg-warning)} .sstat.off .sstat__dot{background:var(--bg-critical-solid)} .sstat.off .sstat__v{color:var(--fg-critical)}
  .snote{font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-subtle);margin:var(--dim-x4) 0 0} .snote b{color:var(--fg-neutral)} /* 위 선은 마지막 행의 아래 선이 맡는다 — 이중선 금지 */
  .slead{font-size:var(--font-size-t2);color:var(--fg-neutral);margin:0 0 var(--dim-x2)}
  .btn.critical-outline{background:var(--bg-layer-default);border-color:var(--stroke-critical);color:var(--fg-critical)} .btn.critical-outline:hover{background:var(--bg-critical-weak)}
`;
const PHOTO = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9d4cc"/><stop offset="1" stop-color="#a89f93"/></linearGradient></defs><rect width="96" height="96" fill="url(#g)"/><rect x="26" y="10" width="44" height="76" rx="2" fill="#fff"/><g stroke="#c9c4bb" stroke-width="3" stroke-linecap="round"><path d="M34 24h28M34 34h20M34 44h28M34 54h16M34 68h28"/></g></svg>');
const SHOT = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><rect width="96" height="96" fill="#fff"/><g stroke="#cfd3da" stroke-width="4" stroke-linecap="round"><path d="M14 20h40M14 34h68M14 48h56M14 62h68M14 76h30"/></g></svg>');
const file = (kind, name, size, when) => '<div class="sfile"><span class="sfile__thumb' + (kind === 'img' || kind === 'shot' ? '' : ' ' + kind) + '">' + (kind === 'img' ? '<img src="' + PHOTO + '" alt="">' : kind === 'shot' ? '<img src="' + SHOT + '" alt="">' : kind.toUpperCase()) + '</span><span class="sfile__name">' + name + '</span><span class="sfile__meta">' + size + '</span><span class="sfile__meta" style="width:36px">' + when + '</span><button class="btn xs neutral-outline">삭제</button></div>';
const stat = (k, name, v, note) => '<div class="sstat ' + k + '"><span class="sstat__dot"></span><span class="sstat__name">' + name + '</span><span class="sstat__v">' + v + '</span>' + (note ? '<span class="sstat__note">' + note + '</span>' : '') + '</div>';

const sel = (opts, cls) => '<label class="select' + (cls ? ' ' + cls : '') + '"><select>' + opts.map((o, i) => '<option' + (i === 0 ? ' selected' : '') + '>' + o + '</option>').join('') + '</select>' + icon('chevron-down') + '</label>';
const sw = (on) => '<label class="switch"><input type="checkbox"' + (on ? ' checked' : '') + '><span class="track"></span></label>';
const row = (t, d, ctl) => '<div class="srow"><div class="srow__main"><b>' + t + '</b>' + (d ? '<small>' + d + '</small>' : '') + '</div><div class="srow__ctl">' + ctl + '</div></div>';
const btn = (label, cls) => '<button class="btn sm ' + (cls || 'neutral-outline') + '">' + label + '</button>';
const linked = (name, d, on) => row(name, d, on ? '<span class="badge success">연결됨</span>' + btn('해제') : '<span class="badge">연결 안 됨</span>' + btn('연결', 'brand-solid'));

// 여섯 pane 의 내용 — 직원 앱 설정 레이어의 규격
export const PANES = [
  { id: 'profile', label: '프로필', icon: 'user-circle', group: '내 정보', body:
    '<div class="settings__sec">내 계정</div>' +
    row('프로필 사진', '이름 첫 글자가 기본입니다', '<span class="avatar s40">윤</span>' + btn('사진 바꾸기')) +
    row('표시 이름', '대화·결재 문서에 보이는 이름', '<div class="field md"><div class="ctrl"><input value="윤아린2"></div></div>') +
    row('이메일', '사내 계정. 여기서는 바꿀 수 없습니다', '<span class="badge">yoon@uxis.co.kr</span>') +
    row('부서', '인사 시스템에서 가져옵니다', '<span class="badge">확인되지 않음</span>') +
    row('직책', '', '<span class="badge">부장</span>') +
    row('오늘', '근태 시스템 기준', '<span class="badge success">퇴근</span>') +
    '<div class="settings__sec">자리 상태</div>' +
    row('지금 상태', '담당자 찾기에서 다른 사람에게 보입니다', sel(['자리에 있음', '자리 비움', '외근', '회의 중'])) },
  { id: 'notify', label: '알림', icon: 'bell', group: '내 정보', body:
    '<div class="settings__sec">받을 알림</div>' +
    row('결재 알림', '내 처리 대기·반려·승인 완료', sw(true)) +
    row('일정·회의 알림', '시작 10분 전', sw(true)) +
    row('오늘의 브리핑', '출근 뒤 첫 대화에 브리핑을 붙입니다', sw(true)) +
    '<div class="settings__sec">시간</div>' +
    row('브리핑 시각', '', sel(['09:00', '08:30', '10:00'])) +
    row('방해 금지', '이 시간에는 알림을 모아 두었다가 한 번에', sel(['없음', '18:00 – 09:00', '주말 전체'])) },
  { id: 'files', label: '첨부', icon: 'paperclip', group: '내 정보', body:
    '<div class="settings__sec">내 첨부</div>' +
    '<div class="ssum">파일 4개 · 6.9MB / 2.0GB</div><div class="sbar"><i style="width:1%"></i></div>' +
    file('shot', 'image.png', '881KB', '9/10') + file('hwp', '25년 활용 가이드라인_22-27_기업 회계처리 기준 데이터.hwp', '2.2MB', '9/7') + file('img', '20260829_202529-영수증.jpg', '897KB', '9/7') + file('pdf', 'U+_통화매니저_기업관리자_매뉴얼_v2.pdf', '3.0MB', '9/7') +
    '<p class="snote"><b>문서</b>(PDF·워드·엑셀·한글 등)는 올릴 때 서버가 글을 뽑아 에이전트에게 함께 넘깁니다. 스캔한 그림처럼 글자가 없는 파일은 보관만 되고, 그럴 때는 붙일 때 그렇다고 알려 드립니다. 사진은 에이전트가 직접 봅니다.</p>' },
  { id: 'agent', label: '에이전트', icon: 'sparkles', group: '에이전트', body:
    '<div class="settings__sec">자동으로 하는 일</div>' +
    row('업무일지 자동 초안', '연동 소스(SVN·일정·결재)로 초안을 만들어 둡니다', sw(true)) +
    row('제안 프롬프트 표시', '홈의 「이렇게 물어보셔도 됩니다」', sw(true)) +
    '<div class="settings__sec">실행 전 확인</div>' +
    row('확인을 받는 범위', '상신·승인·기록처럼 되돌릴 수 없는 행동은 항상 확인합니다', sel(['되돌릴 수 없는 행동만', '모든 변경', '항상 묻기'])) +
    row('답변 길이', '', sel(['보통', '짧게', '자세히'])) },
  { id: 'connect', label: '연결 상태', icon: 'plug-connected', group: '에이전트', body:
    '<p class="slead">사내 시스템 9종 중 6종이 정상입니다.</p>' +
    stat('ok', '근태', '정상') + stat('ok', '연차', '정상') + stat('ok', '결재', '정상') + stat('part', '업무일지', '일부', '일부 항목이 아직 제공되지 않습니다') + stat('ok', '일정·회의', '정상') + stat('ok', '회의실', '정상') + stat('ok', '외근·출장', '정상') + stat('part', '구성원', '일부', '일부 항목이 아직 제공되지 않습니다') + stat('off', '사내 규정', '끊김', '아직 제공되지 않는 기능입니다') +
    '<p class="snote"><b>끊김·일부</b>는 그 기능이 화면에서 비어 보인다는 뜻입니다. 사유가 <b>권한·키</b>면 관리자에게 문의해 주세요. <b>아직 제공되지 않는 기능</b>은 사내 시스템에 그 기능이 준비되면 자동으로 켜집니다. <b>예시</b>는 실데이터가 아니라 시연용 값입니다.</p>' },
  { id: 'display', label: '화면', icon: 'palette', group: '앱', body:
    '<div class="settings__sec">모양</div>' +
    row('테마', '시스템 설정을 따르거나 고정합니다', sel(['시스템', '라이트', '다크'])) +
    row('밀도', '촘촘하게는 관리자 화면 기본', sel(['기본', '촘촘하게'])) +
    row('사이드바 기본 상태', '', sel(['펼침', '접힘'])) +
    '<div class="settings__sec">언어</div>' + row('언어', '', sel(['한국어', 'English'])) },
  { id: 'account', label: '계정', icon: 'shield-lock', group: '앱', body:
    '<div class="settings__sec">보안</div>' +
    row('비밀번호', '마지막 변경 2026-06-02', btn('변경')) +
    row('접속 기기', '지금 3대에서 로그인되어 있습니다', btn('모두 로그아웃')) +
    '<div class="settings__sec">접속</div>' +
    row('접속 끊기', '이 에이전트는 <b>내 계정으로만</b> 근태·연차·결재를 읽고 씁니다. 접속을 끊으면 다시 들어올 때 관리자에게 받은 진입 코드가 필요합니다', btn('접속 끊기', 'critical-outline')) },
];

// active: 보여 줄 pane id. all=true 면 여섯 pane 을 모두 넣고 hidden 으로 감춘다(실제 앱), false 면 active 하나만(문서 데모)
export const settingsMarkup = (active, all) => {
  const groups = [...new Set(PANES.map(p => p.group))];
  const nav = groups.map(g => '<div class="settings__label">' + g + '</div>' + PANES.filter(p => p.group === g).map(p => '<button class="settings__item' + (p.id === active ? ' on' : '') + '" data-pane="' + p.id + '">' + icon(p.icon) + p.label + '</button>').join('')).join('');
  const panes = (all ? PANES : PANES.filter(p => p.id === active)).map(p => '<div class="settings__pane" data-pane="' + p.id + '"' + (p.id === active ? '' : ' hidden') + '>' + p.body + '</div>').join('');
  const title = PANES.find(p => p.id === active).label;
  return '<div class="settings" role="dialog" aria-modal="true" aria-labelledby="settingsTitle"><nav class="settings__nav" aria-label="설정 메뉴"><div class="settings__title" id="settingsTitle">설정</div><div class="settings__me"><span class="avatar s40">윤</span><span><b>윤아린2</b><small>디자인1팀1 · 부장</small></span></div>' + nav + '<div class="settings__ver">Waple Agent 1.4.2</div></nav><div class="settings__body"><div class="settings__hd"><div class="settings__crumb"><span>설정</span><i>/</i><b data-title>' + title + '</b></div><button class="iconbtn md ghost" data-close aria-label="닫기">' + icon('x') + '</button></div>' + panes + '</div></div>';
};

export const pages = `
<section class="page" id="components/select">
  <h1>Select</h1>
  <p class="desc">몇 개 안 되는 선택지에서 하나를 고릅니다. 브라우저 기본 <code>&lt;select&gt;</code> 에 시스템 모양만 입혀 키보드·모바일 동작은 브라우저가 맡습니다. 항목이 스무 개를 넘거나 검색이 필요하면 Select 로 담지 않고 표·목록 화면에서 고르게 합니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><div class="field md"><label>테마</label>${sel(['시스템', '라이트', '다크'])}<div class="help">시스템 설정을 따르거나 고정합니다</div></div></div>
    <ol><li><b>Label</b> — Text input 과 같은 <code>.field</code> 라벨</li><li><b>Control</b> — 36px, 1px 선, 라운드 sm</li><li><b>Chevron</b> — 오른쪽 16px chevron-down, muted</li><li><b>Help</b> (선택) — t1 muted</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo">${sel(['sm · 32px', '짧게', '자세히'], 'sm')}${sel(['md · 36px', '라이트', '다크'])}${sel(['lg · 44px', 'English'], 'lg')}</div>
  <table><tr><th>크기</th><th>높이</th><th>쓰임</th></tr><tr><td>sm</td><td>32px</td><td>표 필터·툴바 — 좁은 자리에만</td></tr><tr><td>md</td><td>36px</td><td>기본 — 폼·설정 행. Text input md 와 같은 높이</td></tr><tr><td>lg</td><td>44px</td><td>모바일 폼</td></tr></table>
  <h3>Variant</h3>
  <div class="demo">${sel(['기본 — 선 있음', '…'])}${sel(['ghost — 선 없음', '…'], 'ghost')}</div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>기본</td><td>폼·설정 행</td></tr><tr><td>ghost</td><td>표 머리·툴바처럼 선이 시끄러운 자리. hover 에만 배경</td></tr></table>
  <h3>State</h3>
  <div class="demo">${sel(['기본', '…'])}<label class="select"><select style="border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)"><option>focus</option></select>${icon('chevron-down')}</label>${sel(['error', '…'], 'error')}<label class="select"><select disabled><option>disabled</option></select>${icon('chevron-down')}</label></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>기본값을 첫 항목으로 두고 <b>선택된 상태</b>로 보여 줍니다. 「선택하세요」 빈 값은 필수 입력일 때만.</div>
    <div class="dont"><b>Don&#39;t</b>항목이 둘이면 Switch·Segmented, 셋 이하로 한눈에 비교해야 하면 Radio. Select 는 4~20개.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>설정 행·폼 모두 md(36px) — 같은 행의 Text input·Button 과 높이를 맞춥니다. 한 화면에 select 높이를 섞지 않습니다. sm 은 표 필터·툴바처럼 좁은 자리에만.</div>
    <div class="dont"><b>Don&#39;t</b>커스텀 드롭다운을 새로 만들지 않습니다 — 검색·다중 선택이 필요하면 표·목록 화면에서 고르게 합니다.</div>
  </div>
  <h2>Select vs. Segmented vs. Radio</h2>
  <table><tr><th></th><th>Select</th><th>Segmented</th><th>Radio</th></tr><tr><td>항목 수</td><td>4~20</td><td>2~4</td><td>2~5</td></tr><tr><td>보이는 것</td><td>선택된 하나</td><td>전부</td><td>전부</td></tr><tr><td>자리</td><td>폼·설정 행</td><td>패널 머리</td><td>폼</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>선 / 배경 / 라운드</td><td><code>--stroke-neutral-strong</code> / <code>--bg-layer-default</code> / <code>--radius-sm</code></td></tr><tr><td>글자</td><td>sm t1 · md t2 · lg t3, <code>--fg-neutral</code></td></tr><tr><td>chevron</td><td>16px <code>--fg-neutral-muted</code>, 오른쪽 <code>--dim-x2_5</code></td></tr><tr><td>focus / error / disabled</td><td>accent 링 / <code>--stroke-critical</code> / <code>--bg-neutral-weak</code>+<code>--fg-disabled</code></td></tr><tr><td>접근성</td><td>기본 <code>&lt;select&gt;</code> — 라벨은 <code>&lt;label for&gt;</code>, 키보드·스크린리더는 브라우저 기본</td></tr></table>
</section>

<section class="page" id="components/settings-dialog">
  <h1>Settings dialog</h1>
  <p class="desc">프로필·알림·에이전트·연동·화면·계정을 한 레이어에 모은 설정 창. 사이드바의 프로필이나 「설정」을 누르면 화면 위에 뜹니다. 왼쪽은 목차, 오른쪽은 <b>설정 행</b>(제목·설명 + 오른쪽 컨트롤)이 이어집니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%;padding:0;overflow:hidden"><div class="dialog-stage" style="padding:var(--dim-x8)">${settingsMarkup('notify', false)}</div></div>
    <ol><li><b>Nav</b> — 200px, basement 바탕. 제목 「설정」 · 내 프로필 · 그룹 라벨 + 항목(아이콘 18 + 라벨) · 맨 아래 버전</li><li><b>Header</b> — 브레드크럼 「설정 / 현재 pane」(t2, 현재만 진하게) + 닫기 iconbtn, 56px</li><li><b>Pane</b> — 섹션 라벨(t1 muted) 아래 설정 행. 스크롤은 pane 안에서만</li><li><b>Setting row</b> — 제목 t2 600 + 설명 t1 muted, 오른쪽에 Switch · Select · Button · Badge 중 하나</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Row — 컨트롤 종류</h3>
  <div class="demo col">
    <figure class="ex"><div class="srows">${row('결재 알림', '내 처리 대기·반려·승인 완료', sw(true))}</div><figcaption>switch — 켜고 끄면 즉시 저장</figcaption></figure>
    <figure class="ex"><div class="srows">${row('테마', '시스템 설정을 따르거나 고정합니다', sel(['시스템', '라이트', '다크']))}</div><figcaption>select — 고르면 즉시 저장</figcaption></figure>
    <figure class="ex"><div class="srows">${row('비밀번호', '마지막 변경 2026-06-02', btn('변경'))}</div><figcaption>button — 다음 단계(Dialog·별도 화면)로</figcaption></figure>
    <figure class="ex"><div class="srows">${linked('경비', '지출결의 · 영수증', false)}</div><figcaption>status + button — 연동처럼 상태가 먼저 보여야 할 때</figcaption></figure>
    <figure class="ex"><div class="srows">${row('표시 이름', '대화·결재 문서에 보이는 이름', '<div class="field md"><div class="ctrl"><input value="윤아린2"></div></div>')}</div><figcaption>input — blur 때 저장, 오류는 행 아래</figcaption></figure>
    <figure class="ex"><div class="srows">${stat('ok', '근태', '정상') + stat('part', '업무일지', '일부', '일부 항목이 아직 제공되지 않습니다') + stat('off', '사내 규정', '끊김', '아직 제공되지 않는 기능입니다')}</div><figcaption>status — 연결 상태. 점 + 상태 어휘(정상 success · 일부 warning · 끊김 danger) + 사유</figcaption></figure>
    <figure class="ex"><div class="srows"><div class="ssum">파일 4개 · 6.9MB / 2.0GB</div><div class="sbar"><i style="width:1%"></i></div>${file('shot', 'image.png', '881KB', '9/10') + file('pdf', 'U+_통화매니저_기업관리자_매뉴얼_v2.pdf', '3.0MB', '9/7')}</div><figcaption>file — 첨부. 썸네일(이미지 미리보기 / 확장자) + 이름 + 크기 + 날짜 + 삭제</figcaption></figure>
  </div>
  <h3>Panes</h3>
  <table><tr><th>그룹</th><th>Pane</th><th>행</th></tr>
    <tr><td rowspan="3">내 정보</td><td>프로필</td><td>내 계정 — 프로필 사진 · 표시 이름 · 이메일 · 부서 · 직책 · 오늘(근태 상태) — 읽기 값은 Badge · 자리 상태</td></tr>
    <tr><td>알림</td><td>결재 · 일정·회의 · 브리핑 스위치 · 브리핑 시각 · 방해 금지</td></tr>
    <tr><td>첨부</td><td>내 첨부 — 파일 수·용량 바 · 파일 행(썸네일·이름·크기·날짜·삭제) · 문서 처리 안내</td></tr>
    <tr><td rowspan="2">에이전트</td><td>에이전트</td><td>업무일지 자동 초안 · 제안 프롬프트 · 확인 범위 · 답변 길이</td></tr>
    <tr><td>연결 상태</td><td>사내 시스템 9종(근태 · 연차 · 결재 · 업무일지 · 일정·회의 · 회의실 · 외근·출장 · 구성원 · 사내 규정) — 점 + 정상/일부/끊김 + 사유 · 안내</td></tr>
    <tr><td rowspan="2">앱</td><td>화면</td><td>테마 · 밀도 · 사이드바 기본 · 언어</td></tr>
    <tr><td>계정</td><td>비밀번호 · 접속 기기 · 접속 끊기(critical-outline, 진입 코드 안내)</td></tr></table>
  <h3>Size · State</h3>
  <table><tr><th>항목</th><th>값</th></tr><tr><td>크기</td><td>880 × <b>화면 높이의 80%</b>(최대 92vw). 768px 아래에서는 전체 화면, 목차는 위쪽 가로 탭</td></tr><tr><td>열기</td><td>사이드바 프로필 클릭 · 「설정」 아이콘 버튼 · <code>,</code>(Ctrl+,) 단축키</td></tr><tr><td>닫기</td><td>× · ESC · 바깥 클릭. 저장 버튼 없음 — 행마다 즉시 저장, 실패하면 그 행 아래 오류</td></tr><tr><td>읽기 전용</td><td>부서·직책·오늘처럼 사내 시스템에서 오는 값은 Badge 로 보여 주고, 왜 못 바꾸는지 설명에 적습니다</td></tr><tr><td>포커스</td><td>열리면 현재 pane 항목으로, 닫히면 열었던 버튼으로 되돌립니다. Tab 은 창 안에서만</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>행 하나에 컨트롤 하나. 설명은 「무엇이 바뀌는지」 한 줄 — 「결재 알림」 아래 「내 처리 대기·반려·승인 완료」.</div>
    <div class="dont"><b>Don&#39;t</b>하단에 「저장」「취소」를 두지 않습니다. 즉시 저장이 원칙이고, 되돌릴 수 없는 것(연동 해제·모두 로그아웃)만 확인 Dialog 를 겹칩니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>읽기 전용 값(이메일·팀)은 Badge 로 보여 주고 왜 못 바꾸는지 설명에 적습니다.</div>
    <div class="dont"><b>Don&#39;t</b>pane 하나가 두 화면을 넘으면 pane 을 쪼갭니다 — 목차는 여덟 개까지.</div>
  </div>
  <h2>Settings dialog vs. Dialog</h2>
  <table><tr><th></th><th>Settings dialog</th><th>Dialog</th></tr><tr><td>목적</td><td>여러 설정을 둘러보며 바꿈</td><td>행동 하나를 확인</td></tr><tr><td>크기</td><td>880 × 80vh, 목차 있음</td><td>360 · 480</td></tr><tr><td>저장</td><td>행마다 즉시</td><td>주요 버튼 하나</td></tr><tr><td>닫기</td><td>× · ESC · 바깥</td><td>취소 · ESC · 바깥</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>창</td><td>880 × 80vh(문서 데모는 520) · <code>--bg-layer-floating</code> · <code>--radius-xl</code> · <code>--shadow-3</code> · overlay <code>--bg-overlay</code></td></tr><tr><td>Nav</td><td>200px · <code>--bg-layer-basement</code> · 오른쪽 선 <code>--stroke-neutral</code> · 항목 36px t2, 선택 <code>--bg-neutral-selected</code> 600</td></tr><tr><td>Header</td><td>56px · 브레드크럼 t2 — 「설정」 muted · 「/」 placeholder · 현재 pane 500 ink · 아래 선 <code>--stroke-neutral</code></td></tr><tr><td>Pane</td><td>패딩 <code>--dim-x5 --dim-x8 --dim-x8</code> · 섹션 라벨 t1 600 muted</td></tr><tr><td>Row</td><td>세로 패딩 <code>--dim-x3_5</code> · 제목 t2 600 · 설명 t1 muted · 아래 선 <code>--stroke-neutral</code> · 컨트롤 사이 <code>--dim-x2</code></td></tr><tr><td>Lead</td><td>pane 첫 줄 요약(「9종 중 6종이 정상」) t2 ink — 섹션 라벨과 겹쳐 두 층으로 보이지 않게 라벨 없이</td></tr><tr><td>Status row</td><td>40px · 점 8px(<code>--bg-positive/warning/critical-solid</code>) · 이름 96px 500 · 상태 t1 600 상태색 · 사유 t1 muted</td></tr><tr><td>File row</td><td>썸네일 36px <code>--radius-sm</code>(이미지 cover / 확장자 12px 700 역할 틴트) · 이름 t2 · 크기·날짜 t1 muted tabular · 삭제 xs outline</td></tr><tr><td>용량 바</td><td>6px · <code>--bg-neutral-weak</code> 위 <code>--bg-brand-solid</code>, 최소 6px</td></tr><tr><td>접근성</td><td><code>role="dialog" aria-modal aria-labelledby</code> · 목차는 <code>&lt;nav&gt;</code> + <code>aria-current</code> · 스위치·셀렉트는 각 컴포넌트 규칙</td></tr></table>
</section>
`;

export const nav = [['components/select', 'Select'], ['components/settings-dialog', 'Settings dialog']];
