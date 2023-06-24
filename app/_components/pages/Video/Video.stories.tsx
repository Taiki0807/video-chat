import type { Meta, StoryObj } from '@storybook/react';
import { Video } from './Video';

const meta = {
  title: 'Video',
  component: Video,
} satisfies Meta<typeof Video>;

export default meta;
type T = typeof Video;
type Story = StoryObj<T>;

export const Default: Story = {};
