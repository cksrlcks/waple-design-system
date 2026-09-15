// 폼: Field · Checkbox · Radio group · Combobox · Time picker. Field 는 inputs.mjs 의 .field 위에 수식·자식 클래스만 더한다
import { icon } from './icons.mjs';
const CHK = icon('check'), MIN = icon('minus'), ERR = icon('alert-circle-filled'), X = icon('x'), CHEV = icon('chevron-down');

export const css = `
  /* ── Field ── inputs.mjs .field(label · .ctrl · .help) 위에: 선택 표시 · 변경 점 · 오류 줄 · inline 배치. 오류는 aria-invalid 가 켜야만 빨개진다(blur 전에는 아무것도 붉지 않게) */
  .field__opt{font-weight:var(--font-weight-regular);color:var(--fg-neutral-muted)}
  .field__mark{display:inline-block;width:6px;height:6px;margin-left:var(--dim-x1);border-radius:50%;background:var(--bg-warning-solid);vertical-align:2px}
  .field__reset{border:0;padding:0;background:none;font:inherit;color:var(--fg-neutral);text-decoration:underline;text-underline-offset:2px;cursor:pointer;border-radius:var(--radius-xs)} .field__reset:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .field__err{display:flex;align-items:flex-start;gap:var(--dim-x1);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-critical)} .field__err svg{width:16px;height:16px;flex:none;margin-top:1px}
  .field:has([aria-invalid="true"]) .ctrl,.field:has([aria-invalid="true"]) .select select{border-color:var(--stroke-critical)}
  .field.inline{display:grid;grid-template-columns:96px minmax(0,1fr);column-gap:var(--dim-x3);row-gap:var(--dim-x1_5);align-items:start}
  .field.inline>label{padding-top:9px;line-height:var(--line-height-t1)} .field.inline>*:not(label){grid-column:2} .field.inline .switch{min-height:36px}
  /* ── Fieldset ── 같은 질문에 속한 컨트롤 묶음. legend 는 라벨과 같은 t1 500 */
  .fset{display:flex;flex-direction:column;gap:var(--dim-x2);min-width:0;margin:0;padding:0;border:0;text-align:left}
  .fset>legend{padding:0;margin-bottom:var(--dim-x1);font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral)} .fset>legend em{font-style:normal;color:var(--fg-critical)}
  .fset.row{flex-direction:row;flex-wrap:wrap;gap:var(--dim-x2) var(--dim-x5)} .fset.row>legend{width:100%}
  .fset__desc{margin:calc(-1 * var(--dim-x1)) 0 var(--dim-x1);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .fset:has([aria-invalid="true"])>legend{color:var(--fg-critical)}
  /* ── Form ── 필드 세로 20 · 섹션 사이 32 · 버튼 줄은 오른쪽 정렬 */
  .form{display:flex;flex-direction:column;gap:var(--dim-x5);width:100%;max-width:520px;text-align:left} .form .field{min-width:0}
  .form__sec{display:flex;flex-direction:column;gap:var(--dim-x5)} .form__sec+.form__sec{margin-top:var(--dim-x3)}
  .form__sec>h4{margin:0 0 calc(-1 * var(--dim-x2));font-size:var(--font-size-t3);line-height:var(--line-height-t3);font-weight:var(--font-weight-semibold)}
  .form__actions{display:flex;justify-content:flex-end;align-items:center;gap:var(--dim-x2);padding-top:var(--dim-x2)} .form__actions>.form__aside{margin-right:auto}
  .form__errs{margin:var(--dim-x1_5) 0 0;padding-left:var(--dim-x4)} .form__errs li{margin-bottom:var(--dim-x0_5)} .form__errs a{text-decoration:underline;text-underline-offset:2px;color:var(--fg-neutral)}
  /* ── Checkbox ── 숨긴 native input + 상자. 켜짐 = 잉크 채움(Switch 켜짐과 같은 뜻). 마크는 check · 중간은 minus 아이콘 */
  .cbox{display:inline-flex;align-items:flex-start;gap:var(--dim-x2);position:relative;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral);cursor:pointer;vertical-align:middle;text-align:left}
  .cbox input{position:absolute;opacity:0;width:0;height:0;margin:0}
  .cbox__box{display:inline-flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px;margin-top:2px;border:1px solid var(--stroke-neutral-stronger);border-radius:calc(var(--radius-xs) - 2px);background:var(--bg-layer-default);color:var(--fg-on-brand);transition:background var(--duration-fast) var(--easing),border-color var(--duration-fast)}
  .cbox .cbox__box svg{display:none;width:12px;height:12px;margin:0;stroke-width:3} /* 12px 마크는 1.75 로는 안 보여 3 — 이 한 곳만 */
  .cbox:hover .cbox__box{border-color:var(--fg-neutral-muted)}
  .cbox input:checked+.cbox__box,.cbox input:indeterminate+.cbox__box,.cbox input[aria-checked="mixed"]+.cbox__box{background:var(--bg-brand-solid);border-color:var(--stroke-brand)}
  .cbox input:checked+.cbox__box svg:first-child,.cbox input:indeterminate+.cbox__box svg:last-child,.cbox input[aria-checked="mixed"]+.cbox__box svg:last-child{display:block}
  .cbox input:focus-visible+.cbox__box,.cbox.focus .cbox__box{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .cbox input[aria-invalid="true"]+.cbox__box{border-color:var(--stroke-critical)}
  .cbox:has(input:disabled){cursor:not-allowed;color:var(--fg-disabled)} .cbox input:disabled+.cbox__box{background:var(--bg-neutral-weak);border-color:transparent} .cbox input:disabled:checked+.cbox__box,.cbox input:disabled[aria-checked="mixed"]+.cbox__box{background:var(--stroke-neutral-stronger)}
  .cbox__text{min-width:0} .cbox__text small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)} .cbox:has(input:disabled) small{color:var(--fg-disabled)}
  .cbox.lg .cbox__box{width:20px;height:20px;margin-top:0;border-radius:var(--radius-xs)} .cbox.lg .cbox__box svg{width:14px;height:14px}
  /* ── Radio ── 같은 뼈대. 켜짐 = 잉크 채움 + 흰 점. card 는 행 전체가 눌리고 선택되면 잉크 선 2px */
  .radio{display:inline-flex;align-items:flex-start;gap:var(--dim-x2);position:relative;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral);cursor:pointer;vertical-align:middle;text-align:left}
  .radio input{position:absolute;opacity:0;width:0;height:0;margin:0}
  .radio__dot{display:inline-flex;align-items:center;justify-content:center;flex:none;width:16px;height:16px;margin-top:2px;border:1px solid var(--stroke-neutral-stronger);border-radius:50%;background:var(--bg-layer-default);transition:background var(--duration-fast) var(--easing),border-color var(--duration-fast)}
  .radio__dot::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--fg-on-brand);transform:scale(0);transition:transform var(--duration-fast) var(--easing)}
  .radio:hover .radio__dot{border-color:var(--fg-neutral-muted)}
  .radio input:checked+.radio__dot{background:var(--bg-brand-solid);border-color:var(--stroke-brand)} .radio input:checked+.radio__dot::after{transform:scale(1)}
  .radio input:focus-visible+.radio__dot,.radio.focus .radio__dot{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .radio input[aria-invalid="true"]+.radio__dot{border-color:var(--stroke-critical)}
  .radio:has(input:disabled){cursor:not-allowed;color:var(--fg-disabled)} .radio input:disabled+.radio__dot{background:var(--bg-neutral-weak);border-color:transparent} .radio input:disabled:checked+.radio__dot{background:var(--stroke-neutral-stronger)}
  .radio__text{min-width:0} .radio__text small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)} .radio:has(input:disabled) small{color:var(--fg-disabled)}
  .radio.lg .radio__dot{width:20px;height:20px;margin-top:0} .radio.lg .radio__dot::after{width:8px;height:8px}
  .radio.card{flex:1 1 240px;padding:var(--dim-x3) var(--dim-x3_5);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default);transition:border-color var(--duration-fast),background var(--duration-fast)}
  .radio.card:hover{background:var(--bg-neutral-hover)} .radio.card:has(input:checked){border-color:var(--stroke-brand);box-shadow:inset 0 0 0 1px var(--stroke-brand)}
  .radio.card:has(input:focus-visible),.radio.card.focus{box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)} .radio.card:has(input:focus-visible) .radio__dot,.radio.card.focus .radio__dot{box-shadow:none}
  .radio.card:has(input:checked):has(input:focus-visible),.radio.card.focus:has(input:checked){box-shadow:inset 0 0 0 1px var(--stroke-brand),0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .radio.card:has(input:disabled){background:var(--bg-neutral-weak);border-color:transparent} .radio.card:has([aria-invalid="true"]){border-color:var(--stroke-critical)}
  /* ── Time picker ── 패널은 .menu 와 같은 떠 있는 면. 칩은 Date picker 의 날짜 칸과 같은 문법(투명 → hover 톤 → 선택 잉크, 지금 = accent 테두리, 못 고름 = disabled 글자) */
  .timepick{display:flex;flex-direction:column;gap:var(--dim-x3);width:288px;max-width:100%;padding:var(--dim-x3);background:var(--bg-layer-floating);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);box-shadow:var(--shadow-2);text-align:left;font-size:var(--font-size-t2);color:var(--fg-neutral)}
  .timepick__hd{display:flex;align-items:center;justify-content:space-between;gap:var(--dim-x2);font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted)} .timepick .select{min-width:0}
  .timepick__lbl{margin-bottom:var(--dim-x1_5);font-size:var(--font-size-t1);line-height:var(--line-height-t1);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted)}
  .timepick__grid{display:grid;grid-template-columns:repeat(5,1fr);gap:var(--dim-x1)} .timepick__grid.min,.timepick__grid.slots{grid-template-columns:repeat(4,1fr)}
  .timepick__c{display:inline-flex;align-items:center;justify-content:center;height:32px;border:1px solid transparent;border-radius:var(--radius-sm);background:transparent;font:inherit;font-size:var(--font-size-t2);line-height:1;color:var(--fg-neutral);cursor:pointer;font-variant-numeric:tabular-nums;transition:background var(--duration-fast)}
  .timepick__c:hover{background:var(--bg-neutral-hover)} .timepick__c:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .timepick__c.now{border-color:var(--stroke-accent);color:var(--fg-accent);font-weight:var(--font-weight-semibold)}
  .timepick__c.sel,.timepick__c[aria-checked="true"]{background:var(--bg-brand-solid);border-color:var(--stroke-brand);color:var(--fg-on-brand);font-weight:var(--font-weight-semibold)}
  .timepick__c.off{color:var(--fg-disabled);cursor:not-allowed;background:transparent}
  .timepick__c.taken{border-style:dashed;border-color:var(--stroke-neutral-stronger);color:var(--fg-neutral-muted);cursor:not-allowed;background:transparent}
  .timepick__ft{display:flex;align-items:center;justify-content:space-between;gap:var(--dim-x2);padding-top:var(--dim-x2);border-top:1px solid var(--stroke-neutral);font-size:var(--font-size-t1);color:var(--fg-neutral-subtle)} .timepick__ft b{color:var(--fg-neutral)}
`;

