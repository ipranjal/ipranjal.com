# Pranjal's Personal Website

[![Deploy to GitHub Pages](https://github.com/OWNER/REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/deploy.yml)

A modern, static personal website built with Next.js 16, TypeScript, and Tailwind CSS v4. Features a clean, typography-first design with markdown-based content management.

## 🚀 Features

- **Static Site Generation**: Pre-rendered for optimal performance
- **Markdown Content**: Easy-to-manage articles with frontmatter
- **Dark Theme**: Professional dark mode design
- **Typography-First**: Clean, readable typography with custom prose styling
- **Fully Responsive**: Optimized for all devices
- **SEO Optimized**: Meta tags, semantic HTML, and clean URLs
- **Zero Runtime JS**: Minimal client-side JavaScript for fast load times

## 📦 Tech Stack

- **Framework**: Next.js 16.0 with App Router
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4
- **Content**: Markdown with gray-matter + remark
- **Deployment**: GitHub Pages with GitHub Actions

## 🛠️ Development

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Validate content
npm run validate:content
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Content Management

### Adding Articles

1. Create a new markdown file in `src/content/articles/`
2. Add YAML frontmatter with required fields:

```markdown
---
id: article-slug
title: Article Title
premise: One-line description
tag: Architecture | AI | Systems | Engineering
date: Month YYYY
---

Your markdown content here...
```

3. Articles automatically appear on `/writing` and homepage

See `docs/WRITING_GUIDE.md` for detailed documentation.

### Updating Sections

Edit JSON files in `src/content/sections/`:
- `hero.json` - Homepage hero section
- `what-i-do.json` - Expertise pillars
- `how-i-work.json` - Working principles
- `selected-work.json` - Project highlights
- `background.json` - Professional background
- `research-education.json` - Academic credentials
- `who-should-reach-out.json` - Qualification criteria
- `contact.json` - Contact methods
- `events.json` - Speaking engagements

### Adding Events

Edit `src/content/sections/events.json`:

```json
{
  "events": [
    {
      "id": "event-slug",
      "title": "Event Title",
      "date": "Month DD, YYYY",
      "location": "Venue Name",
      "description": "Brief description",
      "active": true,
      "featured": true
    }
  ]
}
```

Featured events appear in the LiveSignal banner on the homepage.

## 🚢 Deployment

### GitHub Pages

The site automatically deploys to GitHub Pages on every push to `main`:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions

2. **Push to main branch**:
```bash
git add .
git commit -m "Update content"
git push origin main
```

3. **Monitor deployment**:
   - Check Actions tab for build status
   - Site will be live at `https://<username>.github.io/<repo>/`

### Custom Domain (Optional)

1. Add `CNAME` file to `public/` with your domain
2. Configure DNS with your provider:
   - Add A records pointing to GitHub Pages IPs
   - Or CNAME record pointing to `<username>.github.io`

## 📁 Project Structure

```
ipranjal-website/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Homepage
│   │   ├── events/         # Events listing
│   │   └── writing/        # Articles listing & pages
│   ├── components/          # React components
│   │   ├── sections/       # Page sections
│   │   └── ui/             # Reusable UI components
│   ├── content/            # Content data
│   │   ├── articles/       # Markdown articles
│   │   └── sections/       # JSON section data
│   ├── lib/                # Utilities
│   │   ├── content.ts      # Content loading
│   │   ├── markdown.ts     # Markdown processing
│   │   └── content-validator.ts  # Zod schemas
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD

```

## 🎨 Design System

### Colors
- **Base**: Dark backgrounds (#0B0D10, #111418, #1C2128)
- **Primary**: Cyan-teal (#5CC8E6)
- **Secondary**: Muted purple (#8B7CFF)
- **Typography**: Soft white to disabled gray (4 levels)

### Typography
- **Headings**: Inter (sans-serif)
- **Body**: Inter (sans-serif)
- **Code**: JetBrains Mono (monospace)

### Spacing
- Consistent 8px baseline grid
- Section padding: 5-8rem vertical

## 📄 License

All rights reserved © 2025

---

**Status**: ![Deployment](https://github.com/<username>/<repo>/actions/workflows/deploy.yml/badge.svg)

