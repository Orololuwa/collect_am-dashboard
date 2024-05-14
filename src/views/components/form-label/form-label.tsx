import {
  FormLabel as ChakraFormLabel,
  FormLabelProps as ChakraFormLabelProps
} from "@chakra-ui/react";

export type FormLabelProps = ChakraFormLabelProps & {};

export const FormLabel = ({
  children,
  fontWeight = 400,
  color = "#667085",
  fontSize = [13, 14],
  lineHeight = "24px",
  letterSpacing = [0, 1],
  display = "inline-block",
  marginBottom = "0.5 !important",
  ...props
}: FormLabelProps) => {
  return (
    <ChakraFormLabel
      margin={0}
      color={color}
      display={display}
      fontSize={fontSize}
      children={children}
      data-cy="form-label"
      lineHeight={lineHeight}
      fontWeight={fontWeight}
      marginBottom={marginBottom}
      letterSpacing={letterSpacing}
      {...props}
    />
  );
};
