# Waple Design System

UXIS 제품(Waple 에이전트 · 관리자 콘솔 …)이 함께 쓰는 디자인 시스템과, 그것을 어느 프로젝트에서나 쓰게 하는 Claude Code 플러그인입니다.

| 경로 | 무엇 |
|---|---|
| `design-system/` | 문서 사이트 원본. `node design-system/build.mjs` 가 `index.html` 과 플러그인 스냅숏을 함께 만듭니다 |
| `plugins/waple-ds/` | 플러그인 — 스킬 `building-waple-ui` 와 스냅숏(토큰 · 컴포넌트 규격·CSS · 아이콘) |
| `home.html` · `design-system-plan.md` · `design-system-gap.md` | 출발점 화면 · 계획서 · 빠진 컴포넌트 기록 |

## 설치 (팀원)

비공개 레포라 GitHub 인증(`gh auth login` 또는 SSH 키)이 먼저 필요합니다.

```
/plugin marketplace add uxis-co-kr/waple-design-system
/plugin install waple-ds@uxis-design
```

설치 뒤 React · HTML 프로젝트에서 「디자인 시스템으로 ○○ 만들어줘」처럼 요청하면 스킬이 쓰입니다. 직접 부르려면 `/waple-ds:building-waple-ui`.

프로젝트 레포를 연 팀원에게 설치를 권하려면 그 레포의 `.claude/settings.json` 에 적어 둡니다.

```json
{
  "extraKnownMarketplaces": {
    "uxis-design": { "source": { "source": "github", "repo": "uxis-co-kr/waple-design-system" } }
  },
  "enabledPlugins": { "waple-ds@uxis-design": true }
}
```

## 디자인 시스템을 고쳤을 때

1. `design-system/parts/` 를 고치고 `node design-system/build.mjs` — 문서와 스냅숏이 같이 바뀝니다. 스냅숏(`plugins/waple-ds/skills/building-waple-ui/` 의 `components/` · `foundation/` · `icons.json` · `catalog.md`)은 손으로 고치지 않습니다. `SKILL.md` 만 손으로 씁니다.
2. `plugins/waple-ds/.claude-plugin/plugin.json` 의 `version` 을 올립니다.
3. `claude plugin validate .` 와 `claude plugin validate plugins/waple-ds` 로 확인하고 커밋 · 푸시합니다.
4. 팀원은 `/plugin marketplace update uxis-design` 뒤 `/plugin update waple-ds@uxis-design`.
