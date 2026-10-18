# ipranjal.com

Pranjal Pandey's personal website, built with Astro and deployed to GitHub Pages.

## Development

Requires Node 24 LTS, npm, `zip` and `unzip`.

```sh
npm ci
npm run dev
```

Validate and preview:

```sh
npm run check
npm run build
npm test
npm run preview
```

## Editing

- Contact details and provider URLs: [src/data/site.ts](src/data/site.ts)
- Essays and research: [src/content/](src/content/). Writing drafts and future-dated essays stay unpublished.
- Images: [src/assets/](src/assets/); shared styles: [src/styles/global.css](src/styles/global.css)
- Free guides: [public/files/](public/files/). Builds regenerate the two-guide ZIP.

Kit owns signup and confirmation: signup redirects to `/thanks/`, email confirmation to `/welcome/`. Configure both redirects in Kit. Keep download links on Welcome.

Analytics run only on the live domain; visitors can opt out on Privacy. Verify real email delivery, bookings and tracking before release.

## Deployment

Pushing to `main` runs the [Pages workflow](.github/workflows/deploy.yml), validates the site and deploys only `dist/`. Local builds do not publish changes.
