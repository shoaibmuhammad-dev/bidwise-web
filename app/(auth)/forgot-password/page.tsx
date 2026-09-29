"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import axios from "axios";

import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";
import { api } from "@/lib/axios";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ForgotPasswordPage() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        await api.post("/auth/forgot-password", {
          email: values.email.trim().toLowerCase(),
        });

        setSubmitStatus("success");
        resetForm();
      } catch (error: unknown) {
        setSubmitStatus("error");

        if (axios.isAxiosError(error)) {
          const status: any = error.response?.status;

          if (!error.response) {
            setErrorMessage(
              "Unable to connect to the server. Check your internet connection and try again.",
            );
          } else if (status === 429) {
            setErrorMessage(
              "Too many requests. Please wait a while before trying again.",
            );
          } else if (status >= 500) {
            setErrorMessage(
              "Something went wrong on our server. Please try again later.",
            );
          } else {
            setErrorMessage(
              error.response.data?.message ||
                "Failed to send reset link. Please try again.",
            );
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  const isLoading = submitStatus === "loading";

  return (
    <AuthLayout
      title="Reset password"
      description="Enter your email and we'll send you a reset link"
    >
      {submitStatus === "success" && (
        <div
          className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />

          <div>
            <h3 className="text-emerald-400 font-medium mb-1 text-sm">
              Check your email
            </h3>

            <p className="text-xs text-emerald-200/70">
              If an account exists with this email, a password reset link has
              been sent. Please check your inbox and spam folder.
            </p>

            <button
              type="button"
              onClick={() => setSubmitStatus("idle")}
              className="mt-3 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Try another email
            </button>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div
          className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          role="alert"
          aria-live="assertive"
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
            disabled={isLoading || formik.isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
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
