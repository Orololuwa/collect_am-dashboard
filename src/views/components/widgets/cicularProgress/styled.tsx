import styled, { keyframes } from "styled-components";
import { CircularProgressProps } from ".";

const calcDeg = (deg: number): string => {
  return (((360 / 100) * deg) / 2).toFixed(2);
};

const fill = (progress: number) => keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(${calcDeg(progress)}deg);
    }
`;

const Wrapper = styled.div<CircularProgressProps>`
  height: 150px;
  width: 150px;
  position: relative;

  .circle-wrap {
    margin: auto;
    width: 150px;
    height: 150px;
    background: ${({ theme }) => theme.colors.base.light[100]};
    border-radius: 50%;
    box-shadow: 0px 10px 25px ${({ color }) => color}48;
    position: absolute;
    top: 0;
    left: 0;
  }

  .circle-wrap .circle .mask,
  .circle-wrap .circle .fill {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
  }

  .mask .fill {
    clip: rect(0px, 75px, 150px, 0px);
    background-color: ${({ color }) => color};
  }

  .circle-wrap .circle .mask {
    clip: rect(0px, 150px, 150px, 74px);
  }

  .mask.full,
  .circle .fill {
    animation: ${({ progress }) => fill(progress)} ease-in-out 3s;
    transform: rotate(${({ progress }) => calcDeg(progress)}deg);
  }

  .circle-wrap .inside-circle {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.base.light[100]};
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    color: ${({ color }) => color};
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Wrapper;
