import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  GridItem,
  Stack
} from "@chakra-ui/react";
import RhfSelect from "views/components/select/rhf-select";
import { Option } from "views/components/dropdown";
import Upload from "views/components/upload/upload";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { DEFAULT_ERROR_MESSAGE } from "data/config";
import businessService from "data/services/business.service";
import { fetchBusiness } from "data/store/action-creators/business";

const schema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  description: yup.string().min(3).required(),
  sector: yup.string().required(),
  bvn: yup.string().min(9).required()
});

type ISchema = yup.InferType<typeof schema>;

const sectorOptions: Option[] = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "energy", label: "Energy" },
  { value: "transportation", label: "Transportation and Logistics" },
  { value: "hospitality", label: "Hospitality and Tourism" },
  { value: "real_estate", label: "Real Estate" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "agriculture", label: "Agriculture" },
  { value: "media", label: "Media" },
  { value: "professional_services", label: "Professional Services" },
  { value: "sports", label: "Sports" }
  // Add more options here
];

let docSchema = yup.object({
  logo: yup.string().url().required(),
  certificateOfRegistration: yup.string().url().required(),
  proof_of_address: yup.string().url().required()
});

type Doc = yup.InferType<typeof docSchema>;

export type CreateOrUpdateBusinessBody = ISchema &
  Doc & { isCorporateAffair: string };

export default function BusinessInfo({ onNext }: { onNext: () => void }) {
  //
  const business = useAppSelector((state) => state.business.data);
  const dispatch = useAppDispatch();

  const defaultValues: ISchema = business
    ? {
        name: business.name,
        email: business.email,
        bvn: business.kyc.bvn,
        description: business.description,
        sector: business.sector
      }
    : {
        name: "",
        email: "",
        bvn: "",
        description: "",
        sector: ""
      };

  // rhf form
  const rhf = useForm<ISchema>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const sector = rhf.watch("sector");

  // form and error state
  const [state, setState] = useState<Doc & { isCorporateAffair: boolean }>({
    logo: business?.logo || "",
    certificateOfRegistration: business?.kyc?.certificate_of_registration || "",
    proof_of_address: business?.kyc?.proof_of_address || "",
    isCorporateAffair: !!business?.is_corporate_affairs
  });

  const [errors, setErrors] = useState<Doc>({
    logo: "",
    certificateOfRegistration: "",
    proof_of_address: ""
  });

  //   input change handlers
  const onImageUploadHandler = (key: string, image: string) => {
    setState((prevState) => ({ ...prevState, [key]: image }));
  };

  const onImageRemoveHandler = (key: string, image: string) => {
    setState((prevState) => ({ ...prevState, [key]: image }));
  };

  const onCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState((prevState) => ({ ...prevState, [name]: checked }));
  };

  // validation and submission
  const validateDocuments = async () => {
    try {
      Object.keys(errors).map((key) => {
        setErrors((prev) => ({
          ...prev,
          [key]: ""
        }));
      });

      const parsedDoc = await docSchema.validate(state, {
        strict: true,
        abortEarly: false
      });

      return { error: false, data: parsedDoc };
    } catch (error) {
      const err = error as yup.ValidationError;
      err.inner.map((innerErr) => {
        setErrors((prev) => ({
          ...prev,
          [innerErr.path as string]: innerErr.message
        }));
      });
      return { error: true };
    }
  };

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ISchema> = async (data) => {
    try {
      setLoading(true);
      const { error, data: docData } = await validateDocuments();
      if (error || !docData) return;

      let message: string;
      const body = {
        ...docData,
        ...data,
        isCorporateAffair: `${state.isCorporateAffair}`
      };

      if (business) {
        console.log("@update");
        const res = await businessService.updateBusiness(body);
        message = res.message;
      } else {
        console.log("@create");
        const res = await businessService.createBusiness(body);
        message = res.message;
      }
      toast.success(message);
      dispatch(fetchBusiness());
      setLoading(false);
      onNext();
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message || DEFAULT_ERROR_MESSAGE;
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <form>
      <Stack gap="2">
        <Grid
          gap="2"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)"
          ]}
        >
          <GridItem>
            <RhfInput
              type="text"
              name="name"
              label="Name"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.name)}
              helperText={rhf.formState.errors?.name?.message}
            />
          </GridItem>
          <GridItem>
            <RhfInput
              type="text"
              name="email"
              label="Email"
              control={rhf.control}
              isInvalid={Boolean(rhf.formState.errors?.email)}
              helperText={rhf.formState.errors?.email?.message}
            />
          </GridItem>
        </Grid>

        <RhfTextarea
          name="description"
          label="Description"
          control={rhf.control}
          helperText={rhf.formState.errors?.description?.message}
        />

        <Grid
          gap="2"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)"
          ]}
        >
          <GridItem>
            <RhfSelect
              name="sector"
              label="Sector"
              maxMenuHeight={300}
              control={rhf.control}
              options={sectorOptions}
              value={{
                value: sector,
                label: sector
              }}
              helperText={rhf.formState.errors?.sector?.message}
            />
          </GridItem>
          <GridItem>
            <Center h="100%">
              <Checkbox
                isChecked={state.isCorporateAffair}
                name="isCorporateAffair"
                onChange={onCheckedChange}
                colorScheme="primary"
              >
                Corporate Affair?
              </Checkbox>
            </Center>
          </GridItem>
        </Grid>

        <RhfInput
          type="text"
          name="bvn"
          label="BVN"
          control={rhf.control}
          isInvalid={Boolean(rhf.formState.errors?.bvn)}
          helperText={rhf.formState.errors?.bvn?.message}
        />

        <Box py="2">
          <Upload
            uploadKey={"logo"}
            title="Logo"
            value={state.logo}
            onCurrentImageChange={onImageUploadHandler}
            handleRemove={onImageRemoveHandler}
            error={errors.logo}
          />
        </Box>

        <Box py="2">
          <Upload
            uploadKey={"certificateOfRegistration"}
            title="Certificate of Registration"
            value={state.certificateOfRegistration}
            onCurrentImageChange={onImageUploadHandler}
            handleRemove={onImageRemoveHandler}
            error={errors.certificateOfRegistration}
          />
        </Box>

        <Box py="2">
          <Upload
            uploadKey={"proof_of_address"}
            title="Proof of Address"
            value={state.proof_of_address}
            onCurrentImageChange={onImageUploadHandler}
            handleRemove={onImageRemoveHandler}
            error={errors.proof_of_address}
          />
        </Box>

        <Button
          height={[12, 14]}
          colorScheme="primary"
          onClick={rhf.handleSubmit(onSubmit)}
          isLoading={loading}
        >
          Next
        </Button>
      </Stack>
    </form>
  );
}
