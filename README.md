# ipranjal.com

Pranjal Pandey's static Astro website. GitHub Pages publishes only generated `dist/` output, never the repository or the original source-media directory.

## Development

Use Node 24 LTS, npm and the native `zip` executable (included on macOS and the Ubuntu Pages runner). Tests also use `unzip`. Development and production prebuild hooks regenerate the two-guide ZIP from the supplied PDFs, validating their PDF headers first.

```sh
npm ci
npm run dev
```

Before release:

```sh
npm run check
npm run build
npm test
npm run preview
```

The build verifier checks routes, internal links and fragments, private-source exclusion, one main heading per page, responsive portrait sizes and the compressed first-party JavaScript budget. Browser and real-device checks are still required.

## Content and publishing

- [website-copy.md](website-copy.md) is the private copy reference. Public copy follows its positioning, offers and two-step guide flow while retaining the approved design. Placeholder prices, unconfirmed belief/Now notes, unpublished essays, unreleased playbooks and private research submissions are not published. Verified paper titles and detailed chronology take precedence over abbreviated draft wording. Provider profile/email copy and Kit redirects must be configured in the provider dashboards; editing the site does not update those.
- Canonical contact details, provider URLs, chronology and method live in [src/data/site.ts](src/data/site.ts).
- Essays are Markdown files in [src/content/writing/](src/content/writing/) with `title`, `description`, `published`, optional `updated`, optional `seo_title` (up to 60 characters), optional `tags`, `audience` (`business`, `individuals` or `research`, default `business`), and `draft`. The archive filter reflects its selection in `?audience=` and supports browser history. Only audiences with published essays appear as options; unavailable audience queries show All. The Individuals writing section appears automatically once its first essay is published. The author is Pranjal Pandey. `draft` defaults to true. Draft and future-dated essays do not generate pages or appear in RSS, the sitemap or previews. Static scheduled publication requires a rebuild on or after the publication date.
- Research entries live in [src/content/research/](src/content/research/), with a title, canonical paper URL, ordered `authors`, `published` date (initial submission date for preprints), explicit `preprint` or `peer-reviewed` status and a plain-language Markdown summary. The research page lists them newest first and links to the Scholar profile configured in [src/data/site.ts](src/data/site.ts). The four unique arXiv preprints were verified against the owner's Google Scholar profile and arXiv metadata on 16 October 2026; duplicate Scholar records are represented once. Updates are curated, not automatically synced. No unpublished submissions are listed.
- Shared typography, colors, responsive layout and preference fallbacks live in [src/styles/global.css](src/styles/global.css).
- The approved existing themed portrait is imported from [assets/pranjal-theme.png](assets/pranjal-theme.png) and optimised by Astro. Original HEIC/video/large images are not copied to production. The themed image is not presented as an unaltered press photograph.

The two initial essays cover AI pilot failure and AI task allocation, both dated 16 October 2026 by owner approval. The homepage previews, archive, RSS and sitemap derive from the same published collection. Article pages include canonical metadata, article Open Graph metadata, the shared branded portrait social image and BlogPosting structured data. The supplied root drafts and SEO plan are private inputs; only their adapted public Markdown entries are published. Upcoming paid playbooks have no purchase links.

## Integrations

