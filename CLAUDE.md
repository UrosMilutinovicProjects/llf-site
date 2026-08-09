# LeUnes Law Firm Project — Notes for Claude

## Client Contact
- Client: Christopher C. LeUnes — goes by his middle name **Chay** with people who know him
- Email: cleunes@gmail.com
- Relationship: established, ongoing — casual but professional tone is appropriate (see past threads: "Hey Uros", "Hi Christopher")

## Email / Written Communication Style
- Sign all emails as **Uros Milutinovic** (full name), not just "Uros"
- **Never use em dashes** in any written content (emails, docs, website copy) — rephrase with commas, periods, or separate sentences instead
- Before sending any email to the client, draft it and show it to the user for feedback first — do not send unprompted
- Gmail tool currently cannot attach files to drafts — when an attachment (e.g. PDF) is needed, create the draft with the body text and tell the user to attach the file manually before sending

## Verified Business Facts (from client questionnaire, Aug 2026)
Use these exact facts. Do not invent or infer around them.

- **Chay licensed in Texas: 1993.** The firm itself opened in 2010, but per the client meeting the site presents the practice as running **since 1993** and the year 2010 appears nowhere on the site. Chay's emailed bio did say "founded in 2010" twice; that copy was reworded to lead with 1993. Do not reintroduce 2010.
- **Phone:** (832) 422-7761
- **Address:** 14150 Huffmeister Rd, Ste 200-110, Cypress, TX 77429
- **Domain (pending):** leuneslaw.com
- **Email:** info@leuneslaw.com (placeholder, client has not confirmed a different one)
- **Prior role:** Assistant Attorney General, Tort Litigation Division (Texas OAG). Also defended for a top Houston firm and a Fortune 500 company. 20+ years on the defense side.
- **Education:** St. Mary's University School of Law, J.D. 1993; Texas A&M University, B.A. 1989
- **Memberships:** State Bar of Texas, Houston Bar Association. **Nothing else** — do not display ATLA/TTLA or any other association logos, he did not claim them.
- **Board certified:** NO. Every page must carry "not certified by the Texas Board of Legal Specialization."
- **Practice focus:** motor vehicle accidents (cars, **motorcycles**, commercial trucks), personal injury, wrongful death. Also real estate and estate planning.
- **Free consultation applies to PERSONAL INJURY ONLY** — not real estate or estate planning. CTAs say "Free Injury Consultation" for this reason.
- **Google rating:** 5.0 from 13 reviews

## Content Rules Learned On This Project
- **Never publish invented testimonials, case results, or credentials.** An earlier draft shipped six fabricated client quotes with fake names and placeholder dollar amounts. Fabricated client testimonials are misleading and restricted under the Texas Disciplinary Rules of Professional Conduct (Rule 7.02). Real reviews were sourced from the firm's public Google Business Profile instead.
- Case result descriptions must stay generic (no identifying case detail) per the client's confidentiality answer.
- Client has **no** real office/attorney photos yet and declined a Spanish-language review of the AI translations. He plans to send an AI headshot and start blogging later.

## Technical Notes
- Cache-busting: bump `?v=N` on **both** `styles.css` and `script.js` in **all** HTML files after any CSS/JS edit. The preview caches file:// aggressively — if a change doesn't appear, bump the version and open a fresh tab.
- `styles.css` has a **"Mobile overrides" block at the very end**. Mobile rules that need to beat a base component rule defined later in the file must live there, otherwise the later base rule wins the cascade (this bit us with input font-size and `.side-card`).
- Grid tracks: use `minmax(0, 1fr)` not bare `1fr` on mobile, or the track floors at min-content and overflows narrow screens.
- Form inputs must be `font-size: 16px` on mobile or iOS Safari auto-zooms on focus.
- Google Analytics is installed on every page with a **placeholder ID `G-XXXXXXXXXX`** — must be swapped for the real Measurement ID before launch.
- QA script lives at the scratchpad path used during the Aug 2026 session; it runs 25 static checks (links, anchors, placeholders, metadata, bilingual desync, form wiring, compliance strings).

## Project Context
See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for full project history, tech stack, and business model context.
