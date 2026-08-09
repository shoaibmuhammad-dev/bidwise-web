"use client";

import { BASE_URL } from "@/lib/baseUrl";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Feedback() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      feedback: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name cannot have less than 3 characters")
        .max(25, "Name cannot have more than 25 characters")
        .required("Please enter your name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter your email address"),
      feedback: Yup.string()
        .min(10, "Enter atleast 10 characters")
        .max(1500, "Feeback cannot have more than 1500 characters")
        .required("Please enter your feedback"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        const payload = {
          name: values.name,
          email: values.email,
          feedback: values.feedback,
        };

        const response = await fetch(`${BASE_URL}/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to submit feedback.");
        }

        setSuccessMessage("Thank you! Your feedback has been submitted.");
        resetForm();
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8"
    >
      <h4 className="text-base font-semibold text-zinc-100 mb-4">
        Was this useful?
      </h4>

      <input
        type="text"
        id="name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={loading}
        placeholder="Your name"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
      />
      {formik.touched.name && formik.errors.name ? (
        <span className="text-sm text-red-400 mt-1">{formik.errors.name}</span>
      ) : null}

      <input
        type="email"
        id="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={loading}
        placeholder="Your email"
        className="w-full mt-5 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
      />
      {formik.touched.email && formik.errors.email ? (
        <span className="text-sm text-red-400 mt-1">{formik.errors.email}</span>
      ) : null}

      <div className="w-full mb-3">
        <textarea
          id="feedback"
          name="feedback"
          value={formik.values.feedback}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
          placeholder="What worked, what didn't, would you pay for this?"
          className="w-full mt-5 h-24 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none disabled:opacity-60"
        />
        {formik.touched.feedback && formik.errors.feedback ? (
          <span className="text-sm text-red-400 leading-none">
            {formik.errors.feedback}
          </span>
        ) : null}
      </div>

      {errorMessage && (
        <p className="mb-3 text-sm text-red-400">{errorMessage}</p>
      )}

      {successMessage && (
        <p className="mb-3 text-sm text-emerald-400">{successMessage}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-100 border border-zinc-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:border-zinc-600 cursor-pointer"
      >
        {loading ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}
