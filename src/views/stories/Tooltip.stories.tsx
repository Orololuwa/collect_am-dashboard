import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tooltip from "views/components/tooltip";

export default {
  title: "Components/tooltip",
  component: Tooltip
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div className="flex items-center justify-center h-fit w-full p-10">
    <Tooltip {...args} />
  </div>
);

export const link = Template.bind({});

link.args = {
  children: "Hover me",
  overlay: "tooltip",
  colorMode: "dark"
};
