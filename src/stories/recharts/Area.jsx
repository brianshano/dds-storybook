import React from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";

import "./area.css";

/**
 * Primary UI component for user interaction
 */
export const AreaRechart = ({ primary, stroke, fill, referenceLine, referenceLabel, referenceLineDirection, ...props }) => {
  console.log('all props passed', props);
  const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const options = {
    title: "Area (time series - natural curve)",
    axes: {
      bottom: {
        title: "2019 Annual Sales Figures",
        mapsTo: "date",
        scaleType: "time",
      },
      left: {
        mapsTo: "value",
        scaleType: "linear",
      },
    },
    curve: "curveNatural",
    height: 300,
  };

  return (
    <>
      {/* <button
      type="button"
      className={["storybook-button", `storybook-button--${size}`, mode].join(" ")}
      style={backgroundColor && { backgroundColor }}
      {...props}
    >
      <div className="storybook-button--content">
        {icon && <div className="storybook-button--icon">{icon}</div>}
        <div className="storybook-button--label">{label}</div>
      </div>
    </button> */}
      <AreaChart width={730} height={250} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {referenceLine && <>
        {referenceLineDirection === "horizontal" && <ReferenceLine x="Page C" stroke="green" label={referenceLabel} />}
        {referenceLineDirection === "vertical" && <ReferenceLine y={4000} label={referenceLabel} stroke='red' strokeDasharray="3 3" />}
        </>}
        <Area type="monotone" dataKey="uv" stroke={stroke} fill={fill} />
      </AreaChart>
    </>
  );
};

AreaRechart.propTypes = {
  /**
   * Is this the principal call to action on the page?
   */
  primary: PropTypes.bool,
  /**
   * What background color to use
   */
  backgroundColor: PropTypes.string,  
  stroke: PropTypes.string,
  fill: PropTypes.string,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * Optional options
   */
  options: PropTypes.func,
  // new custom
  referenceLine: PropTypes.bool,
  referenceLabel: PropTypes.string,
  referenceLineDirection: PropTypes.oneOf(["vertical", "horizontal"]),

};

AreaRechart.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  stroke: "",
  onClick: undefined,
  referenceLine: false,
  referenceLabel: "",
  referenceLineDirection: "horizontal",
  options: {},
};
