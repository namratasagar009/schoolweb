---
name: Academic Horizon
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#50616b'
  on-secondary: '#ffffff'
  secondary-container: '#d3e5f1'
  on-secondary-container: '#566771'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001e2c'
  on-tertiary-container: '#008ebf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e5f1'
  secondary-fixed-dim: '#b7c9d5'
  on-secondary-fixed: '#0c1e26'
  on-secondary-fixed-variant: '#384953'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Nunito Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The brand personality centers on the concept of "Guided Discovery"—balancing the structured discipline of S.S. Memorial Public School with the modern accessibility of a digital learning hub. The target audience spans from young primary students to high-school seniors, requiring a UI that feels safe, encouraging, and academically rigorous without being intimidating.

The design system adopts a **Corporate Modern** style infused with **Minimalist** warmth. It prioritizes clarity and focus, utilizing generous white space to prevent cognitive overload. The aesthetic is "soft-professional," moving away from cold institutional grids toward a more fluid, student-centric interface that promotes long-form focus and intuitive navigation.

## Colors
The palette is rooted in a "Sky and Sea" metaphor to evoke stability and limitless potential. 

- **Primary (Deep Navy):** Used for core branding, primary typography, and high-emphasis interactive states. It provides the "institutional" weight and authority.
- **Secondary (Sky Blue):** Primarily used for decorative backgrounds, subtle highlights, and light-themed containers to keep the UI feeling airy and "student-friendly."
- **Tertiary (Action Blue):** A more vibrant blue reserved for primary calls-to-action, active progress bars, and important links.
- **Neutral (Soft White/Slate):** The canvas of the application uses an off-white tint to reduce eye strain during long study sessions.

## Typography
This design system employs a dual-font strategy. **Nunito Sans** is used for headings to provide a friendly, rounded terminal that appeals to younger students and feels approachable. **Inter** is used for all body copy and UI labels to ensure maximum legibility and a systematic feel for older students and administrative data.

For mobile devices, large headlines scale down to prevent excessive line breaks, while body sizes remain constant at 16px to maintain readability standards for educational content.

## Layout & Spacing
The design system utilizes a **12-column fluid grid** for desktop and a **4-column grid** for mobile. A strict 8px spacing power-of-two scale is used to define all margins and padding, ensuring a consistent rhythm.

- **Desktop:** 48px outer margins with 24px gutters. Content is centered with a max-width of 1280px to maintain line-length readability for educational articles.
- **Tablet:** 32px outer margins with 20px gutters.
- **Mobile:** 16px outer margins with 16px gutters.

Layouts should favor vertical stacking of cards to allow students to focus on one subject or task at a time.

## Elevation & Depth
Depth is expressed through **Tonal Layering** supplemented by soft, ambient shadows. Instead of harsh borders, surfaces are distinguished by slight shifts in background color (e.g., a white card on a light sky-blue background).

Shadows are "Low-Opacity Indigo," using a hint of the primary navy color in the shadow's tint to ensure they look integrated rather than "dirty." 
- **Level 1 (Resting):** No shadow, 1px border in a light neutral.
- **Level 2 (Active/Hover):** 12px blur, 4px Y-offset, 5% opacity primary color.
- **Level 3 (Modals/Overlays):** 24px blur, 8px Y-offset, 10% opacity primary color.

## Shapes
A "Rounded" shape language (Level 2) is chosen to reinforce the friendly, safe nature of an educational environment. 

- **Cards & Containers:** Use `rounded-lg` (1rem) to create a soft, welcoming frame for content.
- **Buttons & Inputs:** Use `rounded` (0.5rem) for a precise but non-aggressive feel.
- **Progress Indicators:** Use `rounded-xl` (1.5rem) or fully rounded pill shapes to make learning metrics feel more like a game than a chore.

## Components
- **Buttons:** Primary buttons use the Action Blue with white text. Secondary buttons use the Sky Blue background with Navy text. All buttons have a minimum height of 48px to be "touch-friendly" for younger learners.
- **Cards:** White backgrounds with `rounded-lg` corners. For "Subject Cards," include a subtle top-border accent in a color corresponding to the subject (e.g., Green for Science, Blue for Math).
- **Input Fields:** Soft white fill with a 1px Slate border. On focus, the border transitions to Action Blue with a subtle 2px outer glow.
- **Chips:** Used for grade levels (e.g., "Class 10"). These should be pill-shaped with light Navy text on a Sky Blue background.
- **Progress Bars:** Thick, 12px height bars with highly rounded ends. Use Action Blue for the fill and Sky Blue for the track.
- **Course Lists:** Use high-contrast dividers (1px Slate-100) and generous 24px vertical padding between items to ensure clarity and easy scanning.