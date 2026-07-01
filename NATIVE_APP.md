# Providence Timeline Native App

Providence Timeline now has a Capacitor foundation for native mobile apps.

## Current Status

- Capacitor is installed.
- Android project is generated in `android/`.
- iOS project is generated in `ios/`.
- The app web bundle is generated into `www/`.
- Android has been synced successfully.
- iOS has been generated, but final native dependency sync needs the full Xcode app selected on this Mac.

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

Capacitor now has CocoaPods available, but `pod install` needs the full Xcode app, not only Apple's command-line tools.

Install Xcode from the Mac App Store if needed. Then open Xcode once and accept any first-run prompts.

After Xcode is installed, select it for command-line builds:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -license accept
```

Then sync and open iOS:

```bash
pnpm exec cap sync ios
pnpm exec cap open ios
```

## Android Next Step

Install Android Studio, then run:

```bash
pnpm exec cap open android
```

From Android Studio, let Gradle finish syncing, then run the app on an emulator or connected Android device.

## iPhone Next Step

After Xcode is installed and selected, open the project in Xcode. You will need:

- Xcode installed
- An Apple ID signed into Xcode
- A development team selected under Signing & Capabilities
- A connected iPhone or simulator

Use TestFlight later when the app is ready for outside testers.
