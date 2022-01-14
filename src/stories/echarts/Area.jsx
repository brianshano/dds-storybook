import React, { useRef, useEffect, CSSProperties } from "react";

import PropTypes from "prop-types";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import { init, getInstanceByDom } from "echarts";
import { EChartsOption, ECharts, SetOptionOpts } from "echarts";

// import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";

import "./area.css";

// export interface AreaEchartsProps {
//   option: EChartsOption;
//   style?: CSSProperties;
//   settings?: SetOptionOpts;
//   loading?: boolean;
//   theme?: "light" | "dark";
// }

/**
 * Primary UI component for user interaction
 */
export function AreaEcharts({ option, style, settings, loading, theme }) {
  const chartRef = useRef(null);
  // const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  const data = [
    { name: "Page A", uv: 300, pv: 2100, amt: 1400 },
    { name: "Page B", uv: 440, pv: 2300, amt: 1300 },
    { name: "Page C", uv: 100, pv: 2900, amt: 2000 },
  ];
  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {},
      },
    ],
  };

  useEffect(() => {
    // Initialize chart
    let chart;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart.showLoading() : chart.hideLoading();
    }
  }, [loading, theme]);
  return <div ref={chartRef} style={{ width: "100%", height: "100px", ...style }} />;
}
