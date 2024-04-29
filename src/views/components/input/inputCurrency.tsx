import cn from "classnames";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import styled from "styled-components";

interface InputCurrencyProps extends NumberFormatProps {
  w?: string;
}

const InputCurrency = ({
  className,
  w,
  ...props
}: InputCurrencyProps): JSX.Element => {
  return (
    <Wrapper w={w}>
      <NumberFormat
        className={cn({
          "py-3 px-6 w-full outline-none border-[0.5px]": true,
          ...(className && { [className]: className })
        })}
        {...props}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ w?: string }>`
  width: auto;

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ w }) => (w ? w : "17.5rem")};
  }
`;

export default InputCurrency;
