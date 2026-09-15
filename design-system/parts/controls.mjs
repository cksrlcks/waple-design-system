// 조작 컨트롤: Slider · Toggle group · Button group · Input group · Input OTP · Number input
import { icon } from './icons.mjs';

export const css = `
  /* ── Slider ── 기본 <input type="range"> 에 옷만 입힌다. 트랙은 .slider__ctl::before 하나 — 채움은 --a(시작)~--b(끝) % 를 JS 가 input 이벤트 때 갱신 */
  .slider{display:flex;flex-direction:column;gap:var(--dim-x2);width:320px;max-width:100%}
  .slider__hd{display:flex;justify-content:space-between;align-items:baseline;gap:var(--dim-x3);font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral)}
  .slider__hd output{font-size:var(--font-size-t2);font-weight:var(--font-weight-semibold);font-variant-numeric:tabular-nums}
  .slider__ctl{--a:0%;--fill:var(--bg-brand-solid);position:relative;height:20px}
  .slider__ctl::before{content:"";position:absolute;left:10px;right:10px;top:7px;height:6px;border-radius:var(--radius-full);background:linear-gradient(to right,var(--bg-neutral-weak) var(--a),var(--fill) var(--a) var(--b),var(--bg-neutral-weak) var(--b))}
  .slider__ctl input{position:absolute;inset:0;width:100%;height:20px;margin:0;background:transparent;-webkit-appearance:none;appearance:none;cursor:pointer}
  .slider__ctl input:focus-visible{outline:none}
  .slider__ctl input::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;border:1px solid var(--stroke-neutral-stronger);background:var(--bg-layer-default);box-shadow:var(--shadow-1);transition:box-shadow var(--duration-fast)}
  .slider__ctl input::-moz-range-thumb{box-sizing:border-box;width:20px;height:20px;border-radius:50%;border:1px solid var(--stroke-neutral-stronger);background:var(--bg-layer-default);box-shadow:var(--shadow-1)}
  .slider__ctl input::-moz-range-track,.slider__ctl input::-moz-range-progress{background:transparent}
  .slider__ctl input:focus-visible::-webkit-slider-thumb,.slider.focus input::-webkit-slider-thumb{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .slider__ctl input:focus-visible::-moz-range-thumb{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .slider__ctl.range input{pointer-events:none} .slider__ctl.range input::-webkit-slider-thumb{pointer-events:auto} .slider__ctl.range input::-moz-range-thumb{pointer-events:auto}
  .slider__ends{display:flex;justify-content:space-between;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums}
  .slider__ticks{display:flex;justify-content:space-between;padding:0 10px;margin-top:calc(var(--dim-x1) * -1);font-size:var(--font-size-t1);color:var(--fg-neutral-muted)}
  .slider__ticks span{display:flex;flex-direction:column;align-items:center;gap:var(--dim-x1);width:0;white-space:nowrap} .slider__ticks span::before{content:"";width:1px;height:6px;background:var(--stroke-neutral-stronger)}
  .slider__ticks .on{color:var(--fg-neutral);font-weight:var(--font-weight-semibold)}
  .slider:has(:disabled) .slider__hd,.slider:has(:disabled) .slider__ends{color:var(--fg-disabled)} .slider:has(:disabled) .slider__ctl{--fill:var(--stroke-neutral-stronger)}
  .slider__ctl input:disabled{cursor:not-allowed} .slider__ctl input:disabled::-webkit-slider-thumb{border-color:var(--stroke-neutral-strong);box-shadow:none} .slider__ctl input:disabled::-moz-range-thumb{border-color:var(--stroke-neutral-strong);box-shadow:none}
  /* ── Toggle · Toggle group ── 눌림 상태(aria-pressed · aria-checked)를 가진 버튼. 눌림 = 잉크 채움(Chip selected 와 같은 뜻) */
  .tgroup{display:inline-flex;align-items:center;gap:2px;padding:2px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default)}
  .toggle{display:inline-flex;align-items:center;justify-content:center;gap:var(--dim-x1_5);height:30px;min-width:30px;padding:0 var(--dim-x2_5);border:0;border-radius:var(--radius-xs);background:transparent;font:inherit;font-size:var(--font-size-t2);font-weight:var(--font-weight-medium);line-height:1;color:var(--fg-neutral-subtle);cursor:pointer;white-space:nowrap;transition:background var(--duration-fast) var(--easing)}
  .toggle svg{width:18px;height:18px} .toggle[aria-label]{width:30px;padding:0} /* 아이콘만 = aria-label 이 있는 것 — 이름 없는 아이콘 토글은 정사각형이 되지 않는다 */
  .toggle:hover{background:var(--bg-neutral-hover);color:var(--fg-neutral)}
  .toggle[aria-pressed="true"],.toggle[aria-checked="true"]{background:var(--bg-brand-solid);color:var(--fg-on-brand)} .toggle[aria-pressed="true"]:hover,.toggle[aria-checked="true"]:hover{filter:brightness(1.25)}
  .toggle:focus-visible,.toggle.focus{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .toggle:disabled{background:var(--bg-neutral-weak);color:var(--fg-disabled);cursor:not-allowed;filter:none}
  .tgroup.sm .toggle{height:26px;min-width:26px;font-size:var(--font-size-t1)} .tgroup.sm .toggle[aria-label]{width:26px} .tgroup.sm .toggle svg{width:16px;height:16px}
  /* ── Button group ── .btn 을 붙인다: 이웃과 선을 공유(-1px), 바깥 모서리만 둥글게. 잉크 둘은 1px 틈으로 가른다 */
  .btngroup{display:inline-flex;vertical-align:middle}
  .btngroup>.btn{position:relative;border-radius:0}
  .btngroup>.btn:first-child{border-top-left-radius:var(--radius-md);border-bottom-left-radius:var(--radius-md)} .btngroup>.btn:last-child{border-top-right-radius:var(--radius-md);border-bottom-right-radius:var(--radius-md)}
  .btngroup>.btn+.btn{margin-left:-1px} .btngroup>.btn.brand-solid+.btn.brand-solid{margin-left:1px}
  .btngroup>.btn:hover,.btngroup>.btn:focus-visible{z-index:1} .btngroup>.btn:disabled{border-color:var(--stroke-neutral-strong)}
  .btngroup>.btngroup__icon{padding:0;aspect-ratio:1}
  /* ── Input group ── Text input 의 .field .ctrl 위에 붙는다(선·포커스 링·오류·disabled 는 .field 가 맡음). 가장자리 버튼·셀렉트는 선 하나로 가른다 */
  .igroup__unit{flex:none;font-size:var(--font-size-t2);color:var(--fg-neutral-muted)}
  .igroup__btn,.igroup__sel{position:relative;align-self:stretch;flex:none;display:inline-flex;align-items:center;gap:var(--dim-x1_5);padding:0 var(--dim-x3);border:0;background:transparent;font:inherit;font-size:var(--font-size-t2);font-weight:var(--font-weight-medium);line-height:1;color:var(--fg-neutral);cursor:pointer;transition:background var(--duration-fast)}
  .igroup__btn:first-child,.igroup__sel:first-child{margin-left:calc(var(--dim-x3) * -1);border-right:1px solid var(--stroke-neutral-strong);border-radius:calc(var(--radius-sm) - 1px) 0 0 calc(var(--radius-sm) - 1px)}
  .igroup__btn:last-child,.igroup__sel:last-child{margin-right:calc(var(--dim-x3) * -1);border-left:1px solid var(--stroke-neutral-strong);border-radius:0 calc(var(--radius-sm) - 1px) calc(var(--radius-sm) - 1px) 0}
  .igroup__btn:hover,.igroup__sel:hover{background:var(--bg-neutral-hover)} .igroup__btn:focus-visible,.igroup__sel:has(:focus-visible){outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .igroup__sel{padding:0} .igroup__sel select{-webkit-appearance:none;appearance:none;height:100%;padding:0 var(--dim-x8) 0 var(--dim-x3);border:0;background:transparent;font:inherit;color:inherit;cursor:pointer;outline:none} .igroup__sel svg{position:absolute;right:var(--dim-x2_5);pointer-events:none}
  .igroup .iconbtn svg{width:18px;height:18px;color:inherit} .igroup>.iconbtn:last-child{margin-right:calc(var(--dim-x1_5) * -1)}
  .igroup__btn:disabled{background:transparent;color:var(--fg-disabled);cursor:not-allowed}
  .igroup input:has(+ .igroup__unit){text-align:right} /* 단위가 붙는 값(금액 · 일수 · %)은 오른쪽 정렬 */
  .igroup__spin{display:inline-flex;flex:none} .igroup__spin svg{animation:spin .8s linear infinite}
  /* ── Number input ── − 값 단위 + 가 한 상자. 기본 <input type="number"> — ↑↓·min·max·step 은 브라우저가 */
  .numin{display:inline-flex;align-items:center;width:132px;height:36px;padding:0 3px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-sm);background:var(--bg-layer-default);color:var(--fg-neutral);transition:border-color var(--duration-fast),box-shadow var(--duration-fast)}
  .numin .iconbtn{width:28px;height:28px;flex:none} .numin .iconbtn svg{width:16px;height:16px}
  .numin__val{flex:1;min-width:0;display:flex;align-items:baseline;justify-content:center;gap:2px;font-size:var(--font-size-t2);cursor:text}
  .numin input{flex:none;width:calc(var(--numin-ch,3) * 1ch);padding:0;border:0;background:transparent;font:inherit;font-weight:var(--font-weight-semibold);color:inherit;text-align:right;font-variant-numeric:tabular-nums;outline:none;-moz-appearance:textfield;appearance:textfield}
  .numin input::-webkit-inner-spin-button,.numin input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}
  .numin__unit{color:var(--fg-neutral-muted)}
  .numin:focus-within,.numin.focus{border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  .numin:has([aria-invalid="true"]){border-color:var(--stroke-critical)}
  .numin:has(input:disabled){background:var(--bg-neutral-weak);border-color:transparent;color:var(--fg-disabled)} .numin:has(input:disabled) .numin__unit{color:var(--fg-disabled)}
  .numin.sm{width:112px;height:32px;padding:0 3px} .numin.sm .iconbtn{width:24px;height:24px} .numin.sm .numin__val{font-size:var(--font-size-t1)}
`;

