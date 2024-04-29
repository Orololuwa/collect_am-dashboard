import { ComponentStory, ComponentMeta } from "@storybook/react";
import InputBlock from "views/components/input/inputBlock";
export default {
  title: "Components/Input/block",
  component: InputBlock
} as ComponentMeta<typeof InputBlock>;

const Template: ComponentStory<typeof InputBlock> = (args) => (
  <InputBlock {...args} />
);

export const search = Template.bind({});

search.args = {
  type: "search",
  bg: true
};
