// 템플릿 index.html 의 슬롯을 파트 파일로 채운다. 실행: node design/design-system/build.mjs  (끝나면 이 파일과 parts/ 는 지운다)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
import { icon, PATHS } from './parts/icons.mjs';
const BASE = ['inputs', 'content', 'feedback', 'agent', 'data', 'settings', 'quick'];
const MORE = ['forms', 'controls', 'media', 'status', 'menu', 'overlay', 'chat', 'navigation', 'shell'];
// PARTS=menu,forms → 기본 파트 + 그 파트만 싣는다(한 파트만 확인할 때). OUT=파일명 → index.html 대신 그 파일로
const only = process.env.PARTS?.split(',');
const parts = await Promise.all([...BASE, ...MORE.filter(p => !only || only.includes(p))].map(p => import(`./parts/${p}.mjs`)));
let html = readFileSync(join(dir, 'parts', 'template.html'), 'utf8').replace(/\r\n/g, '\n');
const slot = (name, value) => { // <!-- {{NAME}} -->…<!-- {{/NAME}} --> 를 value 로
  const re = new RegExp(`<!-- \\{\\{${name}\\}\\} -->[\\s\\S]*?<!-- \\{\\{/${name}\\}\\} -->`, 'g');
  if (!re.test(html)) throw new Error('slot missing: ' + name);
  html = html.replace(re, value);
};
const replace = (from, to) => { if (!html.includes(from)) throw new Error('anchor missing: ' + from.slice(0, 40)); html = html.replace(from, to); };

slot('NAME', 'Waple');
slot('INTRO', 'Waple 에이전트·관리자 콘솔·앞으로의 UXIS 제품이 같은 언어를 쓰기 위한 디자인 시스템입니다. 회색 UI 에 강조는 하나 — 주색은 잉크(검정)이고, 틸은 선택·아이콘·포커스·글로우처럼 꼭 필요한 곳에만 씁니다. 이 사이트 자체가 이 토큰으로 그려집니다.');
slot('ICON_RULE', '아이콘은 <b>Tabler Icons</b>(MIT) outline 세트만 씁니다(계획서 §11-7) — 손으로 그리지 않고 <code>parts/fetch-icons.mjs</code> 로 내려받습니다. 24px 격자, 굵기 1.75, <code>currentColor</code>. 카드·행 앞의 아이콘 칩은 상태 <code>weak</code> 배경 + 같은 역할의 <code>fg</code> 색입니다. 유니코드 글리프·이모지는 OS 마다 모양이 달라 UI 에 쓰지 않습니다.');
// {{ICON:name}} / {{ICON:name|s20}} → Tabler SVG. 갤러리는 쓰는 아이콘 전부
html = html.replace(/\{\{ICON:([a-z0-9-]+)(?:\|([a-z0-9]+))?\}\}/g, (m, n, cls) => {
  const svg = icon(n);
  return cls ? svg.replace('class="i"', `class="i" style="width:${cls.slice(1)}px;height:${cls.slice(1)}px"`) : svg;
});
replace('<!-- {{ICON_GALLERY}} -->', '<div class="icons">' + Object.keys(PATHS).map(n => `<figure>${icon(n)}<figcaption>${n}</figcaption></figure>`).join('') + '</div>');

replace(`  <!-- {{PRINCIPLES}} — 1단계 스타일 선택에서 도출한 원칙 3개. 각 원칙은 한 줄 이름 + 두 줄 설명 -->
  <div class="cards">
    <div class="card"><b>1. 명확하게</b><small>한 화면에 강조는 하나. 브랜드색은 꼭 필요한 곳에만 쓴다.</small></div>
    <div class="card"><b>2. 일관되게</b><small>같은 뜻은 같은 모양. 상태 색·간격·라운드는 토큰에서만 온다.</small></div>
    <div class="card"><b>3. 접근 가능하게</b><small>글자 대비 AA 이상, 포커스 링, 키보드 조작을 기본으로 한다.</small></div>
  </div>`,
`  <div class="cards two">
    <div class="card"><b>1. 검정이 주인, 틸은 손짓</b><small>주요 행동·선택은 잉크색. 틸은 화면당 한 곳 — 글로우 CTA·선택 상태·아이콘·포커스 링에만 씁니다.</small></div>
    <div class="card"><b>2. 선보다 톤, 톤보다 여백</b><small>구분은 여백 → 바탕 톤(basement) → 얇은 선 순서로. 그림자는 떠 있는 것(메뉴·다이얼로그·토스트)에만.</small></div>
    <div class="card"><b>3. 상태는 여섯 어휘로</b><small>success·warning·danger·info·neutral·sample. 색만으로 뜻을 전하지 않고 문구·아이콘과 짝을 짓습니다.</small></div>
    <div class="card"><b>4. 실행 전에 확인</b><small>에이전트는 조회·초안까지 스스로 하고, 상신·승인·기록은 Dialog 로 확인을 받은 뒤에만 실행합니다.</small></div>
  </div>`);

