# Repository Guidelines

## Project Structure & Module Organization
The repo currently holds three top-level artifacts: `story.md` as the narrative source, `image.png` as the primary visual, and `sound.mp3` as the accompanying audio. Keep derivative content alongside its source until growth justifies an `assets/` subdirectory. When adding new media, add a brief README note that records provenance, usage rights, and the editing toolchain.

## Build, Test, and Development Commands
No formal build pipeline exists yet. Run lightweight checks before opening a pull request:
- `npx markdownlint-cli2 story.md` keeps Markdown formatting consistent.
- `pwsh -Command "Get-Item sound.mp3 | Select-Object Name,Length"` confirms audio duration after edits.
- `pwsh -Command "magick identify image.png"` (ImageMagick) reports dimensions and color depth to catch export mistakes.

## Coding Style & Naming Conventions
Write Markdown in plain English with semantic headings and wrap body text near 100 characters. Name new narrative files with descriptive slugs such as `story-new-chapter.md`. Media filenames should be lowercase, dash-delimited, and end with an asset type suffix, for example `background-rain-loop.mp3` or `cover-art-v2.png`. Use consistent UTC timestamps in any new metadata files.

## Testing Guidelines
Treat proofreading as the primary "test": run an editor spell-check and preview `story.md` to validate heading hierarchy. For assets, keep lossy exports under 5 MB and store an uncompressed master outside the repo. After updating audio, listen end-to-end and verify loop points; for visuals, check transparency and scaling on both dark and light backgrounds.

## Commit & Pull Request Guidelines
Now that the repository is versioned, follow Conventional Commits (for example, `feat: expand dialogue in chapter two`). Squash noisy intermediate edits before opening a PR. Each PR should explain the motivation, summarize content changes, attach before-and-after previews for media, and link any planning docs or ticket numbers. Request a second review whenever both narrative and assets change in the same branch.

## Security & Configuration Tips
Do not commit licensed fonts, raw photo shoots, or project files that cannot be redistributed. Keep large binary masters in cloud storage and reference them via private links. When sharing previews, watermark drafts and avoid embedding personally identifiable information in narrative samples.
