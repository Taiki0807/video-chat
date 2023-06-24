import type { Meta, StoryObj } from '@storybook/react';
import { FaGithub } from 'react-icons/fa';
import { Icon } from './Icon';

const meta = {
  title: 'Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <div style={{ width: '100px', height: '100px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Icon>;

export default meta;
type T = typeof Icon;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    color: 'black',
    children: <FaGithub size={90} />,
    name: 'github',
    url: 'https://github.com/Taiki0807',
  },
};
