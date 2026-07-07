# Denviouse UGC — Website

Statische One-Page-Website für Denise Heimberger (Denviouse UGC). Kein Build-Prozess nötig – reines HTML/CSS/JS.

## Projektstruktur

```
.
├── index.html              Hauptseite (Startseite + Impressum/Datenschutz als Modals)
├── assets/
│   ├── css/style.css       Gesamtes Stylesheet
│   ├── js/main.js          Nav-Scroll-State, Scroll-Reveal, Legal-Modals inkl. Fokus-Management
│   └── img/                Alle Bilder als WebP + Favicons (ico/png)
├── robots.txt               Crawler-Steuerung, verweist auf sitemap.xml
├── sitemap.xml               Für Google Search Console / Indexierung
└── vercel.json                Cache-Header für /assets
```

## Lokal testen

Einfach `index.html` per Doppelklick öffnen, oder für ein realistischeres Setup (empfohlen, damit relative Pfade & mailto-Handler sich wie live verhalten):

```
npx serve .
```

## Deployment auf Vercel

1. Repo auf GitHub pushen (kompletten Ordnerinhalt, inkl. `assets/`)
2. In Vercel: "New Project" → Repo auswählen → Framework Preset: **Other / Static**
3. Deploy — es ist kein Build-Command nötig, Output-Verzeichnis ist das Root-Verzeichnis
4. Domain `www.denviouse-ugc.at` unter Project Settings → Domains verbinden

## Wichtig bei zukünftigen Bild-Updates

Die Dateien unter `/assets/img/` werden von Vercel/Browsern **ein Jahr lang unveränderlich gecacht** (siehe `vercel.json`). Wird ein Bild ausgetauscht, **muss der Dateiname geändert werden** (z. B. `hero-denise.webp` → `hero-denise-v2.webp` + Referenz in `index.html` anpassen), sonst sehen wiederkehrende Besucher das alte Bild weiterhin aus dem Cache.

## Google Search Console

Nach dem Livegang:
1. Domain in Google Search Console verifizieren
2. `sitemap.xml` einreichen (`https://www.denviouse-ugc.at/sitemap.xml`)
3. Indexierung der Startseite manuell anstoßen ("URL-Prüfung" → "Indexierung beantragen")

## Vor dem Livegang noch offen

Siehe Checkliste im Chat-Verlauf (Abschnitt "Produktions-Checkliste") für alle manuell zu erledigenden Punkte (Hosting-Anbieter final festlegen, rechtlicher Gegencheck, Domain-DNS, etc.).
