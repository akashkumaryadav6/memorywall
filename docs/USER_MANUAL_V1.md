# MemoryWall User Manual V1

## Overview

MemoryWall helps you create a memory gift from uploaded photos, videos, and optional audio.

## Step 1: Collect

Go to the `Collect` page.

You can:

- drag files into the upload box
- click `Upload Media`
- upload one optional main audio track

Notes:

- event name starts empty
- tag starts empty
- these fields do not show unless you fill them in later

## Step 2: Arrange

Go to the `Arrange` page.

You can:

- drag media cards to reorder them
- edit file name
- edit event name
- edit tag

Tips:

- leave `event name` blank to hide it from preview
- leave `tag` blank to hide it from preview

## Step 3: Share

Go to the `Share` page.

You can:

- generate preview playback
- toggle background audio
- export PDF
- export PNG when the preview fits on one page
- use the `Share` button to share the generated PDF

## Slideshow Behavior

When you tap/click a media tile:

- fullscreen slideshow opens
- background audio pauses
- slideshow video sound plays directly
- background audio resumes when the slideshow closes, if it had been playing

## Themes

Use the theme switcher in the navbar to cycle through:

- Color
- Dark
- Light
- Contrast

## Sharing Behavior In V1

The `Share` button:

- generates a PDF in the browser
- tries to open the native share sheet if file sharing is supported
- otherwise downloads the PDF and opens WhatsApp with a prepared message

Important:

- V1 does **not** generate a permanent public internet link yet

## Export Notes

- PDF exports do not include playable audio
- PNG export is limited to single-page A4 preview output

## Troubleshooting

### My media disappeared after refresh

V1 stores media in memory only. Refreshing the app resets the session state.

### I do not hear audio in exported PDF

PDF export is visual only.

### Tag or event name is still visible

Open `Arrange` and clear the field if you want it hidden.
