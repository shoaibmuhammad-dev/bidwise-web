"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, Send } from "lucide-react";
import PageHeader from "./ContactHeader";
import { BASE_URL } from "@/lib/baseUrl";
import Success from "./Success";
import Error from "./Error";
import Footer from "../home/Footer";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required"),

      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),

      message: Yup.string()
        .trim()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setSubmitStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(`/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new globalThis.Error(
            data.message || "Failed to send message. Please try again later.",
          );
        }

        setSubmitStatus("success");
        resetForm();

        setTimeout(() => {
          setSubmitStatus("idle");
        }, 5000);
      } catch (error) {
        console.error("Contact form submission error:", error);

        setSubmitStatus("error");

        setErrorMessage(
          error instanceof globalThis.Error
            ? error?.message
            : "Failed to send message. Please try again later.",
        );
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background ambient light */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 md:py-20 z-10 relative">
        <PageHeader
          title="Contact Us"
          description="Have questions about bidwise or need support? Fill out the form below and we'll get back to you as soon as possible."
        />

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
          {/* Success Message */}
          {submitStatus === "success" && <Success />}

          {/* Error Message */}
          {submitStatus === "error" && <Error errorMessage={errorMessage} />}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  // name="name"
                  type="text"
                  autoComplete="name"
                  disabled={submitStatus === "loading"}
                  className={`w-full bg-zinc-950 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/50"
                  } rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="John Doe"
                  {...formik.getFieldProps("name")}
                />

                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-400 text-xs mt-2">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  // name="email"
                  type="email"
                  autoComplete="email"
                  disabled={submitStatus === "loading"}
                  className={`w-full bg-zinc-950 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/50"
                  } rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  placeholder="john@example.com"
                  {...formik.getFieldProps("email")}
                />

                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-400 text-xs mt-2">
                    {formik.errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-zinc-400 uppercase tracking-widest mb-3"
              >
                Message
              </label>

              <textarea
                id="message"
                // name="message"
                rows={5}
                disabled={submitStatus === "loading"}
                className={`w-full bg-zinc-950 border ${
                  formik.touched.message && formik.errors.message
                    ? "border-red-500/50 focus:ring-red-500/50"
                    : "border-zinc-800 focus:border-emerald-500/50 focus:ring-emerald-500/50"
                } rounded-xl p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
                placeholder="How can we help you?"
                {...formik.getFieldProps("message")}
              />

              {formik.touched.message && formik.errors.message && (
                <div className="text-red-400 text-xs mt-2">
                  {formik.errors.message}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-70 disabled:cursor-not-allowed group w-full sm:w-auto cursor-pointer"
              >
                {submitStatus === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
