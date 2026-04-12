# Project Plan: Align IMPHNEN Dimentorin Auth Components to Figma

## Status
- Total tasks: 21
- Completed: 6
- In Progress: 0
- Blocked: 0

_Last Updated_: Task 6 InputField refactor completed and tested

## Overview

Figma shows a desktop auth layout with:
- `AuthBanner` desktop panel
- controlled input field pattern for login/register
- mentor registration multi-step flow
- login form with a visible forgot-password link

Figma does not show:
- a dedicated OTP screen
- a full forgot-password step screen
- mobile auth variants

This plan fixes `libs/ui` auth components and `apps/dimentorin` auth pages to match available Figma artifacts, with measurable tasks and explicit dependencies.

### Scope

**UI library (`libs/ui`)**
- `src/atoms/button/button.tsx`
- `src/atoms/input/input.tsx`
- `src/molecules/input-field/input-field.tsx`
- `src/organisms/controlled-field/controlled-input-field.tsx`
- `src/organisms/auth-banner/auth-banner.tsx`
- `src/molecules/register-mentor-step/register-mentor-step.tsx`
- `src/molecules/forgot-step/forgot-step.tsx`
- `src/molecules/otp-form/otp-form.tsx`

**Dimentorin auth pages**
- `apps/dimentorin/src/routes/_public/auth/login.tsx`
- `apps/dimentorin/src/routes/_public/auth/forgot.tsx`
- `apps/dimentorin/src/routes/_public/auth/register.tsx`
- `apps/dimentorin/src/routes/_public/auth/register-mentor.tsx`
- `apps/dimentorin/src/routes/_public/auth/register_/otp.tsx`
- `apps/dimentorin/src/routes/_public/auth/forgot_/otp.tsx`

## Task List

### Prerequisite Validation

- [x] **PRE-TASK 0**: Validate Figma design access so that all tasks reference authoritative design artifacts. Acceptance: Confirm the Figma auth file is accessible, contains `AuthBanner`, controlled input field styling, mentor registration multi-step elements, and forgot-password flow details; capture exact color tokens and spacing rules or document the fallback inference. (Independent)

### Discovery

- [x] **Task 1 (COMPLETED)**: Create `docs/figma/auth-components-spec.md` to record the auth component contract from Figma. Acceptance: Document includes frame inventory, color palette, spacing matrix, button variants, input field behavior, desktop banner layout, and mentor step progress rules. (Depends on: PRE-TASK 0)

- [x] **Task 2**: Audit `apps/dimentorin/src/routes/_public/auth/*` auth pages and existing OTP/forgot subroutes to map current implementation to Figma artifacts. Acceptance: Create `/memories/session/auth-audit.md` listing each auth route, used auth components, page flow, and gaps vs Figma. (Depends on: Task 1)

- [x] **Task 3**: Document the auth component dependency graph in `/memories/session/component-dependencies.md`. Acceptance: Graph shows `InputField -> ControlledInputField`, `Button -> AuthBanner`, `OtpForm -> Input`, `RegisterMentorStep` standalone, and `ForgotStep` standalone, with no circular dependency. (Depends on: Task 2)

### Design Token & Atom Verification

- [x] **Task 4**: Inventory auth color tokens in `libs/ui/src/index.css` and capture hardcoded auth colors in UI components. Acceptance: Confirm or add `--color-primary-500: #23a1eb` and `--color-primary-200: #bce1fb`; create `/memories/session/token-usage-audit.md` showing each auth component file and whether it uses hardcoded colors. (Depends on: Task 1)

- [x] **Task 5**: Verify `libs/ui/src/atoms/button/button.tsx` and `libs/ui/src/atoms/input/input.tsx` support Figma auth states and sizes. Acceptance: Button supports `primary`, `secondary`, `danger`, disabled, and focus states; Input supports `sm`, `md`, `lg`, `error`, and `disabled` states; story coverage exists for each. (Depends on: Task 4)

### Auth UI Refactor

- [x] **Task 6 (COMPLETED)**: Refactor `libs/ui/src/molecules/input-field/input-field.tsx` to match Figma input field patterns, including label spacing, helper text, error text, and focus styling. Acceptance: Component renders label and input with Figma-equivalent spacing and focus border; error text appears below the field. (Depends on: Task 5)

- [ ] **Task 7**: Refactor `libs/ui/src/organisms/controlled-field/controlled-input-field.tsx` to wrap `InputField` with react-hook-form controller logic and expose auth page props. Acceptance: Component compiles and supports `label`, `name`, `type`, `placeholder`, `helperText`, `error`, and `disabled`; tests can verify form registration. (Depends on: Task 6)

- [ ] **Task 8**: Refactor `libs/ui/src/organisms/auth-banner/auth-banner.tsx` to match the desktop AuthBanner panel from Figma and hide below desktop breakpoints when no mobile variant exists. Acceptance: AuthBanner renders branded gradient background, CTA button, and image; it is visually desktop-focused and hidden on smaller screens if the spec lacks a mobile version. (Depends on: Task 4)

- [ ] **Task 9**: Refactor `libs/ui/src/molecules/register-mentor-step/register-mentor-step.tsx` to implement the mentor registration multi-step progress design. Acceptance: Component renders 4 steps, highlights the active step, and calculates progress percentage correctly. (Depends on: Task 4)

- [ ] **Task 10**: Refactor `libs/ui/src/molecules/forgot-step/forgot-step.tsx` to implement a lightweight recovery status indicator consistent with Figma scope, not a full forgot-password step screen. Acceptance: Component renders at least 3 step/status labels and uses primary-500/primary-200 styling for active/inactive states. (Depends on: Task 4)

