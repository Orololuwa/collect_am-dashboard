import React from "react";
import styled from "styled-components";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
}

export const IconButton = (props: IconButtonProps): JSX.Element => {
  return <Wrapper {...props}>{props.icon}</Wrapper>;
};

const Wrapper = styled.button<IconButtonProps>`
  background-color: ${({ theme }) => theme.colors.base.light[200]};
  border: 1px solid ${({ theme }) => theme.colors.main.secondary[100]};
  color: ${({ theme }) => theme.colors.main.primary[400]};

  padding: 10px;
  border-radius: 2.5px;
  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.main.secondary[400]};
  }
`;
