import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputAuth from "views/components/input/InputAuth";
export default {
  title: "Components/Input/Auth",
  component: InputAuth
} as ComponentMeta<typeof InputAuth>;

const Template: ComponentStory<typeof InputAuth> = (args) => (
  <InputAuth {...args} />
);

export const email = Template.bind({});

email.args = {
  type: "text",
  placeholder: "Email"
};

export const password = Template.bind({});

password.args = {
  type: "password",
  placeholder: "Password",
  passwordVisibilityIcons: true
};
