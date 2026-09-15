// 대화: Message(+Bubble) · Marker · Questionnaire · Attachment(+File dropzone) · Message scroller
// 에이전트 제품의 핵심 조각. 앱의 원천은 src/components/agent/Thread.jsx · Composer.jsx. attach() 는 Composer(agent.mjs)도 쓴다
import { icon } from './icons.mjs';

export const css = `
  /* ── Message ── 한 턴. 사용자 = 오른쪽 말풍선, 에이전트 = 말풍선 없는 본문 · 실행 카드 · 완료 카드 · 후속 칩 */
  .msg{display:flex;align-items:flex-start;gap:var(--dim-x3);width:100%;text-align:left;color:var(--fg-neutral)}
  .msg__body{display:flex;flex-direction:column;gap:var(--dim-x2);flex:1;min-width:0;max-width:720px}
  .msg.user{justify-content:flex-end} .msg.user .msg__body{flex:0 1 auto;max-width:78%;align-items:flex-end}
  .msg__head{display:flex;align-items:baseline;gap:var(--dim-x2);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)} .msg__head b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .msg__head time{font-variant-numeric:tabular-nums}
  .bubble{padding:var(--dim-x2_5) var(--dim-x4);border-radius:var(--radius-xl) var(--radius-xl) var(--radius-xs) var(--radius-xl);background:var(--bg-neutral-weak);font-size:var(--font-size-t3);line-height:var(--line-height-t3);color:var(--fg-neutral);white-space:pre-wrap;overflow-wrap:anywhere}
  .msg__md{font-size:var(--font-size-t3);line-height:var(--line-height-t4);color:var(--fg-neutral);text-wrap:pretty;overflow-wrap:anywhere}
  .msg__md>*{margin:0} .msg__md>*+*{margin-top:var(--dim-x3)} .msg__md ul,.msg__md ol{padding-left:var(--dim-x5)} .msg__md li{margin:0} .msg__md li+li{margin-top:var(--dim-x1)} .msg__md b{font-weight:var(--font-weight-semibold)}
  .msg__caret{display:inline-block;width:2px;height:1.1em;margin-left:2px;vertical-align:text-bottom;background:var(--fg-neutral);animation:msg-blink 1s steps(2,start) infinite} @keyframes msg-blink{to{visibility:hidden}}
  .msg__foot{display:flex;align-items:center;gap:var(--dim-x0_5);margin-left:calc(var(--dim-x1_5) * -1);opacity:0;transition:opacity var(--duration-fast)}
  .msg:hover .msg__foot,.msg:focus-within .msg__foot,.msg.last .msg__foot{opacity:1}
  .msg__error{display:flex;align-items:center;flex-wrap:wrap;gap:var(--dim-x2);font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-critical)} .msg__error>svg{width:16px;height:16px}
  /* 실행 카드 — <details>: 도는 동안 펼침, 끝나면 한 줄로 접힘 */
  .msg__run{border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);overflow:hidden}
  .msg__runhd{display:flex;align-items:center;gap:var(--dim-x2_5);min-height:44px;padding:0 var(--dim-x4);list-style:none;cursor:pointer;font-size:var(--font-size-t2);line-height:var(--line-height-t2);transition:background var(--duration-fast)} .msg__runhd::-webkit-details-marker{display:none}
  .msg__run[open] .msg__runhd{background:var(--bg-layer-basement)} .msg__runhd:hover{background:var(--bg-neutral-hover)} .msg__runhd:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .msg__runhd b{font-weight:var(--font-weight-semibold)} .msg__runhd .n{margin-left:auto;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums}
  .msg__runhd>svg{width:16px;height:16px;color:var(--fg-neutral-muted);transition:transform var(--duration-normal) var(--easing)} .msg__run[open] .msg__runhd>svg{transform:rotate(180deg)}
  .msg__dot{width:8px;height:8px;border-radius:50%;flex:none;background:var(--bg-accent-solid)} .msg__dot.live{animation:msg-pulse 1.4s var(--easing) infinite} .msg__dot.done{background:var(--bg-positive-solid)} .msg__dot.fail{background:var(--bg-critical-solid)} @keyframes msg-pulse{50%{opacity:.3}}
  .msg__steps{list-style:none;margin:0;padding:var(--dim-x2) var(--dim-x4) var(--dim-x3)}
  .msg__step{display:flex;align-items:flex-start;gap:var(--dim-x2_5);margin:0;padding:var(--dim-x1_5) 0;font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
  .msg__step>svg{width:16px;height:16px;margin-top:2px;color:var(--fg-positive)} .msg__step small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)} .msg__step .btn{margin-top:var(--dim-x1_5)}
  .msg__step.active{font-weight:var(--font-weight-medium)} .msg__step.active>svg{color:var(--fg-accent);animation:spin 1s linear infinite}
  .msg__step.fail>svg,.msg__step.fail small{color:var(--fg-critical)} .msg__step.todo{color:var(--fg-neutral-muted)} .msg__step.todo>svg{color:var(--fg-neutral-placeholder)}
  .msg__done{display:flex;align-items:flex-start;gap:var(--dim-x2_5);padding:var(--dim-x4) var(--dim-x5);border-radius:var(--radius-lg);background:var(--bg-neutral-weak)} .msg__done>svg{width:18px;height:18px;margin-top:3px;color:var(--fg-positive)} .msg__done>div{display:flex;flex-direction:column;align-items:flex-start;gap:var(--dim-x3);min-width:0}
  .msg__follow{display:flex;flex-wrap:wrap;gap:var(--spacing-between-chips)} .msg__follow>button{font-family:inherit}
  @media (prefers-reduced-motion:reduce){.msg__caret,.msg__dot.live,.msg__step.active>svg{animation:none}}
  /* ── Marker ── 대화 사이의 한 줄 표식: 진행 · 시스템 메모 · 날짜 구분 · 링크 */
  .marker{display:flex;align-items:center;gap:var(--dim-x2);min-height:28px;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-subtle);text-align:left;text-decoration:none}
  .marker>svg{width:16px;height:16px;flex:none;color:var(--fg-neutral-muted)} .marker__text{min-width:0} .marker__text b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .marker__time{color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums} .marker .btn{margin-left:var(--dim-x1)}
  .marker__dot{width:6px;height:6px;border-radius:50%;flex:none;background:var(--bg-accent-solid);animation:marker-pulse 1.4s var(--easing) infinite} @keyframes marker-pulse{50%{opacity:.3}}
  .marker__dots{display:inline-flex;gap:var(--dim-x1)} .marker__dots i{width:6px;height:6px;border-radius:50%;background:var(--stroke-neutral-stronger);animation:marker-blink 1s infinite} .marker__dots i:nth-child(2){animation-delay:.15s} .marker__dots i:nth-child(3){animation-delay:.3s} @keyframes marker-blink{50%{background:var(--fg-neutral-muted)}}
  .marker.note{justify-content:center;color:var(--fg-neutral-muted)}
  .marker.sep{width:100%;gap:var(--dim-x3);font-weight:var(--font-weight-medium);color:var(--fg-neutral-muted)} .marker.sep::before,.marker.sep::after{content:"";flex:1;height:1px;background:var(--stroke-neutral-strong)}
  .marker.border{width:fit-content;max-width:100%;min-height:36px;padding:0 var(--dim-x3);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default);font:inherit;font-size:var(--font-size-t1);cursor:pointer;transition:background var(--duration-fast)} .marker.border:hover{background:var(--bg-neutral-hover)}
  .marker.link{width:fit-content;font-weight:var(--font-weight-medium);color:var(--fg-neutral);cursor:pointer} .marker.link:hover{text-decoration:underline;text-underline-offset:3px}
  .marker.border:focus-visible,.marker.link:focus-visible{outline:none;border-radius:var(--radius-sm);box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .marker.shimmer .marker__text{background:linear-gradient(90deg,var(--fg-neutral-muted) 35%,var(--fg-neutral) 50%,var(--fg-neutral-muted) 65%) 0 0/250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:marker-shimmer 2s linear infinite} @keyframes marker-shimmer{from{background-position:100% 0}to{background-position:0 0}}
  @media (prefers-reduced-motion:reduce){.marker__dot,.marker__dots i,.marker.shimmer .marker__text{animation:none} .marker.shimmer .marker__text{background:none;color:var(--fg-neutral-subtle)}}
  /* ── Questionnaire ── 실행 전에 묻는 카드: 확인형(요약 + 승인) · 단계형(문항 + 선택지) */
  .qnr{display:flex;flex-direction:column;width:100%;max-width:560px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);overflow:hidden;text-align:left;font-size:var(--font-size-t2);line-height:var(--line-height-t2);color:var(--fg-neutral)}
  .qnr__band{display:flex;align-items:center;gap:var(--dim-x2);padding:var(--dim-x2) var(--dim-x5);background:var(--bg-sample-weak);color:var(--fg-sample);font-size:var(--font-size-t1);line-height:var(--line-height-t1);font-weight:var(--font-weight-medium)} .qnr__band svg{width:16px;height:16px}
  .qnr__hd{display:flex;flex-direction:column;gap:var(--dim-x1);padding:var(--dim-x5) var(--dim-x5) 0}
  .qnr__title{font-size:var(--font-size-t4);line-height:var(--line-height-t4);font-weight:var(--font-weight-semibold)}
  .qnr__lead{margin:0;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .qnr__body{padding:0 var(--dim-x5)} details.qnr[open] .qnr__body{padding-bottom:var(--dim-x4)}
  .qnr__ft{display:flex;align-items:center;justify-content:flex-end;gap:var(--dim-x2);padding:var(--dim-x5)} .qnr__back{margin-right:auto}
  .qnr__sum{display:flex;align-items:center;gap:var(--dim-x2_5);min-height:48px;padding:var(--dim-x2) var(--dim-x4);list-style:none;cursor:pointer;transition:background var(--duration-fast)} .qnr__sum::-webkit-details-marker{display:none}
  .qnr__sum:hover{background:var(--bg-neutral-hover)} .qnr__sum:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .qnr__sum b{flex:none;font-weight:var(--font-weight-semibold)} .qnr__meta{min-width:0;font-size:var(--font-size-t1);color:var(--fg-neutral-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .qnr__sum .badge{margin-left:auto;flex:none} .qnr__sum>svg{width:16px;height:16px;flex:none;color:var(--fg-neutral-muted);transition:transform var(--duration-normal) var(--easing)} details.qnr[open] .qnr__sum>svg{transform:rotate(180deg)}
  .qnr__prog{display:flex;align-items:center;gap:var(--dim-x3);font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted);font-variant-numeric:tabular-nums}
  .qnr__segs{flex:1;display:flex;gap:var(--dim-x1)} .qnr__segs i{flex:1;height:4px;border-radius:var(--radius-full);background:var(--bg-neutral-weak)} .qnr__segs i.on{background:var(--bg-brand-solid)}
  .qnr__q{min-width:0;margin:0;padding:var(--dim-x4) var(--dim-x5) 0;border:0} .qnr__q legend{padding:0;font-size:var(--font-size-t4);line-height:var(--line-height-t4);font-weight:var(--font-weight-semibold)}
  .qnr__opts{display:flex;flex-direction:column;gap:var(--dim-x2);margin-top:var(--dim-x3)}
  .qnr__opt{display:flex;align-items:center;gap:var(--dim-x3);min-height:48px;padding:var(--dim-x2) var(--dim-x3_5);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default);cursor:pointer;transition:background var(--duration-fast),border-color var(--duration-fast)}
  .qnr__opt:hover{background:var(--bg-neutral-hover)} .qnr__opt:has(>input:checked){border-color:var(--stroke-brand)}
  .qnr__opt:has(>input:not(.qnr__free):focus-visible){box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .qnr__opt:has(>input:disabled){background:var(--bg-neutral-weak);border-color:transparent;color:var(--fg-disabled);cursor:not-allowed} .qnr__opt:has(>input:disabled) small{color:var(--fg-disabled)}
  .qnr__opt>.cbox__box,.qnr__opt>.radio__dot{margin-top:0} .qnr__opt>.qnr__free{position:static;opacity:1;width:auto;height:32px} /* 컨트롤은 Checkbox·Radio 그대로, 카드 행이 감싼다 */
  .qnr__opt:has(>input:disabled)>.cbox__box,.qnr__opt:has(>input:disabled)>.radio__dot{border-color:var(--stroke-neutral-strong)} /* 비활성 행 바탕과 컨트롤 바탕이 같은 회색 — 선을 남겨야 보인다 */
  .qnr__txt{flex:1;min-width:0} .qnr__txt small{display:block;font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .qnr__free{display:none;flex:2;min-width:0;height:32px;padding:0 var(--dim-x3);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-sm);background:var(--bg-layer-default);font:inherit;font-size:var(--font-size-t2);color:var(--fg-neutral);outline:none} .qnr__free::placeholder{color:var(--fg-neutral-placeholder)}
  .qnr__opt:has(>input:checked) .qnr__free{display:block} .qnr__free:focus{border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  /* ── Attachment ── 파일 하나: 썸네일 · 이름 · 메타 · 지우기. 썸네일 sm 28 · md 32 · lg 44. 올리는 과정(진행·실패)은 다루지 않는다 */
  .attach{position:relative;display:inline-flex;align-items:center;gap:var(--dim-x2_5);max-width:280px;min-width:0;padding:var(--dim-x1);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-md);background:var(--bg-layer-default);color:var(--fg-neutral);text-align:left;text-decoration:none;vertical-align:top} /* overflow 는 자르지 않는다 — 지우기가 모서리 밖에 앉는다 */
  a.attach{cursor:pointer;transition:background var(--duration-fast)} a.attach:hover{background:var(--bg-neutral-hover)} a.attach:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  /* 확장자 썸네일은 종류와 상관없이 같은 연회색 + 잉크 글자 — 색으로 종류를 말하지 않는다 */
  .attach__thumb{display:inline-flex;align-items:center;justify-content:center;flex:none;width:44px;height:44px;border-radius:var(--radius-sm);background:var(--bg-neutral-weak);color:var(--fg-neutral-subtle);font-size:var(--font-size-t1);font-weight:var(--font-weight-bold);letter-spacing:.02em;line-height:1;object-fit:cover;overflow:hidden} .attach__thumb svg{width:16px;height:16px}
  .attach.md .attach__thumb{width:32px;height:32px;border-radius:var(--radius-xs)} .attach.sm .attach__thumb{width:28px;height:28px;border-radius:var(--radius-xs)}
  .attach__main{display:flex;flex-direction:column;flex:1;min-width:0;padding-right:var(--dim-x2)} .attach.sm .attach__main{flex-direction:row;align-items:baseline;gap:var(--dim-x1_5)}
  .attach__name{font-size:var(--font-size-t1);line-height:var(--line-height-t1);font-weight:var(--font-weight-medium);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .attach__meta{font-size:12px;line-height:var(--line-height-t1);color:var(--fg-neutral-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums} /* 12px — t1(13) 아래로 내려가는 유일한 예외, 디자이너 지정 */
  .attach.sm .attach__meta{flex:none}
  .attach__x{position:absolute;top:calc(var(--dim-x1) * -1);right:calc(var(--dim-x1) * -1);display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;padding:0;border:0;border-radius:var(--radius-full);background:var(--bg-neutral-solid);color:var(--fg-on-neutral);line-height:1;cursor:pointer}
  .attach__x svg{width:10px;height:10px;stroke-width:2.5} .attach__x::after{content:"";position:absolute;inset:-5px} /* 14 + 5*2 = 24px 손가락 자리. 10px 에서는 1.75 가 흐려 2.5 — 이 한 곳만 */
  .attach__x:hover{filter:brightness(1.25)} .attach__x:focus-visible{outline:none;box-shadow:0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .attach.tile{width:96px;height:96px;padding:0;overflow:hidden} .attach.tile img{display:block;width:100%;height:100%;object-fit:cover}
  /* stretch 면 문서 칩이 옆 이미지 타일 높이로 늘어난다 — 칩은 제 높이를 지킨다 */
  .attach__group{display:flex;flex-wrap:wrap;align-items:flex-start;gap:var(--dim-x2)} .attach__group.end{justify-content:flex-end;align-items:flex-end} /* 말풍선 위에서는 아래로 맞춘다 — 이미지 타일과 문서 칩의 밑선이 말풍선과 나란해진다 */
  /* ── File dropzone ── 파일을 끌어다 놓는 자리. 안에 진짜 <input type="file"> */
  .dropzone{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--dim-x1);width:100%;min-height:136px;padding:var(--dim-x6);border:1px dashed var(--stroke-neutral-stronger);border-radius:var(--radius-lg);background:var(--bg-layer-default);color:var(--fg-neutral-subtle);text-align:center;font-size:var(--font-size-t2);line-height:var(--line-height-t2);cursor:pointer;transition:background var(--duration-fast),border-color var(--duration-fast)}
  .dropzone input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
  .dropzone>svg{width:24px;height:24px;margin-bottom:var(--dim-x1);color:var(--fg-neutral-muted)} .dropzone b{font-weight:var(--font-weight-semibold);color:var(--fg-neutral)} .dropzone u{text-underline-offset:3px} .dropzone small{font-size:var(--font-size-t1);line-height:var(--line-height-t1);color:var(--fg-neutral-muted)}
  .dropzone:hover{background:var(--bg-neutral-hover)} .dropzone:has(input:focus-visible){border-color:var(--stroke-accent);box-shadow:0 0 0 3px var(--bg-accent-weak)}
  .dropzone.over{border-color:var(--stroke-accent);background:var(--bg-accent-weak)} .dropzone.over>svg,.dropzone.over b{color:var(--fg-accent)}
  /* ── Message scroller ── 바닥에 붙은 대화 상자. 위로 올리면 「새 메시지」 알약, 맨 위에서 이전 대화 */
  .mscroll{position:relative;display:flex;flex-direction:column;width:100%;height:440px;border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-lg);background:var(--bg-layer-default);overflow:hidden}
  .mscroll__view{flex:1;min-height:0;display:flex;flex-direction:column-reverse;overflow-y:auto;padding:0 var(--dim-x6);scrollbar-width:thin;scrollbar-color:var(--stroke-neutral-stronger) transparent} .mscroll__view:focus-visible{outline:none;box-shadow:inset 0 0 0 2px var(--stroke-focus)}
  .mscroll__col{display:flex;flex-direction:column;gap:var(--dim-x6);width:100%;max-width:720px;margin:0 auto;padding:var(--dim-x6) 0 var(--dim-x4)}
  .mscroll__turn{display:flex;flex-direction:column;gap:var(--dim-x3)}
  .mscroll__more{display:flex;align-items:center;justify-content:center;gap:var(--dim-x2);min-height:32px;font-size:var(--font-size-t1);color:var(--fg-neutral-muted)} .mscroll__more svg{width:16px;height:16px;animation:spin 1s linear infinite}
  .mscroll__jump{position:absolute;left:50%;bottom:var(--dim-x4);transform:translateX(-50%);display:inline-flex;align-items:center;gap:var(--dim-x1_5);height:32px;padding:0 var(--dim-x3_5);border:1px solid var(--stroke-neutral-strong);border-radius:var(--radius-full);background:var(--bg-layer-floating);box-shadow:var(--shadow-2);font:inherit;font-size:var(--font-size-t1);font-weight:var(--font-weight-medium);line-height:1;color:var(--fg-neutral);white-space:nowrap;cursor:pointer;transition:background var(--duration-fast)}
  .mscroll__jump svg{width:16px;height:16px} .mscroll__jump:hover{background:var(--bg-neutral-hover)} .mscroll__jump:focus-visible{outline:none;box-shadow:var(--shadow-2),0 0 0 3px var(--bg-accent-weak),0 0 0 4px var(--stroke-focus)}
  .mscroll.top .mscroll__view{flex-direction:column}
  .mscroll.fog .mscroll__view{-webkit-mask-image:linear-gradient(to bottom,transparent,black var(--dim-x8));mask-image:linear-gradient(to bottom,transparent,black var(--dim-x8))}
  @media (prefers-reduced-motion:reduce){.mscroll__more svg{animation:none}}
`;

