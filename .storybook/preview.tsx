import React from 'react';

import { globalStyles, SbThemeProvider } from '../src';

export const decorators = [
  (Story) => {
    globalStyles();
    return (
      <SbThemeProvider>
        <Story />
      </SbThemeProvider>
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
  darkMode: {
    // Set the initial theme
    current: 'c1495616js-dark',
  },
};
