import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Video.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Video with default args', () => {
  render(<Default />);
});
