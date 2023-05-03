import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './Button.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Button with default args', () => {
  render(<Default>Button</Default>);
  const ButtonElement = screen.getByText(/Button/i);
  expect(ButtonElement).toBeInTheDocument();
});
