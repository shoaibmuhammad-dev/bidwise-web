"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import { BASE_URL } from "@/lib/baseUrl";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export default function CheckEmailPage() {
  const params = useSearchParams();
  const email = params.get("email");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const router = useRouter();

  const resend = async () => {
    try {
      setStatus("sending");
      await axios.post(`${BASE_URL}/auth/resend-verification`, { email });
      setStatus("sent");
      enqueueSnackbar("Verification email sent", { variant: "success" });
    } catch (error) {
      setStatus("idle");

      if (axios.isAxiosError<{ message?: string }>(error)) {
        const message = error.response?.data?.message ?? error.message;

        enqueueSnackbar(message, { variant: "error" });

        if (message === "Email is already verified") {
          router.push("/");
        }
      } else if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    }
  };
  return (
    <AuthLayout title="" description="">
      <main className="text-center space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-5">
          Check your inbox
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed">
          We sent a verification link to <strong>{email}</strong>.
        </p>
        <button
          type="button"
          onClick={resend}
          disabled={status === "sending"}
          className=" text-sm underline"
        >
          {status === "sent" ? "Email sent!" : "Resend email"}
        </button>
      </main>
    </AuthLayout>
  );
}
