import Helmet from "views/components/helmet";
import { Link as HomeLink } from "react-router-dom";
import { PayloadAction } from "@reduxjs/toolkit";
import { useReducer } from "react";
import BusinessInfo from "./forms/business-info";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text
} from "@chakra-ui/react";
import { useLogoutFunction } from "app/hooks/use-logout";

interface ReducerState {
  step: number;
}

enum ActionTypes {
  RESET_ALL = "reset_all",
  RESET_STEP = "reset_step",
  STEP_FORWARD = "step_forward",
  STEP_BACKWARD = "step_backward",
  STEP_JUMP = "step-jump"
}

const BusinessSetup = (): JSX.Element => {
  //
  const { logoutHandler } = useLogoutFunction();

  //
  const initialState: ReducerState = {
    step: 0
  };

  const reducer = (
    state: ReducerState,
    action: PayloadAction<unknown>
  ): ReducerState => {
    let { type, payload } = action;

    switch (type) {
      case ActionTypes.RESET_ALL:
        return initialState;

      case ActionTypes.RESET_STEP:
        return {
          ...state,
          step: 0
        };

      case ActionTypes.STEP_FORWARD:
        return {
          ...state,
          step: (state.step += 1)
        };

      case ActionTypes.STEP_BACKWARD:
        return {
          ...state,
          step: Math.max((state.step -= 1), 0)
        };

      case ActionTypes.STEP_JUMP:
        return {
          ...state,
          step: payload as number
        };

      default:
        return { ...state };
    }
  };

  const [state, dispatchReducer] = useReducer(reducer, initialState);

  const steps = [
    {
      title: "Business Info",
      description: "Business Info",
      stepIndicator: <div>i</div>,
      formComponent: (
        <BusinessInfo
          onNext={() =>
            dispatchReducer({
              type: ActionTypes.STEP_JUMP,
              payload: 1
            })
          }
        />
      )
    },
    {
      title: "Business Address",
      description: "Business Address",
      stepIndicator: <div>a</div>,
      formComponent: <div>form 2</div>
    },
    {
      title: "Other Info",
      description: "Others",
      stepIndicator: <div>o</div>,
      formComponent: <div>form 3</div>
    }
  ];

  return (
    <>
      <Helmet pageTitle="Add Business - Collectam" />
      <Grid
        h="100vh"
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "35% 65%",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)"
        ]}
      >
        <GridItem
          className="hidden md:flex flex-col justify-between basis-1/2 h-full w-full p-8 grow"
          style={{
            background:
              "linear-gradient(160.03deg, rgba(27, 33, 36, 0.3) 19.78%, rgba(249, 180, 16, 0.3) 84.76%), url(https://res.cloudinary.com/afara-partners-limited/image/upload/v1653657895/collectam/Artboard_3_1_ryouyw.png)",
            backgroundPosition: "center"
          }}
        >
          <HomeLink to="/">
            <img
              src="https://res.cloudinary.com/afara-partners-limited/image/upload/v1653472305/collectam/logo-single_qye6oz.png"
              alt="hero"
              className="w-10"
            />
          </HomeLink>
          <h6>&copy;Copyright 2022. Made by CollectAm</h6>
        </GridItem>
        <GridItem className="p-4 h-full basis-1/2 md:p-8 md:basis-full grow">
          <Heading
            fontSize={"2xl"}
            pb="5"
            as={Flex}
            justifyContent={"space-between"}
          >
            Business Setup
            <Text
              color={"red"}
              fontSize={"small"}
              fontWeight={"400"}
              cursor={"pointer"}
              _hover={{
                textDecoration: "underline"
              }}
              onClick={logoutHandler}
            >
              Logout
            </Text>
          </Heading>
          <Stepper size="md" index={state.step} colorScheme="primary">
            {steps.map((step, index) => (
              <Step
                key={index}
                onClick={() =>
                  dispatchReducer({
                    type: ActionTypes.STEP_JUMP,
                    payload: index
                  })
                }
              >
                <Stack position={"relative"}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box
                    flexShrink="0"
                    position={"absolute"}
                    top={"10"}
                    left={
                      index === 0
                        ? "0%"
                        : index === steps.length - 1
                        ? "-100%"
                        : "-50%"
                    }
                    textAlign={
                      index === 0
                        ? "left"
                        : index === steps.length - 1
                        ? "right"
                        : "center"
                    }
                    w="max-content"
                  >
                    <StepTitle>{step.title}</StepTitle>
                  </Box>
                </Stack>

                <StepSeparator />
              </Step>
              // <Stack key={index} alignItems={"center"}>
              //   <Center
              //     // variant={state.step >= index ? "solid" : "outlined"}
              //     boxSize={"10"}
              //     backgroundColor={
              //       state.step > index
              //         ? "success.300"
              //         : state.step === index
              //         ? "primary.300"
              //         : "gray.300"
              //     }
              //     rounded={"100%"}
              //   >
              //     {step.stepIndicator}
              //   </Center>
              //   <Button
              //     onClick={() =>
              //       dispatchReducer({
              //         type: ActionTypes.STEP_JUMP,
              //         payload: index
              //       })
              //     }
              //   >
              //     {step.title}
              //   </Button>
              // </Stack>
            ))}
          </Stepper>
          <div className="md:h-ful gap-2 mt-20">
            {steps[state.step].formComponent}
          </div>
        </GridItem>
      </Grid>
    </>
  );
};

export default BusinessSetup;
