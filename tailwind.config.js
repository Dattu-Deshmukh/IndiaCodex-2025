// /** @type {import('tailwindcss').Config} */
// const defaultConfig = require("shadcn/ui/tailwind.config")

// module.exports = {
//   ...defaultConfig,
//   content: [...defaultConfig.content, "./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
//   theme: {
//     ...defaultConfig.theme,
//     extend: {
//       ...defaultConfig.theme.extend,
//       colors: {
//         ...defaultConfig.theme.extend.colors,
//         "cardano-blue": "#0033AD",
//         "cardano-light": "#1E88E5",
//       },
//       backgroundImage: {
//         "gradient-web3": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         "gradient-cardano": "linear-gradient(135deg, #0033AD 0%, #1E88E5 100%)",
//       },
//       animation: {
//         glow: "glow 2s ease-in-out infinite alternate",
//         float: "float 3s ease-in-out infinite",
//       },
//       keyframes: {
//         glow: {
//           "0%": { boxShadow: "0 0 5px #667eea, 0 0 10px #667eea, 0 0 15px #667eea" },
//           "100%": { boxShadow: "0 0 10px #667eea, 0 0 20px #667eea, 0 0 30px #667eea" },
//         },
//         float: {
//           "0%, 100%": { transform: "translateY(0px)" },
//           "50%": { transform: "translateY(-10px)" },
//         },
//       },
//     },
//   },
//   plugins: [...defaultConfig.plugins, require("tailwindcss-animate")],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enable dark mode toggle
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./node_modules/@shadcn/ui/dist/*.{js,ts,jsx,tsx}", // ✅ include shadcn
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // 🔵 Custom Cardano theme
        "cardano-blue": "#0033AD",
        "cardano-light": "#1E88E5",
      },
      backgroundImage: {
        "gradient-web3": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-cardano": "linear-gradient(135deg, #0033AD 0%, #1E88E5 100%)",
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px #667eea, 0 0 10px #667eea, 0 0 15px #667eea" },
          "100%": { boxShadow: "0 0 10px #667eea, 0 0 20px #667eea, 0 0 30px #667eea" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
