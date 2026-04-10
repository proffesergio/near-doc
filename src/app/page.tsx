"use client";

import { useState, useCallback } from "react";
import type { Lang } from "@/lib/localization";
import { t } from "@/lib/localization";
import type { Doctor } from "@/lib/doctors";
import VoiceInput from "@/components/VoiceInput";
import DoctorCard from "@/components/DoctorCard";
import AnalysisResult from "@/components/AnalysisResult";
import EmergencyBanner from "@/components/EmergencyBanner";
import MedsReminder from "@/components/MedsReminder";

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
    { label: "Chest pain emergency", symptoms: "I have severe chest pain and difficulty breathing since this morning", icon: "🫀", color: "from-red-500 to-rose-600" },
    { label: "Child with fever", symptoms: "My 3 year old child has high fever and diarrhea for 2 days", icon: "👶", color: "from-amber-500 to-orange-600" },
    { label: "Mental health", symptoms: "I have been feeling very anxious and can't sleep for weeks", icon: "🧠", color: "from-violet-500 to-purple-600" },
    { label: "Eye problem", symptoms: "My vision is getting blurry and I have eye pain", icon: "👁️", color: "from-cyan-500 to-teal-600" },
  ],
  bn: [
    { label: "বুকে ব্যথা জরুরি", symptoms: "সকাল থেকে বুকে তীব্র ব্যথা এবং শ্বাসকষ্ট হচ্ছে", icon: "🫀", color: "from-red-500 to-rose-600" },
    { label: "শিশুর জ্বর", symptoms: "আমার ৩ বছরের বাচ্চার ২ দিন ধরে তীব্র জ্বর ও পাতলা পায়খানা", icon: "👶", color: "from-amber-500 to-orange-600" },
    { label: "মানসিক স্বাস্থ্য", symptoms: "কয়েক সপ্তাহ ধরে খুব দুশ্চিন্তা হচ্ছে এবং ঘুম হচ্ছে না", icon: "🧠", color: "from-violet-500 to-purple-600" },
    { label: "চোখের সমস্যা", symptoms: "চোখে ঝাপসা দেখছি এবং চোখে ব্যথা হচ্ছে", icon: "👁️", color: "from-cyan-500 to-teal-600" },
  ],
};

