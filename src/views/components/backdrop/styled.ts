import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BackdropCtx = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 50000;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BackdropCtx;
