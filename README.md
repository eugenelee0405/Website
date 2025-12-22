# Portfolio Website

A multi-section portfolio website built with Next.js, featuring:

- **Stock Analysis**: Blog with Buy/Sell/Hold rating badges
- **Entrepreneurship**: Business Model Canvas visualization
- **Sports Medicine**: Research-focused blog layout
- **Tech Consulting**: Build request form and gallery showcase

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for deployment.

## Deployment to GitHub Pages

1. Push your code to a GitHub repository
2. Go to Settings > Pages in your repository
3. Select "GitHub Actions" as the source
4. The GitHub Actions workflow will automatically build and deploy on push to `main`

### Configuring basePath (if needed)

If your repository name is not the root (e.g., `username.github.io/repo-name`), uncomment and update the `basePath` and `assetPrefix` in `next.config.js`:

```javascript
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name/',
```

## Form Configuration

The "Request a Build" form uses Formspree. To configure:

1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the `formspreeEndpoint` in `src/app/tech-consulting/components/BuildRequestForm.tsx` with your form ID

## Content Management

### Stock Analysis Posts

Add markdown files to `content/stock-analysis/` with frontmatter:

```markdown
---
title: "Post Title"
date: "2024-01-15"
rating: "Buy" # or "Sell" or "Hold"
excerpt: "Brief description"
---

Your content here...
```

### Sports Medicine Articles

Add markdown files to `content/sports-medicine/` with frontmatter:

```markdown
---
title: "Article Title"
date: "2024-01-15"
category: "Category Name"
tags: ["tag1", "tag2"]
abstract: "Article abstract"
readingTime: 5
---

Your content here...
```

### Tech Consulting Gallery

Edit `content/tech-consulting/gallery.json` to add build showcases.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **gray-matter** - Markdown frontmatter parsing
- **remark** - Markdown to HTML conversion
- **date-fns** - Date formatting

