# 🏥 NearDoc

## AI Health Companion for Dhaka, Bangladesh

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>NearDoc</b> is a bilingual (Bangla/English) AI-powered web application that helps residents of Dhaka find the right doctor based on their symptoms. Built at the <a href="#">Impact Dhaka Hackathon</a> to solve the real problem of navigating Dhaka's complex healthcare landscape.
</p>

<p align="center">
  <a href="https://near-doc.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-blue?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
</p>

> 🌐 **Live Demo:** Try the app now at **[https://near-doc.vercel.app/](https://near-doc.vercel.app/)**</p>

---

## 🔗 Live Demo

<p align="center">
  <a href="https://near-doc.vercel.app/">
    <img src="https://img.shields.io/badge/🌐 Try It Now-Click to Open-FF6F00?style=for-the-badge&logo=vercel" alt="Live Demo">
  </a>
</p>

<p align="center">
  <b>🚀 The app is now deployed live! Test it here:</b><br>
  <a href="https://near-doc.vercel.app/">https://near-doc.vercel.app/</a>
</p>

---

## ✨ Features

### Core Features

| Feature | Description |
|---------|-------------|
| 🩺 **Symptom Analysis** | Intelligent triage engine that maps symptoms to 14 medical departments with severity assessment (Low/Medium/High) |
| 👨‍⚕️ **Doctor Recommendations** | Curated database of specialist doctors in Dhaka with hospital, location, chamber hours, consultation fees, phone numbers, and ratings |
| 🌐 **Bilingual Support** | Full Bangla and English interface — toggle with one tap |
| 🎙️ **Voice Input** | Speak your symptoms in Bangla or English using the Web Speech API |
| 🚨 **Emergency Detection** | High-severity symptoms trigger an emergency banner with direct call buttons for 999 (national emergency), ambulance (16789), and health helpline (10666) |
| 📍 **Google Maps Integration** | "Get Directions" button on every doctor card opens Google Maps with the hospital location |
| ⚡ **Quick Symptom Chips** | One-tap symptom suggestions for faster input |
| 🎬 **Demo Scenarios** | Pre-built scenarios to showcase different flows instantly |
| 📱 **Mobile-First Design** | Responsive UI optimized for phones |

---

## 🏥 Medical Departments Covered

<p align="center">
  <kbd>Cardiology</kbd> • <kbd>Neurology</kbd> • <kbd>Orthopedics</kbd> • <kbd>Dermatology</kbd> • <kbd>Gastroenterology</kbd> • <kbd>ENT</kbd> • <kbd>Pulmonology</kbd> • <kbd>General Medicine</kbd> • <kbd>Ophthalmology</kbd> • <kbd>Gynecology</kbd> • <kbd>Pediatrics</kbd> • <kbd>Urology</kbd> • <kbd>Psychiatry</kbd> • <kbd>Dentistry</kbd>
</p>

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![Next.js](https://img.shields.io/badge/Next.js-15-black) | Framework with App Router |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6) | Type-safe JavaScript |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC) | Utility-first CSS |
| ![Web Speech API](https://img.shields.io/badge/Web%20Speech-API-FF6F00) | Voice recognition |
| ![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000) | Hosting platform |

</div>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/neardoc.git
cd neardoc

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at **[http://localhost:3000](http://localhost:3000)**

### Environment Variables (Optional)

If you have an Anthropic API key and want to use Claude-powered AI analysis instead of the built-in triage engine:

```bash
# Create .env.local in the project root
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env.local
```

> **Note:** The app works fully without an API key using the local symptom matching engine.

---

## 📖 How to Use

### Step-by-Step Guide

#### 1️⃣ Open the App
Navigate to the app in your browser. You'll see the home screen with a symptom input area.

#### 2️⃣ Switch Language (Optional)
Click the language toggle button in the top-right corner to switch between English and Bangla.

#### 3️⃣ Describe Your Symptoms
You have **three ways** to input symptoms:
- **Type**: Write your symptoms in the text area (e.g., "I have a headache and fever for 3 days")
- **Quick Chips**: Tap a symptom chip below the input to auto-fill common symptoms
- **Voice**: Tap the microphone button and speak your symptoms in Bangla or English

#### 4️⃣ Find Your Doctor
Click **"Find My Doctor"** (or **"ডাক্তার খুঁজুন"** in Bangla). The app will:
1. Analyze your symptoms
2. Identify the most relevant medical department
3. Assess severity (Low / Medium / High)
4. Show preliminary health advice
5. Display matching specialist doctors in Dhaka

#### 5️⃣ View Doctor Details
Each doctor card shows:
- Name and specialty
- Hospital and location
- Chamber hours and available days
- Consultation fee
- Experience and rating
- 📞 **Call** button — tap to call the doctor directly
- 🗺️ **Directions** button — tap to open Google Maps with the hospital location

#### 6️⃣ Emergency Cases
If your symptoms indicate a potentially serious condition (e.g., chest pain, stroke symptoms, severe breathing difficulty), the app will:
- Flag the result as **High Severity**
- Show a red emergency banner with direct call buttons for:
  - **999** — National Emergency
  - **16789** — Ambulance Service
  - **10666** — Health Helpline

#### 7️⃣ Try Demo Scenarios
On the home screen, use the **"Try a Demo Scenario"** buttons to see different flows:
- 🫀 Chest pain emergency (high severity with emergency banner)
- 👶 Child with fever (pediatrics)
- 🧠 Mental health (psychiatry)
- 👁️ Eye problem (ophthalmology)

#### 8️⃣ New Search
Click **"New Search"** to reset and search for a different symptom.

---

## 📁 Project Structure

```
neardoc/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze/          # Symptom analysis API endpoint
│   │   ├── globals.css           # Global styles and animations
│   │   ├── layout.tsx           # Root layout with metadata
│   │   ├── page.tsx             # Main app page
│   │   └── favicon.ico          # App icon
│   ├── components/
│   │   ├── AnalysisResult.tsx   # Triage result display
│   │   ├── DoctorCard.tsx       # Doctor info card with actions
│   │   ├── EmergencyBanner.tsx  # Emergency alert with call buttons
│   │   ├── VoiceInput.tsx       # Voice input with Web Speech API
│   │   └── MedsReminder.tsx     # Medicine reminder feature
│   ├── lib/
│   │   ├── doctors.ts           # Doctor database and search
│   │   ├── localization.ts      # Bangla/English translations
│   │   └── triage.ts            # Symptom analysis engine
│   └── types/
│       └── speech.d.ts           # Web Speech API type definitions
├── public/
│   ├── doctors/                  # Doctor images
│   ├── file.svg
│   ├── globe.svg
│   ├── vercel.svg
│   └── window.svg
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🔧 API Endpoint

### `POST /api/analyze`

Analyzes symptoms and returns department recommendations with matching doctors.

**Request:**
```json
{
  "symptoms": "I have chest pain and shortness of breath",
  "lang": "en"
}
```

**Response:**
```json
{
  "analysis": {
    "department": "cardiology",
    "departmentName": "Cardiology",
    "severity": "high",
    "treatmentAdvice": ["..."],
    "warning": "URGENT: Chest pain can indicate a heart attack...",
    "summary": "Your symptoms suggest a potential cardiac issue..."
  },
  "doctors": [...]
}
```

---

## 🚀 Deployment

### 🌐 Live Demo

**Try the app right now:** **[https://near-doc.vercel.app/](https://near-doc.vercel.app/)**

---

### One-Click Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** and import your repository
4. Vercel auto-detects Next.js — no configuration needed
5. (Optional) Add `ANTHROPIC_API_KEY` in Environment Variables if using AI analysis
6. Click **Deploy**

### CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## ⚠️ Disclaimer

<p align="center">
  <b>NearDoc</b> provides AI-generated guidance for informational purposes only. It is <b>NOT</b> a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.
</p>

<p align="center">
  In case of emergency, call <b>999</b> immediately.
</p>

---

## 📄 License

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

<p align="center">
  This project is licensed under the MIT License.
</p>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🙏 Acknowledgments

- Built at the **Impact Dhaka Hackathon**
- Doctor data curated for Dhaka, Bangladesh
- Inspired by the need to simplify healthcare navigation in urban Bangladesh

---

<p align="center">
  Made with ❤️ for Dhaka
</p>
