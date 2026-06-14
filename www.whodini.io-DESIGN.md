# Design System Inspired by Whodini

## 1. Visual Theme & Atmosphere

Whodini embodies a modern, sophisticated design language that blends elegance with accessibility. The system prioritizes clarity and user empowerment through a carefully balanced palette of deep, rich purples paired with vibrant magenta accents. The visual atmosphere is professional yet approachable, using ample whitespace and subtle transparency effects to create a sense of openness and control. This design language speaks to Whodini's core mission: simplifying complexity while maintaining visual sophistication. The aesthetic combines minimalist principles with purposeful use of color to guide attention and establish hierarchy.

**Key Characteristics**
- Deep, luxurious purple foundation with vibrant magenta highlights
- Sophisticated opacity and transparency layering for depth without visual clutter
- Clean typography hierarchy with generous spacing
- Rounded, approachable button and component designs
- Soft shadow and elevation techniques for subtle depth
- High contrast between interactive elements and neutral backgrounds
- Professional yet warm and inviting visual personality

## 2. Color Palette & Roles

### Primary
- **Deep Purple** (`#1A001D`): Primary background color for full-page sections and dark theme contexts; establishes the brand's core visual identity
- **Dark Purple Shade** (`#3D1A42`): Secondary dark surface for layered depth and component backgrounds
- **Very Dark** (`#0F000F`): Extreme dark accent for rare high-contrast situations

### Accent Colors
- **Magenta Primary** (`#F62C7D`): Primary call-to-action and interactive highlight; used extensively for buttons and notifications
- **Purple Accent** (`#B216D5`): Secondary vibrant accent for hover states and special emphasis

### Interactive
- **Magenta** (`#F62C7D`): Primary button fills, active states, and prominent CTAs

### Neutral Scale
- **White** (`#FFFFFF`): Primary text, backgrounds, and surface layers
- **Light Purple Background** (`#FAF7FB`): Subtle secondary background for light theme contexts
- **Medium Gray** (`#999999`): Secondary text and disabled states
- **Dark Gray** (`#767676`): Tertiary text and muted information

### Surface & Borders
- **White Surface** (`#FFFFFF`): Card backgrounds, containers, and elevated surfaces
- **Semi-transparent White** (`rgba(255, 255, 255, 0.06)`): Glass-morphism effect for overlay cards and dark-theme containers
- **Border Light** (`rgba(26, 0, 29, 0.06)`): Subtle border on light surfaces
- **Border Transparent** (`rgba(255, 255, 255, 0.12)`): Subtle border on dark/transparent surfaces

## 3. Typography Rules

### Font Family
**Primary:** Poppins (sans-serif) — modern, geometric, and highly legible across all sizes
**Fallback:** `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

**Secondary (Forms):** Arial (sans-serif) — used sparingly for native input elements
**Fallback:** `Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Poppins | 57.6px | 800 | 63.36px | normal | Hero statements, page titles |
| Heading 2 / Section | Poppins | 20px | 700 | 34px | normal | Section headers, major divisions |
| Heading 3 / Subsection | Poppins | 17.6px | 700 | 29.92px | normal | Feature titles, card headers |
| Heading 4 / Card Title | Poppins | 16px | 600 | 27.2px | normal | Component headings |
| Body Text | Poppins | 18.4px | 400 | 33.12px | normal | Main content, descriptions |
| Body Small / Span | Poppins | 16px | 400 | 27.2px | normal | Supporting text, descriptions |
| Button Text | Poppins | 15.2px | 600 | 25.84px | normal | Action labels |
| Label / Form | Poppins | 13.6px | 500 | 23.12px | normal | Form labels, captions |
| Input / Form Field | Arial | 13.3333px | 400 | normal | normal | Text input placeholder and value |

### Principles
- **Generous line height:** All text maintains elevated line height for breathing room and readability
- **Weight contrast:** Bold weights (600–800) reserved for hierarchy; regular weight (400) for body content
- **Size progression:** Logical scaling ensures visual hierarchy is immediately apparent
- **Form legibility:** Arial used for native inputs to maintain OS consistency; Poppins used for labels
- **Accessibility:** All sizes tested for readability at both light and dark backgrounds

