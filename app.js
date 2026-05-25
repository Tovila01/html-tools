const HAZARD_RULES = {
  H225: { severity: 4, tags: ["flammable"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["keep_away_from_ignition", "use_in_ventilated_area"], storage: ["flammables_cabinet"], waste: ["flammable_organic_waste"] },
  H290: { severity: 3, tags: ["corrosive_to_metals"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["segregate_from_metals"], storage: ["corrosives_storage"], waste: ["corrosive_waste"] },
  H300: { severity: 5, tags: ["acute_toxicity_oral"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_all_ingestion", "restricted_handling"], storage: ["toxics_storage"], waste: ["hazardous_toxic_waste"] },
  H301: { severity: 4, tags: ["toxic_if_swallowed"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_all_ingestion"], storage: ["toxics_storage"], waste: ["hazardous_toxic_waste"] },
  H302: { severity: 3, tags: ["harmful_if_swallowed"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_all_ingestion"], storage: ["toxics_storage"], waste: ["hazardous_toxic_waste"] },
  H314: { severity: 5, tags: ["corrosive", "skin_burns", "eye_damage"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood_if_volatile", "have_spill_kit_ready"], storage: ["corrosives_storage"], waste: ["corrosive_waste"] },
  H315: { severity: 2, tags: ["skin_irritant"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_skin_contact"], storage: [], waste: [] },
  H317: { severity: 3, tags: ["skin_sensitizer"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["avoid_skin_contact", "avoid_repeated_exposure"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H319: { severity: 2, tags: ["eye_irritant"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: [], storage: [], waste: [] },
  H332: { severity: 3, tags: ["harmful_if_inhaled"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["use_fume_hood", "avoid_breathing_vapours_or_dust"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H335: { severity: 3, tags: ["respiratory_irritant"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["use_fume_hood"], storage: [], waste: [] },
  H336: { severity: 2, tags: ["narcotic_effects"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["use_in_ventilated_area"], storage: [], waste: [] },
  H340: { severity: 5, tags: ["mutagenicity"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H350: { severity: 5, tags: ["carcinogen"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H351: { severity: 4, tags: ["suspected_carcinogen"], ppe: ["safety_glasses", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_repeated_exposure"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H360: { severity: 5, tags: ["reproductive_toxicity"], ppe: ["safety_glasses", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_skin_contact", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H360FD: { severity: 5, tags: ["reproductive_toxicity"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_skin_contact", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H361FD: { severity: 4, tags: ["reproductive_toxicity"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "minimize_exposure", "avoid_skin_contact"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H372: { severity: 5, tags: ["organ_toxicity_repeated"], ppe: ["chemical_goggles", "lab_coat", "chemical_resistant_gloves"], controls: ["use_fume_hood", "avoid_repeated_exposure", "restricted_handling"], storage: ["health_hazard_storage"], waste: ["hazardous_organic_waste"] },
  H410: { severity: 4, tags: ["aquatic_toxicity"], ppe: ["safety_glasses", "lab_coat", "nitrile_gloves"], controls: ["prevent_release_to_drain"], storage: [], waste: ["hazardous_aqueous_waste"] },
};

const USE_HAZARD_PRIORITY = [
  "flammable",
  "acute_toxicity_oral",
  "toxic_if_swallowed",
  "harmful_if_swallowed",
  "harmful_if_inhaled",
  "mutagenicity",
  "carcinogen",
  "organ_toxicity_repeated",
  "reproductive_toxicity",
  "corrosive",
  "skin_irritant",
  "skin_sensitizer",
  "eye_irritant",
  "respiratory_irritant",
  "narcotic_effects",
  "suspected_carcinogen",
  "aquatic_toxicity",
];

const HAZARD_LIBRARY = {
  flammable: { hazard: "Highly flammable", risk: "Fire", controls: ["Keep away from sources of ignition.", "Use only in a well ventilated area."] },
  acute_toxicity_oral: { hazard: "Acute toxicity", risk: "Poisoning if swallowed", controls: ["Avoid ingestion.", "Do not work alone if high-toxicity handling is required."] },
  toxic_if_swallowed: { hazard: "Toxic if swallowed", risk: "Poisoning if swallowed", controls: ["Avoid ingestion.", "Wash hands after handling."] },
  harmful_if_swallowed: { hazard: "Harmful if swallowed", risk: "Poisoning if swallowed", controls: ["Avoid ingestion.", "Wash hands after handling."] },
  harmful_if_inhaled: { hazard: "Harmful if inhaled", risk: "Inhalation exposure", controls: ["Avoid breathing vapours or aerosols.", "Use in a fume hood or well ventilated area."] },
  corrosive: { hazard: "Corrosive", risk: "Skin burns or serious eye damage", controls: ["Wear splash protection and suitable gloves.", "Handle carefully and avoid direct contact."] },
  skin_irritant: { hazard: "Skin irritant", risk: "Skin irritation", controls: ["Avoid skin contact.", "Wear protective gloves and wash after handling."] },
  skin_sensitizer: { hazard: "Skin sensitizer", risk: "Allergic skin reaction", controls: ["Avoid skin contact.", "Prevent repeated exposure."] },
  eye_irritant: { hazard: "Eye irritant", risk: "Eye irritation", controls: ["Wear safety glasses or goggles."] },
  respiratory_irritant: { hazard: "Respiratory irritant", risk: "Respiratory irritation", controls: ["Avoid breathing vapours or dust.", "Use in a fume hood or well ventilated area."] },
  narcotic_effects: { hazard: "Vapour exposure", risk: "Drowsiness or dizziness", controls: ["Avoid breathing vapours.", "Use in a well ventilated area."] },
  mutagenicity: { hazard: "Mutagenicity hazard", risk: "Genetic damage", controls: ["Minimize exposure.", "Use in a fume hood and restrict handling."] },
  carcinogen: { hazard: "Carcinogen", risk: "Long-term cancer risk", controls: ["Minimize exposure.", "Use in a fume hood and restrict handling."] },
  suspected_carcinogen: { hazard: "Suspected carcinogen", risk: "Long-term health effects", controls: ["Minimize exposure.", "Use in a fume hood."] },
  reproductive_toxicity: { hazard: "Reproductive toxin", risk: "Reproductive health effects", controls: ["Minimize exposure.", "Avoid skin contact and inhalation."] },
  organ_toxicity_repeated: { hazard: "Repeated exposure toxicity", risk: "Organ damage through repeated exposure", controls: ["Avoid repeated exposure.", "Use engineering controls and restrict handling."] },
  aquatic_toxicity: { hazard: "Environmental hazard", risk: "Environmental release", controls: ["Prevent release to drains."] },
};

const HAZARD_STATEMENTS = {
  H225: "Highly flammable liquid and vapour.",
  H290: "May be corrosive to metals.",
  H300: "Fatal if swallowed.",
  H301: "Toxic if swallowed.",
  H302: "Harmful if swallowed.",
  H314: "Causes severe skin burns and eye damage.",
  H315: "Causes skin irritation.",
  H317: "May cause an allergic skin reaction.",
  H319: "Causes serious eye irritation.",
  H332: "Harmful if inhaled.",
  H335: "May cause respiratory irritation.",
  H336: "May cause drowsiness or dizziness.",
  H340: "May cause genetic defects.",
  H350: "May cause cancer.",
  H351: "Suspected of causing cancer.",
  H360: "May damage fertility or the unborn child.",
  H360FD: "May damage fertility. May damage the unborn child.",
  H361FD: "Suspected of damaging fertility. Suspected of damaging the unborn child.",
  H372: "Causes damage to organs through prolonged or repeated exposure.",
  H410: "Very toxic to aquatic life with long lasting effects.",
};

const HAZARD_STATEMENT_VARIANTS = {
  H360: ["May damage fertility or the unborn child."],
  H360FD: ["May damage fertility. May damage the unborn child."],
  H361FD: ["Suspected of damaging fertility. Suspected of damaging the unborn child."],
};

const TAG_RISK_CODE_PRIORITY = {
  flammable: ["H225"],
  acute_toxicity_oral: ["H300", "H301", "H302"],
  toxic_if_swallowed: ["H301", "H302"],
  harmful_if_swallowed: ["H302"],
  harmful_if_inhaled: ["H332"],
  corrosive: ["H314"],
  skin_irritant: ["H315"],
  skin_sensitizer: ["H317"],
  eye_irritant: ["H319"],
  respiratory_irritant: ["H335"],
  narcotic_effects: ["H336"],
  mutagenicity: ["H340"],
  carcinogen: ["H350"],
  suspected_carcinogen: ["H351"],
  reproductive_toxicity: ["H360FD", "H360", "H361FD"],
  organ_toxicity_repeated: ["H372"],
  aquatic_toxicity: ["H410"],
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
    carcinogen: "Store in designated health hazard storage.",
    mutagenicity: "Store in designated health hazard storage.",
    reproductive_toxicity: "Store in designated health hazard storage.",
    organ_toxicity_repeated: "Store in designated health hazard storage.",
    default: "Store in a compatible, clearly labelled container.",
  },
  disposal: {
    flammable: "Collect in non-halogenated or flammable solvent waste.",
    corrosive: "Collect in corrosive hazardous waste.",
    carcinogen: "Collect as hazardous chemical waste with carcinogenic or chronic-toxicity precautions.",
    mutagenicity: "Collect as hazardous chemical waste with chronic-toxicity precautions.",
    reproductive_toxicity: "Collect as hazardous chemical waste with reproductive-toxicity precautions.",
    organ_toxicity_repeated: "Collect as hazardous chemical waste with chronic-toxicity precautions.",
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
const EXTRACTION_MODE_STORAGE_KEY = "safety-assessment-generator-extraction-mode";
const WORKBOOK_TEMPLATE_PATH = "./ChemicalRiskAssessment_blank.xlsx";
const APP_BUILD_INFO = {
  commit: "",
  builtAtUtc: "2026-05-25 16:56 UTC",
};
const AI_SETTINGS_VERSION = 5;
const LEGACY_DEFAULT_SYSTEM_PROMPT = [
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
  "13. Put stripped descriptors such as grade, technical condition, particle form, or other qualifiers into `nameDetails` instead of the `name` field.",
  "Examples: return `Ethanol`, not `Ethanol 69%`; return `Acetone`, not `Acetone technical`; return `Hydrochloric acid`, not `Hydrochloric acid 37%`.",
  "Example: for `Calcium chloride, fused, granular`, return `Calcium chloride` as `name` and `fused, granular` as `nameDetails`.",
  "",
  "Return valid JSON only.",
].join("\n");
const PREVIOUS_GENERAL_SYSTEM_PROMPT = [
  "You extract structured chemical safety information from source documents.",
  "Use only the provided text as evidence.",
  "",
  "Primary objective:",
  "Produce conservative, reproducible, machine-readable extraction with no unsupported assumptions.",
  "",
  "Rules:",
  "1. Treat the provided document text as the only source of truth.",
  "2. Do not use outside knowledge.",
  "3. Do not invent values, classifications, identifiers, controls, or instructions.",
  "4. Prefer direct extraction over interpretation.",
  "5. If a field is missing, unclear, contradictory, or not explicitly supported, leave it empty and report that uncertainty.",
  "6. If multiple candidate values appear, choose the most explicit document-supported value and mention ambiguity in warnings.",
  "7. Keep outputs concise, deterministic, and operational.",
  "8. Do not output prose outside the requested JSON schema.",
  "9. Keep hazard codes, statements, first aid, handling, storage, disposal, and PPE aligned to what is explicitly present in the source.",
  "10. Normalize the chemical name to the core name only, while moving supporting qualifiers or descriptors into separate detail fields when available.",
  "11. Preserve relevant hazard code suffixes and combined classifications exactly when they are present in the source.",
  "12. Lower confidence when the source appears incomplete, low quality, OCR-corrupted, or internally inconsistent.",
  "",
  "Return valid JSON only.",
].join("\n");
const DEFAULT_AI_SETTINGS = {
  version: AI_SETTINGS_VERSION,
  provider: "gemini",
  model: "gemini-3.5-flash",
  apiKey: "",
  baseUrl: "",
  systemPrompt: [
    "You extract structured chemical safety information from source documents.",
    "Work only from the provided text.",
    "",
    "Primary objective:",
    "Produce reliable structured extraction with minimal assumptions.",
    "",
    "Rules:",
    "1. Use the document text as the only evidence base.",
    "2. Do not add information that is not supported by the source.",
    "3. Prefer explicit document content over inference.",
    "4. When information is missing, unclear, or conflicting, keep the field empty and report uncertainty.",
    "5. When multiple possible values appear, prefer the clearest supported value and note ambiguity.",
    "6. Normalize outputs into a concise and consistent structured form.",
    "7. Keep related safety details aligned with the content that is explicitly present in the source.",
    "8. Reduce confidence when the source appears incomplete, noisy, or internally inconsistent.",
    "9. Return only the requested structured output.",
    "",
    "Return valid JSON only.",
  ].join("\n"),
};
const localAiConfig = (typeof window !== "undefined" && window.SAFETY_ASSESSMENT_LOCAL_CONFIG && typeof window.SAFETY_ASSESSMENT_LOCAL_CONFIG === "object")
  ? window.SAFETY_ASSESSMENT_LOCAL_CONFIG
  : {};
let extractedNameDetails = "";
let latestAssessmentReview = null;
let latestAssessmentPayload = null;
let latestAssessmentSignature = "";
let latestSourceDocumentText = "";
let workbookTemplateBuffer = null;
const ASSESSMENT_REVIEW_SYSTEM_PROMPT = [
  "You review completed chemical safety assessments against the chemical safety information provided from the source document.",
  "Judge whether the finished assessment is materially aligned with the safety profile of the chemical.",
  "Focus on whether the generated assessment omits, understates, overstates, or distorts relevant safety information from the source.",
  "Do not anchor your review to the intermediate form fields unless they help identify a source-supported correction.",
  "Your job is not to rewrite everything. Only suggest targeted last-mile fixes if something looks wrong, inconsistent, incomplete, or unsupported.",
  "Use the source safety information and the generated workbook as the primary evidence.",
  "Do not invent new hazard codes or unsupported facts.",
  "If the assessment already looks acceptable, return no changes.",
  "Return valid JSON only.",
].join("\n");
const ASSESSMENT_BUILD_SYSTEM_PROMPT = [
  "You generate structured chemical risk assessment content from provided chemical and safety data.",
  "Use only the provided data.",
  "Return a complete, conservative, machine-readable JSON assessment.",
  "Do not add unsupported facts.",
  "Keep risk text aligned to explicit hazard statements when available.",
  "Keep controls concise, operational, and relevant to the hazard profile.",
  "Always include storage, use, and waste coverage.",
  "Return valid JSON only.",
].join("\n");

const form = {
  pdfFile: document.querySelector("#pdfFile"),
  pdfExtractionMode: document.querySelector("#pdfExtractionMode"),
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
  reviewStatus: document.querySelector("#reviewStatus"),
  reviewSuggestions: document.querySelector("#reviewSuggestions"),
  reviewAssessmentButton: document.querySelector("#reviewAssessmentButton"),
  applyReviewButton: document.querySelector("#applyReviewButton"),
};

let saveDirectoryHandle = null;

document.querySelector("#chooseFolderButton").addEventListener("click", () => runSafely(chooseSaveFolder));
document.querySelector("#extractPdfButton").addEventListener("click", () => runSafely(extractFromPdf));
document.querySelector("#buildButton").addEventListener("click", () => runSafely(buildAssessment));
document.querySelector("#clearAssessmentButton").addEventListener("click", () => runSafely(clearAssessment));
document.querySelector("#downloadButton").addEventListener("click", () => runSafely(downloadWorkbook));
ui.reviewAssessmentButton.addEventListener("click", () => runSafely(reviewAssessment));
ui.applyReviewButton.addEventListener("click", () => runSafely(applyReviewSuggestions));
aiSettingsForm.saveButton.addEventListener("click", saveAiSettings);
aiSettingsForm.resetButton.addEventListener("click", resetAiSettings);
form.assessor.addEventListener("change", persistHistoryField);
form.assessor.addEventListener("blur", persistHistoryField);
form.location.addEventListener("change", persistHistoryField);
form.location.addEventListener("blur", persistHistoryField);
form.name.addEventListener("input", handleManualNameEdit);
form.pdfExtractionMode.addEventListener("change", persistExtractionMode);
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
  latestSourceDocumentText = text;
  const fallbackExtraction = parseSdsText(text);
  const extractionMode = getSelectedExtractionMode();
  let finalExtraction = fallbackExtraction;
  let statusSuffix = "OCR/local extraction complete.";

  if (extractionMode === "ai") {
    setStatus("Running AI extraction...");
    const reviewed = await extractWithAiFromPdfText(text, fallbackExtraction);
    finalExtraction = reviewed.extraction || fallbackExtraction;
    statusSuffix = reviewed.usedAi
      ? buildAiReviewStatus(reviewed)
      : reviewed.reason || "AI extraction unavailable, using local fallback.";
  }

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
    "If explicit written hazard statements clearly correspond to standard H-statements, return the matching H-codes in `ghsCodes` even when the SDS prints only the sentence and not the code.",
    "Preserve empty fields if the source does not support a value.",
    "Return strict JSON with this schema only:",
    "{",
    '  "name": string,',
    '  "nameDetails": string,',
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

async function callAiReview(settings, prompt, systemPromptOverride = "") {
  switch (settings.provider) {
    case "gemini":
      return callGeminiReview(settings, prompt, systemPromptOverride);
    case "anthropic":
      return callAnthropicReview(settings, prompt, systemPromptOverride);
    case "openai":
    case "groq":
    case "openrouter":
    case "custom":
      return callOpenAiCompatibleReview(settings, prompt, systemPromptOverride);
    default:
      throw new Error(`Unsupported AI provider: ${settings.provider}`);
  }
}

async function callGeminiReview(settings, prompt, systemPromptOverride = "") {
  const apiKey = settings.apiKey.trim();
  const model = settings.model.trim();
  const baseUrl = settings.baseUrl.trim() || "https://generativelanguage.googleapis.com/v1beta";
  const response = await fetch(`${baseUrl}/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPromptOverride ? `${systemPromptOverride}\n\n${prompt}` : prompt }] }],
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

async function callAnthropicReview(settings, prompt, systemPromptOverride = "") {
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
      system: systemPromptOverride || settings.systemPrompt,
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

async function callOpenAiCompatibleReview(settings, prompt, systemPromptOverride = "") {
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
        { role: "system", content: systemPromptOverride || settings.systemPrompt },
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
  const fallbackNameMeta = splitChemicalNameDetails(fallback.name || "");
  const normalizedName = canonicalizeChemicalName(safe.name || fallbackNameMeta.baseName || fallback.name || "");
  const resolvedGhsCodes = resolveAiGhsCodes(safe, fallback);
  const extraction = {
    name: normalizedName,
    nameDetails: normalizeNameDetails(safe.nameDetails ?? fallback.nameDetails ?? fallbackNameMeta.details, normalizedName),
    cas: normalizeFlatString(safe.cas ?? fallback.cas),
    ghsCodes: resolvedGhsCodes,
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

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeNameDetails(value, baseName = "") {
  let text = normalizeFlatString(value);
  const normalizedBase = canonicalizeChemicalName(baseName);
  if (!text) return "";
  text = text.replace(/^name details\s*:\s*/i, "");
  if (normalizedBase) {
    text = text.replace(new RegExp(`^${escapeRegExp(normalizedBase)}\\s*[,;:-]?\\s*`, "i"), "");
  }
  return text.replace(/^[,;:-]+\s*/, "").trim();
}

function normalizeAiCodes(value) {
  return extractHazardCodes(value).join(";");
}

function resolveAiGhsCodes(reviewed, fallback) {
  const candidates = [
    normalizeAiCodes(reviewed?.ghsCodes),
    normalizeAiCodes(reviewed?.notes),
    normalizeAiCodes(fallback?.ghsCodes),
    normalizeAiCodes(fallback?.notes),
  ].filter(Boolean);
  return candidates[0] || "";
}

function buildAiReviewStatus(reviewed) {
  const parts = [`AI extraction complete (${reviewed.confidence} confidence)`];
  if (reviewed.warnings?.length) parts.push(`warnings: ${reviewed.warnings.slice(0, 2).join("; ")}`);
  if (reviewed.missingFields?.length) parts.push(`missing: ${reviewed.missingFields.slice(0, 3).join(", ")}`);
  return parts.join(". ") + ".";
}

async function reviewAssessment() {
  const settings = readAiSettings();
  if (!settings.apiKey?.trim() || !settings.model?.trim() || !settings.provider?.trim()) {
    setReviewStatus("AI review unavailable. Set provider, model, and API key first.");
    setStatus("AI review is unavailable until provider, model, and API key are set.");
    return;
  }
  const row = getFormData();
  const resolved = await resolveAssessmentPayload(row, { preferAi: true });
  const { assessment, entries, firstAid } = resolved.payload;
  const workbook = await buildWorkbook(row, assessment, entries, firstAid);
  const workbookReviewData = serializeWorkbookForReview(workbook);
  const prompt = [
    "Review this completed chemical safety assessment against the chemical safety information from the source document.",
    "Your main question is whether the created assessment is appropriate for this particular chemical.",
    "Base your reasoning on the source safety information and the generated workbook output, not on simple agreement with the intermediate input fields.",
    "Flag missing, understated, overstated, vague, or unsupported safety content in the finished assessment.",
    "Do not report GHS nomenclature as missing if GHS / H-codes are present anywhere in the workbook, including combined summary fields such as the bottom 'Other Information' section.",
    "In this workbook, GHS information may appear bundled together with CAS and name details instead of in a separate dedicated GHS row.",
    "Suggest only final targeted changes that should be applied.",
    "Return strict JSON with this schema only:",
    "{",
    '  "looksGood": boolean,',
    '  "summary": string,',
    '  "warnings": string[],',
    '  "suggestions": [{"field": string, "value": string, "reason": string}]',
    "}",
    "",
    `Source safety information:\n${latestSourceDocumentText || "No source document text available in this session."}`,
    "",
    `Intermediate form data (secondary context only):\n${JSON.stringify(row, null, 2)}`,
    "",
    `Assessment summary:\n${JSON.stringify({
      riskBand: assessment.riskBand,
      hazardTags: assessment.hazardTags,
      recommendedPpe: assessment.recommendedPpe,
      engineeringControls: assessment.engineeringControls,
      storageFlags: assessment.storageFlags,
      wasteFlags: assessment.wasteFlags,
      entries,
    }, null, 2)}`,
    "",
    `Generated workbook content:\n${JSON.stringify(workbookReviewData, null, 2)}`,
  ].join("\n");

  setStatus("Reviewing assessment with AI...");
  setReviewRunningState(true);
  setReviewStatus("AI is reviewing the assessment...");
  try {
    const rawResponse = await callAiReview(settings, prompt, ASSESSMENT_REVIEW_SYSTEM_PROMPT);
    latestAssessmentReview = sanitizeAssessmentReview(parseAiJson(rawResponse), workbookReviewData);
    renderAssessmentReview(latestAssessmentReview);
    setReviewStatus(latestAssessmentReview.looksGood ? "AI review complete. No changes suggested." : "AI review complete. Suggestions are ready.");
    setStatus(latestAssessmentReview.looksGood ? "Assessment review complete. No changes suggested." : "Assessment review complete. Suggestions are ready to apply.");
  } catch (error) {
    setReviewStatus(`AI review failed: ${error?.message || String(error)}`);
    throw error;
  } finally {
    setReviewRunningState(false);
  }
}

function sanitizeAssessmentReview(reviewed, workbookReviewData = null) {
  const safe = reviewed && typeof reviewed === "object" ? reviewed : {};
  const allowedFields = new Set(["name", "cas", "ghsCodes", "physicalForm", "concentration", "assessor", "location", "date", "peopleCount", "supervisor", "notes", "nameDetails"]);
  let suggestions = Array.isArray(safe.suggestions) ? safe.suggestions
    .filter((item) => item && typeof item === "object" && allowedFields.has(String(item.field || "")))
    .map((item) => ({
      field: String(item.field),
      value: normalizeFlatString(item.value),
      reason: normalizeFlatString(item.reason),
    }))
    .filter((item) => item.value || item.reason) : [];
  let warnings = Array.isArray(safe.warnings) ? safe.warnings.map(normalizeFlatString).filter(Boolean) : [];
  let summary = normalizeFlatString(safe.summary || "");
  if (workbookHasGhsData(workbookReviewData)) {
    suggestions = suggestions.filter((item) => !(item.field === "ghsCodes" && reviewTextImpliesMissingGhs(`${item.value} ${item.reason}`)));
    warnings = warnings.filter((item) => !reviewTextImpliesMissingGhs(item));
    summary = stripMissingGhsSentences(summary);
  }
  const looksGood = suggestions.length === 0 && warnings.length === 0
    ? (Boolean(safe.looksGood) || !summary)
    : false;
  return {
    looksGood,
    summary,
    warnings,
    suggestions,
  };
}

function renderAssessmentReview(review) {
  if (!review) {
    ui.reviewSuggestions.classList.add("empty");
    ui.reviewSuggestions.innerHTML = "No review suggestions yet.";
    ui.applyReviewButton.disabled = true;
    return;
  }
  const lines = [];
  if (review.summary) lines.push(`<p><strong>Summary:</strong> ${escapeHtml(review.summary)}</p>`);
  if (review.warnings.length) {
    lines.push(`<p><strong>Warnings:</strong> ${review.warnings.map(escapeHtml).join("; ")}</p>`);
  }
  if (review.suggestions.length) {
    lines.push("<ul class=\"review-suggestion-list\">");
    for (const suggestion of review.suggestions) {
      lines.push(`<li><strong>${escapeHtml(titleCase(suggestion.field))}:</strong> ${escapeHtml(suggestion.value || "(clear field)")}${suggestion.reason ? ` <span class="review-reason">(${escapeHtml(suggestion.reason)})</span>` : ""}</li>`);
    }
    lines.push("</ul>");
  } else {
    lines.push("<p>No suggested changes.</p>");
  }
  ui.reviewSuggestions.classList.remove("empty");
  ui.reviewSuggestions.innerHTML = lines.join("");
  ui.applyReviewButton.disabled = review.suggestions.length === 0;
}

function applyReviewSuggestions() {
  if (!latestAssessmentReview?.suggestions?.length) {
    setStatus("No review suggestions to apply.");
    return;
  }
  for (const suggestion of latestAssessmentReview.suggestions) {
    if (suggestion.field === "nameDetails") {
      extractedNameDetails = normalizeNameDetails(suggestion.value, form.name.value);
      continue;
    }
    if (form[suggestion.field]) {
      form[suggestion.field].value = suggestion.value;
    }
  }
  renderAssessment();
  previewWorkbook();
  setStatus("Applied AI review suggestions.");
}

function setReviewStatus(message) {
  ui.reviewStatus.textContent = message;
}

function setReviewRunningState(isRunning) {
  ui.reviewStatus.classList.toggle("running", Boolean(isRunning));
  ui.reviewAssessmentButton.disabled = Boolean(isRunning);
  ui.reviewAssessmentButton.textContent = isRunning ? "Reviewing..." : "Review Assessment";
}

function serializeWorkbookForReview(workbook) {
  const sheetName = workbook?.SheetNames?.[0];
  const ws = sheetName ? workbook.Sheets[sheetName] : null;
  if (!sheetName || !ws) {
    return { sheetName: "", range: "", keyCells: {}, filledCells: [], rows: [] };
  }
  const range = ws["!ref"] || "A1";
  const matrix = XLSX.utils.sheet_to_json(ws, {
    header: 1,
    raw: false,
    blankrows: true,
    defval: "",
  });
  const filledCells = [];
  for (const [address, cell] of Object.entries(ws)) {
    if (address.startsWith("!")) continue;
    const value = normalizeFlatString(cell?.w ?? cell?.v ?? "");
    if (!value) continue;
    filledCells.push({ cell: address, value });
  }
  filledCells.sort((a, b) => compareCellAddresses(a.cell, b.cell));
  const keyCellAddresses = [
    "C3", "F3", "C5", "F5", "C6",
    "A9", "B9", "C9", "D9", "F9",
    "A10", "B10", "C10", "D10", "F10",
    "A11", "B11", "C11", "D11", "F11",
    "A12", "B12", "C12", "D12", "F12",
    "A13", "B13", "C13", "D13", "F13",
    "A14", "B14", "C14", "D14", "F14",
    "C19", "C27", "C28", "C31", "C32", "C33", "C34", "C35", "C36", "C37", "C40", "C44", "F44",
  ];
  const keyCells = Object.fromEntries(
    keyCellAddresses.map((address) => [address, normalizeFlatString(ws[address]?.w ?? ws[address]?.v ?? "")])
  );
  return {
    sheetName,
    range,
    keyCells,
    filledCells,
    rows: matrix.map((row, index) => ({
      rowNumber: index + 1,
      values: Array.isArray(row) ? row.map((value) => normalizeFlatString(value)) : [],
    })),
  };
}

function compareCellAddresses(left, right) {
  const leftCell = XLSX.utils.decode_cell(left);
  const rightCell = XLSX.utils.decode_cell(right);
  if (leftCell.r !== rightCell.r) return leftCell.r - rightCell.r;
  return leftCell.c - rightCell.c;
}

function workbookHasGhsData(workbookReviewData) {
  const keyCells = workbookReviewData?.keyCells || {};
  const values = [
    keyCells.C40,
    ...Object.values(keyCells),
    ...(workbookReviewData?.filledCells || []).map((item) => item?.value || ""),
  ]
    .map((value) => normalizeFlatString(value))
    .filter(Boolean);
  return values.some((value) => /\bGHS\s*:|\bH\d{3}\b|\bEUH\d+\b/i.test(value));
}

function reviewTextImpliesMissingGhs(text) {
  const normalized = normalizeFlatString(text).toLowerCase();
  if (!normalized) return false;
  const mentionsGhs = /\bghs\b|\bh-?codes?\b|hazard statements?|nomenclature/.test(normalized);
  const saysMissing = /\bmissing\b|\bnot present\b|\bnot included\b|\babsent\b|\bno\b|\black(?:ing)?\b/.test(normalized);
  return mentionsGhs && saysMissing;
}

function stripMissingGhsSentences(text) {
  if (!text) return "";
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => normalizeFlatString(item))
    .filter(Boolean)
    .filter((item) => !reviewTextImpliesMissingGhs(item));
  return sentences.join(" ");
}

function parseSdsText(text) {
  const productDescription = text.match(/Product Description\s*:?\s*([^\n]+?)(?=\s{2,}|Synonyms|Cat No|CAS No|Index No)/i)?.[1];
  const synonym = text.match(/Synonyms\s+([^\n]+?)(?=\s{2,}|Index No|CAS No|EC No)/i)?.[1];
  const rawName = String(productDescription || synonym || "").trim();
  const nameMeta = splitChemicalNameDetails(rawName);
  const cas = text.match(/CAS No\.?\s*([0-9-]+)/i)?.[1] || "";
  const weight = text.match(/Weight\s*%\s*([^\n]+?)(?=\s{2,}|Flam\.|Eye Irrit|STOT|$)/i)?.[1] || "";
  const hCodes = extractHazardCodes(text);
  const physicalForm = /physical state\s+liquid/i.test(text) ? "Liquid" : (/physical state\s+solid/i.test(text) ? "Solid" : "");
  const notes = summarizeHazardsFromCodes(hCodes);
  return {
    name: canonicalizeChemicalName(nameMeta.baseName || rawName),
    nameDetails: nameMeta.details,
    cas,
    ghsCodes: hCodes.join(";"),
    concentration: weight.replace(/\s+/g, " ").trim(),
    physicalForm,
    notes,
  };
}

function applyExtracted(extracted) {
  extractedNameDetails = normalizeNameDetails(extracted.nameDetails || "", extracted.name || form.name.value);
  for (const [key, value] of Object.entries(extracted)) {
    if (key === "ghsCodes") form.ghsCodes.value = value || form.ghsCodes.value;
    else if (key === "nameDetails") continue;
    else if (key === "physicalForm") form.physicalForm.value = value || form.physicalForm.value;
    else if (key === "concentration") form.concentration.value = value || form.concentration.value;
    else if (key === "notes") form.notes.value = value || form.notes.value;
    else if (form[key]) form[key].value = value || form[key].value;
  }
}

function handleManualNameEdit() {
  extractedNameDetails = "";
}

function renderAssessment() {
  const row = getFormData();
  const payload = buildDeterministicAssessmentPayload(row);
  renderAssessmentPayload(payload);
  setStatus("Assessment updated.");
}

async function buildAssessment() {
  const row = getFormData();
  const resolved = await resolveAssessmentPayload(row, { preferAi: true });
  renderAssessmentPayload(resolved.payload);
  await previewWorkbook(resolved.payload, row);
  saveFieldHistory();
  setStatus(resolved.usedAi ? "Assessment built from AI JSON and workbook preview updated." : "Assessment built with local fallback and workbook preview updated.");
}

function clearAssessment() {
  form.pdfFile.value = "";
  form.name.value = "";
  form.cas.value = "";
  form.ghsCodes.value = "";
  form.physicalForm.value = "";
  form.concentration.value = "";
  form.location.value = "";
  form.date.value = new Date().toLocaleDateString("en-GB").replace(/\//g, "/");
  form.peopleCount.value = "";
  form.notes.value = "";
  form.manualRiskEnabled.checked = false;
  form.manualHazardScore.value = "2";
  form.manualSeverity.value = "medium";
  form.manualProbability.value = "likely";
  extractedNameDetails = "";
  latestSourceDocumentText = "";
  latestAssessmentReview = null;
  renderAssessmentReview(null);
  setReviewStatus("AI review idle.");
  setReviewRunningState(false);
  ui.workbookPreview.classList.add("empty");
  ui.workbookPreview.innerHTML = "Generate or preview the XLSX to inspect the form in the browser.";
  ui.workbookPreviewMeta.textContent = "No workbook generated yet.";
  renderAssessment();
  setStatus("Assessment cleared.");
}

function getFormData() {
  const normalizedName = canonicalizeChemicalName(form.name.value);
  return {
    name: normalizedName,
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
    nameDetails: normalizeNameDetails(extractedNameDetails, normalizedName),
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

function buildDeterministicAssessmentPayload(row) {
  const assessment = assessRow(row);
  const entries = buildHazardEntries(row, assessment);
  const firstAid = summarizeFirstAid(assessment.hazardTags);
  return {
    assessment: {
      ...assessment,
      fireText: summarizeFirefighting(assessment.hazardTags),
      spillPrecautions: summarizeSpillPrecautions(assessment.hazardTags, assessment.engineeringControls),
      spillCleanup: summarizeSpillCleanup(assessment.hazardTags, assessment.wasteFlags),
    },
    entries,
    firstAid,
  };
}

async function resolveAssessmentPayload(row, options = {}) {
  const signature = JSON.stringify(row);
  if (!options.force && latestAssessmentPayload && latestAssessmentSignature === signature) {
    return { payload: latestAssessmentPayload, usedAi: false, cached: true };
  }
  const fallbackPayload = buildDeterministicAssessmentPayload(row);
  const settings = readAiSettings();
  const aiAvailable = Boolean(options.preferAi && settings.apiKey?.trim() && settings.model?.trim() && settings.provider?.trim());
  if (!aiAvailable) {
    latestAssessmentPayload = fallbackPayload;
    latestAssessmentSignature = signature;
    return { payload: fallbackPayload, usedAi: false };
  }

  try {
    const prompt = [
      "Build a structured chemical risk assessment JSON from the provided data.",
      "Always cover storage, use, and waste.",
      "Use explicit hazard statement wording when available.",
      "Return strict JSON with this schema only:",
      "{",
      '  "assessment": {',
      '    "riskBand": string,',
      '    "hazardTags": string[],',
      '    "recommendedPpe": string[],',
      '    "engineeringControls": string[],',
      '    "storageFlags": string[],',
      '    "wasteFlags": string[],',
      '    "fireText": string,',
      '    "spillPrecautions": string,',
      '    "spillCleanup": string',
      '  },',
      '  "entries": [{"area": string, "hazard": string, "risk": string, "controls": string, "rating": string}],',
      '  "firstAid": {"ingestion": string, "inhalation": string, "eyes": string, "skin": string}',
      "}",
      "",
      `Form data:\n${JSON.stringify(row, null, 2)}`,
      "",
      `Deterministic fallback assessment:\n${JSON.stringify(fallbackPayload, null, 2)}`,
    ].join("\n");
    const rawResponse = await callAiReview(settings, prompt, ASSESSMENT_BUILD_SYSTEM_PROMPT);
    const aiPayload = sanitizeAssessmentBuildPayload(parseAiJson(rawResponse), fallbackPayload);
    latestAssessmentPayload = aiPayload;
    latestAssessmentSignature = signature;
    return { payload: aiPayload, usedAi: true };
  } catch (_error) {
    latestAssessmentPayload = fallbackPayload;
    latestAssessmentSignature = signature;
    return { payload: fallbackPayload, usedAi: false };
  }
}

function buildHazardEntries(row, assessment) {
  const band = titleCase(assessment.riskBand);
  const tags = orderedUseTags(assessment.hazardTags);
  const entries = [];
  const primaryTag = tags[0] || "";
  const primaryTemplate = HAZARD_LIBRARY[primaryTag] || null;
  const defaultUseRisk = buildRiskTextFromCodes(assessment.codes, assessment.codes.length) || primaryRiskText(tags) || "Hazardous chemical exposure.";
  const defaultUseControls = buildGenericUseControls(tags, assessment.engineeringControls);

  entries.push({
    area: "Storage",
    hazard: primaryTemplate?.hazard || "Chemical hazard",
    risk: buildRiskTextForTag(primaryTag, assessment.codes) || buildRiskTextFromCodes(assessment.codes, 2) || "Storage incompatibility or exposure.",
    controls: summarizeStorage(tags, assessment.storageFlags),
    rating: band,
  });

  entries.push({
    area: "Use",
    hazard: primaryTemplate?.hazard || "Handling exposure",
    risk: buildRiskTextFromCodes(assessment.codes, assessment.codes.length) || buildRiskTextForTag(primaryTag, assessment.codes) || primaryTemplate?.risk || defaultUseRisk,
    controls: primaryTemplate?.controls?.join("\n") || defaultUseControls,
    rating: band,
  });

  for (const tag of tags.slice(1)) {
    const template = HAZARD_LIBRARY[tag] || { hazard: "Handling exposure", risk: defaultUseRisk, controls: [defaultUseControls] };
    entries.push({
      area: "",
      hazard: template.hazard,
      risk: buildRiskTextForTag(tag, assessment.codes) || template.risk,
      controls: template.controls.join("\n"),
      rating: band,
    });
  }

  entries.push({
    area: "Waste",
    hazard: primaryTemplate?.hazard || "Hazardous waste",
    risk: buildRiskTextFromCodes(assessment.codes, 2) || primaryRiskText(tags) || "Exposure or environmental release.",
    controls: summarizeDisposal(tags, assessment.wasteFlags),
    rating: band,
  });
  return entries.slice(0, 6);
}

function sanitizeAssessmentBuildPayload(reviewed, fallbackPayload) {
  const safe = reviewed && typeof reviewed === "object" ? reviewed : {};
  const fallbackAssessment = fallbackPayload.assessment || {};
  const fallbackEntries = Array.isArray(fallbackPayload.entries) ? fallbackPayload.entries : [];
  const fallbackFirstAid = fallbackPayload.firstAid || {};
  const safeAssessment = safe.assessment && typeof safe.assessment === "object" ? safe.assessment : {};
  const assessment = {
    ...fallbackAssessment,
    riskBand: normalizeRiskBand(safeAssessment.riskBand) || fallbackAssessment.riskBand,
    hazardTags: normalizeStringArray(safeAssessment.hazardTags, fallbackAssessment.hazardTags),
    recommendedPpe: normalizeStringArray(safeAssessment.recommendedPpe, fallbackAssessment.recommendedPpe),
    engineeringControls: normalizeStringArray(safeAssessment.engineeringControls, fallbackAssessment.engineeringControls),
    storageFlags: normalizeStringArray(safeAssessment.storageFlags, fallbackAssessment.storageFlags),
    wasteFlags: normalizeStringArray(safeAssessment.wasteFlags, fallbackAssessment.wasteFlags),
    fireText: normalizeFlatString(safeAssessment.fireText) || fallbackAssessment.fireText,
    spillPrecautions: normalizeFlatString(safeAssessment.spillPrecautions) || fallbackAssessment.spillPrecautions,
    spillCleanup: normalizeFlatString(safeAssessment.spillCleanup) || fallbackAssessment.spillCleanup,
  };
  const entries = ensureCoreAreaEntries(
    Array.isArray(safe.entries) ? safe.entries.map((entry) => sanitizeEntry(entry)).filter(Boolean) : [],
    fallbackEntries
  ).slice(0, 6);
  const firstAidSource = safe.firstAid && typeof safe.firstAid === "object" ? safe.firstAid : {};
  const firstAid = {
    ingestion: normalizeFlatString(firstAidSource.ingestion) || fallbackFirstAid.ingestion,
    inhalation: normalizeFlatString(firstAidSource.inhalation) || fallbackFirstAid.inhalation,
    eyes: normalizeFlatString(firstAidSource.eyes) || fallbackFirstAid.eyes,
    skin: normalizeFlatString(firstAidSource.skin) || fallbackFirstAid.skin,
  };
  return { assessment, entries, firstAid };
}

function sanitizeEntry(entry) {
  if (!entry || typeof entry !== "object") return null;
  return {
    area: normalizeFlatString(entry.area),
    hazard: normalizeFlatString(entry.hazard),
    risk: normalizeFlatString(entry.risk),
    controls: normalizeFlatString(entry.controls),
    rating: normalizeFlatString(entry.rating),
  };
}

function ensureCoreAreaEntries(entries, fallbackEntries) {
  const normalizedEntries = Array.isArray(entries) ? entries.filter((entry) => entry && (entry.area || entry.hazard || entry.risk || entry.controls || entry.rating)) : [];
  const result = [...normalizedEntries];
  for (const requiredArea of ["Storage", "Use", "Waste"]) {
    if (!result.some((entry) => entry.area === requiredArea)) {
      const fallback = fallbackEntries.find((entry) => entry.area === requiredArea);
      if (fallback) result.push(fallback);
    }
  }
  return result;
}

function normalizeStringArray(value, fallback) {
  if (!Array.isArray(value)) return Array.isArray(fallback) ? fallback : [];
  const next = value.map(normalizeFlatString).filter(Boolean);
  return next.length ? next : (Array.isArray(fallback) ? fallback : []);
}

function normalizeRiskBand(value) {
  const normalized = normalizeFlatString(value).toLowerCase();
  return ["minimal", "low", "medium", "high", "critical"].includes(normalized) ? normalized : "";
}

function renderAssessmentPayload(payload) {
  const assessment = payload.assessment || {};
  const entries = Array.isArray(payload.entries) ? payload.entries : [];
  const firstAid = payload.firstAid || {};
  ui.riskRating.textContent = titleCase(assessment.riskBand || "-");
  ui.hazardTags.textContent = assessment.hazardTags?.length ? assessment.hazardTags.map(pretty).join(", ") : "-";
  ui.ppeSummary.textContent = normalizePpe(assessment.recommendedPpe || []).join(", ");
  ui.hazardTableBody.innerHTML = entries.map((entry) => `
    <tr>
      <td>${escapeHtml(entry.area)}</td>
      <td>${escapeHtml(entry.hazard)}</td>
      <td>${escapeHtml(entry.risk)}</td>
      <td>${escapeHtml(entry.controls).replace(/\n/g, "<br>")}</td>
      <td>${escapeHtml(entry.rating)}</td>
    </tr>
  `).join("");
  ui.fireText.textContent = assessment.fireText || "-";
  ui.spillPrecautions.textContent = String(assessment.spillPrecautions || "-").replace(/\n/g, " ");
  ui.spillCleanup.textContent = String(assessment.spillCleanup || "-").replace(/\n/g, " ");
  ui.firstAidList.innerHTML = Object.values(firstAid).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  updateManualRiskUi(assessment.manualRisk || assessManualRisk(getFormData()));
}

async function downloadWorkbook() {
  const row = getFormData();
  const resolved = await resolveAssessmentPayload(row, { preferAi: true });
  const { assessment, entries, firstAid } = resolved.payload;
  const wb = await buildWorkbook(row, assessment, entries, firstAid);
  const baseName = slugify(row.name || "chemical");
  return saveWorkbookFile(wb, `${baseName}.xlsx`, row.name || "chemical");
}

async function previewWorkbook(payload = null, row = null) {
  const effectiveRow = row || getFormData();
  const effectivePayload = payload || buildDeterministicAssessmentPayload(effectiveRow);
  const { assessment, entries, firstAid } = effectivePayload;
  const wb = await buildWorkbook(effectiveRow, assessment, entries, firstAid);
  renderWorkbookPreview(wb, effectiveRow.name || "chemical");
  setStatus("Workbook preview updated.");
}

async function buildWorkbook(row, assessment, entries, firstAid) {
  try {
    await ensureWorkbookTemplateLoaded();
  } catch (_error) {
    return buildWorkbookFallback(row, assessment, entries, firstAid);
  }
  if (workbookTemplateBuffer) {
    return buildWorkbookFromTemplate(row, assessment, entries, firstAid);
  }
  return buildWorkbookFallback(row, assessment, entries, firstAid);
}

function buildWorkbookFromTemplate(row, assessment, entries, firstAid) {
  const wb = XLSX.read(workbookTemplateBuffer.slice(0), { type: "array", cellStyles: true });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const ppe = normalizePpe(assessment.recommendedPpe);
  const setCell = (cell, value, styleSource = cell) => setTemplateCell(ws, cell, value, styleSource);

  setCell("C3", row.name);
  setCell("F3", row.assessor);
  setCell("C5", row.location);
  setCell("F5", row.date);
  setCell("C6", row.peopleCount);

  const hazardRows = [
    { rowNo: 9, areaStyle: "A9", hazardStyle: "B9", riskStyle: "C9", controlStyle: "D9", ratingStyle: "F9" },
    { rowNo: 10, areaStyle: "A10", hazardStyle: "B11", riskStyle: "C10", controlStyle: "D10", ratingStyle: "F10" },
    { rowNo: 11, areaStyle: "A11", hazardStyle: "B11", riskStyle: "C11", controlStyle: "D11", ratingStyle: "F11" },
    { rowNo: 12, areaStyle: "A12", hazardStyle: "B12", riskStyle: "C12", controlStyle: "D12", ratingStyle: "F12" },
    { rowNo: 13, areaStyle: "A13", hazardStyle: "B13", riskStyle: "C13", controlStyle: "D13", ratingStyle: "F13" },
    { rowNo: 14, areaStyle: "A14", hazardStyle: "B14", riskStyle: "C14", controlStyle: "D14", ratingStyle: "F14" },
  ];

  hazardRows.forEach(({ rowNo, areaStyle, hazardStyle, riskStyle, controlStyle, ratingStyle }, index) => {
    const entry = entries[index];
    setCell(`A${rowNo}`, entry?.area || "", areaStyle);
    setCell(`B${rowNo}`, entry?.hazard || "", hazardStyle);
    setCell(`C${rowNo}`, entry?.risk || "", riskStyle);
    setCell(`D${rowNo}`, entry?.controls || "", controlStyle);
    setCell(`F${rowNo}`, entry?.rating || "", ratingStyle);
  });

  setCell("C19", summarizeFirefighting(assessment.hazardTags), "C19");
  setCell("C27", summarizeSpillPrecautions(assessment.hazardTags, assessment.engineeringControls), "C27");
  setCell("C28", summarizeSpillCleanup(assessment.hazardTags, assessment.wasteFlags), "C28");

  setCell("C31", ppe[0] || "", "C31");
  setCell("C32", ppe[1] || "", "C32");
  setCell("C33", ppe[2] || "", "C33");

  setCell("C34", firstAid.ingestion, "C34");
  setCell("C35", firstAid.inhalation, "C35");
  setCell("C36", firstAid.eyes, "C36");
  setCell("C37", firstAid.skin, "C37");

  setCell("C40", [
    `CAS: ${row.cas || "-"}`,
    `GHS: ${assessment.codes.join(", ") || "-"}`,
    row.nameDetails ? `Name details: ${row.nameDetails}` : "",
  ].filter(Boolean).join("\n"), "C40");
  setCell("C44", row.assessor, "C44");
  setCell("F44", row.supervisor, "F44");

  return wb;
}

function setTemplateCell(ws, address, value, styleSource = address) {
  const source = ws[styleSource] || {};
  const cell = ws[address] || {};
  cell.t = "s";
  cell.v = value ?? "";
  if (source.s !== undefined) cell.s = source.s;
  if (source.z !== undefined) cell.z = source.z;
  ws[address] = cell;
}

function buildWorkbookFallback(row, assessment, entries, firstAid) {
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
  setCell("C40", [
    `CAS: ${row.cas || "-"}`,
    `GHS: ${assessment.codes.join(", ") || "-"}`,
    row.nameDetails ? `Name details: ${row.nameDetails}` : "",
  ].filter(Boolean).join("\n"));
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
  return extractHazardCodes(raw);
}

function extractHazardCodes(value) {
  const text = String(value ?? "");
  const explicitCodes = (text.toUpperCase().match(/\b(?:EUH\d+|H\d{3}[A-Z]{0,3})\b/g) || [])
    .map((item) => item.trim())
    .filter(Boolean);
  return unique([...explicitCodes, ...inferHazardCodesFromStatements(text)]);
}

function normalizeHazardStatementText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferHazardCodesFromStatements(value) {
  const normalizedSource = normalizeHazardStatementText(value);
  if (!normalizedSource) return [];
  const inferred = [];
  for (const [code, statement] of Object.entries(HAZARD_STATEMENTS)) {
    const variants = unique([statement, ...(HAZARD_STATEMENT_VARIANTS[code] || [])])
      .map((item) => normalizeHazardStatementText(item))
      .filter(Boolean);
    if (variants.some((variant) => normalizedSource.includes(variant))) {
      inferred.push(code);
    }
  }
  return inferred;
}

function canonicalizeChemicalName(value) {
  let text = String(value || "").trim();
  text = splitChemicalNameDetails(text).baseName || text;
  text = text.replace(/\([^)]*\)/g, "");
  text = text.replace(/\[[^\]]*\]/g, "");
  text = text.replace(/,?\s+\b(technical|laboratory|lab|solution|mixture|reagent|absolute|anhydrous)\b.*$/i, "");
  text = text.replace(/\s+\d+(?:[.,]\d+)?\s*%.*$/i, "");
  text = text.replace(/\s+\b\d+(?:[.,]\d+)?\s*(?:wt%|w\/w|v\/v|vol%|purity)\b.*$/i, "");
  return text.replace(/\s{2,}/g, " ").trim().replace(/[ ,;-]+$/, "");
}

function splitChemicalNameDetails(value) {
  const raw = String(value || "").trim();
  if (!raw.includes(",")) return { baseName: raw, details: "" };
  const parts = raw.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return { baseName: raw, details: "" };
  return {
    baseName: parts[0],
    details: parts.slice(1).join(", "),
  };
}

function summarizeHazardsFromCodes(codes) {
  const parts = [];
  if (codes.includes("H302")) parts.push("Harmful if swallowed.");
  if (codes.includes("H315")) parts.push("Causes skin irritation.");
  if (codes.includes("H317")) parts.push("May cause an allergic skin reaction.");
  if (codes.includes("H225")) parts.push("Highly flammable liquid and vapour.");
  if (codes.includes("H319")) parts.push("Causes serious eye irritation.");
  if (codes.includes("H332")) parts.push("Harmful if inhaled.");
  if (codes.includes("H336")) parts.push("May cause drowsiness or dizziness.");
  if (codes.includes("H340")) parts.push("May cause genetic defects.");
  if (codes.includes("H350")) parts.push("May cause cancer.");
  if (codes.includes("H360")) parts.push("May damage fertility or the unborn child.");
  if (codes.includes("H360FD")) parts.push("May damage fertility. May damage the unborn child.");
  if (codes.includes("H361FD")) parts.push("Suspected of damaging fertility. Suspected of damaging the unborn child.");
  if (codes.includes("H372")) parts.push("Causes organ damage through prolonged or repeated exposure.");
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

function buildRiskTextForTag(tag, codes) {
  const preferredCodes = TAG_RISK_CODE_PRIORITY[tag] || [];
  const statements = preferredCodes
    .filter((code) => codes.includes(code))
    .map((code) => HAZARD_STATEMENTS[code])
    .filter(Boolean);
  if (statements.length) return statements.join(" ");
  return "";
}

function buildRiskTextFromCodes(codes, limit = 3) {
  const statements = codes
    .map((code) => HAZARD_STATEMENTS[code])
    .filter(Boolean)
    .slice(0, limit);
  return statements.join(" ");
}

function buildGenericUseControls(tags, engineeringControls) {
  const lines = [];
  if (engineeringControls.includes("use_fume_hood") || tags.includes("harmful_if_inhaled") || tags.includes("respiratory_irritant") || tags.includes("mutagenicity") || tags.includes("carcinogen")) {
    lines.push("Use in a fume hood.");
  }
  if (tags.includes("skin_irritant") || tags.includes("skin_sensitizer") || tags.includes("reproductive_toxicity") || tags.includes("corrosive")) {
    lines.push("Avoid skin contact.");
  }
  if (tags.includes("harmful_if_inhaled") || tags.includes("respiratory_irritant")) {
    lines.push("Avoid breathing vapours, aerosols, or dust.");
  }
  if (tags.includes("acute_toxicity_oral") || tags.includes("toxic_if_swallowed") || tags.includes("harmful_if_swallowed")) {
    lines.push("Avoid ingestion and wash hands after handling.");
  }
  if (tags.includes("mutagenicity") || tags.includes("carcinogen") || tags.includes("organ_toxicity_repeated")) {
    lines.push("Minimize exposure and restrict handling to trained users.");
  }
  if (!lines.length) {
    lines.push("Use appropriate personal protective equipment.");
    lines.push("Avoid direct exposure during handling.");
  }
  return unique(lines).join("\n");
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

async function ensureWorkbookTemplateLoaded() {
  if (workbookTemplateBuffer) return workbookTemplateBuffer;
  const response = await fetch(WORKBOOK_TEMPLATE_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Template workbook could not be loaded (${response.status}).`);
  }
  workbookTemplateBuffer = await response.arrayBuffer();
  return workbookTemplateBuffer;
}

async function initializeApp() {
  updateVersionStamp();
  populateFieldHistoryOptions();
  updateSaveFolderStatus();
  loadAiSettings();
  loadExtractionMode();
  try {
    await ensureWorkbookTemplateLoaded();
  } catch (_error) {
    // Fallback workbook generation stays available if the template file cannot be loaded.
  }
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

function persistHistoryField() {
  saveFieldHistory();
}

function loadExtractionMode() {
  try {
    const savedMode = localStorage.getItem(EXTRACTION_MODE_STORAGE_KEY);
    if (savedMode === "ocr" || savedMode === "ai") {
      form.pdfExtractionMode.value = savedMode;
      return;
    }
  } catch (_error) {
    // Ignore localStorage failures and keep the default mode.
  }
  form.pdfExtractionMode.value = "ocr";
}

function persistExtractionMode() {
  try {
    localStorage.setItem(EXTRACTION_MODE_STORAGE_KEY, getSelectedExtractionMode());
  } catch (_error) {
    // Ignore localStorage failures.
  }
}

function getSelectedExtractionMode() {
  return form.pdfExtractionMode.value === "ai" ? "ai" : "ocr";
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
  if (APP_BUILD_INFO?.builtAtUtc) {
    const commitSuffix = APP_BUILD_INFO.commit ? ` (${APP_BUILD_INFO.commit})` : "";
    ui.versionStamp.textContent = `App build: ${APP_BUILD_INFO.builtAtUtc}${commitSuffix}`;
    return;
  }
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
  const incomingPrompt = typeof incoming.systemPrompt === "string" ? incoming.systemPrompt.trim() : "";
  const shouldRefreshPrompt = !incomingPrompt
    || incomingPrompt === LEGACY_DEFAULT_SYSTEM_PROMPT
    || incomingPrompt === PREVIOUS_GENERAL_SYSTEM_PROMPT
    || Number(incoming.version || 0) < AI_SETTINGS_VERSION;
  const migrated = {
    ...effectiveDefaults,
    version: AI_SETTINGS_VERSION,
    apiKey: typeof incoming.apiKey === "string" && incoming.apiKey.trim() ? incoming.apiKey : effectiveDefaults.apiKey,
    baseUrl: typeof incoming.baseUrl === "string" ? incoming.baseUrl : effectiveDefaults.baseUrl,
    provider: typeof incoming.provider === "string" && incoming.provider.trim() ? incoming.provider : effectiveDefaults.provider,
    model: typeof incoming.model === "string" && incoming.model.trim() ? incoming.model : effectiveDefaults.model,
    systemPrompt: shouldRefreshPrompt ? effectiveDefaults.systemPrompt : incomingPrompt,
  };
  localStorage.setItem(AI_SETTINGS_STORAGE_KEY, JSON.stringify(migrated));
  return migrated;
}
