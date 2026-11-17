# OPay APK GitHub Action

This archive adds one GitHub Actions workflow at:

`.github/workflows/build-apk.yml`

The workflow is designed for this repository's existing web app in `www/`.
It creates a Capacitor Android wrapper during the GitHub Actions run, builds a
debug APK, and uploads it as an artifact named `opay-debug-apk`.

## Display settings

- Locks the Android activity to portrait orientation.
- Enables immersive fullscreen mode, hiding the status and navigation bars
  while the app is active. Swiping from the screen edge can temporarily reveal
  Android system bars.

## Add it to the repository

1. Extract this ZIP at the root of the `Opay` repository.
2. Confirm the file is at `.github/workflows/build-apk.yml`.
3. Commit and push the `.github` folder to the `main` branch.
4. Open the repository's **Actions** tab.
5. Select **Build APK**, then choose **Run workflow**.
6. When the run finishes, open it and download the `opay-debug-apk` artifact.
7. Extract the artifact ZIP to get `app-debug.apk`.

The workflow also runs automatically when code is pushed to `main` or `master`.

## Important

- This creates a **debug APK** for testing, not a signed Play Store release.
- It expects `www/index.html` to exist.
- The workflow uses Capacitor 6 and Java 17.
- The APK is a web app wrapped in an Android shell; this does not add real
  banking, payment processing, or official OPay affiliation.
