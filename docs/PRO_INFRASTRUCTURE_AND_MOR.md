# RenderJoy Phase 7 — Pro Infrastructure & Merchant-of-Record Architecture

## 1. Merchant-of-Record (MoR) Research — India Onboarding & Payouts

For selling `@renderjoy-pro` licences globally from India without managing multi-jurisdiction VAT/GST registration manually:

| Provider | Role | India Onboarding | Payouts | Tax / GST Handling | Notes |
|---|---|---|---|---|---|
| **Paddle** | Full MoR | Supported (Indian entity / sole prop with PAN + IEC/LUT) | Wire / Wise / Payoneer in USD/INR | Handles global SaaS VAT/GST | Strong subscription & licence webhook model |
| **Lemon Squeezy** | Full MoR | Supported (Stripe-backed MoR; verify current India payout corridors) | Bank transfer / PayPal | Handles global sales tax | Built-in licence key generation API |
| **Dodo Payments** | Full MoR | India-first MoR onboarding | Direct INR bank settlement | Handles global VAT/GST | Purpose-built for Indian indie SaaS & dev tools |

**Recommended Launch Flow:**
1. Checkout via MoR (Dodo Payments or Paddle) triggers a signed webhook to RenderJoy.
2. Webhook generates a raw token (`rj_pro_<32 chars>`), displays it once to the buyer, and stores only `hashLicenseToken(token)` (SHA-256) in `RENDERJOY_PRO_TOKEN_HASHES` / account store.
3. Buyer configures `components.json` with `@renderjoy-pro` pointing to `/api/pro/registry/{name}` and `Authorization: Bearer ${RENDERJOY_PRO_TOKEN}`.

## 2. Authenticated Registry Gate

- Route: `app/api/pro/registry/[slug]/route.ts`
- Verifier: `lib/pro/license.ts` (`verifyLicenseToken` using SHA-256 + `crypto.timingSafeEqual`)
- Management UI: `/pricing` (`app/pricing/page.tsx` + `components/pro/license-manager.tsx`)
