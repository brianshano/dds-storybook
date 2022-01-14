import React from 'react';

import { AreaEcharts } from './Area';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//   title: 'echarts/Area',
//   component: AreaEcharts,
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
//   dataset: {
//     source: [
//       { name: "Page A", uv: 300, pv: 2100, amt: 1400 },
//       { name: "Page B", uv: 440, pv: 2300, amt: 1300 },
//       { name: "Page C", uv: 100, pv: 2900, amt: 2000 },
//     ],
//   },
//   tooltip: {
//     trigger: "axis",
//     axisPointer: {
//       type: "shadow",
//     },
//   },
//   legend: {
//     data: ["Owned", "Financed"],
//   },
//   grid: {
//     left: "10%",
//     right: "0%",
//     top: "20%",
//     bottom: "20%",
//   },
//   xAxis: {
//     type: "value",
//   },
//   yAxis: {
//     type: "category",
//     // height: 300,
//   },
//   series: [
//     {
//       data: [820, 932, 901, 934, 1290, 1330, 1320],
//       type: 'line',
//       areaStyle: {}
//     }
//   ]
// };


const options = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  // height: 600,
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => <AreaEcharts option={options} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

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
