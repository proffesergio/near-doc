"use client";

import type { Lang } from "@/lib/localization";
import { t } from "@/lib/localization";

interface Analysis {
  department: string;
  departmentName: string;
  severity: "low" | "medium" | "high";
  treatmentAdvice: string[];
  warning: string;
  summary: string;
}

interface AnalysisResultProps {
  analysis: Analysis;
  lang: Lang;
}

export default function AnalysisResult({ analysis, lang }: AnalysisResultProps) {
  const labels = t[lang];

  const severityConfig = {
    low: { gradient: "from-green-400 to-emerald-500", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: lang === "bn" ? "কম" : "Low" },
    medium: { gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: lang === "bn" ? "মাঝারি" : "Medium" },
    high: { gradient: "from-red-400 to-rose-500", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: lang === "bn" ? "উচ্চ" : "High" },
  };

  const severity = severityConfig[analysis.severity] || severityConfig.low;

  return (
    <div className="space-y-4">
      {/* Warning banner */}
      {analysis.warning && (
        <div className="animate-scale-in bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-5 flex items-start gap-3 text-white shadow-lg shadow-red-200/50">
          <span className="text-3xl">🚨</span>
          <p className="font-semibold">{analysis.warning}</p>
        </div>
      )}

      {/* Summary + Department */}
      <div className="glass-card-strong rounded-2xl shadow-md p-6 animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {labels.departmentLabel}
          </span>
          <span className="px-4 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-full font-bold text-sm shadow-md">
            {analysis.departmentName}
          </span>
          <span className={`px-4 py-1.5 bg-gradient-to-r ${severity.gradient} text-white rounded-full font-bold text-sm shadow-md`}>
            {lang === "bn" ? "তীব্রতা" : "Severity"}: {severity.label}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed text-base">{analysis.summary}</p>
      </div>

      {/* Treatment advice */}
      <div className="glass-card-strong rounded-2xl shadow-md p-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {labels.treatmentTitle}
        </h3>
        <ul className="space-y-3 stagger-children">
          {(Array.isArray(analysis.treatmentAdvice) ? analysis.treatmentAdvice : [analysis.treatmentAdvice]).map(
            (advice, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-gradient-to-br from-sky-100 to-violet-100 flex items-center justify-center shrink-0 text-xs font-bold text-violet-600">
                  {i + 1}
                </div>
                <span>{typeof advice === "string" ? advice : String(advice)}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="glass-card rounded-2xl p-4 text-sm flex items-start gap-3 border border-amber-200/50 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <span className="text-xl">⚠️</span>
        <p className="text-amber-800">{labels.disclaimer}</p>
      </div>
    </div>
  );
}
