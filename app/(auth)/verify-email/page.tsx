// app/verify-email/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/baseUrl";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const email = params.get("email");
    const token = params.get("token");

    if (!email || !token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    fetch(
      `${BASE_URL}/auth/verify-email?email=${encodeURIComponent(email)}&token=${token}`,
      { method: "GET", credentials: "include" },
    )
      .then(async (res) => {
        const body = await res.json();
        if (res.ok) {
          router.push("/");
        } else {
          setStatus("error");
          setMessage(body.message);
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      });
  }, [params, router]);

  if (status === "loading") return <p>Verifying your email...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>Verification failed</h2>
      <p>{message}</p>
      <a href="/resend-verification">Resend verification email</a>
    </div>
  );
}
