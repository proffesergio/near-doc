"use client";

import type { Doctor } from "@/lib/doctors";
import type { Lang } from "@/lib/localization";
import { t } from "@/lib/localization";

interface DoctorCardProps {
  doctor: Doctor;
  lang: Lang;
  index: number;
}

const avatarGradients = [
  "from-sky-400 to-blue-500",
  "from-violet-400 to-purple-500",
  "from-emerald-400 to-teal-500",
  "from-rose-400 to-pink-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-sky-500",
];

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
  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <div
      className="glass-card-strong rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 group hover:scale-[1.01]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate">{name}</h3>
          <p className="bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-transparent font-semibold text-sm">{specialty}</p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="truncate">{hospital}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-violet-50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span>{labels.chamberTime}: {chamberTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span>{labels.available}: {available}</span>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 rounded-full font-bold border border-emerald-200/50">
              ৳ {doctor.fee}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-full font-bold border border-amber-200/50">
              ★ {doctor.rating}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-sky-50 text-blue-700 rounded-full font-bold border border-blue-200/50">
              {labels.experience}: {experience}
            </span>
            <div className="flex gap-2 ml-auto">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-emerald-200/50 hover:scale-105 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {lang === "bn" ? "দিকনির্দেশ" : "Directions"}
              </a>
              <a
                href={`tel:${doctor.phone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-md shadow-blue-200/50 hover:scale-105 active:scale-95"
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
    </div>
  );
}
