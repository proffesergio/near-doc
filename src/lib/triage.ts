import type { Lang } from "./localization";

interface TriageResult {
  department: string;
  departmentName: string;
  severity: "low" | "medium" | "high";
  treatmentAdvice: string[];
  warning: string;
  summary: string;
}

interface SymptomRule {
  keywords: string[];
  keywordsBn: string[];
  department: string;
  departmentNameEn: string;
  departmentNameBn: string;
  severity: "low" | "medium" | "high";
  summaryEn: string;
  summaryBn: string;
  adviceEn: string[];
  adviceBn: string[];
  warningEn: string;
  warningBn: string;
}

const rules: SymptomRule[] = [
  // HIGH SEVERITY
  {
    keywords: ["chest pain", "heart attack", "heart pain", "chest tightness", "palpitation", "irregular heartbeat", "shortness of breath chest"],
    keywordsBn: ["বুকে ব্যথা", "হার্ট অ্যাটাক", "বুক ব্যথা", "বুকে চাপ", "হৃদরোগ", "বুক ধড়ফড়"],
    department: "cardiology",
    departmentNameEn: "Cardiology",
    departmentNameBn: "কার্ডিওলজি",
    severity: "high",
    summaryEn: "Your symptoms suggest a potential cardiac issue. Chest pain and related symptoms require urgent medical evaluation.",
    summaryBn: "আপনার উপসর্গগুলো সম্ভাব্য হৃদরোগের দিকে ইঙ্গিত করছে। বুকে ব্যথা সংক্রান্ত উপসর্গে জরুরি চিকিৎসা প্রয়োজন।",
    adviceEn: [
      "Seek emergency medical attention immediately",
      "Do not exert yourself physically",
      "If prescribed, take aspirin as directed",
      "Note the time symptoms started for the doctor",
      "Have someone drive you to the hospital — do not drive yourself",
    ],
    adviceBn: [
      "অবিলম্বে জরুরি চিকিৎসা নিন",
      "শারীরিক পরিশ্রম করবেন না",
      "চিকিৎসকের নির্দেশ অনুযায়ী ওষুধ গ্রহণ করুন",
      "উপসর্গ শুরুর সময় নোট করুন",
      "নিজে গাড়ি চালাবেন না — কাউকে সাথে নিয়ে হাসপাতালে যান",
    ],
    warningEn: "URGENT: Chest pain can indicate a heart attack. Call emergency services or go to the nearest hospital immediately.",
    warningBn: "জরুরি: বুকে ব্যথা হার্ট অ্যাটাকের লক্ষণ হতে পারে। এখনই জরুরি সেবায় কল করুন বা নিকটতম হাসপাতালে যান।",
  },
  {
    keywords: ["stroke", "sudden numbness", "face drooping", "slurred speech", "sudden confusion", "paralysis", "one side weak"],
    keywordsBn: ["স্ট্রোক", "হঠাৎ অসাড়", "মুখ বেঁকে যাওয়া", "কথা জড়িয়ে যাওয়া", "প্যারালাইসিস", "একপাশ অবশ"],
    department: "neurology",
    departmentNameEn: "Neurology (Emergency)",
    departmentNameBn: "নিউরোলজি (জরুরি)",
    severity: "high",
    summaryEn: "Your symptoms may indicate a stroke or serious neurological emergency. Immediate medical attention is critical.",
    summaryBn: "আপনার উপসর্গগুলো স্ট্রোক বা গুরুতর স্নায়বিক জরুরি অবস্থার ইঙ্গিত দিতে পারে।",
    adviceEn: [
      "Call emergency services immediately (999)",
      "Note the exact time symptoms started",
      "Do not give any food or water",
      "Keep the person lying down with head slightly elevated",
      "Do not wait for symptoms to improve on their own",
    ],
    adviceBn: [
      "এখনই জরুরি সেবায় কল করুন (৯৯৯)",
      "উপসর্গ শুরুর সঠিক সময় নোট করুন",
      "কোনো খাবার বা পানি দেবেন না",
      "রোগীকে মাথা সামান্য উঁচু করে শুইয়ে রাখুন",
      "উপসর্গ নিজে থেকে ভালো হওয়ার অপেক্ষা করবেন না",
    ],
    warningEn: "URGENT: These symptoms may indicate a stroke. Every minute matters — call 999 or go to the nearest hospital NOW.",
    warningBn: "জরুরি: এই উপসর্গগুলো স্ট্রোকের ইঙ্গিত হতে পারে। প্রতিটি মিনিট গুরুত্বপূর্ণ — এখনই ৯৯৯-এ কল করুন।",
  },
  {
    keywords: ["difficulty breathing", "breathless", "can't breathe", "severe asthma", "wheezing severe", "choking"],
    keywordsBn: ["শ্বাসকষ্ট", "শ্বাস নিতে পারছি না", "তীব্র হাঁপানি", "গলায় আটকে"],
    department: "pulmonology",
    departmentNameEn: "Pulmonology (Emergency)",
    departmentNameBn: "পালমোনোলজি (জরুরি)",
    severity: "high",
    summaryEn: "Severe breathing difficulty requires immediate medical attention. This could indicate a serious respiratory condition.",
    summaryBn: "তীব্র শ্বাসকষ্টে তাৎক্ষণিক চিকিৎসা প্রয়োজন।",
    adviceEn: [
      "Seek emergency medical help immediately",
      "Sit upright to help breathing",
      "Use rescue inhaler if available",
      "Loosen any tight clothing",
      "Stay calm and try to breathe slowly",
    ],
    adviceBn: [
      "এখনই জরুরি চিকিৎসা সাহায্য নিন",
      "শ্বাস নিতে সাহায্যের জন্য সোজা হয়ে বসুন",
      "ইনহেলার থাকলে ব্যবহার করুন",
      "আঁটসাঁট পোশাক ঢিলা করুন",
      "শান্ত থাকুন এবং ধীরে শ্বাস নেওয়ার চেষ্টা করুন",
    ],
    warningEn: "URGENT: Severe breathing difficulty needs emergency care. Go to the nearest hospital immediately.",
    warningBn: "জরুরি: তীব্র শ্বাসকষ্টে জরুরি চিকিৎসা প্রয়োজন। এখনই নিকটতম হাসপাতালে যান।",
  },

  // MEDIUM SEVERITY
  {
    keywords: ["headache", "migraine", "head pain", "dizziness", "vertigo", "fainting", "seizure", "epilepsy", "numbness", "tingling"],
    keywordsBn: ["মাথাব্যথা", "মাথা ব্যথা", "মাইগ্রেন", "মাথা ঘোরা", "ভার্টিগো", "অজ্ঞান", "খিঁচুনি", "মৃগী", "অসাড়তা", "ঝিনঝিন"],
    department: "neurology",
    departmentNameEn: "Neurology",
    departmentNameBn: "নিউরোলজি",
    severity: "medium",
    summaryEn: "Your symptoms suggest a neurological concern. A specialist evaluation is recommended to determine the cause.",
    summaryBn: "আপনার উপসর্গগুলো স্নায়বিক সমস্যার ইঙ্গিত দিচ্ছে। কারণ নির্ণয়ের জন্য বিশেষজ্ঞ মূল্যায়ন প্রয়োজন।",
    adviceEn: [
      "Rest in a quiet, dark room if you have a headache or migraine",
      "Stay hydrated and avoid skipping meals",
      "Avoid bright screens and loud noises",
      "Take note of when symptoms occur and any triggers",
      "Schedule an appointment with a neurologist within a few days",
    ],
    adviceBn: [
      "মাথাব্যথা বা মাইগ্রেন হলে শান্ত, অন্ধকার ঘরে বিশ্রাম নিন",
      "পর্যাপ্ত পানি পান করুন এবং খাবার বাদ দেবেন না",
      "উজ্জ্বল স্ক্রিন এবং জোরে শব্দ এড়িয়ে চলুন",
      "উপসর্গ কখন হয় এবং কোনো ট্রিগার আছে কিনা নোট করুন",
      "কয়েকদিনের মধ্যে নিউরোলজিস্টের সাথে অ্যাপয়েন্টমেন্ট নিন",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["bone pain", "fracture", "joint pain", "back pain", "knee pain", "sprain", "broken bone", "swollen joint", "arthritis", "spine", "shoulder pain", "hip pain", "muscle pain"],
    keywordsBn: ["হাড়ে ব্যথা", "ভাঙা হাড়", "জয়েন্ট ব্যথা", "কোমর ব্যথা", "হাঁটু ব্যথা", "মচকে যাওয়া", "বাত", "মেরুদণ্ড", "কাঁধে ব্যথা", "পেশী ব্যথা"],
    department: "orthopedics",
    departmentNameEn: "Orthopedics",
    departmentNameBn: "অর্থোপেডিক্স",
    severity: "medium",
    summaryEn: "Your symptoms suggest a musculoskeletal issue. An orthopedic evaluation will help determine the best treatment.",
    summaryBn: "আপনার উপসর্গগুলো পেশী-কঙ্কালতন্ত্রের সমস্যার ইঙ্গিত দিচ্ছে। অর্থোপেডিক মূল্যায়ন সর্বোত্তম চিকিৎসা নির্ধারণে সাহায্য করবে।",
    adviceEn: [
      "Rest the affected area and avoid putting weight on it",
      "Apply ice for 15-20 minutes every few hours to reduce swelling",
      "Use a compression bandage if there is swelling",
      "Keep the injured area elevated when possible",
      "See an orthopedic specialist for proper diagnosis",
    ],
    adviceBn: [
      "আক্রান্ত স্থানে বিশ্রাম দিন এবং ওজন দেওয়া এড়িয়ে চলুন",
      "ফোলা কমাতে প্রতি কয়েক ঘণ্টায় ১৫-২০ মিনিট বরফ দিন",
      "ফোলা থাকলে কম্প্রেশন ব্যান্ডেজ ব্যবহার করুন",
      "সম্ভব হলে আক্রান্ত স্থান উঁচু রাখুন",
      "সঠিক রোগ নির্ণয়ের জন্য অর্থোপেডিক বিশেষজ্ঞ দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["stomach pain", "abdominal pain", "vomiting", "nausea", "diarrhea", "acidity", "gas", "bloating", "liver pain", "jaundice", "constipation", "indigestion", "ulcer", "gastric"],
    keywordsBn: ["পেট ব্যথা", "বমি", "বমি বমি ভাব", "ডায়রিয়া", "পাতলা পায়খানা", "এসিডিটি", "গ্যাস", "পেট ফোলা", "লিভার", "জন্ডিস", "কোষ্ঠকাঠিন্য", "বদহজম", "আলসার", "গ্যাস্ট্রিক"],
    department: "gastroenterology",
    departmentNameEn: "Gastroenterology",
    departmentNameBn: "গ্যাস্ট্রোএন্টারোলজি",
    severity: "medium",
    summaryEn: "Your symptoms suggest a digestive system issue. A gastroenterologist can help diagnose and treat the condition.",
    summaryBn: "আপনার উপসর্গগুলো পরিপাকতন্ত্রের সমস্যার ইঙ্গিত দিচ্ছে। একজন গ্যাস্ট্রোএন্টারোলজিস্ট রোগ নির্ণয় ও চিকিৎসায় সাহায্য করতে পারেন।",
    adviceEn: [
      "Eat small, frequent meals instead of large ones",
      "Avoid spicy, oily, and acidic foods temporarily",
      "Stay hydrated — drink water and ORS if you have diarrhea",
      "Avoid lying down immediately after eating",
      "Consult a gastroenterologist if symptoms persist more than 2-3 days",
    ],
    adviceBn: [
      "বড় খাবারের বদলে অল্প অল্প করে ঘন ঘন খান",
      "সাময়িকভাবে ঝাল, তেলযুক্ত এবং অম্লীয় খাবার এড়িয়ে চলুন",
      "পর্যাপ্ত পানি পান করুন — ডায়রিয়া থাকলে ওআরএস খান",
      "খাওয়ার পরপরই শুয়ে পড়বেন না",
      "২-৩ দিনের বেশি উপসর্গ থাকলে গ্যাস্ট্রোএন্টারোলজিস্ট দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["skin rash", "itching", "eczema", "acne", "pimple", "skin infection", "fungal", "ringworm", "allergy skin", "hives", "psoriasis", "skin burn", "rash"],
    keywordsBn: ["চামড়ায় র‍্যাশ", "চুলকানি", "একজিমা", "ব্রণ", "চর্মরোগ", "ফাঙ্গাল", "দাদ", "অ্যালার্জি", "আমবাত", "সোরিয়াসিস", "র‍্যাশ"],
    department: "dermatology",
    departmentNameEn: "Dermatology",
    departmentNameBn: "ডার্মাটোলজি",
    severity: "low",
    summaryEn: "Your symptoms suggest a skin condition. A dermatologist can provide proper diagnosis and treatment.",
    summaryBn: "আপনার উপসর্গগুলো চর্মরোগের ইঙ্গিত দিচ্ছে। একজন চর্মরোগ বিশেষজ্ঞ সঠিক রোগ নির্ণয় ও চিকিৎসা দিতে পারেন।",
    adviceEn: [
      "Keep the affected area clean and dry",
      "Avoid scratching to prevent infection",
      "Use mild, fragrance-free soap and moisturizer",
      "Wear loose, cotton clothing over affected areas",
      "See a dermatologist for persistent or worsening symptoms",
    ],
    adviceBn: [
      "আক্রান্ত স্থান পরিষ্কার ও শুষ্ক রাখুন",
      "সংক্রমণ রোধে চুলকানো থেকে বিরত থাকুন",
      "মৃদু, সুগন্ধিমুক্ত সাবান ও ময়েশ্চারাইজার ব্যবহার করুন",
      "আক্রান্ত স্থানে ঢিলেঢালা সুতি কাপড় পরুন",
      "উপসর্গ বাড়লে বা না কমলে চর্মরোগ বিশেষজ্ঞ দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["ear pain", "hearing loss", "sore throat", "tonsil", "sinus", "nasal congestion", "nose bleed", "ear infection", "ringing ear", "throat pain", "voice hoarse", "snoring"],
    keywordsBn: ["কানে ব্যথা", "কম শোনা", "গলা ব্যথা", "টনসিল", "সাইনাস", "নাক বন্ধ", "নাক দিয়ে রক্ত", "কানে ইনফেকশন", "কানে শব্দ", "গলায় ব্যথা", "গলার স্বর ভাঙা", "নাক ডাকা"],
    department: "ent",
    departmentNameEn: "ENT (Ear, Nose & Throat)",
    departmentNameBn: "নাক-কান-গলা (ইএনটি)",
    severity: "low",
    summaryEn: "Your symptoms suggest an ear, nose, or throat condition. An ENT specialist can evaluate and treat your condition.",
    summaryBn: "আপনার উপসর্গগুলো নাক-কান-গলার সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Gargle with warm salt water for throat pain",
      "Use steam inhalation for nasal congestion",
      "Avoid cold drinks and ice cream temporarily",
      "Keep ears dry and avoid inserting objects",
      "See an ENT specialist if symptoms last more than a week",
    ],
    adviceBn: [
      "গলা ব্যথায় গরম লবণ পানি দিয়ে গার্গল করুন",
      "নাক বন্ধ থাকলে ভাপ নিন",
      "সাময়িকভাবে ঠান্ডা পানীয় ও আইসক্রিম এড়িয়ে চলুন",
      "কান শুষ্ক রাখুন এবং কানে কিছু ঢোকাবেন না",
      "এক সপ্তাহের বেশি উপসর্গ থাকলে ইএনটি বিশেষজ্ঞ দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["cough", "cold", "flu", "asthma", "wheezing", "bronchitis", "breathing problem", "phlegm", "mucus", "pneumonia", "tuberculosis", "tb"],
    keywordsBn: ["কাশি", "সর্দি", "ফ্লু", "হাঁপানি", "শ্বাসকষ্ট", "ব্রংকাইটিস", "কফ", "শ্লেষ্মা", "নিউমোনিয়া", "যক্ষ্মা", "টিবি"],
    department: "pulmonology",
    departmentNameEn: "Pulmonology",
    departmentNameBn: "পালমোনোলজি",
    severity: "medium",
    summaryEn: "Your symptoms suggest a respiratory condition. A pulmonologist can help diagnose and manage your condition.",
    summaryBn: "আপনার উপসর্গগুলো শ্বাসতন্ত্রের সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Rest and stay hydrated",
      "Use honey and warm water to soothe cough",
      "Avoid dust, smoke, and polluted areas",
      "Cover your mouth when coughing to prevent spread",
      "See a pulmonologist if cough persists beyond 2 weeks or you have breathing difficulty",
    ],
    adviceBn: [
      "বিশ্রাম নিন এবং পর্যাপ্ত পানি পান করুন",
      "কাশি কমাতে মধু ও গরম পানি খান",
      "ধুলা, ধোঁয়া ও দূষিত এলাকা এড়িয়ে চলুন",
      "কাশির সময় মুখ ঢেকে রাখুন",
      "২ সপ্তাহের বেশি কাশি থাকলে বা শ্বাসকষ্ট হলে পালমোনোলজিস্ট দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["eye pain", "blurry vision", "vision loss", "red eye", "eye infection", "watery eyes", "eye swelling", "cataract", "glaucoma"],
    keywordsBn: ["চোখে ব্যথা", "ঝাপসা দেখা", "দৃষ্টি কমে যাওয়া", "চোখ লাল", "চোখের ইনফেকশন", "চোখ দিয়ে পানি পড়া", "চোখ ফোলা", "ছানি", "গ্লুকোমা"],
    department: "ophthalmology",
    departmentNameEn: "Ophthalmology",
    departmentNameBn: "চক্ষু বিজ্ঞান",
    severity: "medium",
    summaryEn: "Your symptoms suggest an eye condition. An ophthalmologist can provide proper diagnosis and treatment.",
    summaryBn: "আপনার উপসর্গগুলো চোখের সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Avoid rubbing your eyes",
      "Wash hands before touching your eyes",
      "Reduce screen time and take regular breaks",
      "Wear sunglasses outdoors to protect from dust and UV",
      "See an ophthalmologist promptly for vision changes or pain",
    ],
    adviceBn: [
      "চোখ কচলানো এড়িয়ে চলুন",
      "চোখে হাত দেওয়ার আগে হাত ধুয়ে নিন",
      "স্ক্রিন টাইম কমান এবং নিয়মিত বিরতি নিন",
      "বাইরে ধুলা ও UV থেকে সুরক্ষায় সানগ্লাস পরুন",
      "দৃষ্টি পরিবর্তন বা ব্যথা হলে দ্রুত চক্ষু বিশেষজ্ঞ দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["pregnancy", "period pain", "irregular period", "menstrual", "pcos", "ovary", "vaginal", "breast lump", "fertility", "miscarriage", "menopause"],
    keywordsBn: ["গর্ভাবস্থা", "মাসিকের ব্যথা", "অনিয়মিত মাসিক", "মাসিক", "ওভারি", "স্তনে চাকা", "বন্ধ্যাত্ব", "গর্ভপাত", "মেনোপজ"],
    department: "gynecology",
    departmentNameEn: "Obstetrics & Gynecology",
    departmentNameBn: "প্রসূতি ও স্ত্রীরোগ",
    severity: "medium",
    summaryEn: "Your symptoms suggest a gynecological concern. A specialist can provide proper evaluation and care.",
    summaryBn: "আপনার উপসর্গগুলো স্ত্রীরোগ সংক্রান্ত সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Track your symptoms and menstrual cycle dates",
      "Maintain a balanced diet and regular exercise",
      "Avoid self-medication for hormonal issues",
      "Stay hydrated and manage stress",
      "Schedule an appointment with a gynecologist for proper evaluation",
    ],
    adviceBn: [
      "আপনার উপসর্গ এবং মাসিক চক্রের তারিখ নোট করুন",
      "সুষম খাদ্য এবং নিয়মিত ব্যায়াম করুন",
      "হরমোনাল সমস্যায় নিজে ওষুধ খাবেন না",
      "পর্যাপ্ত পানি পান করুন এবং মানসিক চাপ সামলান",
      "সঠিক মূল্যায়নের জন্য গাইনি বিশেষজ্ঞের অ্যাপয়েন্টমেন্ট নিন",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["child sick", "baby fever", "child cough", "infant", "newborn", "child vomit", "child rash", "child diarrhea", "pediatric", "vaccination"],
    keywordsBn: ["বাচ্চার অসুখ", "বাচ্চার জ্বর", "শিশুর কাশি", "নবজাতক", "শিশুর বমি", "শিশুর র‍্যাশ", "শিশুর পাতলা পায়খানা", "টিকা"],
    department: "pediatrics",
    departmentNameEn: "Pediatrics",
    departmentNameBn: "শিশু রোগ",
    severity: "medium",
    summaryEn: "Your child's symptoms need pediatric evaluation. A pediatrician can provide age-appropriate diagnosis and treatment.",
    summaryBn: "আপনার শিশুর উপসর্গে শিশু বিশেষজ্ঞের মূল্যায়ন প্রয়োজন।",
    adviceEn: [
      "Keep the child hydrated with fluids and ORS",
      "Monitor temperature regularly",
      "Ensure the child gets adequate rest",
      "Do not give adult medication to children",
      "Visit a pediatrician — do not delay if the child is under 1 year",
    ],
    adviceBn: [
      "শিশুকে পর্যাপ্ত তরল ও ওআরএস খাওয়ান",
      "নিয়মিত তাপমাত্রা পরীক্ষা করুন",
      "শিশু যথেষ্ট বিশ্রাম পাচ্ছে তা নিশ্চিত করুন",
      "শিশুকে বড়দের ওষুধ দেবেন না",
      "শিশু বিশেষজ্ঞ দেখান — ১ বছরের কম বয়সী হলে দেরি করবেন না",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["urinary", "kidney pain", "blood in urine", "painful urination", "kidney stone", "frequent urination", "bladder", "prostate"],
    keywordsBn: ["প্রস্রাবে সমস্যা", "কিডনি ব্যথা", "প্রস্রাবে রক্ত", "প্রস্রাবে জ্বালা", "কিডনি পাথর", "ঘন ঘন প্রস্রাব", "মূত্রথলি", "প্রস্টেট"],
    department: "urology",
    departmentNameEn: "Urology",
    departmentNameBn: "ইউরোলজি",
    severity: "medium",
    summaryEn: "Your symptoms suggest a urological condition. A urologist can provide proper diagnosis and treatment.",
    summaryBn: "আপনার উপসর্গগুলো মূত্রতন্ত্রের সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Drink plenty of water (8-10 glasses daily)",
      "Avoid holding urine for long periods",
      "Reduce salt and protein intake temporarily",
      "Avoid caffeine and alcohol",
      "See a urologist promptly, especially if there is blood in urine",
    ],
    adviceBn: [
      "প্রচুর পানি পান করুন (দৈনিক ৮-১০ গ্লাস)",
      "দীর্ঘসময় প্রস্রাব আটকে রাখবেন না",
      "সাময়িকভাবে লবণ ও প্রোটিন গ্রহণ কমান",
      "ক্যাফেইন ও অ্যালকোহল এড়িয়ে চলুন",
      "দ্রুত ইউরোলজিস্ট দেখান, বিশেষত প্রস্রাবে রক্ত থাকলে",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["depression", "anxiety", "panic attack", "insomnia", "sleep problem", "mental health", "stress", "suicidal", "mood swing", "ocd", "ptsd"],
    keywordsBn: ["বিষণ্নতা", "দুশ্চিন্তা", "প্যানিক অ্যাটাক", "ঘুম না হওয়া", "ঘুমের সমস্যা", "মানসিক স্বাস্থ্য", "মানসিক চাপ", "আত্মহত্যা", "মেজাজ পরিবর্তন"],
    department: "psychiatry",
    departmentNameEn: "Psychiatry",
    departmentNameBn: "মনোরোগ বিদ্যা",
    severity: "medium",
    summaryEn: "Your symptoms suggest a mental health concern. A psychiatrist can help with proper evaluation and treatment plan.",
    summaryBn: "আপনার উপসর্গগুলো মানসিক স্বাস্থ্য সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Talk to someone you trust about how you are feeling",
      "Maintain a regular sleep schedule",
      "Practice deep breathing or meditation",
      "Limit caffeine and avoid alcohol",
      "Seek professional help — mental health is just as important as physical health",
    ],
    adviceBn: [
      "আপনার বিশ্বস্ত কারো সাথে আপনার অনুভূতি শেয়ার করুন",
      "নিয়মিত ঘুমের সময়সূচী বজায় রাখুন",
      "গভীর শ্বাস-প্রশ্বাস বা মেডিটেশন অনুশীলন করুন",
      "ক্যাফেইন সীমিত করুন এবং অ্যালকোহল এড়িয়ে চলুন",
      "পেশাদার সাহায্য নিন — মানসিক স্বাস্থ্য শারীরিক স্বাস্থ্যের মতোই গুরুত্বপূর্ণ",
    ],
    warningEn: "",
    warningBn: "",
  },
  {
    keywords: ["toothache", "tooth pain", "gum pain", "bleeding gum", "cavity", "dental", "wisdom tooth", "jaw pain", "mouth sore", "bad breath"],
    keywordsBn: ["দাঁতে ব্যথা", "দাঁত ব্যথা", "মাড়ি ব্যথা", "মাড়ি থেকে রক্ত", "ক্যাভিটি", "দাঁতের সমস্যা", "আক্কেল দাঁত", "চোয়াল ব্যথা", "মুখে ঘা", "মুখে দুর্গন্ধ"],
    department: "dentistry",
    departmentNameEn: "Dentistry",
    departmentNameBn: "দন্ত চিকিৎসা",
    severity: "low",
    summaryEn: "Your symptoms suggest a dental condition. A dentist can diagnose and treat the issue effectively.",
    summaryBn: "আপনার উপসর্গগুলো দাঁতের সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Rinse mouth with warm salt water for pain relief",
      "Avoid very hot or cold food and drinks",
      "Use a soft-bristle toothbrush and brush gently",
      "Do not ignore persistent tooth pain",
      "Visit a dentist as soon as possible for proper treatment",
    ],
    adviceBn: [
      "ব্যথা কমাতে গরম লবণ পানি দিয়ে কুলকুচি করুন",
      "অতিরিক্ত গরম বা ঠান্ডা খাবার ও পানীয় এড়িয়ে চলুন",
      "নরম ব্রিসেলের টুথব্রাশ ব্যবহার করুন এবং আলতোভাবে ব্রাশ করুন",
      "ক্রমাগত দাঁতের ব্যথা উপেক্ষা করবেন না",
      "যত তাড়াতাড়ি সম্ভব সঠিক চিকিৎসার জন্য ডেন্টিস্ট দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },

  // GENERAL / FALLBACK
  {
    keywords: ["fever", "tired", "weakness", "fatigue", "body ache", "weight loss", "appetite loss", "diabetes", "blood pressure", "hypertension", "thyroid", "anemia"],
    keywordsBn: ["জ্বর", "ক্লান্তি", "দুর্বলতা", "শরীর ব্যথা", "ওজন কমে যাওয়া", "খিদে নেই", "ডায়াবেটিস", "রক্তচাপ", "উচ্চ রক্তচাপ", "থাইরয়েড", "রক্তশূন্যতা"],
    department: "general_medicine",
    departmentNameEn: "General Medicine",
    departmentNameBn: "জেনারেল মেডিসিন",
    severity: "low",
    summaryEn: "Your symptoms suggest a general medical condition. An internal medicine specialist can help with evaluation and treatment.",
    summaryBn: "আপনার উপসর্গগুলো সাধারণ চিকিৎসা সংক্রান্ত সমস্যার ইঙ্গিত দিচ্ছে।",
    adviceEn: [
      "Get plenty of rest and stay hydrated",
      "Monitor your temperature if you have a fever",
      "Eat a balanced, nutritious diet",
      "Avoid strenuous activity until you feel better",
      "See a doctor if symptoms persist for more than 3 days",
    ],
    adviceBn: [
      "পর্যাপ্ত বিশ্রাম নিন এবং পানি পান করুন",
      "জ্বর থাকলে তাপমাত্রা পর্যবেক্ষণ করুন",
      "সুষম, পুষ্টিকর খাবার খান",
      "ভালো না অনুভব করা পর্যন্ত কঠিন কাজ এড়িয়ে চলুন",
      "৩ দিনের বেশি উপসর্গ থাকলে ডাক্তার দেখান",
    ],
    warningEn: "",
    warningBn: "",
  },
];

export function analyzeSymptoms(symptoms: string, lang: Lang): TriageResult {
  const input = symptoms.toLowerCase();

  // Score each rule by counting keyword matches
  let bestRule: SymptomRule | null = null;
  let bestScore = 0;

  for (const rule of rules) {
    let score = 0;
    const keywords = lang === "bn" ? [...rule.keywords, ...rule.keywordsBn] : [...rule.keywords, ...rule.keywordsBn];

    for (const keyword of keywords) {
      if (input.includes(keyword.toLowerCase())) {
        score += keyword.split(" ").length; // multi-word matches score higher
      }
    }

    // High severity rules get a boost to ensure they win ties
    if (score > 0 && rule.severity === "high") {
      score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  // Fallback to general medicine
  if (!bestRule) {
    bestRule = rules[rules.length - 1];
  }

  const isBn = lang === "bn";

  return {
    department: bestRule.department,
    departmentName: isBn ? bestRule.departmentNameBn : bestRule.departmentNameEn,
    severity: bestRule.severity,
    treatmentAdvice: isBn ? bestRule.adviceBn : bestRule.adviceEn,
    warning: isBn ? bestRule.warningBn : bestRule.warningEn,
    summary: isBn ? bestRule.summaryBn : bestRule.summaryEn,
  };
}