- [ ] **Task 11**: Refactor `libs/ui/src/molecules/otp-form/otp-form.tsx` to align with Figma OTP input patterns while preserving current application flow. Acceptance: OtpForm supports 6 digit boxes, auto-focuses next box, backspace navigates previous, and filters non-digit input. (Depends on: Task 4)

### Dimentorin Page Alignment

- [ ] **Task 12**: Update `apps/dimentorin/src/routes/_public/auth/login.tsx` to use `ControlledInputField`, `Button`, and the Figma login page layout with a visible forgot-password link. Acceptance: Login page uses controlled auth inputs, retains `Forgot?` link, uses primary button styling, and matches Figma spacing and typography within 8px increments. (Depends on: Task 7, Task 8)

- [ ] **Task 13**: Update `apps/dimentorin/src/routes/_public/auth/forgot.tsx` to use auth field patterns and keep OTP fields on the same page if Figma shows no dedicated OTP screen. Acceptance: Forgot page uses controlled auth inputs, displays email/OTP/password controls, and avoids introducing a new OTP-only screen that is not in Figma. (Depends on: Task 7, Task 10, Task 11)

- [ ] **Task 14**: Update `apps/dimentorin/src/routes/_public/auth/register.tsx` to use `ControlledInputField` and align the register page with Figma field patterns and button styling. Acceptance: Register page uses auth input patterns, includes OTP controls only as required, and follows the desktop auth layout without mobile-specific variants. (Depends on: Task 7, Task 11)

- [ ] **Task 15**: Update `apps/dimentorin/src/routes/_public/auth/register-mentor.tsx` to use `RegisterMentorStep` and align the mentor registration multi-step flow with the Figma desktop design. Acceptance: Mentor registration page renders the step progress component and highlights the current progress stage correctly. (Depends on: Task 9)

- [ ] **Task 16**: Audit `apps/dimentorin/src/routes/_public/auth/register_/otp.tsx` and `apps/dimentorin/src/routes/_public/auth/forgot_/otp.tsx` for Figma consistency and preserve existing app route flow only if it does not conflict with the Figma auth flow. Acceptance: Create `/memories/session/otp-screen-audit.md` documenting whether OTP subroutes are retained, simplified, or reclassified as implementation details rather than design artifacts. (Depends on: Task 2, Task 11)

### Validation

- [ ] **Task 17**: Add or update unit tests for auth-specific `libs/ui` components: `AuthBanner`, `ControlledInputField`, `InputField`, `RegisterMentorStep`, `ForgotStep`, and `OtpForm`. Acceptance: Each component has a `.spec.tsx` file covering render and at least one interaction/state case; the suite passes locally. (Depends on: Tasks 6-11)

- [ ] **Task 18**: Add Storybook stories for auth-specific `libs/ui` components demonstrating default, error, disabled, and step states. Acceptance: Each component has a `.stories.tsx` file with at least 3 stories and controls for values or step changes. (Depends on: Task 17)

- [ ] **Task 19**: Run `nx test libs/ui` to validate new auth component tests and ensure no UI regression. Acceptance: Command exits with 0 and all auth tests pass. (Depends on: Task 17)

- [ ] **Task 20**: Run `nx build libs/ui` and `nx build apps/dimentorin` to confirm auth library and pages compile cleanly. Acceptance: Both builds exit with 0 and no TypeScript/build errors. (Depends on: Task 19)

- [ ] **Task 21**: Document final Figma alignment and remaining scope gaps in `/memories/repo/auth-components-alignment.md`. Acceptance: File summarizes aligned pages/components, Figma artifacts used, decisions about no mobile auth variant, and any preserved OTP route behavior. (Depends on: Task 20)

---

## Dependency Graph

- PRE-TASK 0 -> Task 1 -> Task 2 -> Task 3
- Task 1 -> Task 4 -> Task 5 -> Task 6 -> Task 7 -> Tasks 12, 13, 14
- Task 4 -> Tasks 8, 9, 10, 11
- Task 7 -> Tasks 12, 13, 14
- Task 9 -> Task 15
- Task 2 -> Task 16
- Task 11 -> Tasks 13, 16
- Task 17 depends on Tasks 6-11
- Task 18 depends on Task 17
- Task 19 depends on Task 17
- Task 20 depends on Task 19
- Task 21 depends on Task 20

## Parallelizable Groups

1. **Audit and token inventory**: Tasks 2 and 4 can run in parallel after Task 1
2. **Component refactors**: Tasks 8, 9, 10, and 11 can run in parallel after Task 4
3. **Page alignment**: Tasks 12, 13, and 14 can run in parallel after Task 7 and Task 11
4. **Validation chain**: Tasks 17, 18, 19, 20, and 21 compose the final validation sequence

## Assumptions Forcefully Made

- Figma's auth design is desktop-first and mobile auth variants are out of scope.
- No dedicated OTP screen or full forgot-password step screen exists in the Figma auth artifacts, so those routes are audited but not redesigned as new screens.
- `apps/dimentorin/src/routes/_public/auth/*` contains the auth surface in scope.
- Existing `libs/ui` atoms and molecules are refactored toward Figma alignment rather than replaced wholesale.
- Validation gates are `nx test libs/ui`, `nx build libs/ui`, and `nx build apps/dimentorin`.

## Success Criteria

- All auth-specific `libs/ui` components have associated unit tests and Storybook stories.
- All auth colors in `libs/ui` are tokenized or documented with a justified exception.
- `apps/dimentorin` auth pages use the Figma-aligned controlled field pattern and desktop layout without adding unsupported mobile variants.
- `nx test libs/ui` and `nx build apps/dimentorin` complete successfully.
- `/memories/repo/auth-components-alignment.md` documents final alignment status.
