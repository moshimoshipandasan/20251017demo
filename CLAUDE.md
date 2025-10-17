# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a promotional website for the Japanese theatrical film "放課後、君になる時刻" (Afterglow Resonance). The site is a single-page application featuring an immersive, cinematic experience with narrative storytelling, visual design, audio integration, and theatrical release information.

**Language Context**: The site content is entirely in Japanese. All user-facing text, headings, navigation labels, and story content should remain in Japanese unless explicitly requested otherwise.

**Core Assets**:
- `story.md` - Complete narrative source material (Japanese prose)
- `image.png` - Primary key visual (~2.9MB)
- `sound.mp3` - Theme song "Stilling Light" (~3.8MB)

## Architecture

### Structure Pattern
The codebase follows a classic HTML/CSS/JS separation with no build tools or bundlers:

```
index.html          # Single-page structure with semantic sections
styles/main.css     # CSS custom properties + mobile-responsive design
scripts/main.js     # Vanilla JS for interactivity (no frameworks)
```

### Key Design Principles
1. **CSS Custom Properties Pattern**: All colors, fonts, transitions defined in `:root` variables for easy theming
2. **Progressive Enhancement**: Core content accessible without JS, enhanced with audio toggle and scroll animations
3. **Mobile-First Responsive**: Uses `clamp()` for fluid typography and `auto-fit` grid layouts
4. **Intersection Observer**: Sections fade in on scroll using `.is-visible` class
5. **Audio State Management**: Single global audio element controlled by toggle button with visual feedback

### Section Architecture
Each content section follows this pattern:
```html
<section class="section section--[modifier]" id="[anchor]">
  <div class="section__header">
    <h2>SECTION TITLE</h2>
    <p>Subtitle in English</p>
  </div>
  <div class="[section]__content">
    <!-- Section-specific content -->
  </div>
</section>
```

Modifiers: `--grid`, `--visual`, `--split`, `--timeline`, `--tickets`

## JavaScript Patterns

### Audio Control System
- Global `bgAudio` element (looped) with manual play/pause
- Button state tracked with `isAudioPlaying` boolean and `.is-active` class
- Error handling for autoplay restrictions via try-catch
- Automatically resets button state when audio ends

### Mobile Navigation
- Hamburger toggle controls `.is-open` class on `.nav-links`
- ARIA `aria-expanded` attribute updated for accessibility
- Auto-closes menu when navigation link is clicked
- Positioned absolutely with backdrop blur on mobile

### Scroll Animations
- `IntersectionObserver` with 24% threshold adds `.is-visible` class
- Once visible, element is unobserved (one-time animation)
- Transitions handled purely through CSS

## Development Workflow

### Testing Changes
Since there's no build pipeline, test changes by:
1. Opening `index.html` directly in a browser (file:// protocol works)
2. For audio features, use a local server to avoid CORS issues:
   ```
   python -m http.server 8000
   ```
   or
   ```
   npx serve
   ```
3. Test responsive breakpoints at 960px, 720px, and 540px

### Style Guidelines
- **Color Variables**: Always use CSS custom properties (`var(--color-*)`) instead of hardcoded hex values
- **Spacing**: Use `clamp()` for responsive padding/margins
- **Fonts**: Primary is Noto Sans JP (body), Montserrat (headings)
- **Naming**: BEM-style naming (`.block__element--modifier`)

### Asset Management
- **Media Files**: Keep under 5MB; optimize images with tools like ImageMagick or Squoosh
- **Audio Format**: MP3 for broad compatibility; include preload="auto" attribute
- **Images**: Use WebP with PNG fallback for production if optimizing

### Content Updates
- **Narrative Changes**: Edit `story.md` separately from HTML; manually sync excerpts to `index.html` if needed
- **Release Dates**: Update `<time datetime="">` attributes alongside visible text
- **Visual Assets**: Replace `image.png` or `sound.mp3` in place; no path changes needed

## Accessibility Considerations

- Navigation toggle includes `.sr-only` text for screen readers
- Audio controls are keyboard accessible via native `<audio>` element
- Color contrast meets WCAG guidelines (light text on dark background)
- Semantic HTML structure with proper heading hierarchy
- `aria-expanded` attribute on mobile menu toggle

## File Organization Notes

Per existing `AGENTS.md`:
- Media files currently live at project root; if adding more assets, consider creating `assets/` subdirectory
- Keep derivative content alongside source until growth justifies restructuring
- When adding new media, document provenance and license in commit message

## Common Modifications

### Adding New Section
1. Add section to `index.html` following the `.section` pattern
2. Add navigation link to `.nav-links` with matching `href="#anchor"`
3. Style section-specific content in `main.css` using `.section--[modifier]` pattern
4. Section will auto-animate on scroll via existing `IntersectionObserver`

### Updating Color Scheme
1. Modify CSS custom properties in `:root` (lines 1-13 of `main.css`)
2. Primary color: `--color-accent` (#ff6f91 "neon salmon")
3. Background: `--color-bg` (#050913 "deep navy")
4. Test against all sections to ensure contrast

### Changing Audio Behavior
- Loop control: `<audio loop>` attribute in HTML (line 213)
- Autoplay: Not recommended due to browser restrictions; keep manual toggle
- Multiple tracks: Add additional `<audio>` elements; update `scripts/main.js` toggle logic

## Browser Compatibility

- **Target**: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- **CSS Features**: Custom properties, Grid, `clamp()`, Intersection Observer API
- **JS Features**: ES6+ (async/await, arrow functions, template literals)
- **No IE11 support**: Uses modern CSS that requires transpilation for older browsers
