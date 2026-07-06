export const SPARK_KNOWLEDGE = {
  module01: {
    en: [
      "Module 01 is Welcome & Electronics Lab.",
      "It is a beginner orientation module with 4 lessons, about 130 minutes, and 165 total XP.",
      "The focus is safety, workspace setup, and handling components correctly before building circuits.",
      "Spark should point learners to the next small step, not overwhelm them.",
    ],
    hi: [
      "Module 01 Welcome & Electronics Lab है।",
      "यह beginner orientation module है, जिसमें 4 lessons, लगभग 130 minutes, और 165 total XP है।",
      "इसका focus safety, workspace setup, और components को सही तरीके से handle करना है।",
      "Spark को learner को अगला छोटा step दिखाना चाहिए, उसे overwhelm नहीं करना चाहिए।",
    ],
  },
  be001: {
    en: [
      "BE-001 is for absolute beginners and combines text, real images, diagrams, Spark AI support, and hands-on activity.",
      "The lesson purpose is practical, visual, and friendly teaching.",
      "The recommended flow is hero image, real-life problem, objectives, visuals, Spark guidance, activity, lab, mistakes, troubleshooting, quiz, homework, summary, and achievement.",
      "If the learner is stuck, ask Spark to split the course into small steps, suggest the minimum starter kit, and explain terms with examples.",
      "Safety comes before power. Check polarity and work with power off unless the step explicitly says otherwise.",
    ],
    hi: [
      "BE-001 absolute beginners के लिए है और text, real images, diagrams, Spark AI support, तथा hands-on activity को जोड़ता है।",
      "इस lesson का उद्देश्य practical, visual, और friendly teaching है।",
      "Recommended flow है hero image, real-life problem, objectives, visuals, Spark guidance, activity, lab, mistakes, troubleshooting, quiz, homework, summary, और achievement।",
      "यदि learner अटक जाए, तो Spark course को छोटे steps में बाँटने, minimum starter kit बताने, और terms को examples से समझाने में मदद करे।",
      "Safety power से पहले आती है। Polarity check करें और जब तक step explicitly न कहे, power off रखें।",
    ],
  },
  sections: {
    "section-01": {
      en: ["This section introduces the purpose of the lesson for absolute beginners."],
      hi: ["यह section absolute beginners के लिए lesson purpose बताता है।"],
    },
    "section-05": {
      en: ["Section 05 is the guided visuals section, and it should stay simple: one main image plus a short explanation."],
      hi: ["Section 05 guided visuals section है और इसे simple रखना चाहिए: एक main image और छोटा explanation।"],
    },
    "section-08": {
      en: ["Section 08 is about common beginner mistakes and how to avoid them."],
      hi: ["Section 08 common beginner mistakes और उन्हें avoid करने के तरीके पर है।"],
    },
    "section-12": {
      en: ["Section 12 closes the lesson with homework, review, and completion."],
      hi: ["Section 12 homework, review, और completion के साथ lesson खत्म करता है।"],
    },
  },
};

export function mergeKnowledgeBuckets(...buckets) {
  const merged = { en: [], hi: [] };

  for (const bucket of buckets) {
    if (!bucket) continue;
    if (Array.isArray(bucket.en)) merged.en.push(...bucket.en.filter(Boolean));
    if (Array.isArray(bucket.hi)) merged.hi.push(...bucket.hi.filter(Boolean));
  }

  return {
    en: merged.en,
    hi: merged.hi,
  };
}

export function pickKnowledgeSnippet(context = {}, isHindi) {
  const sectionKnowledge = context.sectionId ? SPARK_KNOWLEDGE.sections[context.sectionId] : null;
  const lessonKnowledge = context.lessonId === "BE-001" ? SPARK_KNOWLEDGE.be001 : null;
  const moduleKnowledge = context.moduleId === "module-01" ? SPARK_KNOWLEDGE.module01 : null;
  const bucket = sectionKnowledge || lessonKnowledge || moduleKnowledge;
  if (!bucket) return "";
  const items = isHindi ? bucket.hi || bucket.en || [] : bucket.en || bucket.hi || [];
  return Array.isArray(items) ? items.join(" ") : String(items || "");
}
