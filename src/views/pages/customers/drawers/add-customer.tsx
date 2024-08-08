import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RhfInput from "views/components/input/rhf-input";
import RhfSelect from "views/components/select/rhf-select";
import { Option } from "views/components/dropdown";
import Address from "./address";

const schema = yup.object().shape({
  type: yup
    .string()
    .oneOf(["individual", "corporate"])
    .required("Type is required"),
  firstName: yup.string().when("type", {
    is: (val: string) => val === "individual",
    then: (schema) => schema.required("First name is required for individuals"),
    otherwise: (schema) => schema
  }),
  lastName: yup.string().when("type", {
    is: (val: string) => val === "individual",
    then: (schema) => schema.required("Last name is required for individuals"),
    otherwise: (schema) => schema
  }),
  name: yup.string().when("type", {
    is: (val: string) => val === "corporate",
    then: (schema) => schema.required("Name is required for corporate"),
    otherwise: (schema) => schema
  }),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must be in valid E.164 format with country code"
    )
    .required("Phone number is required")
});

export type ISchema = yup.InferType<typeof schema> & {
  firstName: string | undefined;
  lastName: string | undefined;
  name: string | undefined;
};

const defaultValues: ISchema = {
  type: "individual",
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  phone: ""
};

export const customerTypeOptions: Option[] = [
  { value: "individual", label: "Individual" },
  { value: "corporate", label: "Business" }
];

const AddCustomer = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  // rhf form
  const rhf = useForm<ISchema>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const state = rhf.watch();
  const type = rhf.watch("type");

  // steps
  const steps = [
    {
      title: "Personal Info",
      description: "Personal details of Customer",
      stepIndicator: <div>i</div>,
      formComponent: (
        <Stack spacing={"4"}>
          <RhfSelect
            name="type"
            label="Category"
            maxMenuHeight={300}
            control={rhf.control}
            options={customerTypeOptions}
            value={{
              value: type,
              label: type
            }}
            helperText={rhf.formState.errors?.type?.message}
          />

          {type === "individual" ? (
            <RhfInput
              type="text"
              name="firstName"
              label="First Name"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.firstName)}
              helperText={rhf.formState.errors?.firstName?.message}
            />
          ) : null}

          {type === "individual" ? (
            <RhfInput
              type="text"
              name="lastName"
              label="Last Name"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.lastName)}
              helperText={rhf.formState.errors?.lastName?.message}
            />
          ) : null}

          {type === "corporate" ? (
            <RhfInput
              type="text"
              name="name"
              label="Name"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.name)}
              helperText={rhf.formState.errors?.name?.message}
            />
          ) : null}

          <RhfInput
            type="email"
            name="email"
            label="Email"
            control={rhf.control}
            isInvalid={Boolean(rhf.formState.errors?.email)}
            helperText={rhf.formState.errors?.email?.message}
          />

          <RhfInput
            type="tel"
            name="phone"
            label="Phone"
            control={rhf.control}
            isInvalid={Boolean(rhf.formState.errors?.phone)}
            helperText={rhf.formState.errors?.phone?.message}
          />
        </Stack>
      )
    },
    {
      title: "Address",
      description: "Address details of Customer",
      stepIndicator: <div>a</div>,
      formComponent: (
        <Address
          onClose={onClose}
          goToPrevious={() => goToPrevious()}
          personalInfo={state}
        />
      )
    }
  ];

  const { activeStep, setActiveStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length
  });

  const next: SubmitHandler<ISchema> = (_) => {
    goToNext();
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="md"
        colorScheme="primary"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Customer</DrawerHeader>

          <DrawerBody>
            <Stepper size="md" index={activeStep} colorScheme="primary">
              {steps.map((step, index) => (
                <Step key={index}>
                  <Stack position={"relative"}>
                    <StepIndicator
                      cursor={"pointer"}
                      onClick={() => setActiveStep(index)}
                    >
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <Box
                      flexShrink="0"
                      position={"absolute"}
                      top={"10"}
                      left={
                        index === 0
                          ? "0%"
                          : index === steps.length - 1
                          ? "-100%"
                          : "-50%"
                      }
                      textAlign={
                        index === 0
                          ? "left"
                          : index === steps.length - 1
                          ? "right"
                          : "center"
                      }
                      w="max-content"
                    >
                      <StepTitle>{step.title}</StepTitle>
                    </Box>
                  </Stack>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>

            <div className="md:h-ful gap-2 mt-20">
              {steps[activeStep].formComponent}
            </div>
          </DrawerBody>

          {activeStep < steps.length - 1 ? (
            <DrawerFooter>
              {activeStep > 0 ? (
                <Button
                  colorScheme="primary"
                  variant={"outline"}
                  mr={3}
                  onClick={goToPrevious}
                >
                  Previous
                </Button>
              ) : (
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              )}
              {activeStep < steps.length - 1 ? (
                <Button
                  colorScheme="primary"
                  variant={"outline"}
                  onClick={rhf.handleSubmit(next)}
                >
                  Next
                </Button>
              ) : null}
            </DrawerFooter>
          ) : null}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCustomer;
