"use client";

import { useState, useEffect, useCallback } from "react";
import type { Lang } from "@/lib/localization";

interface Med {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  streak: number;
  lastTaken: string | null;
}

interface MedsReminderProps {
  lang: Lang;
}

const STORAGE_KEY = "neardoc_meds";

function loadMeds(): Med[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveMeds(meds: Med[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
}

function requestNotificationPermission() {
  if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export default function MedsReminder({ lang }: MedsReminderProps) {
  const [meds, setMeds] = useState<Med[]>(() => {
    // Initialize meds from localStorage on first render (client-side only)
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("08:00");
  const [isClient, setIsClient] = useState(false);

  const isBn = lang === "bn";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    requestNotificationPermission();
  }, []);

  // Check for due reminders every 30 seconds
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const currentMeds = loadMeds();
      currentMeds.forEach((med) => {
        if (med.time === currentTime && !med.taken) {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification(isBn ? "ওষুধ খাওয়ার সময়!" : "Time to take your medicine!", {
              body: `${med.name} — ${med.time}`,
              icon: "/favicon.ico",
            });
          }
        }
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [isClient, isBn]);

  const handleAdd = useCallback(() => {
    if (!newName.trim()) return;
    const med: Med = {
      id: Date.now().toString(),
      name: newName.trim(),
      time: newTime,
      taken: false,
      streak: 0,
      lastTaken: null,
    };
    const updated = [...meds, med];
    setMeds(updated);
    saveMeds(updated);
    setNewName("");
    setNewTime("08:00");
  }, [newName, newTime, meds]);

  const handleToggleTaken = useCallback(
    (id: string) => {
      const today = new Date().toISOString().split("T")[0];
      const updated = meds.map((m) => {
        if (m.id !== id) return m;
        const wasTaken = m.taken;
        if (wasTaken) {
          // Undo — decrement streak
          return { ...m, taken: false, streak: Math.max(0, m.streak - 1) };
        } else {
          // Mark taken — increment streak if consecutive
          const isConsecutive =
            m.lastTaken === new Date(Date.now() - 86400000).toISOString().split("T")[0];
          const newStreak = isConsecutive ? m.streak + 1 : 1;
          return { ...m, taken: true, streak: newStreak, lastTaken: today };
        }
      });
      setMeds(updated);
      saveMeds(updated);
    },
    [meds]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const updated = meds.filter((m) => m.id !== id);
      setMeds(updated);
      saveMeds(updated);
    },
    [meds]
  );

  // Reset "taken" status at midnight
  useEffect(() => {
    if (!isClient) return;
    const checkReset = () => {
      const today = new Date().toISOString().split("T")[0];
      const currentMeds = loadMeds();
      let needsUpdate = false;
      const updated = currentMeds.map((m) => {
        if (m.taken && m.lastTaken !== today) {
          needsUpdate = true;
          return { ...m, taken: false };
        }
        return m;
      });
      if (needsUpdate) {
        setMeds(updated);
        saveMeds(updated);
      }
    };
    checkReset();
    const interval = setInterval(checkReset, 60000);
    return () => clearInterval(interval);
  }, [isClient]);

  const takenCount = meds.filter((m) => m.taken).length;
  const totalCount = meds.length;
  const maxStreak = meds.length > 0 ? Math.max(...meds.map((m) => m.streak)) : 0;

  if (!isClient) return null;

  return (
    <>
      {/* Floating pill button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-purple-400/50 hover:scale-110 transition-all flex items-center justify-center cursor-pointer group"
      >
        <svg className="w-6 h-6 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
        {totalCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-xs font-bold flex items-center justify-center animate-bounce-gentle">
            {totalCount}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">
                      {isBn ? "ওষুধের রিমাইন্ডার" : "Meds Reminder"}
                    </h2>
                    <p className="text-violet-200 text-xs">
                      {isBn ? "আপনার ওষুধ ট্র্যাক করুন" : "Track your medications"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats row */}
              {totalCount > 0 && (
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">{takenCount}/{totalCount}</div>
                    <div className="text-violet-200 text-xs">{isBn ? "আজ খেয়েছেন" : "Taken today"}</div>
                  </div>
                  <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold flex items-center justify-center gap-1">
                      {maxStreak} <span className="text-sm">🔥</span>
                    </div>
                    <div className="text-violet-200 text-xs">{isBn ? "সর্বোচ্চ স্ট্রিক" : "Best streak"}</div>
                  </div>
                  <div className="flex-1 bg-white/15 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold">
                      {totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0}%
                    </div>
                    <div className="text-violet-200 text-xs">{isBn ? "আজকের অগ্রগতি" : "Today&apos;s progress"}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Add form */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={isBn ? "ওষুধের নাম..." : "Medicine name..."}
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-sm outline-none transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                />
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-24 px-2 py-2.5 rounded-xl border-2 border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-sm outline-none transition-all"
                />
                <button
                  onClick={handleAdd}
                  disabled={!newName.trim()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            {/* Meds list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {meds.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <p className="font-medium text-gray-500">
                    {isBn ? "এখনো কোনো ওষুধ যোগ করেননি" : "No medications added yet"}
                  </p>
                  <p className="text-xs mt-1">
                    {isBn ? "উপরে ওষুধের নাম ও সময় দিন" : "Add a medicine name and time above"}
                  </p>
                </div>
              ) : (
                meds.map((med) => (
                  <div
                    key={med.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      med.taken
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-100 hover:border-violet-200"
                    }`}
                  >
                    <button
                      onClick={() => handleToggleTaken(med.id)}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                        med.taken
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 hover:border-violet-400"
                      }`}
                    >
                      {med.taken && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-sm ${med.taken ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {med.name}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>{med.time}</span>
                        {med.streak > 0 && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-600 rounded-full text-[10px] font-bold">
                            🔥 {med.streak} {isBn ? "দিন" : "days"}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(med.id)}
                      className="w-7 h-7 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
