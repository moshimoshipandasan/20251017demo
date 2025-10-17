# Repository Guidelines

## Project Structure & Module Organization
The repo currently holds three top-level artifacts: `story.md` as the narrative source, `image.png` as the primary visual, and `sound.mp3` as the accompanying audio. Keep derivative content alongside its source until growth justifies an `assets/` subdirectory; when adding new media, pair it with a short README note describing provenance and license.

## Build, Test, and Development Commands
No formal build pipeline exists yet. Prefer lightweight checks before opening a pull request:
- `npx markdownlint-cli2 story.md` keeps Markdown formatting consistent.
- `pwsh -Command "Get-Item sound.mp3 | Select-Object Name,Length"` verifies audio metadata after edits.
- `pwsh -Command "magick identify image.png"` (ImageMagick) quickly confirms image dimensions and color depth.

## Coding Style & Naming Conventions
Write Markdown in plain English, wrap prose near 100 characters, and rely on semantic headings. Name new narrative files with descriptive slugs like `story-new-chapter.md`. Media filenames should be lowercase, dash-delimited, and end with an asset type suffix, for example `background-rain-loop.mp3` or `cover-art-v2.png`.

## Testing Guidelines
Treat proofreading as the primary “test”: run a spell-check pass in your editor and preview `story.md` to confirm heading hierarchy. For assets, ensure lossy exports stay under 5 MB and retain an editable original in a safe location. When updating audio, listen end-to-end and confirm loop points; for visuals, verify transparency and scaling on both dark and light backgrounds.

## Commit & Pull Request Guidelines
There is no existing Git history, so adopt a Conventional Commits style from the start—e.g., `feat: expand dialogue in chapter two`. Squash noisy intermediate edits before opening a PR. Each PR should describe the motivation, summarize content changes, attach before/after previews for media, and link any relevant planning documents. Request a second review whenever both narrative and assets change together.
