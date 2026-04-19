# makkham-appscript-react

A React + TypeScript app bundled as a single file and deployed to Google Apps Script using [clasp](https://github.com/google/clasp).

## Tech Stack

- **React 19** — UI framework
- **Vite** — build tool with `vite-plugin-singlefile` to inline all assets into one HTML file
- **vite-plugin-google-apps-script** — GAS-compatible build output
- **clasp** — CLI to push code to Google Apps Script
- **TypeScript**

## Project Structure

```
app-script/   # GAS project files (pushed to Google)
src/          # React source code
```

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Authenticate with Google:
   ```bash
   npx clasp login
   ```

3. Clone an existing GAS project (or create one at script.google.com first):
   ```bash
   npx clasp clone PROJECT_ID --rootDir ./app-script
   ```

## Development

```bash
pnpm dev
```

## Build & Deploy

Build the React app into `app-script/`:

```bash
pnpm build
```

Push to Google Apps Script:

```bash
npx clasp push
```

# Test

`https://script.google.com/macros/s/AKfycby_9iwf45mA-AVPhS5r2pQQ8FFcIi4SRAUWrI99XZNe/dev`