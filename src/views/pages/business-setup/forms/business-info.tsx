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

interface ISchema {
  name: string;
  email: string;
  description: string;
  sector: string;
  bvn: string;
}

const schema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  description: yup.string().min(3).required(),
  sector: yup.string().required(),
  bvn: yup.string().min(9).required()
});

const defaultValues: ISchema = {
  name: "",
  email: "",
  bvn: "",
  description: "",
  sector: ""
};

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

export default function BusinessInfo() {
  // rhf form
  const rhf = useForm<ISchema>({
    defaultValues,
    mode: "all",
    resolver: yupResolver(schema)
  });

  const sector = rhf.watch("sector");

  const onSubmit: SubmitHandler<ISchema> = async (data) => {
    try {
      const { error, data: docData } = await validateDocuments();
      if (error) return;
      console.log({ ...data, ...docData });
    } catch (error) {}
  };

  // form state
  const [state, setState] = useState<Doc & { isCorporateAffair: boolean }>({
    logo: "",
    certificateOfRegistration: "",
    proof_of_address: "jdfl",
    isCorporateAffair: false
  });

  const [errors, setErrors] = useState<Doc>({
    logo: "",
    certificateOfRegistration: "",
    proof_of_address: ""
  });

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
        >
          Next
        </Button>
      </Stack>
    </form>
  );
}