replace(`  <!-- {{REFERENCES}} — Mobbin 탐색 결과: 앱 이름 + mobbin_url 링크. 스크린샷·URL 입력이면 그 출처도 적는다 -->
  <div class="ref"><a href="https://mobbin.com" target="_blank">예시 앱 — 홈 화면</a></div>`,
`  <div class="ref">
    <a href="../home.html" target="_blank">design/home.html — 이 시스템의 출발점(직원 앱 홈)</a>
    <a href="../design-system-plan.md" target="_blank">design/design-system-plan.md — 토큰 3층·상태 어휘·결정 사항</a>
  </div>
  <h3>Mobbin — AI 어시스턴트 홈</h3>
  <div class="ref">
    <a href="https://mobbin.com/screens/8312ae46-7024-4429-b630-b5efe9c4539d" target="_blank">Microsoft Copilot — 인사말 + 입력창 + 제안 칩</a>
    <a href="https://mobbin.com/screens/d22de105-aada-4492-ae92-deb2196cc2ee" target="_blank">ClickUp Brain — 제안 목록 행 + 하단 컴포저</a>
    <a href="https://mobbin.com/screens/9f4e0804-c3ff-4456-aa14-07c8d7ad852f" target="_blank">SchoolAI — 좌측 내비 + 중앙 입력</a>
    <a href="https://mobbin.com/screens/c70f2089-3d3c-4b0a-aaa2-ae4a5145236e" target="_blank">WRITER — 아이콘 레일 + 빠른 실행 칩</a>
    <a href="https://mobbin.com/screens/e2f12dd6-645c-4903-86f8-f92d428acfc4" target="_blank">Perplexity — 온보딩 체크리스트 카드</a>
  </div>
  <h3>Mobbin — 직원·HR 대시보드</h3>
  <div class="ref">
    <a href="https://mobbin.com/screens/19b27e00-cc51-481f-85dc-74c8216171de" target="_blank">Workable — 출퇴근 타임시트 + 할 일 빈 상태 + 성공 토스트</a>
    <a href="https://mobbin.com/screens/019eccfa-6145-48ae-a6ab-7edf699fd1aa" target="_blank">Remote — 사이드바 + 할 일 행 + 알림 패널</a>
    <a href="https://mobbin.com/screens/e1b7b260-f10e-4022-b594-f3925207e2fc" target="_blank">Oyster — 알림 드롭다운 + 도구 카드</a>
    <a href="https://mobbin.com/screens/cc7d3fa8-66ee-45cb-9332-e7e557975c70" target="_blank">7shifts — 승인/반려 인라인 버튼 쌍 + 빈 활동 로그</a>
    <a href="https://mobbin.com/flows/536cf208-8188-4459-80f6-d77d2c72eb76" target="_blank">Vercel — 요청 다이얼로그 → 제출됨 흐름</a>
  </div>`);

// Foundations — Color: 브랜드(잉크) 램프 + accent 램프
replace(`  <h2>Brand ramp</h2>
  <div class="ramp" id="brand-ramp"></div>`,
`  <h2>Brand ramp — 잉크</h2>
  <p>주색은 검정입니다. 주요 버튼·선택 칩·글자에 씁니다. 회색 램프와 같은 값이므로 「브랜드색」이 따로 눈에 띄지 않는 것이 의도입니다.</p>
  <div class="ramp" id="brand-ramp"></div>
  <h2>Accent ramp — 틸</h2>
  <p>틸은 강조입니다. 화면당 한 곳 — 글로우 CTA·선택 상태·아이콘 칩·포커스 링·안내 말풍선 틴트. 틸 위 글자는 검정(<code>--fg-on-accent</code>)입니다. 흰 글자는 대비 2.11:1 로 AA 미달이라 15px Bold 이상의 글로우 CTA 에만 허용합니다.</p>
  <div class="ramp" id="accent-ramp"></div>
  <h2>Semantic — accent</h2><div class="sw" data-tokens="bg-accent-weak,bg-accent-solid,fg-accent,fg-on-accent,stroke-accent,stroke-focus"></div>`);
