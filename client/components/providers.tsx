"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { HelmetProvider } from "react-helmet-async"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </HelmetProvider>
  )
}