// ── 마크업 조각 ──
const fig = (inner, cap) => '<figure class="ex">' + inner + '<figcaption>' + cap + '</figcaption></figure>';
const pct = (v, min, max) => +((v - min) / (max - min) * 100).toFixed(2) + '%';

// Slider. o: { label, out, min, max, step, v | [a,b], ends, ticks:[labels], on:index, cls, disabled, aria }
const slider = (o) => {
  const range = Array.isArray(o.v), dis = o.disabled ? ' disabled' : '';
  const inp = (v, lab) => '<input type="range" min="' + o.min + '" max="' + o.max + '" step="' + (o.step || 1) + '" value="' + v + '"' + (lab ? ' aria-label="' + lab + '"' : '') + (o.aria ? ' aria-valuetext="' + o.aria + '"' : '') + dis + '>';
  const ctl = range
    ? '<div class="slider__ctl range" style="--a:' + pct(o.v[0], o.min, o.max) + ';--b:' + pct(o.v[1], o.min, o.max) + '">' + inp(o.v[0], '최소 ' + o.label) + inp(o.v[1], '최대 ' + o.label) + '</div>'
    : '<div class="slider__ctl" style="--b:' + pct(o.v, o.min, o.max) + '">' + inp(o.v, o.label) + '</div>';
  return '<div class="slider' + (o.cls ? ' ' + o.cls : '') + '">' + (o.out ? '<div class="slider__hd"><span>' + o.label + '</span><output>' + o.out + '</output></div>' : '') + ctl +
    (o.ends ? '<div class="slider__ends"><span>' + o.ends[0] + '</span><span>' + o.ends[1] + '</span></div>' : '') +
    (o.ticks ? '<div class="slider__ticks" aria-hidden="true">' + o.ticks.map((t, i) => '<span' + (i === o.on ? ' class="on"' : '') + '>' + t + '</span>').join('') + '</div>' : '') + '</div>';
};
const BRIEF = { label: '브리핑 알림 미리 받기', min: 0, max: 30, step: 5, v: 10, out: '10분 전', aria: '10분 전', ends: ['0분', '30분'] };
const LEN = { label: '답변 길이', min: 0, max: 2, v: 1, out: '보통', aria: '보통', ticks: ['짧게', '보통', '자세히'], on: 1 };

