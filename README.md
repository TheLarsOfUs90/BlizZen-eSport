# BlizZen eSport

Statische Website des Adult-eSport-Clubs **BlizZen** aus der Altmark.

- Live: https://thelarsOfUs90.github.io/BlizZen-eSport/
- Discord: https://discord.gg/xgAwd7eTT6
- Kein Backend, keine Accounts, keine Secrets

## Inhalte ändern

Texte, Team und Links liegen unter [`content/`](content/README.md).

1. Text: `content/copy.json`
2. Teammitglied: Foto nach `public/media/`, Eintrag in `content/team.json`
3. Discord/X/Instagram: `content/site.json`
4. Committen und auf `main` pushen — GitHub Pages baut neu

## Lokal

Voraussetzung: Node.js 22.

```bash
npm install
npm run dev
```

## GitHub Pages

Jeder Push auf `main` veröffentlicht die Seite über `.github/workflows/pages.yml`. Der Workflow braucht keine Secrets.

## Sicherheit

Siehe [SECURITY.md](SECURITY.md). `.env`-Dateien und Schlüssel gehören nicht ins Repo.
