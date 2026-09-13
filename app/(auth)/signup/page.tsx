"use client";

import { useState } from "react";
import Link from "next/link";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { Loader2, UserPlus, AlertCircle } from "lucide-react";
import AuthLayout from "@/components/layout/AuthLayout";
import InputField from "@/components/common/InputField";
import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain at least 8 characters")
        .max(128, "Password cannot be more than 128 characters"),
    }),

    onSubmit: async (values) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        const res = await axios.post(`${BASE_URL}/auth/signup`, values);

        console.log(res);
        setSubmitStatus("idle");
        router.push(`/check-email?email=${encodeURIComponent(values.email)}`);
        // TODO: redirect / show success state here
      } catch (error) {
        console.log("Signup error >>> ", error);

        setSubmitStatus("error");

        if (axios.isAxiosError(error)) {
          setErrorMessage(
            error.response?.data?.message ||
              "Failed to sign up. Please try again.",
          );
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      }
    },
  });

  return (
    <AuthLayout
      title="Create an account"
      description="Join us to start analyzing job posts"
    >
      {submitStatus === "error" && (
        <div
          className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-medium mb-1 text-sm">
              Registration failed
            </h3>
            <p className="text-xs text-red-200/70">{errorMessage}</p>
          </div>
        </div>
      )}

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <InputField
            label="Full Name"
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
          />

          <InputField
            label="Email Address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />

          <InputField
            label="Password"
            id="password"
            name="password"
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
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Sign up
              </>
            )}
          </button>
        </form>
      </FormikProvider>

      <div className="mt-6 text-center text-sm text-zinc-400">
        Already have an account?{" "}
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
