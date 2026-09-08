import { ObjectId } from "mongodb";
import { JobAnalysisResult } from "@/types/job";

export interface JobAnalysisDocument extends JobAnalysisResult {
  _id?: ObjectId;
  jobDescription: string;
  hourlyRate: number;
  experience?: string;
  aiUsage?: string;
  userProfileDescription: string;
  createdAt: Date;
}
