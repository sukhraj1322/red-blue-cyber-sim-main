# red-blue-cyber-sim-main

This repository contains a Red/Blue cyber simulation UI built with Vite and TypeScript.

## Quick start

Prerequisites
- Node.js (recommended >= 16)
- npm or another package manager (pnpm, yarn, bun)

Install dependencies and run the dev server (PowerShell):

```powershell
cd 'C:\Users\HP\Downloads\red-blue-cyber-sim-main\red-blue-cyber-sim-main'
npm install
npm run dev
```

Build for production:

```powershell
npm run build
```

## Git / GitHub

Create a repository on GitHub (example name: `red-blue-cyber-sim-main`) under your account `sukhraj1322`, then add the remote and push:

```powershell
git init
git checkout -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/sukhraj1322/red-blue-cyber-sim-main.git
git push -u origin main
```

If you use the GitHub CLI (recommended):

```powershell
gh auth login
gh repo create sukhraj1322/red-blue-cyber-sim-main --public --source=. --remote=origin --push
```

## Notes
- If you use HTTPS to push, GitHub requires a personal access token (PAT) or credential helper; consider using `gh auth login` to configure credentials.
- `.gitignore` was added to avoid committing node_modules, build files, and common editor/OS files.

---
Generated automatically.
