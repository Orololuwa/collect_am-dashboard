import React from "react";
import Show from "../show";
import { FormLabel } from "../form-label";
import Dropdown, { DropdownProps } from "../dropdown";
import { forwardRef, FormControl, FormHelperText } from "@chakra-ui/react";

export type Props = {
  mb?: string | number;
  onClick?: () => void;
  children?: undefined;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
} & DropdownProps;

const Select = forwardRef<Props, "select">(
  (
    {
      mb,
      label,
      value,
      options,
      onClick,
      helperText,
      isDisabled,
      menuStyles,
      inputStyles,
      placeholder,
      isSearchable,
      defaultValue,
      maxMenuHeight,
      getOptionValue,
      onChange = () => {}
    }: Props,
    ref
  ) => {
    inputStyles = {
      ...inputStyles,
      height: "56px",
      paddingLeft: "8px",
      borderRadius: "8px"
    };

    return (
      <FormControl mb={mb} data-cy="select-form-control" onClick={onClick}>
        <Show iff={Boolean(label)}>
          <FormLabel display="block" data-cy="select-form-label">
            {label}
          </FormLabel>
        </Show>

        <Dropdown
          ref={ref}
          value={value}
          options={options}
          onChange={onChange}
          menuStyles={menuStyles}
          isDisabled={isDisabled}
          inputStyles={inputStyles}
          placeholder={placeholder}
          data-cy="select-dropdown"
          isSearchable={isSearchable}
          defaultValue={defaultValue}
          className="w-full h-[56px]"
          maxMenuHeight={maxMenuHeight}
          getOptionValue={getOptionValue}
        />

        <Show iff={Boolean(helperText)}>
          <FormHelperText
            mt={0}
            fontSize={14}
            display="block"
            color="red"
            lineHeight="28px"
            data-cy="select-form-helper-text"
          >
            {helperText}
          </FormHelperText>
        </Show>
      </FormControl>
    );
  }
);

export default Select;
