"use client";

import type { Lang } from "@/lib/localization";

interface EmergencyBannerProps {
  lang: Lang;
}

export default function EmergencyBanner({ lang }: EmergencyBannerProps) {
  const isBn = lang === "bn";

  return (
    <div className="animate-scale-in bg-gradient-to-r from-red-600 via-red-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl shadow-red-300/30 relative overflow-hidden">
      {/* Pulsing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 animate-emergency-pulse rounded-2xl" />

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-pulse" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-3xl animate-bounce-gentle">
            🚨
          </div>
          <div>
            <h3 className="text-xl font-extrabold">
              {isBn ? "জরুরি অবস্থা শনাক্ত হয়েছে" : "Emergency Detected"}
            </h3>
            <p className="text-red-200 text-sm">
              {isBn
                ? "অনুগ্রহ করে এখনই জরুরি সেবায় যোগাযোগ করুন"
                : "Please contact emergency services immediately"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <a
            href="tel:999"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl font-extrabold text-sm hover:bg-red-50 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {isBn ? "৯৯৯ কল করুন" : "Call 999"}
          </a>
          <a
            href="tel:16789"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white rounded-xl font-bold text-sm hover:bg-white/25 transition-all border border-white/30 hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {isBn ? "অ্যাম্বুলেন্স (১৬৭৮৯)" : "Ambulance (16789)"}
          </a>
          <a
            href="tel:10666"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white rounded-xl font-bold text-sm hover:bg-white/25 transition-all border border-white/30 hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {isBn ? "স্বাস্থ্য হেল্পলাইন (১০৬৬৬)" : "Health Helpline (10666)"}
          </a>
        </div>
      </div>
    </div>
  );
}
