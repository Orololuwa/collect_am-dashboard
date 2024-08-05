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
  DrawerOverlay
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import RhfSelect from "views/components/select/rhf-select";
import { Option } from "views/components/dropdown";
import { useAppDispatch } from "app/hooks";
import { updateNewProductSession } from "data/store";
import productsService from "data/services/products.service";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "data/config";

const schema = yup.object({
  name: yup.string().min(3).required(),
  code: yup.string().min(3).required(),
  description: yup.string().min(3).required(),
  price: yup.number().moreThan(0).required(),
  count: yup.number().min(0).required(),
  category: yup.string().required()
});

type ISchema = yup.InferType<typeof schema>;

const defaultValues: ISchema = {
  code: "",
  description: "",
  name: "",
  price: 0,
  count: 0,
  category: ""
};

const productCategories: Option[] = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home_appliances", label: "Home Appliances" },
  { value: "beauty_health", label: "Beauty & Health" },
  { value: "sports", label: "Sports" },
  { value: "automotive", label: "Automotive" },
  { value: "books", label: "Books" },
  { value: "toys", label: "Toys" },
  { value: "grocery", label: "Grocery" },
  { value: "furniture", label: "Furniture" },
  { value: "jewelry", label: "Jewelry" },
  { value: "garden_outdoor", label: "Garden & Outdoor" },
  { value: "baby_products", label: "Baby Products" },
  { value: "pet_supplies", label: "Pet Supplies" },
  { value: "office_supplies", label: "Office Supplies" },
  { value: "software", label: "Software" },
  { value: "music", label: "Music" },
  { value: "movies", label: "Movies" },
  { value: "video_games", label: "Video Games" },
  { value: "art_crafts", label: "Art & Crafts" },
  { value: "travel_accessories", label: "Travel Accessories" },
  { value: "handmade", label: "Handmade" },
  { value: "computers", label: "Computers" },
  { value: "phones_tablets", label: "Phones & Tablets" },
  { value: "kitchen_dining", label: "Kitchen & Dining" },
  { value: "tools", label: "Tools" },
  { value: "watches", label: "Watches" },
  { value: "luggage", label: "Luggage" },
  { value: "gift_cards", label: "Gift Cards" },
  { value: "collectibles", label: "Collectibles" }
];

const AddProductForm = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<ISchema> = async (data) => {
    console.log({ data });
    setLoading(true);
    try {
      const res = await productsService.createProduct({ body: { ...data } });

      toast.success(res.message);
      setLoading(false);
      onClose();
      dispatch(updateNewProductSession());
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || DEFAULT_ERROR_MESSAGE;
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
            <DrawerHeader>Add Product</DrawerHeader>

            <DrawerBody>
              <RhfInput
                type="text"
                name="code"
                label="Product Code"
                control={rhf.control}
                isInvalid={Boolean(rhf.formState.errors?.code)}
                helperText={rhf.formState.errors?.code?.message}
              />

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
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="primary" type="submit">
                Save Product
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
      {loading ? <Loading /> : null}
    </>
  );
};

export default AddProductForm;
