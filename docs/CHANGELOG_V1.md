# MemoryWall Changelog V1

## Version 1

### Initial Product Workflow

- Added landing and guided workflow pages
- Added collect, arrange, and share route structure
- Added media upload and preview support

### Media Handling

- Added image/video upload ingestion
- Added generated media IDs and default file naming
- Added optional event name and tag metadata
- Removed forced placeholder values like `Untitled` and `New`

### Audio

- Added main background audio upload
- Added background audio toggle in preview
- Added slideshow audio rule: pause main audio and let active video audio play

### Arrange Experience

- Added drag-and-drop reordering with dnd-kit
- Added metadata editing for file name, event name, and tag

### Preview And Export

- Added A4-style preview canvas
- Added fullscreen slideshow
- Added PDF export
- Added PNG export for single-page A4 layouts

### Sharing

- Added share button in preview
- Added native share-sheet path for PDF files
- Added WhatsApp fallback after PDF generation
- Clarified that permanent public share links are not yet available

### Themes

- Added Color, Dark, Light, and Contrast themes
- Added smoother theme transitions
- Added theme persistence via local storage

### Documentation

- Added README refresh for V1
- Added architecture, LLD, class diagram, requirements, changelog, and manual docs
