// 에이전트 전용: Composer · Sidebar nav · Agent notice
import { icon } from './icons.mjs';
import { attach } from './chat.mjs'; // 첨부 칩은 Attachment 컴포넌트 하나로
const S = { clip: icon('paperclip'), spark: icon('sparkles'), plus: icon('plus'), home: icon('home'), users: icon('users'), chart: icon('chart-bar'), doc: icon('file-text'), clock: icon('clock'), collapse: icon('layout-sidebar-left-collapse'), out: icon('arrow-up-right'), chevDown: icon('chevron-down') };

export const css = `
  /* ── Composer ── */
  .composer{width:100%;max-width:640px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);padding:var(--dim-x4);display:flex;flex-direction:column;gap:var(--dim-x3);transition:border-color var(--duration-fast),box-shadow var(--duration-fast)}
  .composer:focus-within,.composer.focus{border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  .composer textarea{border:0;background:transparent;font:inherit;font-size:var(--font-size-t3);line-height:var(--line-height-t3);color:var(--fg-neutral);resize:none;min-height:44px;outline:none;padding:0} .composer textarea::placeholder{color:var(--fg-neutral-placeholder)}
  .composer__bar{display:flex;align-items:center;gap:var(--dim-x2)} .composer__bar .right{margin-left:auto}
  .composer .cta{display:inline-flex;align-items:center;gap:var(--dim-x1_5);height:36px;padding:0 var(--dim-x4);border:0;border-radius:var(--radius-full);background:var(--gradient-glow);box-shadow:var(--shadow-glow);color:var(--fg-on-brand);font:inherit;font-size:var(--font-size-t3);font-weight:var(--font-weight-semibold);line-height:normal;cursor:pointer;transition:filter var(--duration-fast)}
  .composer .cta svg{width:18px;height:18px} .composer .cta:hover{filter:brightness(1.05)}
  .composer .cta:focus-visible{outline:none;box-shadow:var(--shadow-glow),0 0 0 3px var(--bg-layer-default),0 0 0 5px var(--stroke-focus)}
  .composer .cta:disabled,.composer.disabled .cta{background:var(--bg-neutral-weak);box-shadow:none;color:var(--fg-disabled);cursor:not-allowed}
  .composer .cta .spin{width:14px;height:14px;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;animation:spin .8s linear infinite}
  .composer.disabled{background:var(--bg-neutral-weak);border-color:transparent} .composer.disabled textarea{color:var(--fg-disabled)}
  /* ── Sidebar nav ── */
  .sbnav{width:var(--layout-sidebar);height:440px;display:flex;flex-direction:column;background:var(--bg-layer-basement);border-right:1px solid var(--stroke-neutral);font-size:var(--font-size-t2);color:var(--fg-neutral);overflow:hidden;border-radius:var(--radius-md) 0 0 var(--radius-md)}
  .sbnav__top{display:flex;align-items:center;justify-content:space-between;height:var(--layout-topbar);padding:0 var(--dim-x3) 0 var(--dim-x4);font-weight:var(--font-weight-bold);font-size:var(--font-size-t3)} .sbnav__top i{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--bg-accent-solid);margin-right:var(--dim-x2)}
  .sbnav__body{flex:1;overflow:auto;padding:var(--dim-x1) var(--dim-x2)}
  .sbnav__label{display:flex;justify-content:space-between;align-items:center;padding:var(--dim-x3) var(--dim-x2) var(--dim-x1);font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-weight:var(--font-weight-medium)}
  .sbnav__label.fold{cursor:pointer;width:100%;border:0;background:none;font:inherit;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);text-align:left} .sbnav__label.fold:hover{color:var(--fg-neutral)} .sbnav__label.fold svg{width:14px;height:14px;color:var(--fg-neutral-placeholder)} .sbnav__label.fold[aria-expanded="false"] svg{transform:rotate(-90deg)}
  .sbnav__item .out{margin-left:auto;display:inline-flex;color:var(--fg-neutral-placeholder)} .sbnav__item .out svg{width:13px;height:13px;color:inherit} .sbnav__item:hover .out{color:var(--fg-neutral-muted)}
  .sbnav__item{display:flex;align-items:center;gap:var(--dim-x2_5);height:32px;padding:0 var(--dim-x2_5);border-radius:var(--radius-sm);color:var(--fg-neutral);text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .sbnav__item svg{width:18px;height:18px;color:var(--fg-neutral-subtle)}
  .sbnav__item .n{margin-left:auto;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums}
  .sbnav__item:hover{background:var(--bg-neutral-hover)} .sbnav__item.on{background:var(--bg-neutral-selected);font-weight:var(--font-weight-semibold)} .sbnav__item.on svg{color:var(--fg-neutral)}
  .sbnav__item:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .sbnav__conv{display:flex;justify-content:space-between;height:30px;align-items:center;padding:0 var(--dim-x2_5);border-radius:var(--radius-sm);font-size:var(--font-size-t1);color:var(--fg-neutral-subtle);white-space:nowrap;overflow:hidden;text-overflow:ellipsis} .sbnav__conv:hover{background:var(--bg-neutral-hover)} .sbnav__conv.on{background:var(--bg-neutral-selected);color:var(--fg-neutral);font-weight:var(--font-weight-semibold)}
  .sbnav__user{display:flex;align-items:center;gap:var(--dim-x2_5);padding:var(--dim-x3) var(--dim-x4);border-top:1px solid var(--stroke-neutral)} .sbnav__user b{display:block;font-size:var(--font-size-t2);font-weight:var(--font-weight-semibold)} .sbnav__user small{display:block;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);margin-top:2px} .sbnav__user small em{font-style:normal;color:var(--fg-accent);font-weight:var(--font-weight-semibold)}
  .sbnav.rail{width:56px} .sbnav.rail .sbnav__item{justify-content:center;padding:0} .sbnav.rail .sbnav__item span,.sbnav.rail .sbnav__label,.sbnav.rail .sbnav__conv,.sbnav.rail .sbnav__user span,.sbnav.rail .sbnav__top span{display:none} .sbnav.rail .sbnav__top{justify-content:center;padding:0} .sbnav.rail .sbnav__user{justify-content:center;padding:var(--dim-x3) 0}
  /* ── Agent notice ── */
  .notice{display:flex;gap:var(--dim-x2_5);align-items:flex-start;max-width:640px;padding:var(--dim-x3) var(--dim-x4);border-radius:var(--radius-md);background:var(--bg-accent-weak);color:var(--fg-neutral);font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
  .notice svg{width:16px;height:16px;margin-top:2px;color:var(--fg-accent)} .notice b{font-weight:var(--font-weight-semibold)}
  .notice.warning{background:var(--bg-warning-weak)} .notice.warning svg{color:var(--fg-warning)} .notice.sample{background:var(--bg-sample-weak)} .notice.sample svg{color:var(--fg-sample)}
  .notice.compact{padding:var(--dim-x2) var(--dim-x3);font-size:var(--font-size-t1);border-radius:var(--radius-sm)}
`;

