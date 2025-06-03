/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand Wisdom Primary Colors
        primary: {
          50: "#F4F7FF",
          100: "#E7EEFF",
          300: "#B9CBFF",
          500: "#4172F5",
          600: "#3E5CE7",
          700: "#324ECF",
          900: "#07153F",
          DEFAULT: "#3E5CE7",
          foreground: "#FFFFFF",
        },
        // Brand Wisdom Secondary Colors
        secondary: {
          DEFAULT: "#444751",
          foreground: "#FFFFFF",
        },
        // Brand Wisdom Text Colors
        text: "#6F7176",
        // Brand Wisdom Neutral Colors
        grey: {
          100: "#F3F6FA",
          400: "#6F7176",
          900: "#1A1E29",
        },
        // Brand Wisdom Accent Colors
        gold: {
          500: "#FECD79",
        },
        // Status Colors
        success: "#27C084",
        error: "#EF5E5E",
        // Base colors for components
        border: "#F3F6FA",
        input: "#F3F6FA",
        ring: "#4172F5",
        background: "#FFFFFF",
        foreground: "#07153F",
        muted: {
          DEFAULT: "#F3F6FA",
          foreground: "#6F7176",
        },
        accent: {
          DEFAULT: "#FECD79",
          foreground: "#07153F",
        },
        destructive: {
          DEFAULT: "#EF5E5E",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#07153F",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#07153F",
        },
      },
      fontFamily: {
        sans: ["Jost", "Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        // Brand Wisdom Typography Scale
        "display-1": ["64px", { lineHeight: "110%", letterSpacing: "-1%" }],
        "display-1-mobile": ["48px", { lineHeight: "110%", letterSpacing: "-1%" }],
        "h1": ["48px", { lineHeight: "120%", letterSpacing: "-0.5%" }],
        "h2": ["36px", { lineHeight: "120%", letterSpacing: "-0.25%" }],
        "h3": ["28px", { lineHeight: "130%" }],
        "h4": ["22px", { lineHeight: "130%" }],
        "body-lg": ["18px", { lineHeight: "160%" }],
        "body-md": ["16px", { lineHeight: "160%" }],
        "body-sm": ["15px", { lineHeight: "150%" }],
        "caption": ["12px", { lineHeight: "140%", letterSpacing: "0.2px" }],
      },
      spacing: {
        // Brand Wisdom 8pt Grid
        "0": "0px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "24px",
        "6": "32px",
        "7": "40px",
        "7.5": "56px",
        "8": "64px",
        "9": "80px",
      },
      borderRadius: {
        sm: "5px",
        md: "10px",
        lg: "20px",
        xl: "30px",
      },
      boxShadow: {
        "card": "0 4px 8px rgba(0,0,0,0.04)",
        "button": "0 2px 4px rgba(0,0,0,0.1)",
        "button-hover": "0 4px 8px rgba(0,0,0,0.15)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4172F5 0%, #285CF7 100%)",
        "ring-gradient": "radial-gradient(circle at center, rgba(65,114,245,.08) 0%, rgba(65,114,245,0) 70%)",
      },
    },
  },
  plugins: [],
}
