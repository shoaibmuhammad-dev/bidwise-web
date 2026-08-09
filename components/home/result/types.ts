export interface AnalysisResult {
  overallScore: number;
  decision: string;
  summary: string;
  estimatedHours: {
    minimum: number;
    maximum: number;
  };
  aiHours: {
    minimum: number;
    maximum: number;
  };
  redFlags: string[];
  strengths: string[];
  aiCanDo: string[];
  humanShouldDo: string[];
  jobValue?: number;
  hourlyRate?: number;
  hoursNote?: string;
  bidAdvice?: {
    suggestedBidHourly: number;
    lowestWorthwhileHourly: number;
    note?: string;
  };
  subscores?: {
    label: string;
    score: number;
    text: string;
  }[];
}
