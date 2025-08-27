# Silent Shout Tattoo Website

Ett professionellt tatueringsstudio i Alingsås med egen webbsida som inkluderar kontaktformulär och portfoliopresentation.

## 🏗️ Projektöversikt

### Teknisk Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript
- **Hosting:** GitHub Pages
- **E-post:** EmailJS för formulärhantering
- **Deployment:** Git-baserat deployment till GitHub Pages

### Huvudfunktioner
- ✅ Responsiv design
- ✅ Två anpassade kontaktformulär (tatuering & konst)
- ✅ EmailJS integration för riktiga e-postmeddelanden
- ✅ Smooth scrolling navigation
- ✅ Instagram & sociala medier integration
- ✅ SEO-optimerad struktur

## 📁 Filstruktur

```
├── index.html              # Huvudsidan
├── styles.css              # Alla stilar och responsiv design
├── script.js               # JavaScript funktionalitet & EmailJS
├── .nojekyll              # Inaktiverar Jekyll på GitHub Pages
├── profile.jpg            # Profilbild
├── konstjobb.jpg          # Portfolio bilder
├── studio_entre.jpeg      # Hero section bakgrund
├── silentshouttattoo-*.svg # Logotyper (outline, infill variants)
└── README.md              # Detta dokument
```

## 🚀 Utveckling

### Lokalt
1. Klona repot
2. Öppna `index.html` i Live Server (VS Code extension)
3. Gör ändringar direkt i HTML/CSS/JS filerna
4. Testa i webbläsare

### Deploy till Production
```bash
# Committa ändringar till dev branch
git add .
git commit -m "Beskrivning av ändringar"

# Pusha till GitHub Pages
git push pages dev:main
```

## 📧 EmailJS Konfiguration

### Aktuella Inställningar
- **Service ID:** `service_fxu5ad2`
- **Template ID (Tatuering):** `template_qwxplyf`
- **Template ID (Konst):** `template_gxs76jx`
- **Public Key:** `WsHBts0w-GfnSxrE3`
- **Destination:** `silentshouttattoo@gmail.com`

### Formulärvalidering
- **Obligatoriska fält:** Namn, Telefon, Integritetspolicy
- **Valfria fält:** E-post, Meddelande
- **Checkbox färg:** Orange (#B9823D) för konsistens

## 🎨 Design System

### Färgpalett
```css
--primary-dark: #2F3A0E    /* Mörkgrön */
--primary-light: #77772F   /* Ljusgrön */
--accent: #B9823D          /* Orange/brons */
--light: #E0D2BC           /* Beige */
```

### Typografi
- **Huvudfont:** System fonts (fallback till sans-serif)
- **Accent font:** Reenie Beanie (Google Fonts)

### Komponenter
- **Formulär:** Två separata templates med toggle-funktionalitet
- **Navigation:** Smooth scroll till sektioner
- **Knappar:** Enhetlig styling med hover-effekter
- **Responsiv:** Mobile-first approach

## 🔧 Git Workflow

### Branches
- **`dev`:** Utvecklingsbranch (primär arbetsgren)
- **`main`:** Production branch (GitHub Pages källa)

### Remotes
- **`origin`:** Privat utvecklingsrepo
- **`pages`:** Public GitHub Pages repo

### Deployment Command
```bash
git push pages dev:main --force
```

## 📱 Responsiv Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

### Anpassningar
- Navigation kollapsar på mobil
- Formulär stackas vertikalt
- Bilder skalas responsivt
- Touch-friendly knappar

## 🐛 Vanliga Problem & Lösningar

### GitHub Pages visar 404
**Problem:** Jekyll försöker bygga sidan
**Lösning:** `.nojekyll` fil finns för att inaktivera Jekyll

### EmailJS fungerar inte lokalt
**Problem:** CORS-policy från lokala filer
**Lösning:** Använd Live Server eller testa på live-sidan

### Formulär skickar inte e-post
**Kontrollera:**
1. EmailJS quota (200/månad på free plan)
2. Template IDs stämmer överens
3. Service är aktiv i EmailJS dashboard

## 📞 Kontakt & Support

- **Live Site:** https://silentshouttattoo.se/
- **Instagram:** [@kjell_karamell](https://www.instagram.com/kjell_karamell?igsh=bGJsNGU3dXVlajFx)
- **E-post:** silentshouttattoo@gmail.com

## 📄 Licens

Privat projekt för Silent Shout Tattoo Studio.

---

**Senast uppdaterad:** Augusti 2025  
**Version:** 2.0 (EmailJS Integration)