// ── 조각 — 페이지 데모와 Composer 가 같은 함수로 마크업을 만든다 ──
const ib = (n, label) => '<button class="iconbtn sm ghost" aria-label="' + label + '">' + icon(n) + '</button>';
const FOOT = '<div class="msg__foot">' + ib('copy', '복사') + ib('refresh', '다시 생성') + ib('thumb-up', '좋아요') + ib('thumb-down', '싫어요') + '</div>';
const user = (text, atts) => '<article class="msg user" aria-label="내 메시지"><div class="msg__body">' + (atts ? '<div class="attach__group end">' + atts + '</div>' : '') + (text ? '<div class="bubble">' + text + '</div>' : '') + '</div></article>';
// o: { cls, avatar, head(시각), foot, after(본문 뒤에 붙는 것) }
const agent = (inner, o = {}) => '<article class="msg' + (o.cls ? ' ' + o.cls : '') + '" aria-label="에이전트">' + (o.avatar ? '<span class="avatar s28 accent">AI</span>' : '') + '<div class="msg__body">' + (o.head ? '<div class="msg__head"><b>에이전트</b><time>' + o.head + '</time></div>' : '') + inner + (o.after || '') + (o.foot ? FOOT : '') + '</div></article>';
const md = (html) => '<div class="msg__md">' + html + '</div>';
const STEP = { done: 'circle-check-filled', active: 'loader-2', fail: 'circle-x-filled', todo: 'circle-dashed' };
const step = (k, label, sub, act) => '<li class="msg__step ' + k + '">' + icon(STEP[k]) + '<span>' + label + (sub ? '<small>' + sub + '</small>' : '') + (act || '') + '</span></li>';
const run = (dot, title, n, steps, open) => '<details class="msg__run"' + (open ? ' open' : '') + '><summary class="msg__runhd"><span class="msg__dot ' + dot + '"></span><b>' + title + '</b><span class="n">' + n + '</span>' + icon('chevron-down') + '</summary><ol class="msg__steps">' + steps + '</ol></details>';
const STEPS_RUN = step('done', '잔여 연차 조회', '12일 남음') + step('done', '팀 일정 확인', '9월 14일 주간 회의 1건과 겹칩니다') + step('active', '결재선 확인') + step('todo', '신청서 초안 작성');
const STEPS_FAIL = step('done', '잔여 연차 조회', '12일 남음') + step('fail', '결재선 확인', '전자결재 시스템이 응답하지 않습니다', '<br><button class="btn xs neutral-outline">' + icon('refresh') + '다시 시도</button>') + step('todo', '신청서 초안 작성');
const STEPS_DONE = step('done', '잔여 연차 조회', '12일 남음') + step('done', '팀 일정 확인', '주간 회의 1건과 겹칩니다') + step('done', '결재선 확인', '김팀장 → 박본부장');
const done = (text, link) => '<div class="msg__done">' + icon('circle-check-filled') + '<div>' + md('<p>' + text + '</p>') + '<a class="btn sm neutral-outline" href="#">' + link + icon('arrow-up-right') + '</a></div></div>';
const follow = (primary, rest) => '<div class="msg__follow"><button class="chip md selected">' + primary + '</button>' + rest.map(t => '<button class="chip md">' + t + '</button>').join('') + '</div>';
const ANSWER = '<p>네, <b>9월 14일(월)</b>에 연차를 쓸 수 있습니다. 잔여 연차는 <b>12일</b>입니다.</p><ul><li>그날 10:00 주간 회의 1건과 겹칩니다</li><li>결재선: 김팀장 → 박본부장</li></ul><p>이대로 신청서를 올릴까요?</p>';

