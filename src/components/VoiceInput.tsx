"use client";

import { useState, useRef, useCallback } from "react";
import type { Lang } from "@/lib/localization";

interface VoiceInputProps {
  lang: Lang;
  onTranscript: (text: string) => void;
  labels: {
    voiceBtn: string;
    listening: string;
  };
}

export default function VoiceInput({ lang, onTranscript, labels }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const toggleListening = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice input is not supported in this browser. Please use Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = lang === "bn" ? "bn-BD" : "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isListening, lang, onTranscript]);

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
        isListening
          ? "bg-red-500 text-white shadow-lg shadow-red-200"
          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-primary hover:text-primary"
      }`}
    >
      {isListening && (
        <span className="absolute inset-0 rounded-xl bg-red-400 animate-pulse-ring" />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 relative z-10"
      >
        <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2Z" />
      </svg>
      <span className="relative z-10">
        {isListening ? labels.listening : labels.voiceBtn}
      </span>
    </button>
  );
}
