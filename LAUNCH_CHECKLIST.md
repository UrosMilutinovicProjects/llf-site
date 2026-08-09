# LeUnes Law Firm — Launch Checklist

Status as of August 8, 2026. The site is content-complete and QA'd. Everything below
is what remains between here and going live.

---

## Blocking (must happen before the site is public)

### 1. Connect the domain
- Client confirmed: **leuneslaw.com**
- Point DNS at the host and enable HTTPS.

### 2. Swap the Google Analytics ID
Every page currently ships a **placeholder**: `G-XXXXXXXXXX`

Create the GA4 property, then find and replace the placeholder across all 9 HTML files.
There are two occurrences per page (the script `src` and the `gtag('config', ...)` call).

```bash
grep -rl "G-XXXXXXXXXX" *.html
```

---

## Waiting on the client (site works fine without these)

| Item | Status |
|---|---|
| Real office / attorney photos | None available. Client is sending an AI headshot. Site currently uses stock imagery + `LeUnesPlaceholder.png`. |
| Social media links | Client said yes, will provide. Footer has no social links yet. |
| Public email address | `info@leuneslaw.com` is still an assumption, never confirmed. |
| Spanish translation review | Client declined to review. All Spanish is AI-translated and unverified. |
| Google Business Profile link | Not provided. Reviews are quoted on-site but not linked back to the profile. |

---

## Verified complete

- Real bio, education, and memberships on the About page
- Real case results ($2.5M / $2M / $365K) with confidentiality-safe descriptions
- Real Google reviews (5.0, 13 reviews) replacing the earlier placeholder testimonials
- Motorcycle accidents added as a practice area (client's stated focus, previously missing)
- Real estate + estate planning service lists expanded to the client's exact answers
- Free consultation correctly scoped to personal injury only, site-wide
- "Not certified by the Texas Board of Legal Specialization" on every page
- Privacy Policy and Terms of Use pages created and linked from every footer
- Real street address on every page + `LegalService` structured data for local SEO
- Phone `(832) 422-7761` and `tel:` links consistent everywhere
- Mobile: no horizontal overflow at 320px or 375px, zero tap targets under 30px,
  44px mobile nav links, 16px form inputs (no iOS zoom)
- 25-point static QA suite passing (links, anchors, images, metadata, bilingual sync,
  form wiring, duplicate IDs, robots directives, structured data)

---

## Known issues deliberately left alone

**Association logos removed.** The homepage previously displayed American Association
for Justice and Texas Trial Lawyers Association logos. The client listed only the State
Bar of Texas and the Houston Bar Association as memberships, so the unclaimed logos were
replaced with a text credentials strip. If he *is* a member of AAJ or TTLA, confirm it and
the logos can go back.

**Resources page renamed.** `recources.html` is now `resources.html`, with links updated
across all pages. Done via `git mv`, so history is preserved. Nothing links to the old
filename anymore.

**`DEMOs/` folder deleted.** It held the original draft mockups with outdated phone numbers
and "16+ years" copy. Removed with `git rm`, so it is recoverable from git history if ever
needed.

**Dates present the practice as starting in 1993, not 2010.** Per the meeting, the site
frames Chay's experience from when he was licensed in Texas (1993) rather than when the
firm opened. Note that the bio he emailed said "founded the LeUnes Law Firm in 2010" and
"since opening its doors in 2010" — that copy was reworded to lead with 1993 and the year
2010 no longer appears anywhere on the site. Worth a quick sign-off from him since it is
a change to his own submitted text.