replace(`data-tokens="bg-layer-default,bg-layer-basement,bg-neutral-weak,bg-neutral-solid,bg-brand-weak,bg-brand-solid,`,
        `data-tokens="bg-layer-default,bg-layer-basement,bg-neutral-weak,bg-neutral-hover,bg-neutral-selected,bg-neutral-solid,bg-brand-weak,bg-brand-solid,bg-violet-weak,bg-sample-weak,`);
replace(`data-tokens="fg-neutral,fg-neutral-subtle,fg-neutral-muted,fg-neutral-placeholder,fg-disabled,fg-brand,fg-critical,fg-positive,fg-warning,fg-info"`,
        `data-tokens="fg-neutral,fg-neutral-subtle,fg-neutral-muted,fg-neutral-placeholder,fg-disabled,fg-brand,fg-critical,fg-positive,fg-warning,fg-info,fg-violet,fg-sample"`);
replace(`data-tokens="stroke-neutral,stroke-neutral-strong,stroke-brand,stroke-critical,stroke-focus"`,
        `data-tokens="stroke-neutral,stroke-neutral-strong,stroke-neutral-stronger,stroke-brand,stroke-critical"`);
replace(`<div class="dd"><div class="do"><b>Do</b>브랜드색은 화면당 주요 액션 하나에만. 나머지는 neutral.</div>`,
        `<div class="dd"><div class="do"><b>Do</b>틸은 화면당 한 곳. 주요 버튼은 검정, 나머지는 neutral·outline.</div>`);
replace(`document.getElementById('brand-ramp').innerHTML=`,
        `document.getElementById('accent-ramp').innerHTML=[50,100,200,300,400,500,600,700,800,900].map(s=>\`<i style="background:var(--palette-accent-\${s})" title="accent-\${s} \${v('palette-accent-'+s)}"></i>\`).join('');
document.getElementById('brand-ramp').innerHTML=`);

// Typography: 글꼴
replace(`<p class="desc">글꼴은 <code>Pretendard</code>, 크기는 t1(작음)부터 t10(큼)까지 열 단계. 굵기는 Regular 400 · Medium 500 · Bold 700 셋만 씁니다.</p>`,
        `<p class="desc">글꼴은 <code>Wanted Sans</code>(home.html 과 동일, 웹폰트), 크기는 t1(13px)부터 t10(32px)까지 열 단계. <b>13px 미만 글자는 없습니다</b> — 캡션·배지·메타는 t1(13), 본문은 t2(14) 이상. 굵기는 400 · 500 · 600 · 700. 표·타이머·지표 숫자는 <code>font-variant-numeric: tabular-nums</code>.</p>`);
replace(`<tr><td>screenTitle</td><td>t8 Bold</td><td>화면 제목</td></tr><tr><td>sectionTitle</td><td>t6 Bold</td><td>섹션 제목</td></tr>
    <tr><td>body</td><td>t4 Regular</td><td>본문</td></tr><tr><td>caption</td><td>t2 Regular · fg-neutral-muted</td><td>보조 설명·메타</td></tr><tr><td>label</td><td>t1 Medium</td><td>버튼·칩·필드 라벨</td></tr>`,
        `<tr><td>screenTitle</td><td>t9 600 · 28px</td><td>화면 제목</td></tr><tr><td>sectionTitle</td><td>t6 600 · 20px</td><td>섹션·패널 제목 · 지표 숫자</td></tr><tr><td>cardTitle</td><td>t3 600 · 15px</td><td>카드·다이얼로그 제목</td></tr>
    <tr><td>body</td><td>t2 400 · 14px</td><td>본문 — 최소 크기</td></tr><tr><td>bodyLarge</td><td>t3 400 · 15px</td><td>말풍선·답변·컴포저</td></tr><tr><td>caption</td><td>t1 400 · 13px · fg-neutral-muted</td><td>메타·힌트 — 캡션 최소 크기</td></tr><tr><td>label</td><td>t1 500 · 13px</td><td>배지·섹션 라벨·필드 라벨</td></tr>`);
