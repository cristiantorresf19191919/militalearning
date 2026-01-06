"use client";

import { ProgressProvider } from "@/context/ProgressContext";
import { CssBaseline } from "@mui/material";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <CssBaseline />
      {children}
    </ProgressProvider>
  );
}
