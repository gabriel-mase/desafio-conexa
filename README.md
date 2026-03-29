# Rick & Morty Explorer

A Next.js application that lets you pick two characters from the Rick and Morty universe and compare the episodes they share, the episodes exclusive to each one, and more.

**Live demo:** [https://desafio-conexa.vercel.app/](https://desafio-conexa.vercel.app/)

---

## Features

- **Dual character browser** — two independent paginated lists to pick Character #1 and Character #2
- **Character cards** — each card shows the character's image, name, status (Alive / Dead / Unknown) and species
- **Episode breakdown** — three sections that update automatically once both characters are selected:
  - **Character #1 – Only Episodes**: episodes where Character #1 appears but Character #2 does not
  - **Characters #1 & #2 – Shared Episodes**: episodes where both characters appear together
  - **Character #2 – Only Episodes**: episodes where Character #2 appears but Character #1 does not
- **Smart validation** — episode panels stay locked until both characters are selected, since the breakdown is relative to the comparison
- **Responsive design** — works on mobile, tablet and desktop
- **Unit tests** — full coverage of utilities, hooks and components

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data fetching | Native `fetch` with custom hooks |
| API | [Rick and Morty API](https://rickandmortyapi.com/) (REST) |
| Testing | Jest + React Testing Library |
| Deployment | Vercel |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/gabriel-mase/desafio-conexa.git
cd desafio-conexa

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm test` | Run the test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

---

## Project structure

```
src/
├── app/
│   ├── globals.css        # Global styles and Tailwind directives
│   ├── layout.tsx         # Root layout and metadata
│   └── page.tsx           # Main page — orchestrates all state
├── components/
│   ├── CharacterCard/     # Card with image, status dot and species
│   ├── CharacterGrid/     # Paginated grid of character cards
│   ├── EpisodeItem/       # Single episode row (code, name, air date)
│   ├── EpisodePanel/      # Episode section with locked/loading/empty states
│   └── Pagination/        # Page navigation with ellipsis
├── hooks/
│   ├── useCharacters.ts   # Fetches paginated character list
│   └── useEpisodes.ts     # Fetches episode details by ID array
├── services/
│   └── api.ts             # All Rick and Morty API calls
├── types/
│   └── index.ts           # Shared TypeScript interfaces
└── utils/
    └── episodes.ts        # computeEpisodeSets — core comparison logic
```

---

## How the episode comparison works

Each character returned by the API includes the list of episode URLs they appear in. When two characters are selected, the app computes three sets:

```
onlyChar1  = char1.episodes  −  char2.episodes
shared     = char1.episodes  ∩  char2.episodes
onlyChar2  = char2.episodes  −  char1.episodes
```

The resulting episode IDs are then fetched in a single batched request to the API. This means the breakdown is always relative to the pair — selecting a different Character #2 will update all three panels.

---

## Testing

The test suite covers the core logic and every UI component:

```bash
npm test
```

```
 PASS  src/utils/episodes.test.ts
 PASS  src/hooks/useCharacters.test.ts
 PASS  src/hooks/useEpisodes.test.ts
 PASS  src/components/CharacterCard/CharacterCard.test.tsx
 PASS  src/components/Pagination/Pagination.test.tsx
 PASS  src/components/EpisodeItem/EpisodeItem.test.tsx
 PASS  src/components/EpisodePanel/EpisodePanel.test.tsx

Tests: 46 passed
```
