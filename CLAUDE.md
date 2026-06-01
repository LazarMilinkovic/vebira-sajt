# CLAUDE.md — Frontend Website Rules

## Language
- The website is in **Serbian (Latin script)**.
- All copy, labels, buttons, navigation, SEO metadata, and alt text must be written in Serbian.
- Use the business info from `business-info/vebira-business-info.md` as the source of truth for all text content — do not invent copy.

## Skills — Always Invoke First

**Always invoke `ui-ux-pro-max` first**, then layer in the relevant secondary skill(s) based on task type.

| Skill | When to invoke |
|---|---|
| `ui-ux-pro-max` | Primary — invoke before any UI/UX work (web, mobile, components, layouts) |
| `frontend-design` | Building web components, pages, or full app UI |
| `ui-styling` | shadcn/ui components, Tailwind theming, dark mode, canvas designs |
| `design-system` | Design tokens, component specs, token architecture |
| `brand` | Brand voice, visual identity, style guides, brand consistency |
| `design` | Logo usage, banner design, icon generation, social media images |
| `banner-design` | Social media banners, ad creatives, website hero banners |
| `slides` | Strategic HTML presentations |

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/milin/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/milin/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
Always check `brand-assets/` before designing. Use real assets — never placeholders where real assets exist.

### Brand Board
- `brand-assets/Vebira Brand Board.png` — master brand reference (colors, typography, visual identity). Read this before choosing any colors or fonts.

### Logos (`brand-assets/Logo/`)
| File | Use case |
|---|---|
| `full-logo.png` / `full-logo-transparent.png` | Primary logo (white bg / transparent bg) |
| `vebira.png` / `vebira-transparent.png` | Wordmark only |
| `salon-vebira.png` / `salon-vebira-transparent.png` | Salon-branded variant |
| `girl-from-logo.png` / `girl-from-logo-transparent.png` | Mascot/icon element |

- Prefer `-transparent.png` variants on colored or image backgrounds.
- Never recreate or approximate the logo in CSS/SVG — always use the provided PNG files.
- If a color palette is defined in the brand board, use those exact values — do not invent brand colors.

## Business Info
- Read `business-info/vebira-business-info.md` before writing any copy or building any page.
- It contains: salon name, address, phone, email, service descriptions, full price list, and notes for site development.
- Use exact service names and prices from this file — do not paraphrase or invent.
- Key differentiators to highlight: cold wax depilation (hygiene, botanical extracts), medical pedicure (health-focused), paraffin facial wrap (premium hydration).

## Resources
- The `resources/` folder is the drop zone for photos, videos, and other media provided for the site.
- Always check `resources/` before using placeholders — if a real image exists for a section, use it.
- Subfolders may be added over time (e.g. `resources/photos/`, `resources/videos/`). Check recursively.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
