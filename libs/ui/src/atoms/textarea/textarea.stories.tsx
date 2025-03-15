import { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Placeholder",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    size: "md",
    error: "Error message",
  },
};
