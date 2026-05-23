# Deployment

## Render website

Use the root `render.yaml` file from `D:\internship\dental\render.yaml`.

1. Push the full `D:\internship\dental` project to GitHub.
2. In Render, choose New > Blueprint.
3. Select the GitHub repo.
4. Add the backend database environment variables:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT`
   - `DB_SSL`
5. Deploy the blueprint.

## Android app

This project now includes a native Android wrapper in `frontend/android`.

Useful commands from `D:\internship\dental\frontend`:

- `npm run android:sync` builds the website and copies it into Android.
- `npm run android:open` opens the Android project in Android Studio.
- `npm run android:apk` builds a debug APK when Android SDK/Gradle are available.

The website is also installable on Android as a PWA after it is deployed over
HTTPS. Open the Render URL in Chrome on Android, then choose install from the
browser menu.
