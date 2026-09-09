# Husna Bosun Portfolio

Personal portfolio website 

The project is split into two applications:

- `frontend/`: React 19 application built with Vite.
- `backend/`: Express API that reads profile data from Supabase and project data from the GitHub API.

## Features

- Responsive portfolio layout with hero, skills, education, experience, projects, and contact sections.
- Education and experience data loaded from Supabase.
- Portfolio projects loaded from GitHub repositories tagged with the `portfolio` topic.
- Project notes and featured status configured in the backend.
- Scroll reveal animations with reduced-motion support.

## Requirements

- Node.js 22 or newer.
- npm.
- A Supabase project with the required tables.
- A GitHub account if you want to manage the project list through repository topics.

## Project Setup

Clone the repository and install dependencies for both applications:

```bash
git clone <repository-url>
cd portfolio

cd backend
npm install

cd ../frontend
npm install
```

### Backend environment

Create `backend/.env`:

```env
PORT=3001
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
GITHUB_TOKEN=your-github-token
```

`GITHUB_TOKEN` is optional. It can help avoid unauthenticated GitHub API rate limits.

### Frontend environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

`VITE_API_URL` should contain the backend origin without a trailing slash. Vite exposes variables prefixed with `VITE_` to the browser, so do not put private credentials in the frontend environment file.

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm start
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

The backend currently permits the deployed portfolio origins in its CORS configuration. For local browser development, add the frontend origin (for example `http://localhost:5173`) to `allowedOrigins` in `backend/app.js`, or point `VITE_API_URL` to an already deployed API.

## Available Scripts

### Frontend

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `frontend/dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

### Backend

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm start` | Start the Express API. |

## API Endpoints

All API routes are prefixed with `/api`:

| Endpoint | Description | Source |
| --- | --- | --- |
| `GET /api/about` | Returns the portfolio owner's profile information. | Backend configuration |
| `GET /api/education` | Returns education records ordered by `start_date` descending. | Supabase `education` table |
| `GET /api/experiences` | Returns experience records ordered by `start_date` descending. | Supabase `experiences` table |
| `GET /api/projects` | Returns GitHub repositories tagged with the `portfolio` topic. | GitHub REST API |

The project endpoint returns each matching repository's name, description, URL, star count, primary language, optional note, and featured status.

## Supabase Data

The backend expects these Supabase tables:

- `education`, queried with all columns and ordered by `start_date`.
- `experiences`, queried with all columns and ordered by `start_date`.

Keep the Supabase credentials in `backend/.env`. They are loaded by `dotenv` when the API starts.

## Project Curation

To show a repository in the Projects section, add the `portfolio` topic to that GitHub repository. Additional project-specific notes and featured flags can be configured in `myProjectNotes` in `backend/app.js`.

## Production Build

Build the frontend from `frontend/`:

```bash
npm run build
```

Run the backend with production environment variables:

```bash
cd ../backend
npm start
```

Configure the deployed frontend's `VITE_API_URL` to point to the deployed backend, and update the backend CORS allowlist in `backend/app.js` whenever the frontend domain changes.

## Repository Structure

```text
portfolio/
|-- backend/
|   |-- app.js              Express app and API routes
|   |-- index.js            HTTP server entry point
|   `-- package.json
|-- frontend/
|   |-- public/             Static assets and downloadable files
|   |-- src/
|   |   |-- components/     Shared UI components
|   |   |-- sections/       Portfolio sections
|   |   |-- config/         Frontend configuration
|   |   `-- App.jsx         Main application component
|   `-- package.json
`-- README.md
```

## License

No project license has been specified yet.
