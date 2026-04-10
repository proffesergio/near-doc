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
    low: { color: "bg-green-100 text-green-800 border-green-200", label: lang === "bn" ? "কম" : "Low" },
    medium: { color: "bg-amber-100 text-amber-800 border-amber-200", label: lang === "bn" ? "মাঝারি" : "Medium" },
    high: { color: "bg-red-100 text-red-800 border-red-200", label: lang === "bn" ? "উচ্চ" : "High" },
  };

  const severity = severityConfig[analysis.severity] || severityConfig.low;

  return (
    <div className="animate-fade-in-up space-y-4">
      {/* Warning banner */}
      {analysis.warning && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <p className="text-red-800 font-medium">{analysis.warning}</p>
        </div>
      )}

      {/* Summary + Department */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {labels.departmentLabel}
          </span>
          <span className="px-3 py-1 bg-sky-100 text-sky-800 rounded-full font-bold text-sm">
            {analysis.departmentName}
          </span>
          <span className={`px-3 py-1 rounded-full font-medium text-sm border ${severity.color}`}>
            {lang === "bn" ? "তীব্রতা" : "Severity"}: {severity.label}
          </span>
        </div>
        <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
      </div>

      {/* Treatment advice */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {labels.treatmentTitle}
        </h3>
        <ul className="space-y-2">
          {(Array.isArray(analysis.treatmentAdvice) ? analysis.treatmentAdvice : [analysis.treatmentAdvice]).map(
            (advice, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="mt-1 w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                <span>{typeof advice === "string" ? advice : String(advice)}</span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        {labels.disclaimer}
      </div>
    </div>
  );
}