// Toggle group. items: [label | {icon, label}], pressed: 인덱스 배열. single → radiogroup + aria-checked, multi → group + aria-pressed
const tg = (name, items, pressed, o = {}) => '<div class="tgroup' + (o.sm ? ' sm' : '') + '" role="' + (o.single ? 'radiogroup' : 'group') + '" aria-label="' + name + '">' + items.map((it, i) => {
  const on = pressed.includes(i), attr = o.single ? ' role="radio" aria-checked="' + on + '"' : ' aria-pressed="' + on + '"';
  return typeof it === 'string' ? '<button class="toggle"' + attr + (o.dis === i ? ' disabled' : '') + '>' + it + '</button>'
    : '<button class="toggle"' + attr + ' aria-label="' + it.label + '"' + (o.dis === i ? ' disabled' : '') + '>' + icon(it.icon + (o.sm && it.filled ? '-filled' : '')) + '</button>';
}).join('') + '</div>';
const DAYS = ['월', '화', '수', '목', '금'];
const VIEW = [{ icon: 'layout-list', label: '목록', filled: 1 }, { icon: 'layout-grid', label: '달력', filled: 1 }];
const FMT = [{ icon: 'bold', label: '굵게' }, { icon: 'italic', label: '기울임' }, { icon: 'underline', label: '밑줄' }];

// Button group
const bg = (name, inner, role) => '<div class="btngroup" role="' + (role || 'group') + '" aria-label="' + name + '">' + inner + '</div>';
const ob = (size, label, ico, dis) => '<button class="btn ' + size + ' neutral-outline"' + (dis ? ' disabled' : '') + '>' + (ico ? icon(ico) : '') + label + '</button>';
const ib = (size, ico, label, dis, cls) => '<button class="btn ' + size + ' neutral-outline btngroup__icon" aria-label="' + label + '"' + (dis ? ' disabled' : '') + '>' + icon(ico, cls) + '</button>';
const TOOLS = (size, redoOff) => bg('편집 도구', ib(size, 'arrow-back-up', '실행 취소') + ib(size, 'arrow-forward-up', '다시 실행', redoOff) + ib(size, 'zoom-in', '확대'), 'toolbar');
const split = (size, open) => bg('상신', '<button class="btn ' + size + ' brand-solid">' + icon('send') + '상신</button><button class="btn ' + size + ' brand-solid btngroup__icon" aria-label="다른 상신 방법" aria-haspopup="menu" aria-expanded="' + !!open + '">' + icon('chevron-down') + '</button>');
const MENU = '<div class="menu" role="menu" aria-label="다른 상신 방법"><button class="menu__item two" role="menuitem">' + icon('clock') + '<span class="menu__text">예약 상신<small>정한 시각에 결재선으로 올립니다</small></span></button><button class="menu__item" role="menuitem">' + icon('file-text') + '<span class="menu__text">임시 저장</span><span class="menu__end">Ctrl+S</span></button><button class="menu__item" role="menuitem">' + icon('users') + '<span class="menu__text">결재선 바꾸기</span></button><hr class="menu__sep"><button class="menu__item danger" role="menuitem">' + icon('trash') + '<span class="menu__text">초안 삭제</span></button></div>';

// Input group — .field(라벨 · 도움말 · 상태) + .ctrl.igroup(한 선 · 한 링)
const fld = (label, ctrl, help, cls) => '<div class="field md' + (cls ? ' ' + cls : '') + '"><label>' + label + '</label>' + ctrl + (help ? '<div class="help">' + help + '</div>' : '') + '</div>';
const grp = (inner) => '<div class="ctrl igroup">' + inner + '</div>';
const unit = (u) => '<span class="igroup__unit">' + u + '</span>';
const act = (ico, label, extra) => '<button class="iconbtn sm ghost" aria-label="' + label + '"' + (extra || '') + '>' + icon(ico) + '</button>';
const gbtn = (label, ico, dis) => '<button class="igroup__btn"' + (dis ? ' disabled' : '') + '>' + (ico ? icon(ico) : '') + label + '</button>';
const gsel = (opts, label) => '<label class="igroup__sel"><select aria-label="' + label + '">' + opts.map(o => '<option>' + o + '</option>').join('') + '</select>' + icon('chevron-down') + '</label>';
const SPIN = '<span class="igroup__spin" role="status" aria-label="찾는 중">' + icon('loader-2') + '</span>';
const LINK = '<input value="https://agent.uxis.co.kr/join" readonly>';

// Input OTP — 진짜 input 하나 + 그림 칸 여섯. o: { active, sep, err, dis }
// Number input. o: { label, v, min, max, step, unit, ch, sm, err, dis, focus }
const numin = (o) => {
  const v = +o.v, dis = o.dis ? ' disabled' : '';
  const b = (ico, verb, off) => '<button class="iconbtn sm ghost" tabindex="-1" aria-label="' + o.label + ' ' + verb + '"' + (o.dis || off ? ' disabled' : '') + '>' + icon(ico) + '</button>';
  return '<div class="numin' + (o.sm ? ' sm' : '') + (o.focus ? ' focus' : '') + '">' + b('minus', '줄이기', v <= o.min) +
    '<label class="numin__val"' + (o.ch ? ' style="--numin-ch:' + o.ch + '"' : '') + '><input type="number" inputmode="decimal" min="' + o.min + '" max="' + o.max + '" step="' + o.step + '" value="' + o.v + '" aria-label="' + o.label + '"' + (o.err ? ' aria-invalid="true"' : '') + dis + '><span class="numin__unit">' + o.unit + '</span></label>' +
    b('plus', '늘리기', v >= o.max) + '</div>';
};
const LEAVE = { label: '연차 일수', v: '1.5', min: 0.5, max: 11, step: 0.5, unit: '일' };
const PPL = { label: '참석 인원', v: '8', min: 1, max: 20, step: 1, unit: '명', ch: 2 };
const nfld = (label, ctl, help, cls) => '<div class="field' + (cls ? ' ' + cls : '') + '"><label>' + label + '</label>' + ctl + (help ? '<div class="help">' + help + '</div>' : '') + '</div>';

