import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#242C37",
        surface: "#FFFFFF",
        "surface-elevated": "#FFF8F2",
        border: "#E2E5E9",
        "border-strong": "#CCD2DA",
        paper: "#FFFFFF",
        muted: "#687180",
        "muted-2": "#8B94A3",
        signal: "#FF8000",
        "signal-soft": "#FFA000",
        "signal-dim": "#E8540C",
        "brand-deep": "#C94710",
        "brand-red": "#E02010",
        success: "#22A861",
        warning: "#E88912",
        danger: "#D9362B",
        screen: {
          DEFAULT: "#171C26",
          raised: "#202833",
          muted: "#AFB8C7",
        },
      },
      fontFamily: {
        display: ["'Manrope'", "system-ui", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
      },
      maxWidth: {
        content: "1240px",
        prose: "62ch",
      },
      boxShadow: {
        panel: "0 1px 0 0 rgba(255,255,255,0.92) inset, 0 18px 44px -30px rgba(36,44,55,0.38)",
        lift: "0 30px 80px -46px rgba(36,44,55,0.5)",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        "scan-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "sync-travel": {
          "0%": { offsetDistance: "0%" as any, opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { offsetDistance: "100%" as any, opacity: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 22s linear infinite",
        "ping-slow": "ping 2.4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
