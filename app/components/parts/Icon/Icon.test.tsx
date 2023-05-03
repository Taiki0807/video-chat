import { composeStories } from '@storybook/react';
import { render } from '@testing-library/react';
import * as stories from './Icon.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories);

test('render Icon with default args', () => {
  render(<Default />);
});
