import classNames from "classnames";
import React, { forwardRef } from "react";
import Select, {
  SingleValue,
  StylesConfig,
  CSSObjectWithLabel,
  ControlProps,
  OptionProps,
  GetOptionValue,
  PropsValue
} from "react-select";
import theme from "app/theme";

export interface Option {
  value: any;
  label: string;
  isdisabled: boolean;
}

interface DropdownProps {
  options?: Option[];
  onChange?: (option: SingleValue<Option>) => void;
  placeholder?: React.ReactNode;
  className?: string;
  getOptionValue?: GetOptionValue<Option>;
  value?: PropsValue<Option>;
  defaultValue?: PropsValue<Option>;
}

const Dropdown = forwardRef<any, DropdownProps>(
  (
    {
      options,
      onChange,
      placeholder,
      className,
      getOptionValue,
      value,
      defaultValue
    },
    ref
  ): JSX.Element => {
    return (
      <Select
        ref={ref}
        className={classNames({
          "w-56 mb-10 inline-block": true,
          ...(className && { [className]: className })
        })}
        options={options}
        onChange={onChange}
        styles={customStyles}
        placeholder={placeholder}
        getOptionValue={getOptionValue}
        isOptionDisabled={(option) => option.isdisabled}
        value={value}
        defaultValue={defaultValue}
      />
    );
  }
);

const customStyles: StylesConfig<Option, false> = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    margin: 0
  }),
  control: (
    provided: CSSObjectWithLabel,
    state: ControlProps<Option, false>
  ) => ({
    ...provided,
    boxShadow: state.menuIsOpen
      ? `0 0 0 1px ${theme.colors.main.primary[200]}`
      : "",
    ":hover": {
      borderColor: theme.colors.main.primary[200]
    },
    ":focus": {
      borderColor: theme.colors.main.primary[200]
    },
    ":focus-visible": {
      borderColor: theme.colors.main.primary[200]
    },
    ":focus-within": {
      borderColor: theme.colors.main.primary[200]
    }
  }),
  option: (
    provided: CSSObjectWithLabel,
    state: OptionProps<Option, false>
  ) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? theme.colors.main.primary[200]
      : "transparent",
    ...(!state.isSelected && {
      ":hover": {
        backgroundColor: theme.colors.main.primary[100] + "30",
        cursor: "pointer"
      }
    })
  })
};

export default Dropdown;