// ── 조각 ──
const ex = (inner, cap) => '<figure class="ex">' + inner + '<figcaption>' + cap + '</figcaption></figure>';
const ctrl = (id, o = {}) => '<div class="ctrl' + (o.multi ? ' multi' : '') + '">' + (o.ico || '') + (o.multi ? '<textarea' : '<input') + ' id="' + id + '"' + (o.value !== undefined && !o.multi ? ' value="' + o.value + '"' : '') + (o.ph ? ' placeholder="' + o.ph + '"' : '') + (o.req ? ' aria-required="true"' : '') +
  (o.inv ? ' aria-invalid="true" aria-describedby="' + id + '-err"' : o.help ? ' aria-describedby="' + id + '-help"' : '') + (o.dis ? ' disabled' : '') + (o.multi ? '>' + (o.value || '') + '</textarea>' : '>') + '</div>';
const field = (id, label, o = {}) => '<div class="field md' + (o.cls ? ' ' + o.cls : '') + '"' + (o.style ? ' style="' + o.style + '"' : '') + '><label for="' + id + '">' + label + (o.req ? ' <em aria-hidden="true">*</em>' : '') + (o.opt ? ' <span class="field__opt">(선택)</span>' : '') + (o.changed ? '<i class="field__mark" role="img" aria-label="기본값에서 바뀜"></i>' : '') + '</label>' +
  (o.ctl || ctrl(id, o)) + (o.help ? '<div class="help" id="' + id + '-help">' + o.help + '</div>' : '') + (o.err ? '<div class="field__err" id="' + id + '-err">' + ERR + '<span>' + o.err + '</span></div>' : '') + '</div>';
