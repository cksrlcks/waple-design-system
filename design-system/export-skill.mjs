// 빌드된 index.html 에서 플러그인 스킬 스냅숏을 뽑는다. build.mjs 가 전체 빌드 끝에 부른다(단독 실행: node design-system/export-skill.mjs).
// 결과 — plugins/waple-ds/skills/building-waple-ui/ 의 foundation/ · components/ · icons.json · catalog.md. SKILL.md 는 손으로 쓰는 파일이라 건드리지 않는다.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { PATHS } from './parts/icons.mjs';

const dir = dirname(fileURLToPath(import.meta.url));
const OUT = join(dir, '..', 'plugins', 'waple-ds', 'skills', 'building-waple-ui');
const html = readFileSync(join(dir, 'index.html'), 'utf8');
const warn = [];

// ── 목록: NAV 의 Components · AI 답변 그룹(화면 순서 그대로)
const nav = [];
for (const m of html.matchAll(/^\s*'([^']+)':\[(.*)\],?$/gm)) {
  for (const [, slug, name] of m[2].matchAll(/\['components\/([a-z-]+)','([^']*)'\]/g)) nav.push({ slug, name, group: m[1] });
}
const sections = new Map([...html.matchAll(/<section class="page" id="components\/([a-z-]+)">[\s\S]*?<\/section>/g)].map((m) => [m[1], m[0]]));

// ── CSS: 문서 뼈대 뒤, 버튼부터가 컴포넌트 구현이다. 블록은 「  /* ── 이름 ──」 주석으로 나뉜다
const style = html.slice(html.indexOf('<style>') + 7, html.indexOf('</style>'));
const compAt = style.indexOf('.btn{');
if (compAt < 0) throw new Error('버튼 CSS 를 찾지 못했다');
const skeleton = style.slice(0, compAt);
const chunks = style.slice(style.lastIndexOf('\n', compAt) + 1).split('  /* ── ');
const blocks = [{ name: 'Button', css: chunks[0] }, ...chunks.slice(1).map((c) => ({ name: c.slice(0, c.indexOf(' ──')).trim(), css: '  /* ── ' + c }))];

// 이름이 페이지 이름과 다른 블록 — 그 페이지 안에서 함께 쓰는 조각
const ALIAS = { 'File dropzone': 'attachment', Fieldset: 'field', Form: 'field', Radio: 'radio-group' };
const slugByName = new Map(nav.map((n) => [n.name, n.slug]));
const slugOf = (name) => ALIAS[name] || slugByName.get(name) || name.split(' · ').map((p) => slugByName.get(p)).find(Boolean);

// 최상위 규칙 단위로 자른다(주석·문자열 안의 괄호는 건너뜀) — @media 도 한 덩어리
const rules = (css) => {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css.startsWith('/*', i)) { i = css.indexOf('*/', i + 2) + 1; continue; }
    const ch = css[i];
    if (ch === '"' || ch === "'") { i = css.indexOf(ch, i + 1); continue; }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) { out.push(css.slice(start, i + 1)); start = i + 1; }
  }
  if (css.slice(start).trim()) out.push(css.slice(start));
  return out;
};
const bare = (r) => r.replace(/\/\*[\s\S]*?\*\//g, '');
// 문서에서 열린 상태·데모 틀을 그리는 배치용 — 제품 화면에는 필요 없다
const DOC_ONLY = /^\s*\.(menuwrap|menuctx|srows)\b/;

const cssBySlug = new Map();
const rootOwner = new Map();
let stripped = 0;
for (const b of blocks) {
  const slug = slugOf(b.name);
  if (!slug) { warn.push('페이지를 찾지 못한 CSS 블록: ' + b.name); continue; }
  const kept = rules(b.css).filter((r) => {
    if (DOC_ONLY.test(bare(r))) { stripped++; return false; }
    return true;
  });
  for (const r of kept) {
    for (const sel of bare(r).split('{')[0].split(',')) {
      const m = /^\s*(?:[a-z]+)?\.([a-z][a-z0-9-]*)/.exec(sel);
      if (m) { const root = m[1].split('__')[0]; if (!rootOwner.has(root)) rootOwner.set(root, slug); }
    }
  }
  cssBySlug.set(slug, (cssBySlug.get(slug) || '') + kept.join('').replace(/^\n+/, '') + '\n');
}
if (!rules(chunks[0]).every((r) => /^\s*(\.btn|@keyframes)/.test(bare(r)))) warn.push('Button 블록에 버튼이 아닌 규칙이 섞였다');

// ── 의존: 「함께 싣기」는 Anatomy 예시(그 컴포넌트 자체의 구조) 안의 다른 컴포넌트,
// 「그 모양을 쓸 때만」은 페이지의 나머지 예시(변형 · 지침 · 비교 데모)에만 나오는 컴포넌트
const anatomyOf = (slug) => {
  const s = sections.get(slug) || '';
  const a = s.indexOf('<div class="anatomy">');
  const d = a < 0 ? -1 : s.indexOf('<div class="demo', a);
  if (d < 0) { warn.push('Anatomy 예시 없음: ' + slug); return ''; }
  let depth = 0;
  for (const m of s.slice(d).matchAll(/<div\b|<\/div>/g)) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) return s.slice(d, d + m.index + 6);
  }
  return s.slice(d);
};
const usesIn = (markup, slug) => {
  const used = new Set();
  for (const [, cls] of markup.matchAll(/class="([^"]*)"/g)) {
    for (const t of cls.split(/\s+/)) { const owner = rootOwner.get(t.split('__')[0]); if (owner && owner !== slug) used.add(owner); }
  }
  return [...used];
};
const depsOf = (slug) => {
  const core = usesIn(anatomyOf(slug), slug);
  return { core, optional: usesIn(sections.get(slug) || '', slug).filter((d) => !core.includes(d)) };
};
const text = (s) => s.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const firstSentence = (slug) => {
  const d = /<p class="desc">([\s\S]*?)<\/p>/.exec(sections.get(slug) || '');
  const t = d ? text(d[1]) : '';
  const cut = t.search(/[.。](\s|$)/);
  return cut > 0 ? t.slice(0, cut + 1) : t;
};

