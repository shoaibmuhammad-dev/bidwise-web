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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await logoutWithAxios();

      onSuccess?.();

      router.replace("/login");
    } catch (error) {
      if (axios.isAxiosError<{ message?: string }>(error)) {
        const message = error.response?.data?.message ?? "Failed to logout";

        enqueueSnackbar(message, {
          variant: "error",
        });
      } else if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-red-500/20 text-red-500 px-4 py-3 leading-none text-sm rounded-lg font-semibold disabled:opacity-50"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
