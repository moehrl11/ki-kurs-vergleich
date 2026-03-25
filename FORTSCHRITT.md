# KI-Kurs-Vergleich.de — Fortschritt

## Infrastruktur
- [x] Astro + Tailwind v4 installiert (`site/nebulous-neptune/`)
- [x] railway.toml (Build + Start Commands)
- [x] nixpacks.toml (Node 23)
- [x] serve-Paket (0.0.0.0:$PORT)
- [x] Railway deployed & erreichbar
- [x] Custom Domain `ki-kurs-vergleich.de` verbunden
- [x] robots.txt
- [x] Sitemap (@astrojs/sitemap)

## Layout & Komponenten
- [x] BaseLayout.astro (Inter Font, OG Tags, Favicon, Google Analytics G-VY6H5CCPK7)
- [x] Header.astro (sticky, CSS-only Hamburger, Active State)
- [x] Footer.astro (dunkel, 3-spaltig, Link zu /unternehmen)
- [x] AffiliateCTA.astro
- [x] Open Graph Bild (og-image.svg, 1200×630)

## Seiten
- [x] index.astro (Homepage — "Dein Vergleich", du-Sprache, Trust-Bar, Ratgeber-Vorschau)
- [x] vergleich.astro (10 echte Kurse, Filter-Bar, Empfehlungsbox, Methodik-Text, Zuletzt geprüft)
- [x] ratgeber/index.astro (Übersichtsseite)
- [x] ratgeber/[...slug].astro (dynamische Artikel-Seite mit Sidebar)
- [x] foerderrechner.astro (JS-only, 3 Schritte, Ergebnis-Box)
- [x] quiz.astro (5 Fragen, Fortschrittsbalken, Empfehlungen auf echte Kurse)
- [x] ueber-uns.astro (Kontaktformular via Formspree xreyjdao)
- [x] unternehmen.astro (QCG-Förderübersicht, Kurse, Kontaktformular)
- [x] impressum.astro (Martin Morlock, Sophie-Scholl-Str. 23a, 84405 Dorfen)
- [x] datenschutz.astro

## Content
- [x] content.config.ts (Astro 6 Content Layer API)
- [x] ratgeber/ki-kurs-bildungsgutschein.md
- [x] ratgeber/ki-lernen-einsteiger.md
- [x] ratgeber/ki-weiterbildung-quereinsteiger.md
- [x] ratgeber/chatgpt-kurs-vergleich.md
- [x] ratgeber/ki-weiterbildung-kostenlos.md
- [x] ratgeber/ki-kurs-ohne-vorkenntnisse.md
- [ ] Weitere Ratgeber-Artikel (EU AI Act, KI-Zertifikate im Vergleich)

## SEO & Tracking
- [x] Google Search Console verifiziert
- [x] Google Analytics eingebunden (G-VY6H5CCPK7)
- [x] Sitemap unter /sitemap-index.xml
- [x] Sitemap in Google Search Console einreichen

## Monetarisierung
- [ ] AWIN anmelden (IU Akademie + Udemy — schnellste Genehmigung)
- [ ] Direkte Affiliate-Anfragen: SkillSprinters, WBS, neue fische, Hilker, XDi, Haufe
- [ ] Affiliate-Links in vergleich.astro eintragen sobald freigeschaltet
- [x] Affiliate-Badge entfernt — wird erst wieder eingeblendet wenn echter Affiliate-Link aktiv ist

---

## 🔴 Sofort — diese Woche

- [x] Vergleichsseite: Bewertungsmethodik ergänzt
- [x] Vergleichsseite: "Zuletzt geprüft"-Datum bei jedem Kurs
- [x] Homepage/Vergleich: Claim auf "Dein Vergleich für KI-Weiterbildungen" angepasst
- [x] Impressum: E-Mail vorhanden — reicht laut § 5 TMG aus

## 🟡 Mittelfristig — nächste 2 Wochen

- [ ] Affiliate-Badge pro Kurs wieder einblenden sobald echter Affiliate-Link aktiv ist (nach AWIN-Freischaltung)
- [ ] Vergleichsseite: Mehr Tiefe pro Kurs (Praxisanteil, Dozenten, Rückgabe, Probelek­tion)

## 🟢 Langfristig

- [ ] Changelog-Seite einführen (wann welche Kurse aktualisiert wurden)
- [ ] Kurse auf 20–30 erweitern
