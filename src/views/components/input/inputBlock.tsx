import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
  bg?: boolean;
  w?: string;
}

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Props {}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Props {}

const InputBlock = ({ type, bg, w, ...props }: InputProps): JSX.Element => {
  return (
    <Wrapper className="relative w-max rounded-md" bg={bg} w={w}>
      {type === "search" ? (
        <IoSearchOutline
          className="absolute top-1/2 -translate-y-1/2 left-3"
          size={25}
        />
      ) : null}
      <input
        {...props}
        type={type}
        className={classNames({
          "outline-none px-6 py-3 border-[0.5px]": true,
          "pl-12": type === "search"
        })}
      />
    </Wrapper>
  );
};

export const TextArea = ({ bg, w, ...props }: TextAreaProps): JSX.Element => {
  return (
    <Wrapper className="relative w-max rounded-md" bg={bg} w={w}>
      <textarea
        {...props}
        className={classNames({
          "outline-none px-6 py-3 border-[0.5px]": true
        })}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  border-color: ${({ theme, bg }) =>
    !!bg ? theme.colors.main.secondary[100] + "66" : "transparent"};
  }
  color: ${({ theme }) => theme.colors.base.dark[200]};

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input, textarea {
    background: ${({ theme, bg }) =>
      !!bg
        ? theme.colors.main.secondary[100] + "66"
        : theme.colors.base.light[100]};

    @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}){
      width: ${({ w }) => (w ? w : "17.5rem")};
    }
  }
}
`;

export default InputBlock;
