import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Modal.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Modal with default args', () => {
  render(<Default />);
});
