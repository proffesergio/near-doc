"use client";

import { useState, useCallback } from "react";
import type { Lang } from "@/lib/localization";
import { t } from "@/lib/localization";
import type { Doctor } from "@/lib/doctors";
import VoiceInput from "@/components/VoiceInput";
import DoctorCard from "@/components/DoctorCard";
import AnalysisResult from "@/components/AnalysisResult";
import EmergencyBanner from "@/components/EmergencyBanner";

interface Analysis {
  department: string;
  departmentName: string;
  severity: "low" | "medium" | "high";
  treatmentAdvice: string[];
  warning: string;
  summary: string;
}

type AppState = "input" | "loading" | "results" | "error";

const quickSymptoms = {
  en: [
    "Headache and fever",
    "Stomach pain",
    "Chest pain",
    "Skin rash and itching",
    "Sore throat and cough",
    "Back pain",
  ],
  bn: [
    "মাথাব্যথা ও জ্বর",
    "পেট ব্যথা",
    "বুকে ব্যথা",
    "চামড়ায় র‍্যাশ ও চুলকানি",
    "গলা ব্যথা ও কাশি",
    "কোমর ব্যথা",
  ],
};

const demoScenarios = {
  en: [
    { label: "Try: Chest pain emergency", symptoms: "I have severe chest pain and difficulty breathing since this morning" },
    { label: "Try: Child with fever", symptoms: "My 3 year old child has high fever and diarrhea for 2 days" },
    { label: "Try: Mental health", symptoms: "I have been feeling very anxious and can't sleep for weeks" },
    { label: "Try: Eye problem", symptoms: "My vision is getting blurry and I have eye pain" },
  ],
  bn: [
    { label: "চেষ্টা করুন: বুকে ব্যথা", symptoms: "সকাল থেকে বুকে তীব্র ব্যথা এবং শ্বাসকষ্ট হচ্ছে" },
    { label: "চেষ্টা করুন: শিশুর জ্বর", symptoms: "আমার ৩ বছরের বাচ্চার ২ দিন ধরে তীব্র জ্বর ও পাতলা পায়খানা" },
    { label: "চেষ্টা করুন: মানসিক স্বাস্থ্য", symptoms: "কয়েক সপ্তাহ ধরে খুব দুশ্চিন্তা হচ্ছে এবং ঘুম হচ্ছে না" },
    { label: "চেষ্টা করুন: চোখের সমস্যা", symptoms: "চোখে ঝাপসা দেখছি এবং চোখে ব্যথা হচ্ছে" },
  ],
};

