# ipranjal.com

Pranjal Pandey's static Astro website. GitHub Pages publishes only generated `dist/` output, never the repository or the original source-media directory.

## Development

Use Node 24 LTS and npm.

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
- Essays are Markdown files in [src/content/writing/](src/content/writing/) with `title`, `description`, `published`, optional `updated`, optional `seo_title` (up to 60 characters), optional `tags`, and `draft`. The author is Pranjal Pandey. `draft` defaults to true. Draft and future-dated essays do not generate pages or appear in RSS, the sitemap or previews. Static scheduled publication requires a rebuild on or after the publication date.
- Research entries live in [src/content/research/](src/content/research/), with an explicit `preprint` or `peer-reviewed` status. The public paper title is linked to arXiv; no unpublished submissions are listed.
- Shared typography, colors, responsive layout and preference fallbacks live in [src/styles/global.css](src/styles/global.css).
- The approved existing themed portrait is imported from [assets/pranjal-theme.png](assets/pranjal-theme.png) and optimised by Astro. Original HEIC/video/large images are not copied to production. The themed image is not presented as an unaltered press photograph.

The two initial essays cover AI pilot failure and AI task allocation, both dated 16 October 2026 by owner approval. The homepage previews, archive, RSS and sitemap derive from the same published collection. Article pages include canonical metadata, article Open Graph metadata, the shared branded portrait social image and BlogPosting structured data. The supplied root drafts and SEO plan are private inputs; only their adapted public Markdown entries are published. Upcoming paid playbooks have no purchase links.

## Integrations

- `/call/` redirects to the supplied free 30-minute Cal.com event.
- `/session/` redirects to the supplied 60-minute Topmate career session. The separate 90-minute strategy session links directly to its specific Topmate service.
- `/newsletter/` redirects to the writing page.
- `/guides/#free-guide` is the single guide signup destination, with a visible Kit email form near the top and upcoming playbooks below. `/guide/` is a noindex compatibility redirect with a manual continuation link, not a duplicate landing page.
- The homepage free-guide section uses the same bordered signup-panel styling and shared Kit form as Guides, with the guide benefits beside it on desktop and above it on mobile.
- [Signup.astro](src/components/Signup.astro) uses the supplied Kit form ID 10053825 and Kit's own form controller. Set the after-signup redirect in Kit to `https://ipranjal.com/thanks/`. Separately, set the incentive email's after-confirmation redirect to `https://ipranjal.com/welcome/`. These provider-side settings cannot be changed by the static site. Live email delivery has not been tested by the build.
- Without JavaScript, signup pages offer an explicitly labelled email-help path instead of pretending a submission succeeded.
- `/thanks/` is public, `noindex` and conditional. It never counts a visit as a confirmed subscription, booking or payment. Use provider reporting for actual outcomes.
- `/thanks/` asks visitors to confirm through email and has no PDF download or direct welcome link. `/welcome/` is the separate, `noindex` destination after Kit confirmation and offers [assets/ai-strategy-starter.pdf](assets/ai-strategy-starter.pdf). Astro includes this imported PDF in production. The static welcome page and PDF remain publicly accessible; neither verifies subscriber status nor records a visit as a confirmed conversion. Replacing the source PDF and rebuilding updates the download.
- No analytics or advertising tags are installed. Add appropriate privacy information and consent handling before enabling them.

Kit controls network submission, errors and subscriber confirmation. Test a real signup, duplicate address, rejected request, retry, incentive delivery and unsubscribe with an address you own before deployment. Booking availability and payment completion also need owner-controlled tests.

## Motion and assets

Tastemaker supplies the editorial direction; Apple Design informs immediate press feedback and native disclosure navigation. The Awwwards-quality brief uses GSAP + ScrollTrigger and one Lenis wheel enhancement on the homepage only. Locomotive and Three.js are not installed. Touch, reading routes, reduced motion and no-JavaScript paths keep native scrolling.

The method is a semantic HTML process graphic with labelled illustrative outputs, not a client case study. Guide panels are typographic title treatments, not fabricated PDF screenshots. No customer logos, stock people, generated likenesses or award claims are used. Fonts are self-hosted from the Fontsource packages. The build copies their OFL notices, Lenis's MIT notice and the original GSAP module copyright/license banners into `dist/licenses/`; the verifier requires those files.

## Deployment

[The Pages workflow](.github/workflows/deploy.yml) runs `npm ci`, checks, production build validation and tests on Node 24, then uploads only `dist/`. [public/CNAME](public/CNAME) retains the custom domain. GitHub Pages must remain configured for GitHub Actions. Merging or pushing to `main` deploys the current build; local validation alone does not publish it.

Before release, verify the custom domain, direct routes, `/404.html`, live Kit delivery and bookings, keyboard and screen-reader behavior, real phones, reduced preferences and mobile cold-cache performance.
