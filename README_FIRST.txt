POWERUPS 9000 LIVE TRACKER - GITHUB PAGES VERSION

A) SUPABASE
1. Open your NEW POWERUPS 9000 Supabase project.
2. Go to SQL Editor.
3. Open SUPABASE_SETUP.sql from this pack.
4. Copy all SQL -> paste -> RUN.
5. Go to Project Settings -> API.
6. Copy:
   - Project URL
   - Anon / Publishable Key
7. DO NOT use Service Role Key.

B) CONFIG
1. Open config.js in Notepad.
2. Replace:
   PASTE_YOUR_SUPABASE_PROJECT_URL_HERE
   PASTE_YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY_HERE
3. Save.

C) GITHUB
1. Create a NEW repository, suggested name:
   powerups9000-testing-tracker
2. Keep it Public if you want simplest GitHub Pages setup.
3. Upload ALL files from this folder to repository root.
4. Commit changes.

D) ENABLE GITHUB PAGES
1. Open repository -> Settings.
2. Pages.
3. Under Build and deployment:
   Source = Deploy from a branch
   Branch = main
   Folder = /(root)
4. Save.
5. Wait around 1-3 minutes.
6. GitHub gives a live URL similar to:
   https://YOURUSERNAME.github.io/powerups9000-testing-tracker/

E) TEST
1. Open live GitHub Pages URL on laptop.
2. Confirm top-right says:
   Live · Supabase Connected
3. Open QR Sticker Generator.
4. Enter a demo serial, e.g. P9K-DEMO-001.
5. Choose Adani.
6. Generate QR set.
7. Use phone NORMAL Camera app to scan Received QR.
8. Tap the link.
9. Phone should show:
   Status Updated
10. Laptop dashboard should update automatically.

PROJECT FLOW
Adani:
Received -> Under Testing -> Heatrun In Progress -> Heatrun Completed -> FAT Testing In Progress -> To Finishing

Reliance / Standard:
Received -> Under Testing -> Heatrun In Progress -> Heatrun Completed -> To Finishing

IMPORTANT
- Generate final QR only from the live GitHub Pages site.
- Phone and laptop do NOT need same Wi-Fi once live on GitHub.
- Both need internet access.
- Trinergy project/repo is completely separate and untouched.
