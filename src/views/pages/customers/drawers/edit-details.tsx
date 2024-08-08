import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CustomerEntity } from "data/store/models/customers";
import { SubmitHandler, useForm } from "react-hook-form";
import RhfInput from "views/components/input/rhf-input";
import {
  ISchema as ICustomerSchema,
  customerTypeOptions
} from "./add-customer";
import RhfSelect from "views/components/select/rhf-select";
import { useState } from "react";
import { useAppDispatch } from "app/hooks";
import customerService from "data/services/customer.service";
import toast from "react-hot-toast";
import { updateCustomerSessionRefresh } from "data/store";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import Loading from "views/components/loading";
import * as yup from "yup";
import { UpdateCustomerBody } from "app/types/customer";

type ISchema = Omit<ICustomerSchema, "type" | "email">;

export const schema = yup.object().shape({
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
  phone: yup
    .string()
    .matches(
      /^\+\d{1,14}$/,
      "Phone number must be in valid E.164 format with country code"
    )
    .required("Phone number is required")
});

const EditDetails = ({
  isOpen,
  onClose,
  customer
}: {
  isOpen: boolean;
  onClose: () => void;
  customer: CustomerEntity | null;
}) => {
  if (!customer) return null;

  const defaultAddressValues: ISchema = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    name: customer.name,
    phone: customer.phone
  };

  const rhf = useForm<ISchema>({
    defaultValues: defaultAddressValues,
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  //
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISchema> = async (data: ISchema) => {
    setLoading(true);
    const cleanedData: Partial<UpdateCustomerBody> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        cleanedData[key as keyof UpdateCustomerBody] =
          value as UpdateCustomerBody[keyof UpdateCustomerBody];
      }
    });

    try {
      const res = await customerService.updateCustomer({
        body: cleanedData,
        pathVariables: { id: customer.id }
      });
      toast.success(res.message);
      setLoading(false);
      onClose();
      dispatch(updateCustomerSessionRefresh());
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      toast.error(msg);
      setLoading(false);
    }
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
          <DrawerHeader>View Address</DrawerHeader>

          <DrawerBody>
            <Stack h="100%" justifyContent={"space-between"}>
              <Stack spacing={"4"}>
                <RhfSelect
                  name="type"
                  label="Category"
                  maxMenuHeight={300}
                  control={rhf.control}
                  options={customerTypeOptions}
                  isDisabled
                  value={{
                    value: customer.type,
                    label: customer.type
                  }}
                />

                {customer.type === "individual" ? (
                  <RhfInput
                    type="text"
                    name="firstName"
                    label="First Name"
                    control={rhf.control}
                    isInvalid={Boolean(rhf.formState.errors?.firstName)}
                    helperText={rhf.formState.errors?.firstName?.message}
                  />
                ) : null}

                {customer.type === "individual" ? (
                  <RhfInput
                    type="text"
                    name="lastName"
                    label="Last Name"
                    control={rhf.control}
                    isInvalid={Boolean(rhf.formState.errors?.lastName)}
                    helperText={rhf.formState.errors?.lastName?.message}
                  />
                ) : null}

                {customer.type === "corporate" ? (
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
                  type="tel"
                  name="phone"
                  label="Phone"
                  control={rhf.control}
                  isInvalid={Boolean(rhf.formState.errors?.phone)}
                  helperText={rhf.formState.errors?.phone?.message}
                />
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              variant={"outline"}
            >
              Close
            </Button>
            <Button colorScheme="primary" onClick={rhf.handleSubmit(onSubmit)}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {loading ? <Loading /> : null}
    </>
  );
};

export default EditDetails;
