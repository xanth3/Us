# eLVes Louis Vuitton Design System

## Context and Goals

eLVes Louis Vuitton design guidance must produce consistent, accessible, token-driven e-commerce storefront interfaces for online shoppers. The system should favor fast implementation, clear component behavior, and reusable semantic tokens over one-off visual decisions.

## Design Tokens and Foundations

Use semantic tokens in implementation guidance and component code. Raw color values should live only in the token layer.

### Typography

| Token | Value |
| --- | --- |
| `font.family.primary` | `Louis Vuitton Web` |
| `font.family.stack` | `Louis Vuitton Web, Louis Vuitton Web Fallback, Helvetica Neue, Helvetica, Arial, sans-serif` |
| `font.size.xs` | `14px` |
| `font.size.sm` | `16px` |
| `font.size.md` | `20px` |
| `font.size.base` | `16px` |
| `font.weight.base` | `400` |
| `font.lineHeight.base` | `24px` |

### Color

| Token | Value | Usage |
| --- | --- | --- |
| `color.text.primary` | `#1a1a1a` | Primary text and icons |
| `color.text.tertiary` | `#727272` | Secondary metadata and helper text |
| `color.surface.base` | `#000000` | Primary action surfaces |
| `color.surface.raised` | `#f8f8f8` | Product tiles and raised panels |
| `color.surface.muted` | `#ffffff` | Page and drawer surfaces |

### Spacing

| Token | Value |
| --- | --- |
| `space.1` | `2px` |
| `space.2` | `4px` |
| `space.3` | `8px` |
| `space.4` | `12px` |
| `space.5` | `13px` |
| `space.6` | `14px` |
| `space.7` | `16px` |
| `space.8` | `24px` |

### Radius, Shadow, and Motion

| Token | Value |
| --- | --- |
| `radius.xs` | `4px` |
| `radius.sm` | `8px` |
| `radius.md` | `40px` |
| `radius.lg` | `50px` |
| `shadow.1` | `rgb(0, 0, 0) 0px 2px 0px -1px` |
| `shadow.2` | `rgb(26, 26, 26) 0px 2px 0px -1px` |
| `shadow.3` | `rgba(0, 0, 0, 0.04) 0px 24px 24px -4px` |
| `motion.duration.instant` | `150ms` |
| `motion.duration.fast` | `300ms` |

## Component-Level Rules

Every interactive component must define default, hover, focus-visible, active, disabled, loading, and error behavior. Components should support keyboard, pointer, and touch input without relying on hover-only affordances.

### Links

Links must use descriptive labels that make sense out of context. Link focus-visible states must render a visible outline or underline with sufficient contrast. Long link labels should wrap instead of overflowing their container.

### Buttons

Buttons must use a minimum 44px touch target. Primary buttons should use `color.surface.base` with inverse text. Disabled and loading buttons must remain readable and must not trigger actions. Icon-only buttons must include an accessible label.

### Cards

Product cards must keep stable image aspect ratios to avoid layout shift. Missing image states must use a tokenized raised surface and preserve card dimensions. Product names and prices should wrap cleanly and must not overlap actions such as wishlist controls.

Product cards and product imagery should support a mouse drag/grab interaction on desktop pointer devices. On mouse down, the card or image should visually lift, follow the cursor with restrained movement, and settle back on release. Vertical dragging should support page scroll feel by moving the page in the expected direction. A click without meaningful movement must still activate the link normally. A drag release must not accidentally navigate. Keyboard and touch users must retain native link and scroll behavior.

### Lists and Accordions

Lists must maintain predictable row height and clear separators. Accordions must expose expanded state with `aria-expanded`, support button activation from keyboard and pointer input, and keep content readable when long copy wraps.

### Navigation

Navigation must expose clear labels and maintain visible focus states across drawer, header, and bottom navigation. Mobile navigation should preserve 44px minimum touch targets and avoid hover-only behavior.

Known page component density should guide prioritization: links (340), buttons (223), cards (127), lists (108), navigation (4).

## Accessibility Requirements and Testable Acceptance Criteria

- Text and interactive states must meet WCAG 2.2 AA contrast requirements.
- Keyboard users must be able to reach and operate every interactive control.
- Focus-visible indicators must be visible against the current background.
- Icon-only controls must have accessible names.
- Touch targets must be at least 44px by 44px.
- Disabled controls must be programmatically disabled when possible and visually distinct.
- Loading controls must announce or expose a loading state when action timing is user-visible.

## Content and Tone Standards

Use concise, confident, implementation-focused language.

Preferred examples:

- "Place in Cart"
- "Proceed to Checkout"
- "Continue Shopping"

Avoid ambiguous actions:

- "Go"
- "Submit"
- "Click here"

## Anti-Patterns and Prohibited Implementations

- Do not use low-contrast text.
- Do not hide focus indicators.
- Do not introduce one-off spacing, typography, or color values in component code.
- Do not ship component guidance without explicit state rules.
- Do not use hover-only interactions for required actions.
- Do not allow long labels or dynamic content to resize fixed controls unexpectedly.

## QA Checklist

- Confirm semantic tokens are used instead of raw hex values outside the token layer.
- Confirm links, buttons, cards, lists, accordions, and navigation expose all required states.
- Confirm keyboard, pointer, and touch behavior works for each interactive component.
- Confirm focus-visible styles are present and visible.
- Confirm text, icons, and disabled states meet WCAG 2.2 AA contrast.
- Confirm long content wraps cleanly without overlap.
- Confirm empty and missing-content states preserve layout.
- Run `npx tsc --noEmit`, `npm run lint`, and `npm run build`.