## 4. Component Stylings

### Buttons

#### Primary Button (Solid Magenta)
- **Background:** `rgb(246, 44, 125)`
- **Text Color:** `rgb(255, 255, 255)`
- **Font Size:** `14.4px`
- **Font Weight:** `600`
- **Font Family:** Poppins
- **Padding:** `12px 24px`
- **Border Radius:** `50px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Height:** `48px`
- **Line Height:** `24.48px`
- **Hover State:** Increase opacity to `0.9` or shift to `#E91E6F`
- **Active State:** `#D41A63`
- **Disabled State:** Opacity `0.5`, cursor `not-allowed`

#### Secondary Button (White Outlined)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(255, 255, 255)`
- **Font Size:** `15.2px`
- **Font Weight:** `600`
- **Font Family:** Poppins
- **Padding:** `14px 36px`
- **Border Radius:** `50px`
- **Border:** `2px solid rgba(255, 255, 255, 0.6)`
- **Box Shadow:** `none`
- **Height:** `57.8px`
- **Line Height:** `25.84px`
- **Hover State:** Border opacity to `1.0`, background opacity to `0.1`
- **Active State:** Background opacity to `0.15`

#### Tertiary Button (White Solid on Dark)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(255, 255, 255)`
- **Font Size:** `15.2px`
- **Font Weight:** `600`
- **Font Family:** Poppins
- **Padding:** `14px 36px`
- **Border Radius:** `50px`
- **Border:** `0px none`
- **Box Shadow:** `rgba(246, 44, 125, 0.35) 0px 4px 20px 0px`
- **Height:** `57.8px`
- **Hover State:** Box shadow opacity increases to `0.5`
- **Active State:** Scale `0.98`

#### Label Button (Text Only)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(26, 0, 29)`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Hover State:** Text color shifts to `rgb(246, 44, 125)`, text-decoration underline
- **Active State:** Text color to `rgb(182, 22, 213)`

### Cards & Containers

#### Light Card (White Background)
- **Background:** `rgb(255, 255, 255)`
- **Text Color:** `rgb(26, 0, 29)`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `32px 28px`
- **Border Radius:** `16px`
- **Border:** `1px solid rgba(26, 0, 29, 0.06)`
- **Box Shadow:** `none`
- **Line Height:** `27.2px`
- **Hover State:** Border opacity increases to `0.12`, shadow adds `rgba(26, 0, 29, 0.08) 0px 2px 8px 0px`

#### Dark Card (Transparent Overlay)
- **Background:** `rgba(255, 255, 255, 0.1)`
- **Text Color:** `rgb(255, 255, 255)`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `20px 28px`
- **Border Radius:** `14px`
- **Border:** `1px solid rgba(255, 255, 255, 0.12)`
- **Box Shadow:** `none`
- **Line Height:** `27.2px`
- **Backdrop Filter:** `blur(10px)` (optional for modern browsers)
- **Hover State:** Background opacity increases to `0.15`, border opacity to `0.2`

### Inputs & Forms

#### Text Input (Light Theme)
- **Background:** `rgb(255, 255, 255)`
- **Text Color:** `rgb(0, 0, 0)`
- **Font Size:** `13.3333px`
- **Font Weight:** `400`
- **Font Family:** Arial
- **Padding:** `0px` (browser default)
- **Border Radius:** `0px`
- **Border:** `2px inset rgb(118, 118, 118)`
- **Box Shadow:** `none`
- **Height:** `22px`
- **Line Height:** `normal`
- **Focus State:** Outline `2px solid rgb(246, 44, 125)`, box-shadow `0px 0px 0px 3px rgba(246, 44, 125, 0.1)`
- **Disabled State:** Background `rgba(0, 0, 0, 0.05)`, opacity `0.6`

