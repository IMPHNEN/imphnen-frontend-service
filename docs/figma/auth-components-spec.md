# Auth Components Specification

Source: Figma channel `tmhr0ys9`, page "Dimentorin By IMPHNEN"
Sections: "Auth Page - Mentors", "Auth Page - Users"
Date: 2026-04-12

## Overview

Auth design is desktop-first with no mobile variants in Figma. Available artifacts include:
- Desktop login card with forgot-password link
- Mentor registration multi-step card

Missing artifacts:
- Dedicated OTP screen
- Full forgot-password step screen
- Mobile auth variants

---

## Frame Inventory

| Frame Name | Size (W x H) | Border Radius | Parent | Notes |
|------------|-------------|---------------|--------|-------|
| AuthBanner | 420 x 632 | 8 | Desktop login layout | Desktop panel with background image + gradients |
| Login Form Card | 596 x variable | 48 | Desktop login page | Right panel; horizontal padding 40 |
| ControlledInputField | 404 x 52 | 4 | Form fields | White bg; border 1px #d1d1d1 |
| Input Label | variable x auto | - | Field | Bai Jamjuree Medium 15 |
| Helper Text | variable x auto | - | Field | Bai Jamjuree Regular 10; below input |
| Login Button | variable x 34 | 4 | Form card | Primary action "Enter Isekai" |
| Forgot Link | variable x auto | - | Form card | Text link "Lupa Password?" |
| RegisterMentorStep | variable x variable | - | Mentor flow | 4-step progress indicator |
| Step Circle | variable x variable | variable | Progress bar | White fill, stroke #23a1eb |
| Step Number | variable x auto | - | Circle | Poppins Bold 16 |
| Step Label | variable x auto | - | Below circle | Bai Jamjuree Medium 10 |

---

## Token Table

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary 500 (Primary Blue) | #23a1eb | Headings, active states, buttons, links |
| Primary 200 (Light Blue) | #bce1fb | Borders, backgrounds, secondary visual elements |
| Primary 50 (Lightest) | #f0f8ff | Page background |
| Primary Gradient 1 | #94ceef | Banner gradient endpoint (transparent blend) |
| Secondary Text | #6d6d6d | Secondary copy, inactive states |
| Tertiary Text | #454545 | Labels, helper text |
| Border Light | #d1d1d1 | Input borders |
| Border Accent | #bce1fb | Card stroke (right panel) |
| Placeholder | #b0b0b0 | Input placeholder text |
| Surface | #ffffff | Card background |
| Surface Alt | #f6f6f6 | Button text (inverse on primary) |

### Typography

| Style | Font | Weight | Size | Line Height | Color | Usage |
|-------|------|--------|------|-------------|-------|-------|
| Heading 1 | Bai Jamjuree | Bold | 46 | auto | #23a1eb | Login page title |
| Heading 2 | Bai Jamjuree | Bold | 29 | auto | #454545 | Register mentor title |
| Subheading | Bai Jamjuree | Medium | 19 | auto | #23a1eb | Login page subtitle |
| Body Large | Bai Jamjuree | Medium | 15 | 19.5 | #454545 | Input label |
| Body Regular | Bai Jamjuree | Regular | 15 | auto | #454545 | Placeholder, button text |
| Body Small | Bai Jamjuree | Medium | 15 | auto | #23a1eb | Subtitle (register) |
| Helper | Bai Jamjuree | Regular | 10 | 12 | #454545 | Helper text, error text |
| Step Label | Bai Jamjuree | Medium | 10 | auto | - | Progress label (variable color) |
| Step Circle | Poppins | Bold | 16 | auto | Depends on state | Progress number |

### Spacing & Sizing

| Component | Property | Value | Notes |
|-----------|----------|-------|-------|
| Login Form Card | Horizontal Padding | 40 | Interior margin |
| Form Card | Gap (vertical) | 24 | Space between form rows |
| AuthBanner | Border Radius | 8 | Rounded corner |
| Input Field | Border Radius | 4 | Compact corner |
| Input Field | Height | 52 | Fixed height |
| Input Field | Width | 404 | Desktop standard |
| Button "Enter Isekai" | Height | 34 | Compact button |
| Button | Border Radius | 4 | Tight corner |
| Banner Logo | Size | 317 x 169.61 | Asset dimensions |
| Step Circle | Radius | variable | Check Figma design specs |
| CTA Button | Border Radius | 4 | Tight corner |

