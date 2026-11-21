# The Workbench

An independent, evidence-led editorial showcase about Claude Code and its documented capabilities, with a transparent comparison to OpenAI Codex.

**Ownership:** AELTRIX TEAM  
**Created, designed, and developed by:** Mr.R3B  
**Affiliation:** Independent project; not affiliated with Anthropic or OpenAI.

## Run locally

This is a static site with no build step or runtime dependencies. From the project root:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish on GitHub Pages

1. Push the repository to GitHub.
2. In **Settings → Pages**, choose **Deploy from a branch**.
3. Select the branch and `/ (root)` folder, then save.
4. GitHub Pages serves `index.html` directly; the `.nojekyll` marker prevents Jekyll processing.

No private backend, build action, or client-side package installation is required. A custom domain can be configured in GitHub Pages settings when available.

## Project structure

- `index.html` — semantic page content and all source/evidence links
- `styles.css` — responsive visual system and reduced-motion behavior
- `app.js` — small vanilla-JS interactions (workflow, tabs, mobile nav, progressive reveals)
- `assets/mark.svg` — original vector identity mark
- `404.html` — static-host not-found page

## Evidence policy

- Product capabilities are attributed to linked first-party documentation.
- The on-page workflow is authored illustration, not a recorded session or benchmark.
- No head-to-head coding performance result is claimed. The performance panel explains the evidence gap and gives a proposed protocol; it is not a completed experiment.
- Publisher-reported outcomes are attributed and not presented as independent findings.
- Source dates distinguish a publisher's publication date from the date checked. Living documentation should be rechecked before any public update.

## Maintainer checklist

When changing a comparison claim, update the row and source ledger together. For any future controlled evaluation, publish repository snapshots, exact tasks and prompts, tool/model versions, configuration, budget, commands, raw outcomes, evaluator criteria, dates, and limitations before writing conclusions.
