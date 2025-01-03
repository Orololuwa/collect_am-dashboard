import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "views/components/button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  component: Button
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  variant: "primary",
  children: "primary"
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "secondary"
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  children: "large"
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  children: "small"
};

export const Submit = Template.bind({});
Submit.args = {
  type: "submit",
  children: "submit",
  size: "medium"
};

export const Outline = Template.bind({});
Outline.args = {
  outline: true,
  children: "Outline"
};
