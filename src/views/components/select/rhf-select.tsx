import {
  FieldValues,
  useController,
  ControllerRenderProps
} from "react-hook-form";
import Select, { Props } from "./";

type RhfSelectProps = Props & { name: string; control: any };

const RhfSelect = ({
  name,
  value,
  label,
  options,
  control,
  isDisabled,
  inputStyles,
  placeholder,
  isSearchable,
  defaultValue,
  maxMenuHeight,
  getOptionValue
}: RhfSelectProps) => {
  let field: ControllerRenderProps<FieldValues, string> | undefined;

  if (control) {
    field = useController({ name, control, defaultValue })?.field;
  }

  return (
    <Select
      label={label}
      ref={field?.ref}
      options={options}
      isSearchable={isSearchable}
      name={field?.name}
      isDisabled={isDisabled}
      inputStyles={inputStyles}
      placeholder={placeholder}
      defaultValue={defaultValue}
      maxMenuHeight={maxMenuHeight}
      value={value || field?.value}
      getOptionValue={getOptionValue}
      onChange={(o) => field?.onChange(o?.value)}
    />
  );
};

export default RhfSelect;
