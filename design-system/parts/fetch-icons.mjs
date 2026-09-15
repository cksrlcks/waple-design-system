// Tabler Icons(MIT) outline 세트에서 쓰는 아이콘만 내려받아 icons.mjs 를 만든다. 실행: node parts/fetch-icons.mjs
// 아이콘을 손으로 그리지 않는다 — 새 아이콘이 필요하면 NAMES 에 Tabler 이름을 더하고 다시 실행한다.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const NAMES = ['plus', 'x', 'check', 'search', 'paperclip', 'dots', 'dots-vertical', 'chevron-right', 'chevron-down', 'chevron-left', 'chevron-up',
  'calendar', 'calendar-event', 'file-text', 'clock', 'home', 'users', 'user', 'chart-bar', 'sparkles', 'pencil', 'alert-circle', 'info-circle',
  'alert-triangle', 'inbox', 'lock', 'refresh', 'layout-sidebar', 'layout-sidebar-left-collapse', 'message', 'receipt', 'user-search', 'briefcase',
  'book', 'settings', 'bell', 'logout', 'trash', 'filter', 'arrow-right', 'circle-check', 'circle-x', 'loader-2', 'copy', 'menu-2', 'send',
  'external-link', 'clipboard-check', 'map-pin', 'mail', 'list', 'plug-connected-x', 'search-off', 'arrow-up', 'arrow-down', 'arrows-sort',
  'plug-connected', 'adjustments-horizontal', 'shield-lock', 'palette', 'language', 'moon', 'sun', 'device-desktop', 'key', 'selector', 'user-circle', 'camera', 'arrow-up-right',
  'archive', 'pin', 'share', 'download', 'upload', 'cloud-upload', 'eye', 'eye-off', 'star', 'link', 'help-circle', 'command', 'corner-down-left',
  'chevrons-left', 'chevrons-right', 'layout-grid', 'layout-list', 'arrow-left', 'bulb', 'minus', 'at', 'currency-won', 'photo', 'thumb-up',
  'thumb-down', 'player-stop', 'player-play', 'player-pause', 'circle-dashed', 'trending-up', 'trending-down', 'tag', 'building', 'grip-vertical',
  'grip-horizontal', 'file', 'history', 'folder', 'phone', 'arrow-back-up', 'edit', 'keyboard', 'bold', 'italic', 'underline', 'car', 'plane',
  'door', 'coffee', 'robot', 'message-circle', 'ban', 'point', 'maximize', 'minimize', 'hourglass', 'list-check', 'caret-down', 'user-plus', 'calendar-plus', 'zoom-in', 'arrow-forward-up', 'message-plus', 'sitemap', 'flask', 'message-2'];
const VER = '3.34.1';
const out = {};
for (const n of NAMES) {
  const r = await fetch(`https://cdn.jsdelivr.net/npm/@tabler/icons@${VER}/icons/outline/${n}.svg`);
  if (!r.ok) throw new Error(`${n}: HTTP ${r.status}`);
  const svg = await r.text();
  const inner = [...svg.matchAll(/<(path|circle|rect|line|polyline|polygon)\b[^>]*\/>/g)].map(m => m[0])
    .filter(t => !/stroke="none"/.test(t))            // 24×24 투명 바운딩 path 제외
    .map(t => t.replace(/\s+/g, ' ').replace(' />', '/>')).join('');
  if (!inner) throw new Error(`${n}: no shapes`);
  out[n] = inner;
  process.stdout.write(n + ' ');
}
// filled 변형: 있는 이름만 `<name>-filled` 로. 14~16px 처럼 아주 작을 때 쓴다
for (const n of NAMES) {
  const r = await fetch(`https://cdn.jsdelivr.net/npm/@tabler/icons@${VER}/icons/filled/${n}.svg`);
  if (!r.ok) continue;
  const svg = await r.text();
  const inner = [...svg.matchAll(/<(path|circle|rect|line|polyline|polygon)\b[^>]*\/>/g)].map(m => m[0])
    .filter(t => !/stroke="none"/.test(t)).map(t => t.replace(/\s+/g, ' ').replace(' />', '/>')).join('');
  if (inner) { out[n + '-filled'] = inner; process.stdout.write(n + '-filled '); }
}
const dir = dirname(fileURLToPath(import.meta.url));
const src = `// Tabler Icons ${VER} (MIT · https://tabler.io/icons) — parts/fetch-icons.mjs 가 생성. 손으로 고치지 않는다.
export const PATHS = ${JSON.stringify(out, null, 0).replace(/","/g, '",\n  "').replace('{"', '{\n  "').replace('"}', '"\n}')};
// icon('plus') → <svg class="i" viewBox="0 0 24 24">…</svg>. 크기·색은 CSS(.i 기본 18px, currentColor, stroke 1.75). '-filled' 는 class filled(fill:currentColor)
export const icon = (name, cls) => {
  if (!PATHS[name]) throw new Error('unknown icon: ' + name);
  const c = 'i' + (name.endsWith('-filled') ? ' filled' : '') + (cls ? ' ' + cls : '');
  return '<svg class="' + c + '" viewBox="0 0 24 24" aria-hidden="true">' + PATHS[name] + '</svg>';
};
`;
writeFileSync(join(dir, 'icons.mjs'), src);
console.log(`\nicons.mjs: ${NAMES.length} icons`);
