import React from "react";
import { withDesign } from "storybook-addon-designs";

import { BarRechart } from "./Bar";
import data from "../../data/bar-data.json";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "recharts/Bar",
  component: BarRechart,
  data: data?.durationData?.weekly_data,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
    stroke: { control: "color" },
    referenceLabelBg: { control: "color" },
    data: data?.durationData?.weekly_data,
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
  data: data?.durationData?.weekly_data,
  label: "Bar1",
  stroke: "#269AF4",
  fill: "#727f84",
  strokeDasharray: "5 5",
  textAnchor: "end",
  referenceLabelBg: "#269AF4",
};

export const ReferenceLine = Template.bind({});
ReferenceLine.args = {
  ...Primary.args,
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
  ...Primary.args,
  showGrid: true,
  gridHorizontal: true,
  gridVertical: false,
};

export const VerticalGrid = Template.bind({});
VerticalGrid.args = {
  ...Primary.args,
  showGrid: true,
  gridHorizontal: false,
  gridVertical: true,
};

export const BarLabel = Template.bind({});
BarLabel.args = {
  ...Primary.args,
  barLabel: true,
};

export const LolipopBar = Template.bind({});
LolipopBar.args = {
  ...Primary.args,
  lolipopBar: true,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Primary.args,
  toolTip: true,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  ...Primary.args,
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
