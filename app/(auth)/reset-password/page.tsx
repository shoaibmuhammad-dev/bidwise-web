"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Loader2, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";

export default function ResetPasswordPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay

        setSubmitStatus("success");
        resetForm();
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage("Failed to reset password. The link might be expired.");
      }
    },
  });

  return (
    <AuthLayout
      title="Set new password"
      description="Please enter your new password below"
    >
      {submitStatus === "success" && (
        <div
          className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3"
          role="status"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="w-full">
            <h3 className="text-emerald-400 font-medium mb-1 text-sm">
              Password updated
            </h3>
            <p className="text-xs text-emerald-200/70 mb-3">
              Your password has been changed successfully.
            </p>
            <Link
              href="/login"
              className="inline-flex w-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all items-center justify-center"
            >
              Go to log in
            </Link>
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
              Update failed
            </h3>
            <p className="text-xs text-red-200/70">{errorMessage}</p>
          </div>
        </div>
      )}

      {submitStatus !== "success" && (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputField
              label="New Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />

            <InputField
              label="Confirm New Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
            />

            <button
              type="submit"
              disabled={submitStatus === "loading"}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {submitStatus === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  Reset Password
                </>
              )}
            </button>
          </form>
        </FormikProvider>
      )}

      {submitStatus !== "success" && (
        <div className="mt-6 text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-emerald-500/80 hover:text-emerald-400 transition-colors font-medium"
          >
            Log in
          </Link>
        </div>
      )}
    </AuthLayout>
  );
}
