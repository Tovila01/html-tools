const SETTINGS_STORAGE_KEY = "lab-notes-digitizer-settings";

const DEFAULT_SETTINGS = {
  provider: "gemini",
  model: "gemini-3.5-flash",
  apiKey: "",
  baseUrl: "",
  systemPrompt: document.querySelector("#systemPrompt").value,
};

const localConfig = (typeof window !== "undefined" && window.LAB_NOTES_DIGITIZER_LOCAL_CONFIG && typeof window.LAB_NOTES_DIGITIZER_LOCAL_CONFIG === "object")
  ? window.LAB_NOTES_DIGITIZER_LOCAL_CONFIG
  : {};

const form = {
  provider: document.querySelector("#provider"),
  model: document.querySelector("#model"),
  apiKey: document.querySelector("#apiKey"),
  baseUrl: document.querySelector("#baseUrl"),
  systemPrompt: document.querySelector("#systemPrompt"),
  images: document.querySelector("#images"),
  userContext: document.querySelector("#userContext"),
  output: document.querySelector("#output"),
};

const ui = {
  status: document.querySelector("#status"),
  previewGrid: document.querySelector("#previewGrid"),
  saveSettingsButton: document.querySelector("#saveSettingsButton"),
  resetSettingsButton: document.querySelector("#resetSettingsButton"),
  clearImagesButton: document.querySelector("#clearImagesButton"),
  analyzeButton: document.querySelector("#analyzeButton"),
  copyButton: document.querySelector("#copyButton"),
  downloadButton: document.querySelector("#downloadButton"),
};

form.images.addEventListener("change", renderPreviews);
ui.saveSettingsButton.addEventListener("click", saveSettings);
ui.resetSettingsButton.addEventListener("click", resetSettings);
ui.clearImagesButton.addEventListener("click", clearImages);
ui.analyzeButton.addEventListener("click", () => runSafely(analyzeImages));
ui.copyButton.addEventListener("click", () => runSafely(copyOutput));
ui.downloadButton.addEventListener("click", () => runSafely(downloadMarkdown));

loadSettings();
renderPreviews();

function loadSettings() {
  const stored = readStoredSettings();
  const merged = {
    ...DEFAULT_SETTINGS,
    ...stored,
    ...pickDefined(localConfig),
  };
  form.provider.value = merged.provider || DEFAULT_SETTINGS.provider;
  form.model.value = merged.model || DEFAULT_SETTINGS.model;
  form.apiKey.value = merged.apiKey || "";
  form.baseUrl.value = merged.baseUrl || "";
  form.systemPrompt.value = merged.systemPrompt || DEFAULT_SETTINGS.systemPrompt;
}

function readStoredSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_error) {
    return {};
  }
}

function saveSettings() {
  const settings = readSettings();
  window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  setStatus("Settings saved locally.");
}

function resetSettings() {
  window.localStorage.removeItem(SETTINGS_STORAGE_KEY);
  loadSettings();
  setStatus("Settings reset.");
}

function readSettings() {
  return {
    provider: form.provider.value.trim() || DEFAULT_SETTINGS.provider,
    model: form.model.value.trim() || DEFAULT_SETTINGS.model,
    apiKey: form.apiKey.value.trim(),
    baseUrl: form.baseUrl.value.trim(),
    systemPrompt: form.systemPrompt.value.trim() || DEFAULT_SETTINGS.systemPrompt,
  };
}

function clearImages() {
  form.images.value = "";
  renderPreviews();
  setStatus("Images cleared.");
}

