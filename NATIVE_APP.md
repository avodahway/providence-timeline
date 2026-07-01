# Providence Timeline Native App

Providence Timeline now has a Capacitor foundation for native mobile apps.

## Current Status

- Capacitor is installed.
- Android project is generated in `android/`.
- The app web bundle is generated into `www/`.
- Android has been synced successfully.
- iOS is not generated yet because CocoaPods is not installed in the local Mac environment.

## App Identity

- App name: `Providence Timeline`
- App id: `com.providencetimeline.app`
- Web bundle directory: `www`

## Commands

Install dependencies:

```bash
pnpm install
```

Build the web bundle:

```bash
pnpm run build
```

Sync native projects:

```bash
pnpm exec cap sync
```

Open Android Studio:

```bash
pnpm exec cap open android
```

Open Xcode after iOS is generated:

```bash
pnpm exec cap open ios
```

## iOS Setup Blocker

Capacitor needs CocoaPods before it can generate/sync the iOS project.

Recommended local setup:

```bash
brew install cocoapods
```

Then generate iOS:

```bash
pnpm exec cap add ios
pnpm exec cap sync ios
pnpm exec cap open ios
```

If Homebrew is not available, install Homebrew first from:

```text
https://brew.sh
```

## Android Next Step

Install Android Studio, then run:

```bash
pnpm exec cap open android
```

From Android Studio, let Gradle finish syncing, then run the app on an emulator or connected Android device.

## iPhone Next Step

After CocoaPods is installed and `ios/` is generated, open the project in Xcode. You will need:

- Xcode installed
- An Apple ID signed into Xcode
- A development team selected under Signing & Capabilities
- A connected iPhone or simulator

Use TestFlight later when the app is ready for outside testers.