const mk = (cls, inner, tag, attrs) => '<' + (tag || 'div') + ' class="marker' + (cls ? ' ' + cls : '') + '"' + (attrs || '') + '>' + inner + '</' + (tag || 'div') + '>';
const STOP = '<button class="btn xs neutral-outline">' + icon('player-stop-filled') + '중단</button>';
const DOTS = '<span class="marker__dots" aria-hidden="true"><i></i><i></i><i></i></span>';
const running = (label, t) => mk('', '<span class="marker__dot" aria-hidden="true"></span><span class="marker__text">' + label + '</span><span class="marker__time">' + t + '</span>' + STOP, 'div', ' role="status"');
const sep = (label) => mk('sep', label);

// 영수증 사진 — 이미지 썸네일 자리표시(settings.mjs 의 PHOTO 와 같은 그림)
const PHOTO = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d9d4cc"/><stop offset="1" stop-color="#a89f93"/></linearGradient></defs><rect width="96" height="96" fill="url(#g)"/><rect x="26" y="10" width="44" height="76" rx="2" fill="#fff"/><g stroke="#c9c4bb" stroke-width="3" stroke-linecap="round"><path d="M34 24h28M34 34h20M34 44h28M34 54h16M34 68h28"/></g></svg>');
// o: { size sm|md|lg, kind img|pdf|hwp|docx|xlsx|pptx|csv, name, meta, remove(보내기 전 — 지우기), href(보낸 뒤 — 내려받기 링크) }
export const attach = ({ size = 'lg', kind, name, meta, remove, href }) => {
  const tag = href ? 'a' : 'div';
  const thumb = kind === 'img' ? '<img class="attach__thumb" src="' + PHOTO + '" alt="">' : '<span class="attach__thumb" aria-hidden="true">' + (size === 'lg' ? kind.toUpperCase() : icon('file-text-filled')) + '</span>';
  const x = remove ? '<button class="attach__x" aria-label="' + name + ' 첨부 제거">' + icon('x') + '</button>' : '';
  return '<' + tag + ' class="attach ' + size + '"' + (href ? ' href="#"' : '') + '>' + thumb + '<span class="attach__main"><span class="attach__name">' + name + '</span><span class="attach__meta">' + meta + '</span></span>' + x + '</' + tag + '>';
};
const attachTile = (alt) => '<a class="attach tile" href="#"><img src="' + PHOTO + '" alt="' + alt + '"></a>';
const drop = (cls, title, sub) => '<label class="dropzone' + (cls ? ' ' + cls : '') + '"><input type="file" accept="image/*,.pdf">' + icon('cloud-upload') + '<b>' + title + '</b><small>' + sub + '</small></label>';

// Questionnaire — 확인형은 Dialog 의 요약 상자(.dialog-sum)를 그대로 쓴다
const sum = (rows) => '<div class="dialog-sum">' + rows.map(([k, v]) => '<div><span>' + k + '</span><b>' + v + '</b></div>').join('') + '</div>';
const LEAVE = [['종류', '연차'], ['날짜', '9월 15일(화) · 1일'], ['사유', '가족 행사'], ['결재선', '김팀장 → 박본부장']];
const ASK = (state) => state === 'resolving'
  ? '<button class="btn md neutral-weak" disabled>취소</button><button class="btn md neutral-outline" disabled>수정</button><button class="btn md brand-solid loading"><span class="spin"></span>올리는 중</button>'
  : '<button class="btn md neutral-weak">취소</button><button class="btn md neutral-outline">수정</button><button class="btn md brand-solid">승인</button>';
const confirmQ = (o = {}) => '<div class="qnr" role="group" aria-label="연차 신청 확인">' + (o.sample ? '<div class="qnr__band">' + icon('info-circle-filled') + '예시 데이터입니다 — 연동을 켜면 실제 잔여·결재선으로 바뀝니다</div>' : '') + '<div class="qnr__hd"><div class="qnr__title">연차를 신청할까요?</div><p class="qnr__lead">에이전트가 채운 값입니다. 승인하면 결재를 올리고, 올린 뒤에도 결재함에서 취소할 수 있습니다.</p></div><div class="qnr__body">' + sum(LEAVE) + '</div><div class="qnr__ft">' + ASK(o.state) + '</div></div>';
const settled = (title, meta, badge, tone, rows) => '<details class="qnr"><summary class="qnr__sum"><b>' + title + '</b><span class="qnr__meta">' + meta + '</span><span class="badge' + (tone ? ' ' + tone : '') + '">' + badge + '</span>' + icon('chevron-down') + '</summary><div class="qnr__body">' + sum(rows) + '</div></details>';
// 라디오는 문서 전체에서 name 으로 묶이므로 카드마다 다른 이름(o.n)을 준다 — 안 그러면 마지막 checked 만 남는다
const opt = (type, label, sub, o = {}) => '<label class="qnr__opt ' + (type === 'radio' ? 'radio' : 'cbox') + '"><input type="' + type + '" name="' + (o.n || 'q') + '"' + (o.on ? ' checked' : '') + (o.off ? ' disabled' : '') + '>' + (type === 'radio' ? '<span class="radio__dot"></span>' : '<span class="cbox__box">' + icon('check') + icon('minus') + '</span>') + '<span class="qnr__txt">' + label + (sub ? '<small>' + sub + '</small>' : '') + '</span>' + (o.free ? '<input class="qnr__free" type="text" placeholder="' + o.free + '" aria-label="' + label + '">' : '') + '</label>';
// 문항 하나 = 한 카드. 앱에서는 <form>, 문서에서는 제출로 페이지가 넘어가지 않게 <div>
const stepQ = (n, of, legend, hint, opts, o = {}) => '<div class="qnr" role="group" aria-label="연차 신청 문항 ' + n + ' / ' + of + '"><div class="qnr__hd"><div class="qnr__prog"><span class="qnr__segs">' + Array.from({ length: of }, (_, i) => '<i' + (i < n ? ' class="on"' : '') + '></i>').join('') + '</span>' + n + ' / ' + of + '</div></div><fieldset class="qnr__q"><legend>' + legend + '</legend><p class="qnr__lead">' + hint + '</p><div class="qnr__opts">' + opts + '</div></fieldset><div class="qnr__ft">' + (n > 1 ? '<button class="btn md neutral-outline qnr__back">' + icon('chevron-left') + '이전</button>' : '') + (o.skip ? '<button class="btn md neutral-weak">건너뛰기</button>' : '') + '<button class="btn md brand-solid"' + (o.block ? ' disabled' : '') + '>' + (n === of ? '제출' : '다음') + '</button></div></div>';
const kindOpts = (n, free) => opt('radio', '연차', '하루 · 잔여 12일 → 11일', { n, on: !free }) + opt('radio', '오전 반차', '09:00–13:00 · 0.5일', { n }) + opt('radio', '오후 반차', '그날 오후 회의실 A 예약이 있어 고를 수 없습니다', { n, off: true }) + opt('radio', '직접 입력', '', { n, on: free, free: '예: 경조 휴가' });
const NOTIFY = opt('checkbox', '김팀장', '결재선 첫 사람 — 결재 알림과 별도로 미리 알립니다', { on: true }) + opt('checkbox', '팀 채널', '#dev-1팀 · 부재 안내 한 줄', { on: true }) + opt('checkbox', '주간 회의 참석자', '10:00 회의 4명');

