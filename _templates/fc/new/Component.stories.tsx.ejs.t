---
to: <%= path %>/<%= name %>.stories.tsx
unless_exists: true
---
import type { Meta, StoryObj } from '@storybook/react';
import { <%= name %> } from './<%= name %>';

const meta = {
  title: '<%= name %>',
  component: <%= name %>,
} satisfies Meta<typeof <%= name %>>;

export default meta;
type T = typeof <%= name %>;
type Story = StoryObj<T>;

export const Default: Story = {
  <% if (have_props) { -%>
  args: {},
  <% } -%>
};