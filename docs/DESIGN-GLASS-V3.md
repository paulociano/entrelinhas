# Visual refinement: Entrelinhas editorial glass v3

## Scope
Frontend-only redesign. No database, authentication, API keys, or persistence changes.

## Visual system
- Forest/petroleum background, warm copper highlights, cream typography.
- Selective glass surfaces, translucency and backdrop blur for header, search, laboratory, stats, details, and backup.
- Multi-layer shadows, ambient light, cover depth, and gentle hover lift.
- Motion for initial hero, hover, modal entry, and mobile drawer.
- Scroll-aware sticky glass header with stronger depth on scroll.
- Mobile bottom nav fitted for four destinations.

## Acceptance
- [x] Existing screen classes and structure preserved.
- [x] Glass design with solid-color fallback for reduced-transparency users.
- [x] Motion minimized for prefers-reduced-motion.
- [x] Keyboard focus indications retained.
- [x] No new external animation library or backend.
- [ ] Validate color contrast and layout on real devices.
- [ ] Confirm latest GitHub Actions Build, Browser journeys, and Deploy statuses.

## Known tradeoffs
Backdrop filters and shadows may require profiling on lower-end devices. Hover does not replace keyboard interactions. Image assets and existing logo are unchanged.
