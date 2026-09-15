// 기본 입력·액션: Icon button · Chip · Badge · Text input · Switch
import { icon } from './icons.mjs';
const I = { plus: icon('plus'), clip: icon('paperclip'), x: icon('x'), search: icon('search'), more: icon('dots'), chev: icon('chevron-right') };

export const css = `
  /* ── Icon button ── */
  .iconbtn{display:inline-flex;align-items:center;justify-content:center;border:1px solid transparent;border-radius:var(--radius-sm);background:transparent;color:var(--fg-neutral-subtle);cursor:pointer;line-height:normal;transition:background var(--duration-fast) var(--easing),box-shadow var(--duration-fast)}
  .iconbtn svg{width:18px;height:18px}
  .iconbtn.sm{width:28px;height:28px}.iconbtn.sm svg{width:16px;height:16px} .iconbtn.md{width:32px;height:32px} .iconbtn.lg{width:36px;height:36px}.iconbtn.lg svg{width:20px;height:20px}
  .iconbtn.ghost:hover{background:var(--bg-neutral-hover);color:var(--fg-neutral)}
  .iconbtn.outline{background:var(--bg-layer-default);border-color:var(--stroke-neutral-strong);color:var(--fg-neutral)} .iconbtn.outline:hover{background:var(--bg-neutral-hover)}
  .iconbtn.solid{background:var(--bg-brand-solid);color:var(--fg-on-brand)} .iconbtn.solid:hover{filter:brightness(1.25)}
  .iconbtn.selected{background:var(--bg-neutral-selected);color:var(--fg-neutral)}
  .iconbtn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .iconbtn:disabled,.iconbtn.disabled{background:var(--bg-neutral-weak);color:var(--fg-disabled);border-color:transparent;cursor:not-allowed}
  /* ── Chip ── */
  .chip{display:inline-flex;align-items:center;gap:var(--dim-x1_5);line-height:normal;border-radius:var(--radius-full);border:1px solid var(--stroke-neutral-strong);background:var(--bg-layer-default);color:var(--fg-neutral);font-weight:var(--font-weight-medium);cursor:pointer;white-space:nowrap;transition:background var(--duration-fast) var(--easing)}
  .chip.md{height:32px;padding:0 var(--dim-x3);font-size:var(--font-size-t2)} .chip.sm{height:26px;padding:0 var(--dim-x2_5);font-size:var(--font-size-t1)}
  .chip:hover{background:var(--bg-neutral-hover)}
  .chip.selected{background:var(--bg-brand-solid);border-color:var(--stroke-brand);color:var(--fg-on-brand)}
  .chip.suggest{font-weight:var(--font-weight-regular)} .chip svg{width:14px;height:14px} .chip.suggest svg{color:var(--fg-accent)}
  .chip .cnt{color:var(--fg-neutral-muted);font-weight:var(--font-weight-regular)} .chip.selected .cnt{color:inherit}
  .chip:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .chip.disabled{background:var(--bg-neutral-weak);color:var(--fg-disabled);border-color:transparent;cursor:not-allowed}
  /* ── Badge ── */
  .badge{display:inline-flex;align-items:center;gap:var(--dim-x1);line-height:normal;height:22px;padding:0 var(--dim-x2);border-radius:var(--radius-full);font-size:12px;font-weight:var(--font-weight-semibold);background:var(--bg-neutral-weak);color:var(--fg-neutral-subtle);white-space:nowrap}
  .badge.success{background:var(--bg-positive-weak);color:var(--fg-positive)} .badge.warning{background:var(--bg-warning-weak);color:var(--fg-warning)}
  .badge.danger{background:var(--bg-critical-weak);color:var(--fg-critical)} .badge.info{background:var(--bg-info-weak);color:var(--fg-info)}
  .badge.sample{background:var(--bg-sample-weak);color:var(--fg-sample)} .badge.accent{background:var(--bg-accent-weak);color:var(--fg-accent)}
  .badge.count{min-width:20px;padding:0 var(--dim-x1_5);justify-content:center;font-variant-numeric:tabular-nums}
  .badge.lg{height:26px;padding:0 var(--dim-x2_5);font-size:var(--font-size-t1)}
  /* ── Text input ── */
  .field{display:flex;flex-direction:column;gap:var(--dim-x1_5);min-width:260px;text-align:left}
  .field>label{font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral)} .field>label em{font-style:normal;color:var(--fg-critical)}
  .field .ctrl{display:flex;align-items:center;gap:var(--dim-x2);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-sm);background:var(--bg-layer-default);padding:0 var(--dim-x3);color:var(--fg-neutral);transition:border-color var(--duration-fast),box-shadow var(--duration-fast)}
  .field .ctrl svg{width:16px;height:16px;color:var(--fg-neutral-muted)}
  .field input,.field textarea{flex:1;border:0;background:transparent;font:inherit;font-size:var(--font-size-t2);color:inherit;outline:none;min-width:0;padding:0}
  .field input::placeholder,.field textarea::placeholder{color:var(--fg-neutral-placeholder)}
  .field.md .ctrl{height:36px} .field.lg .ctrl{height:44px} .field.lg input{font-size:var(--font-size-t3)}
  .field .ctrl:focus-within,.field.focus .ctrl{border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  .field.error .ctrl{border-color:var(--stroke-critical)} .field .help{font-size:var(--font-size-t1);color:var(--fg-neutral-muted)} .field.error .help{color:var(--fg-critical)}
  .field.disabled .ctrl{background:var(--bg-neutral-weak);color:var(--fg-disabled);border-color:transparent} .field.disabled>label{color:var(--fg-disabled)}
  .field .ctrl.multi{height:auto;align-items:flex-start;padding:var(--dim-x2) var(--dim-x3)} .field textarea{resize:vertical;min-height:64px;line-height:var(--line-height-t2)}
  /* ── Switch ── */
  .switch{display:inline-flex;align-items:center;gap:var(--dim-x2);cursor:pointer;font-size:var(--font-size-t2);color:var(--fg-neutral);position:relative}
  .switch input{position:absolute;opacity:0;width:0;height:0;margin:0}
  .switch .track{width:40px;height:22px;border-radius:var(--radius-full);background:var(--stroke-neutral-stronger);position:relative;flex:none;transition:background var(--duration-fast) var(--easing)}
  .switch .track::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--bg-layer-default);box-shadow:var(--shadow-1);transition:transform var(--duration-fast) var(--easing)}
  .switch input:checked+.track{background:var(--bg-brand-solid)} .switch input:checked+.track::after{transform:translateX(18px)}
  .switch.sm .track{width:32px;height:18px} .switch.sm .track::after{width:12px;height:12px} .switch.sm input:checked+.track::after{transform:translateX(14px)}
  .switch:has(input:disabled){cursor:not-allowed;color:var(--fg-disabled)} .switch input:disabled+.track{background:var(--bg-neutral-weak)} .switch input:disabled:checked+.track{background:var(--stroke-neutral-stronger)}
  .switch input:focus-visible+.track,.switch.focus .track{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
`;

