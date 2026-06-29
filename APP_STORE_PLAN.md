# App Store And Downloadable App Plan

Providence Timeline should move in three layers. Each layer builds on the same app, so we do not keep manually copying files.

## Layer 1: Installable Web App

Status: configured in this repo.

Files added:

- `manifest.webmanifest`
- `sw.js`
- `icons/providence-icon.svg`
- app metadata in `index.html`

What this gives us:

- Users can open the Netlify site.
- On supported browsers, they can install it to their home screen or desktop.
- The app can load its shell offline.
- Data still saves through Supabase login when online.

This is the fastest shareable app mode.

## Layer 2: Desktop App

Recommended wrapper: Tauri.

Targets:

- macOS
- Windows
- Linux

Why Tauri:

- Smaller desktop apps than Electron.
- Good fit for a quiet, private journal-style app.
- Can point at the built static app.

Needed before packaging:

- Node installed.
- Rust installed.
- Tauri config generated.
- App icon PNG/ICNS/ICO assets.
- macOS signing/notarization if distributing broadly.
- Windows code signing if distributing broadly.

## Layer 3: Mobile App Stores

Recommended wrapper: Capacitor.

Targets:

- iPhone/iPad App Store
- Google Play Store

Needed before packaging:

- Node installed.
- Capacitor config generated.
- Xcode for iOS.
- Android Studio for Android.
- Apple Developer account.
- Google Play Developer account.
- Privacy policy URL.
- Store screenshots.
- App icon and splash assets.

## Privacy Position

Providence Timeline stores sensitive personal data: prayers, grief, family details, ministry, relationships, and reflections.

Before public app-store launch, prepare:

- privacy policy
- terms of use
- account deletion instructions
- export instructions
- security statement

## Recommended Sequence

1. Finish GitHub -> Netlify workflow.
2. Use Netlify URL as the installable web app.
3. Test login, saving, and reflections with a few users.
4. Add privacy policy and account deletion page.
5. Package desktop app with Tauri.
6. Package mobile apps with Capacitor.
7. Submit to app stores only after the data/privacy basics are solid.
