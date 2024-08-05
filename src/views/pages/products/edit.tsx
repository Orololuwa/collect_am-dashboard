import { useState } from "react";
import Loading from "views/components/loading";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import RhfSelect from "views/components/select/rhf-select";
import { useAppDispatch } from "app/hooks";
import { updateNewProductSession } from "data/store";
import productsService from "data/services/products.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import { productCategories } from "./add";
import { ProductEntity } from "data/store/models/products";

const schema = yup.object({
  name: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  price: yup.number().moreThan(0).required(),
  count: yup.number().min(0).required(),
  category: yup.string().required()
});

type ISchema = yup.InferType<typeof schema>;

const EditProductForm = ({
  isOpen,
  product,
  onClose
}: {
  isOpen: boolean;
  product: ProductEntity | null;
  onClose: () => void;
}) => {
  if (product === null) return null;

  const defaultValues: ISchema = {
    description: product.description,
    name: product.name,
    price: product.price,
    count: product.count,
    category: product.category
  };

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISchema> = async (data) => {
    setLoading(true);
    try {
      const res = await productsService.updateProduct({
        body: { ...data },
        pathVariables: { id: product.id }
      });

      toast.success(res.message);
      setLoading(false);
      onClose();
      dispatch(updateNewProductSession());
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg =
        axiosError.response?.data?.message ||
        (err as any)?.message ||
        DEFAULT_ERROR_MESSAGE;
      toast.error(msg);
      setLoading(false);
    }
  };

  // rhf form
  const rhf = useForm<ISchema>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const category = rhf.watch("category");

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
        <form className="my-10" onSubmit={rhf.handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Edit Product</DrawerHeader>

            <DrawerBody>
              <Stack spacing={"4"}>
                <RhfInput
                  type="text"
                  name="name"
                  label="Name"
                  control={rhf.control}
                  isInvalid={Boolean(rhf.formState.errors?.name)}
                  helperText={rhf.formState.errors?.name?.message}
                />

                <RhfTextarea
                  name="description"
                  label="Description"
                  control={rhf.control}
                  helperText={rhf.formState.errors?.description?.message}
                />

                <RhfSelect
                  name="category"
                  label="Category"
                  maxMenuHeight={300}
                  control={rhf.control}
                  options={productCategories}
                  value={{
                    value: category,
                    label: category
                  }}
                  helperText={rhf.formState.errors?.category?.message}
                />

                <RhfInput
                  type="number"
                  name="price"
                  label="Price"
                  control={rhf.control}
                  isInvalid={Boolean(rhf.formState.errors?.price)}
                  helperText={rhf.formState.errors?.price?.message}
                />

                <RhfInput
                  type="number"
                  name="count"
                  label="Count"
                  control={rhf.control}
                  isInvalid={Boolean(rhf.formState.errors?.count)}
                  helperText={rhf.formState.errors?.count?.message}
                />
              </Stack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="primary" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
      {loading ? <Loading /> : null}
    </>
  );
};

export default EditProductForm;