// ── 쓰기
rmSync(join(OUT, 'components'), { recursive: true, force: true });
mkdirSync(join(OUT, 'components'), { recursive: true });
mkdirSync(join(OUT, 'foundation'), { recursive: true });

writeFileSync(join(OUT, 'foundation', 'tokens.css'), readFileSync(join(dir, 'tokens.css'), 'utf8'));
const font = /<link rel="stylesheet" href="(https:[^"]+)">/.exec(html);
const icon = /svg\.i\{[^}]*\}\s*svg\.i\.filled\{[^}]*\}/.exec(skeleton);
if (!font || !icon) throw new Error('글꼴 링크나 svg.i 규칙을 찾지 못했다');
writeFileSync(join(OUT, 'foundation', 'base.css'), `/* Waple DS 기반 — tokens.css 다음, 컴포넌트 CSS 보다 먼저 한 번 싣는다. @import 가 첫 줄이어야 하므로 다른 파일에 이어 붙이지 않는다 */
@import url("${font[1]}");
*,*::before,*::after{box-sizing:border-box}
body{margin:0;font-family:var(--font-family);color:var(--fg-neutral);background:var(--bg-layer-default);font-size:var(--font-size-t2);line-height:var(--line-height-t2)}
${icon[0]}
@keyframes spin{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`);

const missingCss = [];
for (const n of nav) {
  if (!sections.has(n.slug)) { warn.push('페이지 없음: ' + n.slug); continue; }
  writeFileSync(join(OUT, 'components', n.slug + '.html'), sections.get(n.slug) + '\n');
  if (cssBySlug.has(n.slug)) writeFileSync(join(OUT, 'components', n.slug + '.css'), `/* ${n.name} — Waple DS 스냅숏. foundation/tokens.css · base.css 다음에 싣는다 */\n` + cssBySlug.get(n.slug));
  else missingCss.push(n.slug);
}
writeFileSync(join(OUT, 'icons.json'), JSON.stringify(PATHS, null, 1) + '\n');

const code = (list) => list.map((d) => '`' + d + '`').join(' ') || '—';
const groups = [...new Set(nav.map((n) => n.group))].sort((a, b) => (a === 'AI 답변') - (b === 'AI 답변'));
const row = (n) => { const d = depsOf(n.slug); return `| ${n.name} | \`${n.slug}\` | ${firstSentence(n.slug).replace(/\|/g, '/')} | ${code(d.core)} | ${code(d.optional)} |`; };
writeFileSync(join(OUT, 'catalog.md'), `# Waple DS 컴포넌트 목록 — 스냅숏(자동 생성, 고치지 않는다)

컴포넌트 ${nav.length}개. \`slug\` 로 \`components/<slug>.html\`(규격 · 예시 마크업) 과 \`components/<slug>.css\`(구현) 를 연다.
- 「함께 싣기」 — 그 컴포넌트의 기본 구조(Anatomy 예시) 안에 들어 있는 다른 컴포넌트. **항상** 그 CSS 도 옮긴다.
- 「그 모양을 쓸 때만」 — 페이지의 다른 예시(변형 · 지침 · 비교)에만 나오는 컴포넌트. 그 예시 모양을 화면에 **실제로 쓸 때만** 옮긴다.
${missingCss.length ? '\nCSS 파일이 없는 컴포넌트(다른 컴포넌트의 조합): ' + code(missingCss) + '\n' : ''}
${groups.map((g) => `## ${g}\n\n| 컴포넌트 | slug | 무엇 | 함께 싣기 | 그 모양을 쓸 때만 |\n|---|---|---|---|---|\n${nav.filter((n) => n.group === g).map(row).join('\n')}\n`).join('\n')}`);

console.log(`skill snapshot: 컴포넌트 ${nav.length} · CSS ${cssBySlug.size} · 문서 전용 규칙 제외 ${stripped} · 아이콘 ${Object.keys(PATHS).length}${warn.length ? '\n경고: ' + warn.join(' / ') : ''}`);
