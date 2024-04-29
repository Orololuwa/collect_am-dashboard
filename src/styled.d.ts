import "styled-components";
import { BreakpointsProps, ColorProps, TypeScaleProps } from "theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorProps;
    primaryFont: string;
    typeScale: TypeScaleProps;
    breakpoints: BreakpointsProps;
  }
}
