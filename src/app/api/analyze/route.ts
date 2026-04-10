import { NextRequest, NextResponse } from "next/server";
import { findDoctorsByDepartment } from "@/lib/doctors";
import { analyzeSymptoms } from "@/lib/triage";
import type { Lang } from "@/lib/localization";

export async function POST(req: NextRequest) {
  try {
    const { symptoms, lang } = await req.json();

    if (!symptoms || typeof symptoms !== "string" || symptoms.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a valid symptom description" },
        { status: 400 }
      );
    }

    const analysis = analyzeSymptoms(symptoms.trim(), (lang as Lang) || "en");
    const matchedDoctors = findDoctorsByDepartment(analysis.department);

    return NextResponse.json({
      analysis,
      doctors: matchedDoctors,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze symptoms. Please try again." },
      { status: 500 }
    );
  }
}
