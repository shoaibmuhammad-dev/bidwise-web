import { isAxiosError } from "axios";
import { api } from "./axios";

export interface LogoutResponse {
  success: boolean;
  message: string;
}

interface ErrorBody {
  message?: string;
}

// ---------- Axios version ----------
export const logoutWithAxios = async (): Promise<LogoutResponse> => {
  try {
    const { data } = await api.post<LogoutResponse>("/auth/logout");
    return data;
  } catch (err) {
    if (isAxiosError<ErrorBody>(err)) {
      throw new Error(err.response?.data?.message ?? "Logout failed");
    }
    throw err;
  }
};

// ---------- Fetch version ----------
const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4001/api";

export const logoutWithFetch = async (): Promise<LogoutResponse> => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData: ErrorBody | null = await response.json().catch(() => null);
    throw new Error(errorData?.message ?? "Logout failed");
  }

  return (await response.json()) as LogoutResponse;
};
