import { ComponentStory, ComponentMeta } from "@storybook/react";

import { IconButton } from "views/components/button";
import { IoTrashBinOutline } from "react-icons/io5";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button/icons",
  component: IconButton
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof IconButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
);

export const Icon = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Icon.args = {
  icon: <IoTrashBinOutline size={20} />
};
