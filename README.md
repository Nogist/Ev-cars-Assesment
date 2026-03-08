# Vehicle Onboarding — Multistep Form

A 4-step onboarding form built with React, TypeScript, Ant Design, and Tailwind CSS.

## Setup & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Libraries Used

- **Ant Design** — Form management with built-in validation rules, Steps component for progress UI, and accessible form elements out of the box. Eliminates the need for separate form/validation libraries (no Formik, no Yup).
- **TanStack Query** — `useMutation` hook for the submit action provides `isPending` and `isSuccess` states with zero boilerplate, cleanly separating async logic from UI.
- **Tailwind CSS** — Utility-first layout and spacing alongside Ant Design's component styling, keeping custom CSS near zero.
- **react-phone-number-input** — International phone input with country flags and built-in E.164 validation via `isValidPhoneNumber`.
- **i18n-iso-countries** — Localized country list for the country dropdown, avoids maintaining a static list.
- **React Router** — Route-based steps (`/onboarding/1` through `/onboarding/4`) with clean navigation hooks.

## Architecture

```
src/
  types/          # TypeScript interfaces (form, submission, common)
  data/           # Static option data for all select/radio fields
  utils/          # Reusable validators, localStorage helpers
  hooks/          # useFormDraft, useStepNavigation, useSubmitOnboarding
  components/     # Reusable UI (layout, review fields, nav buttons)
  steps/          # One component per step
  api/            # Simulated API endpoint
```

**State management**: localStorage serves as the single source of truth between steps. No Context or external state library needed — Ant Design Form handles per-step field state, and `useFormDraft` syncs with localStorage via debounced auto-save.

## Estimated Time Spent

~3 hours

## Known Trade-offs

- Country dropdown uses official country names from `i18n-iso-countries`, which can be verbose (e.g., "United States of America" instead of "United States"). This is a data source trade-off for accuracy.
- The simulated API call uses a fixed 2-second delay — a real implementation would include error handling and retry logic.
- localStorage has a ~5MB limit; sufficient for form drafts but not suitable for large file uploads.
