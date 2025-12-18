# Writing Articles in Markdown

This website uses markdown files for all writing/articles. This guide explains how to add new articles.

## Directory Structure

```
src/content/articles/
├── ai-systems-production.md
├── mvp-architecture-scale.md
├── correctness-speed-dichotomy.md
└── platform-architecture-notes.md
```

## Creating a New Article

1. Create a new `.md` file in `src/content/articles/`
2. Use kebab-case for the filename (this becomes the URL slug)
3. Add frontmatter at the top of the file

## Frontmatter Format

Every article must start with YAML frontmatter between `---` markers:

```markdown
---
id: article-slug
title: Your Article Title
premise: A one-line description that appears in listings (20-150 characters)
tag: AI
date: December 2025
---

Your article content starts here...
```

### Required Fields

- `id`: Unique identifier (should match filename without .md)
- `title`: Article title (10-80 characters)
- `premise`: One-line description for listing pages (20-150 characters)

### Optional Fields

- `tag`: Category tag (one of: `Architecture`, `AI`, `Systems`, `Leadership`, `Engineering`)
- `date`: Publication date (used for sorting, format: "Month YYYY")

## Markdown Features

### Headings

```markdown
# H1 - Avoid (page title is H1)
## H2 - Main sections
### H3 - Subsections
```

### Text Formatting

```markdown
**Bold text**
*Italic text*
`Inline code`
```

### Lists

```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Horizontal Rule

```markdown
---
```

### Code Blocks

```markdown
​```javascript
const example = "code block";
​```
```

## Styling

The article pages use custom prose styling with:
- Foreground text color for readability
- Proper heading hierarchy with spacing
- Relaxed line height for comfortable reading
- 50ch max width for optimal reading experience

## Auto-Generated Features

Once you create a markdown file:

1. **Listing Page**: Article automatically appears on `/writing`
2. **Individual Page**: Accessible at `/writing/[filename]`
3. **Homepage**: First 3 articles (sorted by date) appear in WritingNotes section
4. **SEO**: Title and premise become page metadata

## Example Article

```markdown
---
id: my-new-article
title: How to Build Systems That Scale
premise: Practical lessons from growing a platform from 100 to 10,000 users.
tag: Systems
date: January 2026
---

Building scalable systems isn't about predicting the future. It's about making decisions that don't paint you into a corner.

## 1. Start With Constraints

Every system has constraints. The trick is knowing which ones matter.

**Real constraints:**
- Database write throughput
- API latency requirements
- Budget limitations

**Imaginary constraints:**
- "We might need to scale to billions of users"
- "We should support every possible use case"
- "The architecture must be perfect from day one"

---

Focus on solving today's problems with tomorrow's flexibility in mind.
```

## Build Process

Articles are loaded at build time:
- `npm run build` - Generates static HTML for all articles
- `npm run dev` - Hot reloads when markdown files change

## Tips

1. **Keep it readable**: Use markdown for structure, not decoration
2. **Write conversationally**: These are thinking artifacts, not academic papers
3. **Use concrete examples**: Show, don't just tell
4. **Structure matters**: Break long sections with headings
5. **Test locally**: Preview at `http://localhost:3000/writing/[your-slug]`
