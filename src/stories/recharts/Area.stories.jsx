import React from 'react';

import { AreaRechart } from './Area';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'recharts/Area',
  component: AreaRechart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    stroke: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <AreaRechart {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Area',
  stroke: "#269AF4",
  fill: "#727f84",
  strokeDasharray: "5 5",
  textAnchor: "end"
};

export const ReferenceLine = Template.bind({});
ReferenceLine.args = {
  referenceLine: true,
  referenceLabel: 'Ave.',
  referenceLineDirection: 'vertical'
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };

// export const Icon = Template.bind({});
// Icon.args = {
//   label: 'Button',
//   icon: <ThreeDRotation />,
// };
