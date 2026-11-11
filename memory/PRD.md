# Apna Travels — Website Redesign (PRD)

## Original problem statement
Premium "Dark Luxury Corporate" redesign of https://apnatravels.org/ (international manpower recruitment, India → Gulf). Two audiences: employers & candidates. Exact palette (#101E30, #1C3552, #D5A94F, #F5F7FA, #8A96A5, #FFF), Plus Jakarta Sans + Inter. 12 homepage sections in fixed order (Hero, Stats, About, Why, Services×8, Industries×7, Process×7, Global reach + 3D globe, Clients by country, Team, Contact with employer + candidate forms, Footer). No invented facts.

## Discovery answers
- Form submissions: open WhatsApp to +91 98210 90453 (we also save to DB + store resume)
- Notification email: skipped (none)
- Hero: only the user's attached image (no video)
- Logo: white version on dark areas

## Architecture
- Frontend CRA + Tailwind + framer-motion + three/@react-three/fiber (globe lazy-loaded, desktop only; SVG static map fallback on mobile / no WebGL / reduced motion)
- All copy in `frontend/src/data/content.js`, clients in `data/clients.json`, globe dots `data/worldDots.json`
- Brand assets in `frontend/public/brand/` (logo-white/color(+mark).png generated from user logo, hero.jpg)
- Backend FastAPI: POST /api/enquiries/employer, POST /api/enquiries/candidate (multipart, resume ≤5MB PDF/DOC/DOCX stored in Mongo), GET /api/resumes/{id}

## Implemented (2026-11-11)
- Full single-page site, all 12 sections, active nav, mobile full-screen menu, count-up stats, service reveal + "Hire Manpower" prefill of employer form, bento industries, animated timeline, interactive globe, client list (58/9/4/4/5/3 names from live site), team placeholder, dual forms with validation → save → WhatsApp prefilled message (with ref + resume link), floating WhatsApp button, footer.

## Update (2026-11-11)
- Clients section replaced with 6 full-width infinite marquees (one per country; fixed label left; odd rows L→R, even rows R→L; pause on hover; reduced-motion = static scrollable row). File: components/site/ClientMarquee.jsx; old Clients.jsx removed.

## Needs confirmation from client
- Registration number: brief says B-100/BOM/PART/1000+/3/1224/1984; live site shows B-0100/BOM/PART/1000+/5/1224/84 (brief value used)
- Photo of Zainul Abedin Khan; company email; social accounts; client list final confirmation; stock photos to be replaced with real company photos

## Backlog
- P1: Private admin page to view saved enquiries & resumes
- P1: Email notification once an address is provided
- P2: Lighter hero image at higher resolution (current 1255px wide), SEO sitemap/JSON-LD
