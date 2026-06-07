# Lab Notes Digitizer

Small local browser tool for turning photographed handwritten lab notes into Markdown with a vision model.

## Workflow

1. Open `index.html` in a browser.
2. Enter API settings or prefill `config.local.js`.
3. Upload all note photos from one day.
4. Click `Analyze`.
5. Copy or download the generated Markdown.

## Notes

- Default setup is Google Gemini with `gemini-3.5-flash`.
- `config.local.js` is meant for local convenience only.
- Settings are also stored in browser `localStorage`.
- The tool sends uploaded images directly from the browser to the configured API.
