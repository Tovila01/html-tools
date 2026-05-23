const HAZARD_RULES = {
  H225: { severity: 4, tags: ["flammable"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["keep_away_from_ignition", "use_in_ventilated_area"], storage: ["flammables_cabinet"], waste: ["flammable_organic_waste"] },
  H290: { severity: 3, tags: ["corrosive_to_metals"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["segregate_from_metals"], storage: ["corrosives_storage"], waste: ["corrosive_waste"] },
  H300: { severity: 5, tags: ["acute_toxicity_oral"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_all_ingestion", "restricted_handling"], storage: ["toxics_storage"], waste: ["hazardous_toxic_waste"] },
  H301: { severity: 4, tags: ["toxic_if_swallowed"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_all_ingestion"], storage: ["toxics_storage"], waste: ["hazardous_toxic_waste"] },
  H314: { severity: 5, tags: ["corrosive", "skin_burns", "eye_damage"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood_if_volatile", "have_spill_kit_ready"], storage: ["corrosives_storage"], waste: ["corrosive_waste"] },
  H319: { severity: 2, tags: ["eye_irritant"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: [], storage: [], waste: [] },
  H335: { severity: 3, tags: ["respiratory_irritant"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["use_fume_hood"], storage: [], waste: [] },
  H336: { severity: 2, tags: ["narcotic_effects"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["use_in_ventilated_area"], storage: [], waste: [] },
  H351: { severity: 4, tags: ["suspected_carcinogen"], ppe: ["safety_glasses", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_repeated_exposure"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H360: { severity: 5, tags: ["reproductive_toxicity"], ppe: ["safety_glasses", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_skin_contact", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H410: { severity: 4, tags: ["aquatic_toxicity"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["prevent_release_to_drain"], storage: [], waste: ["hazardous_aqueous_waste"] },
};

const USE_HAZARD_PRIORITY = [
  "flammable",
  "acute_toxicity_oral",
  "toxic_if_swallowed",
  "corrosive",
  "eye_irritant",
  "respiratory_irritant",
  "narcotic_effects",
  "suspected_carcinogen",
  "reproductive_toxicity",
  "aquatic_toxicity",
];

const HAZARD_LIBRARY = {
  flammable: { hazard: "Highly flammable", risk: "Fire", controls: ["Keep away from sources of ignition.", "Use only in a well ventilated area."] },
  acute_toxicity_oral: { hazard: "Acute toxicity", risk: "Poisoning if swallowed", controls: ["Avoid ingestion.", "Do not work alone if high-toxicity handling is required."] },
  toxic_if_swallowed: { hazard: "Toxic if swallowed", risk: "Poisoning if swallowed", controls: ["Avoid ingestion.", "Wash hands after handling."] },
  corrosive: { hazard: "Corrosive", risk: "Skin burns or serious eye damage", controls: ["Wear splash protection and suitable gloves.", "Handle carefully and avoid direct contact."] },
  eye_irritant: { hazard: "Eye irritant", risk: "Eye irritation", controls: ["Wear safety glasses or goggles."] },
  respiratory_irritant: { hazard: "Respiratory irritant", risk: "Respiratory irritation", controls: ["Avoid breathing vapours or dust.", "Use in a fume hood or well ventilated area."] },
  narcotic_effects: { hazard: "Vapour exposure", risk: "Drowsiness or dizziness", controls: ["Avoid breathing vapours.", "Use in a well ventilated area."] },
  suspected_carcinogen: { hazard: "Suspected carcinogen", risk: "Long-term health effects", controls: ["Minimize exposure.", "Use in a fume hood."] },
  reproductive_toxicity: { hazard: "Reproductive toxin", risk: "Reproductive health effects", controls: ["Minimize exposure.", "Avoid skin contact and inhalation."] },
  aquatic_toxicity: { hazard: "Environmental hazard", risk: "Environmental release", controls: ["Prevent release to drains."] },
};

const STANDARD_TEXT = {
  fire: {
    flammable: "Use water spray, alcohol-resistant foam, dry chemical or carbon dioxide. Do not use water jetstream.",
    default: "Use extinguishing media appropriate to surrounding materials.",
  },
  storage: {
    flammable: "Store in flammables area or solvent cabinet.",
    corrosive: "Store in corrosives storage.",
    suspected_carcinogen: "Store in designated health hazard storage.",
    reproductive_toxicity: "Store in designated health hazard storage.",
    default: "Store in a compatible, clearly labelled container.",
  },
  disposal: {
    flammable: "Collect in non-halogenated or flammable solvent waste.",
    corrosive: "Collect in corrosive hazardous waste.",
    aquatic_toxicity: "Collect as hazardous waste and prevent release to drains.",
    default: "Dispose of as hazardous waste according to local rules.",
  },
  spillPrecautions: {
    default: ["Use personal protective equipment.", "Ensure adequate ventilation."],
    flammable: ["Remove all sources of ignition.", "Use non-sparking equipment if required."],
  },
  spillCleanup: {
    default: ["Absorb with inert material.", "Transfer waste to a suitable closed container."],
    aquatic_toxicity: ["Prevent release to drains.", "Collect spill for hazardous disposal."],
  },
  firstAid: {
    ingestion: "If swallowed: rinse mouth with water. Seek medical attention if symptoms occur.",
    inhalation: "If inhaled: move to fresh air and seek medical attention if symptoms persist.",
    eyes: "If in eyes: rinse cautiously with water for several minutes and seek advice if irritation persists.",
    skin: "If on skin: wash thoroughly with water and remove contaminated clothing.",
  },
};

const AI_SETTINGS_STORAGE_KEY = "safety-assessment-generator-ai-settings";
const FIELD_HISTORY_STORAGE_KEY = "safety-assessment-generator-field-history";
const AI_SETTINGS_VERSION = 3;
const DEFAULT_AI_SETTINGS = {
  version: AI_SETTINGS_VERSION,
  provider: "gemini",
  model: "gemini-3.5-flash",
  apiKey: "",
  baseUrl: "",
  systemPrompt: [
    "You extract structured chemical safety information from SDS or fact-sheet text.",
    "Your task is to extract structured information only from the provided source document text.",
    "The source document is typically a safety data sheet (SDS), fact sheet, or official chemical safety document.",
    "",
    "Primary objective:",
    "Maximize reproducibility, conservatism, and traceability.",
    "Do not guess. Do not infer beyond what is explicitly supported by the text.",
    "If information is missing, uncertain, contradictory, or not clearly stated, leave the field empty and report it in missing_fields or warnings.",
    "",
    "Rules:",
    "1. Use only the provided document text as the source of truth.",
    "2. Do not use outside knowledge.",
    "3. Do not invent H-codes, CAS numbers, PPE, storage rules, disposal rules, or first-aid instructions.",
    "4. Prefer exact extraction over paraphrase when possible.",
    "5. If multiple values appear, prefer the most explicit and document-supported one, and mention ambiguity in warnings.",
    "6. If a field is not explicitly supported, return an empty value for that field.",
    "7. Keep all outputs deterministic, concise, and machine-readable.",
    "8. Do not produce prose outside the requested JSON schema.",
    "9. If the document is low quality, incomplete, OCR-corrupted, or inconsistent, lower confidence accordingly.",
    "10. Only include hazard statements / H-codes that are explicitly present in the text.",
    "11. Keep notes, storage, spill, first_aid, firefighting, disposal, and PPE concise and operational. Prefer compact summaries over long quoted passages.",
    "12. For the name field, return only the base chemical name. Exclude concentration, purity, grade, technical descriptors, percentages, bracketed qualifiers, catalogue numbers, product codes, and formulation details.",
    "Examples: return `Ethanol`, not `Ethanol 69%`; return `Acetone`, not `Acetone technical`; return `Hydrochloric acid`, not `Hydrochloric acid 37%`.",
    "",
    "Return valid JSON only.",
  ].join("\n"),
};
const localAiConfig = (typeof window !== "undefined" && window.SAFETY_ASSESSMENT_LOCAL_CONFIG && typeof window.SAFETY_ASSESSMENT_LOCAL_CONFIG === "object")
  ? window.SAFETY_ASSESSMENT_LOCAL_CONFIG
  : {};

const form = {
  pdfFile: document.querySelector("#pdfFile"),
  name: document.querySelector("#name"),
  cas: document.querySelector("#cas"),
  ghsCodes: document.querySelector("#ghsCodes"),
  physicalForm: document.querySelector("#physicalForm"),
  concentration: document.querySelector("#concentration"),
  assessor: document.querySelector("#assessor"),
  location: document.querySelector("#location"),
  date: document.querySelector("#date"),
  peopleCount: document.querySelector("#peopleCount"),
  supervisor: document.querySelector("#supervisor"),
  notes: document.querySelector("#notes"),
  manualRiskEnabled: document.querySelector("#manualRiskEnabled"),
  manualHazardScore: document.querySelector("#manualHazardScore"),
  manualSeverity: document.querySelector("#manualSeverity"),
  manualProbability: document.querySelector("#manualProbability"),
};

const fieldHistoryUi = {
  assessorOptions: document.querySelector("#assessorOptions"),
  locationOptions: document.querySelector("#locationOptions"),
};

const aiSettingsForm = {
  provider: document.querySelector("#aiProvider"),
  model: document.querySelector("#aiModel"),
  apiKey: document.querySelector("#aiApiKey"),
  baseUrl: document.querySelector("#aiBaseUrl"),
  systemPrompt: document.querySelector("#aiSystemPrompt"),
  saveButton: document.querySelector("#saveAiSettingsButton"),
  resetButton: document.querySelector("#resetAiSettingsButton"),
};

const ui = {
  status: document.querySelector("#status"),
  saveFolderStatus: document.querySelector("#saveFolderStatus"),
  versionStamp: document.querySelector("#versionStamp"),
  riskRating: document.querySelector("#riskRating"),
  hazardTags: document.querySelector("#hazardTags"),
  ppeSummary: document.querySelector("#ppeSummary"),
  hazardTableBody: document.querySelector("#hazardTableBody"),
  fireText: document.querySelector("#fireText"),
  spillPrecautions: document.querySelector("#spillPrecautions"),
  spillCleanup: document.querySelector("#spillCleanup"),
  firstAidList: document.querySelector("#firstAidList"),
  workbookPreview: document.querySelector("#workbookPreview"),
  workbookPreviewMeta: document.querySelector("#workbookPreviewMeta"),
  manualHazardDisplay: document.querySelector("#manualHazardDisplay"),
  manualRiskSummary: document.querySelector("#manualRiskSummary"),
};

let saveDirectoryHandle = null;

document.querySelector("#chooseFolderButton").addEventListener("click", () => runSafely(chooseSaveFolder));
document.querySelector("#extractPdfButton").addEventListener("click", () => runSafely(extractFromPdf));
document.querySelector("#buildButton").addEventListener("click", () => runSafely(buildAssessment));
document.querySelector("#previewWorkbookButton").addEventListener("click", () => runSafely(previewWorkbook));
document.querySelector("#downloadButton").addEventListener("click", () => runSafely(downloadWorkbook));
aiSettingsForm.saveButton.addEventListener("click", saveAiSettings);
aiSettingsForm.resetButton.addEventListener("click", resetAiSettings);
form.manualRiskEnabled.addEventListener("change", renderAssessment);
form.manualSeverity.addEventListener("change", renderAssessment);
form.manualProbability.addEventListener("change", renderAssessment);
form.manualHazardScore.addEventListener("input", renderAssessment);

form.date.value = new Date().toLocaleDateString("en-GB").replace(/\//g, "/");
initializeApp();
window.addEventListener("error", (event) => {
  if (event?.message) setStatus(`Error: ${event.message}`);
});
window.addEventListener("unhandledrejection", (event) => {
  const message = event?.reason?.message || String(event?.reason || "Unknown async error");
  setStatus(`Error: ${message}`);
});

async function extractFromPdf() {
  const file = form.pdfFile.files?.[0];
  if (!file) {
    setStatus("Choose a PDF first.");
    return;
  }
  setStatus("Reading PDF...");
  const pdfjsLib = await import("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = "";
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ") + "\n";
  }
  const fallbackExtraction = parseSdsText(text);
  setStatus("Running AI extraction...");
  const reviewed = await extractWithAiFromPdfText(text, fallbackExtraction);
  const finalExtraction = reviewed.extraction || fallbackExtraction;
  const statusSuffix = reviewed.usedAi
    ? buildAiReviewStatus(reviewed)
    : reviewed.reason || "AI extraction unavailable, using local fallback.";
  applyExtracted(finalExtraction);
  buildAssessment();
  setStatus(`PDF extraction complete. ${statusSuffix}`);
}

async function extractWithAiFromPdfText(sourceText, fallbackExtraction) {
  const settings = readAiSettings();
  if (!settings.apiKey?.trim() || !settings.model?.trim() || !settings.provider?.trim()) {
    return { usedAi: false, extraction: fallbackExtraction, warnings: [], reason: "AI extraction unavailable, using local fallback." };
  }

  const prompt = [
    "You are extracting structured chemical safety information from SDS PDF text.",
    "Read the provided PDF text directly and fill the form fields from the document itself.",
    "This is primary extraction, not proofreading of an existing result.",
    "Use only the source text. Do not use outside knowledge.",
    "Preserve empty fields if the source does not support a value.",
    "Return strict JSON with this schema only:",
    "{",
    '  "name": string,',
    '  "cas": string,',
    '  "ghsCodes": string,',
    '  "physicalForm": string,',
    '  "concentration": string,',
    '  "notes": string,',
    '  "warnings": string[],',
    '  "missingFields": string[],',
    '  "confidence": "high" | "medium" | "low"',
    "}",
    "",
    `Source SDS text:\n${sourceText}`,
  ].join("\n");

  try {
    const rawResponse = await callAiReview(settings, prompt);
    const reviewed = sanitizeAiReview(parseAiJson(rawResponse), fallbackExtraction);
    return { usedAi: true, ...reviewed };
  } catch (error) {
    return {
      usedAi: false,
      extraction: fallbackExtraction,
      warnings: [],
      reason: `AI extraction failed, using local fallback (${error?.message || String(error)}).`,
    };
  }
}

async function callAiReview(settings, prompt) {
  switch (settings.provider) {
    case "gemini":
      return callGeminiReview(settings, prompt);
    case "anthropic":
      return callAnthropicReview(settings, prompt);
    case "openai":
    case "groq":
    case "openrouter":
    case "custom":
      return callOpenAiCompatibleReview(settings, prompt);
    default:
      throw new Error(`Unsupported AI provider: ${settings.provider}`);
  }
}

async function callGeminiReview(settings, prompt) {
  const apiKey = settings.apiKey.trim();
  const model = settings.model.trim();
  const baseUrl = settings.baseUrl.trim() || "https://generativelanguage.googleapis.com/v1beta";
  const response = await fetch(`${baseUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0,
        topP: 0.1,
        responseMimeType: "application/json",
      },
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini request failed.");
  }
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part?.text || "").join("\n").trim();
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}

async function callAnthropicReview(settings, prompt) {
  const response = await fetch(resolveAnthropicUrl(settings), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": settings.apiKey.trim(),
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: settings.model.trim(),
      max_tokens: 1500,
      temperature: 0,
      system: settings.systemPrompt,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Anthropic request failed.");
  }
  const text = data?.content?.map((part) => part?.text || "").join("\n").trim();
  if (!text) throw new Error("Anthropic returned an empty response.");
  return text;
}

async function callOpenAiCompatibleReview(settings, prompt) {
  const response = await fetch(resolveOpenAiCompatibleUrl(settings), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.apiKey.trim()}`,
    },
    body: JSON.stringify({
      model: settings.model.trim(),
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: settings.systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "AI extraction request failed.");
  }
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("AI provider returned an empty response.");
  return text;
}

function resolveOpenAiCompatibleUrl(settings) {
  if (settings.baseUrl.trim()) {
    return settings.baseUrl.trim().replace(/\/$/, "");
  }
  switch (settings.provider) {
    case "openai":
      return "https://api.openai.com/v1/chat/completions";
    case "groq":
      return "https://api.groq.com/openai/v1/chat/completions";
    case "openrouter":
      return "https://openrouter.ai/api/v1/chat/completions";
    case "custom":
      throw new Error("Custom provider requires a Base URL.");
    default:
      throw new Error(`Unsupported OpenAI-compatible provider: ${settings.provider}`);
  }
}

function resolveAnthropicUrl(settings) {
  return settings.baseUrl.trim() || "https://api.anthropic.com/v1/messages";
}

function parseAiJson(value) {
  const text = String(value || "").trim();
  if (!text) throw new Error("AI extraction returned empty text.");
  try {
    return JSON.parse(text);
  } catch (_error) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]+?)\s*```/i)?.[1];
    if (fenced) return JSON.parse(fenced);
    const jsonBlock = text.match(/\{[\s\S]*\}/)?.[0];
    if (jsonBlock) return JSON.parse(jsonBlock);
    throw new Error("AI extraction did not return valid JSON.");
  }
}

function sanitizeAiReview(reviewed, fallback) {
  const safe = reviewed && typeof reviewed === "object" ? reviewed : {};
  const extraction = {
    name: canonicalizeChemicalName(safe.name || fallback.name || ""),
    cas: normalizeFlatString(safe.cas ?? fallback.cas),
    ghsCodes: normalizeAiCodes(safe.ghsCodes ?? fallback.ghsCodes),
    physicalForm: normalizeFlatString(safe.physicalForm ?? fallback.physicalForm),
    concentration: normalizeFlatString(safe.concentration ?? fallback.concentration),
    notes: normalizeFlatString(safe.notes ?? fallback.notes),
  };
  return {
    extraction,
    warnings: Array.isArray(safe.warnings) ? safe.warnings.map(normalizeFlatString).filter(Boolean) : [],
    missingFields: Array.isArray(safe.missingFields) ? safe.missingFields.map(normalizeFlatString).filter(Boolean) : [],
    confidence: ["high", "medium", "low"].includes(String(safe.confidence || "").toLowerCase())
      ? String(safe.confidence).toLowerCase()
      : "medium",
  };
}

function normalizeFlatString(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeAiCodes(value) {
  return unique(
    String(value ?? "")
      .split(/[;,\s]+/)
      .map((item) => item.trim().toUpperCase())
      .filter((item) => /^(?:EUH\d+|H\d{3})$/.test(item))
  ).join(";");
}

function buildAiReviewStatus(reviewed) {
  const parts = [`AI extraction complete (${reviewed.confidence} confidence)`];
  if (reviewed.warnings?.length) parts.push(`warnings: ${reviewed.warnings.slice(0, 2).join("; ")}`);
  if (reviewed.missingFields?.length) parts.push(`missing: ${reviewed.missingFields.slice(0, 3).join(", ")}`);
  return parts.join(". ") + ".";
}

function parseSdsText(text) {
  const productDescription = text.match(/Product Description\s*:?\s*([^\n]+?)(?=\s{2,}|Synonyms|Cat No|CAS No|Index No)/i)?.[1];
  const synonym = text.match(/Synonyms\s+([^\n]+?)(?=\s{2,}|Index No|CAS No|EC No)/i)?.[1];
  const cas = text.match(/CAS No\.?\s*([0-9-]+)/i)?.[1] || "";
  const weight = text.match(/Weight\s*%\s*([^\n]+?)(?=\s{2,}|Flam\.|Eye Irrit|STOT|$)/i)?.[1] || "";
  const hCodes = Array.from(new Set((text.match(/\b(?:EUH\d+|H\d{3})\b/g) || []).map((code) => code.toUpperCase())));
  const physicalForm = /physical state\s+liquid/i.test(text) ? "Liquid" : (/physical state\s+solid/i.test(text) ? "Solid" : "");
  const notes = summarizeHazardsFromCodes(hCodes);
  return {
    name: canonicalizeChemicalName(productDescription || synonym || ""),
    cas,
    ghsCodes: hCodes.join(";"),
    concentration: weight.replace(/\s+/g, " ").trim(),
    physicalForm,
    notes,
  };
}

function applyExtracted(extracted) {
  for (const [key, value] of Object.entries(extracted)) {
    if (key === "ghsCodes") form.ghsCodes.value = value || form.ghsCodes.value;
    else if (key === "physicalForm") form.physicalForm.value = value || form.physicalForm.value;
    else if (key === "concentration") form.concentration.value = value || form.concentration.value;
    else if (key === "notes") form.notes.value = value || form.notes.value;
    else if (form[key]) form[key].value = value || form[key].value;
  }
}

function renderAssessment() {
  const row = getFormData();
  const assessment = assessRow(row);
  const entries = buildHazardEntries(row, assessment);

  ui.riskRating.textContent = titleCase(assessment.riskBand);
  ui.hazardTags.textContent = assessment.hazardTags.length ? assessment.hazardTags.map(pretty).join(", ") : "-";
  ui.ppeSummary.textContent = normalizePpe(assessment.recommendedPpe).join(", ");
  ui.hazardTableBody.innerHTML = entries.map((entry) => `
    <tr>
      <td>${escapeHtml(entry.area)}</td>
      <td>${escapeHtml(entry.hazard)}</td>
      <td>${escapeHtml(entry.risk)}</td>
      <td>${escapeHtml(entry.controls).replace(/\n/g, "<br>")}</td>
      <td>${escapeHtml(entry.rating)}</td>
    </tr>
  `).join("");

  ui.fireText.textContent = summarizeFirefighting(assessment.hazardTags);
  ui.spillPrecautions.textContent = summarizeSpillPrecautions(assessment.hazardTags, assessment.engineeringControls).replace(/\n/g, " ");
  ui.spillCleanup.textContent = summarizeSpillCleanup(assessment.hazardTags, assessment.wasteFlags).replace(/\n/g, " ");

  const firstAid = summarizeFirstAid(assessment.hazardTags);
  ui.firstAidList.innerHTML = Object.values(firstAid).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  updateManualRiskUi(assessment.manualRisk);
  setStatus("Assessment updated.");
}

function buildAssessment() {
  renderAssessment();
  previewWorkbook();
  saveFieldHistory();
  setStatus("Assessment built and workbook preview updated.");
}

function getFormData() {
  return {
    name: canonicalizeChemicalName(form.name.value),
    cas: form.cas.value.trim(),
    ghsCodes: form.ghsCodes.value.trim(),
    physicalForm: form.physicalForm.value.trim(),
    concentration: form.concentration.value.trim(),
    assessor: form.assessor.value.trim(),
    location: form.location.value.trim(),
    date: form.date.value.trim(),
    peopleCount: form.peopleCount.value.trim(),
    supervisor: form.supervisor.value.trim(),
    notes: form.notes.value.trim(),
    manualRiskEnabled: form.manualRiskEnabled.checked,
    manualHazardScore: Number(form.manualHazardScore.value),
    manualSeverity: form.manualSeverity.value.trim(),
    manualProbability: form.manualProbability.value.trim(),
  };
}

function assessRow(row) {
  const codes = normalizeCodes(row.ghsCodes);
  const matched = codes.map((code) => HAZARD_RULES[code]).filter(Boolean);
  const severity = matched.length ? Math.max(...matched.map((rule) => rule.severity || 1)) : 1;
  const hazardTags = unique(matched.flatMap((rule) => rule.tags || []));
  const recommendedPpe = unique(matched.flatMap((rule) => rule.ppe || []));
  const engineeringControls = unique(matched.flatMap((rule) => rule.controls || []));
  const storageFlags = unique(matched.flatMap((rule) => rule.storage || []));
  const wasteFlags = unique(matched.flatMap((rule) => rule.waste || []));
  const manualRisk = assessManualRisk(row);
  return {
    codes,
    severity: manualRisk.enabled ? manualRisk.effectiveSeverity : severity,
    riskBand: manualRisk.enabled ? manualRisk.riskBand : riskBand(severity),
    hazardTags,
    recommendedPpe,
    engineeringControls,
    storageFlags,
    wasteFlags,
    manualRisk,
  };
}

function buildHazardEntries(row, assessment) {
  const band = titleCase(assessment.riskBand);
  const tags = orderedUseTags(assessment.hazardTags);
  const entries = [];

  entries.push({
    area: "Storage",
    hazard: tags[0] ? HAZARD_LIBRARY[tags[0]]?.hazard || "Chemical hazard" : "Chemical hazard",
    risk: primaryRiskText(tags) || "Exposure",
    controls: summarizeStorage(tags, assessment.storageFlags),
    rating: band,
  });

  for (const [index, tag] of tags.entries()) {
    const template = HAZARD_LIBRARY[tag] || { hazard: "Handling exposure", risk: primaryRiskText(tags) || "Exposure", controls: ["Review SDS before use."] };
    entries.push({
      area: index === 0 ? "Use" : "",
      hazard: template.hazard,
      risk: template.risk,
      controls: template.controls.join("\n"),
      rating: band,
    });
  }

  entries.push({
    area: "Waste",
    hazard: tags[0] ? HAZARD_LIBRARY[tags[0]]?.hazard || "Hazardous waste" : "Hazardous waste",
    risk: primaryRiskText(tags) || "Exposure or environmental release",
    controls: summarizeDisposal(tags, assessment.wasteFlags),
    rating: band,
  });
  return entries.slice(0, 6);
}

function downloadWorkbook() {
  const row = getFormData();
  const assessment = assessRow(row);
  const entries = buildHazardEntries(row, assessment);
  const firstAid = summarizeFirstAid(assessment.hazardTags);
  const wb = buildWorkbook(row, assessment, entries, firstAid);
  const baseName = slugify(row.name || "chemical");
  return saveWorkbookFile(wb, `${baseName}.xlsx`, row.name || "chemical");
}

function previewWorkbook() {
  const row = getFormData();
  const assessment = assessRow(row);
  const entries = buildHazardEntries(row, assessment);
  const firstAid = summarizeFirstAid(assessment.hazardTags);
  const wb = buildWorkbook(row, assessment, entries, firstAid);
  renderWorkbookPreview(wb, row.name || "chemical");
  setStatus("Workbook preview updated.");
}

function buildWorkbook(row, assessment, entries, firstAid) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(Array.from({ length: 44 }, () => Array(6).fill("")));
  const setCell = (cell, value) => { ws[cell] = { t: "s", v: value ?? "" }; };
  const ppe = normalizePpe(assessment.recommendedPpe);

  setCell("A1", "Chemical Risk Assessment Form");
  setCell("A3", "Chemical Name");
  setCell("C3", row.name);
  setCell("E3", "Assessor");
  setCell("F3", row.assessor);
  setCell("A5", "Location/Room No.");
  setCell("C5", row.location);
  setCell("E5", "Date");
  setCell("F5", row.date);
  setCell("A6", "No. of people working in this location");
  setCell("C6", row.peopleCount);

  setCell("A8", "Area");
  setCell("B8", "Hazard");
  setCell("C8", "Risks");
  setCell("D8", "Protection and Prevention Measures");
  setCell("F8", "Risk Rating");

  const hazardRows = [9, 10, 11, 12, 13, 14];
  entries.forEach((entry, index) => {
    const rowNo = hazardRows[index];
    if (!rowNo) return;
    setCell(`A${rowNo}`, entry.area);
    setCell(`B${rowNo}`, entry.hazard);
    setCell(`C${rowNo}`, entry.risk);
    setCell(`D${rowNo}`, entry.controls);
    setCell(`F${rowNo}`, entry.rating);
  });

  setCell("A17", "Emergency Procedures");
  setCell("A18", "In case of fire:");
  setCell("A19", "Extinguishing media:");
  setCell("C19", summarizeFirefighting(assessment.hazardTags));
  setCell("A26", "In case of accidental release:");
  setCell("C27", summarizeSpillPrecautions(assessment.hazardTags, assessment.engineeringControls));
  setCell("C28", summarizeSpillCleanup(assessment.hazardTags, assessment.wasteFlags));

  setCell("A31", "Personal Protection Equipment");
  setCell("C31", ppe[0] || "");
  setCell("C32", ppe[1] || "");
  setCell("C33", ppe[2] || "");

  setCell("A34", "First Aid");
  setCell("C34", firstAid.ingestion);
  setCell("C35", firstAid.inhalation);
  setCell("C36", firstAid.eyes);
  setCell("C37", firstAid.skin);

  setCell("A40", "Other Information");
  setCell("C40", [`CAS: ${row.cas || "-"}`, `GHS: ${assessment.codes.join(", ") || "-"}`].join("\n"));
  setCell("A44", "Assessor's signature");
  setCell("C44", row.assessor);
  setCell("E44", "Supervisor's signature (if assessor is a student)");
  setCell("F44", row.supervisor);

  ws["!cols"] = [{ wch: 22 }, { wch: 24 }, { wch: 30 }, { wch: 46 }, { wch: 4 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, ws, "Risk Assessment");
  return wb;
}

function renderWorkbookPreview(workbook, displayName) {
  const sheetName = workbook.SheetNames[0];
  const ws = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1:F44");
  let html = "<table class=\"sheet-preview-table\"><tbody>";

  for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex += 1) {
    html += "<tr>";
    for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex += 1) {
      const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: colIndex });
      const cell = ws[cellAddress];
      const value = cell?.v ?? "";
      const classes = [];
      if ([0, 7, 16, 30, 33, 39, 43].includes(rowIndex) && colIndex === 0) classes.push("sheet-section");
      else if (colIndex === 0 || (rowIndex === 7 && [1, 2, 3, 5].includes(colIndex)) || ([2, 4].includes(colIndex) && [2, 4].includes(rowIndex))) classes.push("sheet-label");
      html += `<td class="${classes.join(" ")}">${escapeHtml(String(value)).replace(/\n/g, "<br>")}</td>`;
    }
    html += "</tr>";
  }

  html += "</tbody></table>";
  ui.workbookPreview.classList.remove("empty");
  ui.workbookPreview.innerHTML = html;
  ui.workbookPreviewMeta.textContent = `Previewing sheet "${sheetName}" for ${displayName || "chemical"}.`;
}

function normalizeCodes(raw) {
  return raw.split(/[;,]/).map((item) => item.trim().toUpperCase()).filter(Boolean);
}

function canonicalizeChemicalName(value) {
  let text = String(value || "").trim();
  text = text.replace(/\([^)]*\)/g, "");
  text = text.replace(/\[[^\]]*\]/g, "");
  text = text.replace(/,?\s+\b(technical|laboratory|lab|solution|mixture|reagent|absolute|anhydrous)\b.*$/i, "");
  text = text.replace(/\s+\d+(?:[.,]\d+)?\s*%.*$/i, "");
  text = text.replace(/\s+\b\d+(?:[.,]\d+)?\s*(?:wt%|w\/w|v\/v|vol%|purity)\b.*$/i, "");
  return text.replace(/\s{2,}/g, " ").trim().replace(/[ ,;-]+$/, "");
}

function summarizeHazardsFromCodes(codes) {
  const parts = [];
  if (codes.includes("H225")) parts.push("Highly flammable liquid and vapour.");
  if (codes.includes("H319")) parts.push("Causes serious eye irritation.");
  if (codes.includes("H336")) parts.push("May cause drowsiness or dizziness.");
  return parts.join(" ");
}

function assessManualRisk(row) {
  const hazardScore = Number.isFinite(row.manualHazardScore) ? row.manualHazardScore : 2;
  const severityWeights = { low: 1, medium: 2, high: 4 };
  const probabilityWeights = { unlikely: 1, likely: 2, highly_likely: 4 };
  const severityWeight = severityWeights[row.manualSeverity] || 2;
  const probabilityWeight = probabilityWeights[row.manualProbability] || 2;
  const matrixScore = severityWeight * probabilityWeight;
  let riskBand = "low";
  if (matrixScore >= 8) riskBand = "high";
  else if (matrixScore >= 3) riskBand = "medium";
  const effectiveSeverity = riskBand === "high" ? 4 : (riskBand === "medium" ? 3 : 2);
  return {
    enabled: Boolean(row.manualRiskEnabled),
    hazardScore,
    hazardLabel: hazardScoreLabel(hazardScore),
    severity: row.manualSeverity || "medium",
    probability: row.manualProbability || "likely",
    matrixScore,
    riskBand,
    effectiveSeverity,
  };
}

function hazardScoreLabel(score) {
  const labels = {
    0: "Minimal hazard",
    1: "Slight hazard",
    2: "Moderate hazard",
    3: "Serious hazard",
    4: "Extreme or severe danger",
  };
  return labels[score] || "Moderate hazard";
}

function updateManualRiskUi(manualRisk) {
  if (!manualRisk) return;
  ui.manualHazardDisplay.textContent = `${manualRisk.hazardScore} - ${manualRisk.hazardLabel}`;
  ui.manualRiskSummary.textContent = `Manual matrix score: ${manualRisk.matrixScore}. Manual risk level: ${titleCase(manualRisk.riskBand)}.${manualRisk.enabled ? " Manual override is active." : " Automatic H-code-based rating is active."}`;
}

function riskBand(severity) {
  if (severity >= 5) return "critical";
  if (severity === 4) return "high";
  if (severity === 3) return "medium";
  if (severity === 2) return "low";
  return "minimal";
}

function orderedUseTags(tags) {
  const ordered = USE_HAZARD_PRIORITY.filter((tag) => tags.includes(tag));
  return ordered.length ? ordered : tags;
}

function primaryRiskText(tags) {
  for (const tag of tags) {
    if (HAZARD_LIBRARY[tag]?.risk) return HAZARD_LIBRARY[tag].risk;
  }
  return "";
}

function summarizeStorage(tags, storageFlags) {
  for (const tag of tags) {
    if (STANDARD_TEXT.storage[tag]) return STANDARD_TEXT.storage[tag];
  }
  return storageFlags.length ? "Store according to designated hazardous chemical storage." : STANDARD_TEXT.storage.default;
}

function summarizeDisposal(tags, wasteFlags) {
  for (const tag of tags) {
    if (STANDARD_TEXT.disposal[tag]) return STANDARD_TEXT.disposal[tag];
  }
  return wasteFlags.length ? "Collect in the designated hazardous waste stream." : STANDARD_TEXT.disposal.default;
}

function summarizeFirefighting(tags) {
  return tags.includes("flammable") ? STANDARD_TEXT.fire.flammable : STANDARD_TEXT.fire.default;
}

function summarizeSpillPrecautions(tags, controls) {
  const lines = [...STANDARD_TEXT.spillPrecautions.default];
  if (tags.includes("flammable")) lines.push(...STANDARD_TEXT.spillPrecautions.flammable);
  if (controls.length) lines.push(pretty(controls[0]).replace(/_/g, " ") + ".");
  return unique(lines).slice(0, 3).join("\n");
}

function summarizeSpillCleanup(tags, wasteFlags) {
  const lines = tags.includes("aquatic_toxicity") ? [...STANDARD_TEXT.spillCleanup.aquatic_toxicity] : [...STANDARD_TEXT.spillCleanup.default];
  if (wasteFlags.length) lines.push(pretty(wasteFlags[0]).replace(/_/g, " ") + ".");
  return unique(lines).slice(0, 3).join("\n");
}

function summarizeFirstAid(tags) {
  const result = { ...STANDARD_TEXT.firstAid };
  if (tags.includes("acute_toxicity_oral") || tags.includes("toxic_if_swallowed")) {
    result.ingestion = "If swallowed: rinse mouth with water. Seek immediate medical attention.";
  }
  if (tags.includes("corrosive")) {
    result.eyes = "If in eyes: rinse cautiously with water for several minutes and seek immediate medical attention.";
    result.skin = "If on skin: wash immediately with plenty of water and remove contaminated clothing.";
  }
  return result;
}

function normalizePpe(items) {
  const merged = unique(["nitrile_gloves", "safety_glasses", "lab_coat", ...items]);
  return merged.slice(0, 3).map((item) => titleCase(pretty(item)));
}

function slugify(value) {
  return String(value).trim().replace(/[^A-Za-z0-9._-]+/g, "_").replace(/^[._-]+|[._-]+$/g, "") || "chemical";
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function titleCase(value) {
  return String(value).replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function pretty(value) {
  return String(value || "").replace(/_/g, " ");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function setStatus(message) {
  ui.status.textContent = message;
}

async function runSafely(action) {
  try {
    await action();
  } catch (error) {
    setStatus(`Error: ${error?.message || String(error)}`);
  }
}

function initializeApp() {
  updateVersionStamp();
  populateFieldHistoryOptions();
  updateSaveFolderStatus();
  loadAiSettings();
  renderAssessment();
}

function populateFieldHistoryOptions() {
  const history = loadFieldHistory();
  renderDatalist(fieldHistoryUi.assessorOptions, history.assessor || []);
  renderDatalist(fieldHistoryUi.locationOptions, history.location || []);
}

function renderDatalist(element, values) {
  element.innerHTML = "";
  for (const value of values) {
    const option = document.createElement("option");
    option.value = value;
    element.appendChild(option);
  }
}

function loadFieldHistory() {
  try {
    const saved = localStorage.getItem(FIELD_HISTORY_STORAGE_KEY);
    if (!saved) return { assessor: [], location: [] };
    const parsed = JSON.parse(saved);
    return {
      assessor: Array.isArray(parsed?.assessor) ? parsed.assessor.filter(Boolean) : [],
      location: Array.isArray(parsed?.location) ? parsed.location.filter(Boolean) : [],
    };
  } catch (_error) {
    return { assessor: [], location: [] };
  }
}

function saveFieldHistory() {
  const history = loadFieldHistory();
  const next = {
    assessor: mergeHistory(history.assessor, form.assessor.value),
    location: mergeHistory(history.location, form.location.value),
  };
  localStorage.setItem(FIELD_HISTORY_STORAGE_KEY, JSON.stringify(next));
  renderDatalist(fieldHistoryUi.assessorOptions, next.assessor);
  renderDatalist(fieldHistoryUi.locationOptions, next.location);
}

function mergeHistory(existing, value) {
  const normalized = String(value || "").trim();
  if (!normalized) return existing;
  const merged = [normalized, ...existing.filter((item) => item !== normalized)];
  return merged.slice(0, 20);
}

async function chooseSaveFolder() {
  if (!window.showDirectoryPicker) {
    setStatus("Folder picker is not supported in this browser. Using normal browser download instead.");
    return;
  }
  saveDirectoryHandle = await window.showDirectoryPicker({ mode: "readwrite" });
  updateSaveFolderStatus();
  setStatus("Save folder selected.");
}

function updateSaveFolderStatus() {
  ui.saveFolderStatus.textContent = saveDirectoryHandle
    ? `Save folder: ${saveDirectoryHandle.name}`
    : "Save folder: browser download default";
}

async function saveWorkbookFile(workbook, filename, displayName) {
  if (saveDirectoryHandle) {
    const fileHandle = await saveDirectoryHandle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    const data = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    await writable.write(data);
    await writable.close();
    renderWorkbookPreview(workbook, displayName);
    setStatus(`Saved ${filename} to selected folder.`);
    return;
  }
  XLSX.writeFile(workbook, filename);
  renderWorkbookPreview(workbook, displayName);
  setStatus(`Downloaded ${filename}.`);
}

function updateVersionStamp() {
  const stamp = new Date(document.lastModified);
  if (Number.isNaN(stamp.getTime())) {
    ui.versionStamp.textContent = "Last edited: unknown";
    return;
  }
  const yyyy = stamp.getUTCFullYear();
  const mm = String(stamp.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(stamp.getUTCDate()).padStart(2, "0");
  const hh = String(stamp.getUTCHours()).padStart(2, "0");
  const min = String(stamp.getUTCMinutes()).padStart(2, "0");
  ui.versionStamp.textContent = `Last edited: ${yyyy}-${mm}-${dd} ${hh}:${min} UTC`;
}

function getEffectiveDefaultAiSettings() {
  return {
    ...DEFAULT_AI_SETTINGS,
    provider: typeof localAiConfig.provider === "string" && localAiConfig.provider.trim() ? localAiConfig.provider.trim() : DEFAULT_AI_SETTINGS.provider,
    model: typeof localAiConfig.model === "string" && localAiConfig.model.trim() ? localAiConfig.model.trim() : DEFAULT_AI_SETTINGS.model,
    apiKey: typeof localAiConfig.apiKey === "string" ? localAiConfig.apiKey : DEFAULT_AI_SETTINGS.apiKey,
    baseUrl: typeof localAiConfig.baseUrl === "string" ? localAiConfig.baseUrl : DEFAULT_AI_SETTINGS.baseUrl,
  };
}

function loadAiSettings() {
  let settings = getEffectiveDefaultAiSettings();
  try {
    const saved = localStorage.getItem(AI_SETTINGS_STORAGE_KEY);
    if (saved) settings = normalizeAiSettings(JSON.parse(saved));
  } catch (_error) {
    settings = getEffectiveDefaultAiSettings();
  }
  aiSettingsForm.provider.value = settings.provider;
  aiSettingsForm.model.value = settings.model;
  aiSettingsForm.apiKey.value = settings.apiKey;
  aiSettingsForm.baseUrl.value = settings.baseUrl;
  aiSettingsForm.systemPrompt.value = settings.systemPrompt;
}

function readAiSettings() {
  return {
    version: AI_SETTINGS_VERSION,
    provider: aiSettingsForm.provider.value.trim(),
    model: aiSettingsForm.model.value.trim(),
    apiKey: aiSettingsForm.apiKey.value,
    baseUrl: aiSettingsForm.baseUrl.value.trim(),
    systemPrompt: aiSettingsForm.systemPrompt.value.trim(),
  };
}

function saveAiSettings() {
  localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(readAiSettings()));
  setStatus("AI settings saved locally in this browser.");
}

function resetAiSettings() {
  localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(getEffectiveDefaultAiSettings()));
  loadAiSettings();
  setStatus("AI settings reset to defaults.");
}

function normalizeAiSettings(saved) {
  const incoming = saved && typeof saved === "object" ? saved : {};
  const effectiveDefaults = getEffectiveDefaultAiSettings();
  const migrated = {
    ...effectiveDefaults,
    apiKey: typeof incoming.apiKey === "string" && incoming.apiKey.trim() ? incoming.apiKey : effectiveDefaults.apiKey,
    baseUrl: typeof incoming.baseUrl === "string" ? incoming.baseUrl : effectiveDefaults.baseUrl,
  };
  localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
}
