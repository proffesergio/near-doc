"use client";

import type { Doctor } from "@/lib/doctors";
import type { Lang } from "@/lib/localization";
import { t } from "@/lib/localization";

interface DoctorCardProps {
  doctor: Doctor;
  lang: Lang;
  index: number;
}

export default function DoctorCard({ doctor, lang, index }: DoctorCardProps) {
  const labels = t[lang];

  const name = lang === "bn" ? doctor.nameBn : doctor.name;
  const specialty = lang === "bn" ? doctor.specialtyBn : doctor.specialty;
  const hospital = lang === "bn" ? doctor.hospitalBn : doctor.hospital;
  const location = lang === "bn" ? doctor.locationBn : doctor.location;
  const available = lang === "bn" ? doctor.availableBn : doctor.available;
  const experience = lang === "bn" ? doctor.experienceBn : doctor.experience;
  const chamberTime = lang === "bn" ? doctor.chamberTimeBn : doctor.chamberTime;

  const mapsQuery = encodeURIComponent(`${doctor.hospital}, ${doctor.location}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div
      className="animate-fade-in-up bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
          <p className="text-sky-600 font-medium text-sm">{specialty}</p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="truncate">{hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{labels.chamberTime}: {chamberTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{labels.available}: {available}</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full font-medium">
              ৳ {doctor.fee}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">
              ★ {doctor.rating}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
              {labels.experience}: {experience}
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-full font-medium hover:bg-emerald-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {lang === "bn" ? "দিকনির্দেশ" : "Directions"}
            </a>
            <a
              href={`tel:${doctor.phone}`}
              className="inline-flex items-center gap-1 px-3 py-1 bg-sky-500 text-white rounded-full font-medium hover:bg-sky-600 transition-colors ml-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {labels.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
