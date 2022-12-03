// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Atoms/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Button</Button>
);

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.args = { variant: 'primary', label: 'Button' };
