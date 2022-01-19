import React from "react";
// import { withDesign } from "storybook-addon-designs";

import "chart.js/auto";
import BarChartjs from "./Bar";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import  barData from "../../data/bar-data.json";

const labels = barData?.durationData?.weekly_data.map((d) => d.week);
const defaultData = {
  label: "Weekly energy consumption",
  // data: [65, 59, 80, 81, 56, 55, 40],
  data: barData?.durationData?.weekly_data.map((d) => d.value),
  backgroundColor: [
    "#D5D8DA",
    "#D5D8DA",
    "#D5D8DA",
    "#D5D8DA",
    "#F0CB2F"
   
  ],
  borderColor: [
    "#D5D8DA",
    "#D5D8DA",
    "#D5D8DA",
    "#D5D8DA",
    "#F0CB2F"
  ],
  borderWidth: 1,
};
console.log('barData', barData);
const data = {
  labels: labels,
  // data: barData?.durationData?.weekly_data
  datasets: [
    defaultData
  ],
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const options = {
    responsive: true,
    // aspectRatio: 1,
    maintainAspectRatio: false,
    plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export default {
  title: "Chartjs/Bar",
  component: BarChartjs,
  parameters: {
    layout: "centered",
  },
  // args: {
  //   width: 500,
  //   height: 400,
  // },
};

const Template = (args) => <BarChartjs {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Bar",
  options: options,
  data,
  // stroke: "#269AF4",
  // fill: "#727f84",
  // strokeDasharray: "5 5",
  // textAnchor: "end",
  // referenceLabelBg: "#269AF4",
};

export const Secondary = Template.bind({});
Secondary.args = { ...Primary.args, label: "😄👍😍💯" };

export const Tertiary = Template.bind({});
Tertiary.args = { ...Primary.args, label: "📚📕📈🤓" };
// export const Vertical = args => <Bar {...args} />;

// Vertical.args = {
//   data: verticalBar.data,
//   options: verticalBar.options,
// };

// export const Horizontal = args => <Bar {...args} />;

// Horizontal.args = {
//   data: horizontalBar.data,
//   options: horizontalBar.options,
// };

// export const Stacked = args => <Bar {...args} />;

// Stacked.args = {
//   data: stackedBar.data,
//   options: stackedBar.options,
// };

// export const Grouped = args => <Bar {...args} />;

// Grouped.args = {
//   data: groupedBar.data,
//   options: groupedBar.options,
// };
