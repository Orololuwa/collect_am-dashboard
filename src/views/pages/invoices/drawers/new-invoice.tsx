import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Stack,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Grid,
  GridItem
} from "@chakra-ui/react";
import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import Loading from "views/components/loading";
import { useAppDispatch, useAppSelector } from "app/hooks";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import { updateCustomerSessionRefresh } from "data/store";
import RhfSelect from "views/components/select/rhf-select";
import { Trash, Additem } from "iconsax-react";

// Yup schema
const schema = yup.object().shape({
  code: yup.string().required("Invoice code is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup
    .string()
    .required("Due date is required")
    .test(
      "is-date",
      "Due date must be a valid date",
      (value) => !isNaN(Date.parse(value || ""))
    ),
  tax: yup
    .number()
    .min(0, "Tax must be a positive number")
    .required("Tax is required"),
  serviceCharge: yup
    .number()
    .min(0, "Service charge must be a positive number")
    .required("Service charge is required"),
  discount: yup
    .number()
    .min(0, "Discount must be a positive number")
    .required("Discount is required"),
  discountType: yup
    .string()
    .oneOf(
      ["percentage", "fixed"],
      "Discount type must be either 'percentage' or 'fixed'"
    )
    .required("Discount type is required"),
  listedProducts: yup
    .array()
    .of(
      yup.object().shape({
        quantityListed: yup
          .number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        productId: yup.number().required("Product ID is required")
      })
    )
    .min(1, "At least one product must be listed"),
  customerId: yup.number().required("Customer ID is required")
});

export type ISchema = yup.InferType<typeof schema> & {
  listedProducts:
    | {
        quantityListed: number;
        productId: number;
      }[]
    | undefined;
};

const defaultInvoiceValues: ISchema = {
  code: "",
  description: "",
  dueDate: "",
  tax: 0,
  serviceCharge: 0,
  discount: 0,
  discountType: "percentage",
  listedProducts: [{ quantityListed: 1, productId: 0 }],
  customerId: 0
};

const CreateInvoice = ({
  onClose,
  isOpen
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // Fetch customers and products from the store
  const customers = useAppSelector((state) => state.customers.all.data);
  const products = useAppSelector((state) => state.products.all.data);

  const rhf = useForm<ISchema>({
    defaultValues: defaultInvoiceValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control: rhf.control,
    name: "listedProducts"
  });

  const onSubmit: SubmitHandler<ISchema> = async (data) => {
    setLoading(true);
    try {
      alert(
        JSON.stringify(
          {
            ...data,
            dueDate: new Date(data.dueDate)
          },
          null,
          2
        )
      );
      toast.success("Invoice created successfully");
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
          <DrawerHeader>Create Invoice</DrawerHeader>

          <DrawerBody>
            <Stack h="100%" justifyContent={"space-between"}>
              <Stack spacing={"4"}>
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
                      name="code"
                      label="Invoice No"
                      control={rhf.control}
                      isInvalid={Boolean(rhf.formState.errors?.code)}
                      helperText={rhf.formState.errors?.code?.message}
                      placeholder="INV-004"
                    />
                  </GridItem>
                  <GridItem>
                    <RhfInput
                      type="date"
                      name="dueDate"
                      label="Due Date"
                      control={rhf.control}
                      isInvalid={Boolean(rhf.formState.errors?.dueDate)}
                      helperText={rhf.formState.errors?.dueDate?.message}
                    />
                  </GridItem>
                </Grid>

                <RhfTextarea
                  name="description"
                  label="Description"
                  control={rhf.control}
                  helperText={rhf.formState.errors?.description?.message}
                  placeholder="Invoice for purchase of office supplies"
                />
                <Stack direction="row" spacing="4" alignItems="center">
                  <RhfInput
                    type="number"
                    name="tax"
                    label="Tax"
                    control={rhf.control}
                    isInvalid={Boolean(rhf.formState.errors?.tax)}
                    helperText={rhf.formState.errors?.tax?.message}
                    placeholder="3"
                  />

                  <RhfInput
                    type="number"
                    name="serviceCharge"
                    label="Service Charge"
                    control={rhf.control}
                    isInvalid={Boolean(rhf.formState.errors?.serviceCharge)}
                    helperText={rhf.formState.errors?.serviceCharge?.message}
                    placeholder="5"
                  />
                </Stack>

                <Stack direction="row" spacing="4" alignItems="center">
                  <RhfInput
                    type="number"
                    name="discount"
                    label="Discount"
                    control={rhf.control}
                    isInvalid={Boolean(rhf.formState.errors?.discount)}
                    helperText={rhf.formState.errors?.discount?.message}
                    placeholder="10"
                  />

                  <RhfSelect
                    name="discountType"
                    label="Discount Type"
                    control={rhf.control}
                    helperText={rhf.formState.errors?.discountType?.message}
                    placeholder="Select discount type"
                    options={[
                      { value: "percentage", label: "Percentage" },
                      { value: "fixed", label: "Fixed Amount" }
                    ]}
                  />
                </Stack>

                {/* Customer ID Dropdown */}
                <RhfSelect
                  name="customerId"
                  label="Customer ID"
                  control={rhf.control}
                  helperText={rhf.formState.errors?.customerId?.message}
                  placeholder="Select Customer"
                  options={customers.map((customer) => ({
                    value: customer.id,
                    label:
                      customer.type === "individual"
                        ? `${customer.firstName} ${customer.lastName}`
                        : customer.name
                  }))}
                />

                {fields.map((field, index) => (
                  <Stack
                    key={field.id}
                    direction="row"
                    spacing="4"
                    alignItems="center"
                  >
                    {/* Product ID Dropdown */}
                    <RhfSelect
                      name={`listedProducts.${index}.productId`}
                      label={`Product ID #${index + 1}`}
                      control={rhf.control}
                      helperText={
                        rhf.formState.errors?.listedProducts?.[index]?.productId
                          ?.message
                      }
                      placeholder="Select Product"
                      options={products.map((product) => ({
                        value: product.id,
                        label: product.name // Assuming product has a name field
                      }))}
                    />
                    <RhfInput
                      type="number"
                      name={`listedProducts.${index}.quantityListed`}
                      label={`Quantity Listed #${index + 1}`}
                      control={rhf.control}
                      isInvalid={Boolean(
                        rhf.formState.errors?.listedProducts?.[index]
                          ?.quantityListed
                      )}
                      helperText={
                        rhf.formState.errors?.listedProducts?.[index]
                          ?.quantityListed?.message
                      }
                      placeholder="1"
                    />
                    <Trash
                      color="red"
                      onClick={() => remove(index)}
                      size={"50px"}
                      className="mt-5"
                    >
                      Remove
                    </Trash>
                  </Stack>
                ))}

                <div
                  className="flex items-center gap-2"
                  onClick={() => append({ quantityListed: 1, productId: 0 })}
                >
                  <Additem />
                  <span>Add Product</span>
                </div>
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter className="items-center">
            <div className="flex items-center justify-end">
              <Button
                colorScheme="red"
                mr={3}
                onClick={onClose}
                variant={"outline"}
              >
                Close
              </Button>{" "}
              <Button
                colorScheme="teal"
                isLoading={loading}
                onClick={rhf.handleSubmit(onSubmit)}
              >
                Create Invoice
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {loading && <Loading />}
    </>
  );
};

export default CreateInvoice;
