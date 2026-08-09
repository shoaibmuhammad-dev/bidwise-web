export type FormData = {
  jobDescription: string;
  aiUsage: string;
  contractType: string;
  budget: string;
  hourlyRate: string;
  proposals: string;
  competingBids: string;
  clientHistory: string;
};

export interface HourRange {
  minimum: number;
  maximum: number;
}

export type Decision = "Apply" | "Pass" | "Review Closely";

export interface AnalysisResult {
  overallScore: number;
  decision: Decision;
  summary: string;
  estimatedHours: HourRange;
  aiHours: HourRange;
  redFlags: string[];
  strengths: string[];
  aiCanDo: string[];
  humanShouldDo: string[];
}

export interface AnalyzeJobParams {
  jobDescription: string;
  hourlyRate?: string | number;
  experience?: string;
  aiUsage?: string;
}
