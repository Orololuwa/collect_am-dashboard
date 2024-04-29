import React, { useState } from "react";
import TooltipWrapper from "./styled";
import { CSSTransition } from "react-transition-group";

interface TooltipProps extends WrapperProps {
  overlay: React.ReactNode;
  isActive?: boolean;
}

export interface WrapperProps {
  children: React.ReactNode;
  colorMode: "light" | "dark";
}

const Tooltip = ({
  children,
  overlay,
  colorMode,
  isActive = true
}: TooltipProps): JSX.Element => {
  const [isShow, setShow] = useState<boolean>(false);

  const onMouseEnter = (): void => {
    if (!isActive) return;

    setShow(true);
  };

  const onMouseLeave = (): void => {
    if (!isActive) return;

    setShow(false);
  };

  return (
    <TooltipWrapper
      className="relative cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      colorMode={colorMode}
    >
      <CSSTransition in={isShow} classNames="fade" timeout={300} unmountOnExit>
        <span className="tooltip absolute -top-full left-1/2 -translate-x-1/2 w-fit p-2 leading-none rounded-md">
          {overlay}
          <div className="triangle absolute top-full left-1/2 -translate-x-1/2  w-0 h-0 border-8 border-b-0 border-x-transparent" />
        </span>
      </CSSTransition>
      {children}
    </TooltipWrapper>
  );
};

export default Tooltip;
