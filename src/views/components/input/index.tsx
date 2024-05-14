import {
  Stack,
  InputGroup,
  forwardRef,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  EditableTextareaProps as ChakraTextereaProps,
  Textarea as ChakraTextarea
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Show from "../show";
import Hide from "../hide";
import { FormLabel } from "../form-label";

export interface InputProps extends ChakraInputProps {
  disabled?: boolean;
  helperText?: string;
  helperTextColor?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  label?: string | React.ReactNode;
}
export interface TextareaProps extends ChakraTextereaProps {
  disabled?: boolean;
  helperText?: string;
  helperTextColor?: string;
  label?: string | React.ReactNode;
}

export const Label = ({ label }: any) => (
  <Show iff={Boolean(label)}>
    <FormLabel w="full" data-cy="form-label-root">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        data-cy="form-label-stack"
      >
        <Show iff={typeof label === "string"}>
          <span data-cy="form-label-text">{label}</span>
        </Show>

        <Hide iff={typeof label === "string"}>{label}</Hide>
      </Stack>
    </FormLabel>
  </Show>
);

const HelperText = ({ text, color = "red" }: any) => (
  <Show iff={Boolean(text)}>
    <FormLabel w="full" color={color} data-cy="-text-root">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        data-cy="-helper-text-stack"
      >
        <span data-cy="helper-text">{text}</span>
      </Stack>
    </FormLabel>
  </Show>
);

interface IInputProps extends InputProps {
  helperTextColor?: string;
  isFormControlDisabled?: boolean;
  isFormControlInvalid?: boolean;
  isFormControlRequired?: boolean;
}

export const Input = forwardRef<IInputProps, "input">(
  (
    {
      h = "3rem",
      disabled = false,
      leftElement,
      rightElement,
      helperText,
      onChange,
      helperTextColor,
      isFormControlDisabled,
      isFormControlInvalid,
      isFormControlRequired,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl
        isDisabled={isFormControlDisabled}
        isInvalid={isFormControlInvalid}
        isRequired={isFormControlRequired}
        data-cy="input-form-control"
      >
        <Label label={props.label} data-cy="input-form-label" />
        <InputGroup h={h} data-cy="input-group">
          {leftElement}
          <ChakraInput
            ref={ref}
            size="lg"
            fontSize="16px"
            data-cy="input"
            height="inherit"
            borderRadius="8px"
            onChange={onChange}
            disabled={disabled}
            backgroundColor="#fff"
            focusBorderColor="primary.400"
            border="1px solid #cccfd6 !important"
            {...props}
          />
          {rightElement}
        </InputGroup>
        <HelperText
          text={helperText}
          color={helperTextColor}
          data-cy="input-helper-text"
        />
      </FormControl>
    );
  }
);

interface ITextAreaProps extends ChakraTextereaProps {
  helperTextColor?: string;
  isFormControlDisabled?: boolean;
  isFormControlInvalid?: boolean;
  isFormControlRequired?: boolean;
  label?: ReactNode;
  helperText?: string;
}
export const TextArea = forwardRef<ITextAreaProps, "textarea">(
  (
    {
      h = "20rem",
      disabled = false,
      onChange,
      helperTextColor,
      isFormControlDisabled,
      isFormControlInvalid,
      isFormControlRequired,
      helperText,
      label,
      ...props
    },
    ref
  ) => {
    return (
      <FormControl
        isDisabled={isFormControlDisabled}
        isInvalid={isFormControlInvalid}
        isRequired={isFormControlRequired}
        data-cy="input-form-control"
      >
        <Label label={label} data-cy="input-form-label" />
        <ChakraTextarea
          ref={ref}
          fontSize="16px"
          data-cy="input"
          height="inherit"
          borderRadius="8px"
          onChange={onChange}
          disabled={disabled}
          backgroundColor="#fff"
          focusBorderColor="primary.400"
          border="1px solid #cccfd6 !important"
          {...props}
        />
        <HelperText
          text={helperText}
          color={helperTextColor}
          data-cy="input-helper-text"
        />
      </FormControl>
    );
  }
);

export default Input;
