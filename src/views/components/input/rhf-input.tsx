import {
  FieldValues,
  useController,
  ControllerRenderProps
} from "react-hook-form";
import Input, { TextareaProps, InputProps, TextArea } from "./index";

type RhfInputProps = InputProps & {
  name: string;
  control: any;
  helperText?: string;
};

const RhfInput = ({ name, value, control, ...props }: RhfInputProps) => {
  let field: ControllerRenderProps<FieldValues, string> | undefined;

  if (control) {
    field = useController({ name, control, defaultValue: "" })?.field;
  }

  return (
    <Input
      {...props}
      ref={field?.ref}
      name={name ?? field?.name}
      onChange={field?.onChange}
      value={value ?? field?.value}
      data-cy="rhf-input"
    />
  );
};

type RhfTextareProps = TextareaProps & {
  name: string;
  control: any;
  helperText?: string;
};

export const RhfTextarea = ({
  name,
  value,
  control,
  ...props
}: RhfTextareProps) => {
  let field: ControllerRenderProps<FieldValues, string> | undefined;

  if (control) {
    field = useController({ name, control, defaultValue: "" })?.field;
  }

  return (
    <TextArea
      {...props}
      ref={field?.ref}
      name={name ?? field?.name}
      onChange={field?.onChange}
      value={value ?? field?.value}
      data-cy="rhf-input"
    />
  );
};

export default RhfInput;
