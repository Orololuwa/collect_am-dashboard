import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  Stack
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddressEntity } from "data/store/models/customers";
import { useForm } from "react-hook-form";
import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import * as yup from "yup";

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

const EditAddress = ({
  isOpen,
  onClose,
  address
}: {
  isOpen: boolean;
  onClose: () => void;
  address: AddressEntity | null;
}) => {
  if (!address) return null;

  const defaultAddressValues: ISchema = {
    unitNumber: address.unitNumber,
    addressLine: address.addressLine,
    city: address.city,
    state: address.state,
    countryCode: address.countryCode,
    postalCode: address.postalCode,
    addressLineI: address.addressLineI,
    addressLineII: address.addressLineII
  };

  const rhf = useForm<ISchema>({
    defaultValues: defaultAddressValues,
    mode: "onSubmit",
    resolver: yupResolver(schema)
  });

  return (
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
              <RhfInput
                type="text"
                name="unitNumber"
                label="Unit Number"
                control={rhf.control}
                isInvalid={Boolean(rhf.formState.errors?.unitNumber)}
                helperText={rhf.formState.errors?.unitNumber?.message}
                placeholder="6b"
                disabled
              />

              <RhfTextarea
                name="addressLine"
                label="Address Line"
                control={rhf.control}
                helperText={rhf.formState.errors?.addressLine?.message}
                disabled
              />

              <RhfInput
                type="text"
                name="addressLineI"
                label="Address Line I"
                control={rhf.control}
                isInvalid={Boolean(rhf.formState.errors?.addressLineI)}
                helperText={rhf.formState.errors?.addressLineI?.message}
                disabled
              />

              <RhfInput
                type="text"
                name="addressLineII"
                label="Address Line II"
                control={rhf.control}
                isInvalid={Boolean(rhf.formState.errors?.addressLineII)}
                helperText={rhf.formState.errors?.addressLineII?.message}
                disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
                  />
                </GridItem>
              </Grid>
            </Stack>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditAddress;
