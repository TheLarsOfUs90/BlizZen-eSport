# Security

BliZzen eSport is a static website. There are no user accounts, no database,
no forms, and no server-side secrets.

## What is in this repository

- Public frontend source
- Public brand and roster images
- Content JSON (`content/`) that anyone can read
- A GitHub Actions workflow that only builds static files and deploys GitHub Pages

## What is not in this repository

- API keys, tokens, passwords, `.env` files
- Authentication, payments, or a database
- Private Discord server internals (the invite URL is a normal public link)
- Email addresses, phone numbers, postal addresses, or dates of birth

## Content rules

- Only publish photos and bios with that person's consent
- Do not add minors
- Do not paste secrets into JSON, markdown, or GitHub issues
- External links must be `https://` to known social hosts; other URLs are ignored

## Reporting a vulnerability

Please open a private GitHub Security Advisory on this repository, or contact
the maintainer via Discord. Do not file a public issue for secrets or exploits.
