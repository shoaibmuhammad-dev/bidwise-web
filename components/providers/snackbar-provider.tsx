// components/providers/snackbar-provider.tsx
"use client";

import { SnackbarProvider } from "notistack";

export default function AppSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={4000}
    >
      {children}
    </SnackbarProvider>
  );
}
