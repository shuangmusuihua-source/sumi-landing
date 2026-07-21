# Sumi landing page working agreement

## Repository boundary

- This repository is the independent static landing page for Sumi.
- The Sumi macOS application source lives in `/Users/zuohui/Desktop/vision agent`.
- Do not edit, move, delete, or generate files inside `vision agent` unless the user explicitly asks for application-code changes.
- Keep landing-page assets and application source independent. Do not copy real user data from the application project into this site.

## Product model

Sumi is a macOS AI workbench for knowledge work. The primary product journey is:

`事务工作区 → 任务会话 → 人机协作 → Markdown 工作文档 → AI 精修 → Skill 交付物 → 知识沉淀`

The landing page should explain how a real task moves from an initial idea to a finished deliverable. Ask sumi is a general question and tool entry point, but it should not displace this main story.

Markdown is a user-owned working document, not disposable model output. It can be previewed and edited directly. Users can select a passage, give an AI editing direction, compare before and after, and accept or cancel the change. Once the Markdown is stable, Skills can create Slides, DOCX, XLSX, PDF, HTML, and other deliverables from the same conclusions. High-quality Markdown can then be synchronized to the knowledge base for later work.

## Demo data and claims

- All workspaces, sessions, documents, research inputs, business cases, and generated artifacts shown on the site must be fictional.
- Never use the user's real workspace names, task names, documents, screenshots containing real data, or other private work content.
- Existing `actual-*.png` assets use the real Sumi interface with fictional demonstration data and should be preserved unless replacement is explicitly requested.
- Do not invent release facts. Before publishing, verify the supported macOS versions, chip architectures, model-account or API-key requirements, release version, download URL, signing/notarization status, and installation steps against the application project or an authoritative release source.

## Design constraints

- Preserve the editorial/workbench direction: warm paper, black ink, and Sumi orange.
- Avoid generic SaaS layouts, purple AI gradients, excessive cards, decorative feature bloat, and unnecessary animation.
- Keep copy concise. Prefer showing one continuous work process over listing unrelated product pillars.
- Desktop Hero: product proposition on the left and the real-operation video on the right. Narrow layouts may stack copy above video when needed for legibility.
- Below the Hero, use the six-step path and concrete feature breakdowns. Do not repeat the full video.
- Respect `prefers-reduced-motion` and maintain visible keyboard focus, readable contrast, working skip navigation, and no horizontal overflow.

## Engineering rules

- Stack: React 19, TypeScript, Vite, static output.
- Understand the current implementation before editing. Make targeted fixes rather than broad rewrites.
- Do not delete or overwrite existing page sections or media without explicit approval.
- Preserve static deployment compatibility; avoid server-only dependencies unless the deployment plan changes.
- Keep dependencies minimal. Prefer semantic HTML and CSS for simple behavior.
- Verify responsive layout at 1440px, 1024px, 768px, and 390px after meaningful UI changes.
- Verify the Hero video poster, play, pause, native controls, `playsInline`, and mobile layout after video-related changes.
- Verify navigation anchors, mobile-menu keyboard behavior, focus visibility, text contrast, and horizontal overflow after layout or navigation changes.
- Run `npm run typecheck` and `npm run build` before handing off changes.
- Do not commit, push, create a remote repository, or configure deployment until the user confirms the prepared file set.

## Pre-launch checklist

- Replace provisional release/version/platform claims with verified facts.
- Connect every download button to the exact release artifact or stable release page.
- Finalize the unsigned-app recovery instructions without recommending that users disable Gatekeeper globally.
- Decide whether to self-host web fonts or use a reliable local/system fallback for Chinese-network conditions.
- Set the real canonical URL, sitemap, robots policy, and absolute Open Graph image URL.
- Configure static-asset caching and automated GitHub Pages deployment only after the repository and domain plan are confirmed.