#### Text Input (Dark Theme)
- **Background:** `rgba(255, 255, 255, 0.06)`
- **Text Color:** `rgb(255, 255, 255)`
- **Font Size:** `15.2px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `14px 18px`
- **Border Radius:** `10px`
- **Border:** `1px solid rgba(255, 255, 255, 0.12)`
- **Box Shadow:** `none`
- **Height:** `53px`
- **Line Height:** `normal`
- **Placeholder Color:** `rgba(255, 255, 255, 0.5)`
- **Focus State:** Border `1px solid rgba(246, 44, 125, 0.8)`, box-shadow `0px 0px 0px 3px rgba(246, 44, 125, 0.15)`
- **Disabled State:** Background `rgba(255, 255, 255, 0.03)`, opacity `0.5`

### Navigation

#### Header Navigation
- **Background:** `rgba(255, 255, 255, 0.95)`
- **Text Color:** `rgb(26, 0, 29)`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `12px 0px` (vertical only)
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `rgba(26, 0, 29, 0.08) 0px 2px 30px 0px`
- **Height:** `68px`
- **Line Height:** `27.2px`
- **Link Color:** `rgb(26, 0, 29)`
- **Link Hover:** Color `rgb(246, 44, 125)`, text-decoration `underline`
- **Active Link:** Color `rgb(246, 44, 125)`, font-weight `600`

### Links

#### Standard Link (Dark Text)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(26, 0, 29)`
- **Font Size:** `16px`
- **Font Weight:** `400`
- **Font Family:** Poppins
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Line Height:** `27.2px`
- **Hover State:** Color `rgb(246, 44, 125)`, text-decoration `underline`
- **Active State:** Color `rgb(182, 22, 213)`
- **Visited State:** Color `rgb(177, 53, 185)` (optional)

#### Secondary Link (Dark Purple Text)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(61, 26, 66)`
- **Font Size:** `14.4px`
- **Font Weight:** `500`
- **Font Family:** Poppins
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `0px none`
- **Box Shadow:** `none`
- **Line Height:** `24.48px`
- **Hover State:** Color `rgb(246, 44, 125)`, text-decoration `underline`
- **Active State:** Color `rgb(182, 22, 213)`

## 5. Layout Principles

### Spacing System

**Base Unit:** `8px`

**Scale:**
- **Micro Spacing:** `4px` — gaps between tightly grouped elements
- **Extra Small:** `8px` — margins between small components
- **Small:** `12px` — padding within compact components
- **Base:** `16px` — gaps between related sections
- **Medium:** `20px` — component padding
- **Large:** `24px` — section spacing
- **Extra Large:** `28px` — container padding
- **XXL:** `32px` — major content padding
- **Giant:** `36px` — large section gaps
- **Huge:** `40px` — significant padding zones
- **Massive:** `52px` — section separators
- **Ultra:** `60px` — major section padding

**Usage Context:**
- `4px` — icon-to-text gutters, component micro-adjustments
- `8px` — tight button groups, nested margins
- `12px` — form field padding, small card content
- `16px` — standard gap between grid items, navigation spacing
- `20px` — button-to-text padding, card padding
- `24px` — section dividers, feature spacing
- `28px` — card horizontal padding
- `32px` — card vertical padding, section padding
- `36px` — gap between major sections
- `40px` — content area padding
- `52px` — large section gap
- `60px` — section padding on hero zones

### Grid & Container

- **Max Width:** `1440px` for full-width layouts
- **Column Strategy:** 12-column grid with `16px` gutters
- **Container Padding:** `40px` on desktop, `20px` on tablet, `16px` on mobile
- **Section Patterns:** Full-width alternating sections (dark, light, dark) for visual rhythm
- **Card Grid:** 3-column layout on desktop, 2-column on tablet, 1-column on mobile; gap `24px`

### Whitespace Philosophy

Whitespace is fundamental to Whodini's information hierarchy and breathing room. The design system emphasizes generous margins and padding to avoid cognitive overload. Dark sections (deep purple) contrast with light sections (white) to define content zones naturally. Vertical rhythm is maintained through consistent spacing multiples, creating a cadence that guides the eye through content naturally.

### Border Radius Scale

