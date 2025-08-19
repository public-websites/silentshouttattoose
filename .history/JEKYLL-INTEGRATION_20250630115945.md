# Silent Shout + Jekyll Integration

Denna lösning kombinerar din Silent Shout webbplats med Jekyll/GitHub Pages funktionalitet.

## Filer som skapats:

### 1. `index-jekyll.html` 
Den huvudsakliga template-filen som kombinerar:
- Jekyll template-struktur med Liquid tags
- Din kompletta Silent Shout design och innehåll
- Kompatibilitet med GitHub Pages

### 2. `jekyll-overrides.css`
Separat CSS-fil som hanterar konflikter mellan Jekyll och Silent Shout styling.

### 3. Uppdaterad `styles.css`
Din befintliga CSS med Jekyll overrides tillagda i början.

## Viktiga funktioner:

### Jekyll-kompatibilitet:
- `{{ site.title }}` - Hämtar titel från _config.yml
- `{{ page.title }}` - Hämtar sidtitel från frontmatter
- `{{ content }}` - Plats för dynamiskt innehåll
- SEO-tags med `{% seo %}`
- Conditional Jekyll footer

### Silent Shout-funktionalitet:
- All din befintliga design bevarad
- Formulär och JavaScript fungerar som tidigare
- Animationer och GIF:ar fungerar normalt
- Responsiv design intakt

### Konflikthantering:
- Jekyll header dold som standard
- CSS overrides förhindrar styling-konflikter
- Accessibility-funktioner bevarade
- Skip links för tillgänglighet

## Användning:

### För GitHub Pages:
1. Byt namn på `index-jekyll.html` till `index.html`
2. Lägg till `_config.yml` med dina inställningar:
```yaml
title: "Silent Shout - Den omtänksamma studion"
description: "Tatueringsstudio i Alingsås"
lang: sv
footer: true  # Visa Jekyll footer om önskat
```

### För lokal utveckling:
- Använd `index-jekyll.html` som mall
- Kör med Jekyll serve för att testa

### Anpassningar:
- Ändra `style="display: none;"` till `style="display: block;"` på Jekyll header om du vill visa den
- Modifiera Jekyll footer genom att ändra `{% if site.footer %}` villkoret
- Lägg till ytterligare Jekyll templates enligt behov

## Fördelar med denna lösning:

1. **Bevarar din design**: All Silent Shout styling och funktionalitet kvarstår
2. **Jekyll-kompatibel**: Fungerar med GitHub Pages och Jekyll build
3. **SEO-optimerad**: Använder Jekyll SEO plugin
4. **Flexibel**: Kan enkelt anpassas för olika behov
5. **Tillgänglig**: Behåller accessibility-funktioner
6. **Underhållsbar**: Tydlig separation mellan Jekyll och Silent Shout kod

## Nästa steg:

1. Testa den kombinerade lösningen lokalt
2. Anpassa `_config.yml` efter dina behov
3. Ladda upp till GitHub Pages repository
4. Verifiera att allt fungerar korrekt online

Kontakta mig om du behöver hjälp med något av stegen!