const iconbtn = (cls, icon, label) => '<button class="iconbtn ' + cls + '" aria-label="' + label + '">' + icon + '</button>';
const composer = (cls, extra) => '<div class="composer ' + cls + '"><textarea placeholder="무엇이든 물어보세요. Shift+Enter 로 줄바꿈"></textarea>' + (extra || '') + '<div class="composer__bar">' + iconbtn('md outline', S.clip, '파일 첨부') + '<button class="btn sm neutral-outline">계획 세우기</button><button class="cta right">' + S.spark + '에이전트에게 맡기기</button></div></div>';
const sbItem = (cls, icon, label, n, out) => '<a class="sbnav__item ' + cls + '" href="#"' + (out ? ' target="_blank" rel="noopener"' : '') + '>' + icon + '<span>' + label + '</span>' + (n ? '<span class="n">' + n + '</span>' : '') + (out ? '<span class="out" aria-hidden="true">' + S.out + '</span>' : '') + '</a>';
const sidebar = (cls) => '<div class="sbnav ' + cls + '"><div class="sbnav__top"><span>Waple Agent</span>' + iconbtn('sm ghost', S.collapse, '사이드바 접기') + '</div><div class="sbnav__body">' +
  sbItem('', S.plus, '새 대화') + sbItem('on', S.spark, '에이전트') + sbItem('', S.users, '임직원 현황') + sbItem('', S.chart, '팀 현황판') +
  '<button class="sbnav__label fold" aria-expanded="true"><span>사내 시스템</span>' + S.chevDown + '</button>' + sbItem('', S.home, '종합현황', '', true) + sbItem('', S.doc, '전자결재', '6', true) + sbItem('', S.clock, '근태', '', true) +
  '<div class="sbnav__label"><span>대화</span><span>12</span></div><a class="sbnav__conv on" href="#">연차 잔여 현황 및 사용 내역 확인</a><a class="sbnav__conv" href="#">출근 기록 #3</a><a class="sbnav__conv" href="#">이번 주 출퇴근 현황 요약 #2</a>' +
  '</div><div class="sbnav__user"><span class="avatar s40">윤</span><span><b>윤아린2</b><small>디자인1팀1 · 부장 · <em>연결 4</em></small></span></div></div>';
