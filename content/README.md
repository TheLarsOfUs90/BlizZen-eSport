# Inhalte ändern

Texte, Links und Teammitglieder liegen in diesem Ordner. Nach einem Push auf `main` baut GitHub Pages die Seite neu.

Keine Programmierkenntnisse nötig. JSON-Syntax beachten: Anführungszeichen, Kommas, keine Kommentare.

## Texte ändern

Datei: `copy.json`

- `de` = deutsch (Standardsprache)
- `en` = englisch

Beispiel: Slogan auf der Startseite steht unter `home.intent`.

## Discord, X, Instagram, Team-E-Mail

Datei: `site.json`

```json
"socials": {
  "discord": "https://discord.gg/F2EyDybxCf",
  "x": "",
  "instagram": ""
},
"email": "team@example.com"
```

Nur `https://`-Links zu Discord, X, Instagram, YouTube, Twitch oder TikTok. Leere Felder werden ausgeblendet. Die Team-E-Mail erscheint nur unter Hinweise / Impressum.

## Teammitglied hinzufügen

1. Foto nach `public/media/` legen, z. B. `public/media/player-nova.png`.
   Erlaubt: `png`, `jpg`, `jpeg`, `webp`, `avif`. Dateiname nur Buchstaben, Zahlen, `.`, `_`, `-`.
2. In `team.json` einen Block anhängen (Komma nach dem vorherigen Eintrag):

```json
{
  "id": "nova",
  "ign": "Nova",
  "name": "",
  "role": { "de": "Support", "en": "Support" },
  "country": { "de": "Altmark", "en": "Altmark" },
  "countryCode": "DE",
  "image": "media/player-nova.png",
  "featured": false,
  "quote": { "de": "Kurzes Zitat.", "en": "Short quote." },
  "bio": { "de": "Kurze Beschreibung.", "en": "Short bio." },
  "socials": {
    "x": "",
    "discord": "",
    "instagram": "",
    "twitch": "",
    "youtube": "",
    "tiktok": ""
  },
  "stats": [
    { "label": { "de": "Rolle", "en": "Role" }, "value": "Support" }
  ]
}
```

3. Speichern, committen, auf `main` pushen.

Hinweise:

- `id` ist die URL (`/roster/nova`). Nur Kleinbuchstaben, Zahlen, Bindestrich.
- `featured: true` zeigt die Person groß auf der Startseite.
- `name` ist optional. Klarnamen nur mit Einverständnis.
- `quote` ist die Überschrift im Profil, `bio` der Kurztext darunter.
- `socials` sind optional. Leere Links werden nicht angezeigt.
- Die Mitgliederzahl auf der Startseite zählt automatisch die Einträge in `team.json`.

## Games

Datei: `site.json` → `games`. `"soon": true` markiert Titel als „Ab Release“.

## Sicherheit beim Editieren

- Nur Fotos und Texte mit Einverständnis der Person.
- Keine private E-Mail, Telefonnummer, Adresse, Discord-ID, Geburtsdatum oder Minderjährige. Die Club-Kontaktmail gehört nur nach `site.json` → `email`.
- Keine API-Keys, Tokens oder `.env`-Dateien ins Repo.
- Keine fremden Bilder per `http://`-URL — nur Dateien unter `public/media/` oder `public/brand/`.