- **Square (Inputs):** `0px` — native input fields, structured form elements
- **Subtle (Dark Cards):** `14px` — semi-transparent overlay cards
- **Standard (Light Cards):** `16px` — primary white surface cards
- **Pill (Buttons):** `50px` — all button variants for approachable interaction targets
- **Light Input:** `10px` — dark-theme text inputs

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| None (Flat) | No shadow, no elevation | Text links, labels, disabled states |
| Subtle (sm) | `rgba(26, 0, 29, 0.08) 0px 2px 30px 0px` | Navigation header, card hover enhancement |
| Soft (sm-dark) | `rgba(246, 44, 125, 0.35) 0px 4px 20px 0px` | Primary buttons, call-to-action elements, elevated interactive zones |

**Shadow Philosophy:**

Whodini uses shadows sparingly and strategically to create depth without visual noise. The magenta-tinted shadow on primary buttons creates a subtle glow effect that draws attention to interactive elements. Dark, muted shadows on cards and navigation provide depth separation without overwhelming the layout. Shadows are soft and diffused rather than hard-edged, maintaining the sophisticated, accessible aesthetic. Opacity layering and subtle transparency are preferred over aggressive drop shadows.

## 7. Do's and Don'ts

### Do
- **Use magenta (`#F62C7D`) for all primary CTAs** — it's the brand's most recognizable interactive color
- **Maintain generous padding and margins** — whitespace is part of the visual hierarchy
- **Apply the magenta glow shadow** (`rgba(246, 44, 125, 0.35) 0px 4px 20px 0px`) exclusively to primary buttons and highlight states
- **Use Poppins for all interface text** — it's the established typographic voice
- **Stack sections with alternating backgrounds** — create visual rhythm and guide the eye through content
- **Use semi-transparent overlays** (`rgba(255, 255, 255, 0.06)` to `0.1`) for dark-theme cards on hero backgrounds
- **Round button corners to 50px** — creates a distinctive, approachable appearance
- **Ensure text contrast meets WCAG AA standards** — dark text on light backgrounds, light text on dark backgrounds
- **Group related form elements with consistent padding** (`14px 18px`)
- **Test hover and focus states on all interactive elements** — accessibility and feedback are critical

### Don't
- **Mix typefaces** — Poppins and Arial only; no additional font families
- **Use thin shadows or harsh drop shadows** — maintain the soft, sophisticated aesthetic
- **Create buttons smaller than `48px` in height** — maintain touch target accessibility
- **Employ colors outside the established palette** — brand consistency depends on color fidelity
- **Add shadows to cards unless elevated or interactive** — flat design reduces clutter
- **Use bold or italic text for body content** — reserve weight variation for hierarchy only
- **Create input fields with large border radius** — `10px` for dark inputs, `0px` for native inputs maintains clarity
- **Stack multiple secondary buttons in a row** — limit to one primary, one secondary maximum
- **Apply transparency to white text on light backgrounds** — ensure sufficient contrast always
- **Forget padding on card content** — minimum `28px` horizontal, `32px` vertical for white cards
- **Use placeholder text as labels** — always provide explicit labels above inputs
- **Nest more than three levels of hierarchy** — keep information scannable

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | ≤ 480px | Single column, `16px` container padding, `12px` gaps between stacked cards, smaller H1 to `36px`, button width to `100%` |
| Tablet | 481px – 1023px | 2-column card grid, `20px` container padding, `16px` gaps, H1 to `48px`, buttons to `80%` width or inline at reduced size |
| Desktop | ≥ 1024px | 3-column card grid, `40px` container padding, `24px` gaps, full H1 `57.6px`, buttons inline at natural width |
| Large Desktop | ≥ 1440px | Max width constraint at `1440px`, centered layout, comfortable breathing room on sides |

### Touch Targets

- **Minimum Height:** `48px` for all buttons and interactive elements
- **Minimum Width:** `48px` for icon buttons
- **Minimum Padding:** `12px` for touch-friendly spacing around clickable areas
- **Button Padding:** `14px 36px` ensures comfortable tap targets on mobile and desktop
- **Link Padding:** Add `8px` top/bottom implicit padding through line-height; increase explicitly on mobile to `12px` if standalone
- **Form Field Height:** `53px` on dark inputs, `22px` on light inputs (native styling)

