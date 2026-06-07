# HTML Tools

Collection repo for standalone browser-based HTML/JavaScript tools.

## Included tools

### 1. Safety Assessment Generator

The repository root contains the existing chemical risk assessment tool so older download workflows stay compatible.

Features:

- manual chemical risk assessment form
- AI settings panel for provider, model, API key, base URL, and system prompt
- SDS PDF upload with client-side text extraction
- deterministic H-code based risk rating
- standardized hazard wording across chemicals
- canonical chemical naming for form fields and downloaded files
- Excel workbook export aligned more closely to the Python form layout
- in-browser preview of the generated workbook layout

How to use:

1. Open `index.html` in a browser.
2. Optionally upload an SDS PDF and click `Extract from PDF`.
3. Review and edit the fields.
4. Adjust AI settings if needed. They are stored locally in the browser.
5. Click `Build Assessment` to preview the standardized result.
6. Click `Download XLSX` to save the workbook.

### 2. Lab Notes Digitizer

The second standalone tool lives in [`lab-notes-digitizer/`](./lab-notes-digitizer/).

Features:

- upload one or more handwritten lab-note photos
- run a vision model from the browser
- produce structured Markdown for lab logs
- copy or download the generated Markdown

How to use:

1. Open `lab-notes-digitizer/index.html` in a browser.
2. Enter API settings or prefill `config.local.js`.
3. Upload all note photos from one day.
4. Click `Analyze`.
5. Copy or download the generated Markdown.

## Notes

- These tools are static browser apps with no backend required.
- Optional local-only `config.local.js` files can be used for machine-specific defaults without committing secrets.
- The root safety assessment tool remains at the repository root intentionally so existing pull/download scripts do not break.
