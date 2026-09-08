"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay

        setSubmitStatus("success");
        resetForm();
        router.push("/reset-password");
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage("Failed to send reset link. Please try again later.");
      }
    },
  });

  return (
    <AuthLayout
      title="Reset password"
      description="Enter your email and we'll send you a reset link"
    >
      {submitStatus === "success" && (
        <div
          className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-emerald-400 font-medium mb-1 text-sm">
              Check your email
            </h3>
            <p className="text-xs text-emerald-200/70">
              We've sent a password reset link to your email address.
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-medium mb-1 text-sm">
              Request failed
            </h3>
            <p className="text-xs text-red-200/70">{errorMessage}</p>
          </div>
        </div>
      )}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />

          <button
            type="submit"
            disabled={submitStatus === "loading" || submitStatus === "success"}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
          >
            {submitStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Send reset link
              </>
            )}
          </button>
        </form>
      </FormikProvider>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Remember your password?{" "}
        <Link
          href="/login"
          className="text-emerald-500/80 hover:text-emerald-400 transition-colors font-medium"
        >
          Log in
        </Link>
      </div>
    </AuthLayout>
  );
}
