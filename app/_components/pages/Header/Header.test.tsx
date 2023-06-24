import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Header.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Header with default args', () => {
  render(<Default />);
});
