# MemoryWall Low Level Design V1

## 1. Main Modules

### 1.1 Routing Layer

Files:

- [router.tsx](/D:/memorywall/src/router.tsx)
- [__root.tsx](/D:/memorywall/src/routes/__root.tsx)

Responsibilities:

- initialize router
- define app shell
- render toaster and not-found/error states

### 1.2 Store Layer

File:

- [media-store.ts](/D:/memorywall/src/lib/media-store.ts)

Responsibilities:

- maintain uploaded media collection
- maintain background audio state
- expose mutation methods

State:

- `items`
- `bgAudio`
- `bgAudioUrl`
- `bgAudioName`

Mutators:

- `setItems`
- `addItems`
- `updateItem`
- `removeItem`
- `toggleAudio`
- `setBgAudio`
- `setBgAudioEnabled`

### 1.3 Collect Route

File:

- [collect.tsx](/D:/memorywall/src/routes/collect.tsx)

Responsibilities:

- upload media
- upload/remove main audio
- generate media metadata
- display compact file preview list

### 1.4 Arrange Route

File:

- [folder.tsx](/D:/memorywall/src/routes/folder.tsx)

Responsibilities:

- reorder items using dnd-kit
- edit metadata
- continue to preview flow

### 1.5 Share Route

File:

- [preview.tsx](/D:/memorywall/src/routes/preview.tsx)

Responsibilities:

- render A4-style preview
- manage preview playback
- manage export pipeline
- manage share behavior
- coordinate slideshow launch/close

### 1.6 Slideshow Component

File:

- [Slideshow.tsx](/D:/memorywall/src/components/Slideshow.tsx)

Responsibilities:

- fullscreen media playback
- keyboard navigation
- image/video presentation
- slideshow audio behavior for active video playback

## 2. Key Runtime Flows

### 2.1 Upload Flow

```mermaid
sequenceDiagram
  participant U as User
  participant C as Collect Route
  participant S as Zustand Store

  U->>C: Upload images/videos
  C->>C: Generate id, fileName, objectURL
  C->>S: addItems(newItems)
  S-->>C: updated items
  C-->>U: File list updated
```

### 2.2 Arrange Flow

```mermaid
sequenceDiagram
  participant U as User
  participant F as Arrange Route
  participant S as Zustand Store

  U->>F: Drag item
  F->>S: setItems(arrayMove(...))
  U->>F: Edit labels
  F->>S: updateItem(id, patch)
```

### 2.3 Export Flow

```mermaid
sequenceDiagram
  participant U as User
  participant P as Share Route
  participant E as Export Builder
  participant H as html2canvas/jsPDF

  U->>P: Export PDF
  P->>E: prepareExportItems()
  E->>H: render export node
  H-->>P: canvas/blob
  P-->>U: download file
```

### 2.4 Share Flow

```mermaid
sequenceDiagram
  participant U as User
  participant P as Share Route
  participant B as Browser Share API
  participant W as WhatsApp Fallback

  U->>P: Tap Share
  P->>P: Generate PDF blob
  alt Native share supports files
    P->>B: navigator.share(file)
    B-->>U: share sheet opens
  else Native file share unavailable
    P->>U: download PDF
    P->>W: open wa.me with message
  end
```

## 3. Error Handling

- route-level default error component in router
- toast feedback for export/share/upload failure states
- not-found page at root route level

## 4. Known Technical Gaps

- no persistent store adapter
- no upload service
- no server API contract
- no typed backend DTOs because V1 is local-only
