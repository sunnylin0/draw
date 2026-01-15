<div align="center">
<h1>HR Lucky Draw & Grouping Tool</h1>
</div>

A React application for HR event management, featuring lucky draws and participant grouping.

## Features

- **Data Import**: Import participants manually, via file (CSV/TXT), or use a sample list.
- **Lucky Draw**: animated lucky draw selector.
- **Grouping**: Automatically group participants into teams.

## Run Locally

**Prerequisites:** Node.js (v20+ recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or the port shown in terminal) to view the app.

3. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

1. Push your changes to the `main` (or `master`) branch.
2. The `.github/workflows/deploy.yml` workflow will trigger.
3. Once completed, your app will be deployed to the `gh-pages` branch.
4. Go to **Settings > Pages** in your GitHub repository and ensure the source is set to **Deploy from a branch** and select `gh-pages` / `root`.

## Project Structure

- `src/`: Source code
  - `components/`: React components (Header, DataImport, LuckyDraw, Grouping)
  - `App.tsx`: Main application component
  - `index.tsx`: Entry point
- `public/`: Static assets
- `vite.config.ts`: Vite configuration
