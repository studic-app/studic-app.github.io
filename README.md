# Studic web

The Studic website: a landing page plus Privacy Policy, Permissions, Terms of Service and Help Center, built for free hosting on GitHub Pages. Plain HTML, CSS and JavaScript. No build step, no dependencies, no cookies, no analytics, no third-party requests (the fonts are self-hosted).

It has two looks from the same files:

- **In a browser (desktop, tablet, phone):** the full Studic site design (sticky header, hero, footer, light/dark toggle), fully responsive with a menu button on small screens.
- **Inside the Studic app:** only the page body, styled like a normal Studic screen. No header, hero, tabs or footer, so it does not feel like a website.

| URL | File | Purpose |
|:---|:---|:---|
| `/` | `index.html` | Landing page (features, modes, how it works, FAQ) |
| `/privacy/` | `privacy/index.html` | Privacy Policy (use this URL in the Play Console Data safety form) |
| `/permissions/` | `permissions/index.html` | Every Android permission, purpose, and what Studic never does (use this URL in Play permission declarations) |
| `/terms/` | `terms/index.html` | Terms of Service |
| `/help/` | `help/index.html` | Help Center |
| any missing page | `404.html` | Page not found |

```
assets/css/style.css   all styles + light/dark tokens copied from the app theme
assets/js/main.js      embed mode, theme, link params (loaded in <head>)
assets/fonts/          Literata + Plus Jakarta Sans (subset from the app's own fonts)
assets/img/            Studic logos copied from the app (wordmark light/dark, mark, favicon, touch icon)
.nojekyll, robots.txt, sitemap.xml
```

## Loading the pages inside the Studic app

The app opens these pages in an in-app web view, so the user never leaves Studic. The pages switch to the app layout (no site header, hero banner, page tabs, footer or download banner; just the content cards) when **either** is true:

- the URL has `?embed=1`, or
- the WebView user agent contains `StudicApp/<version>`

Optional: `?theme=light` or `?theme=dark` makes the page match the app theme. Without it the page follows the system theme. Links between these pages automatically keep `embed` and `theme`.

Examples:

```
https://studic-app.github.io/privacy/?embed=1&theme=light
https://studic-app.github.io/permissions/?embed=1&theme=light
https://studic-app.github.io/terms/?embed=1&theme=dark
https://studic-app.github.io/help/?embed=1
```

Section links work too, for example `/help/?embed=1#points` opens the Points section.

## Preview locally

```bash
cd ~/AndroidStudioProjects/studic-web
python3 -m http.server 8000
```

Open <http://localhost:8000/> (or `/privacy/?embed=1&theme=light`). In the browser dev tools use a phone size such as 360 x 740.

## Before you publish: fill in these placeholders

| Placeholder | Where | Replace with |
|:---|:---|:---|
| `software.engineer.amir@gmail.com` | `privacy/`, `terms/`, `help/` | the support email, if you change it |
| `studic-app.github.io` | `robots.txt`, `sitemap.xml`, the app's `StudicWebLinks.BASE_URL` | the site address, if you move it |
| `<base href="/">` | `404.html` | `/` for a `<user>.github.io` repo or custom domain; `/<repo-name>/` for a project repo |
| `Last updated` dates | privacy, permissions, terms | the day you change the text |

## Deploy on GitHub Pages

Live site: <https://studic-app.github.io/> (organization `studic-app`, repository `studic-app.github.io`, branch `main`, folder `/`). To publish a change, commit and push from this folder; GitHub updates the site within a minute or two. The app reads the site address from `StudicWebLinks.BASE_URL`.

The steps below are for setting up a new site (for example for another app):

Option A, user site (URL: `https://<user>.github.io/`):

1. Create a public repo named exactly `<your-github-username>.github.io`.
2. Put the contents of this folder at the repo root (`index.html` at the top level) and push.
3. Repo Settings, Pages: Source = "Deploy from a branch", Branch = `main`, folder `/ (root)`.

Option B, project site (URL: `https://<user>.github.io/<repo>/`):

1. Create a repo (for example `studic-web`) and push this folder to `main`.
2. Same Pages setting as above.
3. Set `404.html` `<base href="/<repo>/">`, and update the URLs in `robots.txt` and `sitemap.xml`.

All page links are relative, so both options work. Wait a minute or two, then open the URL.

## When the app changes

The copy in these pages is based on the app code: points costs, packs, break rules, permissions, ads and backups. When you change `WalletRules`, `SessionRules`, permissions in `AndroidManifest.xml` or add an SDK, update the matching page and its "Last updated" date. In particular, any new SDK that collects data must be added to the Privacy Policy, and any new sensitive permission must be added to `/permissions/`.
