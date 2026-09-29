"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutWithAxios } from "@/lib/auth.api";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

interface LogoutButtonProps {
  onSuccess?: () => void;
}

export default function LogoutButton({ onSuccess }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await logoutWithAxios();
      onSuccess?.();
      router.replace("/login");
      router.refresh();
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
