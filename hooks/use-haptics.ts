export function useHaptics() {
  const trigger = (pattern: "light" | "medium" | "heavy" | "success" | "error" | "warning" | number | number[] = "light") => {
    if (typeof window === "undefined") return;

    // Check if haptics API is available
    if (!navigator.vibrate) return;

    // Predefined patterns
    const patterns: Record<string, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 20, 10],
      error: [20, 10, 20, 10, 20],
      warning: [30, 20, 30],
    };

    const hapticPattern = patterns[pattern as string] ?? pattern;
    navigator.vibrate(hapticPattern);
  };

  return { trigger };
}
