import styled from "styled-components";
import { WrapperProps } from ".";

const TooltipWrapper = styled.span<WrapperProps>`
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }

  .tooltip {
    background: ${({ theme, colorMode }) =>
      colorMode === "light"
        ? theme.colors.base.light[200]
        : colorMode === "dark"
        ? theme.colors.base.dark[100]
        : ""};
    color: ${({ theme, colorMode }) =>
      colorMode === "light"
        ? theme.colors.base.dark[200]
        : colorMode === "dark"
        ? theme.colors.base.light[100]
        : ""};

    .triangle {
      border-top-color: ${({ theme, colorMode }) =>
        colorMode === "light"
          ? theme.colors.base.light[200]
          : colorMode === "dark"
          ? theme.colors.base.dark[100]
          : ""};
    }
  }
`;

export default TooltipWrapper;