---

## Component Contracts

### AuthBanner

**Purpose**: Desktop-only branded panel (left side of login layout).

**Container**: 420 x 632, border-radius 8, white background.

**Visual Elements**:
- Background image (full container)
- Top linear gradient: primary 500 (#23a1eb) to transparent (#94ceef00)
- Bottom linear gradient: transparent to primary 500 blend
- Logo asset (317 x 169.61) centered or positioned per Figma
- CTA button (white background, radius 4, text #23a1eb, label "Back to Homepage")

**Button Details**:
- Font: Bai Jamjuree SemiBold, 15
- Background: #ffffff
- Text color: #23a1eb
- Border radius: 4

**Responsive**:
- **Desktop only**. Hide on mobile/tablet if no mobile variant exists in Figma.
- No responsive resize; fixed layout.

**Props** (inferred):
- `backgroundImage?: string` - image URL or asset path
- `logoSrc?: string` - logo image URL
- `ctaLabel?: string` - button text (default: "Back to Homepage")
- `onCtaClick?: () => void` - CTA button handler
- `className?: string` - style overrides

---

### ControlledInputField (Organism)

**Purpose**: Composite field combining label, input, helper text, and error state with react-hook-form controller integration.

**Sub-components**:
- Input label (Bai Jamjuree Medium 15, color #454545, line-height 19.5)
- Input (width 404, height 52, border 1px #d1d1d1, radius 4, white bg)
- Placeholder (Bai Jamjuree Regular 15, color #b0b0b0)
- Helper text (Bai Jamjuree Regular 10, color #454545, line-height 12, below input)
- Optional icon slot (16 x 16, inside input container)
- Error state: error text below helper, color subject to validation (assumed red or primary error)

**Variants**:
- Default: label visible, input unfocused, placeholder visible if empty
- Focus: input border highlight (color #23a1eb or similar focus border)
- Disabled: input opacity reduced, interaction blocked
- Error: border color changed, error text shown, optional icon updated
- Loading: spinner icon optional, input disabled

**Props** (inferred):
- `label: string` - field label text
- `name: string` - form field name (react-hook-form)
- `type: 'text' | 'email' | 'password'` - input type
- `placeholder?: string` - placeholder text
- `helperText?: string` - helper/hint text below
- `error?: string` - error message; shows if truthy
- `disabled?: boolean` - disable interaction
- `icon?: React.ReactNode` - optional icon (16x16)
- `control: Control` - react-hook-form control object
- `rules?: FieldValues` - validation rules
- `className?: string` - style overrides

**State Matrix**:

| State | Border Color | Text Color | Background | Icon | Helper Visible | Notes |
|-------|-------------|-----------|-----------|------|----|---------|
| Default | #d1d1d1 | #454545 | #ffffff | -/custom | Yes | Standard input |
| Focus | #23a1eb | #454545 | #ffffff | -/custom | Yes | Border highlight |
| Disabled | #d1d1d1 | #b0b0b0 | #f9f9f9 | -/disabled | Yes | Cursor:not-allowed |
| Error | #ff4444 or variant | #ff4444 | #fff5f5 or variant | [!] | Yes + error text | Error icon if provided |
| Loading | #d1d1d1 | #454545 | #ffffff | [...] | Yes | Spinner, input disabled |

*Note: Focus and Loading colors not explicitly in Figma; inferred from auth design context.*

---

### Input (Atom)

**Purpose**: Base input element without label or controller wrapper.

**Base Styling**:
- Border: 1px #d1d1d1
- Border radius: 4
- Height: 52
- Width: 404 (desktop auth) or responsive
- Background: #ffffff
- Placeholder color: #b0b0b0
- Text color: #454545

**Sizes** (inferred):
- `sm`: height 40
- `md`: height 52 (Figma default)
- `lg`: height 64

**Variants**:
- `default`: standard input
- `error`: red/error border
- `disabled`: grayed out, cursor not-allowed

**Props**:
- `type?: string` - input type
- `placeholder?: string` - placeholder text
- `disabled?: boolean` - disable interaction
- `value?: string` - controlled value
- `onChange?: (e) => void` - change handler
- `size?: 'sm' | 'md' | 'lg'` - input height
- `error?: boolean` - error state
- `className?: string` - style overrides

---

### Button (Atom)

**Purpose**: Primary, secondary, and utility button styling for auth forms.

**Primary Button (Figma "Enter Isekai")**:
- Background: #23a1eb
- Text: #f6f6f6
- Border radius: 4
- Height: 34
- Font: Bai Jamjuree Regular 15 (inferred)
- Hover/Active: darker shade (not in Figma; assume #1a7fb8 or similar)
- Disabled: opacity 0.5, cursor not-allowed

**Secondary Button**:
- Background: transparent or #f0f8ff
- Border: 1px #23a1eb
- Text: #23a1eb
- Border radius: 4
- Same height and font as primary

**Props**:
- `variant?: 'primary' | 'secondary' | 'text'` - button style
- `size?: 'sm' | 'md' | 'lg'` - button dimensions
- `disabled?: boolean` - disable interaction
- `onClick?: () => void` - click handler
- `children: React.ReactNode` - button label or content
- `className?: string` - style overrides

**State Matrix**:

| State | Background | Text Color | Cursor | Opacity |
|-------|-----------|-----------|--------|---------|
| Default (Primary) | #23a1eb | #f6f6f6 | pointer | 1 |
| Hover (Primary) | #1a7fb8 (inferred) | #f6f6f6 | pointer | 1 |
| Focus (Primary) | #23a1eb (+ outline) | #f6f6f6 | pointer | 1 |
| Disabled (Primary) | #23a1eb | #f6f6f6 | not-allowed | 0.5 |

---

### RegisterMentorStep

**Purpose**: Multi-step progress indicator for mentor registration flow (4 steps).

**Layout**:
- Horizontal or vertical progress bar with 4 steps
- Each step: circle, number, label
- Active step highlighted; inactive grayed

**Step Circle**:
- Size (diameter): inferred to be ~40-48px; check Figma for exact spec
- Fill: #ffffff
- Stroke: #23a1eb (all steps)
- Border width: 2 (inferred)

**Step Number** (inside circle):
- Font: Poppins Bold 16
- Color:
  - Active: #23a1eb
  - Inactive: #6d6d6d

**Step Label** (below circle):
- Font: Bai Jamjuree Medium 10
- Color:
  - Active: #23a1eb
  - Inactive: #6d6d6d

**Connection Line** (between steps):
- Stroke: #d1d1d1
- Active connection (to current step): #23a1eb
- Width: 2 (inferred)

**Props**:
- `currentStep: number` - active step index (0-3)
- `steps: string[]` - array of 4 step labels
- `orientation?: 'horizontal' | 'vertical'` - layout direction (default horizontal)
- `className?: string` - style overrides

**State Matrix**:

| Step State | Circle Stroke | Circle Fill | Number Color | Label Color | Line to Next |
|-----------|---|---|---|---|---|
| Before active | #23a1eb | #ffffff | #6d6d6d | #6d6d6d | #d1d1d1 |
| Active | #23a1eb | #ffffff | #23a1eb | #23a1eb | #23a1eb |
| After active | #23a1eb | #ffffff | #6d6d6d | #6d6d6d | #d1d1d1 |

---

### ForgotStep (Scope Note)

**Status**: Lightweight status indicator only.

No dedicated forgot-password step screen exists in Figma. If `ForgotStep` is implemented, it should:
- Render a minimal status/progress indicator (3+ status labels: e.g., "Email Sent", "Verify Code", "Reset Password")
- Use primary 500 (#23a1eb) for active; primary 200 (#bce1fb) or secondary text (#6d6d6d) for inactive
- Not be a full screen; pair with standard form fields on the same page

**Props** (placeholder):
- `currentStep: number` - active status index
- `steps: string[]` - status labels
- `className?: string` - style overrides

**Caveat**: Full forgot-password screen UX is out of scope until a Figma design is available.

---

### OtpForm (Scope Note)

**Status**: Input pattern documented; full screen out of scope.

No dedicated OTP screen exists in Figma. If `OtpForm` is implemented:
- Render 6-digit input boxes (or configurable digit count)
- Auto-focus next box on digit entry
- Backspace navigates to previous box
- Filter non-digit input at the input level
- Use `ControlledInputField` or `Input` atoms with consistent auth styling

**Props** (placeholder):
- `length: number` - number of OTP boxes (default 6)
- `value: string` - OTP value (controlled)
- `onChange: (val: string) => void` - change handler
- `onComplete?: (val: string) => void` - callback when all digits entered
- `disabled?: boolean` - disable interaction
- `className?: string` - style overrides

**Caveat**: OTP logic (validation, resend flow) depends on backend integration; styling aligns with `ControlledInputField` atoms.

---

## Responsive Rules

**Desktop Only**:
- All frames (AuthBanner, Login Form, Register Mentor Step) are designed for desktop (1920px, assumed minimum 768px breakpoint).
- `AuthBanner` must be hidden on screens < 768px breakpoint if no mobile variant is provided in Figma.
- Form cards remain as-is; no responsive shrink/reflow beyond text size adjustments on tablet.
- Button and input sizes remain fixed (height 34 and 52 respectively) unless explicitly overridden in Figma for a responsive variant.

**No Mobile Variants**: The Figma file does not include mobile auth screens. Dimentorin or any auth consumer should:
1. Reuse desktop layout on mobile (not recommended, but scoped to Figma).
2. Provide a separate mobile design (out of scope).
3. Hide desktop auth components and build a mobile-optimized fallback (out of scope).

---

## Assumptions & Gaps

### Captured in Figma
- Desktop login page layout with AuthBanner (left), form card (right)
- Input field styling (border, radius, height, label, helper)
- Primary button styling ("Enter Isekai")
- Forgot-password link on login page
- Mentor registration 4-step progress indicator
- Color tokens (primary 500, primary 200, secondary text, borders)
- Typography (Bai Jamjuree, Poppins; font sizes and weights)

### Missing from Figma (Assumptions Forced)
- **OTP Screen**: Assumed 6-digit input boxes; styling matches `ControlledInputField` atoms.
- **Forgot Password Step Screen**: Assumed lightweight 3-step status indicator; full screen flow out of scope.
- **Mobile Auth Variants**: Assumed desktop-only; no responsive redesign triggered.
- **Button Hover/Focus States**: Desktop "Enter Isekai" button hover not specified; assumed darker shade (#1a7fb8) and focus outline.
- **Input Focus Border Color**: Assumed #23a1eb (primary 500); not explicit in Figma input spec.
- **Input Error Border Color**: Assumed red or variant; exact value not in Figma.
- **Loading State**: Assumed spinner icon or subtle opacity change; not in Figma.
- **Disabled State Styling**: Opacity 0.5 assumed; Figma does not provide explicit disabled visuals.
- **Step Circle Diameter & Line Width**: Inferred as ~40-48px and 2px; exact dimensions check Figma design inspector.
- **Mentor Registration Step Count**: Fixed at 4; labels ("Step 1", "Step 2", ...) not provided in Figma description.

### Out of Scope
- Mobile auth design (no Figma artifact)
- Two-factor authentication beyond OTP pattern
- Social login (SSO) integration UI
- Password strength meter
- CAPTCHA or bot protection UI
- Email verification flow details (beyond OTP)

---

## Validation Checklist

Before implementation, confirm:
- [ ] Bai Jamjuree and Poppins fonts are available and loaded in Dimentorin
- [ ] Primary color tokens (#23a1eb, #bce1fb, #6d6d6d, etc.) are installed in Tailwind or CSS custom properties
- [ ] AuthBanner image and logo assets are accessible (path registered in app)
- [ ] Button and Input atoms support all documented variants and sizes
- [ ] ControlledInputField integrates with react-hook-form `useController` hook
- [ ] RegisterMentorStep progress calculation matches Figma step count (4)
- [ ] Responsive breakpoint for desktop-only layout is confirmed (assumed 768px)
- [ ] No circular dependencies between atoms -> molecules -> organisms
- [ ] Unit tests cover default, disabled, error, and focus states (where applicable)
- [ ] Storybook stories demonstrate all component variants

---

## Implementation Order

1. **Atoms**: Button, Input - ensure sizes and variants match Figma
2. **Molecules**: InputField (label + input + helper)
3. **Organisms**: ControlledInputField, AuthBanner, RegisterMentorStep
4. **Pages**: Login, Register, Forgot, Register Mentor (reuse organisms)
5. **Tests & Stories**: Full coverage for atoms and organisms
6. **Integration**: Verify Dimentorin pages compile and render correctly

---

## Sign-Off

Spec created: 2026-04-12
Source authority: Figma channel `tmhr0ys9`
Next task: Audit current Dimentorin auth pages against this spec (Task 2)
