const t = (en, hi) => ({ en, hi });

const RAW_SCRIPTS = {
  "section-01": {
    teacherIntro: t(
      "Welcome to ElectroBasics. This first section is for absolute beginners, so we begin slowly and clearly.",
      "ElectroBasics में आपका स्वागत है। यह पहला भाग बिल्कुल शुरुआती सीखने वालों के लिए है, इसलिए हम धीरे और साफ़ तरीके से शुरू करते हैं।"
    ),
    teacherExplanation: t(
      "Today we explain why this lesson exists and how the course will help you build confidence one step at a time.",
      "आज हम समझेंगे कि यह lesson क्यों ज़रूरी है और course आपको एक-एक कदम में confidence कैसे देगा।"
    ),
    imageExplanation: t(
      "Look at the workbench image. It shows the kind of safe, organized electronics setup you will learn to use.",
      "Workbench image को देखिए। यह वही safe और organized electronics setup दिखाता है जिसे आप सीखेंगे।"
    ),
    beginnerExample: t(
      "Think of this like learning to cook. You first learn the kitchen and tools before you try the full recipe.",
      "इसे cooking सीखने जैसा समझिए। पहले आप kitchen और tools सीखते हैं, फिर पूरा recipe बनाते हैं।"
    ),
    quickCheckQuestion: t(
      "Do you need electronics experience to begin?",
      "क्या शुरुआत करने के लिए electronics का पहले से अनुभव चाहिए?"
    ),
  },
  "section-02": {
    teacherIntro: t(
      "This section sets the learning objectives. It tells you what you should know by the end of the lesson.",
      "इस भाग में learning objectives बताए गए हैं। यह बताता है कि lesson के अंत तक आपको क्या समझना चाहिए।"
    ),
    teacherExplanation: t(
      "We are not trying to memorize everything at once. We want a clear path, a clear goal, and steady progress.",
      "हम एक साथ सब कुछ याद नहीं कर रहे हैं। हमारा लक्ष्य साफ़ रास्ता, साफ़ goal और steady progress है।"
    ),
    imageExplanation: t(
      "The roadmap image shows the lesson journey from welcome to complete. Use it like a map.",
      "Roadmap image lesson journey दिखाता है, welcome से complete तक। इसे map की तरह देखिए।"
    ),
    beginnerExample: t(
      "If a learner knows the destination, every small step becomes easier to follow.",
      "अगर learner को destination पता हो, तो हर छोटा कदम आसान हो जाता है।"
    ),
    quickCheckQuestion: t(
      "Which tool should you use when you get stuck?",
      "जब आप अटक जाएँ, तो कौन सा tool इस्तेमाल करना चाहिए?"
    ),
  },
  "section-03": {
    teacherIntro: t(
      "Now we look at a real-life problem. A beginner wants to learn electronics but does not know where to start.",
      "अब हम एक real-life problem देखते हैं। एक beginner electronics सीखना चाहता है, लेकिन उसे शुरू कहाँ से करनी है यह नहीं पता।"
    ),
    teacherExplanation: t(
      "That confusion is normal. This lesson removes the fear by showing the first safe and practical steps.",
      "यह confusion normal है। यह lesson डर को कम करता है और safe, practical first steps दिखाता है।"
    ),
    imageExplanation: t(
      "The device collage reminds you that electronics lives inside everyday things like phones, routers, bulbs and machines.",
      "Device collage याद दिलाता है कि electronics phones, routers, bulbs और machines में भी होती है।"
    ),
    beginnerExample: t(
      "A phone charger looks simple outside, but it contains electronics that manage power carefully.",
      "Phone charger बाहर से simple लगता है, लेकिन अंदर power को carefully manage करने वाली electronics होती है।"
    ),
    quickCheckQuestion: t(
      "Why is a clear learning path important for beginners?",
      "शुरुआती learners के लिए clear learning path क्यों ज़रूरी है?"
    ),
  },
  "section-04": {
    teacherIntro: t(
      "This is the beginner theory section. Here we define electronics in a simple way.",
      "यह beginner theory section है। यहाँ हम electronics को सरल तरीके से समझते हैं।"
    ),
    teacherExplanation: t(
      "Electronics is about controlling electricity with components like resistors, LEDs, capacitors, sensors and ICs.",
      "Electronics का मतलब है resistors, LEDs, capacitors, sensors और ICs जैसे components से बिजली को control करना।"
    ),
    imageExplanation: t(
      "The concept image connects components, circuits and real devices so the idea feels practical, not abstract.",
      "Concept image components, circuits और real devices को जोड़ता है ताकि idea practical लगे, abstract नहीं।"
    ),
    beginnerExample: t(
      "When a lamp turns on, a fan changes speed or a phone charges, electronics is working behind the scenes.",
      "जब lamp जलता है, fan की speed बदलती है या phone charge होता है, तब electronics पीछे काम कर रही होती है।"
    ),
    quickCheckQuestion: t(
      "Name one everyday device that uses electronics.",
      "Electronics इस्तेमाल करने वाला एक everyday device बताइए।"
    ),
  },
  "section-05": {
    teacherIntro: t(
      "This is the guided visual learning section. We slow down and let the image do the teaching with a short explanation.",
      "यह guided visual learning section है। यहाँ हम धीरे चलते हैं और image को short explanation के साथ teaching करने देते हैं।"
    ),
    teacherExplanation: t(
      "You do not need a long lecture here. Watch the main visual, connect it with the text, and notice the beginner-friendly idea.",
      "यहाँ लंबे lecture की ज़रूरत नहीं है। Main visual देखें, text से जोड़ें, और beginner-friendly idea को पकड़ें।"
    ),
    imageExplanation: t(
      "The guided visual image shows the parts of the lesson in one clean picture, so the idea stays simple.",
      "Guided visual image lesson के parts को एक clean picture में दिखाती है, ताकि idea simple रहे।"
    ),
    beginnerExample: t(
      "If you can explain the picture in one sentence, you already understand the main idea.",
      "अगर आप picture को एक sentence में समझा सकते हैं, तो आपने main idea समझ लिया।"
    ),
    quickCheckQuestion: t(
      "What should you do first: read every word or study the main image?",
      "पहले क्या करना चाहिए: हर शब्द पढ़ना या main image देखना?"
    ),
  },
  "section-06": {
    teacherIntro: t(
      "Now we move to the interactive activity. This is where you learn by doing, not just reading.",
      "अब हम interactive activity पर आते हैं। यहाँ आप केवल पढ़ते नहीं, करके सीखते हैं।"
    ),
    teacherExplanation: t(
      "The goal is to follow the steps carefully, notice what changes, and build a habit of observing small details.",
      "लक्ष्य है steps को carefully follow करना, बदलाव देखना, और छोटे details observe करने की habit बनाना।"
    ),
    imageExplanation: t(
      "The activity image helps you connect the instructions with the action you are supposed to take.",
      "Activity image instructions को उस action से जोड़ती है जो आपको करना है।"
    ),
    beginnerExample: t(
      "It is like following a simple science experiment. You read one step, do one step, then check the result.",
      "यह एक simple science experiment जैसा है। एक step पढ़िए, एक step कीजिए, फिर result देखिए।"
    ),
    quickCheckQuestion: t(
      "Why is it important to follow the activity one step at a time?",
      "Activity को step by step follow करना क्यों ज़रूरी है?"
    ),
  },
  "section-07": {
    teacherIntro: t(
      "This section is practical lab time. Here you work with real setup ideas and careful hands-on practice.",
      "यह section practical lab time है। यहाँ आप real setup ideas और careful hands-on practice करते हैं।"
    ),
    teacherExplanation: t(
      "The main habit is to check before you connect. Safety, wiring order and clear placement matter.",
      "मुख्य habit है connect करने से पहले check करना। Safety, wiring order और clear placement important हैं।"
    ),
    imageExplanation: t(
      "The lab image shows how a proper workspace should look before power is applied.",
      "Lab image दिखाती है कि power देने से पहले workspace कैसा होना चाहिए।"
    ),
    beginnerExample: t(
      "A neat breadboard layout makes it easier to find mistakes and learn faster.",
      "Neat breadboard layout mistakes ढूँढना आसान बनाता है और सीखना तेज़ करता है।"
    ),
    quickCheckQuestion: t(
      "What should you check before applying power?",
      "Power लगाने से पहले आपको क्या check करना चाहिए?"
    ),
  },
  "section-08": {
    teacherIntro: t(
      "This section covers common beginner mistakes. Mistakes are normal, and they teach you what to check next.",
      "यह section common beginner mistakes पर है। Mistakes normal हैं, और ये आपको अगला check सिखाती हैं।"
    ),
    teacherExplanation: t(
      "We look at simple problems like reversed parts, loose wires, missed steps and incorrect assumptions.",
      "हम reversed parts, loose wires, missed steps और गलत assumptions जैसी simple समस्याएँ देखते हैं।"
    ),
    imageExplanation: t(
      "The mistakes image helps you compare the wrong setup with the correct one.",
      "Mistakes image गलत setup को सही setup से compare करने में मदद करती है।"
    ),
    beginnerExample: t(
      "If an LED does not light, the first checks are polarity, connections and power.",
      "अगर LED नहीं जलती, तो पहले polarity, connections और power check कीजिए।"
    ),
    quickCheckQuestion: t(
      "What is the first thing you should check when a circuit does not work?",
      "जब circuit काम न करे, तो सबसे पहले क्या check करना चाहिए?"
    ),
  },
  "section-09": {
    teacherIntro: t(
      "Troubleshooting means slowing down and checking one thing at a time.",
      "Troubleshooting का मतलब है धीमे होकर एक-एक चीज़ check करना।"
    ),
    teacherExplanation: t(
      "Instead of guessing, review the picture, compare the circuit and ask Spark for a hint if needed.",
      "Guess करने के बजाय picture review कीजिए, circuit compare कीजिए और जरूरत हो तो Spark से hint पूछिए।"
    ),
    imageExplanation: t(
      "The troubleshooting image shows how to move from problem to solution in small steps.",
      "Troubleshooting image problem से solution तक छोटे steps में जाने का तरीका दिखाती है।"
    ),
    beginnerExample: t(
      "If something feels confusing, go back to the last known good step and test again.",
      "अगर कुछ confusing लगे, तो last known good step पर वापस जाइए और फिर test कीजिए।"
    ),
    quickCheckQuestion: t(
      "Should you guess randomly or check step by step?",
      "क्या आपको random guess करना चाहिए या step by step check करना चाहिए?"
    ),
  },
  "section-10": {
    teacherIntro: t(
      "This is the Spark glossary section. It helps you learn the new words that appear in the lesson.",
      "यह Spark glossary section है। यह lesson में आए नए words सीखने में मदद करता है।"
    ),
    teacherExplanation: t(
      "Words like electronics, circuit, component, breadboard and Spark become easier when you connect them to pictures and examples.",
      "Electronics, circuit, component, breadboard और Spark जैसे words pictures और examples से आसानी से समझ आते हैं।"
    ),
    imageExplanation: t(
      "The glossary image shows how Spark explains words with visual support instead of heavy language.",
      "Glossary image दिखाती है कि Spark भारी भाषा के बजाय visual support से words समझाता है।"
    ),
    beginnerExample: t(
      "A breadboard is just a reusable board for testing circuits without soldering.",
      "Breadboard बस circuits को soldering के बिना test करने के लिए reusable board है।"
    ),
    quickCheckQuestion: t(
      "What is a breadboard used for?",
      "Breadboard का उपयोग किसलिए होता है?"
    ),
  },
  "section-11": {
    teacherIntro: t(
      "Now it is quiz time. The goal is to check understanding, not to create pressure.",
      "अब quiz time है। लक्ष्य understanding check करना है, pressure बनाना नहीं।"
    ),
    teacherExplanation: t(
      "Read each question carefully, use the lesson images in your mind, and pick the best answer.",
      "हर question ध्यान से पढ़िए, lesson images याद कीजिए, और सबसे अच्छा answer चुनिए।"
    ),
    imageExplanation: t(
      "The quiz image reminds you that practice is part of learning, not a punishment.",
      "Quiz image याद दिलाती है कि practice learning का हिस्सा है, punishment नहीं।"
    ),
    beginnerExample: t(
      "If you miss one answer, that is fine. Review it, learn from it and try again.",
      "अगर एक answer गलत हो जाए, तो कोई बात नहीं। उसे review कीजिए, सीखिए और फिर कोशिश कीजिए।"
    ),
    quickCheckQuestion: t(
      "What should you do after getting a quiz answer wrong?",
      "Quiz का answer गलत होने पर आपको क्या करना चाहिए?"
    ),
  },
  "section-12": {
    teacherIntro: t(
      "This final section wraps up the lesson with homework and completion.",
      "यह अंतिम section lesson को homework और completion के साथ पूरा करता है।"
    ),
    teacherExplanation: t(
      "You review the lesson images, write simple one-line meanings, and finish the observation activity.",
      "आप lesson images review करते हैं, simple one-line meanings लिखते हैं, और observation activity पूरी करते हैं।"
    ),
    imageExplanation: t(
      "The completion image shows that you are finishing the first lesson and getting ready for the next one.",
      "Completion image दिखाती है कि आप पहला lesson पूरा कर रहे हैं और अगले lesson के लिए तैयार हैं।"
    ),
    beginnerExample: t(
      "A good habit is to say the lesson idea out loud in one short sentence before moving on.",
      "एक अच्छी habit है कि आगे बढ़ने से पहले lesson idea को एक short sentence में बोलकर समझें।"
    ),
    quickCheckQuestion: t(
      "What lesson unlocks next after this one?",
      "इस lesson के बाद कौन सा lesson unlock होता है?"
    ),
  },
};

function joinScript(parts, isHindi) {
  const values = [parts.teacherIntro, parts.teacherExplanation, parts.imageExplanation, parts.beginnerExample, parts.quickCheckQuestion]
    .map((part) => (isHindi ? part.hi || part.en : part.en || part.hi))
    .filter(Boolean);
  return values.join(" ");
}

export const BE001_TEACHER_SCRIPTS = Object.fromEntries(
  Object.entries(RAW_SCRIPTS).map(([sectionId, parts]) => {
    const fullTeacherScript = {
      en: joinScript(parts, false),
      hi: joinScript(parts, true),
    };
    return [sectionId, { ...parts, fullTeacherScript }];
  })
);

export function getBe001TeacherScript(sectionId, isHindi = false) {
  const section = BE001_TEACHER_SCRIPTS[sectionId];
  if (!section) return "";
  return isHindi ? section.fullTeacherScript.hi : section.fullTeacherScript.en;
}

export function getBe001TeacherScriptParts(sectionId) {
  return BE001_TEACHER_SCRIPTS[sectionId] || null;
}