const howItWorks = {
  en: [
    { step: "1", title: "Describe Symptoms", desc: "Type or speak your symptoms in Bangla or English", icon: "✍️", gradient: "from-sky-400 to-blue-500" },
    { step: "2", title: "AI Analyzes", desc: "Our system identifies the right medical department", icon: "🔬", gradient: "from-violet-400 to-purple-500" },
    { step: "3", title: "Find Your Doctor", desc: "Get matched with specialists in Dhaka with clinic details", icon: "🩺", gradient: "from-emerald-400 to-teal-500" },
  ],
  bn: [
    { step: "১", title: "উপসর্গ বর্ণনা করুন", desc: "বাংলায় বা ইংরেজিতে আপনার উপসর্গ টাইপ করুন বা বলুন", icon: "✍️", gradient: "from-sky-400 to-blue-500" },
    { step: "২", title: "AI বিশ্লেষণ", desc: "আমাদের সিস্টেম সঠিক চিকিৎসা বিভাগ চিহ্নিত করে", icon: "🔬", gradient: "from-violet-400 to-purple-500" },
    { step: "৩", title: "ডাক্তার খুঁজুন", desc: "ঢাকায় ক্লিনিকের বিস্তারিত সহ বিশেষজ্ঞ ডাক্তার পান", icon: "🩺", gradient: "from-emerald-400 to-teal-500" },
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
      <header className="sticky top-0 z-50 glass-card-strong border-b border-white/30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-violet-500 flex items-center justify-center shadow-md shadow-blue-200/50 animate-gradient-x">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
              {labels.appName}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "bn" : "en")}
            className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-violet-50 to-sky-50 border border-violet-200/50 text-violet-700 hover:from-violet-100 hover:to-sky-100 hover:border-violet-300 transition-all cursor-pointer hover-wiggle"
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
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-violet-100 text-sm font-semibold text-violet-700 mb-4 animate-scale-in">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {lang === "bn" ? "AI দ্বারা চালিত স্বাস্থ্য সেবা" : "AI-Powered Health Assistant"}
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {lang === "bn" ? "আপনার " : "Your "}
                </span>
                <span className="bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent animate-gradient-x">
                  {lang === "bn" ? "AI স্বাস্থ্য সহযোগী" : "AI Health Companion"}
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  {lang === "bn" ? "ঢাকার জন্য" : "for Dhaka"}
                </span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                {labels.subtitle}
              </p>
            </div>

            {/* Input area */}
            <div className="glass-card-strong rounded-3xl shadow-lg glow-sky p-5 sm:p-7">
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder={labels.inputPlaceholder}
                rows={4}
                className="w-full resize-none rounded-2xl border-2 border-gray-200/80 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 p-4 text-gray-800 placeholder:text-gray-400 outline-none transition-all text-base bg-white/60"
                disabled={appState === "loading"}
              />

              {/* Quick symptom chips */}
              <div className="flex flex-wrap gap-2 mt-3 stagger-children">
                {quickSymptoms[lang].map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => setSymptoms(symptom)}
                    disabled={appState === "loading"}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-full border border-gray-200/80 bg-white/60 text-gray-600 hover:bg-gradient-to-r hover:from-sky-50 hover:to-violet-50 hover:border-violet-300 hover:text-violet-700 transition-all cursor-pointer disabled:opacity-50 hover-wiggle"
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <VoiceInput
                  lang={lang}
                  onTranscript={handleVoiceTranscript}
                  labels={{ voiceBtn: labels.voiceBtn, listening: labels.listening }}
                />

                <button
                  onClick={() => handleAnalyze()}
                  disabled={appState === "loading" || symptoms.trim().length < 3}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 hover:from-sky-600 hover:via-blue-600 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 cursor-pointer animate-gradient-x hover:scale-[1.02] active:scale-[0.98]"
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
                <div className="mt-4 p-4 bg-red-50/80 border border-red-200 rounded-xl text-red-700 text-sm animate-scale-in flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {errorMsg || labels.errorMsg}
                </div>
              )}
            </div>

            {/* How it Works */}
            {appState === "input" && (
              <div className="mt-12">
                <h2 className="text-center text-xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {lang === "bn" ? "কিভাবে কাজ করে" : "How It Works"}
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {howItWorks[lang].map((item, i) => (
                    <div key={i} className="relative glass-card rounded-2xl shadow-md p-6 text-center group hover:scale-[1.03] transition-transform duration-300">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1 text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                      {i < 2 && (
                        <div className="hidden sm:block absolute top-1/2 -right-3.5 transform -translate-y-1/2 text-violet-300 text-2xl z-10 font-bold">
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
              <div className="mt-10">
                <h2 className="text-center text-xl font-bold mb-5">
                  <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {lang === "bn" ? "দ্রুত পরীক্ষা করুন" : "Try a Demo Scenario"}
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
                  {demoScenarios[lang].map((scenario, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnalyze(scenario.symptoms)}
                      className="flex items-center gap-4 glass-card rounded-2xl shadow-md p-5 text-left hover:shadow-lg transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scenario.color} text-white text-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        {scenario.icon}
                      </div>
                      <div>
                        <span className="font-bold text-gray-800 block">{scenario.label}</span>
                        <span className="text-xs text-gray-400 line-clamp-1">{scenario.symptoms}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feature highlights */}
            {appState === "input" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 stagger-children">
                {[
                  { icon: "🩺", label: lang === "bn" ? "ডাক্তার খুঁজুন" : "Find Doctors", sub: lang === "bn" ? "উপসর্গ থেকে বিশেষজ্ঞ" : "Symptom to specialist", gradient: "from-sky-400 to-blue-500" },
                  { icon: "🎙️", label: lang === "bn" ? "ভয়েস ইনপুট" : "Voice Input", sub: lang === "bn" ? "বাংলায় কথা বলুন" : "Speak in Bangla", gradient: "from-rose-400 to-pink-500" },
                  { icon: "🤖", label: lang === "bn" ? "AI বিশ্লেষণ" : "AI Analysis", sub: lang === "bn" ? "স্মার্ট ট্রায়াজ" : "Smart triage", gradient: "from-violet-400 to-purple-500" },
                  { icon: "📍", label: lang === "bn" ? "ঢাকা কেন্দ্রিক" : "Dhaka-centric", sub: lang === "bn" ? "স্থানীয় ডাক্তার" : "Local doctors", gradient: "from-emerald-400 to-teal-500" },
                ].map((f, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 text-center shadow-md group hover:scale-105 transition-all duration-300 hover-wiggle">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} mx-auto mb-3 flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                      {f.icon}
                    </div>
                    <span className="font-bold text-gray-800 text-sm block">{f.label}</span>
                    <span className="text-xs text-gray-500">{f.sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Loading skeleton */}
        {appState === "loading" && (
          <div className="mt-8 space-y-4 stagger-children">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card rounded-2xl p-5 shadow-md">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full animate-shimmer" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-48 rounded-lg animate-shimmer" />
                    <div className="h-4 w-32 rounded-lg animate-shimmer" />
                    <div className="h-4 w-full rounded-lg animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {appState === "results" && analysis && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Emergency banner for high severity */}
            {analysis.severity === "high" && <EmergencyBanner lang={lang} />}

            {/* Searched symptoms */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-semibold">{labels.symptoms}:</span>
                <span className="bg-gradient-to-r from-sky-50 to-violet-50 border border-violet-200/50 px-4 py-1.5 rounded-full text-violet-700 font-medium max-w-md truncate">
                  {symptoms}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl glass-card border border-gray-200/50 hover:border-violet-300 hover:text-violet-600 transition-all cursor-pointer hover:scale-105 active:scale-95"
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-md">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {labels.resultsTitle}
              </h2>

              {doctors.length === 0 ? (
                <div className="glass-card rounded-2xl shadow-md p-8 text-center text-gray-500">
                  {labels.noResults}
                </div>
              ) : (
                <div className="space-y-4 stagger-children">
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
      <footer className="text-center py-5 text-xs border-t border-white/30 glass-card">
        <p className="text-gray-500">{labels.disclaimer}</p>
        <p className="mt-1.5 font-semibold bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent">
          {labels.poweredBy}
        </p>
      </footer>

      {/* Meds Reminder FAB */}
      <MedsReminder lang={lang} />
    </div>
  );
}