const sel = (id, opts, cls) => '<label class="select' + (cls ? ' ' + cls : '') + '"><select id="' + id + '">' + opts.map((o, i) => '<option' + (i === 0 ? ' selected' : '') + '>' + o + '</option>').join('') + '</select>' + CHEV + '</label>';
const cbox = (o = {}) => '<label class="cbox' + (o.cls ? ' ' + o.cls : '') + '"><input type="checkbox"' + (o.on ? ' checked' : '') + (o.mixed ? ' aria-checked="mixed"' : '') + (o.dis ? ' disabled' : '') + (o.inv ? ' aria-invalid="true"' : '') + (o.aria ? ' aria-label="' + o.aria + '"' : '') + (o.name ? ' name="' + o.name + '"' : '') + '><span class="cbox__box">' + CHK + MIN + '</span>' +
  (o.label ? '<span class="cbox__text">' + o.label + (o.sub ? '<small>' + o.sub + '</small>' : '') + '</span>' : '') + '</label>';
const radio = (name, label, o = {}) => '<label class="radio' + (o.cls ? ' ' + o.cls : '') + '"><input type="radio" name="' + name + '"' + (o.on ? ' checked' : '') + (o.dis ? ' disabled' : '') + (o.inv ? ' aria-invalid="true"' : '') + '><span class="radio__dot"></span><span class="radio__text">' + label + (o.sub ? '<small>' + o.sub + '</small>' : '') + '</span></label>';
const fset = (legend, inner, cls, attrs) => '<fieldset class="fset' + (cls ? ' ' + cls : '') + '"' + (attrs || '') + '><legend>' + legend + '</legend>' + inner + '</fieldset>';
const sw = (id, on, label) => '<label class="switch" id="' + id + '"><input type="checkbox" role="switch"' + (on ? ' checked' : '') + '><span class="track"></span>' + (label || '') + '</label>';
const btn = (t, cls, attrs) => '<button class="btn md ' + (cls || 'neutral-outline') + '"' + (attrs || '') + '>' + t + '</button>';
const summary = '<div class="callout danger" role="alert" tabindex="-1">' + ERR + '<div class="callout__body"><b class="callout__title">입력 2곳을 확인해 주세요</b><ul class="form__errs"><li><a href="#f-reason">사유 — 10자 이상 적어 주세요</a></li><li><a href="#f-line">결재선 — 결재자를 골라 주세요</a></li></ul></div></div>';

// 연차 종류 — 라디오 묶음 공통
const KINDS = [['연차', '1일 · 잔여 12일'], ['반차(오전)', '0.5일 · 09:00 – 13:00'], ['반차(오후)', '0.5일 · 14:00 – 18:00'], ['공가', '예비군 · 건강검진 · 경조사']];
const kinds = (name, o = {}) => KINDS.map(([t, s], i) => radio(name, t, { on: i === o.on, sub: o.sub ? s : '', cls: o.cls, dis: o.dis && i === 3, inv: o.inv })).join('');

// 담당자 찾기 — Combobox 공통
// 시간 — Time picker 공통. 지금은 오후 1:20 · 업무 시간 09–18
const tchip = (t, cls, attrs) => '<button class="timepick__c' + (cls ? ' ' + cls : '') + '" role="radio" aria-checked="' + !!(cls && cls.includes('sel')) + '"' + (attrs || '') + '>' + t + '</button>';
const hours = (selH) => Array.from({ length: 10 }, (_, i) => 9 + i).map(h => tchip(String(h).padStart(2, '0'), h < 13 ? 'off' : h === 13 ? 'now' : h === selH ? 'sel' : '', h < 13 ? ' aria-disabled="true"' : '')).join('');
const mins = (selM) => ['00', '15', '30', '45'].map(m => tchip(m, m === selM ? 'sel' : '')).join('');
const grid = (label, inner, cls) => '<div role="radiogroup" aria-label="' + label + '"><div class="timepick__lbl">' + label + '</div><div class="timepick__grid' + (cls ? ' ' + cls : '') + '">' + inner + '</div></div>';
const tgrid = (o = {}) => '<div class="timepick" role="dialog" aria-label="시간 선택">' + grid('시', hours(o.h || 14)) + grid('분', mins(o.m || '00'), 'min') + '<div class="timepick__ft"><span><b>오후 2:00</b> · 지난 시간은 고를 수 없습니다</span><button class="btn xs neutral-weak">지금</button></div></div>';
const SLOTS = [['13:00', 'off'], ['13:30', 'off'], ['14:00', 'sel'], ['14:30', ''], ['15:00', 'taken', '김도윤'], ['15:30', 'taken', '김도윤'], ['16:00', ''], ['16:30', ''], ['17:00', 'taken', '박지웅'], ['17:30', '']];
const tslots = () => '<div class="timepick" role="dialog" aria-label="회의실 시간 선택"><div class="timepick__hd"><span>7층 회의실 A · 9/10 (목)</span>' + sel('t-len', ['1시간', '30분', '1시간 30분', '2시간'], 'sm') + '</div>' + grid('시작', SLOTS.map(([t, c, who]) => tchip(t, c, c === 'taken' ? ' aria-disabled="true" title="예약됨 · ' + who + '"' : c === 'off' ? ' aria-disabled="true"' : '')).join(''), 'slots') + '<div class="timepick__ft"><span><b>오후 2:00 – 3:00</b> · 1시간</span><span>빗금 = 예약됨</span></div></div>';
const ttrig = (id, label, value, open, style) => field(id, label, { ctl: '<div class="ctrl">' + icon('clock') + '<input id="' + id + '" value="' + value + '" aria-haspopup="dialog" aria-expanded="' + !!open + '">' + CHEV + '</div>', cls: open ? 'focus' : '', style: style || 'min-width:200px' });
const twrap = (trig, panel) => '<div class="menuwrap">' + trig + panel + '</div>';