- `/call/` redirects to the supplied free 30-minute Cal.com event.
- `/session/` redirects to the Topmate profile so visitors can choose. `/strategy/` and `/career/` redirect to the supplied 90-minute business strategy and 60-minute career services respectively. Public booking CTAs use these shortlinks.
- `/newsletter/` redirects to the writing page.
- `/guides/#free-guide` retains the approved library signup. `/guide/` is a separate, indexable campaign landing page with three benefits, a small existing portrait and the same Kit form, without the full navigation. Its incoming campaign query string is not discarded by a redirect.
- `/playbook/` continues to `/guides/`. No waitlist or purchase CTA is claimed. `/work/` is a compatibility redirect to `/business/`, as authorized by the owner. Business offers remain there; the career session is presented on Individuals rather than pitched on the business page. Internal shortlinks retain query strings and fragments; external booking shortlinks forward only the six supported UTM fields and fragments, not arbitrary potentially personal query data. JavaScript handles those redirects without racing an immediate meta-refresh; no-JavaScript visitors retain a static redirect and manual link, but static HTML cannot forward their incoming query. `/links/` remains available and stays out of the sitemap.
- `/business/`, `/individuals/` and `/kit/` use audience-specific titles, descriptions and separate rasterized social cards. Astro rasterizes repository-authored SVG cards only; do not introduce untrusted or remote SVG sources. The homepage chooser follows the approved hero. Guides uses native audience links with deep-link hashes and a remembered selection; both sections remain available without JavaScript. Both guide audiences use the same benefits-left, boxed-signup-right layout, stacked on mobile. Each panel has a uniquely labelled instance of the same Kit form, not a separate provider form or confirmation flow. The Individuals page does not invent individual essays or social proof.
- The homepage free-guide section uses the same bordered signup-panel styling and shared Kit form as Guides, with the guide benefits beside it on desktop and above it on mobile. The hero links to its own `#guide` section. The audience chooser is not duplicated by a second offers split further down. Business blocks say "Send me the guide"; Kit says "Send me the kit"; newsletter blocks use "Subscribe". Each form has one concise monthly-letter/privacy note, with the hosted fallback retained for unavailable embeds. Each essay ends with one inline signup and one relevant booking link, not a second CTA in its Markdown body.
- [Signup.astro](src/components/Signup.astro) uses the supplied Kit form ID 10053825 and Kit's own form controller. Set the after-signup redirect in Kit to `https://ipranjal.com/thanks/`. Separately, set the incentive email's after-confirmation redirect to `https://ipranjal.com/welcome/`. These provider-side settings cannot be changed by the static site. Live email delivery has not been tested by the build.
- Without JavaScript, signup pages offer the labelled hosted Kit signup instead of pretending a submission succeeded.
- Every signup includes the owner-supplied hosted Kit fallback, hidden during a normal visit. A hidden form/input/button, a missing Kit controller after eight seconds, or a submission network error reveals it as a prominent alternative. Without JavaScript the hosted link remains visible. These signals cannot conclusively identify an ad blocker. No visit-tracking probe, automatic navigation, email forwarding in URLs or bypass of browser protection is used. The hosted page's form and incentive redirects are configured separately in Kit.
- `/thanks/` is public, `noindex` and conditional. It never counts a visit as a confirmed subscription, booking or payment. Use provider reporting for actual outcomes.
- The latest critique's direct returning-subscriber shortcut and Meta Lead/CompleteRegistration page proxies were declined by the owner. `/thanks/` still has no `/welcome/` shortcut; existing subscribers without a fresh email are offered email support. Check Kit's Incentive settings for resending the incentive to existing subscribers if the plan supports it, and test with an owner-controlled existing address before ads. Site code cannot change that setting. Keep Meta page views only; do not label arbitrary page opens as verified subscriptions.
- `/thanks/` asks visitors to confirm through email and has no download or direct welcome link. `/welcome/` is the separate, `noindex` guide picker with [the business PDF](public/files/ai-strategy-starter.pdf), [the personal PDF](public/files/personal-ai-starter-kit.pdf) and [both PDFs in a ZIP](public/files/practical-ai-free-guides.zip). Only Welcome links directly to these stable `/files/` downloads. Replacing either PDF and rebuilding regenerates the ZIP. Tests compare the built PDFs and extracted ZIP bytes with their originals. The static picker and downloads remain publicly accessible; neither verifies subscriber status. All downloads are excluded from the sitemap. GitHub Pages cannot attach a custom `X-Robots-Tag` response header through this static build; no unsupported header configuration is claimed.
- All audiences use one existing Kit form, one confirmation email and one monthly letter. No tags, extra forms, waitlist flow or `/kit/thanks` and `/kit/welcome` routes are introduced. Content pages without a primary signup get a single footer signup. Campaign pages use a minimal frame; the kit has no header navigation. Confirmation email settings still need owner changes in Kit:
  - Subject: **Confirm to get your free Practical AI guides**
  - Preview: **One click, then pick one guide or both.**
  - Body: thank the reader for joining Practical AI, explain that confirming opens the picker for the business guide, personal kit or both, and describe the monthly letter's business and individual sections.
  - Button: **Confirm and get your free guides**
  - Signup redirect: `https://ipranjal.com/thanks/`; confirmation redirect: `https://ipranjal.com/welcome/`.
