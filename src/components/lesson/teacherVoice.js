const FEMALE_HINTS = [
  "female",
  "samantha",
  "google uk english female",
  "microsoft zira",
  "microsoft sonia",
  "karen",
  "tessa",
  "serena",
];

const HINDI_HINTS = [
  "hindi",
  "hi-in",
  "google hindi",
  "google \u0939\u093f\u0902\u0926\u0940",
  "google \u0939\u0928\u0926",
  "microsoft kalpana",
];

function normalizeLanguage(language) {
  return String(language || "").toLowerCase().startsWith("hi") ? "hi" : "en";
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => text.includes(pattern));
}

function scoreVoice(voice, languageKey) {
  const name = String(voice?.name || "").toLowerCase();
  const lang = String(voice?.lang || "").toLowerCase();
  let score = voice?.default ? 4 : 0;

  if (languageKey === "hi") {
    if (lang.startsWith("hi")) score += 70;
    if (includesAny(name, HINDI_HINTS)) score += 42;
    if (includesAny(name, FEMALE_HINTS)) score += 18;
    if (name.includes("hemant")) score -= 18;
    if (lang.startsWith("en")) score -= 8;
  } else {
    if (lang.startsWith("en-us") || lang.startsWith("en-gb")) score += 34;
    if (includesAny(name, FEMALE_HINTS)) score += 42;
    if (name.includes("google uk english female")) score += 18;
    if (name.includes("zira") || name.includes("sonia") || name.includes("karen") || name.includes("tessa") || name.includes("serena")) score += 12;
    if (name.includes("hemant")) score -= 12;
    if (lang.startsWith("hi")) score -= 6;
  }

  return score;
}

export function getPreferredTeacherVoice(language, voices = []) {
  const languageKey = normalizeLanguage(language);
  const fallbackLang = languageKey === "hi" ? "hi-IN" : "en-US";

  if (!Array.isArray(voices) || voices.length === 0) {
    return { voice: null, lang: fallbackLang, voiceLabel: fallbackLang };
  }

  const preferredPool = voices.filter((voice) => String(voice?.lang || "").toLowerCase().startsWith(languageKey));
  const pool = preferredPool.length ? preferredPool : voices;

  const sorted = [...pool].sort((a, b) => scoreVoice(b, languageKey) - scoreVoice(a, languageKey));
  const voice = sorted[0] || null;
  const lang = voice?.lang || fallbackLang;
  const voiceLabel = voice ? `${voice.name} (${lang})` : fallbackLang;

  return { voice, lang, voiceLabel };
}
