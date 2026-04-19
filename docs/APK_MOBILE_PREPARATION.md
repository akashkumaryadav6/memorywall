# APK / Mobile Preparation

## Goal

Prepare MemoryWall for Android APK packaging while keeping the current web codebase as the primary source.

## Chosen Approach

The recommended approach is to wrap the existing React/Vite application with **Capacitor**.

Why Capacitor:

- works well with the current web stack
- supports Android APK generation
- allows gradual adoption of device APIs
- keeps the existing UI and route structure mostly intact

## What Has Already Been Prepared

### 1. Capacitor Configuration

File:

- [capacitor.config.ts](/D:/memorywall/capacitor.config.ts)

This sets:

- app id
- app name
- web output directory for the mobile-static bundle
- Android-targeted configuration baseline

### 1.1 Mobile Static Build Target

Files:

- [mobile.html](/D:/memorywall/mobile.html)
- [index.html](/D:/memorywall/index.html)
- [src/mobile-main.tsx](/D:/memorywall/src/mobile-main.tsx)
- [vite.mobile.config.ts](/D:/memorywall/vite.mobile.config.ts)

These create a dedicated static mobile bundle so Capacitor can package a real `index.html` entry even though the main web app also has a TanStack Start server/client build.

### 2. Mobile Build Scripts

Added scripts in [package.json](/D:/memorywall/package.json):

- `npm run mobile:build`
- `npm run mobile:sync`
- `npm run mobile:open`
- `npm run mobile:android`

### 3. Mobile Draft Snapshot Layer

Files:

- [mobile-draft-storage.ts](/D:/memorywall/src/lib/mobile-draft-storage.ts)
- [MobileDraftSync.tsx](/D:/memorywall/src/components/MobileDraftSync.tsx)

This currently saves **project metadata** to browser local storage for mobile-friendly temporary recovery.

What it stores:

- media metadata
- ordering
- event names
- tags
- background audio name

What it does **not** yet store durably:

- uploaded local file binaries
- blob/object URL media across full app restarts

## Current Mobile Storage Model

### Already Working

- temporary metadata persistence via local storage
- session-level preview state for remote URLs and current session files

### Next Mobile Storage Step

To support real on-device file persistence for uploaded media, the next stage should add:

- Capacitor Filesystem plugin or equivalent
- file-copy/import flow from device picker into app storage
- local project manifest that references persisted device-local files

## APK Build Path

## Step 1: Install Capacitor Packages

```bash
npm install
```

## Step 2: Add Android Platform

```bash
npx cap add android
```

## Step 3: Build Mobile Web Assets

```bash
npm run mobile:build
```

## Step 4: Sync To Android

```bash
npm run mobile:sync
```

## Step 5: Open Android Studio

```bash
npm run mobile:open
```

## Step 6: Build APK

In Android Studio:

- open the generated Android project
- let Gradle sync finish
- build debug APK or release APK

## Local Storage Strategy For Mobile

### V1.1 Preparation State

- metadata is saved locally
- uploaded local files are still session-bound if they remain blob URLs

### V2 Mobile Goal

- import user files into app-local filesystem storage
- keep recoverable project drafts after app restart
- load drafts offline

## Recommended Next Implementation Tasks

1. Add Capacitor Filesystem integration
2. Add mobile file import service
3. Replace blob-only persistence with file-path persistence
4. Add project restore screen
5. Add explicit `Save Draft` and `Load Draft` flows

## Important Note

This repository is now **prepared** for APK generation, but an APK cannot be built from this environment alone unless:

- Capacitor is installed locally
- Android platform files are generated
- Android SDK / Android Studio are available
