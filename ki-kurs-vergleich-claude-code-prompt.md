# KI-Kurs-Vergleich.de — Bauanleitung für Claude Code

## Projektkontext

Ich baue ein deutsches KI-Weiterbildungs-Vergleichsportal namens **KI-Kurs-Vergleich.de**.

**Ziel:** Nutzer finden den richtigen KI-Kurs — das Portal verdient über Affiliate-Links und Lead-Vermittlung.

**Stack:**
- Frontend: Astro + Tailwind CSS (bereits installiert in `/site`)
- Deployment: Railway (über GitHub verbunden)
- Content: Markdown-Dateien in `/site/src/content/ratgeber/`
- Server: Node.js Static File Server

**Design:**
- Primary: `#2563EB` (Blau)
- Accent: `#10B981` (Grün)
- Background: `#F9FAFB`
- Text: `#111827`
- Stil: Klar, seriös, vertrauenswürdig — kein buntes Startup-Design
- Schrift: System-UI oder Inter

---

## Was bereits existiert

```
ki-kurs-vergleich/
├── site/                  ← Astro ist hier bereits installiert
│   ├── src/
│   │   └── pages/
│   │       └── index.astro  ← Nur Placeholder, wird ersetzt
│   ├── package.json
│   ├── astro.config.mjs
│   └── tailwind.config.mjs
└── railway.toml           ← Muss erstellt/aktualisiert werden
```

---

## Was gebaut werden soll

### Komplette Ordnerstruktur (Zielzustand)

```
ki-kurs-vergleich/
│
├── site/
│   ├── src/
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro
│   │   ├── components/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── KursCard.astro
│   │   │   ├── VergleichsTabelle.astro
│   │   │   └── AffiliateCTA.astro
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── vergleich.astro
│   │   │   ├── ratgeber/
│   │   │   │   └── [...slug].astro
│   │   │   ├── foerderrechner.astro
│   │   │   ├── quiz.astro
│   │   │   ├── ueber-uns.astro
│   │   │   └── impressum.astro
│   │   └── content/
│   │       ├── config.ts
│   │       └── ratgeber/
│   │           └── beispiel-artikel.md
│   ├── public/
│   │   └── robots.txt
│   ├── server.js
│   ├── package.json
│   ├── astro.config.mjs
│   └── tailwind.config.mjs
│
├── generator/
│   ├── keywords.json
│   └── master_prompt.md
│
└── railway.toml
```

---

## Datei für Datei — exakte Anforderungen

---

### railway.toml

```toml
[build]
builder = "nixpacks"
buildCommand = "cd site && npm install && npm run build"

[deploy]
startCommand = "cd site && node server.js"
healthcheckPath = "/"
healthcheckTimeout = 30
restartPolicyType = "on_failure"
```

---

### site/server.js

Einfacher Node.js HTTP-Server ohne externe Dependencies.

**Anforderungen:**
- Liest `process.env.PORT` — Railway setzt diesen Wert automatisch
- Liefert alle Dateien aus dem `dist/` Ordner aus
- Unterstützt Clean URLs: `/ratgeber/artikel` → `/ratgeber/artikel/index.html`
- Korrekte MIME-Types für html, css, js, json, png, jpg, svg, ico, txt, xml
- 404-Fallback auf `dist/404.html` falls vorhanden
- Fallback auf einfaches `<h1>404</h1>` falls keine 404.html existiert
- Console.log beim Start: welcher Port

---

### site/astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ki-kurs-vergleich.de',
  integrations: [
    tailwind(),
    sitemap(),
  ],
});
```

---

### site/src/content/config.ts

Content Collection für Ratgeber-Artikel definieren:

```typescript
import { defineCollection, z } from 'astro:content';

const ratgeber = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    slug: z.string(),
    kategorie: z.string().default('ratgeber'),
    lesezeit: z.string().optional(),
  }),
});