replace(`<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">`,
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css">`);

// Elevation: 글로우
replace(`<tr><td>3</td><td><code>--shadow-3</code></td><td>토스트·플로팅 버튼</td></tr></table>`,
        `<tr><td>3</td><td><code>--shadow-3</code></td><td>토스트·플로팅 버튼</td></tr><tr><td>glow</td><td><code>--shadow-glow</code> + <code>--gradient-glow</code></td><td>「에이전트에게 맡기기」 CTA 하나뿐. 화면당 하나</td></tr></table>`);

// Button 페이지: 검정 주색에 맞춰 문구·CSS 보정
replace(`<p class="desc">사용자가 행동을 실행하게 하는 가장 기본적인 요소. 화면의 주요 행동은 <code>brand-solid</code> 하나만 씁니다.</p>`,
        `<p class="desc">사용자가 행동을 실행하게 하는 가장 기본적인 요소. 화면의 주요 행동은 <code>brand-solid</code>(검정) 하나만 씁니다. 틸 채움 버튼은 없습니다 — 틸은 글로우 CTA(Composer)와 선택 상태에만.</p>`);
replace(`.btn.brand-solid:hover{filter:brightness(.94)}`, `.btn.brand-solid:hover{filter:brightness(1.25)}`);
replace(`<tr><td>High</td><td>brand-solid · neutral-solid</td><td>화면당 하나, 주요 행동</td></tr>`,
        `<tr><td>High</td><td>brand-solid (= neutral-solid, 검정)</td><td>화면당 하나, 주요 행동</td></tr>`);

// 컴포넌트·패턴 파트 주입 + NAV
const css = parts.map(p => p.css).join('\n');
const compPages = parts.map(p => p.pages).join('\n');
replace(`</style>\n</head>`, `${css}\n</style>\n</head>`);
replace(/<!-- \{\{COMPONENT_PAGES\}\}[\s\S]*?-->/.exec(html)[0], compPages);
// AI 답변 화면의 조각은 한 그룹으로 모은다 — 순서는 화면 흐름(입력 → 답 → 진행 → 확인 → 첨부 → 대화 상자 → 안내). 나머지는 seed 처럼 ABC 순
const AI = ['composer', 'message', 'marker', 'questionnaire', 'attachment', 'message-scroller', 'agent-notice'].map(s => 'components/' + s);
const allNav = [['components/button', 'Button'], ...parts.flatMap(p => p.nav)];
const navList = (items) => items.map(([id, t]) => `['${id}','${t}']`).join(',');
replace(`  'Components':[['components/button','Button']],`,
        `  'Components':[${navList(allNav.filter(([id]) => !AI.includes(id)).sort((a, b) => a[1].localeCompare(b[1])))}],\n  'AI 답변':[${navList(AI.map(id => allNav.find(([i]) => i === id)).filter(Boolean))}],`);
// 남은 슬롯 주석 제거
html = html.replace(/<!-- \{\{[^}]+\}\}[^\n]*-->\n?/g, '').replace(/\/\*[^\n]*\{\{[^}]+\}\}[^\n]*\*\/\n?/g, '');
replace(`// {{NAV}} — 3단계에서 확정한 컴포넌트·패턴을 여기에 등록한다(section id 와 일치해야 한다)\n`, '');

// 흰 면이 주가 되는 컴포넌트는 데모 바탕을 옅게 — 흰 위에 흰이 되지 않게
const TINT = ['list-row', 'toast', 'composer', 'collapsible-list', 'table', 'date-picker', 'select', 'quick-card', 'work-panel', 'empty-state', 'skeleton', 'text-input', 'chip', 'icon-button', ...parts.flatMap(p => p.tint || [])];
for (const id of TINT) {
  const re = new RegExp(`(<section class="page" id="components/${id}">)([\\s\\S]*?)(</section>)`);
  if (!re.test(html)) throw new Error('tint target missing: ' + id);
  html = html.replace(re, (m, o, body, c) => o + body.replace(/class="demo(?![ -]*tinted)/g, 'class="demo tinted') + c);
}
writeFileSync(join(dir, process.env.OUT || 'index.html'), html);
const ids = [...html.matchAll(/<section class="page" id="([^"]+)"/g)].map(m => m[1]);
const navIds = [...html.matchAll(/\['([a-z-]+\/[a-z-]+|get-started)','/g)].map(m => m[1]);
const missing = navIds.filter(i => !ids.includes(i)), extra = ids.filter(i => !navIds.includes(i));
console.log(`pages ${ids.length} · nav ${navIds.length} · missing ${missing} · extra ${extra} · leftover slots ${(html.match(/\{\{/g) || []).length}`);

// 전체 빌드면 플러그인 스킬 스냅숏도 갱신한다(PARTS·OUT 은 미리보기라 건너뛴다)
if (!only && !process.env.OUT) await import('./export-skill.mjs');
