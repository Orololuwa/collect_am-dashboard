import styled, { keyframes } from "styled-components";
import { TransitionStatus } from "react-transition-group";

const slideIn = keyframes`
    0% {
        width: 0;
    }
    100%{
        width: 17.5rem;
    }
`;

const slideOut = keyframes`
    0% {
        width: 17.5rem;
    }
    100%{
        width: 0;
    }
`;

const DrawerCtx = styled.div<{ placement: string; state: TransitionStatus }>`
  position: fixed;
  ${({ placement }) => (placement === "bottom" ? "bottom: 0;" : "top: 0;")};
  ${({ placement }) => (placement === "right" ? "right: 0" : "left: 0;")};
  width: ${({ placement }) =>
    placement === "left" || placement === "right" ? "17.5rem" : "100%"};
  height: ${({ placement }) =>
    placement === "bottom" || placement === "top" ? "25rem" : "100vh"};
  animation: ${({ state }) =>
      state === "entering" ? slideIn : state === "exiting" ? slideOut : ""}
    ${({ state }) =>
      state === "entering" ? "0.3s" : state === "exiting" ? ".5s" : "0"}
    forwards;
  padding: 1rem;
  z-index: 50001;
  background: ${({ theme }) => theme.colors.base.light[100]};
  transition: all 0.3s ease-out;
`;

export default DrawerCtx;
