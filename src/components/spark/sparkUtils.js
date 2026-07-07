function isLangObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) && ("en" in value || "hi" in value);
}

export function pickSparkText(value, isHindi, fallback = "") {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(Boolean).join(" ");
  if (isLangObject(value)) return isHindi ? value.hi || value.en || fallback : value.en || value.hi || fallback;
  return String(value);
}

export function summarizeSparkText(value, limit = 220) {
  const text = Array.isArray(value) ? value.filter(Boolean).join(" ") : String(value || "");
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

export function normalizeSparkContext(context = {}) {
  return {
    ...context,
    source: context.source || "general",
    moduleId: context.moduleId || "",
    moduleTitle: context.moduleTitle || "",
    lessonId: context.lessonId || "",
    lessonTitle: context.lessonTitle || "",
    sectionId: context.sectionId || "",
    sectionTitle: context.sectionTitle || "",
    textSummary: context.textSummary ?? context.sectionSummary ?? context.summary ?? "",
    imageCaption: context.imageCaption || context.caption || "",
    keyPoints: context.keyPoints || "",
    miniCheck: context.miniCheck || null,
    knowledge: context.knowledge || "",
    teacherScript: context.teacherScript || "",
  };
}

function hasKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

function knowledgeSummary(context, isHindi, limit = 260) {
  const teacherScript = summarizeSparkText(pickSparkText(context.teacherScript, isHindi, ""), limit);
  const keyPoints = summarizeSparkText(pickSparkText(context.keyPoints, isHindi, ""), limit);
  const knowledge = summarizeSparkText(pickSparkText(context.knowledge, isHindi, ""), limit);
  return [teacherScript, keyPoints, knowledge].filter(Boolean).join(" ");
}

function compactSparkAnswer(parts, limit = 220, maxSentences = 3) {
  const text = parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  if (!text) return "";
  const sentences = text
    .split(/(?<=[.!?।])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const compact = sentences.slice(0, maxSentences).join(" ");
  return compact.length > limit ? `${compact.slice(0, limit).trim()}...` : compact;
}

function outsideScopeMessage(isHindi) {
  return isHindi
    ? "मैं अभी उपलब्ध ElectroBasics lesson सामग्री से ही जवाब दे सकता हूँ। यह सवाल वर्तमान uploaded lesson content के बाहर है।"
    : "I can answer from the ElectroBasics lesson material available right now. This question is outside the current uploaded lesson content.";
}

function isOutsideScopePrompt(text) {
  const lower = String(text || "").toLowerCase();
  return hasKeyword(lower, [
    "weather",
    "capital",
    "news",
    "stock",
    "finance",
    "bitcoin",
    "crypto",
    "politics",
    "government",
    "movie",
    "song",
    "recipe",
    "travel",
    "flight",
    "sports",
    "football",
    "cricket",
    "tennis",
    "code",
    "coding",
    "javascript",
    "python",
    "programming",
    "health",
    "medical",
    "law",
    "legal",
  ]);
}

export function buildSparkOpeningReply(context, isHindi) {
  const moduleTitle = pickSparkText(context.moduleTitle, isHindi, "Module 01");
  const lessonTitle = pickSparkText(context.lessonTitle, isHindi, "BE-001");
  const sectionTitle = pickSparkText(context.sectionTitle, isHindi, "");
  const summary = summarizeSparkText(pickSparkText(context.textSummary, isHindi, ""), 120);
  const imageCaption = pickSparkText(context.imageCaption, isHindi, "");
  const keyPoints = summarizeSparkText(pickSparkText(context.keyPoints, isHindi, ""), 120);
  const miniCheckQuestion = pickSparkText(context.miniCheck?.question, isHindi, "");

  if (context.source === "dashboard") {
    return compactSparkAnswer([
      isHindi
        ? "मैं Module 01, BE-001, और अगले कदम को संक्षेप में समझा सकता हूँ।"
        : "I can help you continue Module 01, open BE-001, or explain the next step.",
      isHindi ? "ज़रूरत हो तो मैं इसे बहुत सरल तरीके से भी बताऊँगा।" : "I can keep it short and tutor-style.",
    ], 150, 2);
  }

  if (context.source === "module") {
    return compactSparkAnswer([
      isHindi
        ? `${moduleTitle} की शुरुआत BE-001 से होती है, फिर safety और tools आते हैं।`
        : `${moduleTitle} starts with BE-001, then moves into safety and tools.`,
      isHindi ? "मैं इसे एक छोटे beginner path की तरह समझा सकता हूँ।" : "I can turn it into a short beginner path.",
    ], 150, 2);
  }

  if (context.source === "section") {
    return compactSparkAnswer([
      isHindi
        ? `मैं ${sectionTitle || lessonTitle} के key points, next step, और teacher script समझा सकता हूँ।`
        : `I can explain ${sectionTitle || lessonTitle}, the key points, the next step, and the teacher script.`,
      miniCheckQuestion ? (isHindi ? `Quick check: ${miniCheckQuestion}` : `Quick check: ${miniCheckQuestion}`) : "",
    ], 160, 2);
  }

  if (context.source === "image" || imageCaption) {
    return compactSparkAnswer([
      isHindi
        ? `यह चित्र ${imageCaption || sectionTitle || lessonTitle} को सरल तरीके से समझाने के लिए है।`
        : `This visual helps explain ${imageCaption || sectionTitle || lessonTitle}.`,
      isHindi ? "मैं इसके साथ छोटा example भी जोड़ सकता हूँ।" : "I can add a short example if useful.",
    ], 150, 2);
  }

  if (summary) {
    return compactSparkAnswer([
      isHindi
        ? "मैं इस पाठ को सरल, beginner-friendly तरीके से समझा सकता हूँ।"
        : "I can help with this lesson in a simple beginner-friendly way.",
      isHindi
        ? "शुरुआत summary और key points से करें।"
        : "Start with the summary and key points.",
      miniCheckQuestion ? (isHindi ? `Quick check: ${miniCheckQuestion}` : `Quick check: ${miniCheckQuestion}`) : "",
    ], 170, 3);
  }

  return compactSparkAnswer([
    isHindi
      ? "मैं beginner electronics, Module 01, और BE-001 को सरल भाषा में समझा सकता हूँ।"
      : "I can help with beginner electronics, Module 01, and BE-001 in simple terms.",
    isHindi ? "अगर चाहें, मैं image या quiz पर भी फोकस करूँगा।" : "If useful, I can focus on the image or the quiz.",
  ], 160, 2);
}

export function buildSparkReply(context, prompt, isHindi) {
  const normalized = normalizeSparkContext(context);
  const text = String(prompt || "").trim();
  const lower = text.toLowerCase();
  const moduleTitle = pickSparkText(normalized.moduleTitle, isHindi, "Module 01");
  const lessonTitle = pickSparkText(normalized.lessonTitle, isHindi, "BE-001");
  const sectionTitle = pickSparkText(normalized.sectionTitle, isHindi, "");
  const summary = summarizeSparkText(pickSparkText(normalized.textSummary, isHindi, ""), 120);
  const imageCaption = pickSparkText(normalized.imageCaption, isHindi, "");
  const keyPoints = summarizeSparkText(pickSparkText(normalized.keyPoints, isHindi, ""), 120);
  const notes = knowledgeSummary(normalized, isHindi, 120);

  if (!text) {
    return buildSparkOpeningReply(normalized, isHindi);
  }

  const wantsHindi = hasKeyword(lower, ["hindi", "हिंदी", "हिंदी में", "भाषा"]);
  const wantsQuiz = hasKeyword(lower, ["quiz", "question", "quiz me", "प्रश्न", "क्विज"]);
  const wantsNext = hasKeyword(lower, ["next", "after this", "what next", "आगे", "अगला", "next step", "then what"]);
  const wantsImage = hasKeyword(lower, ["image", "picture", "diagram", "visual", "photo", "asset", "चित्र", "इमेज"]);
  const wantsSimple = hasKeyword(lower, ["simple", "easy", "easy words", "basic", "सरल", "आसान"]);

  if (isOutsideScopePrompt(lower)) {
    return outsideScopeMessage(isHindi);
  }

  if (wantsHindi) {
    return isHindi
      ? "आप अभी Hindi mode में हैं। अगर UI text English लगे, तो ऊपर language toggle से English/Hindi बदल सकते हैं।"
      : "You are in English mode. Use the language toggle to switch to Hindi.";
  }

  if (wantsImage) {
    return compactSparkAnswer([
      isHindi
        ? `यह visual ${imageCaption || sectionTitle || lessonTitle} को clearly दिखाता है।`
        : `This visual shows ${imageCaption || sectionTitle || lessonTitle}.`,
      isHindi ? "इसे summary के साथ देखें." : "Read it with the summary.",
    ], 150, 2);
  }

  if (wantsQuiz) {
    return compactSparkAnswer([
      isHindi
        ? "Quiz के लिए पहले summary, key points, और common mistakes देखें।"
        : "For the quiz, review the summary, key points, and common mistakes first.",
      isHindi ? "फिर सही option चुनकर reason बताइए।" : "Then choose the best option and explain why.",
    ], 170, 2);
  }

  if (wantsNext) {
    return compactSparkAnswer([
      isHindi
        ? `अगला कदम: ${sectionTitle || lessonTitle} पूरा करें, फिर next section खोलें।`
        : `Next step: finish ${sectionTitle || lessonTitle}, then open the next section.`,
      isHindi ? "मैं अगले हिस्से को भी छोटा करके बता सकता हूँ।" : "I can also keep the next part short.",
    ], 150, 2);
  }

  if (wantsSimple) {
    return compactSparkAnswer([
      isHindi
        ? `${sectionTitle || lessonTitle || moduleTitle} को सरल शब्दों में: पहले idea, फिर example, फिर practice।`
        : `In simple words: learn the idea first, then an example, then practice it.`,
      isHindi ? "मैं इसे और भी छोटा कर सकता हूँ।" : "I can make it even shorter if needed.",
    ], 150, 2);
  }

  if (normalized.source === "dashboard") {
    return compactSparkAnswer([
      isHindi
        ? "Dashboard से Continue Learning खोलें, फिर Module 01 और BE-001 शुरू करें।"
        : "From the dashboard, continue learning, then open Module 01 and start BE-001.",
      isHindi ? "मैं next step को भी छोटा रखूँगा।" : "I’ll keep the next step short too.",
    ], 160, 2);
  }

  if (normalized.source === "module") {
    return compactSparkAnswer([
      isHindi
        ? `${moduleTitle} में अभी BE-001 पर focus करें।`
        : `For ${moduleTitle}, focus on BE-001 first.`,
      isHindi ? "Lesson खोलकर checklist पूरी करें।" : "Open the lesson and finish the checklist.",
    ], 150, 2);
  }

  if (normalized.source === "section") {
    return compactSparkAnswer([
      isHindi
        ? `${sectionTitle || lessonTitle} का short summary: ${summary || "पहले समझें, फिर अभ्यास करें."}`
        : `${sectionTitle || lessonTitle} short summary: ${summary || "understand it first, then practice."}`,
      keyPoints ? (isHindi ? `Key points: ${keyPoints}` : `Key points: ${keyPoints}`) : "",
      notes ? (isHindi ? "और विवरण चाहिए? मैं इसे छोटा रखूँगा।" : "Need more detail? I can keep it short.") : "",
    ], 190, 3);
  }

  if (normalized.source === "image") {
    return compactSparkAnswer([
      isHindi
        ? `इस image की मुख्य बात: ${imageCaption || sectionTitle || lessonTitle}.`
        : `Main point of this image: ${imageCaption || sectionTitle || lessonTitle}.`,
      isHindi ? "इसे text summary के साथ पढ़ें।" : "Read it with the text summary.",
    ], 150, 2);
  }

  return compactSparkAnswer([
    isHindi
      ? `${sectionTitle || lessonTitle || moduleTitle} पर ध्यान दें, key points पढ़ें, फिर mini check करें।`
      : `Focus on ${sectionTitle || lessonTitle || moduleTitle}, review the key points, then do the mini check.`,
    isHindi ? "चाहें तो मैं एक example भी दे सकता हूँ।" : "I can add an example if useful.",
  ], 170, 2);
}
