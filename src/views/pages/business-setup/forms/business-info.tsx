import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import RhfInput, { RhfTextarea } from "views/components/input/rhf-input";
import { Button, Center, Checkbox, Grid, GridItem } from "@chakra-ui/react";
import RhfSelect from "views/components/select/rhf-select";
import { Option } from "views/components/dropdown";

interface ISchema {
  name: string;
  email: string;
  description: string;
  sector: string;
  isCorporateAffair: boolean;
  logo: string;
  certificateOfRegistration: string;
  proof_of_address: string;
  bvn: string;
}

const schema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  description: yup.string().min(3).required(),
  sector: yup.string().min(3).required(),
  isCorporateAffair: yup.boolean().required(),
  logo: yup.string().url().required(),
  certificateOfRegistration: yup.string().url().required(),
  proof_of_address: yup.string().url().required(),
  bvn: yup.string().min(9).required()
});

const defaultValues: ISchema = {
  name: "",
  email: "",
  bvn: "",
  certificateOfRegistration: "",
  description: "",
  isCorporateAffair: false,
  logo: "",
  proof_of_address: "",
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

export default function BusinessInfo() {
  const rhf = useForm<ISchema>({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const sector = rhf.watch("sector");

  const onSubmit: SubmitHandler<ISchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={rhf.handleSubmit(onSubmit)}>
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
          />
        </GridItem>
        <GridItem>
          <Center h="100%">
            <Checkbox defaultChecked colorScheme="primary">
              Corporate Affair?
            </Checkbox>
          </Center>
        </GridItem>
      </Grid>

      <Button type="submit" height={[12, 14]} colorScheme="primary">
        Next
      </Button>
    </form>
  );
}