export const pages = `
<section class="page" id="components/slider">
  <h1>Slider</h1>
  <p class="desc">정해진 범위 안에서 값을 끌어서 고릅니다. 정확한 숫자보다 「대략 이 정도」가 중요한 설정(브리핑 알림 시각 · 답변 길이 · 회의실 인원 범위)에 씁니다. 브라우저 기본 <code>&lt;input type="range"&gt;</code> 에 옷만 입혀 키보드 조작은 브라우저가 맡습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${slider(BRIEF)}</div>
    <ol><li><b>Label · Value</b> — 왼쪽 라벨 t1 500, 오른쪽 현재 값 <code>&lt;output&gt;</code> t2 600</li><li><b>Track</b> — 6px 알약, <code>--bg-neutral-weak</code></li><li><b>Fill</b> — 시작부터 thumb 까지 잉크 <code>--bg-brand-solid</code></li><li><b>Thumb</b> — 20px 흰 원 + 선 + 그림자. 포커스 링은 여기에</li><li><b>Min · Max</b> (선택) — 양 끝 값 t1 muted</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    ${fig(slider(BRIEF), 'single — 값 하나. 채움은 0 에서 thumb 까지')}
    ${fig(slider({ label: '회의실 수용 인원', min: 2, max: 20, v: [4, 10], out: '4 – 10명', ends: ['2명', '20명'] }), 'range — thumb 둘. 채움은 두 thumb 사이. 회의실 찾기의 인원 조건')}
  </div>
  <table><tr><th>Variant</th><th>구성</th><th>쓰임</th></tr><tr><td>single</td><td>input 하나</td><td>알림 시각 · 답변 길이처럼 값 하나</td></tr><tr><td>range</td><td>input 둘을 겹침(트랙은 하나)</td><td>인원 · 시간대처럼 「어디부터 어디까지」</td></tr></table>
  <h3>Labels — 값 · 양 끝 · 눈금</h3>
  <div class="demo col">
    ${fig(slider({ ...BRIEF, ends: null }), 'value — 오른쪽 위에 현재 값. 끄는 동안 바로 바뀝니다')}
    ${fig(slider(BRIEF), 'value + min·max — 범위를 모르면 끝을 적습니다')}
    ${fig(slider(LEN), 'ticks — 단계가 다섯 이하이고 단계마다 이름이 있을 때')}
  </div>
  <h3>Step</h3>
  <div class="demo col">
    ${fig(slider({ ...BRIEF, label: '브리핑 알림 미리 받기 · step 5', ends: null }), 'step 5 — 0 · 5 · 10 … 30분. 5분 아래는 뜻이 없어 막습니다')}
    ${fig(slider({ ...LEN, label: '답변 길이 · step 1' }), 'step 1 · 3단계 — 짧게 · 보통 · 자세히')}
  </div>
  <table><tr><th>값 종류</th><th>step</th><th>표시</th></tr><tr><td>분 · 인원 같은 연속 값</td><td>업무 단위(5분 · 1명)</td><td>value + min·max</td></tr><tr><td>이름 있는 단계 3~5개</td><td>1</td><td>ticks, 현재 단계 라벨을 진하게</td></tr></table>
  <h3>State</h3>
  <div class="demo col">
    ${fig(slider({ ...BRIEF, ends: null }), '기본')}
    ${fig(slider({ ...BRIEF, ends: null, cls: 'focus' }), 'focus — thumb 에 accent 링. 키보드로 들어왔을 때만')}
    ${fig(slider({ ...BRIEF, ends: null, disabled: 1 }), 'disabled — 채움 <code>--stroke-neutral-stronger</code>, 그림자 없음, 글자 <code>--fg-disabled</code>')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${slider({ ...BRIEF, ends: null })}</div>현재 값을 늘 글자로 보여 줍니다 — 「10분 전」. 끌어 놓고 무엇을 골랐는지 몰라서는 안 됩니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${slider({ label: '연차 일수', min: 0, max: 15, step: 0.5, v: 1.5 })}</div>연차 1.5일처럼 정확한 값이 필요한 곳에 쓰지 않습니다 — 0.5 칸을 끌어 맞추기 어렵습니다. Number input 으로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>바꾸면 즉시 저장하는 설정 행(설정 · 에이전트)에 둡니다. 저장이 필요하면 놓는 순간(<code>change</code>)에 한 번.</div>
    <div class="dont"><b>Don&#39;t</b>단계가 둘이면 Switch, 이름 있는 선택지가 여섯 이상이면 Select. 트랙에 틸을 칠하지 않습니다 — 채움은 잉크.</div>
  </div>
  <h2>Slider vs. Number input vs. Select</h2>
  <table><tr><th></th><th>Slider</th><th>Number input</th><th>Select</th></tr><tr><td>값</td><td>범위 안의 대략적인 수</td><td>정확한 수</td><td>이름 있는 선택지</td></tr><tr><td>범위</td><td>좁고 연속(0–30분)</td><td>좁거나 넓음, step 명확</td><td>4~20개</td></tr><tr><td>조작</td><td>끌기 · ← →</td><td>− + · 직접 입력</td><td>펼쳐서 고르기</td></tr><tr><td>예</td><td>브리핑 알림 · 답변 길이</td><td>연차 1.5일 · 참석 인원</td><td>테마 · 브리핑 시각</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>트랙</td><td>6px · <code>--radius-full</code> · <code>--bg-neutral-weak</code> · 좌우 10px 안쪽(thumb 중심과 % 가 일치)</td></tr><tr><td>채움</td><td><code>--bg-brand-solid</code> — <code>--a</code>~<code>--b</code>(%) 를 JS 가 <code>input</code> 이벤트 때 갱신</td></tr><tr><td>thumb</td><td>20px · <code>--bg-layer-default</code> · 선 <code>--stroke-neutral-stronger</code> · <code>--shadow-2</code></td></tr><tr><td>라벨 / 값 / 끝·눈금</td><td>t1 500 <code>--fg-neutral</code> / t2 600 tabular / t1 <code>--fg-neutral-muted</code>, 눈금 1×6px <code>--stroke-neutral-stronger</code></td></tr><tr><td>focus / disabled</td><td>thumb 에 <code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px / 채움 <code>--stroke-neutral-stronger</code> · 글자 <code>--fg-disabled</code></td></tr><tr><td>접근성</td><td>기본 range — ← → 한 step, PageUp/Down 큰 폭, Home/End 끝. 단위는 <code>aria-valuetext="10분 전"</code>, range 는 input 마다 <code>aria-label="최소 · 최대 …"</code></td></tr></table>
</section>

<section class="page" id="components/toggle-group">
  <h1>Toggle group</h1>
  <p class="desc">눌림 상태를 가진 버튼(Toggle)의 묶음. 하나만 고르는 단일 선택(보기 전환)과 여럿을 켜는 다중 선택(요일 · 글자 서식)이 있습니다. 눌린 항목은 잉크로 채워지고, 누르면 그 자리에서 바로 적용됩니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${tg('외근 반복 요일', DAYS, [0, 2, 4])}</div>
    <ol><li><b>Container</b> — 1px 선 · 라운드 md · 2px 안쪽 여백</li><li><b>Toggle</b> — 30px, 라운드 xs, t2 500 subtle</li><li><b>Pressed</b> — <code>--bg-brand-solid</code> + <code>--fg-on-brand</code></li><li><b>Group label</b> — 보이지 않는 이름 <code>aria-label="외근 반복 요일"</code></li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Selection</h3>
  <div class="demo">
    ${fig(tg('보기', VIEW, [0], { single: 1 }), 'single — 늘 하나만 눌림(목록 / 달력)')}
    ${fig(tg('외근 반복 요일', DAYS, [0, 2, 4]), 'multi — 0개 이상 눌림(요일)')}
    ${fig(tg('글자 서식', FMT, [0]), 'multi · 아이콘 — 업무일지 편집기 서식')}
  </div>
  <table><tr><th>선택</th><th>역할</th><th>규칙</th></tr><tr><td>single</td><td><code>role="radiogroup"</code> + <code>role="radio" aria-checked</code></td><td>눌린 것을 다시 눌러도 꺼지지 않습니다 — 항상 하나</td></tr><tr><td>multi</td><td><code>role="group"</code> + <code>aria-pressed</code></td><td>항목마다 독립. 모두 꺼질 수 있습니다</td></tr></table>
  <h3>Size</h3>
  <div class="demo">
    ${fig(tg('보기', VIEW, [0], { single: 1, sm: 1 }), 'sm — 32px 묶음 · 16px filled 아이콘')}
    ${fig(tg('보기', VIEW, [0], { single: 1 }), 'md — 36px 묶음 · 18px 아이콘')}
    ${fig(tg('외근 반복 요일', DAYS, [0, 2, 4], { sm: 1 }), 'sm · 글자 — t1')}
  </div>
  <table><tr><th>크기</th><th>묶음 / 항목</th><th>글자 · 아이콘</th><th>나란히 두는 것</th></tr><tr><td>sm</td><td>32 / 26px</td><td>t1 · 16px(<code>-filled</code>)</td><td>Button sm · Select sm — 표 머리 · 툴바</td></tr><tr><td>md</td><td>36 / 30px</td><td>t2 · 18px</td><td>Select · Text input md — 패널 머리 · 폼</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${fig('<button class="toggle" aria-pressed="false" aria-label="굵게">' + icon('bold') + '</button>', '기본')}
    ${fig('<button class="toggle" aria-pressed="false" aria-label="굵게" style="background:var(--bg-neutral-hover);color:var(--fg-neutral)">' + icon('bold') + '</button>', 'hover')}
    ${fig('<button class="toggle" aria-pressed="true" aria-label="굵게">' + icon('bold') + '</button>', 'pressed')}
    ${fig('<button class="toggle focus" aria-pressed="false" aria-label="굵게">' + icon('bold') + '</button>', 'focus')}
    ${fig('<button class="toggle" aria-pressed="false" aria-label="굵게" disabled>' + icon('bold') + '</button>', 'disabled')}
    ${fig(tg('외근 반복 요일', DAYS, [0], { dis: 4 }), '묶음 안 disabled — 공휴일로 막힌 금요일')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${tg('글자 서식', FMT, [0])}</div>아이콘만 있는 토글은 <code>aria-label</code> + Tooltip(「굵게 Ctrl+B」). 이름이 있어야 정사각형이 됩니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${tg('보기 기간', ['일', '주', '2주', '월', '분기', '연'], [1], { single: 1 })}</div>여섯 개 이상 늘어놓지 않습니다 — 단일 선택이 넷을 넘으면 Select.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>한 묶음에는 같은 종류만(서식끼리 · 요일끼리). 실행 버튼(저장 · 삭제)이 섞이면 Button group 과 나눕니다.</div>
    <div class="dont"><b>Don&#39;t</b>내용 영역 전체를 바꾸는 탭 전환에 쓰지 않습니다 — 수신함 / 발신함처럼 건수가 붙는 보기는 Segmented control.</div>
  </div>
  <h2>Toggle group vs. Segmented control vs. Chip vs. Switch</h2>
  <table><tr><th></th><th>Toggle group</th><th>Segmented control</th><th>Chip</th><th>Switch</th></tr><tr><td>뜻</td><td>도구 · 서식 · 보기 옵션</td><td>같은 데이터의 보기 전환</td><td>목록 필터 · 제안</td><td>설정 하나 켜기/끄기</td></tr><tr><td>선택</td><td>단일 · 다중</td><td>단일</td><td>단일 · 다중</td><td>켜짐/꺼짐</td></tr><tr><td>눌림 모양</td><td>선 있는 상자 안 잉크 채움</td><td>회색 트랙 위 흰색 + 그림자</td><td>알약 잉크 채움</td><td>잉크 트랙</td></tr><tr><td>아이콘만</td><td>가능(aria-label)</td><td>불가</td><td>불가</td><td>불가</td></tr><tr><td>자리</td><td>툴바 · 편집기 · 폼</td><td>패널 머리</td><td>목록 위</td><td>설정 행</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Container</td><td>선 <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · 패딩 2px · 항목 사이 2px · <code>--bg-layer-default</code></td></tr><tr><td>Toggle</td><td>md 30px · sm 26px · <code>--radius-xs</code> · 글자 <code>--fg-neutral-subtle</code> 500 · 아이콘만이면 정사각형</td></tr><tr><td>hover</td><td><code>--bg-neutral-hover</code> + <code>--fg-neutral</code>. 눌린 항목은 <code>brightness(1.25)</code></td></tr><tr><td>pressed</td><td><code>--bg-brand-solid</code> + <code>--fg-on-brand</code> — 틸을 쓰지 않습니다</td></tr><tr><td>focus / disabled</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code> 1px / <code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr><tr><td>접근성</td><td>Tab 은 묶음에 한 번 들어가고 ← → 로 항목 이동(roving tabindex). Space · Enter 로 누름. 다중은 <code>aria-pressed</code>, 단일은 <code>role="radio" aria-checked</code>, 묶음에 <code>aria-label</code></td></tr></table>
</section>

<section class="page" id="components/button-group">
  <h1>Button group</h1>
  <p class="desc">관련된 버튼을 선을 공유해 한 덩어리로 붙입니다. 바깥 모서리만 둥글고, 상태는 없습니다 — 누르면 실행될 뿐입니다. 주요 행동에 대안이 딸려 있으면 split button 으로 나눕니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${bg('업무일지 문서', ob('md', '복사', 'copy') + ob('md', '공유', 'share') + ob('md', '내려받기', 'download'))}</div>
    <ol><li><b>Group</b> — <code>role="group"</code> + <code>aria-label</code>. 버튼 사이 간격 0</li><li><b>Button</b> — <code>.btn neutral-outline</code> 그대로. 이웃과 선 1px 을 공유합니다</li><li><b>Outer corners</b> — 첫 버튼 왼쪽 · 끝 버튼 오른쪽만 <code>--radius-md</code></li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    ${fig(bg('업무일지 문서', ob('md', '복사', 'copy') + ob('md', '공유', 'share') + ob('md', '내려받기', 'download')), 'attached — 같은 무게의 행동 2~4개')}
    ${fig(TOOLS('md'), 'icon — 툴바. 실행 취소 · 다시 실행 · 확대, 정사각형')}
    ${fig(split('md', true) + MENU, 'split — 잉크 주요 행동 + 대안 메뉴(열린 상태). 메뉴는 공용 Menu')}
  </div>
  <table><tr><th>Variant</th><th>구성</th><th>쓰임</th></tr><tr><td>attached</td><td>neutral-outline 버튼, 선 공유</td><td>문서 · 목록의 보조 행동 묶음</td></tr><tr><td>icon</td><td>정사각형 아이콘 버튼 + <code>role="toolbar"</code></td><td>편집기 · 다이어그램 툴바</td></tr><tr><td>split</td><td>brand-solid 주요 행동 + chevron(메뉴 열기), 1px 틈</td><td>「상신」처럼 기본 행동이 분명하고 대안이 드문 경우</td></tr></table>
  <h3>Size</h3>
  <div class="demo">
    ${fig(TOOLS('sm'), 'sm — 32px · 16px 아이콘')}
    ${fig(TOOLS('md'), 'md — 40px · 18px 아이콘')}
    ${fig(split('sm'), 'split sm')}
    ${fig(split('md'), 'split md')}
  </div>
  <table><tr><th>크기</th><th>높이</th><th>쓰임</th></tr><tr><td>sm</td><td>32px (Button sm)</td><td>카드 · 표 머리 · 편집기 툴바</td></tr><tr><td>md</td><td>40px (Button md)</td><td>화면 머리 · 다이얼로그 푸터</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${fig(TOOLS('md', true), 'disabled 항목 — 되돌릴 것이 없는 「다시 실행」. 선은 유지')}
    ${fig(bg('편집 도구', ib('md', 'arrow-back-up', '실행 취소') + '<button class="btn md neutral-outline btngroup__icon" aria-label="다시 실행" style="z-index:1;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)">' + icon('arrow-forward-up') + '</button>' + ib('md', 'zoom-in', '확대'), 'toolbar'), 'focus — 링이 이웃 위로 올라옵니다')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${bg('주 이동', ib('sm', 'chevron-left', '이전 주') + ob('sm', '이번 주') + ib('sm', 'chevron-right', '다음 주'))}</div>한 가지 일을 나눈 행동만 붙입니다 — 출퇴근 주 이동 ‹ 이번 주 ›.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${bg('문서', '<button class="btn sm brand-solid">저장</button>' + ob('sm', '삭제'))}</div>solid 와 outline 을 한 묶음에 섞지 않습니다(split 만 예외). 삭제는 떨어뜨려 critical 로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>split 의 왼쪽은 열에 아홉 번 누르는 행동(「상신」), 메뉴에는 같은 일의 다른 방법(예약 상신 · 임시 저장)만.</div>
    <div class="dont"><b>Don&#39;t</b>눌림 상태가 필요하면 Button group 이 아닙니다 — 목록/달력 · 요일은 Toggle group.</div>
  </div>
  <h2>Button group vs. Toggle group</h2>
  <table><tr><th></th><th>Button group</th><th>Toggle group</th></tr><tr><td>누르면</td><td>행동 실행, 상태 없음</td><td>켜짐/꺼짐이 남음</td></tr><tr><td>모양</td><td>버튼끼리 선 공유, 바깥 모서리만 둥글게</td><td>선 있는 상자 안에 떨어진 항목</td></tr><tr><td>눌림 표시</td><td>없음</td><td>잉크 채움</td></tr><tr><td>역할</td><td><code>group</code> · <code>toolbar</code></td><td><code>group</code>(aria-pressed) · <code>radiogroup</code></td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>버튼</td><td><code>.btn</code> sm 32 · md 40, neutral-outline(<code>--stroke-neutral-strong</code>) · split 은 brand-solid</td></tr><tr><td>공유 선</td><td>이웃과 <code>margin-left:-1px</code>, hover · focus 항목은 <code>z-index:1</code> 로 위에</td></tr><tr><td>모서리</td><td>바깥만 <code>--radius-md</code>, 안쪽 0</td></tr><tr><td>split 틈</td><td>잉크 둘 사이 1px — 바탕이 비쳐 선 대신 가릅니다</td></tr><tr><td>아이콘 버튼</td><td>정사각형(<code>aspect-ratio:1</code>) · sm 16px · md 18px</td></tr><tr><td>메뉴</td><td>공용 <code>.menu</code> — 묶음 아래 8px, 왼쪽 맞춤. 항목은 같은 일의 다른 방법만</td></tr><tr><td>접근성</td><td>묶음은 <code>role="group" aria-label</code>, 툴바는 <code>role="toolbar"</code> + ← → 이동. chevron 은 <code>aria-haspopup="menu" aria-expanded</code> + 이름(「다른 상신 방법」), Esc 로 닫으면 포커스를 chevron 으로</td></tr></table>
</section>

<section class="page" id="components/input-group">
  <h1>Input group</h1>
  <p class="desc">Text input 한 칸에 아이콘 · 단위 · 버튼 · 셀렉트를 붙인 묶음. 선도 하나, 포커스 링도 하나 — 묶음 전체가 한 입력처럼 보입니다. 라벨 · 도움말 · 오류는 Text input(<code>.field</code>)을 그대로 씁니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${fld('담당자 찾기', grp(icon('search') + '<input value="김부장">' + act('x', '지우기') + gbtn('검색')), '이름 · 팀 · 시스템으로 찾습니다')}</div>
    <ol><li><b>Group</b> — <code>.ctrl</code> 하나: 1px 선 · 라운드 sm · <code>:focus-within</code> 링</li><li><b>Leading</b> (선택) — 16px 아이콘, 셀렉트, 또는 앞 글자</li><li><b>Input</b> — 남는 폭을 모두 차지</li><li><b>Inline action</b> (선택) — 지우기 · 보기 · 로딩, 28px ghost</li><li><b>Edge button</b> (선택) — 오른쪽 끝에 붙은 버튼, 선 하나로 가름</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Leading · Unit</h3>
  <div class="demo">
    ${fig(fld('사내 메일', grp(icon('mail-filled') + '<input value="yoon@uxis.co.kr">')), 'leading icon — Text input 의 prefix 그대로')}
    ${fig(fld('지출 금액', grp('<input value="45,000" inputmode="numeric">' + unit('원'))), 'unit 원 — 값은 오른쪽 정렬')}
    ${fig(fld('출장 기간', grp('<input value="3" inputmode="numeric">' + unit('일'))), 'unit 일')}
    ${fig(fld('업무 진척률', grp('<input value="80" inputmode="numeric">' + unit('%'))), 'unit %')}
  </div>
  <h3>Edge — 버튼 · 셀렉트</h3>
  <div class="demo">
    ${fig(fld('담당자 찾기', grp(icon('search') + '<input placeholder="이름 · 팀 · 시스템">' + gbtn('검색'))), 'button — 입력값으로 실행')}
    ${fig(fld('진입 코드 안내 링크', grp(LINK + gbtn('복사', 'copy'))), 'button + icon — 읽기 전용 값 복사')}
    ${fig(fld('휴대전화', grp(gsel(['+82', '+1', '+81'], '국가 번호') + '<input value="10-1234-5678" inputmode="tel">')), 'select 앞 — 국가 번호')}
    ${fig(fld('사내 메일', grp('<input value="yoon">' + gsel(['@uxis.co.kr', '@waple.co.kr'], '메일 도메인'))), 'select 뒤 — 도메인')}
  </div>
  <h3>Inline action</h3>
  <div class="demo">
    ${fig(fld('회의 제목', grp('<input value="주간 디자인 리뷰">' + act('x', '지우기'))), 'clear — 값이 있을 때만 보입니다')}
    ${fig(fld('비밀번호', grp(icon('lock-filled') + '<input type="password" value="waple2026" autocomplete="current-password">' + act('eye', '비밀번호 보기', ' aria-pressed="false"'))), 'reveal — 가림(eye)')}
    ${fig(fld('비밀번호', grp(icon('lock-filled') + '<input type="text" value="waple2026" autocomplete="current-password">' + act('eye-off', '비밀번호 보기', ' aria-pressed="true"'))), 'reveal — 보임(eye-off)')}
    ${fig(fld('담당자 찾기', grp(icon('search') + '<input value="윤아린">' + SPIN), '구성원에서 찾는 중입니다'), 'loading — 결과를 기다리는 동안')}
  </div>
  <table><tr><th>부품</th><th>자리</th><th>규칙</th></tr><tr><td>unit</td><td>뒤</td><td>t2 muted, 입력하지 않는 글자. 값은 오른쪽 정렬</td></tr><tr><td>edge button</td><td>뒤 끝</td><td>입력값에 대한 행동 하나(검색 · 복사). 둘 이상 붙이지 않습니다</td></tr><tr><td>edge select</td><td>앞 끝 · 뒤 끝</td><td>값의 형식(국가 번호 · 도메인)을 고름</td></tr><tr><td>inline action</td><td>뒤</td><td>clear · reveal · loading 중 하나. 18px 아이콘</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${fig(fld('지출 금액', grp('<input value="45,000">' + unit('원')), '', 'focus'), 'focus — 묶음 전체에 링 하나')}
    ${fig(fld('지출 금액', grp('<input value="4,500,000" aria-invalid="true">' + unit('원')), '1회 한도 300만 원을 넘었습니다', 'error'), 'error — 선 · 문구 critical')}
    ${fig(fld('진입 코드 안내 링크', grp('<input value="https://agent.uxis.co.kr/join" disabled>' + gbtn('복사', 'copy', 1)), '', 'disabled'), 'disabled — 부품도 함께')}
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${fld('지출 금액', grp('<input value="45,000">' + unit('원')))}</div>단위는 값 밖에 붙입니다 — 사용자는 숫자만 칩니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${fld('지출 금액', grp('<input value="45,000원">'))}</div>단위를 값에 섞어 받지 않습니다 — 「45,000원」은 숫자 검증이 깨집니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>입력에 딸린 행동만 붙입니다(검색 · 복사). 폼 전체의 제출은 아래 Button 으로.</div>
    <div class="dont"><b>Don&#39;t</b>부품마다 선 · 링을 따로 두지 않습니다. 붙은 버튼에 잉크를 칠하지 않습니다 — 화면의 주요 행동은 따로 있습니다.</div>
  </div>
  <h2>Input group vs. Text input</h2>
  <table><tr><th></th><th>Input group</th><th>Text input</th></tr><tr><td>안에 든 것</td><td>값 + 단위 · 버튼 · 셀렉트 · 동작</td><td>값 + (선택) 앞 아이콘</td></tr><tr><td>선 · 링</td><td>묶음에 하나</td><td>입력에 하나</td></tr><tr><td>쓰임</td><td>형식이 붙는 값(금액 · 전화 · 메일) · 즉시 행동</td><td>이름 · 제목 · 메모</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Group</td><td><code>.field .ctrl</code> — 선 <code>--stroke-neutral-strong</code> · <code>--radius-sm</code> · md 36 / lg 44 · 패딩 <code>--dim-x3</code></td></tr><tr><td>Unit</td><td>t2 <code>--fg-neutral-muted</code></td></tr><tr><td>Edge button · select</td><td>높이 전체 · 패딩 <code>--dim-x3</code> · t2 500 · 가름선 <code>--stroke-neutral-strong</code> · hover <code>--bg-neutral-hover</code> · 포커스 안쪽 2px <code>--stroke-focus</code></td></tr><tr><td>Inline action</td><td><code>.iconbtn sm ghost</code> 28px · 아이콘 18px · 로딩 <code>loader-2</code> 회전</td></tr><tr><td>focus / error / disabled</td><td><code>--stroke-accent</code> + <code>--bg-accent-weak</code> 3px / <code>--stroke-critical</code> · help <code>--fg-critical</code> / <code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr><tr><td>접근성</td><td>라벨은 input 에 <code>&lt;label for&gt;</code>. 아이콘 버튼은 <code>aria-label</code>, reveal 은 <code>aria-pressed</code>, 셀렉트는 <code>aria-label="국가 번호"</code>, 로딩은 <code>role="status"</code>. Tab 순서는 보이는 순서</td></tr></table>
</section>



<section class="page" id="components/number-input">
  <h1>Number input</h1>
  <p class="desc">− 값 + 로 정확한 수를 한 step 씩 바꾸고, 가운데를 눌러 직접 칠 수도 있습니다(seed 의 Quantity picker). 연차 1.5일처럼 업무 규칙이 정한 단위(반차 0.5일)가 있는 값에 씁니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${nfld('연차 일수', numin(LEAVE), '반차(0.5일) 단위 · 잔여 11일')}</div>
    <ol><li><b>Container</b> — 1px 선 · 라운드 sm · md 36px</li><li><b>Decrement</b> — 28px ghost iconbtn(minus). 최솟값이면 disabled</li><li><b>Value</b> — 기본 <code>&lt;input type="number"&gt;</code>, t2 600 tabular. 직접 입력</li><li><b>Unit</b> (선택) — 일 · 명, muted</li><li><b>Increment</b> — plus. 최댓값이면 disabled</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Step</h3>
  <div class="demo">
    ${fig(numin(LEAVE), 'step 0.5 — 연차(반차 단위)')}
    ${fig(numin(PPL), 'step 1 — 참석 인원')}
  </div>
  <h3>Size</h3>
  <div class="demo">
    ${fig(numin({ ...PPL, sm: 1 }), 'sm — 32px · t1. 표 · 카드 안')}
    ${fig(numin(PPL), 'md — 36px · t2. 폼 · 패널 기본')}
  </div>
  <table><tr><th>크기</th><th>상자 / 버튼</th><th>글자</th><th>나란히 두는 것</th></tr><tr><td>sm</td><td>32 / 24px</td><td>t1</td><td>Select sm · Button sm</td></tr><tr><td>md</td><td>36 / 28px</td><td>t2</td><td>Text input · Select md</td></tr></table>
  <h3>Limit</h3>
  <div class="demo">
    ${fig(numin({ ...PPL, v: '1' }), 'min — − disabled')}
    ${fig(numin({ ...PPL, v: '20' }), 'max — + disabled(회의실 수용 20명)')}
  </div>
  <h3>State</h3>
  <div class="demo">
    ${fig(numin(PPL), '기본')}
    ${fig(numin({ ...PPL, focus: 1 }), 'focus — 직접 입력 중, 상자에 링')}
    ${fig(nfld('참석 인원', numin({ ...PPL, v: '24', err: 1 }), '회의실 수용 인원은 20명까지입니다', 'error'), 'error — 범위 밖')}
    ${fig(numin({ ...LEAVE, dis: 1 }), 'disabled — 잔여 연차 없음')}
  </div>
  <table><tr><th>상태</th><th>모양</th><th>규칙</th></tr><tr><td>focus</td><td><code>--stroke-accent</code> + 3px 링</td><td>↑↓ 로 한 step. 입력 중에는 고치지 않습니다</td></tr><tr><td>error</td><td><code>--stroke-critical</code> + help</td><td>떠날 때(blur) 범위를 검사해 <code>aria-invalid</code></td></tr><tr><td>min / max</td><td>해당 버튼 disabled</td><td>값을 넘기지 않고 멈춥니다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${nfld('연차 일수', numin(LEAVE), '반차(0.5일) 단위 · 잔여 11일')}</div>step 은 업무 규칙대로(반차 0.5). 범위는 help 에 글로 적습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${nfld('지출 금액', numin({ label: '지출 금액', v: '45000', min: 0, max: 3000000, step: 1000, unit: '원', ch: 5 }))}</div>금액처럼 범위가 넓은 값은 누르기로 못 닿습니다 — 단위 붙은 Input group 으로.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>끝에 닿으면 버튼을 disabled 로 — 누를 수 있어 보이는데 아무 일도 없으면 고장처럼 보입니다.</div>
    <div class="dont"><b>Don&#39;t</b>24 를 친 순간 조용히 20 으로 바꾸지 않습니다 — 떠날 때 오류로 알리고 사용자가 고칩니다.</div>
  </div>
  <h2>Number input vs. Slider vs. Select</h2>
  <table><tr><th></th><th>Number input</th><th>Slider</th><th>Select</th></tr><tr><td>정확도</td><td>정확한 값, step 단위</td><td>대략적인 값</td><td>정해진 선택지</td></tr><tr><td>직접 입력</td><td>가능</td><td>불가</td><td>불가</td></tr><tr><td>폭</td><td>132px 고정</td><td>320px 이상</td><td>160px 이상</td></tr><tr><td>예</td><td>연차 1.5일 · 참석 8명</td><td>브리핑 알림 10분 전</td><td>브리핑 시각 09:00</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Container</td><td>md 132×36 · sm 112×32 · 선 <code>--stroke-neutral-strong</code> · <code>--radius-sm</code> · <code>--bg-layer-default</code> · 패딩 3px</td></tr><tr><td>− / +</td><td><code>.iconbtn ghost</code> md 28 · sm 24 · 16px minus · plus · disabled <code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr><tr><td>Value / Unit</td><td>t2 600 tabular, 폭은 최대 자릿수(<code>--numin-ch</code>) / <code>--fg-neutral-muted</code></td></tr><tr><td>focus / error / disabled</td><td><code>--stroke-accent</code> + <code>--bg-accent-weak</code> 3px / <code>--stroke-critical</code> / <code>--bg-neutral-weak</code> + <code>--fg-disabled</code></td></tr><tr><td>접근성</td><td>기본 number = <code>spinbutton</code> — ↑↓ step, <code>min · max · step</code> 은 속성으로. − + 는 <code>tabindex="-1"</code>(키보드는 input 이 맡음) + <code>aria-label="참석 인원 늘리기"</code>. 오류는 <code>aria-invalid</code> + <code>aria-describedby</code></td></tr></table>
</section>
`;

export const nav = [['components/slider', 'Slider'], ['components/toggle-group', 'Toggle group'], ['components/button-group', 'Button group'], ['components/input-group', 'Input group'], ['components/number-input', 'Number input']];

export const tint = ['toggle-group', 'button-group', 'input-group', 'number-input'];
