# MemoryWall V1 Overview

## Purpose

MemoryWall V1 is a media-based gifting application that lets a user:

- upload memories
- arrange them
- preview them in an A4 presentation format
- export the result
- share the result as a generated PDF through the browser/device sharing flow

## Product Goal

The main goal of V1 is to provide a fast, visually rich, zero-account workflow for turning personal media into a polished slideshow gift.

## What Is Included In V1

- Landing page and route-based flow
- Collect page for media ingestion
- Arrange page for metadata editing and ordering
- Share page for preview, export, and sharing
- Fullscreen slideshow viewer
- Client-side PDF and PNG export
- Optional background audio
- Theme switcher with four modes

## What Is Not Included In V1

- user login
- backend APIs
- persistent storage
- real hosted shareable links
- cloud upload
- collaborative editing
- server-side rendering of exports

## V1 Functional Summary

### Collect

- accepts image/video uploads
- auto-generates file IDs and file names
- stores uploads in the in-memory store
- supports optional main audio upload

### Arrange

- lists uploaded media
- supports drag-and-drop reordering
- supports editing file name, event name, and tag

### Share

- renders a printable A4-style preview
- plays preview tiles
- supports background audio control
- supports fullscreen slideshow playback
- exports PDF/PNG
- shares generated PDF through native share APIs or WhatsApp fallback

## Version Identity

- Version: `V1`
- Delivery model: frontend-only
- State model: client memory only
- Storage model: browser object URLs + in-memory Zustand state
