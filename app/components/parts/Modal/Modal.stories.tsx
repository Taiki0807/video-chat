import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type T = typeof Modal;
type Story = StoryObj<T>;

const ButtonWithHooks = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <button onClick={handleClick}>Open Modal</button>
      <Modal open={open} onClose={handleClose}>
        Modal
      </Modal>
    </div>
  );
};
export const Default: Story = {
  render: () => <ButtonWithHooks />,
};
