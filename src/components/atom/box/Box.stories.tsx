import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Box from '.';

export default {
  /* ๐ The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atom/Box',
  component: Box,
} as ComponentMeta<typeof Box>;

//๐ We create a โtemplateโ of how args map to rendering
const Template: ComponentStory<typeof Box> = (args) => (
  <Box {...args}>TEST</Box>
);

//๐ Each story then reuses that template
export const Primary = Template.bind({});
