# L'Altra Osteria — Sito web (React + Vite + Tailwind)

Restyling moderno, veloce e **client-proof** per L'Altra Osteria (Via Cassia, Roma).
Sito **multi-pagina** in React (React Router), stilizzato con Tailwind CSS, pronto
per **Netlify** e predisposto per **Decap CMS** (ex Netlify CMS) per l'aggiornamento
autonomo di menù, testi e foto.

**Pagine:** Home (`/`), Menù (`/menu`), Il Ristorante (`/chi-siamo`),
Carta dei Vini (`/vini`), Contatti (`/contatti`). Il redirect SPA in `netlify.toml`
fa funzionare i link diretti a ogni pagina.

## Caratteristiche

- ⚡️ **Velocissimo**: build statica con Vite, nessun framework pesante.
- 📱 **Mobile-first** e 100% responsive — pensato per chi cerca il locale da smartphone.
- 🧠 **Headless**: tutti i contenuti vivono in `src/data/siteData.js`, separati dal JSX.
- 💬 **Prenotazione via WhatsApp** con messaggio precompilato editabile.
- 🔐 **Pannello /admin** Decap CMS per aggiornare menù/testi/immagini senza codice.
- ✅ `<title>` SEO corretto (il vecchio sito aveva `.` come titolo).

## Avvio in locale

Serve [Node.js](https://nodejs.org) 18+.

```bash
npm install      # installa le dipendenze
npm run dev      # avvia il server di sviluppo (http://localhost:5173)
npm run build    # genera la versione di produzione in /dist
npm run preview  # anteprima della build di produzione
```

## Struttura del progetto

```
├─ index.html               # <title>, meta SEO, Google Fonts
├─ netlify.toml             # build + redirect SPA per Netlify
├─ public/
│  ├─ admin/                # Decap CMS (pannello di gestione)
│  │  ├─ index.html
│  │  └─ config.yml         # definisce i campi modificabili dal ristoratore
│  └─ images/               # hero.jpg, chef.jpg, sommelier.jpg
└─ src/
   ├─ data/siteData.js      # ⭐️ TUTTI i contenuti (info, menù, vini, team)
   ├─ lib/utils.js          # formattazione prezzi + link WhatsApp
   ├─ pages/                # HomePage, MenuPage, AboutPage, WinesPage, ContactPage, NotFoundPage
   ├─ components/           # Layout, Navbar, Footer, Hero, PageHeader, MenuTabs, Reveal, ScrollToTop
   ├─ main.jsx              # router (React Router) + montaggio app
   └─ index.css             # Tailwind + tema (colori, font, pulsanti, animazioni)
```

## Modificare i contenuti (oggi, da codice)

Apri **`src/data/siteData.js`**: prezzi, piatti, orari, testi dello Chef e della
Sommelier, numero WhatsApp e messaggio precompilato sono tutti lì. È l'unico file
da toccare per aggiornare il sito finché il CMS non è collegato.

## Prenotazione WhatsApp

Il pulsante "Prenota un Tavolo" apre `https://wa.me/<numero>?text=<messaggio>`.
Si configurano in `siteData.js`:

```js
whatsappNumber: '390689524311',         // solo cifre, con prefisso internazionale
whatsappMessage: 'Ciao L\'Altra Osteria, vorrei prenotare un tavolo per ...',
```

## Deploy su Netlify

1. Carica il progetto su un repository GitHub.
2. Su Netlify: **Add new site → Import from Git**, seleziona il repo.
3. Netlify legge `netlify.toml` (build `npm run build`, publish `dist`). Conferma.
4. Sito online su `https://<nome>.netlify.app` (poi colleghi il dominio).

## Collegare Decap CMS (aggiornamenti senza codice)

Il pannello è già pronto in `public/admin/`. Per attivarlo in produzione:

1. **Abilita l'autenticazione** su Netlify:
   - *Site settings → Identity → Enable Identity*.
   - In *Identity → Services → Git Gateway*: **Enable Git Gateway**.
   - In *Identity → Registration*: imposta **Invite only** e invita l'email del
     ristoratore (così solo lui può accedere).
2. Aggiungi il widget di login: nel `<head>` di `index.html` e di
   `public/admin/index.html` includi
   `https://identity.netlify.com/v1/netlify-identity-widget.js`.
3. Il ristoratore va su `https://<sito>.netlify.app/admin/`, accetta l'invito,
   imposta la password ed entra.

### Come `config.yml` mappa l'array del menù

In `public/admin/config.yml` la collection **Menù** rispecchia 1:1 l'array
`menuData` di `siteData.js`: una `list` di **categorie**, ognuna con
`id`, `title`, `description`, `fixedPrice` opzionale e una `list` di **piatti**
(`name`, `description`, `price`, `tags`). Quando il ristoratore salva, Decap
scrive `src/content/menu.json` con questa forma:

```json
{
  "categories": [
    {
      "id": "serale",
      "title": "Menù Serale & Sabato",
      "description": "...",
      "dishes": [
        { "name": "Maritozzo salato", "description": "...", "price": 16, "tags": ["Signature"] }
      ]
    }
  ]
}
```

### Ultimo passo: leggere i dati dal CMS invece che dai valori statici

Quando i file in `src/content/*.json` esistono, basta sostituire gli export di
`siteData.js` con un import di quei file. Esempio per il menù:

```js
// src/data/siteData.js
import menuFile from '../content/menu.json'
export const menuData = menuFile.categories
```

Stesso schema per `restaurant.json`, `team.json`, `wines.json`. I componenti non
cambiano: continuano a leggere `menuData`, `restaurant`, ecc.

> 💡 **Anteprima del CMS in locale** senza Netlify: aggiungi `local_backend: true`
> in cima a `config.yml`, esegui `npx decap-server` in un terminale e `npm run dev`
> nell'altro, poi apri `http://localhost:5173/admin/`.

## Immagini

Carica `hero.jpg`, `chef.jpg`, `sommelier.jpg` in `public/images/`
(vedi `public/images/README.txt`). Se mancano, il sito mostra fallback eleganti.
