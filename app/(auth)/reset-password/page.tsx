"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Loader2, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";
import { api } from "@/lib/axios";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

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
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setErrorMessage("");

      // Prevent requests without a valid token in the URL.
      if (!token) {
        setSubmitStatus("error");
        setErrorMessage(
          "Your password reset link is missing or invalid. Please request a new one.",
        );
        return;
      }

      setSubmitStatus("loading");

      try {
        await api.post("/auth/reset-password", {
          token,
          password: values.password,
        });

        setSubmitStatus("success");
        resetForm();

        // Redirect after the success state has been set.
        router.replace("/login");
      } catch (error: unknown) {
        setSubmitStatus("error");

        if (axios.isAxiosError(error)) {
          const status: any = error.response?.status;

          if (!error.response) {
            setErrorMessage(
              "Unable to connect to the server. Check your internet connection and try again.",
            );
          } else if (status === 400 || status === 404) {
            setErrorMessage(
              "This password reset link is invalid, expired, or has already been used. Please request a new one.",
            );
          } else if (status === 429) {
            setErrorMessage(
              "Too many attempts. Please wait a while before trying again.",
            );
          } else if (status >= 500) {
            setErrorMessage(
              "Something went wrong on our server. Please try again later.",
            );
          } else {
            setErrorMessage(
              error.response.data?.message ||
                "Failed to reset password. Please try again.",
            );
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
    },
  });

  const isLoading = submitStatus === "loading";

  // Handle missing token before rendering the password form.
  if (!token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        description="The password reset link is missing or invalid."
      >
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

            <p className="text-sm text-red-200/70">
              Please request a new password reset link to continue.
            </p>
          </div>
        </div>

        <Link
          href="/forgot-password"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-emerald-600 px-8 py-3 font-medium text-white transition-all hover:bg-emerald-500"
        >
          Request a new reset link
        </Link>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-emerald-500/80 hover:text-emerald-400 transition-colors"
          >
            Log in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set new password"
      description="Please enter your new password below"
    >
      {submitStatus === "success" && (
        <div
          className="mb-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />

          <div className="w-full">
            <h3 className="text-emerald-400 font-medium mb-1 text-sm">
              Password updated
            </h3>

            <p className="text-xs text-emerald-200/70 mb-3">
              Your password has been changed successfully. You can now log in
              using your new password.
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
          aria-live="assertive"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

          <div className="w-full">
            <h3 className="text-red-400 font-medium mb-1 text-sm">
              Update failed
            </h3>

            <p className="text-xs text-red-200/70">{errorMessage}</p>

            <Link
              href="/forgot-password"
              className="mt-3 inline-block text-xs font-medium text-emerald-400 hover:text-emerald-300"
            >
              Request a new reset link
            </Link>
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
              disabled={isLoading || formik.isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthLayout
          title="Loading..."
          description="Please wait while we load the password reset form."
        >
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
          </div>
        </AuthLayout>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
