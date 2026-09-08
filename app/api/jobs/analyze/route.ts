import { NextRequest, NextResponse } from "next/server";
import { analyzeJob } from "@/services/job.service";
import { getDb } from "@/lib/mongodb";
import { JobAnalysisDocument } from "@/models/JobAnalysis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      jobDescription,
      hourlyRate,
      experience,
      aiUsage,
      userProfileDescription,
    } = body;

    if (!jobDescription) {
      return NextResponse.json(
        { success: false, message: "Job description is required." },
        { status: 400 },
      );
    }

    if (!userProfileDescription) {
      return NextResponse.json(
        {
          success: false,
          message: "Personal profile description is required.",
        },
        { status: 400 },
      );
    }

    const analysis = await analyzeJob({
      jobDescription,
      hourlyRate,
      experience,
      aiUsage,
      userProfileDescription,
    });

    // Save to MongoDB
    const db = await getDb();
    const doc: JobAnalysisDocument = {
      ...analysis,
      jobDescription,
      hourlyRate,
      experience,
      aiUsage,
      userProfileDescription,
      createdAt: new Date(),
    };
    await db.collection<JobAnalysisDocument>("jobAnalyses").insertOne(doc);

    return NextResponse.json({ success: true, data: analysis });
  } catch (error: any) {
    console.error("analyzeJob error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to analyze job description.",
      },
      { status: 500 },
    );
  }
}