- [Analytics.astro](src/components/Analytics.astro) installs owner-supplied GA4 `G-TYBVMJLK06`, LinkedIn partner `10220252` and Meta Pixel `1002800556174711`, loading by default on the live domain only, per the owner's explicit choice. Preview/local hosts never load them. Visitors can disable all three from Privacy / Tracking settings; that preference is stored locally and applied after reload. Unavailable storage fails closed with a console warning. No no-JavaScript advertising pixel bypasses opt-out. Meta automatic configuration is disabled and site code does not supply advanced-matching fields.
- The privacy page describes the providers, default-on policy and opt-out limits. Default-on analytics/advertising is not a claim of legal compliance: review applicable consent requirements before running campaigns; some jurisdictions require prior consent.
- GA4 receives `guide_signup_page_view` on `/thanks/` and `guide_confirmation_page_view` on `/welcome/`. These are funnel page visits, not verified subscriptions, and can include direct visits/reloads. Guide clicks send `download_guide` with `guide=business|personal|both`; local booking links send `intro_call_click`, `strategy_session_click` and `career_session_click`. These measure intent, not completed transfers, confirmed emails, bookings or payments. Configure platform key events/conversions in the dashboards only if those definitions are acceptable. Verified email-confirmation conversions require Kit-side reporting or a verified provider integration. LinkedIn conversion rules/IDs must be configured in Campaign Manager; none were supplied. First-party GA4 page configuration strips query strings from page location/referrer and explicitly maps the six UTM campaign fields; no email address is passed by site code. Audit enhanced measurement and provider dashboards before ads.
- Approved press photo downloads, Instagram and social proof remain deferred until real assets exist. Press includes a copy-short-bio button with explicit success/failure feedback. Keep the two owner-approved article dates; use `updated` for substantive future revisions.

Kit controls network submission, errors and subscriber confirmation. Test a real signup, duplicate address, rejected request, retry, incentive delivery and unsubscribe with an address you own before deployment. Booking availability and payment completion also need owner-controlled tests. Local browser HTTP downloads returned complete files with matching hashes; the integrated browser did not expose a native download event, so saving the PDFs/ZIP on real devices remains a release check.

## Motion and assets

Tastemaker supplies the editorial direction; Apple Design informs immediate press feedback and native disclosure navigation. The Awwwards-quality brief uses GSAP + ScrollTrigger and one Lenis wheel enhancement on the homepage only. Locomotive and Three.js are not installed. Touch, reading routes, reduced motion and no-JavaScript paths keep native scrolling.

The method is a semantic HTML process graphic showing the working approach, not a client case study. Guide panels are typographic title treatments, not fabricated PDF screenshots. No customer logos, stock people, generated likenesses or award claims are used. Fonts are self-hosted from the Fontsource packages. The build copies their OFL notices, Lenis's MIT notice and the original GSAP module copyright/license banners into `dist/licenses/`; the verifier requires those files.

## Deployment

[The Pages workflow](.github/workflows/deploy.yml) runs `npm ci`, checks, production build validation and tests on Node 24, then uploads only `dist/`. [public/CNAME](public/CNAME) retains the custom domain. GitHub Pages must remain configured for GitHub Actions. Merging or pushing to `main` deploys the current build; local validation alone does not publish it.

Before release, verify the custom domain, direct routes, `/404.html`, live Kit delivery and bookings, keyboard and screen-reader behavior, real phones, reduced preferences and mobile cold-cache performance.
