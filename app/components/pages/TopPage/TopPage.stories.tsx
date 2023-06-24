import type { Meta, StoryObj } from '@storybook/react';
import { TopPage } from './TopPage';

const meta = {
  title: 'TopPage',
  component: TopPage,
} satisfies Meta<typeof TopPage>;

export default meta;
type T = typeof TopPage;
type Story = StoryObj<T>;

export const Default: Story = {
  };