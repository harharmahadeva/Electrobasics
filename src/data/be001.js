const t = (en, hi) => ({ en, hi });

export const SECTIONS = [
  {
    id: "section-01",
    order: 1,
    title: t("Lesson Purpose", "पाठ का उद्देश्य"),
    shortTitle: t("Purpose", "उद्देश्य"),
    icon: "Target",
    image: "be001-section01-purpose.png",
    imageFit: "cover",
    caption: t(
      "Premium electronics learning workbench with breadboard, multimeter, LED, resistor kit and jumper wires.",
      "ब्रेडबोर्ड, मल्टीमीटर, LED, resistor kit और jumper wires वाला electronics learning workbench।"
    ),
    paragraphs: t(
      [
        "This lesson is written for a learner who may have never touched electronic components before.",
        "ElectroBasics will guide you with simple text, real images, diagrams, Spark AI support and hands-on activities. The goal is to make electronics feel practical, visual and friendly from the first screen.",
        "You will not be expected to know technical words already. When a new word appears, Spark can explain it with examples from the lesson images.",
      ],
      [
        "यह पाठ ऐसे विद्यार्थी के लिए है जिसने शायद पहले कभी इलेक्ट्रॉनिक घटकों को हाथ नहीं लगाया।",
        "ElectroBasics आपको सरल text, real images, diagrams, Spark AI support और hands-on activities से guide करेगा। लक्ष्य है कि electronics पहले screen से practical, visual और friendly लगे।",
        "आपसे पहले से technical words जानने की उम्मीद नहीं है। नया word आने पर Spark उसे lesson images के examples से समझा सकता है।",
      ]
    ),
    keyPoints: t(
      [
        "Absolute beginners can start here.",
        "The lesson combines text, images, diagrams, Spark and activities.",
        "Electronics becomes easier when you see, touch, build, test and repeat.",
        "Safety and good habits come first.",
      ],
      [
        "बिल्कुल शुरुआती learner यहाँ से शुरू कर सकते हैं।",
        "यह पाठ text, images, diagrams, Spark और activities को साथ लाता है।",
        "Electronics तब आसान होती है जब आप see, touch, build, test और repeat करते हैं।",
        "Safety और अच्छी habits सबसे पहले आती हैं।",
      ]
    ),
    sparkSays: t(
      "Before building circuits, understand the learning path. I will help you move from complete beginner to confident builder one small step at a time.",
      "Circuits बनाने से पहले learning path समझिए। मैं आपको complete beginner से confident builder तक छोटे-छोटे steps में guide करूँगा।"
    ),
    miniCheck: {
      question: t("Do you need previous electronics experience to start?", "क्या शुरू करने के लिए पहले से electronics experience चाहिए?"),
      options: t(["Yes", "No"], ["हाँ", "नहीं"]),
      correctIndex: 1,
      feedback: t("Correct! ElectroBasics starts from absolute beginner level.", "सही! ElectroBasics बिल्कुल beginner level से शुरू होता है।"),
    },
  },
  {
    id: "section-02",
    order: 2,
    title: t("Learning Objectives", "सीखने के उद्देश्य"),
    shortTitle: t("Objectives", "उद्देश्य"),
    icon: "BookOpen",
    image: "be001-section02-objectives.png",
    imageFit: "contain",
    caption: t("Course roadmap from Welcome to Certificate.", "Welcome से Certificate तक course roadmap।"),
    paragraphs: t(
      ["By the end of this lesson, you should understand what ElectroBasics is, why electronics matters, how the beginner bootcamp is structured and how Spark AI supports you."],
      ["इस पाठ के अंत तक आप समझेंगे कि ElectroBasics क्या है, electronics क्यों महत्वपूर्ण है, beginner bootcamp कैसे structured है और Spark AI आपकी कैसे सहायता करेगा।"]
    ),
    objectives: [
      {
        title: t("Understand ElectroBasics", "ElectroBasics को समझना"),
        body: t("Understand what ElectroBasics is and why electronics matters.", "समझना कि ElectroBasics क्या है और electronics क्यों महत्वपूर्ण है।"),
      },
      {
        title: t("Know the bootcamp structure", "Bootcamp structure जानना"),
        body: t("Know how the beginner bootcamp is structured.", "beginner bootcamp की संरचना समझना।"),
      },
      {
        title: t("Use Spark AI support", "Spark AI support उपयोग करना"),
        body: t("Understand how Spark AI will help during lessons.", "Spark AI कैसे सहायता करेगा यह जानना।"),
      },
      {
        title: t("Connect visuals, labs and quizzes", "Visuals, labs और quizzes जोड़ना"),
        body: t("Learn how visual assets, labs, quizzes and projects work together.", "चित्र, labs, quizzes और projects साथ में कैसे काम करते हैं समझना।"),
      },
      {
        title: t("Start with confidence", "Confidence के साथ शुरू करना"),
        body: t("Feel confident starting from absolute zero.", "बिल्कुल शुरुआत से सीखने का आत्मविश्वास पाना।"),
      },
    ],
    sparkSays: t(
      "These objectives are your checklist. If each one makes sense, you are ready for the next lesson.",
      "ये objectives आपकी checklist हैं। अगर हर point समझ आता है, तो आप next lesson के लिए ready हैं।"
    ),
    miniCheck: {
      question: t("Which tool helps you when you get stuck?", "जब आप stuck हों तो कौन सा tool मदद करता है?"),
      options: t(["Spark AI", "Random guessing"], ["Spark AI", "Random guessing"]),
      correctIndex: 0,
      feedback: t("Correct! Spark AI is here to give hints, examples and simple explanations.", "सही! Spark AI hints, examples और simple explanations देता है।"),
    },
  },
  {
    id: "section-03",
    order: 3,
    title: t("Real-Life Problem", "वास्तविक जीवन की समस्या"),
    shortTitle: t("Problem", "समस्या"),
    icon: "Lightbulb",
    image: "be001-section03-real-life-problem.png",
    imageFit: "cover",
    caption: t(
      "Everyday electronics: phone, laptop, router, LED bulb, vehicle dashboard and home appliances.",
      "हर दिन की electronics: phone, laptop, router, LED bulb, vehicle dashboard और home appliances।"
    ),
    paragraphs: t(
      [
        "A complete beginner wants to learn electronics but does not know where to start, what tools are needed, what is safe, or how circuits are built.",
        "This first lesson removes that confusion and gives the learner a clear path.",
        "The lesson starts with the problem instead of a definition because beginners learn faster when they first understand why the topic matters.",
      ],
      [
        "एक बिल्कुल शुरुआती विद्यार्थी electronics सीखना चाहता है, लेकिन उसे नहीं पता कि शुरुआत कहाँ से करे, कौन से उपकरण चाहिए, सुरक्षा कैसे रखनी है और circuits कैसे बनते हैं।",
        "यह पहला पाठ इस भ्रम को दूर करता है और learner को clear path देता है।",
        "Lesson definition से नहीं, problem से शुरू होता है क्योंकि beginners पहले यह समझने पर जल्दी सीखते हैं कि topic क्यों important है।",
      ]
    ),
    keyPoints: t(
      ["Beginners often feel confused at first.", "A clear learning path removes fear.", "Tools and safety come before building circuits.", "Small steps make electronics easier."],
      ["Beginners शुरुआत में confused महसूस कर सकते हैं।", "Clear learning path डर कम करता है।", "Circuit building से पहले tools और safety आते हैं।", "छोटे steps electronics को आसान बनाते हैं।"]
    ),
    exampleCards: t(
      [
        "A TV remote uses batteries and contains a small PCB, buttons, an LED and an IC.",
        "A router uses power from an adapter and contains circuits that send and receive signals.",
        "A washing machine control panel uses electronics to read buttons and control motors.",
      ],
      [
        "TV remote batteries use करता है और उसमें small PCB, buttons, LED और IC हो सकते हैं।",
        "Router adapter से power लेता है और signals भेजने-लेने वाले circuits रखता है।",
        "Washing machine control panel buttons read करता है और motors control करता है।",
      ]
    ),
    sparkSays: t(
      "You are not expected to know everything. ElectroBasics gives you a path so you always know what to do next.",
      "आपसे सब कुछ पहले से जानने की उम्मीद नहीं है। ElectroBasics आपको path देता है ताकि आपको हमेशा next step पता रहे।"
    ),
    miniCheck: {
      question: t("What should beginners learn before powering circuits?", "Circuits को power देने से पहले beginners को क्या सीखना चाहिए?"),
      options: t(["Safety and tools", "High voltage repair"], ["Safety और tools", "High voltage repair"]),
      correctIndex: 0,
      feedback: t("Correct! Safety and tools always come first.", "सही! Safety और tools हमेशा पहले आते हैं।"),
    },
  },
  {
    id: "section-04",
    order: 4,
    title: t("Beginner Theory", "शुरुआती सिद्धांत"),
    shortTitle: t("Theory", "सिद्धांत"),
    icon: "Cpu",
    image: "be001-section04-theory.png",
    imageFit: "contain",
    caption: t("A simple electronics concept image showing components, circuits and real devices.", "Components, circuits और real devices दिखाने वाली simple electronics concept image।"),
    paragraphs: t(
      [
        "Electronics is the practice of controlling electricity using components such as resistors, LEDs, capacitors, sensors, ICs and microcontrollers.",
        "Electronics is present in mobile phones, laptops, routers, washing machines, cars, medical devices, robots and satellites.",
        "ElectroBasics is designed as a practical learning journey. You will not only read theory; you will see real components, study clear infographics, use interactive simulations, build circuits on a breadboard, answer quizzes and ask Spark whenever you get stuck.",
        "The course begins with safety and tools because beginners should know how to work correctly before connecting power. After that, you will learn electricity, voltage, current, resistance, Ohm's Law, real electronic components, circuit building, measurements, troubleshooting and mini projects.",
        "The most important rule: you do not need to memorize everything on day one. Electronics becomes easy when you see, touch, build, test and repeat.",
      ],
      [
        "Electronics वह विधा है जिसमें resistors, LEDs, capacitors, sensors, ICs और microcontrollers जैसे components की सहायता से बिजली को नियंत्रित किया जाता है।",
        "यह mobile phones, laptops, routers, washing machines, cars, medical devices, robots और satellites में मौजूद है।",
        "ElectroBasics एक practical learning journey है। यहाँ आप केवल theory नहीं पढ़ेंगे; आप real components देखेंगे, clear infographics समझेंगे, interactive simulations use करेंगे, breadboard पर circuits बनाएँगे, quizzes हल करेंगे और अटकने पर Spark से पूछेंगे।",
        "Course safety और tools से शुरू होता है क्योंकि power जोड़ने से पहले सही तरीके से काम करना सीखना ज़रूरी है। फिर आप electricity, voltage, current, resistance, Ohm's Law, real components, circuit building, measurements, troubleshooting और mini projects सीखेंगे।",
        "सबसे important rule: day one पर सब कुछ memorize करने की ज़रूरत नहीं है। Electronics तब easy होती है जब आप see, touch, build, test और repeat करते हैं।",
      ]
    ),
    keyPoints: t(
      ["Electronics controls electricity.", "Components are building blocks.", "Circuits connect components.", "The course moves from safety to tools to electricity to projects."],
      ["Electronics electricity को control करती है।", "Components building blocks हैं।", "Circuits components को connect करते हैं।", "Course safety से tools, electricity और projects तक जाता है।"]
    ),
    sparkSays: t(
      "Use short steps. If a technical word appears, ask me for a simple example before moving forward.",
      "छोटे steps use करें। Technical word आए तो आगे बढ़ने से पहले मुझसे simple example पूछें।"
    ),
    miniCheck: {
      question: t("Which of these is an electronic component?", "इनमें से electronic component कौन सा है?"),
      options: t(["Resistor", "Wooden spoon"], ["Resistor", "लकड़ी का चम्मच"]),
      correctIndex: 0,
      feedback: t("Correct! A resistor is a fundamental electronic component.", "सही! Resistor एक basic electronic component है।"),
    },
  },
  {
    id: "section-05",
    order: 5,
    title: t("Guided Visual Learning", "Guided visual learning"),
    shortTitle: t("Visuals", "Visuals"),
    icon: "Image",
    image: "be001-section05-guided-visuals.png",
    imageFit: "contain",
    caption: t("Visual assets should teach, not decorate.", "Visual assets सिखाने के लिए हैं, decoration के लिए नहीं।"),
    paragraphs: t(
      [
        "ElectroBasics uses visuals to make learning easier. Real photos show how parts look, diagrams show how circuits connect, and simple activities let you experiment safely.",
      ],
      [
        "ElectroBasics learning आसान बनाने के लिए visuals का उपयोग करता है। Real photos parts दिखाते हैं, diagrams circuits के connections दिखाते हैं और simple activities safe experiment करने देते हैं।",
      ]
    ),
  },
  {
    id: "section-06",
    order: 6,
    title: t("Interactive Activity", "Interactive activity"),
    shortTitle: t("Activity", "Activity"),
    icon: "MousePointerClick",
    image: "be001-section06-activity.png",
    imageFit: "contain",
    caption: t("Course Roadmap Explorer MVP card.", "Course Roadmap Explorer MVP card।"),
    paragraphs: t(
      [
        "The first activity is a Course Roadmap Explorer. The learner taps each module card: Safety, Tools, Electricity, Components, Breadboard, Measurements, Projects and Certificate.",
        "Spark explains what each module contains and why it appears in that order.",
        "For the MVP, this can be a static interactive-looking card. Later it can become a real simulator.",
      ],
      [
        "पहली activity Course Roadmap Explorer है। Learner हर module card tap करेगा: Safety, Tools, Electricity, Components, Breadboard, Measurements, Projects और Certificate।",
        "Spark बताएगा कि हर module में क्या है और वह इसी order में क्यों आता है।",
        "MVP के लिए यह static interactive-looking card हो सकता है। बाद में यह real simulator बन सकता है।",
      ]
    ),
    keyPoints: t(["Follow the course in order.", "Each module prepares you for the next.", "Do not skip safety.", "Projects come after basics."], ["Course को order में follow करें।", "हर module next के लिए prepare करता है।", "Safety skip न करें।", "Projects basics के बाद आते हैं।"]),
    sparkSays: t("The roadmap is like a map for your electronics journey. Follow it step by step.", "Roadmap आपकी electronics journey का map है। इसे step by step follow करें।"),
    miniCheck: {
      question: t("Should you skip directly to projects?", "क्या सीधे projects पर skip करना चाहिए?"),
      options: t(["Yes", "No"], ["हाँ", "नहीं"]),
      correctIndex: 1,
      feedback: t("Correct! Follow the roadmap in order for the best results.", "सही! Best results के लिए roadmap को order में follow करें।"),
    },
  },
  {
    id: "section-07",
    order: 7,
    title: t("Practical Lab", "Practical lab"),
    shortTitle: t("Lab", "Lab"),
    icon: "FlaskConical",
    image: "be001-section07-practical-lab.png",
    imageFit: "cover",
    caption: t("Observe household electronics without opening dangerous devices.", "Dangerous devices खोले बिना household electronics observe करें।"),
    paragraphs: t(
      ["Find five electronic devices at home. For each device, write what it does, how it gets power, and what kind of electronics may be inside.", "Example: a TV remote uses batteries and probably has a small PCB, buttons, an LED and an IC."],
      ["घर में पाँच electronic devices खोजिए। हर device के लिए लिखिए कि वह क्या करता है, उसे power कैसे मिलती है और उसके अंदर किस तरह की electronics हो सकती है।", "Example: TV remote batteries use करता है और उसमें शायद small PCB, buttons, LED और IC होते हैं।"]
    ),
    labSteps: t(
      ["Choose five safe devices you can observe from outside.", "Write what each device does.", "Write how each device gets power: battery, adapter, USB, wall socket or built-in battery.", "Guess what electronics may be inside: PCB, buttons, LED, sensor, IC, speaker or motor.", "Do not open mains-powered devices."],
      ["ऐसे पाँच safe devices चुनें जिन्हें आप बाहर से observe कर सकते हैं।", "हर device क्या करता है, लिखें।", "हर device को power कैसे मिलती है लिखें: battery, adapter, USB, wall socket या built-in battery।", "Guess करें कि अंदर क्या electronics हो सकती है: PCB, buttons, LED, sensor, IC, speaker या motor।", "Mains-powered devices न खोलें।"]
    ),
    safetyChecklist: t(
      ["Before wiring or measurement, power must be OFF unless the step explicitly says to power ON.", "Check polarity before connecting components.", "Ask Spark if unsure."],
      ["Wiring या measurement से पहले power OFF रखें, जब तक step साफ न कहे कि power ON करें।", "Components connect करने से पहले polarity check करें।", "Unsure हों तो Spark से पूछें।"]
    ),
    sparkSays: t("This lab helps you notice that electronics is already around you everywhere.", "यह lab आपको notice करवाती है कि electronics पहले से आपके आसपास हर जगह है।"),
    miniCheck: {
      question: t("Should you open a mains-powered charger as a beginner?", "Beginner के रूप में mains-powered charger खोलना चाहिए?"),
      options: t(["Yes", "No"], ["हाँ", "नहीं"]),
      correctIndex: 1,
      feedback: t("Correct! Never open mains-powered devices as a beginner. That is dangerous.", "सही! Beginner के रूप में mains-powered devices कभी न खोलें। यह dangerous है।"),
    },
  },
  {
    id: "section-08",
    order: 8,
    title: t("Common Mistakes", "सामान्य गलतियाँ"),
    shortTitle: t("Mistakes", "गलतियाँ"),
    icon: "TriangleAlert",
    image: "be001-section08-mistakes.png",
    imageFit: "contain",
    caption: t("Four beginner mistakes to avoid.", "चार beginner mistakes जिनसे बचना है।"),
    paragraphs: t(["Beginners sometimes make learning harder by rushing, skipping safety or trying to memorize words without observing real circuits."], ["Beginners कभी-कभी rush करके, safety skip करके या real circuits observe किए बिना words memorize करके learning कठिन बना लेते हैं।"]),
    mistakes: [
      { mistake: t("Thinking electronics is only for engineers.", "यह सोचना कि electronics सिर्फ engineers के लिए है।"), fix: t("Start with small observations. Electronics is learnable step by step.", "छोटी observations से शुरू करें। Electronics step by step सीखी जा सकती है।") },
      { mistake: t("Jumping directly into advanced robotics or AI.", "Direct advanced robotics या AI पर jump करना।"), fix: t("Learn safety, tools, electricity and components first.", "पहले safety, tools, electricity और components सीखें।") },
      { mistake: t("Skipping safety and tools.", "Safety और tools skip करना।"), fix: t("Safe habits protect you and your components.", "Safe habits आपको और आपके components को protect करती हैं।") },
      { mistake: t("Memorizing words without building or observing.", "Build या observe किए बिना words memorize करना।"), fix: t("Use real examples, images and small activities.", "Real examples, images और small activities use करें।") },
    ],
    sparkSays: t("Mistakes are normal, but good learning habits help you avoid frustration.", "Mistakes normal हैं, लेकिन good learning habits frustration कम करती हैं।"),
    miniCheck: {
      question: t("What is better for beginners?", "Beginners के लिए क्या बेहतर है?"),
      options: t(["Small steps", "Jumping to advanced projects"], ["छोटे steps", "Advanced projects पर jump करना"]),
      correctIndex: 0,
      feedback: t("Correct! Small steps build a solid foundation.", "सही! छोटे steps strong foundation बनाते हैं।"),
    },
  },
  {
    id: "section-09",
    order: 9,
    title: t("Troubleshooting", "समस्या समाधान"),
    shortTitle: t("Fixes", "समाधान"),
    icon: "Wrench",
    image: "be001-section09-troubleshooting.png",
    imageFit: "cover",
    caption: t("Troubleshooting means slowing down and checking one thing at a time.", "Troubleshooting का अर्थ है धीरे होकर एक-एक चीज check करना।"),
    paragraphs: t(["If you feel stuck, slow down and check one thing at a time. Ask Spark, review the image, check the instructions and compare your circuit with the diagram."], ["अगर आप stuck महसूस करें, तो धीरे-धीरे एक-एक चीज check करें। Spark से पूछें, image देखें, instructions पढ़ें और अपने circuit की diagram से तुलना करें।"]),
    troubleshooting: [
      { problem: t("The course feels too large.", "Course बहुत बड़ा लग रहा है।"), solution: t("Ask Spark to split the course into weekly goals.", "Spark से course को weekly goals में split करने को कहें।") },
      { problem: t("You have no tools yet.", "आपके पास अभी tools नहीं हैं।"), solution: t("Ask Spark for the minimum starter kit before buying anything extra.", "Extra खरीदने से पहले Spark से minimum starter kit पूछें।") },
      { problem: t("You are afraid of making mistakes.", "आप mistakes करने से डर रहे हैं।"), solution: t("Remember that beginner circuits are designed to be safe and guided.", "याद रखें beginner circuits safe और guided designed होते हैं।") },
      { problem: t("A concept feels confusing.", "Concept confusing लग रहा है।"), solution: t("Review the image first, then ask Spark for one real-life example.", "पहले image review करें, फिर Spark से one real-life example पूछें।") },
    ],
    sparkSays: t("Troubleshooting is not failure. It is a normal part of electronics learning.", "Troubleshooting failure नहीं है। यह electronics learning का normal part है।"),
    miniCheck: {
      question: t("When stuck, what should you do?", "Stuck होने पर क्या करना चाहिए?"),
      options: t(["Guess randomly", "Check step by step"], ["Random guess करना", "Step by step check करना"]),
      correctIndex: 1,
      feedback: t("Correct! Checking step by step always works best.", "सही! Step by step checking सबसे अच्छा काम करती है।"),
    },
  },
  {
    id: "section-10",
    order: 10,
    title: t("Spark Glossary", "Spark शब्दावली"),
    shortTitle: t("Glossary", "शब्दावली"),
    icon: "BookMarked",
    image: "be001-section10-glossary.png",
    imageFit: "contain",
    caption: t("Spark explains new words with images and real-life examples.", "Spark नए words को images और real-life examples से समझाता है।"),
    paragraphs: t(["A glossary helps you understand important words. In this lesson, key words include electronics, circuit, component, breadboard and Spark."], ["Glossary important words समझने में मदद करती है। इस lesson में key words हैं electronics, circuit, component, breadboard और Spark।"]),
    glossary: [
      { term: t("Electronics", "इलेक्ट्रॉनिक्स"), definition: t("Technology that controls electricity using components and circuits.", "ऐसी technology जो components और circuits की मदद से electricity control करती है।"), example: t("Look at the phone, router or LED bulb images. Each one uses electronics.", "Phone, router या LED bulb images देखें। हर एक electronics use करता है।") },
      { term: t("Circuit", "सर्किट"), definition: t("A complete path that allows electricity to flow.", "एक complete path जिससे electricity flow कर सकती है।"), example: t("A simple LED circuit needs a complete path from power to LED and back.", "Simple LED circuit को power से LED और वापस तक complete path चाहिए।") },
      { term: t("Component", "घटक"), definition: t("A part used in a circuit, such as resistor or LED.", "Circuit में use होने वाला part, जैसे resistor या LED।"), example: t("A resistor and LED are two beginner-friendly components.", "Resistor और LED beginner-friendly components हैं।") },
      { term: t("Breadboard", "ब्रेडबोर्ड"), definition: t("Reusable board for building circuits without soldering.", "बिना soldering circuits बनाने के लिए reusable board।"), example: t("Beginners use a breadboard to test circuits safely before soldering.", "Beginners soldering से पहले circuits safely test करने के लिए breadboard use करते हैं।") },
      { term: t("Spark", "स्पार्क"), definition: t("ElectroBasics AI mentor.", "ElectroBasics AI mentor।"), example: t("Ask Spark for hints, quizzes, image explanations and troubleshooting help.", "Hints, quizzes, image explanations और troubleshooting help के लिए Spark से पूछें।") },
    ],
    sparkSays: t("Whenever you see a new word, ask me. I can explain it with examples.", "जब भी नया word दिखे, मुझसे पूछें। मैं examples से समझा सकता हूँ।"),
    miniCheck: {
      question: t("What is a breadboard used for?", "Breadboard किसके लिए use होता है?"),
      options: t(["Building circuits without soldering", "Cooking food"], ["बिना soldering circuits बनाने के लिए", "खाना पकाने के लिए"]),
      correctIndex: 0,
      feedback: t("Correct! A breadboard lets you build circuits without soldering.", "सही! Breadboard बिना soldering circuits बनाने देता है।"),
    },
  },
  {
    id: "section-11",
    order: 11,
    title: t("Quiz", "Quiz"),
    shortTitle: t("Quiz", "Quiz"),
    icon: "HelpCircle",
    image: "be001-section11-quiz.png",
    imageFit: "contain",
    caption: t("A short quiz checks the main ideas without pressure.", "छोटा quiz बिना pressure main ideas check करता है।"),
    paragraphs: t(["Now check your understanding with a short quiz. The goal is not to scare you. The goal is to help you remember the important ideas."], ["अब एक छोटा quiz देकर अपनी understanding check करें। इसका goal डराना नहीं है। इसका goal important ideas याद रखने में मदद करना है।"]),
    quizQuestions: [
      { question: t("What is ElectroBasics mainly designed to teach?", "ElectroBasics मुख्य रूप से क्या सिखाने के लिए designed है?"), options: t(["Electronics through practical, visual and interactive learning", "Only advanced robotics", "Only memorized formulas", "Mechanical drawing"], ["Practical, visual और interactive learning से electronics", "सिर्फ advanced robotics", "सिर्फ memorized formulas", "Mechanical drawing"]), correctIndex: 0, feedback: t("Correct. ElectroBasics teaches electronics through practical, visual and interactive learning.", "सही। ElectroBasics practical, visual और interactive learning से electronics सिखाता है।") },
      { question: t("Do beginners need previous electronics knowledge?", "क्या beginners को पहले से electronics knowledge चाहिए?"), options: t(["Yes", "No"], ["हाँ", "नहीं"]), correctIndex: 1, feedback: t("Correct. The course starts from absolute zero.", "सही। Course absolute zero से शुरू होता है।") },
      { question: t("Why does the course start with safety and tools?", "Course safety और tools से क्यों शुरू होता है?"), options: t(["Because students should know how to work safely before powering circuits", "Because projects are not important", "Because tools are more important than learning", "Because circuits do not use electricity"], ["क्योंकि circuits power करने से पहले safely काम करना जानना चाहिए", "क्योंकि projects important नहीं हैं", "क्योंकि tools learning से ज्यादा important हैं", "क्योंकि circuits electricity use नहीं करते"]), correctIndex: 0, feedback: t("Correct. Safe habits come before connecting power.", "सही। Power connect करने से पहले safe habits आती हैं।") },
      { question: t("What can Spark help with?", "Spark किसमें help कर सकता है?"), options: t(["Explanations, hints, quizzes, images, circuits and troubleshooting", "Only account settings", "Only decoration", "Nothing in this lesson"], ["Explanations, hints, quizzes, images, circuits और troubleshooting", "सिर्फ account settings", "सिर्फ decoration", "इस lesson में कुछ नहीं"]), correctIndex: 0, feedback: t("Correct. Spark supports explanations, hints, quizzes, images, circuits and troubleshooting.", "सही। Spark explanations, hints, quizzes, images, circuits और troubleshooting support करता है।") },
      { question: t("Name one everyday device that uses electronics.", "Electronics use करने वाला एक everyday device चुनें।"), options: t(["Phone", "Wooden chair", "Plain notebook", "Glass cup"], ["Phone", "लकड़ी की chair", "Plain notebook", "Glass cup"]), correctIndex: 0, feedback: t("Correct. Phones, laptops, TVs, routers, washing machines and cars all use electronics.", "सही। Phones, laptops, TVs, routers, washing machines और cars electronics use करते हैं।") },
    ],
    sparkSays: t("A quiz is practice. If you get something wrong, I will help you understand it.", "Quiz practice है। अगर कुछ wrong हो, तो मैं उसे समझने में help करूँगा।"),
  },
  {
    id: "section-12",
    order: 12,
    title: t("Homework & Complete Lesson", "Homework और lesson complete"),
    shortTitle: t("Complete", "Complete"),
    icon: "ClipboardCheck",
    image: "be001-section12-complete.png",
    imageFit: "cover",
    caption: t("Complete the observation homework, then unlock the safety lesson.", "Observation homework complete करें, फिर safety lesson unlock होगा।"),
    paragraphs: t(
      ["Review the lesson images. For each image, write one sentence explaining what it teaches. Then complete the practical observation activity and ask Spark to review your understanding.", "In this lesson, you learned the concept step by step using beginner theory, real images, guided visual learning, Spark AI, a practical activity, common mistakes and troubleshooting."],
      ["Lesson images को review करें। हर image के लिए एक sentence लिखिए कि वह क्या सिखाती है। फिर practical observation activity पूरी करें और Spark से अपनी understanding review करवाएँ।", "इस पाठ में आपने शुरुआती सिद्धांत, real images, guided visual learning, Spark AI, practical activity, common mistakes और troubleshooting के माध्यम से topic को step-by-step सीखा।"]
    ),
    homework: t(
      ["Review all lesson images.", "Write one sentence for each image explaining what it teaches.", "Complete the practical lab or observation activity.", "Ask Spark to quiz you once in English and once in Hindi.", "Save one doubt or question for the next lesson."],
      ["सभी lesson images review करें।", "हर image के लिए एक sentence लिखें कि वह क्या सिखाती है।", "Practical lab या observation activity complete करें।", "Spark से एक बार English और एक बार Hindi में quiz पूछने को कहें।", "Next lesson के लिए एक doubt या question save करें।"]
    ),
    achievement: {
      title: t("Welcome Explorer", "Welcome Explorer"),
      message: t("You completed another step in your electronics journey. Keep building slowly and safely.", "आपने अपनी electronics journey में एक और step complete किया। धीरे और safely build करते रहें।"),
    },
    sparkSays: t("Great work. Completing this lesson unlocks the next safety lesson.", "बहुत अच्छा। यह lesson complete करने से next safety lesson unlock होता है।"),
    miniCheck: {
      question: t("What lesson unlocks next?", "Next कौन सा lesson unlock होता है?"),
      options: t(["BE-002 Electronics Lab Safety", "BE-010 Basic Hand Tools"], ["BE-002 Electronics Lab Safety", "BE-010 Basic Hand Tools"]),
      correctIndex: 0,
      feedback: t("Correct! BE-002 Electronics Lab Safety unlocks next.", "सही! BE-002 Electronics Lab Safety next unlock होता है।"),
    },
  },
];

export const LESSON_CHECKLIST = [
  t("Lesson Purpose", "पाठ का उद्देश्य"),
  t("Learning Objectives", "सीखने के उद्देश्य"),
  t("Real-Life Problem", "वास्तविक समस्या"),
  t("Theory", "सिद्धांत"),
  t("Visuals", "Visuals"),
  t("Activity", "Activity"),
  t("Lab", "Lab"),
  t("Mistakes", "गलतियाँ"),
  t("Troubleshooting", "समस्या समाधान"),
  t("Glossary", "शब्दावली"),
  t("Quiz", "Quiz"),
  t("Homework", "Homework"),
];

export const be001 = {
  id: "BE-001",
  title: t("Welcome to ElectroBasics", "ElectroBasics में आपका स्वागत है"),
  hindiTitle: "इलेक्ट्रोबेसिक्स में आपका स्वागत है",
  durationMinutes: 25,
  xp: 30,
  difficulty: t("Beginner", "शुरुआती"),
  badge: t("Welcome Explorer", "Welcome Explorer"),
  heroImage: "be001-hero.png",
  sparkImage: "be001-spark-welcome.png",
  nextLesson: { id: "BE-002", title: t("Electronics Lab Safety", "Electronics Lab Safety"), status: "locked" },
};