export const collections = { ratgeber };
```

---

### site/src/layouts/BaseLayout.astro

**Props:** `title`, `description`

**Aufbau:**
- `<html lang="de">`
- `<head>` mit: charset, viewport, title, meta description, Open Graph Tags, Google Fonts (Inter), Favicon Placeholder
- `<body>` mit: `<Header />`, `<slot />`, `<Footer />`
- Globale CSS-Variablen als `:root` Variablen

---

### site/src/components/Header.astro

**Aufbau:**
- Sticky Header mit weißem Hintergrund und leichtem Schatten
- Links: Logo "KI-Kurs-Vergleich.de" in Blau (#2563EB), fett
- Rechts: Navigation mit diesen Links:
  - Kurse vergleichen → `/vergleich`
  - Ratgeber → `/ratgeber`  (noch kein Dropdown)
  - Förderrechner → `/foerderrechner`
  - Quiz → `/quiz`
- Mobile: Hamburger-Menü (reines CSS, kein JS nötig)
- Active-State: aktueller Link unterstrichen oder in Blau

---

### site/src/components/Footer.astro

**Aufbau:**
- Dunkler Hintergrund (#111827), weißer Text
- Links: Kurze Beschreibung "Unabhängiger Vergleich für KI-Weiterbildungen in Deutschland"
- Mitte: Links (Vergleich, Ratgeber, Förderrechner)
- Rechts: Rechtliches (Impressum, Datenschutz, Über uns)
- Ganz unten: "© 2025 KI-Kurs-Vergleich.de — Unabhängig & kostenlos"

---

### site/src/pages/index.astro (Homepage)

**Sektion 1 — Hero:**
- Großes H1: "Der unabhängige Vergleich für KI-Weiterbildungen in Deutschland"
- Subtext: "Finde den richtigen KI-Kurs — gefördert, zertifiziert, praxisnah. Kostenlos und unabhängig."
- Zwei Buttons:
  - Primary (Blau): "Kurse vergleichen →" → `/vergleich`
  - Secondary (Outline): "Welcher Kurs passt zu mir?" → `/quiz`
- Hintergrund: Leichter blauer Gradient oder weißer Hintergrund mit Akzenten

**Sektion 2 — Trust-Bar:**
- Drei Icons mit Text nebeneinander:
  - ✓ Über 20 Kurse verglichen
  - ✓ Bildungsgutschein-fähige Angebote
  - ✓ Unabhängig & kostenlos
- Hellgrauer Hintergrund, dezent

**Sektion 3 — Drei Einstiegswege (Cards):**

Card 1 — Ich weiß was ich will:
- Icon: 🎯
- Titel: "Kurse vergleichen"
- Text: "Sieh alle KI-Kurse auf einen Blick und filtere nach Förderung, Preis und Zertifikat."
- Button: "Zum Vergleich →" → `/vergleich`

Card 2 — Ich brauche Orientierung:
- Icon: 🧭
- Titel: "Kurs-Finder Quiz"
- Text: "Beantworte 5 Fragen und bekomme deine persönliche Kursempfehlung."
- Button: "Quiz starten →" → `/quiz`

Card 3 — Für Unternehmen:
- Icon: 🏢
- Titel: "Team schulen"
- Text: "Sie möchten mehrere Mitarbeiter schulen? Wir finden das passende Angebot."
- Button: "Anfrage senden →" → `/ueber-uns`

**Sektion 4 — Warum KI-Weiterbildung jetzt:**
- Kurzer Infoblock: "Seit Februar 2025 gilt der EU AI Act. Unternehmen sind verpflichtet, Mitarbeiter die mit KI arbeiten entsprechend zu schulen."
- Grüner Hintergrund-Akzent, auffällig aber nicht aufdringlich

**Sektion 5 — Letzte Ratgeber-Artikel:**
- H2: "Ratgeber & Tipps"
- Zeigt die 3 neuesten Artikel aus der Content Collection
- Falls keine Artikel vorhanden: Placeholder-Cards mit Dummy-Titeln
- "Alle Ratgeber →" Link

---

### site/src/pages/vergleich.astro (Vergleichsseite)

**Die wichtigste Seite — hier werden Affiliate-Links geklickt.**

**Header der Seite:**
- H1: "KI-Kurse im Vergleich 2025"
- Subtext: "20+ Kurse verglichen — gefördert, zertifiziert, für jeden Einstiegslevel"

**Filter-Leiste (reines CSS/HTML, kein Backend):**
- Zielgruppe: Alle | Einsteiger | Fortgeschrittene | Führungskräfte
- Förderbar: Alle | Nur förderbare Kurse
- Format: Alle | Online | Präsenz | Hybrid
- Preis: Alle | Kostenlos | bis 500€ | bis 2.000€ | über 2.000€

**Vergleichstabelle mit diesen 6 Beispielkursen (Placeholder-Daten):**

| Kurs | Anbieter | Preis | Dauer | Zertifikat | Förderbar | Für wen |
|---|---|---|---|---|---|---|
| KI-Manager Grundlagen | Haufe Akademie | 890€ | 2 Tage | IHK | ✅ Ja | Führungskräfte |
| ChatGPT für den Berufsalltag | Online-Kurs | 199€ | Selbststudium | Teilnahme | ❌ Nein | Einsteiger |
| Certified AI Professional | XDi | 1.490€ | 2 Tage | Zertifikat | ✅ Ja | Fortgeschrittene |
| KI-Manager (Fernstudium) | IU Hochschule | 1.200€ | 6 Monate | Hochschule | ✅ Ja | Quereinsteiger |
| Prompt Engineering | Udemy | 19€ | Selbststudium | Keins | ❌ Nein | Einsteiger |
| KI im Marketing | Coursera | 49€/Monat | Flexibel | Coursera | ❌ Nein | Marketing |

**Spalten der Tabelle:**
- Kursname (fett)
- Anbieter
- Preis
- Dauer
- Zertifikat
- Förderbar (✅ oder ❌)
- Für wen (Badge)
- Button: "Zum Kurs →" (Blau, Affiliate-Link Placeholder: `#`)

