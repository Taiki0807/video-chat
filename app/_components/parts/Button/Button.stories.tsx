import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type T = typeof Button;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    color: 'danger',
    children: 'Button',
  },
};
export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};
