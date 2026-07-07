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
  const summary = summarizeSparkText(pickSparkText(context.textSummary, isHindi, ""));
  const imageCaption = pickSparkText(context.imageCaption, isHindi, "");
  const keyPoints = summarizeSparkText(pickSparkText(context.keyPoints, isHindi, ""), 180);
  const miniCheckQuestion = pickSparkText(context.miniCheck?.question, isHindi, "");
  const notes = knowledgeSummary(context, isHindi, 180);

  if (context.source === "dashboard") {
    return isHindi
      ? `मैं आपको Module 01, BE-001, और अगले सही कदम समझा सकता हूँ। ${notes}`
      : `I can help you continue Module 01, open BE-001, or explain the next step. ${notes}`;
  }

  if (context.source === "module") {
    return isHindi
      ? `${moduleTitle} शुरू करने के लिए BE-001 से शुरुआत करें, फिर safety, tools, और hands-on steps पर जाएँ। ${notes}`
      : `${moduleTitle} starts with BE-001, then moves into safety, tools, and hands-on steps. ${notes}`;
  }

  if (context.source === "section") {
    return isHindi
      ? `${sectionTitle || lessonTitle} में मैं key points, quick hints, next step, Spark teacher script, और repo notes समझा सकता हूँ। ${notes}`
      : `I can explain ${sectionTitle || lessonTitle}, the key points, the next step, the Spark teacher script, and the repo notes. ${notes}`;
  }

  if (context.source === "image" || imageCaption) {
    return isHindi
      ? `यह चित्र ${imageCaption || sectionTitle || lessonTitle} को सरल तरीके से समझाने के लिए है। ${notes}`
      : `This visual helps explain ${imageCaption || sectionTitle || lessonTitle}. ${notes}`;
  }

  if (summary) {
    return isHindi
      ? `मैं इस पाठ में मदद कर सकता हूँ। शुरुआत summary, key points, mini check, और repo notes से करें। ${miniCheckQuestion ? `Quick check: ${miniCheckQuestion}.` : ""} ${notes}`
      : `I can help with this lesson. Start with the summary, key points, mini check, and repo notes. ${miniCheckQuestion ? `Quick check: ${miniCheckQuestion}.` : ""} ${notes}`;
  }

  return isHindi
    ? `मैं beginner electronics, Module 01, BE-001, quizzes, images, और repo notes को सरल भाषा में समझा सकता हूँ। ${notes}`
    : `I can help with beginner electronics, Module 01, BE-001, quizzes, images, and repo notes. ${notes}`;
}

export function buildSparkReply(context, prompt, isHindi) {
  const normalized = normalizeSparkContext(context);
  const text = String(prompt || "").trim();
  const lower = text.toLowerCase();
  const moduleTitle = pickSparkText(normalized.moduleTitle, isHindi, "Module 01");
  const lessonTitle = pickSparkText(normalized.lessonTitle, isHindi, "BE-001");
  const sectionTitle = pickSparkText(normalized.sectionTitle, isHindi, "");
  const summary = summarizeSparkText(pickSparkText(normalized.textSummary, isHindi, ""), 260);
  const imageCaption = pickSparkText(normalized.imageCaption, isHindi, "");
  const notes = knowledgeSummary(normalized, isHindi, 260);

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
    return isHindi
      ? `इस visual का उद्देश्य ${imageCaption || sectionTitle || lessonTitle} को clearly दिखाना है। इसे summary के साथ पढ़ें। ${notes}`
      : `This visual is meant to show ${imageCaption || sectionTitle || lessonTitle}. Read it together with the summary. ${notes}`;
  }

  if (wantsQuiz) {
    return isHindi
      ? `Quiz के लिए पहले summary, key points, और common mistakes देखें। फिर सही option चुनें और reason समझें। ${notes}`
      : `For the quiz, review the summary, key points, and common mistakes first. Then choose the best option and explain why. ${notes}`;
  }

  if (wantsNext) {
    return isHindi
      ? `अगला कदम: ${sectionTitle || lessonTitle} को पूरा करें, फिर next section या next lesson खोलें। ${notes}`
      : `Next step: finish ${sectionTitle || lessonTitle}, then open the next section or next lesson. ${notes}`;
  }

  if (wantsSimple) {
    return isHindi
      ? `${sectionTitle || lessonTitle || moduleTitle} को बहुत सरल शब्दों में समझें: पहले idea, फिर example, फिर practice. ${notes}`
      : `In simple words: learn the idea first, then an example, then practice it. ${notes}`;
  }

  if (normalized.source === "dashboard") {
    return isHindi
      ? `Dashboard से आप Continue Learning में जाएँ, फिर Module 01 खोलें और BE-001 section शुरू करें। ${notes}`
      : `From the dashboard, continue learning, open Module 01, then start BE-001. ${notes}`;
  }

  if (normalized.source === "module") {
    return isHindi
      ? `${moduleTitle} में आपका focus अभी BE-001 पर होना चाहिए। Start Module से lesson खोलें और checklist पूरी करें। ${notes}`
      : `For ${moduleTitle}, focus on BE-001 first. Start the module lesson and finish the checklist. ${notes}`;
  }

  if (normalized.source === "section") {
    return isHindi
      ? `${sectionTitle || lessonTitle} के लिए summary: ${summary || "पहले समझें, फिर अभ्यास करें."} ${keyPoints ? `Key points: ${keyPoints}.` : ""} ${notes}`
      : `${sectionTitle || lessonTitle} summary: ${summary || "understand it first, then practice."} ${keyPoints ? `Key points: ${keyPoints}.` : ""} ${notes}`;
  }

  if (normalized.source === "image") {
    return isHindi
      ? `इस image की मुख्य बात: ${imageCaption || sectionTitle || lessonTitle}. इसे text summary के साथ पढ़ें। ${notes}`
      : `Main point of this image: ${imageCaption || sectionTitle || lessonTitle}. Read it with the text summary. ${notes}`;
  }

  return isHindi
    ? `${sectionTitle || lessonTitle || moduleTitle} पर ध्यान दें, key points पढ़ें, और फिर mini check करें। ${notes}`
    : `Focus on ${sectionTitle || lessonTitle || moduleTitle}, review the key points, then do the mini check. ${notes}`;
}
