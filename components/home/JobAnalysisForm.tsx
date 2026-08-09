"use client";

import { useState } from "react";
import { motion } from "motion/react";

import FormLabel from "./form/FormLabel";
import TextArea from "./form/TextArea";
import TextInput from "./form/TextInput";
import SelectInput from "./form/SelectInput";
import SubmitButtons from "./form/SubmitButtons";
import ResultSection from "./result/ResultSection";
import { BASE_URL } from "@/lib/baseUrl";
import { AnalysisResult, FormData } from "@/types/types";

export default function JobAnalysisForm() {
  const [formData, setFormData] = useState<FormData>({
    jobDescription: "",
    aiUsage: "sometimes",
    contractType: "fixed-price",
    budget: "",
    hourlyRate: "",
    proposals: "",
    competingBids: "",
    clientHistory: "",
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | any>("");

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnalyze = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);
      setErrorMessage("");

      const response = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setErrorMessage("An unknown error occurred");
        throw new Error("Failed to analyze job.");
      }

      const result = await response.json();

      setAnalysisResult(result.data);
    } catch (error) {
      // console.log("ERROR >>> ", error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="w-full bg-red-900/20 border border-red-900/50 text-red-500 rounded-2xl p-6 md:p-8 shadow-2xl relative backdrop-blur-xl mb-8">
          {errorMessage}
        </div>
      )}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleAnalyze}
        className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl relative"
      >
        {/* Job Description */}
        <div className="mb-6">
          <FormLabel>Job Title + Description</FormLabel>

          <TextArea
            value={formData.jobDescription}
            onChange={(e) => handleChange("jobDescription", e.target.value)}
            placeholder="Paste the job TITLE and the full description here — but not the budget or the sidebar figures, those go in their own fields below."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <FormLabel>How much do you use AI?</FormLabel>

            <SelectInput
              value={formData.aiUsage}
              onChange={(e) => handleChange("aiUsage", e.target.value)}
              options={[
                { label: "Sometimes", value: "sometimes" },
                { label: "Often", value: "often" },
                { label: "Always", value: "always" },
              ]}
            />
          </div>

          <div>
            <FormLabel>Contract Type</FormLabel>

            <SelectInput
              value={formData.contractType}
              onChange={(e) => handleChange("contractType", e.target.value)}
              options={[
                { label: "Fixed price", value: "fixed-price" },
                { label: "Hourly", value: "hourly" },
              ]}
            />
          </div>

          <div>
            <FormLabel>Budget / Client Rate</FormLabel>

            <TextInput
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              type="text"
              placeholder="Range as shown, e.g. 15-25"
              helperText="Enter it exactly as the job shows it — a range like 15-25 for hourly, or a single amount like 800 for fixed."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div>
              <FormLabel>Your Rate (USD/HR)</FormLabel>

              <TextInput
                value={formData.hourlyRate}
                onChange={(e) => handleChange("hourlyRate", e.target.value)}
                type="text"
                placeholder="e.g. 50"
              />
            </div>

            <div>
              <FormLabel>Proposals</FormLabel>

              <TextInput
                value={formData.proposals}
                onChange={(e) => handleChange("proposals", e.target.value)}
                type="text"
                placeholder="From the sidebar, e.g. 20 to 50"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <FormLabel>Competing Bids</FormLabel>

              <TextInput
                value={formData.competingBids}
                onChange={(e) => handleChange("competingBids", e.target.value)}
                type="text"
                placeholder="From sidebar: avg $17.95, low $3, high $25"
              />
            </div>

            <div>
              <FormLabel>Client History</FormLabel>

              <TextInput
                value={formData.clientHistory}
                onChange={(e) => handleChange("clientHistory", e.target.value)}
                type="text"
                placeholder="From sidebar: unverified, $0 spent, 0% hire rate"
              />
            </div>
          </div>
        </div>

        <SubmitButtons isAnalyzing={isAnalyzing} />
      </motion.form>

      {analysisResult && <ResultSection result={analysisResult} />}
    </>
  );
}