### Collapsing Strategy

- **Navigation:** Collapse to hamburger menu at tablet breakpoint; menu items stack vertically with `12px` spacing
- **Hero Text:** Reduce H1 from `57.6px` (desktop) → `48px` (tablet) → `36px` (mobile); adjust line-height proportionally
- **Card Grids:** 3-column (desktop) → 2-column (tablet) → 1-column (mobile); maintain `24px` gap scale
- **Padding:** `40px` (desktop) → `20px` (tablet) → `16px` (mobile) for container sides
- **Button Groups:** Stack vertically on mobile; inline on tablet and above
- **Feature Sections:** Reduce padding from `60px` (desktop) → `40px` (tablet) → `28px` (mobile)
- **Input Fields:** Full width on mobile (`100%`); constrain to `236.5px` or content width on desktop

## 9. Agent Prompt Guide

### Quick Color Reference

**Interactive Elements:**
- Primary CTA: **Magenta** (`#F62C7D`)
- Primary CTA Shadow: `rgba(246, 44, 125, 0.35) 0px 4px 20px 0px`
- Secondary CTA: **White Outlined** on deep purple, text `rgb(255, 255, 255)`

**Text & Content:**
- Primary Text (Light Theme): **Deep Purple** (`#1A001D`)
- Primary Text (Dark Theme): **White** (`#FFFFFF`)
- Secondary Text: **Medium Gray** (`#999999`)
- Tertiary Text: **Dark Gray** (`#767676`)
- Section Heading Accent: **Dark Purple** (`#3D1A42`)

**Backgrounds & Surfaces:**
- Hero/Section Background: **Deep Purple** (`#1A001D`)
- Card Background (Light): **White** (`#FFFFFF`)
- Card Background (Dark Overlay): `rgba(255, 255, 255, 0.1)`
- Subtle Background: **Light Purple** (`#FAF7FB`)
- Input Background (Dark): `rgba(255, 255, 255, 0.06)`
- Input Background (Light): **White** (`#FFFFFF`)

**Borders & Accents:**
- Light Surface Border: `rgba(26, 0, 29, 0.06)`
- Dark Surface Border: `rgba(255, 255, 255, 0.12)`
- Navigation Shadow: `rgba(26, 0, 29, 0.08) 0px 2px 30px 0px`

### Iteration Guide

1. **Always use Poppins font** — all interface text except native form inputs (Arial). H1 = `57.6px 800`, H2 = `20px 700`, body = `18.4px 400`, buttons = `15.2px 600`.

2. **Primary buttons are always magenta with glow shadow** — `rgb(246, 44, 125)`, padding `12px 24px`, radius `50px`, shadow `rgba(246, 44, 125, 0.35) 0px 4px 20px 0px`.

3. **Cards in light sections use white with subtle borders** — `rgb(255, 255, 255)`, padding `32px 28px`, radius `16px`, border `rgba(26, 0, 29, 0.06)`.

4. **Cards in dark sections use semi-transparent white** — `rgba(255, 255, 255, 0.1)`, padding `20px 28px`, radius `14px`, border `rgba(255, 255, 255, 0.12)`.

5. **Spacing follows 8px base unit scale** — use multiples: `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `52px`, `60px`.

6. **All interactive elements minimum 48px height** — buttons, inputs, touch targets must meet accessibility standards.

7. **Text contrast always meets WCAG AA** — dark text on light backgrounds, light text on dark backgrounds; test at `#1A001D` on `#FFFFFF` and vice versa.

8. **Borders are 1px with semantic opacity** — light surfaces use `rgba(26, 0, 29, 0.06)`, dark overlays use `rgba(255, 255, 255, 0.12)`.

9. **Input fields use 10px radius on dark theme, 0px on light theme** — maintain clarity through consistent styling per context.

10. **Section padding: 40px desktop, 20px tablet, 16px mobile** — adjust hero/content zones proportionally to maintain visual hierarchy across all breakpoints.