"use client";
import { BASE_URL } from "@/lib/baseUrl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckEmailPage() {
  const params = useSearchParams();
  const email = params.get("email");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const resend = async () => {
    setStatus("sending");
    await fetch(`${BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus("sent");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Check your inbox</h2>
      <p>
        We sent a verification link to <strong>{email}</strong>.
      </p>
      <button onClick={resend} disabled={status === "sending"}>
        {status === "sent" ? "Email sent!" : "Resend email"}
      </button>
    </div>
  );
}