// Message scroller — 위 조각으로 짠 대화 한 줄기
const turn = (...m) => '<div class="mscroll__turn">' + m.join('') + '</div>';
const MORE = '<div class="mscroll__more" role="status">' + icon('loader-2') + '이전 대화 불러오는 중</div>';
// o: { top(맨 위를 보이는 상태 — 정적 문서에서 「위로 올린」 모습), fog, jump(위로 올린 사이 온 수) }
const scroller = (inner, o = {}) => '<div class="mscroll' + (o.top ? ' top' : '') + (o.fog ? ' fog' : '') + '"><div class="mscroll__view" role="log" aria-label="대화" tabindex="0"><div class="mscroll__col">' + inner + '</div></div>' + (o.jump ? '<button class="mscroll__jump">' + icon('arrow-down') + '새 메시지 ' + o.jump + '</button>' : '') + '</div>';
const T_OLD = sep('9월 10일') + turn(user('이번 주 출퇴근 현황 요약해줘'), agent(md('<p>이번 주 4일 모두 정상 출근했습니다. 평균 출근 <b>08:52</b>, 평균 퇴근 <b>18:10</b>입니다.</p>')));
const T_NOW = sep('오늘') + turn(user('다음 주 월요일에 연차 쓸 수 있어?'), agent(run('done', '연차 가능 여부 확인', '3단계 · 6초', STEPS_DONE, false)), agent(md('<p><b>9월 14일(월)</b>에 쓸 수 있습니다. 잔여 12일이고, 10:00 주간 회의 1건과 겹칩니다. 이대로 신청서를 올릴까요?</p>'), { foot: true, cls: 'last' }), agent(follow('신청서 올려줘', ['주간 회의 옮겨줘'])));
const T_RUN = turn(user('신청서 올려줘'), running('결재선 확인 중', '3초'));

