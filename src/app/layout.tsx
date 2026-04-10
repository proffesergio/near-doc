import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NearDoc — AI Health Companion for Dhaka",
  description:
    "Describe your symptoms and find the right doctor in Dhaka. AI-powered symptom analysis with bilingual support in Bangla and English.",
  keywords: ["doctor finder", "Dhaka", "health", "AI", "symptom checker", "Bangladesh"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col mesh-bg relative overflow-x-hidden">
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="floating-orb" />
          <div className="floating-orb" />
          <div className="floating-orb" />
        </div>
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
