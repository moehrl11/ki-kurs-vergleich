# KI-Kurs-Vergleich.de — Fortschritt

## Infrastruktur
- [x] Astro + Tailwind v4 installiert (`site/nebulous-neptune/`)
- [x] railway.toml (Build + Start Commands)
- [x] nixpacks.toml (Node 23)
- [x] server.js via `serve`-Paket
- [x] Railway deployed & erreichbar
- [x] Custom Domain `ki-kurs-vergleich.de` verbunden
- [x] robots.txt

## Layout & Komponenten
- [x] BaseLayout.astro (Inter Font, OG Tags, Favicon)
- [x] Header.astro (sticky, CSS-only Hamburger, Active State)
- [x] Footer.astro (dunkel, 3-spaltig)
- [x] AffiliateCTA.astro
- [x] KursCard.astro

## Seiten
- [x] index.astro (Homepage — vereinfacht, noch nicht finale Spec)
- [x] vergleich.astro (3 Kurse — noch nicht finale Spec mit 6 Kursen + Filter)
- [x] ratgeber/[...slug].astro (dynamische Artikel-Seite)
- [x] ratgeber/index.astro (Übersichtsseite)
- [x] foerderrechner.astro (JS-only, 3 Schritte, Ergebnis-Box)
- [x] quiz.astro (5 Fragen, Fortschrittsbalken, if/else Empfehlung)
- [x] ueber-uns.astro (B2B Formular via Formspree — Placeholder ID)
- [x] impressum.astro
- [x] datenschutz.astro

## Content
- [x] content.config.ts (Astro 6 Content Layer API)
- [x] ratgeber/ki-kurs-bildungsgutschein.md (Beispielartikel)
- [ ] Weitere Ratgeber-Artikel (Keywords in generator/keywords.json)

## Noch zu updaten
- [ ] index.astro → auf finale Spec (6 Sektionen, Trust-Bar, EU AI Act Block, Ratgeber-Vorschau)
- [ ] vergleich.astro → 6 Kurse, Filter-Leiste, Empfehlungsbox, Affiliate-Hinweis

## Generator
- [ ] generator/keywords.json
- [ ] generator/master_prompt.md

## Sonstiges
- [x] ki-kurs-vergleich-claude-code-prompt.md (Projektspec)