export const pages = `
<section class="page" id="components/message">
  <h1>Message</h1>
  <p class="desc">대화의 한 턴. 사용자는 오른쪽 <b>말풍선(Bubble)</b>, 에이전트는 말풍선 없이 열 폭의 본문으로 답하고, 일을 하는 동안에는 실행 카드 → 완료 카드 → 후속 칩으로 이어집니다. 아바타 · 머리(이름·시각) · 내용 · 발(행동) 네 자리의 조합입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo col" style="flex:1 1 100%">${user('다음 주 월요일에 연차 쓸 수 있어?')}${agent(md(ANSWER), { head: '오후 2:08', foot: true, cls: 'last' })}</div>
    <ol><li><b>Avatar</b> (선택) — 28px. 1:1 에이전트 대화에서는 생략하고, 사람이 섞이는 스레드에서만</li><li><b>Header</b> (선택) — 이름 t1 600 + 시각 t1 muted. 묶음의 첫 메시지에만</li><li><b>Bubble</b> — 사용자 글. <code>--bg-neutral-weak</code>, 오른쪽 아래 모서리만 xs, 최대 78%</li><li><b>Content</b> — 에이전트 답. 말풍선 없이 마크다운 t3, 최대 720px</li><li><b>Footer</b> — 복사 · 다시 생성 · 좋아요/싫어요 ghost iconbtn sm. hover · 키보드 포커스 · 마지막 메시지에만</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Kind</h3>
  <div class="demo col">
    <figure class="ex">${user('다음 주 월요일에 연차 쓸 수 있어?')}<figcaption>user — 오른쪽 정렬 말풍선, 최대 78%</figcaption></figure>
    <figure class="ex">${user('영수증이랑 결의서 같이 올려줘', attachTile('영수증 사진') + attach({ size: 'md', kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB', href: true }))}<figcaption>user + 첨부 — 첨부는 말풍선 위. 이미지 96 타일 · 문서 Attachment md</figcaption></figure>
    <figure class="ex">${agent(md(ANSWER))}<figcaption>answer — 말풍선 없는 마크다운(문단 · 목록 · 굵게), 최대 720px</figcaption></figure>
    <figure class="ex">${agent(run('live', '연차 신청 준비', '3 / 4', STEPS_RUN, true))}<figcaption>run · 진행 — 머리(상태 점 · 제목 · N/M) + 단계 줄</figcaption></figure>
    <figure class="ex">${agent(run('fail', '연차 신청 준비', '2 / 3', STEPS_FAIL, true))}<figcaption>run · 실패 — 멈춘 단계에 사유 + 다시 시도. 펼친 채로 둡니다</figcaption></figure>
    <figure class="ex">${agent(run('done', '연차 가능 여부 확인', '3단계 · 6초', STEPS_DONE, false))}<figcaption>run · 끝남 — 한 줄로 접힘. 누르면 단계를 펼칩니다</figcaption></figure>
    <figure class="ex">${agent(done('연차 신청서를 올렸습니다. 결재선 <b>김팀장 → 박본부장</b>, 승인되면 알려 드립니다.', '결재 문서 열기'))}<figcaption>done — 무언가를 실제로 바꾼 뒤. 초록 체크 + 결과 + 링크 버튼</figcaption></figure>
    <figure class="ex">${agent(follow('팀에 알려줘', ['주간 회의 옮겨줘', '남은 연차 보여줘']))}<figcaption>follow — 턴 끝의 후속 칩. primary(잉크) 하나 + 나머지</figcaption></figure>
  </div>
  <table><tr><th>Kind</th><th>모양</th><th>언제</th></tr><tr><td>user</td><td>오른쪽 말풍선, 첨부는 위</td><td>사용자가 보낸 글·파일</td></tr><tr><td>answer</td><td>말풍선 없음, 마크다운</td><td>에이전트의 글 답</td></tr><tr><td>run</td><td>선 카드 + 단계 줄 — 끝나면 접힘</td><td>도구를 부르는 동안(조회·초안)</td></tr><tr><td>done</td><td><code>--bg-neutral-weak</code> 카드 + 체크</td><td>상신·기록처럼 실제로 바뀐 뒤 한 번</td></tr><tr><td>follow</td><td>Chip md 열, primary 하나</td><td>턴 마지막, 다음에 할 만한 일 2~4개</td></tr></table>
  <p>행동 전에 확인을 받는 카드는 <a href="#components/questionnaire">Questionnaire</a>, 진행 한 줄은 <a href="#components/marker">Marker</a> 입니다.</p>
  <table><tr><th>단계 줄</th><th>아이콘 16</th><th>글자</th></tr><tr><td>done</td><td>circle-check-filled · <code>--fg-positive</code></td><td>기본 + 결과 한 줄(t1 muted)</td></tr><tr><td>active</td><td>loader-2 회전 · <code>--fg-accent</code></td><td>500</td></tr><tr><td>failed</td><td>circle-x-filled · <code>--fg-critical</code></td><td>사유 <code>--fg-critical</code> + 다시 시도 xs</td></tr><tr><td>pending</td><td>circle-dashed · <code>--fg-neutral-placeholder</code></td><td><code>--fg-neutral-muted</code></td></tr></table>
  <h3>Slot</h3>
  <div class="demo col">
    <figure class="ex">${agent(md('<p>담당자 <b>박지웅</b>(기업부설연구소)에게 AS 요청을 보냈습니다.</p>'), { avatar: true, head: '오후 2:14' })}<figcaption>avatar + header — 여러 사람이 있는 스레드. 에이전트는 틸 아바타</figcaption></figure>
    <figure class="ex">${agent(md('<p>이번 주 출퇴근은 4일 모두 정상입니다.</p>'), { foot: true, cls: 'last' })}<figcaption>footer — 마지막 답에는 늘, 나머지는 hover·포커스에만</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo col">
    <figure class="ex">${agent(md('<p>이번 주 출퇴근은 4일 모두 정상입니다. 평균 출근 08:52, 평균 퇴근은<span class="msg__caret" aria-hidden="true"></span></p>'))}<figcaption>streaming — 글 끝 캐럿. 발은 끝난 뒤에 붙습니다</figcaption></figure>
    <figure class="ex">${agent('<div class="msg__error" role="alert">' + icon('alert-circle-filled') + '응답을 받지 못했습니다 — 게이트웨이 연결이 끊겼습니다<button class="btn xs neutral-outline">' + icon('refresh') + '다시 시도</button></div>')}<figcaption>error — 그 자리에서 사유 + 다시 시도. 토스트로 빼지 않습니다</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${follow('팀에 알려줘', ['남은 연차 보여줘'])}</div>후속 칩의 primary 는 하나, 잉크 채움. 누르면 그 문장이 바로 보내집니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="msg__follow"><button class="chip md" style="background:var(--bg-accent-solid);border-color:var(--stroke-accent)">팀에 알려줘</button><button class="chip md selected">남은 연차 보여줘</button></div></div>틸로 칠하거나(앱의 지금 모양) primary 를 둘 두지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>사용자 글만 말풍선에 넣습니다. 에이전트 답은 본문이라 표·목록이 말풍선 폭에 갇히지 않습니다. 실행 카드는 끝나면 접고, 결과는 완료 카드와 답이 말합니다.</div>
    <div class="dont"><b>Don&#39;t</b>타이핑 점과 진행 줄(Marker)을 함께 그리지 않습니다 — 점이 두 줄로 겹칩니다. 에이전트 답에 틸 배경 말풍선을 입히지 않습니다(그건 Agent notice).</div>
  </div>
  <h2>Message vs. Agent notice vs. Toast</h2>
  <table><tr><th></th><th>Message</th><th>Agent notice</th><th>Toast</th></tr><tr><td>자리</td><td>대화 흐름 안, 시간순</td><td>화면 위 고정</td><td>화면 아래 가운데, 떠 있음</td></tr><tr><td>수명</td><td>대화 기록으로 남음</td><td>상태가 풀릴 때까지</td><td>4초</td></tr><tr><td>내용</td><td>질문 · 답 · 실행 과정 · 결과</td><td>할 수 있는 일 · 연동 상태</td><td>방금 한 행동의 결과 한 줄</td></tr><tr><td>행동</td><td>후속 칩 · 링크 버튼 · 확인 카드</td><td>없음</td><td>링크 하나</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Bubble</td><td><code>--bg-neutral-weak</code> · 패딩 <code>--dim-x2_5 --dim-x4</code> · 라운드 <code>--radius-xl</code>(오른쪽 아래 <code>--radius-xs</code>) · t3 / <code>--line-height-t3</code></td></tr>
    <tr><td>Content</td><td>t3 / <code>--line-height-t4</code> · 최대 720px · 블록 사이 <code>--dim-x3</code> · 목록 들여쓰기 <code>--dim-x5</code> · 굵게 600</td></tr>
    <tr><td>Header · Footer</td><td>t1 — 이름 600 · 시각 muted tabular / iconbtn sm ghost 넷, 간격 <code>--dim-x0_5</code>, 첫 아이콘이 본문 왼쪽에 맞게 <code>-dim-x1_5</code></td></tr>
    <tr><td>Run card</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 머리 44px(펼침 <code>--bg-layer-basement</code>) 제목 t2 600 · N/M t1 muted · 점 8px(진행 accent 깜빡임 · 끝 positive · 실패 critical) · 단계 t2 + 결과 t1</td></tr>
    <tr><td>Done card</td><td><code>--bg-neutral-weak</code> · <code>--radius-lg</code> · 패딩 <code>--dim-x4 --dim-x5</code> · circle-check-filled 18 <code>--fg-positive</code> · 링크 btn sm neutral-outline</td></tr>
    <tr><td>Follow</td><td>Chip md · 간격 <code>--spacing-between-chips</code> · primary = Chip selected(<code>--bg-brand-solid</code>)</td></tr>
    <tr><td>Motion</td><td>캐럿 1초 · 점 1.4초 · 단계 회전 1초 — <code>prefers-reduced-motion</code> 이면 멈춤</td></tr>
    <tr><td>접근성</td><td>메시지마다 <code>&lt;article aria-label&gt;</code>, 목록 전체는 Message scroller 의 <code>role="log"</code> · 실행 카드는 <code>&lt;details&gt;/&lt;summary&gt;</code> — Enter·Space 로 접고 펼침 · 오류는 <code>role="alert"</code> · 발 버튼은 <code>aria-label</code> + 툴팁, 포커스가 들어오면 보임</td></tr></table>
</section>

<section class="page" id="components/marker">
  <h1>Marker</h1>
  <p class="desc">대화 사이에 끼는 한 줄 표식 — 지금 무엇을 하는지(진행), 무엇이 바뀌었는지(시스템 메모), 어디서 날이 바뀌는지(구분선). 말풍선도 카드도 아닌 가장 조용한 층입니다. 진행 표식은 실행이 열려 있는 동안 <b>반드시</b> 보이고, 사라지는 것이 「끝났다」는 신호입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${running('근태 기록 조회 중', '3초')}</div>
    <ol><li><b>Indicator</b> — 진행 점 6px(accent 깜빡임) · 타이핑 점 · 아이콘 16 중 하나</li><li><b>Text</b> — t1 <code>--fg-neutral-subtle</code>, 지금 하는 일을 「~ 중」으로</li><li><b>Meta</b> (선택) — 경과·시각 t1 muted, tabular</li><li><b>Action</b> (선택) — 「중단」 btn xs outline 하나</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Variant</h3>
  <div class="demo col">
    <figure class="ex">${running('근태 기록 조회 중', '3초')}<figcaption>default — 선 없는 한 줄. 진행 상태·시스템 메모</figcaption></figure>
    <figure class="ex">${mk('border', icon('clock-filled') + '<span class="marker__text">근태 시스템에서 이번 주 기록 <b>5건</b>을 가져왔습니다</span>' + icon('chevron-right'), 'button', ' aria-expanded="false"')}<figcaption>border — 도구 호출 요약. 눌러서 자세히(요청·응답)</figcaption></figure>
    <figure class="ex">${sep('오늘')}<figcaption>separator — 가운데 라벨 + 양쪽 선. 날짜가 바뀌는 곳</figcaption></figure>
  </div>
  <table><tr><th>Variant</th><th>모양</th><th>쓰임</th></tr><tr><td>default</td><td>선·배경 없음</td><td>진행 · 타이핑 · 시스템 메모 · 링크</td></tr><tr><td>border</td><td>1px 선 <code>--radius-md</code> 36px, 누를 수 있음</td><td>끝난 도구 호출 한 줄 요약 — 실행 카드를 접은 뒤 남기는 흔적</td></tr><tr><td>separator</td><td>라벨 t1 500 muted + <code>--stroke-neutral-strong</code> 선</td><td>「오늘」 「어제」 「9월 10일」 — 날짜가 바뀔 때만</td></tr></table>
  <h3>Content</h3>
  <div class="demo col">
    <figure class="ex">${mk('', DOTS + '<span class="marker__text">생각 중</span><span class="marker__time">1초</span>' + STOP, 'div', ' role="status"')}<figcaption>typing — 첫 글자가 오기 전. 무슨 단계인지 몰라도 「생각 중」</figcaption></figure>
    <figure class="ex">${mk('note', '<span class="marker__time">오후 2:10</span>·<span class="marker__text">연차 신청을 취소했습니다</span>')}<figcaption>system note — 가운데, 시각 + 바뀐 사실 한 문장</figcaption></figure>
    <figure class="ex">${mk('link', icon('file-text-filled') + '<span class="marker__text">결재 문서 열기</span>' + icon('arrow-up-right'), 'a', ' href="#"')}<figcaption>link — 표식 자체가 링크. 사내 시스템으로 나가면 arrow-up-right</figcaption></figure>
  </div>
  <h3>State</h3>
  <div class="demo col">
    <figure class="ex">${mk('shimmer', '<span class="marker__dot" aria-hidden="true"></span><span class="marker__text">업무일지 초안 쓰는 중</span><span class="marker__time">12초</span>' + STOP, 'div', ' role="status"')}<figcaption>streaming — 글자 위로 빛이 지나갑니다(shimmer). 동작 줄이기 설정이면 멈춘 글자</figcaption></figure>
    <figure class="ex">${mk('', '<span class="marker__dot" aria-hidden="true" style="animation:none"></span><span class="marker__text">중단하는 중</span><span class="marker__time">19초</span><button class="btn xs neutral-outline" disabled>' + icon('player-stop-filled') + '중단</button>', 'div', ' role="status"')}<figcaption>stopping — 중단을 보낸 뒤. 버튼은 disabled, 점은 멈춤</figcaption></figure>
  </div>
  <table><tr><th>진행 단계</th><th>표시</th><th>문구 예</th></tr><tr><td>thinking</td><td>타이핑 점</td><td>생각 중</td></tr><tr><td>tool</td><td>진행 점 + 도구 이름</td><td>근태 기록 조회 중 · 결재선 확인 중</td></tr><tr><td>writing</td><td>진행 점 + shimmer</td><td>업무일지 초안 쓰는 중</td></tr><tr><td>awaiting</td><td>점 멈춤, 중단 없음</td><td>확인을 기다리는 중 — 위 Questionnaire 가 답을 받습니다</td></tr><tr><td>stopping</td><td>점 멈춤, 버튼 disabled</td><td>중단하는 중</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${running('결재선 확인 중', '4초')}</div>진행 표식은 목록 맨 아래 한 줄. 경과 시간과 「중단」을 같이 두어 기다릴지 스스로 판단하게 합니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="marker"><span class="marker__dot"></span><span class="marker__text">처리 중…</span></div></div>무엇을 하는지 없는 「처리 중」, 끝났는데 남아 있는 진행 표식.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>구분선은 날짜가 바뀔 때만, 시스템 메모는 사용자가 한 행동의 결과(취소·수정)만 남깁니다.</div>
    <div class="dont"><b>Don&#39;t</b>Marker 에 상태색 배경을 칠하거나 배지처럼 쓰지 않습니다 — 상태를 붙일 대상이 있으면 Badge.</div>
  </div>
  <h2>Marker vs. Badge vs. Callout</h2>
  <table><tr><th></th><th>Marker</th><th><a href="#components/badge">Badge</a></th><th><a href="#components/callout">Callout</a></th></tr><tr><td>뜻</td><td>대화 흐름 속 사건 · 진행</td><td>대상의 상태 한 단어</td><td>화면에 남는 안내 한 문단</td></tr><tr><td>글자</td><td>문장(「근태 기록 조회 중」)</td><td>한두 단어</td><td>제목 + 설명</td></tr><tr><td>자리</td><td>메시지 사이 · 목록 끝</td><td>행·카드 옆</td><td>화면·패널 위</td></tr><tr><td>상호작용</td><td>중단 · 펼침 · 링크</td><td>없음</td><td>링크 · 닫기</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>줄</td><td>최소 28px · 간격 <code>--dim-x2</code> · t1 <code>--fg-neutral-subtle</code> · 강조 600 <code>--fg-neutral</code></td></tr>
    <tr><td>진행 점 / 타이핑 점</td><td>6px <code>--bg-accent-solid</code> 1.4초 깜빡임 / 6px ×3 <code>--stroke-neutral-stronger</code> → <code>--fg-neutral-muted</code>, 0.15초 간격</td></tr>
    <tr><td>Meta · 아이콘</td><td>t1 <code>--fg-neutral-muted</code> tabular · 16px(filled) muted</td></tr>
    <tr><td>border</td><td>36px · 패딩 <code>--dim-x3</code> · <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · hover <code>--bg-neutral-hover</code></td></tr>
    <tr><td>separator</td><td>라벨 500 muted · 선 1px <code>--stroke-neutral-strong</code> · 라벨과 선 사이 <code>--dim-x3</code></td></tr>
    <tr><td>shimmer</td><td><code>--fg-neutral-muted</code> → <code>--fg-neutral</code> 띠가 2초에 한 번 — <code>prefers-reduced-motion</code> 이면 <code>--fg-neutral-subtle</code> 고정</td></tr>
    <tr><td>접근성</td><td>진행 줄 <code>role="status"</code>(바뀔 때만 읽힘, 초 단위 경과는 <code>aria-hidden</code> 으로 따로 둘 수 있음) · 점은 장식 <code>aria-hidden</code> · 중단은 <code>&lt;button&gt;</code> · border 는 <code>&lt;button aria-expanded&gt;</code> · 구분선은 글자가 곧 이름이라 role 없이 읽힙니다</td></tr></table>
</section>

<section class="page" id="components/questionnaire">
  <h1>Questionnaire</h1>
  <p class="desc">에이전트가 <b>실행 전에 확인</b>을 받는 카드. 상신·승인·기록처럼 실제로 바꾸는 일은 이 카드가 답을 받은 뒤에만 합니다. 값이 다 있으면 요약을 보이고 승인을 받는 <b>확인형</b>, 모르는 값이 있으면 한 문항씩 묻는 <b>단계형</b>입니다. 답을 받으면 한 줄로 접혀 대화 기록에 남습니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${confirmQ()}</div>
    <ol><li><b>Header</b> — 제목은 질문(t4 600) + 안내 한 줄(t1 muted): 무엇을 하려는지, 되돌릴 수 있는지</li><li><b>Summary</b> — Dialog 와 같은 요약 상자(<code>.dialog-sum</code>). 에이전트가 채운 값 그대로</li><li><b>Footer</b> — 오른쪽 정렬. 주요 행동 하나(잉크) + 「수정」 outline + 「취소」 weak</li><li><b>Band</b> (선택) — 예시 데이터일 때 맨 위 sample 띠</li><li><b>Progress · Question · Options</b> — 단계형에서 Summary 자리에 오는 셋(아래 Type)</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Type</h3>
  <div class="demo col">
    <figure class="ex" style="max-width:560px">${confirmQ()}<figcaption>confirm — 값을 다 채웠을 때. 요약 + 승인 · 수정 · 취소</figcaption></figure>
    <figure class="ex" style="max-width:560px">${stepQ(1, 3, '어떤 휴가를 쓸까요?', '잔여 연차 12일 · 반차는 0.5일을 씁니다', kindOpts('k1'))}<figcaption>step — 모르는 값을 한 문항씩. 진행 「1 / 3」 + 문항 + 선택지 + 다음. 고를 수 없는 것은 사유와 함께 disabled</figcaption></figure>
  </div>
  <table><tr><th>Type</th><th>언제</th><th>문항</th><th>답 이후</th></tr><tr><td>confirm</td><td>에이전트가 값을 다 채웠을 때 — 신청·상신·기록 직전</td><td>하나(승인할지)</td><td>승인됨 · 취소됨 · 거부됨</td></tr><tr><td>step</td><td>사유·종류·알릴 사람처럼 사용자만 아는 값이 있을 때</td><td>2~3개, 한 카드에 하나씩</td><td>제출됨 → 확인형으로 이어지거나 바로 실행</td></tr></table>
  <h3>Selection</h3>
  <div class="demo col">
    <figure class="ex" style="max-width:560px">${stepQ(2, 3, '누구에게 알릴까요?', '여럿 고를 수 있습니다', NOTIFY, { skip: true })}<figcaption>multi — 체크박스. 비워 둬도 되는 문항은 「건너뛰기」, 두 번째부터는 「이전」</figcaption></figure>
    <figure class="ex" style="max-width:560px">${stepQ(3, 3, '어떤 휴가를 쓸까요?', '목록에 없으면 직접 적습니다', kindOpts('k3', true))}<figcaption>free — 「직접 입력」을 고르면 그 행 안에 입력 칸이 열립니다. 마지막 문항은 「제출」</figcaption></figure>
  </div>
  <table><tr><th>Selection</th><th>컨트롤</th><th>규칙</th></tr><tr><td>single</td><td>radio 16px, 잉크</td><td>하나는 미리 골라 둡니다(에이전트의 추천). 「다음」은 늘 누를 수 있음</td></tr><tr><td>multi</td><td>checkbox 16px, 잉크</td><td>추천을 미리 체크. 0개면 「건너뛰기」가 그 역할</td></tr><tr><td>free</td><td>radio + 32px 입력 칸</td><td>고르면 칸이 열리고 포커스가 옮겨감. 비어 있으면 「다음」 disabled</td></tr><tr><td>disabled</td><td>회색 채움 + 사유</td><td>왜 못 고르는지 작은 글자로 — 숨기지 않습니다</td></tr></table>
  <h3>State</h3>
  <div class="demo col">
    <figure class="ex" style="max-width:560px">${confirmQ({ state: 'resolving' })}<figcaption>resolving — 승인을 누른 뒤. 주요 버튼 loading, 나머지 disabled. 카드는 그대로</figcaption></figure>
    <figure class="ex" style="max-width:560px">${settled('연차 신청', '연차 · 9월 15일(화) · 김팀장 → 박본부장', '승인됨', 'success', LEAVE)}<figcaption>settled · 승인됨 — 한 줄로 접힘. 펼치면 승인한 값</figcaption></figure>
    <figure class="ex" style="max-width:560px">${settled('연차 신청', '연차 · 9월 15일(화) · 알림: 김팀장, 팀 채널', '제출됨', 'info', [...LEAVE, ['알림', '김팀장 · 팀 채널']])}<figcaption>settled · 제출됨 — 단계형을 다 답한 뒤</figcaption></figure>
    <figure class="ex" style="max-width:560px">${settled('연차 신청', '사용자가 취소했습니다', '취소됨', '', LEAVE)}<figcaption>settled · 취소됨 — 「취소」를 눌렀거나 다른 말을 이어 했을 때</figcaption></figure>
    <figure class="ex" style="max-width:560px">${settled('연차 신청', '전자결재가 거부했습니다 — 결재선에 대리 결재자가 없습니다', '거부됨', 'danger', LEAVE)}<figcaption>settled · 거부됨 — 승인했지만 시스템이 받지 않음. 사유를 요약 줄에</figcaption></figure>
    <figure class="ex" style="max-width:560px">${confirmQ({ sample: true })}<figcaption>sample — 연동 전 예시 데이터. 승인해도 실제로 올라가지 않는다는 것을 띠로 먼저 말합니다</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${ASK()}</div>주요 행동은 잉크 하나, 오른쪽 끝. 「승인」「제출」처럼 무엇이 일어나는지 라벨에 적습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><button class="btn md neutral-weak">취소</button><button class="btn md" style="border-radius:var(--radius-full);background:var(--bg-accent-solid);color:var(--fg-on-brand)">확인</button></div>틸 알약에 흰 글자(앱의 지금 모양 — 대비 2.1:1) · 「확인」「예」 라벨.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>카드는 턴에 하나, 답을 받으면 접습니다. 단계형은 3문항 안쪽 — 그 이상이면 대화로 묻습니다. 사용자가 카드를 두고 다른 말을 하면 「취소됨」으로 접고 새 말에 답합니다.</div>
    <div class="dont"><b>Don&#39;t</b>답을 받은 카드를 열린 채 두지 않습니다(다시 누를 수 있어 보입니다). 확인 없이 상신하지 않습니다. 한 카드에 문항 여럿을 쌓거나, 카드 위에 Dialog 를 또 띄우지 않습니다.</div>
  </div>
  <h2>Questionnaire vs. Dialog vs. Settings dialog</h2>
  <table><tr><th></th><th>Questionnaire</th><th><a href="#components/dialog">Dialog</a></th><th>Settings dialog</th></tr><tr><td>누가 묻나</td><td>에이전트가 실행 전에</td><td>사용자의 행동 직후(삭제·상신 취소)</td><td>사용자가 설정을 바꿀 때</td></tr><tr><td>자리</td><td>대화 흐름 안, 메시지 본문</td><td>화면 가운데 모달</td><td>모달</td></tr><tr><td>막기</td><td>막지 않음 — 다른 말을 이어 할 수 있음</td><td>뒤를 막음</td><td>막음</td></tr><tr><td>답 이후</td><td>접힌 한 줄로 기록에 남음</td><td>닫힘</td><td>닫힘 + 저장</td></tr><tr><td>주요 버튼</td><td>brand-solid 「승인」「제출」</td><td>brand-solid / critical-solid</td><td>「저장」</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Card</td><td><code>--stroke-neutral-strong</code> · <code>--radius-lg</code> · 최대 560px · 패딩 <code>--dim-x5</code> · t2</td></tr>
    <tr><td>Header</td><td>제목 t4 600 · 안내 t1 <code>--fg-neutral-muted</code> · 사이 <code>--dim-x1</code></td></tr>
    <tr><td>Summary</td><td><code>.dialog-sum</code> — <code>--bg-layer-basement</code> · <code>--radius-md</code> · 라벨 subtle / 값 600</td></tr>
    <tr><td>Progress</td><td>칸 4px <code>--radius-full</code> <code>--bg-neutral-weak</code> → 지난 칸 <code>--bg-brand-solid</code> · 「n / m」 t1 muted tabular</td></tr>
    <tr><td>Option row</td><td>48px · <code>--stroke-neutral-strong</code> · <code>--radius-md</code> · 선택 <code>--stroke-brand</code> · hover <code>--bg-neutral-hover</code> · disabled <code>--bg-neutral-weak</code> + <code>--fg-disabled</code> · 컨트롤 16px <a href="#components/checkbox">Checkbox</a> · <a href="#components/radio-group">Radio group</a> 그대로 · 입력 칸 32px <code>--radius-sm</code>, focus <code>--stroke-accent</code></td></tr>
    <tr><td>Footer</td><td>주요 btn md <b>brand-solid(잉크)</b> — 앱이 지금 쓰는 틸 알약 CTA(Thread.jsx)는 이 시스템에서 잉크로 바꿉니다 · 수정 neutral-outline · 취소 neutral-weak · 「이전」은 왼쪽 끝 · 간격 <code>--dim-x2</code></td></tr>
    <tr><td>Settled</td><td>48px 줄 · 제목 600 · 요약 t1 muted ellipsis · Badge success(승인됨) · info(제출됨) · neutral(취소됨) · danger(거부됨) · chevron-down 16</td></tr>
    <tr><td>Band</td><td><code>--bg-sample-weak</code> / <code>--fg-sample</code> · t1 500 · info-circle-filled 16</td></tr>
    <tr><td>접근성</td><td>카드 <code>role="group" aria-label</code> · 단계형은 <code>&lt;fieldset&gt;/&lt;legend&gt;</code> 가 문항, 선택지는 진짜 radio/checkbox(방향키 이동 · Space 선택) · 「직접 입력」은 고르면 칸으로 포커스 · 접힌 줄은 <code>&lt;details&gt;</code>(Enter·Space) · 카드 자리는 <code>aria-live="polite"</code> 라 「승인됨」이 읽힘 · Esc 는 아무것도 하지 않음(대화를 막지 않으므로)</td></tr></table>
</section>

<section class="page" id="components/attachment">
  <h1>Attachment</h1>
  <p class="desc">대화에 붙인 파일 하나를 보여 주는 칩입니다. 보내기 전에는 컴포저 아래에서 지울 수 있고, 보낸 뒤에는 말풍선 위에서 내려받는 링크가 됩니다. 이미지는 미리보기, 문서는 연회색 확장자 배지로 보여 줍니다. 파일을 끌어다 놓는 자리는 아래 <b>File dropzone</b> 입니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo">${attach({ kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB · 3쪽', remove: true })}</div>
    <ol><li><b>Thumbnail</b> — 44px(lg). 이미지는 미리보기, 문서는 확장자 배지 — 종류와 상관없이 같은 연회색 + 잉크 글자</li><li><b>Name</b> — t1 500, 한 줄 ellipsis</li><li><b>Meta</b> — 12px muted: 종류 · 크기 · 쪽수</li><li><b>Remove</b> (보내기 전) — 오른쪽 위 모서리에 걸친 검은 원 14px + 흰 ×(10px)</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Size</h3>
  <div class="demo">
    <figure class="ex">${attach({ size: 'sm', kind: 'pdf', name: '9월_지출결의서.pdf', meta: '248KB', href: true })}<figcaption>sm — 썸네일 28, 이름과 메타 한 줄</figcaption></figure>
    <figure class="ex">${attach({ size: 'md', kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB', href: true })}<figcaption>md — 썸네일 32</figcaption></figure>
    <figure class="ex">${attach({ kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB · 3쪽', remove: true })}<figcaption>lg — 썸네일 44, 확장자 글자</figcaption></figure>
  </div>
  <table><tr><th>크기</th><th>썸네일</th><th>쓰임</th></tr><tr><td>sm</td><td>28 · 아이콘</td><td>세션 파일 띠 · 표 안</td></tr><tr><td>md</td><td>32 · 아이콘</td><td>보낸 말풍선 위 · 목록</td></tr><tr><td>lg</td><td>44 · 확장자 글자</td><td>컴포저 — 기본</td></tr></table>
  <h3>Thumbnail</h3>
  <div class="demo">
    <figure class="ex">${attach({ kind: 'img', name: '영수증_0915.jpg', meta: 'JPG · 1.2MB', remove: true })}<figcaption>image — 미리보기 cover</figcaption></figure>
    <figure class="ex">${attach({ kind: 'hwp', name: '연차신청서_양식.hwp', meta: 'HWP · 52KB', remove: true })}<figcaption>document lg — 확장자 글자. pdf · hwp · xlsx 모두 같은 연회색</figcaption></figure>
    <figure class="ex">${attach({ size: 'md', kind: 'xlsx', name: '경비_내역_2026-09.xlsx', meta: 'XLSX · 36KB · 시트 2', href: true })}<figcaption>document md · sm — 글자 대신 file-text-filled 16</figcaption></figure>
  </div>
  <h3>Placement</h3>
  <div class="demo col">
    <figure class="ex"><div class="attach__group">${attach({ kind: 'img', name: '영수증_0915.jpg', meta: 'JPG · 1.2MB', remove: true }) + attach({ kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB · 3쪽', remove: true }) + attach({ kind: 'xlsx', name: '경비_내역_2026-09.xlsx', meta: 'XLSX · 36KB', remove: true })}</div><figcaption>composer — 보내기 전. 입력창 아래 줄바꿈, 위로 맞춤, 칩마다 지우기</figcaption></figure>
    <figure class="ex">${user('영수증이랑 결의서 같이 올려줘', attachTile('영수증 사진') + attach({ size: 'md', kind: 'pdf', name: '9월_지출결의서.pdf', meta: 'PDF · 248KB', href: true }))}<figcaption>bubble — 보낸 뒤. 말풍선 위 오른쪽, 아래로 맞춤. 이미지는 96 타일, 문서는 md 링크</figcaption></figure>
  </div>
  <table><tr><th>자리</th><th>크기</th><th>정렬</th><th>지우기</th></tr><tr><td>composer</td><td>lg</td><td>왼쪽 · 위</td><td>있음</td></tr><tr><td>bubble</td><td>이미지 96 타일 · 문서 md</td><td>오른쪽 · 아래(말풍선과 밑선을 맞춤)</td><td>없음 — 링크</td></tr></table>
  <h3>File dropzone</h3>
  <div class="demo col">
    <figure class="ex">${drop('', '영수증을 끌어다 놓거나 <u>파일 선택</u>', 'JPG · PNG · PDF, 10MB 까지')}<figcaption>default — 점선 상자. 「파일 선택」이 진짜 &lt;input type="file"&gt; 의 라벨</figcaption></figure>
    <figure class="ex">${drop('over', '여기에 놓으세요', '영수증_0915.jpg')}<figcaption>drag-over — accent 선 + 틴트. 컴포저 위로 끌면 컴포저 전체가 이 모양</figcaption></figure>
  </div>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${attach({ kind: 'pdf', name: '2026년_9월_법인카드_지출결의서_최종.pdf', meta: 'PDF · 248KB · 3쪽', remove: true })}</div>이름은 한 줄에서 잘라도 됩니다 — 종류와 크기는 메타 줄이 알려 줍니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo"><div class="attach lg"><span class="attach__thumb" aria-hidden="true">PDF</span><span class="attach__main"><span class="attach__name">9월_지출결의서.pdf</span></span></div></div>메타를 빼지 않습니다 — 이름만으로는 무엇을, 얼마나 큰 파일을 붙였는지 알 수 없습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b>보내기 전에는 지우기, 보낸 뒤에는 링크 — 한 칩에 둘을 함께 두지 않습니다.</div>
    <div class="dont"><b>Don&#39;t</b>썸네일을 종류별 색으로 칠하지 않습니다. 확장자는 글자가 말하고, 문서는 모두 같은 연회색입니다.</div>
  </div>
  <h2>Attachment vs. Settings file row vs. Chip</h2>
  <table><tr><th></th><th>Attachment</th><th><a href="#components/settings-dialog">Settings file row</a></th><th><a href="#components/chip">Chip</a></th></tr><tr><td>뜻</td><td>대화에 붙인 파일 하나</td><td>보관된 파일 한 줄(목록)</td><td>선택·필터 값</td></tr><tr><td>모양</td><td>선 카드, 썸네일 44 · 32 · 28</td><td>표 행, 썸네일 36</td><td>알약</td></tr><tr><td>행동</td><td>보내기 전 지우기 · 보낸 뒤 내려받기</td><td>삭제 xs</td><td>토글</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Container</td><td><code>--stroke-neutral-strong</code> · <code>--radius-md</code> · 패딩 <code>--dim-x1</code> · 최대 280px · 간격 <code>--dim-x2_5</code> · 링크면 hover <code>--bg-neutral-hover</code></td></tr>
    <tr><td>Thumbnail</td><td>lg 44 <code>--radius-sm</code> · md 32 · sm 28 <code>--radius-xs</code> · 문서는 <code>--bg-neutral-weak</code> + <code>--fg-neutral-subtle</code>, 확장자 t1 700 · md·sm 은 file-text-filled 16 · 이미지는 <code>object-fit:cover</code></td></tr>
    <tr><td>Name · Meta</td><td>t1 500 ellipsis / <b>메타 12px</b> <code>--fg-neutral-muted</code> tabular — 시스템 최소 t1(13)보다 작은 유일한 예외, 디자이너 지정</td></tr>
    <tr><td>Remove</td><td>14px 원 <code>--bg-neutral-solid</code> + Tabler x 10px <code>--fg-on-neutral</code>(선 2.5) · 오른쪽 위 모서리에서 <code>--dim-x1</code> 밖으로 · 가상요소로 24px 손가락 자리</td></tr>
    <tr><td>Placement</td><td>줄바꿈, 간격 <code>--dim-x2</code> · composer 는 위로 맞춤 · 말풍선 위(<code>.attach__group.end</code>)는 오른쪽 · 아래로 맞춤 · 이미지 타일 96</td></tr>
    <tr><td>Dropzone</td><td>최소 136px · 패딩 <code>--dim-x6</code> · 점선 <code>--stroke-neutral-stronger</code> · <code>--radius-lg</code> · cloud-upload 24 · hover <code>--bg-neutral-hover</code> · over <code>--stroke-accent</code> + <code>--bg-accent-weak</code></td></tr>
    <tr><td>접근성</td><td>보낸 칩은 <code>&lt;a&gt;</code>(파일 이름이 링크 이름) · 지우기는 <code>&lt;button aria-label="파일명 첨부 제거"&gt;</code> · 썸네일은 장식(<code>alt=""</code> · <code>aria-hidden</code>) · 드롭존은 <code>&lt;label&gt;</code> 안의 진짜 <code>&lt;input type="file"&gt;</code> — Tab 으로 가고 Enter·Space 로 파일 창, 포커스 링은 상자 전체</td></tr></table>
</section>

<section class="page" id="components/message-scroller">
  <h1>Message scroller</h1>
  <p class="desc">대화가 흐르는 상자. Message · Marker · Questionnaire · Attachment 를 시간순으로 쌓고, <b>바닥에 붙어</b> 있다가 사용자가 위로 올리면 붙지 않습니다. 그 사이 온 답은 「새 메시지」 알약으로 세고, 맨 위에 닿으면 이전 대화를 불러옵니다.</p>
  <h2>Anatomy</h2>
  <div class="anatomy">
    <div class="demo" style="flex:1 1 100%">${scroller(MORE + T_OLD + T_NOW, { top: true, jump: 2 })}</div>
    <ol><li><b>Viewport</b> — 세로 스크롤 영역. <code>role="log"</code>, 포커스 가능</li><li><b>Column</b> — 최대 720px 가운데. 턴 사이 <code>--dim-x6</code>, 턴 안(질문 → 실행 → 답 → 후속) <code>--dim-x3</code></li><li><b>Top loader</b> — 맨 위에 닿았을 때 이전 대화를 불러오는 줄</li><li><b>Date separator</b> — <a href="#components/marker">Marker</a> separator. 날짜가 바뀌는 곳</li><li><b>Jump pill</b> — 위로 올린 사이 온 메시지 수 + arrow-down. 떠 있음, shadow-2</li></ol>
  </div>
  <h2>Properties</h2>
  <h3>Behavior</h3>
  <div class="demo col">
    <figure class="ex">${scroller(T_OLD + T_NOW + T_RUN)}<figcaption>stuck — 바닥에 붙음. 새 답·진행 표식이 오면 따라 내려갑니다</figcaption></figure>
    <figure class="ex">${scroller(T_OLD + T_NOW, { top: true, jump: 2 })}<figcaption>unstuck — 사용자가 위로 올린 상태. 붙지 않고 「새 메시지 2」 알약. 누르면 바닥으로</figcaption></figure>
    <figure class="ex">${scroller(MORE + T_OLD + T_NOW, { top: true })}<figcaption>loading older — 맨 위에 닿으면 로더 줄. 끼워 넣어도 보던 자리는 그대로</figcaption></figure>
    <figure class="ex">${scroller(T_OLD + T_NOW + T_RUN, { fog: true })}<figcaption>fog — 위쪽만 안개. 선택. 아래는 컴포저가 바로 이어지므로 흐리지 않습니다</figcaption></figure>
  </div>
  <table><tr><th>상황</th><th>스크롤</th><th>알림</th></tr><tr><td>바닥에서 새 답</td><td>따라 내려감(스트리밍은 프레임당 한 번)</td><td>없음</td></tr><tr><td>위로 올린 뒤 새 답</td><td>그대로</td><td>「새 메시지 N」 알약 — 바닥에 닿거나 누르면 사라짐</td></tr><tr><td>맨 위 도달</td><td>위에 끼워 넣고 위치 보정</td><td>로더 줄 · 더 없으면 「대화의 처음」 Marker note</td></tr><tr><td>새 대화</td><td>바닥(비어 있음)</td><td>Empty state</td></tr></table>
  <h3>Layout</h3>
  <table><tr><th>부위</th><th>값</th></tr><tr><td>Column</td><td>최대 720px 가운데 · 좌우 <code>--dim-x6</code> · 위 <code>--dim-x6</code> 아래 <code>--dim-x4</code>(컴포저가 이어짐)</td></tr><tr><td>턴 사이</td><td><code>--dim-x6</code> — 질문이 바뀌는 곳</td></tr><tr><td>턴 안</td><td><code>--dim-x3</code> — 질문 · 실행 카드 · 답 · 후속 칩</td></tr><tr><td>Separator · Marker</td><td>턴 사이 간격 그대로. 진행 표식은 늘 맨 아래</td></tr></table>
  <h2>Guidelines</h2>
  <div class="dd">
    <div class="do"><b>Do</b>바닥에 붙어 있을 때만 따라 내려갑니다. 사용자가 조금이라도 올렸으면 멈추고, 그 사이 온 것은 알약으로 셉니다. 진행 표식(Marker)은 늘 목록 맨 아래에 — 그것도 붙어 내려갑니다.</div>
    <div class="dont"><b>Don&#39;t</b>읽는 중에 새 답이 왔다고 끌어내리지 않습니다. 스트리밍 글자마다 스크롤을 튀기지 않습니다. 이전 대화를 끼우면서 보던 자리를 옮기지 않습니다.</div>
  </div>
  <div class="dd">
    <div class="do"><b>Do</b><div class="demo">${sep('9월 10일')}</div>날짜 구분선은 날짜가 바뀌는 곳에만, 첫 메시지 위에는 두지 않습니다.</div>
    <div class="dont"><b>Don&#39;t</b><div class="demo">${mk('sep', '오후 2:08')}</div>시각마다 구분선을 넣지 않습니다 — 시각은 Message header 의 몫.</div>
  </div>
  <h2>Message scroller vs. Scroll area vs. Collapsible list</h2>
  <table><tr><th></th><th>Message scroller</th><th><a href="#components/scroll-area">Scroll area</a></th><th><a href="#components/collapsible-list">Collapsible list</a></th></tr><tr><td>내용</td><td>대화 — 시간순, 아래가 최신</td><td>아무 내용</td><td>항목 목록</td></tr><tr><td>시작 위치</td><td>바닥</td><td>맨 위</td><td>맨 위</td></tr><tr><td>더 불러오기</td><td>맨 위에서 이전 대화</td><td>없음</td><td>「더 보기」 버튼</td></tr><tr><td>새 내용</td><td>붙어 있으면 따라감, 아니면 알약</td><td>—</td><td>—</td></tr></table>
  <h2>Specification</h2>
  <table><tr><th>부위</th><th>토큰</th></tr>
    <tr><td>Viewport</td><td><code>--bg-layer-default</code> · <code>role="log"</code> · 스크롤바 thin <code>--stroke-neutral-stronger</code> · 포커스 inset 2px <code>--stroke-focus</code></td></tr>
    <tr><td>Stick</td><td><code>flex-direction: column-reverse</code> — 새 항목이 와도 바닥에 남습니다. 사용자가 바닥에서 <code>--dim-x8</code> 이상 올리면 해제</td></tr>
    <tr><td>Jump pill</td><td>32px · <code>--radius-full</code> · <code>--bg-layer-floating</code> + <code>--stroke-neutral-strong</code> · <code>--shadow-2</code> · t1 500 · arrow-down 16 · 바닥에서 <code>--dim-x4</code>, 가운데</td></tr>
    <tr><td>Top loader</td><td>32px · loader-2 16 회전 · t1 <code>--fg-neutral-muted</code> · <code>role="status"</code> — 3초 넘으면 <a href="#components/skeleton">Skeleton</a> 줄</td></tr>
    <tr><td>Fog</td><td>위쪽 <code>--dim-x8</code> mask(transparent → black) — 선택</td></tr>
    <tr><td>Motion</td><td>알약을 누르면 <code>--duration-normal</code> smooth scroll · 로더 1초 회전 — <code>prefers-reduced-motion</code> 이면 즉시·정지</td></tr>
    <tr><td>접근성</td><td>뷰포트 <code>role="log"</code>(새 메시지를 정중하게 읽음) + <code>tabindex="0"</code> — 방향키 · PageUp/Down · Home/End 로 스크롤 · 알약은 <code>&lt;button&gt;</code>, 「새 메시지 2」 그대로 읽힘 · 이전 대화를 끼워도 포커스와 스크롤 위치 유지 · 로더 <code>role="status"</code></td></tr></table>
</section>
`;

export const nav = [['components/message', 'Message'], ['components/marker', 'Marker'], ['components/questionnaire', 'Questionnaire'], ['components/attachment', 'Attachment'], ['components/message-scroller', 'Message scroller']];
export const tint = ['questionnaire', 'attachment', 'message-scroller'];
