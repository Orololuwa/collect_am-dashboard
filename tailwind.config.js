module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          primary: {
            400: "#F9B432",
            300: "#FDC849",
            200: "#FDD576",
            100: "#FAE4B0"
          },
          secondary: {
            400: "#1B2124",
            300: "#4B5053",
            200: "#787D80",
            100: "#D5D8DE"
          }
        },
        base: {
          light: {
            400: "#809FB8",
            300: "#99b2c6",
            200: "#E7EDF5",
            100: "#FFFFFF"
          },
          dark: {
            400: "#06152B",
            300: "#384455",
            200: "#6A7380",
            100: "#9BA1AA"
          }
        },
        state: {
          success: {
            400: "#73D13D"
          },
          warning: {
            400: "#FAAD14"
          },
          danger: {
            400: "#FF4D4F"
          },
          disabled: {
            400: "#D9D9D9"
          }
        }
      }
    }
  },
  plugins: []
};