const howItWorks = {
  en: [
    { step: "1", title: "Describe Symptoms", desc: "Type or speak your symptoms in Bangla or English" },
    { step: "2", title: "AI Analyzes", desc: "Our system identifies the right medical department" },
    { step: "3", title: "Find Your Doctor", desc: "Get matched with specialists in Dhaka with clinic details" },
  ],
  bn: [
    { step: "১", title: "উপসর্গ বর্ণনা করুন", desc: "বাংলায় বা ইংরেজিতে আপনার উপসর্গ টাইপ করুন বা বলুন" },
    { step: "২", title: "AI বিশ্লেষণ", desc: "আমাদের সিস্টেম সঠিক চিকিৎসা বিভাগ চিহ্নিত করে" },
    { step: "৩", title: "ডাক্তার খুঁজুন", desc: "ঢাকায় ক্লিনিকের বিস্তারিত সহ বিশেষজ্ঞ ডাক্তার পান" },
  ],
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [symptoms, setSymptoms] = useState("");
  const [appState, setAppState] = useState<AppState>("input");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const labels = t[lang];

  const handleAnalyze = useCallback(async (overrideSymptoms?: string) => {
    const text = overrideSymptoms || symptoms;
    if (!text.trim() || text.trim().length < 3) return;

    if (overrideSymptoms) {
      setSymptoms(overrideSymptoms);
    }

    setAppState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: text.trim(), lang }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
      setDoctors(data.doctors);
      setAppState("results");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : labels.errorMsg);
      setAppState("error");
    }
  }, [symptoms, lang, labels.errorMsg]);

  const handleReset = useCallback(() => {
    setSymptoms("");
    setAnalysis(null);
    setDoctors([]);
    setAppState("input");
    setErrorMsg("");
  }, []);

  const handleVoiceTranscript = useCallback((text: string) => {
    setSymptoms((prev) => (prev ? prev + " " + text : text));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              {labels.appName}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border-2 border-gray-200 hover:border-sky-300 hover:text-sky-600 transition-all cursor-pointer"
          >
            {labels.langToggle}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        {/* Hero / Input Section */}
        {(appState === "input" || appState === "loading" || appState === "error") && (
          <div className="animate-fade-in-up">
            {/* Hero text */}
            <div className="text-center mb-8 mt-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                {labels.tagline}
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                {labels.subtitle}
              </p>
            </div>

            {/* Input area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={labels.inputPlaceholder}
                rows={4}
                className="w-full resize-none rounded-xl border-2 border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 p-4 text-gray-800 placeholder:text-gray-400 outline-none transition-all text-base"
                disabled={appState === "loading"}
              />

              {/* Quick symptom chips */}
              <div className="flex flex-wrap gap-2 mt-3">
                {quickSymptoms[lang].map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => setSymptoms(symptom)}
                    disabled={appState === "loading"}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <VoiceInput
                  lang={lang}
                  onTranscript={handleVoiceTranscript}
                  labels={{ voiceBtn: labels.voiceBtn, listening: labels.listening }}
                />

                <button
                  onClick={() => handleAnalyze()}
                  disabled={appState === "loading" || symptoms.trim().length < 3}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  {appState === "loading" ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {labels.analyzing}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {labels.analyzeBtn}
                    </>
                  )}
                </button>
              </div>

              {/* Error message */}
              {appState === "error" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {errorMsg || labels.errorMsg}
                </div>
              )}
            </div>

            {/* How it Works */}
            {appState === "input" && (
              <div className="mt-10">
                <h2 className="text-center text-lg font-bold text-gray-800 mb-5">
                  {lang === "bn" ? "কিভাবে কাজ করে" : "How It Works"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {howItWorks[lang].map((item, i) => (
                    <div key={i} className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                      {i < 2 && (
                        <div className="hidden sm:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-300 text-2xl z-10">
                          &rarr;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Demo scenarios */}
            {appState === "input" && (
              <div className="mt-8">
                <h2 className="text-center text-lg font-bold text-gray-800 mb-4">
                  {lang === "bn" ? "দ্রুত পরীক্ষা করুন" : "Try a Demo Scenario"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoScenarios[lang].map((scenario, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnalyze(scenario.symptoms)}
                      className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-100 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800 text-sm block">{scenario.label}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{scenario.symptoms}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feature highlights */}
            {appState === "input" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                {[
                  { icon: "🩺", label: lang === "bn" ? "ডাক্তার খুঁজুন" : "Find Doctors", sub: lang === "bn" ? "উপসর্গ থেকে বিশেষজ্ঞ" : "Symptom to specialist" },
                  { icon: "🎙️", label: lang === "bn" ? "ভয়েস ইনপুট" : "Voice Input", sub: lang === "bn" ? "বাংলায় কথা বলুন" : "Speak in Bangla" },
                  { icon: "🤖", label: lang === "bn" ? "AI বিশ্লেষণ" : "AI Analysis", sub: lang === "bn" ? "স্মার্ট ট্রায়াজ" : "Smart triage" },
                  { icon: "📍", label: lang === "bn" ? "ঢাকা কেন্দ্রিক" : "Dhaka-centric", sub: lang === "bn" ? "স্থানীয় ডাক্তার" : "Local doctors" },
                ].map((f, i) => (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm">
                    <span className="text-2xl block mb-1">{f.icon}</span>
                    <span className="font-semibold text-gray-800 text-sm block">{f.label}</span>
                    <span className="text-xs text-gray-500">{f.sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {appState === "loading" && (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full animate-shimmer" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-48 rounded animate-shimmer" />
                    <div className="h-4 w-32 rounded animate-shimmer" />
                    <div className="h-4 w-full rounded animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {appState === "results" && analysis && (
          <div className="space-y-6">
            {/* Emergency banner for high severity */}
            {analysis.severity === "high" && <EmergencyBanner lang={lang} />}

            {/* Searched symptoms */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-medium">{labels.symptoms}:</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 max-w-md truncate">
                  {symptoms}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg border-2 border-gray-200 hover:border-sky-300 hover:text-sky-600 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {labels.newSearch}
              </button>
            </div>

            {/* Analysis */}
            <AnalysisResult analysis={analysis} lang={lang} />

            {/* Doctors */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {labels.resultsTitle}
              </h2>

              {doctors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
                  {labels.noResults}
                </div>
              ) : (
                <div className="space-y-4">
                  {doctors.map((doctor, i) => (
                    <DoctorCard key={doctor.id} doctor={doctor} lang={lang} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-gray-400 border-t border-gray-100">
        <p>{labels.disclaimer}</p>
        <p className="mt-1">{labels.poweredBy}</p>
      </footer>
    </div>
  );
}
