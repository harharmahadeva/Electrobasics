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
  return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
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
  };
}

function hasKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function buildSparkOpeningReply(context, isHindi) {
  const moduleTitle = pickSparkText(context.moduleTitle, isHindi, "Module 01");
  const lessonTitle = pickSparkText(context.lessonTitle, isHindi, "BE-001");
  const sectionTitle = pickSparkText(context.sectionTitle, isHindi, "");
  const summary = summarizeSparkText(pickSparkText(context.textSummary, isHindi, ""));
  const imageCaption = pickSparkText(context.imageCaption, isHindi, "");

  if (context.source === "dashboard") {
    return isHindi
      ? "मैं आपको Module 01, BE-001, और अगला सही कदम समझा सकता हूँ।"
      : "I can help you continue Module 01, open BE-001, or explain the next step.";
  }

  if (context.source === "module") {
    return isHindi
      ? `${moduleTitle} शुरू करने के लिए BE-001 से शुरुआत करें, फिर safety, tools, और hands-on steps पर जाएँ।`
      : `${moduleTitle} starts with BE-001, then moves into safety, tools, and hands-on steps.`;
  }

  if (context.source === "section") {
    return isHindi
      ? `${sectionTitle || lessonTitle} में मैं key points, quick hints, और अगले कदम समझा सकता हूँ।`
      : `I can explain ${sectionTitle || lessonTitle}, the key points, and the next step.`;
  }

  if (context.source === "image" || imageCaption) {
    return isHindi
      ? `यह चित्र ${imageCaption || sectionTitle || lessonTitle} को सरल तरीके से समझाने के लिए है।`
      : `This visual helps explain ${imageCaption || sectionTitle || lessonTitle}.`;
  }

  if (summary) {
    return isHindi
      ? `मैं इस पाठ में मदद कर सकता हूँ। शुरुआत के लिए summary और key points देखें।`
      : `I can help with this lesson. Start with the summary and key points.`;
  }

  return isHindi
    ? "मैं शुरुआती electronics, Module 01, BE-001, quizzes, और images को सरल भाषा में समझा सकता हूँ।"
    : "I can help with beginner electronics, Module 01, BE-001, quizzes, and images.";
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

  if (!text) {
    return buildSparkOpeningReply(normalized, isHindi);
  }

  const wantsHindi = hasKeyword(lower, ["hindi", "हिंदी", "हिंदी में", "भाषा"]);
  const wantsQuiz = hasKeyword(lower, ["quiz", "question", "quiz me", "प्रश्न", "क्विज"]);
  const wantsNext = hasKeyword(lower, ["next", "after this", "what next", "आगे", "अगला", "next step", "then what"]);
  const wantsImage = hasKeyword(lower, ["image", "picture", "diagram", "visual", "photo", "asset", "चित्र", "इमेज"]);
  const wantsSimple = hasKeyword(lower, ["simple", "easy", "easy words", "basic", "सरल", "आसान"]);

  if (wantsHindi) {
    return isHindi
      ? "आप अभी Hindi mode में हैं। अगर UI text English लगे, तो ऊपर language toggle से English/Hindi बदल सकते हैं।"
      : "You are in English mode. Use the language toggle to switch to Hindi.";
  }

  if (wantsImage) {
    return isHindi
      ? `इस visual का उद्देश्य ${imageCaption || sectionTitle || lessonTitle} को clearly दिखाना है। इसे summary के साथ जोड़कर देखें।`
      : `This visual is meant to show ${imageCaption || sectionTitle || lessonTitle}. Read it together with the summary.`;
  }

  if (wantsQuiz) {
    return isHindi
      ? `Quiz के लिए पहले summary, key points, और common mistakes देखें। फिर सही option चुनें और reason समझें।`
      : `For the quiz, review the summary, key points, and common mistakes first. Then choose the best option and explain why.`;
  }

  if (wantsNext) {
    return isHindi
      ? `अगला कदम: ${sectionTitle || lessonTitle} को पूरा करें, फिर next section या next lesson खोलें।`
      : `Next step: finish ${sectionTitle || lessonTitle}, then open the next section or next lesson.`;
  }

  if (wantsSimple) {
    return isHindi
      ? `${sectionTitle || lessonTitle || moduleTitle} को बहुत सरल शब्दों में समझें: पहले idea, फिर example, फिर practice.`
      : `In simple words: learn the idea first, then an example, then practice it.`;
  }

  if (normalized.source === "dashboard") {
    return isHindi
      ? "Dashboard से आप Continue Learning में जाएँ, फिर Module 01 खोलें और BE-001 section शुरू करें।"
      : "From the dashboard, continue learning, open Module 01, then start BE-001.";
  }

  if (normalized.source === "module") {
    return isHindi
      ? `${moduleTitle} में आपका focus अभी BE-001 पर होना चाहिए। Start Module से lesson खोलें और checklist पूरी करें।`
      : `For ${moduleTitle}, focus on BE-001 first. Start the module lesson and finish the checklist.`;
  }

  if (normalized.source === "section") {
    return isHindi
      ? `${sectionTitle || lessonTitle} के लिए summary: ${summary || "पहले समझें, फिर अभ्यास करें."}`
      : `${sectionTitle || lessonTitle} summary: ${summary || "understand it first, then practice."}`;
  }

  if (normalized.source === "image") {
    return isHindi
      ? `इस image की मुख्य बात: ${imageCaption || sectionTitle || lessonTitle}. इसे text summary के साथ पढ़ें।`
      : `Main point of this image: ${imageCaption || sectionTitle || lessonTitle}. Read it with the text summary.`;
  }

  return isHindi
    ? `${sectionTitle || lessonTitle || moduleTitle} पर ध्यान दें, key points पढ़ें, और फिर mini check करें।`
    : `Focus on ${sectionTitle || lessonTitle || moduleTitle}, review the key points, then do the mini check.`;
}
