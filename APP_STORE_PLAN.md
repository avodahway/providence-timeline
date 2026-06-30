# App Store And Downloadable App Plan

Providence Timeline should move in three layers. Each layer builds on the same app, so we do not keep manually copying files.

## Layer 1: Installable Web App

Status: configured and actively polished in this repo.

Files added:

- `manifest.webmanifest`
- `sw.js`
- `install.html`
- `offline.html`
- `icons/providence-icon.svg`
- PNG install icons in `icons/`
- app metadata in `index.html`

What this gives us:

- Users can open the Netlify site.
- On supported browsers, they can install it to their home screen or desktop.
- The app can load its shell offline.
- Users can read install instructions for iPhone, Android, and desktop.
- Data still saves through Supabase login when online.

This is the fastest shareable app mode.

Current Path A checklist:

- Production HTTPS URL: `https://providence-timeline.netlify.app/`
- Install guide: `/install.html`
- Cache reset helper: `/reset-cache.html`
- Offline fallback: `/offline.html`
- iOS install path: Safari share sheet -> Add to Home Screen
- Android/desktop install path: browser install prompt or app menu
- Remaining Path A work: offline draft capture, background sync, and device testing.

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
- Privacy policy URL: `/privacy.html`.
- Store screenshots.
- App icon and splash assets.

Current Path B checklist:

- Choose wrapper: Capacitor for iOS/Android.
- Add `package.json` and app build script.
- Add Capacitor config with app id, app name, web directory, and production URL strategy.
- Generate iOS and Android projects.
- Prepare splash screens and store screenshots.
- Test authentication redirects inside native webviews.
- Create Apple Developer and Google Play Developer accounts before submission.

## Privacy Position

Providence Timeline stores sensitive personal data: prayers, grief, family details, ministry, relationships, and reflections.

Before public app-store launch, prepare:

- privacy policy page
- terms of use
- account deletion instructions page
- export instructions
- security statement

## Recommended Sequence

1. Finish GitHub -> Netlify workflow.
2. Use Netlify URL as the installable web app.
3. Test login, saving, and reflections with a few users.
4. Privacy policy and account deletion pages are now present; review legal wording before public launch.
5. Package desktop app with Tauri.
6. Package mobile apps with Capacitor.
7. Submit to app stores only after the data/privacy basics are solid.
