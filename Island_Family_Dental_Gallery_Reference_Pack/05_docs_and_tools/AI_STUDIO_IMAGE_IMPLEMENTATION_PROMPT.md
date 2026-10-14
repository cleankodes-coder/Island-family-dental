# GOOGLE AI STUDIO — IMPLEMENT ORIGINAL IMAGE ASSETS (NO GENERATION)

This is an existing Island Family Dental concept website. Correct its image sourcing and gallery integration. Do NOT rebuild the website, replace its design, or change booking/admin/AI functionality.

## Absolute rule: NO AI photo generation
- Do not call Imagen, Gemini image generation, Unsplash, Pexels, stock image APIs, or any AI image model to create or substitute images.
- Do not invent a real photo of Dr. Stanislav Golyand, staff, patients, treatment results, or the clinic interior.
- Do not use remote image URLs guessed from filenames.
- Do not use screenshots or screenshot-derived crops as if they were original full-resolution clinic photography.

## Step 1: Inspect uploaded files
- List every accessible uploaded image with its exact filename, pixel dimensions, and path.
- Inspect `05_docs_and_tools/IMAGE_MANIFEST.json` and `README_START_HERE.md` if present.
- Distinguish screenshot references (`approved_for_public_website:false`) from separately supplied authentic and authorized image files.
- If ZIP attachment cannot be read or extracted, state that explicitly and ask for **extracted** images. Do not pretend files were imported.

## Step 2: Approved assets only
- Put genuine, authorized uploaded images into `public/assets/island-family-dental/`.
- Keep originals intact; create optimized derivatives only if needed, retaining names and a source manifest.
- For EACH approved image, define an explicit entry in `src/data/clinicImages.ts` with `{id, src, alt, origin, usageRights, category}`.
- Validate that `src` points to a REAL FILE actually present in `public/` and renders in preview.
- Use `<img>` or the project's image component with the exact local URL and `object-fit:cover`; no auto-generation or guessed fallback photos.

## Step 3: Place imagery intentionally
- Hero: authorized original clinic image, if provided; otherwise keep existing original CSS/3D graphic treatment and omit clinic photo.
- Doctor section: only an authentic, supplied, authorized Dr. Stanislav Golyand portrait. If none, use a clean typographic/initials card (NOT generated face).
- Gallery: use only clinic-authorized non-patient images and photos for which publication rights are confirmed.
- Treatments: use real provided/authorized treatment photos, otherwise use custom SVG/CSS dental icons or typography. Do not fabricate photorealistic procedures.
- Before/after: do not use any patient images without explicit clinic approval and patient consent; default OFF.
- Logo: use official high-resolution logo ONLY if supplied and authorized; screenshot logo crops are visual references, not approved production assets.

## Step 4: Gallery and safe fallbacks
- Implement a responsive gallery grid, optional category filters, accessible modal/lightbox, captions and descriptive alt text.
- If zero approved gallery images exist, show a visually polished empty-gallery state, not fake photos or copied screenshots.
- All patient/before-after images must be excluded from displayed gallery by default.
- Do not infer a photo's location, owner, person, or treatment outcome from an Instagram screenshot.

## Step 5: Validate and report
1. Log the exact list of files imported and excluded.
2. Show each mapped local path.
3. Check all previews have no broken images.
4. Verify mobile responsiveness and layout.
5. Keep the existing React pages, booking engine, desktop-only portal, database and AI receptionist unchanged.
6. Report how many ORIGINAL authorized images exist. If none, say so clearly.

IMPORTANT: Screenshot references are NOT authorized original media. If an uploaded ZIP contains only screenshots/thumbnail crops, use those for design reference and request actual original image exports instead of fabricating visuals.
