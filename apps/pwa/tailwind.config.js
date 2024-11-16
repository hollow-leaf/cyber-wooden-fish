/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        navbar: "var(--navbar-height)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "sub-text": "hsl(var(--sub-text))",
        "sub-border": "hsl(var(--sub-border))",
        "error-text": "hsl(var(--error-text))",
        "sub-bg": "hsl(var(--sub-bg))",
      },
      // font
      fontFamily: {
        "space-grotesk": ["SpaceGrotesk", "sans-serif"],
      },
      fontSize: {
        h1: [
          "3rem",
          {
            lineHeight: "3rem",
            letterSpacing: "-0.012em",
            fontWeight: "800",
          },
        ],
        h2: [
          "30px",
          {
            lineHeight: "36px",
            letterSpacing: "-0.0075em",
            fontWeight: "600",
          },
        ],
        h3: [
          "1.5rem",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.006em",
            fontWeight: "600",
          },
        ],
        h4: [
          "1.25rem",
          {
            lineHeight: "28px",
            letterSpacing: "-0.005em",
            fontWeight: "600",
          },
        ],
        p: [
          "1rem",
          {
            lineHeight: "28px",
            letterSpacing: "-0em",
            fontWeight: "400",
          },
        ],
        blockquote: [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0em",
            fontWeight: "400",
          },
        ],
        list: [
          "1rem",
          {
            lineHeight: "1.5rem",
            letterSpacing: "-0em",
            fontWeight: "400",
          },
        ],
        lead: [
          "1.25rem",
          {
            lineHeight: "28px",
            letterSpacing: "-0em",
            fontWeight: "400",
          },
        ],
        "2xl": [
          "1.5rem",
          {
            lineHeight: "28px",
            letterSpacing: "-0em",
            fontWeight: "600",
          },
        ],
        lg: [
          "1.125rem",
          {
            lineHeight: "28px",
            letterSpacing: "-0em",
            fontWeight: "600",
          },
        ],
        sm: [
          "0.875rem",
          {
            lineHeight: "1.25",
            letterSpacing: "-0em",
            fontWeight: "500",
          },
        ],
        xs: [
          "0.75rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "-0em",
            fontWeight: "500",
          },
        ],
        subtitle: [
          "0.875rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0em",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        toastFadeOut: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
        "vertical-loop": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(-160%)" },
        },
        growHeight: {
          "0%": {
            height: "388px",
          },
          "100%": {
            height: "800px",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeOut: "fadeOut 1s ease-in-out forwards",
        "toast-progress": "toastFadeOut 3s ease-out forwards",
        "vertical-loop": "vertical-loop 80s infinite linear",
        growHeight: "growHeight 3s ease-in forwards",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
