# MemoryWall Requirements Specification V1

## 1. Functional Requirements

### FR-1 Media Upload

- The system shall allow the user to upload multiple images and videos.
- The system shall support drag-and-drop upload.
- The system shall generate an internal media ID for each uploaded item.

### FR-2 Background Audio

- The system shall allow the user to upload one optional background audio track.
- The system shall allow the user to replace or remove the background audio track.

### FR-3 Media Metadata

- The system shall maintain, per media item:
  - `id`
  - `originalName`
  - `fileName`
  - `type`
  - `eventName`
  - `tag`
  - `url`
- The system shall allow `eventName` to remain empty.
- The system shall allow `tag` to remain empty.

### FR-4 Arrange Workflow

- The system shall allow drag-and-drop reordering of media items.
- The system shall allow editing of file name, event name, and tag.

### FR-5 Preview

- The system shall display media in an A4-style preview canvas.
- The system shall support preview playback of videos.
- The system shall support fullscreen slideshow viewing.

### FR-6 Audio Rules

- The system shall play optional background audio in preview mode.
- The system shall pause background audio when fullscreen slideshow playback opens.
- The system shall allow slideshow video audio to play directly.
- The system shall resume background audio after slideshow closes if it was previously playing.

### FR-7 Export

- The system shall export the preview as PDF.
- The system shall export the preview as PNG only when it fits within a single A4 page.

### FR-8 Sharing

- The system shall generate a PDF before share.
- The system shall use the browser/native file-share flow when available.
- The system shall fall back to downloading the PDF and opening WhatsApp with a prefilled message if direct file-share is unavailable.

### FR-9 Theming

- The system shall support four themes:
  - Color
  - Dark
  - Light
  - Contrast
- The system shall persist the selected theme in local storage.

## 2. Non-Functional Requirements

### NFR-1 Client-Side Operation

- V1 shall operate without a custom backend.

### NFR-2 Responsiveness

- The UI shall work on desktop and mobile layouts.

### NFR-3 Visual Consistency

- The application shall use a token-driven styling system through CSS variables.

### NFR-4 Performance

- Preview/export operations shall run client-side without a server round-trip.

### NFR-5 Usability

- Primary navigation shall be available across major workflow pages.
- The flow shall be understandable without user registration.

## 3. Constraints

- No persistent data layer in V1
- No cloud upload in V1
- No internet-hosted share links in V1
- No embedded audio in exported PDF
