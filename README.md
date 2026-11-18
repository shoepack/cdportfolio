# jasonartley.com

Personal site for Jason Artley, Solutions Architect. Live at https://www.jasonartley.com.

## Stack
- React 18 + Vite 7, Tailwind CSS 4 (Vite plugin)
- React Bits Pro (Browser Window), vendored in `src/components/react-bits/`
- EmailJS for the contact form (`VITE_EMAILJS_*` variables in Vercel)
- Hosted on Vercel; `master` deploys to production, other branches get previews

## Where things live
- `src/shared/profile.js`: every fact the site states (keep it in sync with the résumé)
- `src/shared/useContactForm.js`: contact form behaviour
- `src/site/`: the page
- `public/Jason_Artley_Resume.pdf`: résumé (exported from the Google Doc, phone number removed)
- `public/img/`: optimized portrait, logos, OG image, and work screenshots
- `PRODUCT.md`: audience, positioning, and the evidence the site may use

## Develop
```sh
npm install
npm run dev
npm run build
```