export const pages = `
<section class="page" id="components/field">
  <h1>Field</h1>
  <p class="desc">폼의 한 칸 — 라벨 · 컨트롤 · 도움말 · 오류가 한 묶음입니다. Text input 의 <code>.field</code> 를 그대로 쓰고, Select · textarea · Switch · Checkbox 묶음도 같은 뼈대에 들어갑니다. 여기서는 <b>필수·선택 표시, 변경 점, 오류, 배치, 폼 전체의 간격과 검증 시점</b>을 정합니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${field('f-anat', '사유', { req: true, multi: true, value: '가족 행사', help: '10자 이상, 결재 문서에 그대로 실립니다', err: '사유를 10자 이상 적어 주세요', inv: true })}</div>
    <ol><li><b>Label</b> — t1 500. <code>&lt;label for&gt;</code> 로 컨트롤과 연결</li><li><b>Required mark</b> — <em style="color:var(--fg-critical)">*</em>, <code>aria-hidden</code>. 뜻은 컨트롤의 <code>aria-required</code> 가 전합니다</li><li><b>Control</b> — Text input · Select · textarea · Switch · Checkbox 묶음</li><li><b>Help</b> — 형식·범위 안내. 오류가 나도 남습니다</li><li><b>Error</b> — alert-circle 16 + 문구. <code>aria-invalid="true"</code> 가 켜져야만 선이 붉어지고, <code>aria-describedby</code> 로 연결</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Label</h3>
  <div class="demo">
    ${ex(field('f-req', '제목', { req: true, ph: '9월 지출결의' }), 'required — 별표. 대부분이 필수인 폼의 기본')}
    ${ex(field('f-opt', '메모', { opt: true, ph: '결재자에게 남길 말' }), 'optional — 필수가 대부분이면 선택 쪽에 「(선택)」')}
    ${ex(field('f-chg', '브리핑 시각', { changed: true, value: '08:30', help: '기본값 09:00 · <button class="field__reset">기본값으로</button>' }), 'changed — 콘솔 설정 편집기. 주황 점 + 「기본값으로」')}
  </div>
  <table><tr><th>표시</th><th>규칙</th></tr><tr><td>필수 <em style="color:var(--fg-critical)">*</em></td><td>라벨 뒤 별표(<code>aria-hidden</code>) + 컨트롤 <code>aria-required="true"</code>. 폼 머리에 「* 필수」 범례 한 줄</td></tr><tr><td>(선택)</td><td>필수가 대부분이면 별표 대신 선택 쪽에만 표시 — 별표가 화면을 뒤덮지 않게</td></tr><tr><td>변경 점</td><td>기본값과 다른 값. 6px <code>--bg-warning-solid</code> 점, 「기본값으로」는 help 안 링크 버튼</td></tr></table>
  <h3>Message</h3>
  <div class="demo">
    ${ex(field('f-help', '금액', { value: '184000', help: '원 단위, 부가세 포함' }), 'help — 형식 안내는 placeholder 가 아니라 여기')}
    ${ex(field('f-err', '날짜', { value: '2026-13-01', inv: true, err: '날짜 형식이 아닙니다 (예: 2026-09-10)' }), 'error — 무엇이 왜 틀렸고 어떻게 고치는지 한 줄')}
    ${ex(field('f-dis', '기안자', { value: '윤아린2 · 디자인1팀1', dis: true, help: '인사 시스템에서 가져옵니다', cls: 'disabled' }), 'disabled — 왜 못 바꾸는지 help 에')}
  </div>
  <h3>Layout</h3>
  <div class="demo col">
    ${ex(field('f-stack', '회의 제목', { req: true, ph: '디자인1팀 주간 회의', help: '참석자 초대 메일 제목이 됩니다' }), 'stacked — 기본. 라벨 위, 폭은 폼 폭')}
    ${ex(field('f-inl', '회의 제목', { req: true, ph: '디자인1팀 주간 회의', help: '참석자 초대 메일 제목이 됩니다', cls: 'inline' }), 'inline — 라벨 열 96px. 콘솔 설정처럼 짧은 라벨이 여럿 늘어설 때')}
  </div>
  <h3>Control</h3>
  <div class="demo">
    ${ex(field('f-txt', '제목', { ph: '9월 지출결의' }), 'Text input')}
    ${ex(field('f-sel', '결재선', { ctl: sel('f-sel', ['김부장 → 인사팀', '김부장', '인사팀']) }), 'Select')}
    ${ex(field('f-ta', '사유', { multi: true, ph: '결재 문서에 실립니다' }), 'textarea')}
    ${ex(field('f-sw', '주말 포함', { ctl: sw('f-sw-ctl', false, '토·일도 근무일로 셉니다'), help: '외근 기간에 주말이 끼면 켭니다' }), 'Switch — 라벨은 위, 스위치 라벨은 설명문')}
  </div>
  <h3>Fieldset</h3>
  <div class="demo">${fset('알림 받을 항목 <em>*</em>', '<div class="fset__desc">둘 이상 고를 수 있습니다</div>' + cbox({ on: 1, label: '결재', name: 'n' }) + cbox({ on: 1, label: '일정·회의', name: 'n' }) + cbox({ label: '업무일지', name: 'n' }), '', ' aria-required="true"')}</div>
  <p>같은 질문에 답하는 컨트롤 여럿(Checkbox · Radio)은 <code>&lt;fieldset&gt;</code> + <code>&lt;legend&gt;</code> 로 묶습니다. legend 가 라벨 자리이고, 설명·오류는 묶음 아래 한 번만 — <a href="#components/checkbox">Checkbox</a> · <a href="#components/radio-group">Radio group</a>.</p>
  <h3>Form</h3>
  <div class="demo col">${ex('<form class="form">' + summary + '<div class="form__sec"><h4>신청 내용</h4>' + fset('종류 <em>*</em>', kinds('f-kind', { on: 1, cls: '' }), 'row') + field('f-date', '기간', { req: true, value: '2026-09-10', ctl: '<div class="ctrl">' + icon('calendar') + '<input id="f-date" value="2026-09-10" aria-required="true"></div>' }) + field('f-reason', '사유', { req: true, multi: true, value: '가족 행사', inv: true, err: '사유를 10자 이상 적어 주세요' }) + '</div><div class="form__sec"><h4>결재</h4>' + field('f-line', '결재선', { req: true, ctl: sel('f-line', ['결재자를 고르세요', '김부장 → 인사팀', '김부장']), err: '결재자를 골라 주세요', inv: true }) + field('f-memo', '결재자에게', { opt: true, ph: '남길 말' }) + '</div><div class="form__actions"><span class="form__aside"><span class="help">* 필수</span></span>' + btn('취소') + btn('신청하기', 'brand-solid', ' type="submit"') + '</div></form>', '연차 신청 — 제출 뒤: 요약(Callout danger, role=alert)이 맨 위에 붙고 포커스는 요약으로. 링크가 각 필드로 갑니다')}</div>
  <table><tr><th>규칙</th><th>값</th></tr><tr><td>필드 사이</td><td><code>--dim-x5</code> 20px. 폭 최대 520 — 한 줄 두 칸은 「시작 · 종료」처럼 짝일 때만</td></tr><tr><td>섹션 사이</td><td>32px(<code>--spacing-section</code>) — 여백만으로 나누고, 제목 t3 600. 선·상자는 쓰지 않습니다</td></tr><tr><td>버튼 줄</td><td>오른쪽 정렬, 주요 행동 맨 오른쪽 brand-solid 하나. 「* 필수」 범례·「삭제」는 왼쪽 <code>.form__aside</code>. 긴 폼은 하단 고정</td></tr><tr><td>모바일</td><td>inline → stacked, 버튼 fill 세로 쌓기(주요 행동 위)</td></tr></table>
  <h3>Validation timing</h3>
  <table><tr><th>시점</th><th>동작</th></tr><tr><td>입력 중</td><td>아무것도 붉지 않습니다. <code>:invalid</code> 를 스타일에 쓰지 않는 이유</td></tr><tr><td>떠날 때(blur)</td><td>그 필드만 검사해 <code>aria-invalid</code> + 오류 문구. 그 뒤로는 고치는 즉시 다시 검사(live)해 맞으면 바로 지웁니다</td></tr><tr><td>제출</td><td>전부 검사 → 맨 위 요약(Callout danger, <code>role="alert"</code>, 필드 링크) + 첫 오류 필드로 포커스·스크롤. 버튼은 비활성화하지 않습니다 — 눌러야 무엇이 틀렸는지 알 수 있습니다</td></tr><tr><td>서버 오류</td><td>필드에 붙일 수 있으면 필드에, 아니면 요약에. 사용자가 적은 값은 지우지 않습니다</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${field('f-do', '금액', { value: '184000', help: '원 단위, 부가세 포함' })}</div>라벨은 명사 두세 단어, 형식은 help 에. 오류는 「사유를 10자 이상 적어 주세요」처럼 고치는 법까지.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${field('f-dont', '금액', { value: '', err: '필수 입력입니다', inv: true })}</div>빈 폼을 열자마자 붉게 만들거나, 「필수 입력입니다」「잘못된 값」처럼 무엇을 해야 하는지 없는 문구.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>한 폼에 한 가지 일. 연차 신청이면 종류·기간·사유·결재선까지 — 열 칸을 넘으면 섹션으로 나누거나 단계로 쪼갭니다.</div>
    <div class="dont"><b>Don&#39;t</b>필수 별표와 「(선택)」을 한 폼에 섞지 않습니다. 둘 중 적은 쪽만 표시합니다.</div>
  </div>
  <h2>Field vs. Setting row</h2>
  <table><tr><th></th><th>Field</th><th>Setting row</th></tr><tr><td>자리</td><td>폼 · Dialog · 작업 패널</td><td>Settings dialog · 콘솔 설정 행</td></tr><tr><td>저장</td><td>버튼 줄에서 한 번에</td><td>행마다 즉시</td></tr><tr><td>라벨 위치</td><td>위(inline 은 왼쪽 96px)</td><td>왼쪽 제목 + 설명, 컨트롤 오른쪽</td></tr><tr><td>오류</td><td>필드 아래 + 제출 요약</td><td>행 아래 한 줄</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Label</td><td>t1 500 <code>--fg-neutral</code> · 별표 <code>--fg-critical</code> · (선택) 400 <code>--fg-neutral-muted</code></td></tr><tr><td>변경 점</td><td>6px <code>--bg-warning-solid</code> · 「기본값으로」 밑줄 링크 <code>--fg-neutral</code></td></tr><tr><td>Help / Error</td><td>t1 <code>--fg-neutral-muted</code> / t1 <code>--fg-critical</code> + alert-circle-filled 16px, 간격 <code>--dim-x1</code></td></tr><tr><td>오류 선</td><td><code>.field:has([aria-invalid="true"]) .ctrl</code> → <code>--stroke-critical</code>. Select · Checkbox · Radio 도 같은 속성</td></tr><tr><td>inline</td><td>라벨 열 96px · 열 간격 <code>--dim-x3</code> · 라벨 위 9px(36px 컨트롤 가운데)</td></tr><tr><td>Fieldset</td><td>legend t1 500 · 항목 간격 <code>--dim-x2</code>(가로 <code>--dim-x5</code>)</td></tr><tr><td>Form</td><td>필드 간격 <code>--dim-x5</code> · 섹션 32px · 버튼 줄 위 <code>--dim-x2</code>, 버튼 사이 <code>--dim-x2</code></td></tr><tr><td>접근성</td><td><code>label[for]</code> · <code>aria-required</code> · <code>aria-invalid</code> + <code>aria-describedby="…-err"</code> · 묶음은 <code>fieldset/legend</code> · 요약은 <code>role="alert"</code> + <code>tabindex="-1"</code> 로 포커스 · Enter 로 제출</td></tr></table>
</section>

<section class="page" id="components/checkbox">
  <h1>Checkbox</h1>
  <p class="desc">목록에서 여럿을 고르거나, 하나를 켜고 끄되 <b>저장 버튼과 함께</b> 제출할 때 씁니다. 숨긴 native <code>&lt;input type="checkbox"&gt;</code> 위에 상자를 그려 키보드·폼 전송은 브라우저가 맡고, 켜짐은 Switch 와 같은 잉크 채움입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${cbox({ on: 1, label: '주말 포함', sub: '토·일도 근무일로 셉니다' })}</div>
    <ol><li><b>Input</b> — 숨긴 native checkbox. 상태·Space·폼 전송·<code>indeterminate</code></li><li><b>Box</b> — 16px, 1px 선, 라운드 4. 켜짐은 잉크 채움</li><li><b>Mark</b> — check 12px 흰색. 중간 상태는 minus</li><li><b>Label</b> — t2. 상자와 라벨 어디를 눌러도 토글</li><li><b>Description</b> (선택) — t1 muted, 라벨 아래</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo">${ex(cbox({ on: 1, label: '16px · 기본' }), '16 — 폼 · 표 · 목록')}${ex(cbox({ on: 1, label: '20px · lg', cls: 'lg' }), '20 — 모바일 · 카드 안 큰 선택')}</div>
  <table><tr><th>크기</th><th>상자 / 마크</th><th>쓰임</th></tr><tr><td>기본</td><td>16 / 12px</td><td>폼 · 표 행 선택 · 설정 목록</td></tr><tr><td>lg</td><td>20 / 14px</td><td>모바일, 터치 영역 44px 를 채우는 행</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${ex(cbox({ label: '꺼짐' }), 'unchecked')}${ex(cbox({ on: 1, label: '켜짐' }), 'checked — 잉크 채움')}${ex(cbox({ mixed: 1, label: '일부' }), 'indeterminate — 아래 항목 일부만 켜짐')}${ex(cbox({ on: 1, label: 'focus', cls: 'focus' }), 'focus-visible — 상자에 링')}
    ${ex(cbox({ dis: 1, label: 'disabled' }), 'disabled')}${ex(cbox({ dis: 1, on: 1, label: 'disabled · 켜짐' }), 'disabled · checked')}${ex(cbox({ inv: 1, label: '약관에 동의합니다' }), 'invalid — aria-invalid, 선만 붉게')}
  </div>
  <h3>With description</h3>
  <div class="demo">${cbox({ on: 1, label: '업무일지 자동 초안', sub: 'SVN·일정·결재에서 오늘 한 일을 모아 둡니다' })}${cbox({ label: '제출 전 확인 Dialog', sub: '상신·승인처럼 되돌릴 수 없는 행동' })}</div>
  <h3>Group</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x10)">
    ${ex(fset('홈에 보일 카드', cbox({ on: 1, label: '출퇴근 기록', name: 'g' }) + cbox({ on: 1, label: '연차', name: 'g' }) + cbox({ on: 1, label: '전자결재', name: 'g' }) + cbox({ label: '업무일지', name: 'g' })), 'vertical — 기본. fieldset + legend')}
    ${ex(fset('알림', cbox({ on: 1, label: '결재', name: 'h' }) + cbox({ on: 1, label: '일정', name: 'h' }) + cbox({ label: '브리핑', name: 'h' }), 'row'), 'horizontal — 라벨이 한 단어씩 셋 이하일 때만')}
  </div>
  <h3>Select all — 표</h3>
  <div class="demo"><div class="tbl-wrap" style="max-width:520px"><table class="tbl compact"><thead><tr><th style="width:40px">${cbox({ mixed: 1, aria: '전체 선택' })}</th><th>문서</th><th>상태</th></tr></thead><tbody><tr class="selected"><td>${cbox({ on: 1, aria: '연차 신청의 건 선택' })}</td><td class="primary">(AI_AGENT) 연차 신청의 건</td><td><span class="badge warning">승인 대기</span></td></tr><tr class="selected"><td>${cbox({ on: 1, aria: '9월 지출결의 선택' })}</td><td class="primary">9월 지출결의</td><td><span class="badge danger">반려</span></td></tr><tr><td>${cbox({ aria: '9월 외근 신청 선택' })}</td><td class="primary">9월 외근 신청</td><td><span class="badge success">승인 완료</span></td></tr></tbody></table></div></div>
  <table><tr><th>머리 상자</th><th>뜻</th><th>누르면</th></tr><tr><td>꺼짐</td><td>아무 행도 안 골름</td><td>보이는 행 전부 켬</td></tr><tr><td>중간(minus)</td><td>일부만 골름</td><td>전부 켬</td></tr><tr><td>켜짐</td><td>보이는 행 전부</td><td>전부 끔</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${cbox({ on: 1, label: '주말 포함' })}</div>라벨은 긍정형·켜지는 대상. 한 줄에 하나, 위아래로 쌓습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${cbox({ label: '주말을 제외하지 않음' })}</div>부정형·이중 부정 라벨. 켜짐이 무슨 뜻인지 두 번 생각하게 됩니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>다섯 개가 넘는 목록엔 「전체 선택」을 맨 위에 두고, 일부만 골랐을 때 중간 상태로 보여 줍니다.</div>
    <div class="dont"><b>Don&#39;t</b>누르는 즉시 반영되는 설정(알림 켜기)에 쓰지 않습니다 — 그것은 Switch. 단일 「예/아니오」 질문을 라디오 둘로 늘리지도 않습니다.</div>
  </div>
  <h2>Checkbox vs. Switch vs. Toggle group</h2>
  <table><tr><th></th><th>Checkbox</th><th>Switch</th><th>Toggle group</th></tr><tr><td>반영</td><td>제출 때</td><td>즉시</td><td>즉시</td></tr><tr><td>개수</td><td>하나 또는 여럿</td><td>독립된 설정 하나</td><td>2~5개 눌림 버튼</td></tr><tr><td>모양</td><td>16px 상자 + 라벨</td><td>40×22 트랙</td><td>아이콘·짧은 라벨 버튼</td></tr><tr><td>중간 상태</td><td>있음</td><td>없음</td><td>없음</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Box</td><td>16px(lg 20) · 1px <code>--stroke-neutral-stronger</code> · <code>--bg-layer-default</code> · 라운드 <code>--radius-xs</code>−2 = 4px(lg <code>--radius-xs</code>)</td></tr><tr><td>checked · mixed</td><td><code>--bg-brand-solid</code> + <code>--stroke-brand</code>, 마크 <code>--fg-on-brand</code> — Switch 켜짐과 같은 값</td></tr><tr><td>hover</td><td>선만 <code>--fg-neutral-muted</code></td></tr><tr><td>focus</td><td>상자에 <code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code></td></tr><tr><td>disabled</td><td>상자 <code>--bg-neutral-weak</code> 선 없음(켜짐은 <code>--stroke-neutral-stronger</code>) · 글자 <code>--fg-disabled</code></td></tr><tr><td>invalid</td><td>선 <code>--stroke-critical</code> — 오류 문구는 묶음 아래 Field 오류 줄</td></tr><tr><td>Label · Description</td><td>t2 <code>--fg-neutral</code> · t1 <code>--fg-neutral-muted</code>, 상자와 <code>--dim-x2</code></td></tr><tr><td>접근성</td><td>native <code>&lt;input type="checkbox"&gt;</code> — Space 토글, 라벨 클릭 토글 · 중간은 <code>input.indeterminate = true</code>(스크린리더엔 <code>aria-checked="mixed"</code>) · 표 행 상자는 <code>aria-label="○○ 선택"</code> · 묶음은 <code>fieldset/legend</code>, 오류는 <code>aria-invalid</code> + <code>aria-describedby</code></td></tr></table>
</section>

<section class="page" id="components/radio-group">
  <h1>Radio group</h1>
  <p class="desc">2~5개 중 <b>하나만</b> 고르고, 선택지를 전부 보여 비교하게 할 때 씁니다(연차 종류 · 결재 방식). native <code>&lt;input type="radio"&gt;</code> 를 숨기고 점만 그려, 화살표 키 이동과 「항상 하나는 선택」은 브라우저가 맡습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${fset('연차 종류', kinds('r-anat', { on: 1 }))}</div>
    <ol><li><b>Fieldset · Legend</b> — 질문(라벨). 묶음이 곧 하나의 Field</li><li><b>Input</b> — 숨긴 native radio. 같은 <code>name</code> 이 한 묶음</li><li><b>Dot</b> — 16px 원, 켜지면 잉크 채움 + 흰 점 6px</li><li><b>Label</b> — t2. 점과 라벨 어디를 눌러도 선택</li><li><b>Description</b> (선택) — t1 muted</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Layout</h3>
  <div class="demo col">
    ${ex(fset('연차 종류', kinds('r-v', { on: 0 })), 'vertical — 기본. 항목이 셋을 넘거나 설명이 붙으면 세로')}
    ${ex(fset('결재 방식', radio('r-h', '일반', { on: 1 }) + radio('r-h', '긴급') + radio('r-h', '후결'), 'row'), 'horizontal — 한 단어 라벨 셋 이하')}
    ${ex(fset('연차 종류', kinds('r-c', { on: 1, sub: 1, cls: 'card' }), 'row'), 'card — 행 전체가 눌리고, 선택은 잉크 선 2px + 점. 설명이 있는 선택지')}
  </div>
  <table><tr><th>Layout</th><th>쓰임</th></tr><tr><td>vertical</td><td>기본. 위→아래로 읽는 순서가 곧 선택 순서</td></tr><tr><td>horizontal</td><td>라벨이 짧고 셋 이하 — 줄바꿈되면 세로로 바꿉니다</td></tr><tr><td>card</td><td>설명·일수·시간처럼 비교할 정보가 붙을 때. 카드 하나당 두 줄까지</td></tr></table>
  <h3>State</h3>
  <div class="demo">
    ${ex(radio('r-s1', '반차(오전)'), 'unchecked')}${ex(radio('r-s2', '반차(오전)', { on: 1 }), 'checked')}${ex(radio('r-s3', '반차(오전)', { on: 1, cls: 'focus' }), 'focus-visible')}${ex(radio('r-s4', '공가', { dis: 1 }), 'disabled')}${ex(radio('r-s5', '공가', { dis: 1, on: 1 }), 'disabled · checked')}${ex(radio('r-s6', '연차', { inv: 1 }), 'invalid — 선만 붉게')}
  </div>
  <h3>Size</h3>
  <div class="demo">${ex(radio('r-z1', '16px · 기본', { on: 1 }), '16')}${ex(radio('r-z2', '20px · lg', { on: 1, cls: 'lg' }), '20 — 모바일')}</div>
  <h3>Invalid group</h3>
  <div class="demo">${fset('연차 종류 <em>*</em>', kinds('r-inv', { inv: 1 }) + '<div class="field__err">' + ERR + '<span>종류를 골라 주세요</span></div>', '', ' aria-required="true" aria-invalid="true" aria-describedby="r-inv-err"')}</div>
  <h3>Keyboard</h3>
  <table><tr><th>키</th><th>동작</th></tr><tr><td>Tab</td><td>묶음으로 들어오고(선택된 항목, 없으면 첫 항목) 나갑니다 — 묶음이 탭 정지 하나</td></tr><tr><td>↑ ↓ · ← →</td><td>이전·다음 항목으로 옮기면서 <b>바로 선택</b>. 끝에서 처음으로 돌아갑니다. disabled 는 건너뜀</td></tr><tr><td>Space</td><td>아무것도 안 골랐을 때 현재 항목 선택</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${fset('결재 방식', radio('r-do', '일반', { on: 1 }) + radio('r-do', '긴급'), 'row')}</div>기본값을 하나 골라 둡니다. 「선택 안 함」이 뜻이 있으면 그것도 항목으로.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${fset('알림', radio('r-dont', '켜기') + radio('r-dont', '끄기'), 'row')}</div>「켜기 / 끄기」 둘뿐이면 라디오가 아니라 Switch(즉시) 또는 Checkbox(제출).</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>항목 사이 비교가 핵심이면 card — 일수·시간처럼 숫자를 설명에 넣습니다.</div>
    <div class="dont"><b>Don&#39;t</b>여섯 개를 넘으면 Select. 화면에 라디오가 스무 개 늘어서면 읽지 않습니다.</div>
  </div>
  <h2>Radio vs. Select vs. Segmented control vs. Checkbox</h2>
  <table><tr><th></th><th>Radio</th><th>Select</th><th>Segmented</th><th>Checkbox</th></tr><tr><td>고르는 수</td><td>하나</td><td>하나</td><td>하나</td><td>여럿</td></tr><tr><td>항목 수</td><td>2~5</td><td>4~20</td><td>2~4</td><td>제한 없음</td></tr><tr><td>보이는 것</td><td>전부 + 설명</td><td>고른 하나</td><td>전부(짧은 라벨)</td><td>전부</td></tr><tr><td>반영</td><td>제출 때</td><td>제출 때</td><td>즉시(보기 전환)</td><td>제출 때</td></tr><tr><td>자리</td><td>폼</td><td>폼 · 설정 행</td><td>패널 머리</td><td>폼 · 표</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Dot</td><td>16px(lg 20) 원 · 1px <code>--stroke-neutral-stronger</code> · <code>--bg-layer-default</code></td></tr><tr><td>checked</td><td><code>--bg-brand-solid</code> + <code>--stroke-brand</code>, 안쪽 점 6px(lg 8) <code>--fg-on-brand</code></td></tr><tr><td>card</td><td>패딩 <code>--dim-x3 --dim-x3_5</code> · 1px <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · 선택 <code>--stroke-brand</code> 2px(inset) · hover <code>--bg-neutral-hover</code> · disabled <code>--bg-neutral-weak</code></td></tr><tr><td>focus</td><td>점(card 는 카드)에 <code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code></td></tr><tr><td>disabled · invalid</td><td><code>--bg-neutral-weak</code> + <code>--fg-disabled</code> · 선 <code>--stroke-critical</code>, legend 도 critical</td></tr><tr><td>간격</td><td>세로 <code>--dim-x2</code> · 가로 <code>--dim-x5</code> · card 사이 <code>--dim-x2</code></td></tr><tr><td>접근성</td><td><code>fieldset/legend</code>(또는 <code>role="radiogroup"</code> + <code>aria-labelledby</code>) · 같은 <code>name</code> · 필수는 fieldset <code>aria-required</code> · 오류는 fieldset <code>aria-invalid</code> + <code>aria-describedby</code> · 키보드는 위 표(native 가 roving tabindex 를 대신)</td></tr></table>
</section>



<section class="page" id="components/time-picker">
  <h1>Time picker</h1>
  <p class="desc">회의 시작·외근 출발처럼 <b>시각</b>을 고릅니다. 입력 필드를 누르면 아래에 패널이 뜨고, 시 칩과 분 칩(00 · 15 · 30 · 45)을 하나씩 누르면 값이 됩니다. 회의실처럼 <b>비어 있는 시간대</b>를 골라야 하면 slots — 예약된 칸은 빗금으로 누구 것인지 알려 줍니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${twrap(ttrig('t-anat', '시작', '오후 2:00', 1), tgrid())}</div>
    <ol><li><b>Trigger</b> — Text input(clock 16 prefix + chevron). 값은 「오후 2:00」</li><li><b>Panel</b> — <code>.menu</code> 와 같은 떠 있는 면, 288px</li><li><b>Hour grid</b> — 업무 시간 09~18, 5열. 지금 시각은 accent 테두리, 지난 시각은 disabled</li><li><b>Minute grid</b> — 00 · 15 · 30 · 45, 4열</li><li><b>Footer</b> — 고른 값 요약 + 「지금」</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo" style="align-items:flex-start;gap:var(--dim-x8)">
    ${ex(twrap(ttrig('t-grid', '시작', '오후 2:00', 1), tgrid()), 'grid — 시 + 분. 회의 시작 · 외근 출발·복귀 · 브리핑 시각')}
    ${ex(twrap(ttrig('t-slot', '회의실 시간', '오후 2:00 – 3:00', 1), tslots()), 'slots — 30분 칸 + 길이 Select. 회의실 예약. 예약된 칸은 빗금, 툴팁에 예약자')}
  </div>
  <table><tr><th>Variant</th><th>칩</th><th>고르는 법</th></tr><tr><td>grid</td><td>시 10개 + 분 4개</td><td>시 → 분 순서로 한 번씩. 분을 누르면 닫힙니다</td></tr><tr><td>slots</td><td>시작 시각 30분 단위</td><td>길이를 먼저 고르고 시작 칸 하나. 길이만큼 이어지는 칸이 비어야 고를 수 있습니다</td></tr></table>
  <h3>State — chip</h3>
  <div class="demo" style="gap:var(--dim-x5)">
    ${ex(tchip('15', ''), 'default')}${ex('<button class="timepick__c" style="background:var(--bg-neutral-hover)">15</button>', 'hover')}${ex(tchip('13', 'now'), 'now — 지금 시각, accent 테두리')}${ex(tchip('14', 'sel'), 'selected — 잉크')}${ex(tchip('10', 'off', ' aria-disabled="true"'), 'off — 지난 시각 · 업무 시간 밖')}${ex(tchip('15:00', 'taken', ' aria-disabled="true" title="예약됨 · 김도윤"'), 'taken — 예약됨, title 에 예약자')}
  </div>
  <h3>Format · Range</h3>
  <table><tr><th>항목</th><th>규칙</th></tr><tr><td>12h / 24h</td><td>격자는 <b>24h(09~18)</b> — 업무 시간이 한눈에 들어오고 오전/오후 전환이 필요 없습니다. 값·요약·문서에는 <b>「오후 2:00」</b>(12h)로 씁니다. 사용자가 「14:00」을 타이핑해도 받습니다</td></tr><tr><td>업무 시간</td><td>09:00 ~ 18:00 만 격자에. 그 밖은 입력으로 직접 타이핑 — 격자를 24줄로 늘리지 않습니다</td></tr><tr><td>단위</td><td>분은 15분(회의) · 30분(회의실). 근태 기록처럼 분 단위가 필요하면 <code>&lt;input type="time"&gt;</code></td></tr><tr><td>지난 시각</td><td>오늘이면 지금보다 이른 칩은 off. 다른 날은 전부 열림</td></tr><tr><td>범위</td><td>「출발 · 복귀」는 필드 둘. 종료 패널은 시작 이전을 off 로, 요약에 길이(「3시간」)</td></tr></table>
  <h3>Range — 외근</h3>
  <div class="demo">${fset('외근 시간', ttrig('t-from', '출발', '오후 2:00', 0, 'min-width:180px') + ttrig('t-to', '복귀', '오후 5:00', 0, 'min-width:180px') + '<div class="fset__desc" style="margin:0;width:100%">3시간 · 근무 시간으로 셉니다</div>', 'row')}</div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${tgrid()}</div>지금 시각을 표시하고 지난 칩은 끕니다. 「지금」 버튼으로 한 번에 채웁니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="timepick" style="width:auto">${grid('시', ['00', '01', '02', '03', '04', '05', '06', '07', '08'].map(h => tchip(h, '')).join(''))}</div></div>0~23시를 다 늘어놓지 않습니다 — 새벽 칩은 자리만 차지합니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>slots 의 예약된 칸은 숨기지 말고 빗금으로 두고 예약자를 알립니다 — 「그 사람에게 물어보면 되겠다」가 됩니다.</div>
    <div class="dont"><b>Don&#39;t</b>패널 안에 「확인」을 두지 않습니다 — 칩을 누르면 곧 값입니다. 실행 확인은 폼 버튼·Dialog 가 합니다.</div>
  </div>
  <h2>Time picker vs. Date picker vs. Select</h2>
  <table><tr><th></th><th>Time picker</th><th>Date picker</th><th>Select</th></tr><tr><td>고르는 것</td><td>시각(시 + 분)</td><td>날짜 · 기간</td><td>시각 목록 하나</td></tr><tr><td>패널</td><td>288px 격자 두 개(또는 slots)</td><td>312px 달력</td><td>브라우저 기본</td></tr><tr><td>못 고름</td><td>지난 시각 · 예약됨</td><td>주말·휴일·지난 날</td><td>없음</td></tr><tr><td>쓰임</td><td>회의 · 외근 · 회의실</td><td>연차 · 출장 · 경비일</td><td>브리핑 시각처럼 고정 목록(설정)</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr><tr><td>Panel</td><td>288px · <code>--bg-layer-floating</code> · 1px <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · <code>--shadow-2</code> · 패딩 <code>--dim-x3</code> · 격자 사이 <code>--dim-x3</code></td></tr><tr><td>Grid label</td><td>t1 500 <code>--fg-neutral-muted</code></td></tr><tr><td>Chip</td><td>32px · <code>--radius-sm</code> · t2 <code>tabular-nums</code> · 칩 사이 <code>--dim-x1</code> · hover <code>--bg-neutral-hover</code></td></tr><tr><td>now / selected</td><td><code>--stroke-accent</code> + <code>--fg-accent</code> 600 / <code>--bg-brand-solid</code> + <code>--fg-on-brand</code> 600 — Date picker 의 today · sel 과 같은 값</td></tr><tr><td>off / taken</td><td><code>--fg-disabled</code> / 점선 <code>--stroke-neutral-stronger</code> + <code>--fg-neutral-muted</code></td></tr><tr><td>Footer</td><td>위 선 <code>--stroke-neutral</code> · t1 <code>--fg-neutral-subtle</code>, 값은 <code>--fg-neutral</code> · 「지금」 btn xs neutral-weak</td></tr><tr><td>포커스</td><td><code>--bg-accent-weak</code> 3px + <code>--stroke-focus</code></td></tr><tr><td>접근성</td><td>트리거 <code>aria-haspopup="dialog" aria-expanded</code> · 패널 <code>role="dialog"</code> + 이름 · 격자는 <code>role="radiogroup"</code>(시 · 분), 칩 <code>role="radio" aria-checked</code>, 못 고름은 <code>aria-disabled</code> + title · ← → ↑ ↓ 로 칩 이동, Enter·Space 선택, Esc 닫고 트리거로 · 값은 타이핑으로도 입력</td></tr></table>
</section>
`;

export const nav = [['components/field', 'Field'], ['components/checkbox', 'Checkbox'], ['components/radio-group', 'Radio group'], ['components/time-picker', 'Time picker']];

export const tint = ['field', 'time-picker'];