const notice = (cls, text) => '<div class="notice ' + cls + '">' + S.spark + '<span>' + text + '</span></div>';

export const pages = `
<section class="page" id="components/composer">
  <h1>Composer</h1>
  <p class="desc">에이전트에게 말을 거는 입력창. 화면 하단에 하나만 있고, 오른쪽의 글로우 CTA 는 이 시스템에서 틸을 채우고 흰 글자를 쓰는 <b>유일한</b> 자리입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${composer('')}</div>
    <ol><li><b>Textarea</b> — t3, 자동 높이, 라벨 없음(placeholder 가 안내)</li><li><b>Attach</b> — outline iconbtn</li><li><b>Plan</b> — 「계획 세우기」 sm outline: 바로 실행 대신 계획부터</li><li><b>Glow CTA</b> — 「에이전트에게 맡기기」 gradient + glow</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>State</h3>
  <div class="demo col">${composer('focus')}<div class="composer"><textarea>이번주 근태 어때?</textarea><div class="composer__bar">${iconbtn('md outline', S.clip, '파일 첨부')}<button class="btn sm neutral-outline">계획 세우기</button><button class="cta right"><span class="spin"></span>보내는 중</button></div></div>${composer('disabled')}</div>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>default</td><td>1px 선</td></tr><tr><td>focus</td><td><code>--stroke-accent</code> + 3px accent-weak 링</td></tr><tr><td>sending</td><td>CTA 라벨 → 스피너 + 「보내는 중」, 폭 유지. 입력은 잠그지 않습니다</td></tr><tr><td>disabled</td><td>회색 채움 — 게이트웨이 연결 끊김 등, 이유를 Agent notice 로 위에 알립니다</td></tr></table>
  <h3>Variant</h3>
  <div class="demo col">${composer('', '<div class="attach__group">' + attach({ kind: 'img', name: '영수증_0915.jpg', meta: 'JPG · 1.2MB', remove: true }) + attach({ kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB · 3쪽', remove: true }) + attach({ kind: 'xlsx', name: '경비_내역_2026-09.xlsx', meta: 'XLSX · 36KB', remove: true }) + '</div>')}</div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>default</td><td>홈·대화 화면 하단</td></tr><tr><td>with-attachments</td><td>텍스트 아래 <a href="#components/attachment">Attachment</a> lg 칩 행(줄바꿈). 이미지는 44 썸네일, 문서는 확장자 배지 + 이름·메타. 지우기는 칩 오른쪽 위 모서리의 검은 원</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>Enter 로 전송, Shift+Enter 로 줄바꿈. placeholder 에 그 사실을 적습니다.</div>
    <div class="dont"><b>Don&#39;t</b>글로우 CTA 를 화면에 둘 두지 않습니다. 컴포저 밖의 「맡기기」는 검정 Button.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>글로우 위 흰 글자는 15px 600 이상 — AA large(3:1) 기준을 넘기는 최소 크기입니다.</div>
    <div class="dont"><b>Don&#39;t</b>CTA 를 sm 으로 줄이거나 글자를 t2 로 낮추지 않습니다. 줄여야 하면 아이콘 전용 solid iconbtn 으로.</div>
  </div>
  <h2>Composer vs. Text input</h2>
  <table><tr><th></th><th>Composer</th><th>Text input</th></tr><tr><td>내용</td><td>자연어 요청</td><td>폼의 값 하나</td></tr><tr><td>제출</td><td>Enter · 글로우 CTA</td><td>폼 버튼</td></tr><tr><td>개수</td><td>화면당 하나</td><td>여럿</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>상자</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · <code>--dim-x4</code></td></tr><tr><td>글자</td><td>t3 · placeholder <code>--fg-neutral-placeholder</code></td></tr><tr><td>CTA</td><td><code>--gradient-glow</code> + <code>--shadow-glow</code> · 36px · t3 600 · 흰 글자(예외)</td></tr><tr><td>첨부 타일</td><td>56px · <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · 이미지 <code>object-fit:cover</code> · 확장자 썸네일 48px <code>--bg-neutral-weak</code>+<code>--fg-neutral-subtle</code>(종류별 색 없음) · 이름 t1 500 · 크기 12px muted · × 14px <code>--bg-neutral-solid</code></td></tr>
    <tr><td>CTA disabled</td><td><code>--bg-neutral-weak</code> + <code>--fg-disabled</code>, 글로우 없음</td></tr><tr><td>포커스</td><td>상자: accent 링 · CTA: 흰 3px + <code>--stroke-focus</code></td></tr><tr><td>접근성</td><td>textarea 에 <code>aria-label="에이전트에게 요청"</code>, 전송 중엔 <code>aria-busy</code></td></tr></table>
</section>

<section class="page" id="components/sidebar-nav">
  <h1>Sidebar nav</h1>
  <p class="desc">248px 통합 사이드바(계획서 §11-15). 화면 이동 · 사내 시스템 · 대화 이력 · 사용자를 한 열에 담고, 좁은 화면에서는 56px 레일로 접힙니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="padding:0;overflow:hidden;min-width:0">${sidebar('')}</div>
    <ol><li><b>Top</b> — 로고 + 접기 iconbtn, 46px</li><li><b>Item</b> — 18px 아이콘 + 라벨, 32px. 선택은 selected 배경 + 600</li><li><b>Section label</b> — t1 muted, 오른쪽에 수. 「사내 시스템」처럼 접히는 그룹은 chevron 이 붙고 눌러서 접습니다(상태 기억)</li><li><b>Conversation</b> — t1, 30px, 최근 5개 + 「모든 대화 보기」</li><li><b>User</b> — 아바타 40 + 이름 t2 600 + 소속 t1 + 연결 수(틸)</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="padding:0;overflow:hidden;gap:var(--dim-x6)">${sidebar('')}${sidebar('rail')}</div>
  <table><tr><th>Variant</th><th>폭</th><th>언제</th></tr><tr><td>expanded</td><td>248px</td><td>≥ 1180px 기본</td></tr><tr><td>rail</td><td>56px</td><td>사용자가 접었을 때, 1024~1180px. 아이콘만 + 툴팁 필수</td></tr><tr><td>drawer</td><td>화면 폭 - 56</td><td>&lt; 768px: 오버레이로 열림(계획서 §7.1)</td></tr></table>
  <h3>State</h3>
  <table><tr><th>상태</th><th>표현</th></tr><tr><td>hover</td><td><code>--bg-neutral-hover</code></td></tr><tr><td>selected(현재 화면)</td><td><code>--bg-neutral-selected</code> + 600 + 아이콘 진하게</td></tr><tr><td>count</td><td>오른쪽 t1 muted — 처리할 것이 있으면 danger 배지 대신 숫자만</td></tr><tr><td>external</td><td>다른 창으로 나가는 항목(사내 시스템)은 오른쪽 끝에 arrow-up-right 13px placeholder 색, hover 에 muted. 아이콘은 위 항목들과 같은 18px 단색 — 타일·배경·항목별 색을 주지 않습니다</td></tr><tr><td>folded</td><td>그룹 라벨을 누르면 항목이 접힙니다. chevron 이 -90° 로 돌고, 상태는 기억합니다</td></tr><tr><td>focus</td><td>안쪽 2px accent 링</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>순서는 고정: 새 대화 → 에이전트 → 현황 → 사내 시스템 → 대화 → 사용자. 사내 시스템 항목은 설정에서 켠 것만.</div>
    <div class="dont"><b>Don&#39;t</b>항목에 틸 배경이나 굵은 왼쪽 막대를 두지 않습니다 — 선택은 회색 채움 하나로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>레일 상태에서는 모든 항목에 툴팁(오른쪽) — 라벨이 사라졌으니까.</div>
    <div class="dont"><b>Don&#39;t</b>사이드바 안에 스크롤 영역을 둘 만들지 않습니다 — 본문 하나만 스크롤, 상단·사용자는 고정.</div>
  </div>
  <h2>Sidebar nav vs. Segmented control</h2>
  <table><tr><th></th><th>Sidebar nav</th><th>Segmented</th></tr><tr><td>뜻</td><td>화면(라우트) 이동</td><td>같은 화면의 보기 전환</td></tr><tr><td>항목 수</td><td>제한 없음, 섹션으로 묶음</td><td>2~4</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>폭 / 바탕 / 오른쪽 선</td><td><code>--layout-sidebar</code> / <code>--bg-layer-basement</code> / <code>--stroke-neutral</code></td></tr><tr><td>항목</td><td>32px · <code>--radius-sm</code> · t2 · 아이콘 <code>--fg-neutral-subtle</code></td></tr><tr><td>selected</td><td><code>--bg-neutral-selected</code> + 600</td></tr><tr><td>섹션 라벨</td><td>t1 500 <code>--fg-neutral-muted</code></td></tr><tr><td>사용자 연결 수</td><td><code>--fg-accent</code> 600</td></tr><tr><td>접근성</td><td><code>&lt;nav aria-label="주 메뉴"&gt;</code>, 현재 화면 <code>aria-current="page"</code>, 접기 버튼 <code>aria-expanded</code></td></tr></table>
</section>


<section class="page" id="components/agent-notice">
  <h1>Agent notice</h1>
  <p class="desc">에이전트가 무엇을 해 주는지, 지금 상태가 어떤지 화면 위쪽에 놓는 사라지지 않는 안내. 틸 틴트 말풍선이며 화면에 하나만 둡니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1">${notice('', '<b>근태·연차·결재·업무일지·일정·경비를 대신 처리합니다.</b><br>업무 협조가 필요할 때는 프로젝트·AS·시스템 담당자를 찾아 지금 자리에 있는지 확인하고 바로 메시지까지 보내드립니다.')}</div>
    <ol><li><b>Icon</b> — sparkles 16px, 역할 색</li><li><b>Lead</b> — 첫 문장 600</li><li><b>Body</b> — t2, 두 줄 이내</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">${notice('', '<b>에이전트가 조회와 초안 작성까지 스스로 수행합니다.</b> 상신·승인·기록은 확인 버튼을 받은 뒤에만 실행합니다.')}${notice('warning', '<b>근태 시스템 연동이 끊겨 있습니다.</b> 출퇴근 기록은 복구될 때까지 저장되지 않습니다.')}${notice('sample', '<b>예시 데이터입니다.</b> 연동을 켜면 실제 근태·결재 수치로 바뀝니다.')}</div>
  <table><tr><th>Variant</th><th>배경 / 아이콘</th><th>언제</th></tr><tr><td>info(기본)</td><td>accent-weak / fg-accent</td><td>에이전트 소개·할 수 있는 일</td></tr><tr><td>warning</td><td>warning-weak / fg-warning</td><td>연동 끊김·기능 제한 — 사라지면 안 되는 상태</td></tr><tr><td>sample</td><td>sample-weak / fg-sample</td><td>예시 데이터 화면</td></tr></table>
  <h3>Size</h3>
  <div class="demo col">${notice('compact', '<b>연결 4</b> · 근태·결재·일정·경비 연동 중')}</div>
  <table><tr><th>크기</th><th>쓰임</th></tr><tr><td>default</td><td>홈 상단</td></tr><tr><td>compact</td><td>패널·카드 안 한 줄</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>첫 문장에 결론(무엇을 해 준다 / 무엇이 안 된다), 둘째 문장에 조건. 두 줄이면 끝.</div>
    <div class="dont"><b>Don&#39;t</b>닫기 × 를 두지 않습니다 — 닫혀야 하는 알림은 Toast, 확인이 필요한 것은 Dialog.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>화면에 하나. 둘이 필요하면 더 급한 warning 하나만 남깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>버튼을 넣지 않습니다. 행동이 필요하면 아래 카드·컴포저로 유도하는 문장으로.</div>
  </div>
  <h2>Notice vs. Toast vs. Callout</h2>
  <table><tr><th></th><th>Agent notice</th><th>Toast</th><th>Callout(폼 안)</th></tr><tr><td>수명</td><td>화면에 머무름</td><td>4초</td><td>필드와 함께</td></tr><tr><td>자리</td><td>화면 위</td><td>화면 아래 가운데</td><td>폼 안</td></tr><tr><td>행동</td><td>없음</td><td>되돌리기 링크</td><td>없음</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>배경 / 라운드 / 패딩</td><td><code>--bg-accent-weak</code> / <code>--radius-md</code> / <code>--dim-x3 --dim-x4</code></td></tr><tr><td>아이콘</td><td>16px <code>--fg-accent</code> (warning <code>--fg-warning</code>, sample <code>--fg-sample</code>)</td></tr><tr><td>글자</td><td>t2 <code>--fg-neutral</code>, lead 600</td></tr><tr><td>최대 폭</td><td>640px — 컴포저와 같은 폭</td></tr><tr><td>접근성</td><td><code>role="status"</code>(info·sample) / <code>role="alert"</code>(warning)</td></tr></table>
</section>
`;

export const nav = [['components/composer', 'Composer'], ['components/sidebar-nav', 'Sidebar nav'], ['components/agent-notice', 'Agent notice']];
