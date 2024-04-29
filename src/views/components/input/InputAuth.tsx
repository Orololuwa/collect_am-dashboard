import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  passwordVisibilityIcons?: boolean;
  validationError?: boolean;
}

const InputAuth = forwardRef<HTMLInputElement, InputProps>(
  (
    { passwordVisibilityIcons = false, validationError, ...props },
    ref
  ): JSX.Element => {
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

    const passwordVisibilityHandler = () => {
      setPasswordVisible((prev) => !prev);
    };

    const passwordTypeHandler = (
      type: React.HTMLInputTypeAttribute | undefined
    ) => {
      if (!passwordVisibilityIcons) {
        return type;
      }

      if (isPasswordVisible) {
        return "text";
      } else {
        return "password";
      }
    };

    return (
      <Wrapper className="relative w-max">
        <input
          ref={ref}
          {...props}
          type={passwordTypeHandler(props.type)}
          className={classNames({
            "outline-none px-6 py-3 rounded-2xl border-2": true,
            "pr-10": passwordVisibilityIcons,
            "border-red-300": validationError
          })}
        />
        {!!passwordVisibilityIcons ? (
          <div className="eyeIcons absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer">
            {isPasswordVisible ? (
              <FaEyeSlash onClick={passwordVisibilityHandler} />
            ) : (
              <FaEye onClick={passwordVisibilityHandler} />
            )}
          </div>
        ) : null}
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  border-color: ${({ theme }) => theme.colors.main.secondary[100]};
  color: ${({ theme }) => theme.colors.main.secondary[300]};

  input {
    width: 17.5rem;
  }
`;

export default InputAuth;
