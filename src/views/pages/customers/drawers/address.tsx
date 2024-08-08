import { Button, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "app/hooks";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import { updateCustomerSessionRefresh } from "data/store";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import Loading from "views/components/loading";
import * as yup from "yup";
import { ISchema as IPersonalProfileSchema } from "./add-customer";
import customerService from "data/services/customer.service";

const schema = yup.object().shape({
  unitNumber: yup.string().required("Unit number is required"),
  addressLine: yup.string().required("Address line is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  countryCode: yup
    .string()
    .length(2, "Country code must be exactly 2 characters")
    .required("Country code is required"),
  postalCode: yup.string().required("Postal code is required"),
  addressLineI: yup.string(),
  addressLineII: yup.string()
});

export type ISchema = yup.InferType<typeof schema> & {
  addressLineI: string | undefined;
  addressLineII: string | undefined;
};

const defaultAddressValues: ISchema = {
  unitNumber: "",
  addressLine: "",
  city: "",
  state: "",
  countryCode: "",
  postalCode: "",
  addressLineI: "",
  addressLineII: ""
};

const Address = ({
  onClose,
  goToPrevious,
  personalInfo
}: {
  onClose: () => void;
  personalInfo: IPersonalProfileSchema;
  goToPrevious: () => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const rhf = useForm<ISchema>({
    defaultValues: defaultAddressValues,
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<ISchema> = async (data: ISchema) => {
    setLoading(true);
    try {
      const res = await customerService.addCustomer({
        body: { ...personalInfo, ...data }
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
    <Stack h="100%" justifyContent={"space-between"}>
      <Stack spacing={"4"}>
        <RhfInput
          type="text"
          name="unitNumber"
          label="Unit Number"
          control={rhf.control}
          isInvalid={Boolean(rhf.formState.errors?.unitNumber)}
          helperText={rhf.formState.errors?.unitNumber?.message}
          placeholder="6b"
        />

        <RhfTextarea
          name="addressLine"
          label="Address Line"
          control={rhf.control}
          helperText={rhf.formState.errors?.addressLine?.message}
        />

        <RhfInput
          type="text"
          name="addressLineI"
          label="Address Line I (optional)"
          control={rhf.control}
          isInvalid={Boolean(rhf.formState.errors?.addressLineI)}
          helperText={rhf.formState.errors?.addressLineI?.message}
        />

        <RhfInput
          type="text"
          name="addressLineII"
          label="Address Line II (optional)"
          control={rhf.control}
          isInvalid={Boolean(rhf.formState.errors?.addressLineII)}
          helperText={rhf.formState.errors?.addressLineII?.message}
        />
        <Grid
          gap="2"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)"
          ]}
        >
          <GridItem>
            <RhfInput
              type="text"
              name="city"
              label="City"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.city)}
              helperText={rhf.formState.errors?.city?.message}
              placeholder="Ikeja"
            />
          </GridItem>
          <GridItem>
            <RhfInput
              type="text"
              name="state"
              label="State"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.state)}
              helperText={rhf.formState.errors?.state?.message}
              placeholder="Lagos"
            />
          </GridItem>
        </Grid>

        <Grid
          gap="2"
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)"
          ]}
        >
          <GridItem>
            <RhfInput
              type="text"
              name="countryCode"
              label="Country Code"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.countryCode)}
              helperText={rhf.formState.errors?.countryCode?.message}
              placeholder="NG"
            />
          </GridItem>
          <GridItem>
            <RhfInput
              type="text"
              name="postalCode"
              label="Postal Code"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.postalCode)}
              helperText={rhf.formState.errors?.postalCode?.message}
              placeholder="10001"
            />
          </GridItem>
        </Grid>
      </Stack>
      <Flex
        position={"absolute"}
        left={"0"}
        bottom="0"
        justifyContent={"flex-end"}
        backgroundColor={"white"}
        py="4"
        px="6"
        w="100%"
      >
        <Button
          colorScheme="primary"
          variant={"outline"}
          mr={3}
          onClick={goToPrevious}
        >
          Previous
        </Button>

        <Button colorScheme="primary" onClick={rhf.handleSubmit(onSubmit)}>
          Add Product
        </Button>
      </Flex>
      {loading ? <Loading /> : null}
    </Stack>
  );
};

export default Address;
