---
to: <%= path %>/<%= name %>.test.tsx
unless_exists: true
---
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './<%= name %>.stories';
import '@testing-library/jest-dom';

const { Default } = composeStories(stories)

test('render <%= name %> with default args', () => {
  render(<Default><%= name %></Default>);
  const <%= name %>Element = screen.getByText(/<%= name %>/i);
  expect(<%= name %>Element).toBeInTheDocument();
})