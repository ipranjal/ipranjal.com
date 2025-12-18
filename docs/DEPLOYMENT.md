# Deployment Checklist

## Pre-Deployment

- [x] Remove test files and dependencies
- [x] Update .gitignore for specs/speckit files
- [x] Update README with deployment instructions
- [x] Verify build works locally (`npm run build`)
- [ ] Review all content in JSON files
- [ ] Check all markdown articles render correctly
- [ ] Test navigation between pages
- [ ] Verify contact links (email, LinkedIn, GitHub)
- [ ] Test responsive design on mobile/tablet

## GitHub Repository Setup

1. **Create GitHub repository** (if not already done):
   ```bash
   # On GitHub: Create new repository
   # Don't initialize with README (we have one)
   ```

2. **Push code to GitHub**:
   ```bash
   git remote add origin https://github.com/<username>/<repo>.git
   git branch -M main
   git push -u origin main
   ```

## Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select: **GitHub Actions**
3. Save changes

## First Deployment

1. **Trigger deployment**:
   - Push to main branch triggers automatic deployment
   - Or manually trigger from Actions tab

2. **Monitor deployment**:
   - Go to **Actions** tab
   - Watch "Deploy to GitHub Pages" workflow
   - Should complete in 2-3 minutes

3. **Access site**:
   - Default URL: `https://<username>.github.io/<repo>/`
   - Check all pages load correctly
   - Verify navigation works
   - Test on mobile device

## Custom Domain (Optional)

1. **Add CNAME file**:
   ```bash
   echo "yourdomain.com" > public/CNAME
   git add public/CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS** with your domain provider:
   
   **Option A - Apex domain** (yourdomain.com):
   ```
   A     @     185.199.108.153
   A     @     185.199.109.153
   A     @     185.199.110.153
   A     @     185.199.111.153
   ```
   
   **Option B - Subdomain** (www.yourdomain.com):
   ```
   CNAME www   <username>.github.io
   ```

3. **Enable HTTPS** in repository Settings → Pages
   - Wait 24-48 hours for DNS propagation
   - GitHub automatically provisions SSL certificate

## Post-Deployment Verification

- [ ] Homepage loads correctly
- [ ] All sections render properly
- [ ] Writing page shows all articles
- [ ] Individual article pages load
- [ ] Events page displays correctly
- [ ] Navigation bar works on all pages
- [ ] Contact links functional
- [ ] Mobile responsive design working
- [ ] Images/assets loading
- [ ] No console errors
- [ ] LiveSignal shows latest featured event

## Performance Check

```bash
# Run Lighthouse audit
npm install -g lighthouse

# Audit production URL
lighthouse https://<username>.github.io/<repo>/ --view
```

**Target Scores**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## Troubleshooting

### Build fails in Actions
- Check Actions logs for errors
- Verify `npm run build` works locally
- Ensure all dependencies in package.json
- Check Node.js version compatibility

### 404 on GitHub Pages
- Verify Pages is enabled (Settings → Pages)
- Check source is set to "GitHub Actions"
- Wait a few minutes after first push
- Clear browser cache

### Assets not loading
- Check `next.config.js` has `output: 'export'`
- Verify `basePath` if using custom repo name
- Check asset paths are relative, not absolute

### Custom domain not working
- Verify CNAME file in `public/` directory
- Check DNS propagation: `dig yourdomain.com`
- Wait 24-48 hours for full propagation
- Ensure DNS records point to GitHub IPs

## Continuous Deployment

Every push to `main` branch automatically:
1. Installs dependencies
2. Validates content
3. Builds static site
4. Deploys to GitHub Pages

**Typical deployment time**: 2-3 minutes

## Content Updates

To update content:

```bash
# Edit content files
vim src/content/sections/hero.json
vim src/content/articles/new-article.md

# Commit and push
git add .
git commit -m "Update: [description]"
git push origin main

# Deployment happens automatically
```

## Rollback

To revert to previous version:

```bash
# Find commit hash
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (force push)
git reset --hard HEAD~1
git push -f origin main
```

## Monitoring

- **Deployment Status**: Check Actions tab badge in README
- **Uptime**: GitHub Pages has 99.9% uptime SLA
- **Analytics**: Add Google Analytics or Plausible if needed

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Add analytics tracking (optional)
- [ ] Configure SEO sitemap
- [ ] Add Open Graph image
- [ ] Set up RSS feed for articles (optional)
- [ ] Performance monitoring setup

---

**Last Updated**: December 18, 2025
