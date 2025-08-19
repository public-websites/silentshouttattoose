# Silent Shout Tattoo Website

## Filstruktur (förenklad)

### För lokal utveckling:

- `index.html` - Ren HTML-fil (ingen Jekyll)
- `styles.css` - Alla stilar
- `script.js` - JavaScript
- Live Server plugin fungerar perfekt!

### För GitHub Pages:

- `index.md` - Jekyll-fil för GitHub Pages
- `_config.yml` - Jekyll konfiguration (om du vill anpassa)

### Backups:

- `index-backup.html` - Original HTML-backup
- `index-old-jekyll.html` - Gamla Jekyll-mixade versionen

## Utvecklingsflöde:

1. **Lokal utveckling**: Redigera `index.html` (ren HTML)
2. **Deploy till GitHub**: Kopiera ändringar till `index.md`
3. **Använd Live Server**: Fungerar perfekt med `index.html`

## Fördelar:

- ✅ Enkel lokal utveckling
- ✅ Fungerar med Live Server
- ✅ Inga Jekyll-konflikter
- ✅ GitHub Pages kompatibel
- ✅ Alla knappar har unified design

## Filer som togs bort:

- `index-jekyll.html` (onödig)
- `index-jekyll-fixed.html` (onödig)
- `jekyll-overrides.css` (flyttad till styles.css)
