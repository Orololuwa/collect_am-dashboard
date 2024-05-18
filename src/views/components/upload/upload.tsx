import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Progress,
  Stack,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { CloseCircle, ExportCurve } from "iconsax-react";
import React, { useState } from "react";
import cloudUploadService from "data/services/cloud-upload.service";
import Show from "../show";
import { ICloundineryUpload } from "app/types/cloud-upload";

interface IUpload {
  uploadKey: string;
  value: string;
  onCurrentImageChange: (key: string, image: string) => void;
  title: string;
  handleRemove: (key: string, image: string) => void;
  error?: string;
}

const Upload = ({
  uploadKey,
  title,
  value,
  onCurrentImageChange,
  handleRemove,
  error
}: IUpload) => {
  const [isLoading, setLoading] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const preset_key = process.env.REACT_APP_CLOUDINERY_PRESET_KEY as string;
  const cloud_name = process.env.REACT_APP_CLOUDINERY_CLOUD_NAME as string;

  const [resState, setResState] = useState<ICloundineryUpload | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!preset_key && !cloud_name) return;

    setLoading(true);
    const files = event?.target.files;

    if (!files?.length) return;

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    try {
      const response = await cloudUploadService.cloudineryUpload(
        cloud_name,
        formData
      );
      onCurrentImageChange(uploadKey, response.secure_url);
      setResState(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // Reset the input by forcing a new one
    setInputKey((key) => key + 1);
  };

  return (
    <Box gap={"5"}>
      <FormControl>
        <Show iff={!value}>
          <Stack flexGrow={"1"}>
            <Box flexBasis="60%">
              <Center w="full" h="full">
                <FormLabel
                  px="2"
                  py="5"
                  m="0"
                  w="full"
                  display="flex"
                  cursor="pointer"
                  fontSize={"sm"}
                  alignItems="center"
                  justifyContent={"center"}
                  borderRadius="6"
                  borderWidth={"2px"}
                  borderColor={useColorModeValue("gray.200", "whiteAlpha.300")}
                  borderStyle={"dashed"}
                  _disabled={{ bgColor: "gray.200" }}
                  htmlFor={uploadKey}
                  textAlign={"center"}
                  overflow="clip"
                  position={"relative"}
                >
                  <Stack spacing={"2"} alignItems="center">
                    <Text fontWeight={"bold"}>{title}</Text>
                    <Icon as={ExportCurve} color="primary.500" boxSize={"5"} />
                    <Text>Tap to upload document</Text>
                  </Stack>
                  {
                    // loadingUpload ||
                    isLoading ? (
                      <Progress
                        size="xs"
                        isIndeterminate
                        w="full"
                        position={"absolute"}
                        bottom="0"
                        left="0"
                        hasStripe
                        colorScheme={"primary"}
                      />
                    ) : null
                  }
                </FormLabel>
                <Input
                  type="file"
                  display="none"
                  id={uploadKey}
                  name="user-profile"
                  colorScheme="primary"
                  accept="image/png, image/jpeg, application/pdf"
                  multiple
                  onChange={handleFileChange}
                  key={inputKey}
                />
              </Center>
            </Box>
            <Text fontSize={"xs"} fontStyle="italic">
              Accepted formats are jpeg, png and pdf.
            </Text>
          </Stack>
        </Show>
        <Show iff={!!value}>
          <div className="mt-3">
            <div className="flex items-center justify-between p-3 bg-gray-200 rounded-md overflow-x-hidden">
              <a href={value!} target="_blank" className="cursor-pointer">
                <p className="text-gray-900">
                  {resState?.original_filename || title}
                </p>
              </a>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <div
              onClick={() => handleRemove(uploadKey, "")}
              className="flex items-center cursor-pointer"
            >
              <p className="mr-1 text-sm text-primary-900">Remove file</p>
              <CloseCircle
                size="18"
                color="#212327"
                className="cursor-pointer"
              />
            </div>
          </div>
        </Show>
        <Show iff={error}>
          <FormHelperText
            mt={0}
            fontSize={14}
            display="block"
            color="red"
            lineHeight="28px"
            data-cy="select-form-helper-text"
          >
            {error}
          </FormHelperText>
        </Show>{" "}
      </FormControl>
    </Box>
  );
};

export default Upload;