**Empfehlungs-Box:**
- Sticky oder prominent oben: "🏆 Unsere Top-Empfehlung für Einsteiger: ChatGPT für den Berufsalltag — günstig, sofort startbereit"

**Hinweis-Text unten:**
- Klein, grau: "* Affiliate-Hinweis: Wir erhalten eine Provision wenn du über unsere Links buchst. Das hat keinen Einfluss auf unsere Bewertungen."

---

### site/src/pages/ratgeber/[...slug].astro

Dynamische Seite die alle Markdown-Artikel aus der Content Collection rendert.

**Aufbau:**
- BaseLayout mit Titel und Description aus Frontmatter
- Artikel-Header: Titel, Datum, Lesezeit
- Artikel-Inhalt: `<Content />` Komponente
- Seitenleiste (optional): "Das könnte dich auch interessieren" mit 2-3 anderen Artikeln
- Am Ende immer: AffiliateCTA Komponente mit "→ Jetzt KI-Kurse vergleichen"

---

### site/src/components/AffiliateCTA.astro

Wiederverwendbare Call-to-Action Box.

**Props:** `text` (optional, hat Default-Wert)

**Aussehen:**
- Blauer Hintergrund (#2563EB)
- Weißer Text
- Titel: "Bereit für deinen KI-Kurs?"
- Text: prop oder Default "Vergleiche jetzt die besten KI-Kurse in Deutschland — kostenlos und unabhängig."
- Button: "Kurse vergleichen →" (weiß, auf Blau)

---

### site/src/pages/foerderrechner.astro (Förderrechner)

**Reines JavaScript — kein Backend nötig.**

**H1:** "KI-Kurs Förderrechner"
**Subtext:** "Finde heraus wie viel Förderung du für deinen KI-Kurs bekommen kannst"

**Schritt-für-Schritt Formular:**

Schritt 1 — Situation:
```
Was beschreibt deine aktuelle Situation?
○ Ich bin angestellt
○ Ich bin arbeitssuchend
○ Ich bin selbstständig / Freelancer
○ Mein Unternehmen zahlt
```

Schritt 2 — (Nur wenn angestellt) Betriebsgröße:
```
Wie groß ist dein Unternehmen?
○ Unter 10 Mitarbeiter
○ 10 bis 249 Mitarbeiter
○ 250 oder mehr Mitarbeiter
```

Schritt 3 — Gewünschter Kurs-Preis:
```
Was darf der Kurs maximal kosten?
○ Kostenlos
○ bis 500€
○ bis 2.000€
○ Über 2.000€ wenn gefördert
```

**Ergebnis-Box (erscheint nach Ausfüllen):**
- Grüner Hintergrund
- Titel: "Deine voraussichtlichen Fördermöglichkeiten:"
- Liste mit Checkmarks:
  - ✅ Qualifizierungschancengesetz: bis zu 100% Förderung (wenn angestellt)
  - ✅ Bildungsgutschein: bis zu 2.400€ (wenn arbeitssuchend)
  - ✅ KOMPASS-Förderung für Selbstständige (wenn freelancer)
- Hinweis: "Dies sind Orientierungswerte. Die genaue Förderung hängt von deiner individuellen Situation ab."
- Button: "Geförderte Kurse ansehen →" → `/vergleich`

**Wichtig:** Kein Backend, alles mit JavaScript `if/else` Logik im Browser.

---

### site/src/pages/quiz.astro (Kurs-Finder)

**Reines JavaScript — kein Backend.**

**H1:** "Welcher KI-Kurs passt zu dir?"
**Subtext:** "5 Fragen — deine persönliche Kursempfehlung"

**Fortschrittsbalken:** Zeigt Schritt 1/5, 2/5 etc.

**Frage 1 — Beruf:**
```
Was beschreibt deinen Beruf am besten?
○ Marketing / Kommunikation
○ IT / Entwicklung  
○ Management / Führung
○ HR / Personal
○ Anderes / Quereinsteiger
```

**Frage 2 — KI-Erfahrung:**
```
Wie viel Erfahrung hast du mit KI?
○ Null — ich fange bei 0 an
○ Ich kenne ChatGPT
○ Ich nutze KI-Tools im Joballtag
○ Ich habe technisches Vorwissen
```

**Frage 3 — Zeit:**
```
Wie viel Zeit kannst du investieren?
○ 1-2 Tage (Kompaktkurs)
○ 4-8 Wochen (berufsbegleitend)
○ 3-6 Monate (intensiv)
```

**Frage 4 — Budget:**
```
Was ist dein Budget?
○ Kostenlos oder vollständig gefördert
○ bis 500€ selbst bezahlt
○ Mein Arbeitgeber / Unternehmen zahlt
```

**Frage 5 — Ziel:**
```
Was ist dein Hauptziel?
○ KI im Job effizient nutzen
○ KI-Zertifikat für den Lebenslauf
○ Karrierewechsel in Richtung KI
○ Mein Team schulen
```

**Ergebnis (basierend auf Antworten, simple if/else Logik):**

Beispiel-Logik:
- Einsteiger + wenig Zeit + wenig Budget → "ChatGPT Grundlagenkurs"
- Marketing + mittel → "KI im Marketing — Haufe Akademie"
- Führungskraft + Budget vorhanden → "KI-Manager IHK Zertifikat"
- Quereinsteiger + viel Zeit → "KI-Manager Fernstudium IU"

Ergebnis-Box:
- Kursname (fett)
- Kurze Begründung warum dieser Kurs
- Button: "Kurs ansehen →" → `/vergleich`
- Link: "Alle Kurse vergleichen →"

---

### site/src/pages/ueber-uns.astro

**Kurze, ehrliche Seite.**

**H1:** "Über KI-Kurs-Vergleich.de"

**Text:**
- Wer steckt dahinter: Unabhängiges Portal, kein Kursanbieter
- Wie wir Geld verdienen: Transparenter Hinweis auf Affiliate-Links
- Unser Versprechen: Unabhängige Bewertungen unabhängig von Provisionen

**B2B Kontaktformular:**
```
Headline: "KI-Schulung für Ihr Unternehmen?"
Subtext: "Wir helfen Ihnen das passende Angebot für Ihr Team zu finden."

Felder:
- Name (required)
- E-Mail geschäftlich (required)
- Unternehmen (required)
- Anzahl Mitarbeiter (Dropdown: 1-5 | 6-20 | 21-50 | 50+)
- Nachricht (optional)
- Button: "Anfrage senden"
```

**Formular-Action:** `https://formspree.io/f/PLACEHOLDER` (Placeholder — wird später durch echte Formspree ID ersetzt)

---

### site/src/pages/impressum.astro

**Pflichtseite für Deutschland.**

Placeholder-Impressum mit diesem Text:

```
Angaben gemäß § 5 TMG

[Name]
[Straße]
[PLZ Ort]

Kontakt:
E-Mail: kontakt@ki-kurs-vergleich.de

Hinweis: Diese Seite befindet sich im Aufbau.
Das vollständige Impressum wird in Kürze ergänzt.
```

---

### site/src/content/ratgeber/beispiel-artikel.md

Ein vollständiger Beispiel-Artikel damit die dynamischen Seiten funktionieren:

```markdown
---
title: "KI Kurs mit Bildungsgutschein: So bekommst du bis zu 100% Förderung"
description: "Alles zur Förderung von KI-Kursen über Bildungsgutschein, Qualifizierungschancengesetz und weitere Programme. Mit Schritt-für-Schritt Anleitung."
date: "2025-03-01"
slug: "ki-kurs-bildungsgutschein"
kategorie: "ratgeber"
lesezeit: "7 Minuten"
---

Wusstest du, dass du einen KI-Kurs in vielen Fällen komplett kostenlos absolvieren kannst?
Über verschiedene staatliche Förderprogramme ist das für viele Berufstätige und Arbeitssuchende möglich.

## Was ist der Bildungsgutschein?

Der Bildungsgutschein ist ein Förderinstrument der Agentur für Arbeit...

## Wer hat Anspruch?

Grundsätzlich können folgende Personengruppen einen Bildungsgutschein erhalten...

## Schritt-für-Schritt: So beantragst du die Förderung

1. Termin bei der Agentur für Arbeit vereinbaren
2. Beratungsgespräch führen
3. Kurs auswählen (muss AZAV-zertifiziert sein)
4. Bildungsgutschein einreichen
5. Kurs starten

## Worauf du bei der Kursauswahl achten solltest

Nicht jeder KI-Kurs ist über Bildungsgutschein förderbar. Der Kurs muss AZAV-zertifiziert sein...

## Fazit

Mit dem richtigen Vorgehen kannst du einen hochwertigen KI-Kurs kostenlos absolvieren.

→ [Jetzt geförderte KI-Kurse vergleichen](/vergleich)
```

---

### site/public/robots.txt

```
User-agent: *
Allow: /
Sitemap: https://ki-kurs-vergleich.de/sitemap.xml
```

---

### generator/keywords.json

```json
[
  {
    "slug": "ki-kurs-bildungsgutschein",
    "keyword": "KI Kurs mit Bildungsgutschein",
    "priority": 1,
    "status": "done"
  },
  {
    "slug": "ki-weiterbildung-quereinsteiger",
    "keyword": "KI Weiterbildung für Quereinsteiger",
    "priority": 2,
    "status": "pending"
  },
  {
    "slug": "eu-ai-act-schulungspflicht",
    "keyword": "EU AI Act Schulungspflicht Unternehmen",
    "priority": 3,
    "status": "pending"
  },
  {
    "slug": "chatgpt-kurs-vergleich",
    "keyword": "ChatGPT Kurs Deutsch Vergleich",
    "priority": 4,
    "status": "pending"
  },
  {
    "slug": "ki-manager-zertifikat",
    "keyword": "KI Manager Zertifikat IHK Vergleich",
    "priority": 5,
    "status": "pending"
  },
  {
    "slug": "prompt-engineering-kurse",
    "keyword": "Prompt Engineering Kurs Deutsch",
    "priority": 6,
    "status": "pending"
  },
  {
    "slug": "ki-weiterbildung-kostenlos",
    "keyword": "KI Weiterbildung kostenlos",
    "priority": 7,
    "status": "pending"
  },
  {
    "slug": "ki-kurs-ohne-vorkenntnisse",
    "keyword": "KI Kurs ohne Vorkenntnisse",
    "priority": 8,
    "status": "pending"
  },
  {
    "slug": "ki-weiterbildung-marketing",
    "keyword": "KI Weiterbildung Marketing",
    "priority": 9,
    "status": "pending"
  },
  {
    "slug": "azav-zertifizierte-ki-kurse",
    "keyword": "AZAV zertifizierte KI Kurse",
    "priority": 10,
    "status": "pending"
  }
]
```

---

### generator/master_prompt.md

Vorlage die später für die automatische Artikel-Generierung genutzt wird:

```markdown
Du bist ein SEO-Experte und Texter für ein deutsches KI-Weiterbildungsportal.

Schreibe einen umfassenden, hilfreichen Artikel über: [KEYWORD]

REGELN:
- Sprache: Deutsch, Du-Form, freundlich aber professionell
- Länge: 1200-1500 Wörter
- Keine erfundenen Statistiken
- Am Ende immer CTA zur Vergleichsseite
- Kein generischer KI-Text — schreib wie ein Mensch

FRONTMATTER (exakt so):
---
title: "[H1-Titel mit Keyword]"
description: "[Meta-Description, 150-160 Zeichen]"
date: "[DATUM]"
slug: "[SLUG]"
kategorie: "ratgeber"
lesezeit: "[X Minuten]"
---

STRUKTUR:
## [Problem/Frage des Lesers aufgreifen]
[Einleitung 100-150 Wörter]

## Was du wissen musst
[Grundlagen 200-250 Wörter]

## [Kernfrage beantworten]
[Hauptteil 300-400 Wörter]

## Worauf du bei der Auswahl achten solltest
[3-5 Kriterien als Liste, 200-250 Wörter]

## Häufige Fehler vermeiden
[2-3 Fehler, 150-200 Wörter]

## Fazit
[Zusammenfassung + CTA, 100-150 Wörter]
[→ Jetzt die besten KI-Kurse vergleichen](/vergleich)
```

---

## Reihenfolge der Umsetzung

Bitte in genau dieser Reihenfolge vorgehen:

1. `railway.toml` im Root erstellen
2. `site/server.js` erstellen
3. `site/astro.config.mjs` aktualisieren
4. `site/src/content/config.ts` erstellen
5. `site/src/layouts/BaseLayout.astro` erstellen
6. `site/src/components/Header.astro` erstellen
7. `site/src/components/Footer.astro` erstellen
8. `site/src/components/AffiliateCTA.astro` erstellen
9. `site/src/components/KursCard.astro` erstellen
10. `site/src/pages/index.astro` erstellen
11. `site/src/pages/vergleich.astro` erstellen
12. `site/src/pages/ratgeber/[...slug].astro` erstellen
13. `site/src/content/ratgeber/beispiel-artikel.md` erstellen
14. `site/src/pages/foerderrechner.astro` erstellen
15. `site/src/pages/quiz.astro` erstellen
16. `site/src/pages/ueber-uns.astro` erstellen
17. `site/src/pages/impressum.astro` erstellen
18. `site/public/robots.txt` erstellen
19. `generator/keywords.json` erstellen
20. `generator/master_prompt.md` erstellen

---

## Erfolgskriterien

Das Projekt ist fertig wenn:

- [ ] `cd site && npm run dev` startet ohne Fehler
- [ ] Homepage unter `localhost:4321` sichtbar
- [ ] Vergleichsseite unter `localhost:4321/vergleich` sichtbar
- [ ] Beispiel-Artikel unter `localhost:4321/ratgeber/ki-kurs-bildungsgutschein` sichtbar
- [ ] Förderrechner unter `localhost:4321/foerderrechner` funktioniert (ohne Backend)
- [ ] Quiz unter `localhost:4321/quiz` funktioniert (ohne Backend)
- [ ] `cd site && npm run build` baut ohne Fehler
- [ ] `node server.js` startet den Server auf Port 3000

---

## Was NICHT gebaut werden soll

- Keine Datenbank
- Kein Login
- Kein eigenes Backend / API
- Kein Newsletter-System
- Keine automatische Bildgenerierung
- Kein Python Generator (kommt später separat)

---

*KI-Kurs-Vergleich.de — Unabhängiger Vergleich für KI-Weiterbildungen in Deutschland*
