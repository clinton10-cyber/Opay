OPay APK workflow — branded icon edition

Replace the repository file:
  .github/workflows/build-apk.yml

This workflow uses your existing repository icon:
  www/icons/icon-512.png

It prepares that icon for Capacitor Assets and generates native Android
launcher icons during the build. It does not substitute a generic icon.

It also:
- Uses Android SDK packages without the removed "tools" package.
- Uses current Node 24-compatible GitHub Actions.
- Builds in portrait orientation and immersive fullscreen.
- Uploads the debug APK as opay-debug-apk.

After replacing the workflow, commit it to main, then open:
GitHub > Actions > Build APK > Run workflow.

The APK is a debug build, not a signed Play Store release.