function renderPreviews() {
  const files = Array.from(form.images.files || []);
  if (!files.length) {
    ui.previewGrid.classList.add("empty");
    ui.previewGrid.innerHTML = '<p class="empty-state">No images selected yet.</p>';
    return;
  }

  ui.previewGrid.classList.remove("empty");
  ui.previewGrid.innerHTML = "";

  for (const file of files) {
    const card = document.createElement("article");
    card.className = "preview-card";

    const image = document.createElement("img");
    image.alt = file.name;

    const meta = document.createElement("div");
    meta.className = "preview-meta";

    const name = document.createElement("strong");
    name.textContent = file.name;

    const size = document.createElement("span");
    size.textContent = formatBytes(file.size);

    meta.append(name, size);
    card.append(image, meta);
    ui.previewGrid.append(card);

    const reader = new FileReader();
    reader.onload = () => {
      image.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  }
}

async function analyzeImages() {
  const files = Array.from(form.images.files || []);
  if (!files.length) {
    setStatus("Select at least one image first.");
    return;
  }

  const settings = readSettings();
  if (!settings.apiKey || !settings.model) {
    setStatus("Set API key and model first.");
    return;
  }

  setRunningState(true);
  setStatus(`Preparing ${files.length} image${files.length === 1 ? "" : "s"}...`);

  try {
    const images = await Promise.all(files.map(fileToPayload));
    setStatus("Sending images to the model...");
    const prompt = buildUserPrompt(files.length);
    const markdown = await analyzeWithProvider(settings, prompt, images);
    form.output.value = markdown.trim();
    setStatus("Analysis complete.");
  } finally {
    setRunningState(false);
  }
}

function buildUserPrompt(imageCount) {
  const context = form.userContext.value.trim();
  const parts = [
    `Analyze these ${imageCount} uploaded image${imageCount === 1 ? "" : "s"} as one single daily lab-journal entry.`,
    "Return the final answer as Markdown only.",
  ];
  if (context) {
    parts.push("", "Additional context from the user:", context);
  }
  return parts.join("\n");
}

async function analyzeWithProvider(settings, prompt, images) {
  switch (settings.provider) {
    case "gemini":
      return analyzeWithGemini(settings, prompt, images);
    case "openai":
      return analyzeWithOpenAiCompatible(settings, prompt, images);
    default:
      throw new Error(`Unsupported provider: ${settings.provider}`);
  }
}

async function analyzeWithGemini(settings, prompt, images) {
  const baseUrl = settings.baseUrl || "https://generativelanguage.googleapis.com/v1beta";
  const url = `${baseUrl.replace(/\/$/, "")}/models/${encodeURIComponent(settings.model)}:generateContent?key=${encodeURIComponent(settings.apiKey)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: `${settings.systemPrompt}\n\n${prompt}` },
          ...images.map((image) => ({
            inlineData: {
              mimeType: image.mimeType,
              data: image.base64,
            },
          })),
        ],
      }],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini request failed.");
  }
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part?.text || "").join("\n").trim();
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }
  return stripCodeFences(text);
}

async function analyzeWithOpenAiCompatible(settings, prompt, images) {
  const url = settings.baseUrl.trim() || "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey}`,
    },
    body: JSON.stringify({
      model: settings.model,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: settings.systemPrompt,
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            ...images.map((image) => ({
              type: "image_url",
              image_url: {
                url: image.dataUrl,
              },
            })),
          ],
        },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "OpenAI-compatible request failed.");
  }
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("Model returned an empty response.");
  }
  return stripCodeFences(text);
}

async function fileToPayload(file) {
  const dataUrl = await readFileAsDataUrl(file);
  const [prefix, base64] = dataUrl.split(",", 2);
  const mimeType = prefix.match(/^data:(.*?);base64$/)?.[1] || file.type || "image/jpeg";
  return {
    name: file.name,
    mimeType,
    base64,
    dataUrl,
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error || new Error("Failed to read file."));
    reader.onload = () => resolve(String(reader.result || ""));
    reader.readAsDataURL(file);
  });
}

async function copyOutput() {
  const text = form.output.value.trim();
  if (!text) {
    setStatus("Nothing to copy.");
    return;
  }
  await navigator.clipboard.writeText(text);
  setStatus("Markdown copied.");
}

async function downloadMarkdown() {
  const text = form.output.value.trim();
  if (!text) {
    setStatus("Nothing to download.");
    return;
  }
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `lab-journal-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  setStatus("Markdown file downloaded.");
}

function stripCodeFences(text) {
  return text.replace(/^```[a-zA-Z0-9_-]*\s*/, "").replace(/\s*```$/, "").trim();
}

function pickDefined(value) {
  return Object.fromEntries(
    Object.entries(value || {}).filter(([, entry]) => entry !== undefined && entry !== null),
  );
}

function formatBytes(value) {
  if (!Number.isFinite(value) || value <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let size = value;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function setStatus(message) {
  ui.status.textContent = message;
}

function setRunningState(isRunning) {
  ui.analyzeButton.disabled = isRunning;
  ui.copyButton.disabled = isRunning;
  ui.downloadButton.disabled = isRunning;
}

async function runSafely(task) {
  try {
    await task();
  } catch (error) {
    setStatus(`Error: ${error?.message || String(error)}`);
  }
}
