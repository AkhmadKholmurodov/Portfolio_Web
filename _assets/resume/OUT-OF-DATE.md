# ⚠ `Akhmad_Kholmurodov_Resume.pdf` is out of date

**Not deleted — Akhmad is replacing this file himself.**

The PDF currently in `public/` still carries the claims that were removed from
the site on 2026-08-22, and it is linked from the hero, the contact section and
the nav, so it is the version a recruiter actually downloads.

What is false or stale in it (see `_assets/resume/build-resume.mjs`, which
generates it):

| Line in `build-resume.mjs` | Problem |
|---|---|
| `:43` "Maintain 99.9% uptime and cut page load time by 60%, with zero critical downtime across every sales channel." | The uptime and page-load figures are not real. Removed from the site. |
| `:44` "Launched and manage the storefront across Coupang, Naver SmartStore and Toss" | Toss is a payment method, not a sales channel. There are three channels: lowshop.net, Coupang, Naver SmartStore. |
| `:92` HackerOne triaged report | Removed from the site at Akhmad's request. |
| `:93` "Fortinet Training Institute & ISC2, 2026 (CISSP domain…)" | Inflated framing. It is a training course, not a CISSP credential. Correct: "Fortinet Training Institute, 2026. Wireless LAN security administration." |
| `:93` "Front End Development Libraries — freeCodeCamp, 2023" | The year is inconsistent across his materials. Site now omits it. |
| `:29`, `:31`, `:146` Stripe, Kubernetes | Neither is used in production. Removed from the site toolkit. |

The résumé also does not yet carry the work that is now on the site: the
BullMQ/Redis order pipeline, the overselling incident and its fix, idempotent
payments, the settlement reconciliation job, or the Korean payment rails.

Regenerate with the instructions in `_assets/resume/README.md` once the copy in
that script has been corrected.
