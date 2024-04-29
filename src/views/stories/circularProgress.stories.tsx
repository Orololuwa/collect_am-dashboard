import { ComponentStory, ComponentMeta } from "@storybook/react";
import CircularProgress from "views/components/widgets/cicularProgress";
import { colors } from "app/theme";

export default {
  title: "Components/widgets",
  component: CircularProgress
} as ComponentMeta<typeof CircularProgress>;

const Template: ComponentStory<typeof CircularProgress> = (args) => (
  <CircularProgress {...args} />
);

export const circularProgress = Template.bind({});

circularProgress.args = {
  color: colors.main.primary[400],
  progress: 75,
  children: '75%'
};
