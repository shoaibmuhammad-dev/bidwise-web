export interface EstimateRange {
  minimum: number;
  maximum: number;
}

export interface JobAnalysisResult {
  overallScore: number;
  decision: "Apply" | "Pass" | "Review Closely" | "Skip";
  bidAdvice: string;
  summary: string;
  estimatedHours: EstimateRange;
  aiHours: EstimateRange;
  redFlags: string[];
  strengths: string[];
  aiCanDo: string[];
  humanShouldDo: string[];
}

export interface AnalyzeJobInput {
  jobDescription: string;
  hourlyRate: number;
  experience?: string;
  aiUsage?: string;
  userProfileDescription: string;
}
