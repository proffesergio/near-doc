# NearDoc — AI Health Companion for Dhaka

NearDoc is a bilingual (Bangla/English) web application that helps residents of Dhaka find the right doctor based on their symptoms. Users describe how they feel — by typing or speaking — and NearDoc analyzes the symptoms, identifies the appropriate medical department, and recommends specialist doctors with full clinic details.

Built at the **Impact Dhaka Hackathon** to solve the real problem of navigating Dhaka's complex healthcare landscape.

## Features

- **Symptom Analysis** — Intelligent triage engine that maps symptoms to 14 medical departments with severity assessment (low/medium/high)
- **Doctor Recommendations** — Curated database of specialist doctors in Dhaka with hospital, location, chamber hours, consultation fees, phone numbers, and ratings
- **Bilingual Support** — Full Bangla and English interface — toggle with one tap
- **Voice Input** — Speak your symptoms in Bangla or English using the Web Speech API
- **Emergency Detection** — High-severity symptoms trigger an emergency banner with direct call buttons for 999 (national emergency), ambulance (16789), and health helpline (10666)
- **Google Maps Integration** — "Get Directions" button on every doctor card opens Google Maps with the hospital location
- **Quick Symptom Chips** — One-tap symptom suggestions for faster input
- **Demo Scenarios** — Pre-built scenarios to showcase different flows instantly
- **Mobile-First Design** — Responsive UI optimized for phones, where most Dhaka users will access the app

## Medical Departments Covered

Cardiology, Neurology, Orthopedics, Dermatology, Gastroenterology, ENT, Pulmonology, General Medicine, Ophthalmology, Gynecology, Pediatrics, Urology, Psychiatry, Dentistry

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Voice Input**: Web Speech API (browser-native)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

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

The app will be running at [http://localhost:3000](http://localhost:3000).

### Environment Variables (Optional)

If you have an Anthropic API key and want to use Claude-powered AI analysis instead of the built-in triage engine:

```bash
# Create .env.local in the project root
echo "ANTHROPIC_API_KEY=your-api-key-here" > .env.local
```

The app works fully without an API key using the local symptom matching engine.

## How to Use

### 1. Open the App
Navigate to the app in your browser. You'll see the home screen with a symptom input area.

### 2. Switch Language (Optional)
Click the language toggle button in the top-right corner to switch between English and Bangla.

### 3. Describe Your Symptoms
You have three ways to input symptoms:

- **Type**: Write your symptoms in the text area (e.g., "I have a headache and fever for 3 days")
- **Quick Chips**: Tap a symptom chip below the input to auto-fill common symptoms
- **Voice**: Tap the microphone button and speak your symptoms in Bangla or English

### 4. Find Your Doctor
Click **"Find My Doctor"** (or "ডাক্তার খুঁজুন" in Bangla). The app will:

1. Analyze your symptoms
2. Identify the most relevant medical department
3. Assess severity (Low / Medium / High)
4. Show preliminary health advice
5. Display matching specialist doctors in Dhaka

### 5. View Doctor Details
Each doctor card shows:
- Name and specialty
- Hospital and location
- Chamber hours and available days
- Consultation fee
- Experience and rating
- **Call** button — tap to call the doctor directly
- **Directions** button — tap to open Google Maps with the hospital location

### 6. Emergency Cases
If your symptoms indicate a potentially serious condition (e.g., chest pain, stroke symptoms, severe breathing difficulty), the app will:
- Flag the result as **High Severity**
- Show a red emergency banner with direct call buttons for:
  - **999** — National Emergency
  - **16789** — Ambulance Service
  - **10666** — Health Helpline

### 7. Try Demo Scenarios
On the home screen, use the **"Try a Demo Scenario"** buttons to see different flows:
- Chest pain emergency (high severity with emergency banner)
- Child with fever (pediatrics)
- Mental health (psychiatry)
- Eye problem (ophthalmology)

### 8. New Search
Click **"New Search"** to reset and search for a different symptom.

## Project Structure

```
neardoc/
├── src/
│   ├── app/
│   │   ├── api/analyze/     # Symptom analysis API endpoint
│   │   ├── globals.css      # Global styles and animations
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main app page
│   ├── components/
│   │   ├── AnalysisResult.tsx   # Triage result display
│   │   ├── DoctorCard.tsx       # Doctor info card with actions
│   │   ├── EmergencyBanner.tsx  # Emergency alert with call buttons
│   │   └── VoiceInput.tsx       # Voice input with Web Speech API
│   ├── lib/
│   │   ├── doctors.ts       # Doctor database and search
│   │   ├── localization.ts  # Bangla/English translations
│   │   └── triage.ts        # Symptom analysis engine
│   └── types/
│       └── speech.d.ts      # Web Speech API type definitions
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind / postcss config
```

## Deployment on Vercel

### One-Click Deploy

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

## Disclaimer

NearDoc provides AI-generated guidance for informational purposes only. It is **not** a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns. In case of emergency, call **999** immediately.

## Team

Built at **Impact Dhaka Hackathon**

## License

MIT
