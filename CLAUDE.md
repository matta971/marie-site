# Marie Emeraude — Site Artiste Lyrique

## Qui est Marie Emeraude ?
Marie-Émeraude Alcime est une mezzo-soprano professionnelle. Ce site est son site vitrine personnel présentant sa carrière, ses concerts, ses médias, sa presse et son enseignement.

## Architecture globale

### Frontend (ce repo)
- **Stack** : React 19 + TypeScript 5.8 + Tailwind CSS v4 + Vite 7
- **Router** : React Router DOM 7
- **Dépendances clés** : Swiper (carrousels), react-markdown + remark-gfm (rendu markdown/tableaux GFM dans le chat admin), axios
- **Déploiement** : Cloudflare Pages (`marie-site.pages.dev`)
- **Build** : `npm run build` (tsc + vite build)
- **Dev** : `npm run dev` (port 5173)

### Backend (repo séparé : `C:\devfolder\marie-site-backend`)
- **Production** : Cloudflare Worker (`worker.js`) → `https://backend-site-marie-emeraude.matta971.workers.dev/api`
- **Dev local** : Express (`server.js`) → `http://localhost:3001/api`
- **Le worker utilise `fetch` direct** vers l'API Notion (pas le SDK)
- **Le serveur Express utilise `@notionhq/client`**

### CMS : Notion
Toutes les données dynamiques sont stockées dans Notion (bases de données + pages). Le backend sert de proxy API.

## Structure du frontend

```
src/
├── App.tsx                    # Router principal
├── main.tsx                   # Point d'entrée
├── data/site.ts               # Données statiques (vidéos, presse, badges, événements passés)
├── types/notion.types.ts      # Types TypeScript pour les données Notion
├── hooks/useNotionData.ts     # Hook générique fetch + loading + error + refresh
├── services/
│   ├── notionService.ts       # Appels API vers le backend (cache 5min côté client)
│   ├── biographyService.ts    # Service biographie
│   └── homePageService.ts     # Service page d'accueil
├── pages/
│   ├── Home.tsx               # Page d'accueil
│   ├── Biographie.tsx         # Biographie
│   ├── Repertoire.tsx         # Répertoire des œuvres
│   ├── Medias.tsx             # Vidéos, audio, photos
│   ├── Agenda.tsx             # Concerts à venir
│   ├── Presse.tsx             # Critiques de presse
│   ├── Enseignement.tsx       # Enseignement / masterclass
│   ├── Contact.tsx            # Formulaire de contact
│   └── AdminChat.tsx          # Chatbot admin (sans Header/Footer)
├── components/
│   ├── Header.tsx             # Navigation principale
│   ├── Footer.tsx             # Pied de page
│   ├── EventTable.tsx         # Tableau d'événements
│   ├── PressQuote.tsx         # Citation presse
│   ├── MediaEmbed.tsx         # Embed média
│   └── ContactForm.tsx        # Formulaire de contact (composant)
└── utils/dateUtils.ts         # Utilitaires de dates
```

## Routes

| Route | Page | Layout |
|-------|------|--------|
| `/` | Home | Header + Footer |
| `/biographie` | Biographie | Header + Footer |
| `/repertoire` | Répertoire | Header + Footer |
| `/medias` | Médias | Header + Footer |
| `/agenda` | Agenda | Header + Footer |
| `/presse` | Presse (critiques) | Header + Footer |
| `/enseignement` | Enseignement | Header + Footer |
| `/contact` | Contact | Header + Footer |
| `/admin` | AdminChat | **Aucun** (layout dédié) |

## Données Notion

### Bases de données (tables)
| Table | DB ID | Propriétés Notion |
|-------|-------|-------------------|
| Agenda | `27fe033a009a80a8bafbe4fbffa7c9ed` | Titre (title), Date (date), Lieu (rich_text), Ville (rich_text), Role (rich_text), Description (rich_text), Type (select: concert/recital/opera/masterclass), Lien billetterie (url), Afficher (checkbox) |
| Médias | `27fe033a009a8093b620fce93ec94431` | Titre (title), Type (select: video/audio/photo), URL (url), Description (rich_text), Date (date), Ordre (number), Mise en avant (checkbox), Catégorie (select), Lieu (rich_text) |
| Presse | `27fe033a009a808fa3d6e63f69ea2d93` | Citation (title), Source (rich_text), Auteur (rich_text), Date (date), Lien article (url), Type (select: critique/interview/mention), Afficher (checkbox) |
| Répertoire | `27fe033a009a807286d0cd3ae08092e0` | Œuvre (title), Compositeur (rich_text), Rôle (rich_text), Type (select: opera/oratorio/melodie/sacred), Année(s) (rich_text), Lieu(x) (rich_text), Langue (select) |
| Témoignages | `27fe033a009a80b884c7c39c063bb92f` | Nom (title), Témoignage (rich_text), Fonction (rich_text), Type (select: student/colleague/organizer), Date (date), Page (multi_select), Afficher (checkbox) |

