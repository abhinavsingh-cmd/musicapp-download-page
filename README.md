# MusicApp - APK Download Page

Production-ready APK distribution page for MusicApp Android.

## Structure

```
apk-download-page/
├── index.html    # Complete download page (HTML/CSS/JS)
├── app.apk       # The APK file (4.4 MB)
└── README.md
```

## Features

- Dark premium theme with violet gradient accents
- Mobile-first responsive design
- Direct APK download button
- Download counter (localStorage)
- SHA-256 checksum display (computed on first download click)
- App screenshots carousel
- Feature cards
- FAQ accordion
- SEO meta tags (Open Graph, Twitter Card, JSON-LD)
- Smooth animations with reduced-motion support
- Zero dependencies - pure static HTML/CSS/JS

## Local Preview

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo (or use a `gh-pages` branch)
2. Go to repo Settings > Pages
3. Set source to the branch and root folder
4. Your site is live at `https://username.github.io/repo-name/`

**To update the APK:** Replace `app.apk`, commit, and push. GitHub Pages redeploys automatically.

## Deploy to Netlify

1. Drag and drop this folder to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo and set the publish directory to `/` (root)

**To update the APK:** Replace `app.apk`, commit, push. Netlify auto-deploys.

## Deploy to Vercel

```bash
npx vercel --prod
```

Or import the repo at [vercel.com/new](https://vercel.com/new).

**To update the APK:** Replace `app.apk`, commit, push. Vercel auto-deploys.

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Go to Cloudflare Dashboard > Pages > Create a project
3. Connect your repo, set output directory to `/`
4. Deploy

## Updating the APK

Replace `app.apk` with your new build. Optionally update:

- Version number in `index.html` (search for `1.0.0`)
- Updated date in `index.html` (search for the date string)
- SHA-256 is computed automatically on first download

## Customization

Edit `index.html` to change:

- App name, description, tagline
- Version, size, date
- Features grid
- FAQ content
- Color scheme (CSS variables at the top of `<style>`)
- OG meta tags and canonical URL
