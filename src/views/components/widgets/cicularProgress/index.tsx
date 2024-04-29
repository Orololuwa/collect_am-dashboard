import React from "react";
import Wrapper from "./styled";

export interface CircularProgressProps {
  color: string | undefined;
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  color,
  progress,
  children
}) => {
  progress = progress < 0 ? 0 : progress > 100 ? 100 : progress;

  return (
    <Wrapper color={color} progress={progress}>
      <div className="circle-wrap">
        <div className="circle">
          <div className="mask half">
            <div className="fill"></div>
          </div>
          <div className="mask full">
            <div className="fill"></div>
          </div>
        </div>
        <div className="inside-circle"> {children}</div>
      </div>
    </Wrapper>
  );
};

export default CircularProgress;