### Pages Notion (contenu riche)
| Page | Page ID |
|------|---------|
| Biographie | `27fe033a009a8021b49de120932717e9` |
| Services | `27fe033a009a80ff9a66d03dd99cfd25` |

## Chatbot Admin (`/admin`)

### Fonctionnement
- Interface chat protégée par mot de passe (ADMIN_PASSWORD)
- Le frontend envoie l'historique de conversation au backend `POST /api/chat`
- Le worker appelle Claude API (Sonnet) avec des tools Notion
- Boucle agentique : Claude demande un tool → le worker l'exécute sur Notion → renvoie le résultat à Claude → Claude répond
- Réponses rendues en markdown (react-markdown) pour les tableaux, listes, etc.

### Tools disponibles
- **Lister** : `list_entries` (concerts, press, medias, repertoire, testimonials)
- **Créer** : `create_concert`, `create_press`, `create_media`, `create_repertoire`, `create_testimonial`
- **Modifier** : `update_concert`, `update_press`, `update_media`, `update_repertoire`, `update_testimonial`
- **Supprimer** : `delete_entry` (archive la page Notion)

## Secrets Cloudflare (Worker)
- `NOTION_API_KEY` — Clé API Notion
- `NOTION_AGENDA_DB_ID`, `NOTION_MEDIA_DB_ID`, `NOTION_PRESS_DB_ID`, `NOTION_REPERTOIRE_DB_ID`, `NOTION_TESTIMONIALS_DB_ID` — IDs des bases
- `NOTION_BIOGRAPHY_PAGE_ID`, `NOTION_SERVICES_PAGE_ID` — IDs des pages
- `ANTHROPIC_API_KEY` — Clé API Anthropic pour le chatbot
- `ADMIN_PASSWORD` — Mot de passe de l'interface admin

## Endpoints API backend

### GET (publics)
- `/api/concerts` — Concerts avec Afficher=true, triés par date
- `/api/medias` — Médias triés par ordre
- `/api/press` — Presse avec Afficher=true, triés par date desc
- `/api/repertoire` — Répertoire trié par année desc
- `/api/testimonials` — Témoignages avec Afficher=true
- `/api/biography` — Blocks de la page biographie

### POST (authentifié)
- `/api/chat` — Endpoint chatbot (Authorization: Bearer ADMIN_PASSWORD)

## Commandes utiles
```bash
# Frontend
npm run dev          # Serveur de dev (localhost:5173)
npm run build        # Build production
npx tsc --noEmit     # Vérification types

# Backend (depuis marie-site-backend/)
node server.js              # Serveur Express local
npx wrangler deploy         # Déployer le worker
npx wrangler secret put X   # Ajouter un secret
npx wrangler secret list    # Lister les secrets
```

## Design
- Thème clair (bg-white)
- Couleur d'accent : amber (amber-600, amber-700)
- Police : système par défaut
- Layout : Header fixe + contenu flex + Footer
- Page admin : layout indépendant (pas de Header/Footer)

## Skills & MCP Servers
- **Skill `ui-ux-pro-max`** (`.claude/skills/ui-ux-pro-max/`) — Intelligence design complète : 67 styles, 96 palettes, 57 pairings typo, guidelines UX, données pour React/Tailwind
- **Skill `frontend-design`** (`.claude/skills/frontend-design.md`) — Guide pour interfaces production-grade distinctives
- **MCP Playwright** — Preview navigateur, screenshots, tests visuels
- **MCP 21st Magic** — Découverte et génération de composants UI

## Déploiement
- **Frontend** : Cloudflare Pages, connecté au repo GitHub `matta971/marie-site` (build auto sur push main)
- **Backend** : Cloudflare Worker `backend-site-marie-emeraude`, déployé via `npx wrangler deploy` depuis `marie-site-backend/`
- **SPA routing** : fichier `public/_redirects` (`/* /index.html 200`) pour que toutes les routes passent par React Router
- **Secrets Cloudflare** : configurés sans préfixe `VITE_` (le `.env` backend utilise `VITE_` mais les secrets Worker non)

## Notes importantes
- Le worker Cloudflare s'appelle `backend-site-marie-emeraude` (pas `marie-api-worker`)
- Le chatbot utilise Claude Sonnet (`claude-sonnet-4-6`) pour les réponses rapides et le coût faible
- `react-markdown` nécessite `remark-gfm` pour parser les tableaux GFM — sans ce plugin, les tableaux s'affichent en texte brut
- Le formulaire de contact (`Contact.tsx`) n'envoie rien au backend pour le moment (console.log uniquement)
