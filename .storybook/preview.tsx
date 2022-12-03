import React from 'react';

import { globalStyles, ThemeProvider } from '../src';

export const decorators = [
  (Story) => {
    globalStyles();
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
