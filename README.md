# Phi Kappa Psi — UCI Chapter Website

Chapter website for [uciphipsi.kevinnorgaard.com](https://uciphipsi.kevinnorgaard.com). Built with Angular 19, Firebase, and Hygraph CMS. Features multi-mode routing (normal, rush, philanthropy) and an admin dashboard for rush event management.

## Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20 |
| Framework | Angular 19 (esbuild application builder) |
| Language | TypeScript |
| UI Components | Angular Material, ng-bootstrap, Bootstrap 4 |
| CMS | Hygraph (GraphQL via Apollo Angular) |
| Backend | Firebase Realtime Database + Auth |
| Fonts | Google Fonts (Material Icons) |
| Hosting | Namecheap cPanel (static SPA) |

## Project Structure

```
src/
├── app/
│   ├── app.module.ts             # Root module (Firebase, Apollo, Material config)
│   ├── app-routing.module.ts     # Mode-based routing (normal/rush/philanthropy)
│   ├── graphcms.service.ts       # Hygraph GraphQL queries
│   ├── scroll.service.ts         # Scroll utilities
│   ├── header/                   # Navbar with animations
│   ├── footer/
│   ├── banner/                   # Mode-dependent announcements
│   ├── scroll-button/
│   ├── dialogs/
│   │   └── checkin-dialog/       # Rush event check-in form
│   └── pages/
│       ├── about/
│       ├── membership/           # Executives + composite (from Hygraph)
│       ├── recruitment/          # Rush info + check-in
│       ├── scholarship/
│       ├── philanthropy/
│       ├── alumni/               # Newsletter signup (Firebase)
│       └── admin/                # Rushee profiles, event check-in, alumni
├── environments/                 # Firebase + Hygraph config (normal/rush/philanthropy mode)
└── assets/
```

## Local Development

```bash
nvm use 20   # Node 20 required
npm install
npm start
# Open http://localhost:4200
```

## Deployment

```bash
npm run deploy
```

This builds the production bundle and rsyncs `dist/pkp-app/browser/` to the Namecheap cPanel server.

## Key Configuration Notes

- `environment.mode` controls the routing mode — set to `'normal'`, `'rush'`, or `'philanthropy'` to change the home page and visible nav links
- Firebase compat imports (`@angular/fire/compat/*`) are used for Realtime Database and Auth
- Apollo Angular connects to Hygraph CMS for dynamic content (executives, leaders, composite photo)
- `.htaccess` handles SPA routing (all paths → `index.html`)
