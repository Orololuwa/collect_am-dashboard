import { DefaultTheme } from "styled-components";
import { colors } from "./colors";
import { primaryFont, typeScale } from "./typeScale";
import { breakpoints } from "./mediaQueries";

const theme: DefaultTheme = {
  colors,
  primaryFont,
  typeScale,
  breakpoints
};

export * from "./colors";
export * from "./typeScale";
export * from "./mediaQueries";
export default theme;
