"use client"

import { useTheme } from "next-themes"

/**
 * Each panel (admin/hr/dashboard) has its own ThemeProvider with its own storageKey,
 * so theme is already isolated per-panel. Just re-export useTheme.
 */
export function useUserTheme() {
  return useTheme()
}