const iconbtn = (cls, icon, label) => '<button class="iconbtn ' + cls + '" aria-label="' + label + '">' + icon + '</button>';

export const pages = `
<section class="page" id="components/icon-button">
  <h1>Icon button</h1>
  <p class="desc">라벨 없이 아이콘만으로 뜻이 통하는 보조 행동(첨부·닫기·더보기·이전/다음)에 씁니다. 화면을 여닫거나 목록을 넘기는 자리에 오고, 주요 행동에는 쓰지 않습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${iconbtn('md outline', I.clip, '파일 첨부')}</div>
    <ol><li><b>Container</b> — 정사각형, 라운드 sm</li><li><b>Icon</b> — Tabler, 16·18·20px, stroke 1.75, <code>currentColor</code></li><li><b>aria-label</b> — 보이지 않는 이름. 툴팁이 같은 문구를 보여 줍니다</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo">${iconbtn('sm outline', I.x, '닫기')}${iconbtn('md outline', I.x, '닫기')}${iconbtn('lg outline', I.x, '닫기')}</div>
  <table><tr><th>크기</th><th>상자 / 아이콘</th><th>쓰임</th></tr><tr><td>sm</td><td>28 / 16px</td><td>칩·행 안, 주간 이동 ‹ ›</td></tr><tr><td>md</td><td>32 / 18px</td><td>기본 — 컴포저 첨부, 카드 더보기</td></tr><tr><td>lg</td><td>36 / 20px</td><td>상단 바·사이드바 접기</td></tr></table>
  <h3>Variant</h3>
  <div class="demo">${iconbtn('md ghost', I.more, '더보기')}${iconbtn('md outline', I.clip, '파일 첨부')}${iconbtn('md solid', I.plus, '새 대화')}${iconbtn('md ghost selected', I.search, '검색')}</div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>ghost</td><td>기본 — 행·카드 안의 조용한 보조 행동</td></tr><tr><td>outline</td><td>흰 바탕 위에서 눌리는 곳임을 알려야 할 때(컴포저·카드 하단)</td></tr><tr><td>solid</td><td>검정. 「새 대화」처럼 화면에 하나뿐인 만들기 행동</td></tr><tr><td>selected</td><td>토글형(검색 열림·필터 켜짐) — ghost 의 켜진 상태</td></tr></table>
  <h3>State</h3>
  <div class="demo">${iconbtn('md outline', I.clip, '첨부')}<button class="iconbtn md outline" style="background:var(--bg-neutral-hover)" aria-label="hover">${I.clip}</button><button class="iconbtn md outline" style="box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)" aria-label="focus">${I.clip}</button><button class="iconbtn md outline" disabled aria-label="첨부">${I.clip}</button></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${iconbtn('md ghost', I.more, '더보기')}${iconbtn('md ghost', I.x, '닫기')}</div>뜻이 굳어진 아이콘(닫기·더보기·첨부·검색·이전/다음)에만 씁니다. 항상 <code>aria-label</code> + 툴팁.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${iconbtn('md solid', I.chev, '결재 상신')}</div>「결재 상신」처럼 결과가 있는 행동을 아이콘 하나에 싣지 않습니다 — 라벨 있는 Button 으로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>한 줄에 아이콘 버튼은 셋까지. 넷째부터는 「더보기」 메뉴로 접습니다.</div>
    <div class="dont"><b>Don&#39;t</b>아이콘 크기를 상자에 맞춰 임의로 키우지 않습니다 — 16·18·20 세 값만.</div>
  </div>
  <h2>Icon button vs. Button</h2>
  <table><tr><th></th><th>Icon button</th><th>Button</th></tr><tr><td>라벨</td><td>없음(aria-label)</td><td>있음</td></tr><tr><td>자리</td><td>행·카드·바의 모서리</td><td>폼·카드 하단·다이얼로그 푸터</td></tr><tr><td>주요 행동</td><td>불가</td><td>brand-solid 하나</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>라운드</td><td><code>--radius-sm</code></td></tr><tr><td>ghost 글자 / hover 배경</td><td><code>--fg-neutral-subtle</code> / <code>--bg-neutral-hover</code></td></tr><tr><td>outline 선</td><td><code>--stroke-neutral-strong</code></td></tr><tr><td>solid 배경 / 글자</td><td><code>--bg-brand-solid</code> / <code>--fg-on-brand</code></td></tr><tr><td>selected 배경</td><td><code>--bg-neutral-selected</code></td></tr><tr><td>포커스</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px</td></tr><tr><td>접근성</td><td><code>&lt;button aria-label&gt;</code>, 최소 터치 영역 28px — 모바일은 md 이상</td></tr></table>
</section>

<section class="page" id="components/chip">
  <h1>Chip</h1>
  <p class="desc">목록을 좁히는 필터, 그리고 「이렇게 물어보셔도 됩니다」의 제안 프롬프트. 알약 모양이고, 눌러도 화면을 떠나지 않습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><span class="chip md suggest">${icon('sparkles')}결재가 반려됐는데 누구한테 물어봐야 해?</span></div>
    <ol><li><b>Container</b> — 알약(radius-full), 1px 선</li><li><b>Leading</b> (선택) — 제안 칩의 sparkles 아이콘 14px (틸)</li><li><b>Label</b> — 한 줄, 줄바꿈 없음</li><li><b>Count</b> (선택) — 필터 결과 수, muted</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><span class="chip sm">전체</span><span class="chip md">전체</span></div>
  <table><tr><th>크기</th><th>높이</th><th>쓰임</th></tr><tr><td>sm</td><td>26px</td><td>카드·행 안의 필터(출근 · 퇴근 · 연속·달력)</td></tr><tr><td>md</td><td>32px</td><td>제안 프롬프트, 화면 상단 필터</td></tr></table>
  <h3>Variant</h3>
  <div class="demo"><span class="chip md">전체 <span class="cnt">12</span></span><span class="chip md selected">내 예약</span><span class="chip md suggest">${icon('sparkles')}오늘 업무일지 써줘</span></div>
  <table><tr><th>Variant</th><th>쓰임</th></tr><tr><td>filter</td><td>선택 가능. 선택되면 검정으로 채워집니다 — 틸을 쓰지 않습니다</td></tr><tr><td>suggest</td><td>제안 프롬프트. 누르면 컴포저에 문구가 들어갑니다. 선택 상태 없음</td></tr></table>
  <h3>State</h3>
  <div class="demo"><span class="chip md">기본</span><span class="chip md" style="background:var(--bg-neutral-hover)">hover</span><span class="chip md selected">selected</span><span class="chip md disabled">disabled</span></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo"><span class="chip sm selected">전체</span><span class="chip sm">승인 대기</span><span class="chip sm">반려</span></div>필터 칩은 한 줄에 두고, 「전체」를 첫 자리에. 선택은 항상 하나 이상.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><span class="chip md selected" style="background:var(--bg-accent-solid);border-color:var(--stroke-accent);color:var(--fg-on-accent)">내 예약</span></div>선택 상태에 틸을 칠하지 않습니다 — 틸은 강조 한 곳(글로우·포커스)에만.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>제안 칩 문구는 사용자가 실제로 칠 문장 그대로(「이번주 근태 어때?」).</div>
    <div class="dont"><b>Don&#39;t</b>칩으로 페이지를 이동시키지 않습니다 — 이동은 Button·링크.</div>
  </div>
  <h2>Chip vs. Button</h2>
  <table><tr><th></th><th>Chip</th><th>Button</th></tr><tr><td>목적</td><td>필터·선택·제안 삽입</td><td>행동 실행</td></tr><tr><td>모양</td><td>radius-full, 26·32px</td><td>radius-md, 26~48px</td></tr><tr><td>선택 상태</td><td>있음(검정 채움)</td><td>없음</td></tr><tr><td>화면 이동</td><td>없음</td><td>있음</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>배경 / 선 / 글자</td><td><code>--bg-layer-default</code> / <code>--stroke-neutral-strong</code> / <code>--fg-neutral</code></td></tr><tr><td>selected</td><td><code>--bg-brand-solid</code> + <code>--fg-on-brand</code></td></tr><tr><td>제안 아이콘</td><td><code>--fg-accent</code></td></tr><tr><td>글자</td><td>sm t1 500 · md t2 500 (suggest 400)</td></tr><tr><td>사이 간격</td><td><code>--spacing-between-chips</code> 8px</td></tr><tr><td>접근성</td><td>필터는 <code>role="radio"/aria-checked</code>(단일) 또는 <code>aria-pressed</code>(다중). 제안 칩은 <code>&lt;button&gt;</code></td></tr></table>
</section>

<section class="page" id="components/badge">
  <h1>Badge</h1>
  <p class="desc">상태 한 단어(승인 대기 · 반려 · 연결됨)나 건수(6)를 붙이는 작은 표식. 눌리지 않고, 여섯 상태 어휘의 색을 그대로 씁니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><span class="badge warning">승인 대기</span></div>
    <ol><li><b>Container</b> — 알약, 22px, 상태 <code>weak</code> 배경</li><li><b>Label</b> — 12px 600, 두 단어 이하. 뜻은 항상 글자에 (색만으로 전하지 않습니다)</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant — 상태 어휘</h3>
  <div class="demo"><span class="badge success">승인 완료</span><span class="badge warning">승인 대기</span><span class="badge danger">반려</span><span class="badge info">예정</span><span class="badge">해당 없음</span><span class="badge sample">예시 데이터</span><span class="badge accent">연결 4</span></div>
  <table><tr><th>어휘</th><th>배경 / 글자</th><th>문구 예</th></tr><tr><td>success</td><td>positive-weak / fg-positive</td><td>승인 완료 · 등록됨 · 근무 중</td></tr><tr><td>warning</td><td>warning-weak / fg-warning</td><td>승인 대기 · 보완 요청 · 부재</td></tr><tr><td>danger</td><td>critical-weak / fg-critical</td><td>반려 · 끊김 · 미출근</td></tr><tr><td>info</td><td>info-weak / fg-info</td><td>예정 · 링크됨</td></tr><tr><td>neutral</td><td>neutral-weak / fg-neutral-subtle</td><td>해당 없음 · 완료(보드)</td></tr><tr><td>sample</td><td>sample-weak / fg-sample</td><td>예시 데이터 · 산식 값</td></tr><tr><td>accent</td><td>accent-weak / fg-accent</td><td>연결 4 — 에이전트 연결 수, 이 한 곳만</td></tr></table>
  <h3>Count</h3>
  <div class="demo"><span class="badge count danger">6</span><span class="badge count">50</span><span class="badge count danger lg">6건</span></div>
  <table><tr><th>형태</th><th>쓰임</th></tr><tr><td>count</td><td>숫자만. 처리해야 할 건수는 danger, 참고용 수는 neutral</td></tr><tr><td>count lg</td><td>카드 우상단(빠른 실행 「전자결재 6건」)</td></tr></table>
  <h3>Size</h3>
  <div class="demo"><span class="badge info">예정 22px</span><span class="badge info lg">예정 26px</span></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo"><span class="badge warning">승인 대기</span><span class="badge danger">반려</span></div>상태는 문구로 말합니다. 같은 뜻은 어디서나 같은 어휘·같은 색.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><span class="badge danger">새 기능</span><span class="badge success">추천</span></div>홍보·강조에 상태색을 빌려 쓰지 않습니다. danger 는 진짜 위험만.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>행 하나에 배지는 하나. 둘 이상이면 가장 급한 것만 남기고 나머지는 메타 글자로.</div>
    <div class="dont"><b>Don&#39;t</b>배지를 버튼처럼 누르게 만들지 않습니다 — 필터가 필요하면 Chip.</div>
  </div>
  <h2>Badge vs. Chip</h2>
  <table><tr><th></th><th>Badge</th><th>Chip</th></tr><tr><td>상호작용</td><td>없음</td><td>선택·삽입</td></tr><tr><td>높이</td><td>22·26px</td><td>26·32px</td></tr><tr><td>색</td><td>상태 어휘 weak + fg</td><td>흰 바탕 · 선택 시 검정</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>높이 / 패딩</td><td>22px / <code>--dim-x2</code> (count: <code>--dim-x1_5</code>, min-width 20)</td></tr><tr><td>글자</td><td>12px 600 · lg 13px 600 · 숫자 <code>tabular-nums</code> — 12px 는 시스템 하한(13)의 유일한 예외</td></tr><tr><td>라운드</td><td><code>--radius-full</code></td></tr><tr><td>색</td><td>어휘별 <code>--bg-{role}-weak</code> + <code>--fg-{role}</code></td></tr><tr><td>접근성</td><td>건수 배지는 <code>aria-label="처리 대기 6건"</code> — 숫자만으로는 뜻이 없습니다</td></tr></table>
</section>

<section class="page" id="components/text-input">
  <h1>Text input</h1>
  <p class="desc">라벨 · 입력 상자 · 도움말(또는 오류)이 한 묶음. 포커스는 틸 링, 오류는 빨간 선 + 문구입니다. 한 줄이면 input, 여러 줄이면 textarea.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><div class="field md"><label>담당자 검색 <em>*</em></label><div class="ctrl">${I.search}<input placeholder="이름·팀·시스템"></div><div class="help">프로젝트·AS·시스템 담당자를 찾습니다</div></div></div>
    <ol><li><b>Label</b> — t1 500, 필수는 <em style="color:var(--fg-critical)">*</em></li><li><b>Control</b> — 1px 선, 라운드 sm</li><li><b>Prefix icon</b> (선택) — 16px muted</li><li><b>Help / Error</b> — t1, 오류면 fg-critical</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><div class="field md"><label>md · 36px</label><div class="ctrl"><input placeholder="폼 안 기본"></div></div><div class="field lg"><label>lg · 44px</label><div class="ctrl"><input placeholder="화면 상단 검색"></div></div></div>
  <table><tr><th>크기</th><th>높이</th><th>글자</th><th>쓰임</th></tr><tr><td>md</td><td>36px</td><td>t2</td><td>폼·다이얼로그 안</td></tr><tr><td>lg</td><td>44px</td><td>t3</td><td>화면 상단 검색, 모바일</td></tr></table>
  <h3>Variant</h3>
  <div class="demo"><div class="field md"><label>기본</label><div class="ctrl"><input placeholder="회의 제목"></div></div><div class="field md"><label>아이콘</label><div class="ctrl">${I.search}<input placeholder="검색"></div></div><div class="field md"><label>여러 줄</label><div class="ctrl multi"><textarea placeholder="지출 내용"></textarea></div></div></div>
  <h3>State</h3>
  <div class="demo"><div class="field md"><label>기본</label><div class="ctrl"><input placeholder="입력"></div></div><div class="field md focus"><label>focus</label><div class="ctrl"><input value="연차"></div></div><div class="field md error"><label>error</label><div class="ctrl"><input value="2026-13-01"></div><div class="help">날짜 형식이 아닙니다 (예: 2026-09-10)</div></div><div class="field md disabled"><label>disabled</label><div class="ctrl"><input value="자동 채움" disabled></div></div></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo"><div class="field md"><label>금액</label><div class="ctrl"><input placeholder="0"></div><div class="help">원 단위, 부가세 포함</div></div></div>라벨은 항상 위에 보이게. 형식 안내는 placeholder 가 아니라 help 에.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="field md"><div class="ctrl"><input placeholder="금액 (원 단위, 부가세 포함)"></div></div></div>placeholder 를 라벨로 쓰지 않습니다 — 입력하는 순간 사라집니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>오류는 그 필드 바로 아래, 무엇이 왜 틀렸고 어떻게 고치는지 한 줄.</div>
    <div class="dont"><b>Don&#39;t</b>제출 버튼을 누르기 전에 빨간 선을 먼저 보이지 않습니다 — 떠날 때(blur) 또는 제출 때.</div>
  </div>
  <h2>Text input vs. Composer</h2>
  <table><tr><th></th><th>Text input</th><th>Composer</th></tr><tr><td>용도</td><td>폼의 한 값</td><td>에이전트에게 보내는 문장</td></tr><tr><td>제출</td><td>폼 버튼</td><td>Enter · 글로우 CTA</td></tr><tr><td>라벨</td><td>필수</td><td>없음(placeholder 가 곧 안내)</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>선 / 배경 / 라운드</td><td><code>--stroke-neutral-strong</code> / <code>--bg-layer-default</code> / <code>--radius-sm</code></td></tr><tr><td>포커스</td><td><code>--stroke-accent</code> + <code>--bg-accent-weak</code> 3px 링</td></tr><tr><td>오류</td><td><code>--stroke-critical</code> · help <code>--fg-critical</code></td></tr><tr><td>placeholder</td><td><code>--fg-neutral-placeholder</code></td></tr><tr><td>disabled</td><td><code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr><tr><td>접근성</td><td><code>&lt;label for&gt;</code> 연결, 오류는 <code>aria-describedby</code> + <code>aria-invalid</code></td></tr></table>
</section>

<section class="page" id="components/switch">
  <h1>Switch</h1>
  <p class="desc">켜고 끄는 즉시 반영되는 설정(알림 · 자동 초안 · 연동). 저장 버튼이 따로 필요하면 Checkbox 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo"><label class="switch"><input type="checkbox" checked><span class="track"></span>업무일지 자동 초안</label></div>
    <ol><li><b>Track</b> — 40×22, 알약. 켜짐은 검정</li><li><b>Thumb</b> — 16px 흰 원, shadow-1</li><li><b>Input</b> — 숨긴 <code>&lt;input type="checkbox"&gt;</code>. 상태·키보드·폼 전송을 브라우저가 처리합니다</li><li><b>Label</b> — 오른쪽, t2. 무엇이 켜지는지 명사로</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo"><label class="switch sm"><input type="checkbox" checked><span class="track"></span>sm · 32×18</label><label class="switch"><input type="checkbox" checked><span class="track"></span>md · 40×22</label></div>
  <table><tr><th>크기</th><th>쓰임</th></tr><tr><td>sm</td><td>행 안(연동 목록의 켜기/끄기)</td></tr><tr><td>md</td><td>설정 화면 기본</td></tr></table>
  <h3>State</h3>
  <div class="demo"><label class="switch"><input type="checkbox"><span class="track"></span>꺼짐</label><label class="switch"><input type="checkbox" checked><span class="track"></span>켜짐</label><label class="switch focus"><input type="checkbox" checked><span class="track"></span>focus</label><label class="switch"><input type="checkbox" disabled><span class="track"></span>disabled</label><label class="switch"><input type="checkbox" checked disabled><span class="track"></span>disabled·켜짐</label></div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo"><label class="switch"><input type="checkbox" checked><span class="track"></span>결재 알림</label></div>라벨은 켜지는 대상(「결재 알림」). 누르는 즉시 적용되고 토스트로 알립니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><label class="switch"><input type="checkbox"><span class="track"></span>결재 알림을 받지 않기</label></div>부정형 라벨 금지 — 켜짐이 「안 받음」이 되면 헷갈립니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>되돌릴 수 없는 것(연동 해제)은 스위치 뒤에 확인 Dialog 를 둡니다.</div>
    <div class="dont"><b>Don&#39;t</b>여러 스위치를 바꾼 뒤 「저장」을 누르게 하지 않습니다 — 그 경우는 Checkbox + 버튼.</div>
  </div>
  <h2>Switch vs. Checkbox</h2>
  <table><tr><th></th><th>Switch</th><th>Checkbox</th></tr><tr><td>반영</td><td>즉시</td><td>제출 때</td></tr><tr><td>개수</td><td>독립된 설정 하나</td><td>목록에서 여럿 고름</td></tr><tr><td>라벨</td><td>명사(대상)</td><td>문장·항목</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>track 꺼짐 / 켜짐</td><td><code>--stroke-neutral-stronger</code> / <code>--bg-brand-solid</code></td></tr><tr><td>thumb</td><td><code>--bg-layer-default</code> + <code>--shadow-1</code></td></tr><tr><td>disabled</td><td>track <code>--bg-neutral-weak</code>, 글자 <code>--fg-disabled</code></td></tr><tr><td>포커스</td><td>track 에 <code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code></td></tr><tr><td>전환</td><td><code>--duration-fast</code> <code>--easing</code></td></tr><tr><td>접근성</td><td><code>&lt;input type="checkbox" role="switch"&gt;</code> — Space 로 토글, 라벨 클릭도 토글, 폼과 함께 전송</td></tr></table>
</section>
`;

export const nav = [['components/icon-button', 'Icon button'], ['components/chip', 'Chip'], ['components/badge', 'Badge'], ['components/text-input', 'Text input'], ['components/switch', 'Switch']];
