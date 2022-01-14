import React from "react";
import { withDesign } from "storybook-addon-designs";

import { BarRechart } from "./Bar";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "recharts/Bar",
  component: BarRechart,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
    stroke: { control: "color" },
    referenceLabelBg: { control: "color" },
  },
  decorators: [withDesign],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/MeXvqDkYpCGU4D4SXQgxCO/App-UI-Dashboard",
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BarRechart {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Bar",
  stroke: "#269AF4",
  fill: "#727f84",
  strokeDasharray: "5 5",
  textAnchor: "end",
  referenceLabelBg: "#269AF4",
};

export const ReferenceLine = Template.bind({});
ReferenceLine.args = {
  barLabel: true,
  referenceLine: true,
  referenceLabel: "avg.",
  referenceLabelBg: "#269AF4",
  referenceLineDirection: "horizontal",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/MeXvqDkYpCGU4D4SXQgxCO/App-UI-Dashboard?node-id=4647%3A39682",
    },
  },
};

export const HorizontalGrid = Template.bind({});
HorizontalGrid.args = {
  showGrid: true,
  gridHorizontal: true,
  gridVertical: false,
};

export const VerticalGrid = Template.bind({});
VerticalGrid.args = {
  showGrid: true,
  gridHorizontal: false,
  gridVertical: true,
};

export const BarLabel = Template.bind({});
BarLabel.args = {
  barLabel: true,
};

export const LolipopBar = Template.bind({});
LolipopBar.args = {
  lolipopBar: true,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  toolTip: true,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  barLabel: true,
  referenceLine: true,
  lolipopBar: false,
  toolTip: true,
  referenceLabel: "avg.",
  referenceLabelBg: "#269AF4",
  referenceLineDirection: "horizontal",
  showGrid: true,
  gridHorizontal: true,
  gridVertical: true,
};
