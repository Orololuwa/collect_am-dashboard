import { ComponentStory, ComponentMeta } from "@storybook/react";
import Link from "views/components/link";

export default {
  title: "Components/link",
  component: Link
} as ComponentMeta<typeof Link>;

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />;

const TemplateNavLink: ComponentStory<typeof Link> = (args) => (
  <div className="bg-gray-900 px-4 w-fit">
    <Link {...args} />
  </div>
);

export const link = Template.bind({});

link.args = {
  to: "/link",
  children: "Link"
};

export const navLink = TemplateNavLink.bind({});

navLink.args = {
  to: "/link",
  children: "navLink",
  navlink: true
};
