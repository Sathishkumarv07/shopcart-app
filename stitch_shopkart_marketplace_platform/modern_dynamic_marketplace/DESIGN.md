---
name: Modern Dynamic Marketplace
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434654'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2051d9'
  primary: '#0039b1'
  on-primary: '#ffffff'
  primary-container: '#1e50d8'
  on-primary-container: '#cdd5ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#633d00'
  on-tertiary: '#ffffff'
  tertiary-container: '#835200'
  on-tertiary-container: '#ffce95'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#001550'
  on-primary-fixed-variant: '#0039b3'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  price-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '800'
    lineHeight: 28px
    letterSpacing: -0.02em
  price-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.005em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style
The design system targets mobile-first, high-velocity commerce where transactional clarity, visual momentum, and trust reign supreme. Its aesthetic blends modern corporate precision with high-conversion consumer energy. By pairing clean slate canvas layers with concentrated bursts of electric royal blue and high-impact semantic accents (emerald, amber, orange), the interface achieves an uncluttered, premium, and urgency-driven retail experience. 

The emotional signature is dependable, lightning-fast, and reassuringly structured. Subtle depth, tactile cards, and crisp micro-surfaces create distinct visual boundaries without heavy visual weight, keeping the product photography front and center while streamlining path-to-purchase decision making.

## Colors
The color architecture reinforces trust and transactional guidance across dense catalog environments:
- **Primary (`#1E50D8`)**: Electric royal blue commands primary navigation, verified storefront marks, active state selections, and critical action buttons ("Buy Now", checkout progression).
- **Secondary (`#10B981`)**: Saturated emerald green is strictly dedicated to positive retail signals: percentage discounts, savings badges, coupon confirmations, and in-stock inventory indicators.
- **Tertiary (`#F59E0B`)**: Radiant amber-gold drives social proof, star rating metrics, limited-stock countdowns, and urgency flash tags.
- **Neutral (`#0F172A`)**: Deep slate navy serves as the primary text and high-contrast baseline, supported by `#334155` for secondary meta-data and `#64748B` for subdued hints.
- **Surfaces & Canvases**: True white (`#FFFFFF`) for elevated cards, over a crisp cool slate base canvas (`#F8FAFC` to `#F1F5F9`), bounded by delicate structural dividers (`#E2E8F0`).

## Typography
Built around `Inter` for exceptional vertical metrics and tabular numeric rendering critical to pricing, ratings, and countdown clocks:
- **Price Tiers**: Prices utilize dense negative tracking (`-0.01em` to `-0.02em`) and bold-to-extra-bold weights to guarantee instant visual hierarchy against adjacent product titles and descriptions.
- **Headlines**: Tight line-heights minimize banner and card title footprints on mobile displays, ensuring maximum screen real estate is preserved for merchandise and metadata.
- **Labels & Micro-Tags**: Badges, SKU details, shipping indicators, and discount tags leverage uppercase or high-weight medium typography (`fontWeight: 600-700`) with modest positive tracking for effortless scanning at rapid scroll speeds.

## Layout & Spacing
A fluid 12-column grid governs desktop and wide tablet interfaces, consolidating to 4 columns on mobile screens. 

- **Breakpoints**: 
  - Mobile: `< 640px` (2-column product grid with `0.75rem` gutter, `1rem` outer screen margin).
  - Tablet: `640px - 1024px` (3-column or 4-column product grid with `1rem` gutter).
  - Desktop: `> 1024px` (4-column to 5-column product catalog, fixed max container width of `1280px` centered with variable margins).
- **Commerce Layout Model**: Product listings adhere to strict vertical rhythmic stacks: imagery (1:1 aspect ratio), badge overlay slot, title block, rating bar, price/discount cluster, and primary CTA. Sticky bottom action sheets lock on mobile for instant "Add to Cart" and "Checkout" actions without viewport occlusion.

## Elevation & Depth
This design system avoids heavy shadows, instead using crisp layered slate boundaries with ultra-fine, ambient blue-slate tinted shadows:
- **Level 0 (Flat)**: Background screen surfaces (`#F8FAFC`).
- **Level 1 (Resting Cards & Filter Pills)**: Pure white (`#FFFFFF`) with a 1px border (`#E2E8F0`) and subtle ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hover State / Active Selectors)**: Scaled card lift with soft spread: `0 10px 15px -3px rgba(30, 80, 216, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`, border shifting to `#CBD5E1`.
- **Level 3 (Sticky Navbars & Filter Drawers)**: Pure white with bottom wash: `0 4px 20px -2px rgba(15, 23, 42, 0.08)`.
- **Level 4 (Modals, Quick-View Overlays, Cart Toasts)**: High-altitude projection: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes
The shape system strikes a balance between friendly modern ergonomics and high-density catalog structure (`roundedness: 2`):
- **Cards & Modal Sheets**: 8px (`0.5rem`) default radius, scaling to 16px (`1rem` / `rounded-lg`) for prominent banner displays, checkout summaries, and bottom sheets.
- **Form Controls & Inputs**: 8px (`0.5rem`) for search fields, quantity steppers, and delivery address inputs.
- **Pills & Tags**: Fully rounded (`9999px`) pill format for discount flags (`-35% OFF`), star ratings, in-stock indicators, category chips, and floating status bubbles.

## Components

### Buttons
- **Primary CTA ("Buy Now", "Checkout")**: Electric blue background (`#1E50D8`), crisp white text, 8px corner radius, bold font. Hover shifts to `#1740B0` with `0 4px 12px rgba(30, 80, 216, 0.25)`.
- **Secondary CTA ("Add to Cart")**: Subtle tinted background (`rgba(30, 80, 216, 0.08)`), deep electric blue text (`#1E50D8`), 1px semi-transparent primary border.
- **Tertiary & Icon Buttons**: Slate background (`#F1F5F9`), slate text (`#334155`), transparent border, scaling up to pure white on hover.

### Product Cards
- Contained in pure white surface with `0.5rem` radius and 1px border (`#E2E8F0`).
- Image container holds fixed 1:1 aspect ratio with subtle zoom on cursor hover.
- Top-right corner houses absolute floating wishlist button (32px circular pill, blur backdrop).
- Top-left corner houses stacked promotional pill badges.

### Badges & Micro-Pills
- **Discount Badges**: Fully rounded pills with `#10B981` background or emerald light tint (`rgba(16, 185, 129, 0.12)`) featuring bold emerald text (`#047857`).
- **Rating Badges**: Amber filled pill (`#F59E0B`) with white text and star icon, or subtle tint (`#FEF3C7`) with amber text (`#B45309`).
- **Deal / Flash Sale**: High-visibility orange (`#EA580C`) background with white bold typography.

### Input Fields & Search
- Full-width search bar with inset search icon, clear button, and placeholder in `#94A3B8`.
- Resting border `#CBD5E1` on pure white background. Active focus transitions to a 2px outer glow ring: `0 0 0 3px rgba(30, 80, 216, 0.18)` and border `#1E50D8`.

### Checkboxes & Selection Controls
- Checkboxes and radios use standard 18px dimensions with `#1E50D8` fill when active, featuring a sharp white checkmark. Inactive state features `#E2E8F0` border and `#F8FAFC` background.

### Cart Sticky Action Strip (Mobile-Specific)
- Fixed bottom viewport shelf, 1px top border (`#E2E8F0`), Level 3 shadow, splitting width into subtotal price summary on the left and quick-purchase CTA on the right.