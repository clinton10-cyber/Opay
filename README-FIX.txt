OPay APK workflow repair

1. Replace the existing repository file:
   .github/workflows/build-apk.yml

2. Use the build-apk.yml file in this ZIP at that exact path.
   Do not put the ZIP itself inside the repository.

3. Commit the replacement to the main branch.

4. Open GitHub > Actions > Build APK > Run workflow.

5. When the run succeeds, open it and download the artifact:
   opay-debug-apk

What this repair changes:
- Uses android-actions/setup-android@v4. The v3 action tried to install the
  removed Android SDK package named "tools", which caused the observed failure.
- Explicitly installs platform-tools, Android API 34, and Build Tools 34.0.0.
- Updates the GitHub Actions to Node 24-compatible versions.
- Pins the runner to Ubuntu 24.04 to avoid the ubuntu-latest migration notice.
- Keeps the app portrait and immersive fullscreen.

This builds a debug APK. It is not a signed Play Store release APK.
