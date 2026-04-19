# MemoryWall V1

MemoryWall is a React + TanStack Start web app for creating a memory-gift slideshow from uploaded photos, videos, and optional background audio.

This repository currently represents **Version 1 (V1)** of the product: a client-side workflow for collecting media, arranging it, previewing it in an A4-style layout, exporting it, and sharing the generated PDF through browser/device share flows.

## Version Status

- Product baseline: `V1`
- Architecture style: frontend-only SPA/SSR-capable web app
- Persistence: in-memory Zustand store
- Export: client-side PDF/PNG generation
- Share: browser/native share flow with WhatsApp-oriented fallback

## Core Features In V1

- Upload photos and videos
- Add optional background audio
- Rename files and reorder media
- Keep optional event name and tag metadata
- Preview content in an A4-style share layout
- Open fullscreen slideshow playback
- Pause background audio during slideshow video playback
- Export to PDF
- Export to PNG when the preview fits on one A4 page
- Share generated PDF through browser file sharing or WhatsApp fallback
- Switch between four UI themes:
  - `Color`
  - `Dark`
  - `Light`
  - `Contrast`

## V1 User Flow

1. `Collect`
   Upload media and optional main audio.
2. `Arrange`
   Rename, tag, and reorder items.
3. `Share`
   Preview, export, and share.

## Tech Stack

- React 19
- TypeScript
- TanStack Start
- TanStack Router
- Vite
- Tailwind CSS 4
- Zustand
- dnd-kit
- html2canvas
- jsPDF
- Sonner
- Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build production assets
- `npm run build:dev` - build using development mode
- `npm run preview` - preview the production build
- `npm run lint` - run linting
- `npm run format` - format the codebase

## Documentation

The full V1 documentation set is in [docs](/D:/memorywall/docs).

- [Documentation Index](/D:/memorywall/docs/INDEX.md)
- [APK / Mobile Preparation](/D:/memorywall/docs/APK_MOBILE_PREPARATION.md)
- [Version 1 Overview](/D:/memorywall/docs/V1_OVERVIEW.md)
- [Requirements Specification](/D:/memorywall/docs/REQUIREMENTS_V1.md)
- [Architecture and Design](/D:/memorywall/docs/ARCHITECTURE_V1.md)
- [Low Level Design](/D:/memorywall/docs/LLD_V1.md)
- [Class Diagram](/D:/memorywall/docs/CLASS_DIAGRAM_V1.md)
- [User Manual](/D:/memorywall/docs/USER_MANUAL_V1.md)
- [Changelog](/D:/memorywall/docs/CHANGELOG_V1.md)
- [Future Scope](/D:/memorywall/docs/FUTURE_SCOPE.md)

## Current Limitations In V1

- No backend or database
- No permanent cloud-hosted shareable link
- App state resets on refresh because the media library is stored in memory
- No authentication
- No server-side file persistence
- PDF exports are visual only and do not contain audio playback
- Shareable-link infrastructure is not yet implemented

## Mobile / APK Preparation Status

The repo is now prepared for Android packaging with Capacitor configuration, Android-oriented scripts, and a local draft snapshot layer for mobile-friendly temporary saves.

What is prepared:

- Capacitor config scaffold
- Android sync/open scripts
- Local draft metadata snapshot persistence

What is still required to produce an APK:

- install Capacitor packages
- add the Android platform
- open in Android Studio
- configure SDK/build tools
- build debug or release APK

## Notes On `requirements.txt`

This is a Node/TypeScript application, not a Python package-based project. The included `requirements.txt` exists only as an environment handoff note and documents runtime prerequisites rather than `pip` packages.
