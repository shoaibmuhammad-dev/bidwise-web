"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";

export default function LoginPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // fake delay
        // Simulate error for demo purposes
        setSubmitStatus("error");
        setErrorMessage("Invalid email or password.");
      } catch (error) {
        setSubmitStatus("error");
        setErrorMessage("Failed to log in. Please try again later.");
      }
    },
  });

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to your account to continue"
    >
      {submitStatus === "error" && (
        <div
          className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-medium mb-1 text-sm">
              Authentication failed
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

          <div>
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
            <div className="mt-2 text-right">
              <Link
                href="/forgot-password"
                className="text-xs text-emerald-500/80 hover:text-emerald-400 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitStatus === "loading"}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group cursor-pointer"
          >
            {submitStatus === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Log in
              </>
            )}
          </button>
        </form>
      </FormikProvider>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-emerald-500/80 hover:text-emerald-400 transition-colors font-medium"
        >
          Sign up
        </Link>
      </div>
    </AuthLayout>
  );
}
