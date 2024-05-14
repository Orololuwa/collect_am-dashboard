import { extendTheme, ThemeConfig, ThemeOverride } from "@chakra-ui/react";

export const colors = {
  primary: {
    "50": "#FEF6E6",
    "100": "#FDE6BA",
    "200": "#FCD58D",
    "300": "#FAC560",
    "400": "#F9B534",
    "500": "#F8A407",
    "600": "#C68306",
    "700": "#956304",
    "800": "#634203",
    "900": "#322101"
  },
  gray: {
    100: "#F9F9FA",
    200: "#EFF0F3",
    300: "#CCCFD6",
    400: "#B2B7C2",
    500: "#808899",
    600: "#667085",
    700: "#444B59",
    800: "#333843",
    900: "#212327"
  },
  error: {
    100: "#F8D3D7",
    200: "#F3B6BD",
    300: "#E76D7A",
    400: "#E14959",
    500: "#DB2438",
    600: "#B61E2F",
    700: "#921825",
    800: "#6E121C",
    900: "#2C070B"
  },
  warning: {
    100: "#FFF5CD",
    200: "#FFEEAB",
    300: "#FFDD58",
    400: "#FFD52E",
    500: "#FFCC04",
    600: "#D5AA03",
    700: "#AA8803",
    800: "#806602",
    900: "#332901"
  },
  success: {
    100: "#D1EBDA",
    200: "#B3DEC2",
    300: "#67BC85",
    400: "#41AC67",
    500: "#1B9B48",
    600: "#17813C",
    700: "#126730",
    800: "#0E4E24",
    900: "#051F0E"
  },
  blue: {
    100: "#E0E6FD",
    200: "#CBD6FC",
    300: "#98ADF9",
    400: "#7E99F8",
    500: "#6484F6",
    600: "#536ECD",
    700: "#4358A4",
    800: "#32427B",
    900: "#141A31"
  },
  purple: {
    100: "#E4DEFD",
    200: "#D2C8FC",
    300: "#A690F8",
    400: "#8F75F7",
    500: "#7959F5",
    600: "#654ACC",
    700: "#513BA3",
    800: "#3D2D7B",
    900: "#181231"
  },
  orange: {
    100: "#FDEEDC",
    200: "#FBE2C4",
    300: "#F8C58A",
    400: "#F6B76C",
    500: "#F4A84F",
    600: "#CB8C42",
    700: "#A37035",
    800: "#7A5428",
    900: "#312210"
  },
  indigo: {
    100: "#F4DCFD",
    200: "#EDC4FB",
    300: "#DB8AF8",
    400: "#D26CF6",
    500: "#C94FF4",
    600: "#A842CB",
    700: "#8635A3",
    800: "#65287A",
    900: "#281031"
  }
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const extendedThemeConfig: ThemeOverride = {
  components: {
    Button: {
      variants: {
        primary: { color: "gray.100", backgroundColor: "primary.500" }
      }
    }
  },
  fonts: {
    body: "'Rubik', sans-serif",
    heading: "'Rubik', sans-serif",
    mono: "'Rubik', sans-serif",
    karla: "'Karla', sans-serif"
  },
  colors
};

// 3. extend the theme
const chakaraTheme = extendTheme({ ...config, ...extendedThemeConfig });

export default chakaraTheme;
