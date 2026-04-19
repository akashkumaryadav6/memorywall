# MemoryWall Class Diagram V1

The app is React-function-component based, so this diagram models the logical classes/modules and their main responsibilities rather than traditional OO inheritance-heavy classes.

```mermaid
classDiagram
  class MediaItem {
    +string id
    +string originalName
    +string fileName
    +MediaType type
    +string eventName
    +string tag
    +string url
  }

  class MediaStore {
    +MediaItem[] items
    +boolean bgAudio
    +string|null bgAudioUrl
    +string|null bgAudioName
    +setItems(items)
    +addItems(items)
    +updateItem(id, patch)
    +removeItem(id)
    +toggleAudio()
    +setBgAudio(url, name)
    +setBgAudioEnabled(enabled)
  }

  class AppNav {
    +theme state
    +toggleTheme()
    +render nav links
  }

  class CollectRoute {
    +handleFiles(files)
    +handleAudioUpload(file)
    +clearBgAudio()
  }

  class ArrangeRoute {
    +handleDragEnd(event)
    +updateItem(patch)
  }

  class ShareRoute {
    +handlePlayToggle()
    +handleBgAudioToggle()
    +exportAs(format)
    +generateExportBlob(format)
    +handleShare()
    +handleCloseSlideshow()
  }

  class Slideshow {
    +index state
    +playing state
    +keyboard navigation
    +video/image fullscreen playback
  }

  class SafetyPanel {
    +render safety guidance
  }

  AppNav --> ShareRoute
  AppNav --> CollectRoute
  AppNav --> ArrangeRoute
  CollectRoute --> MediaStore
  ArrangeRoute --> MediaStore
  ShareRoute --> MediaStore
  ShareRoute --> Slideshow
  CollectRoute --> MediaItem
  ArrangeRoute --> MediaItem
  ShareRoute --> MediaItem
```

## Notes

- `MediaStore` is the main state hub in V1.
- `CollectRoute`, `ArrangeRoute`, and `ShareRoute` act as orchestration modules.
- `Slideshow` is a presentation-focused runtime component invoked from `ShareRoute`.
