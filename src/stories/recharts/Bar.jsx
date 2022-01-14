import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Bar, Cell, BarChart, XAxis, Label, LabelList, YAxis, Tooltip, ReferenceLine, CartesianGrid } from "recharts";
import useResizeObserver from "../../../.storybook/useResizeObserver";
import { decimalToHour, RenderReferenceLabel } from "../../../.storybook/helpers";
import barData from "./bar-data.json";

import "./bar.css";

/**
 * Primary UI component for user interaction
 */
export const BarRechart = ({
  primary,
  stroke,
  fill,
  referenceLine,
  referenceLabel,
  referenceLabelBg,
  referenceLineDirection,
  barDefaultColor,
  ...props
}) => {
  console.log("all props passed", props, barDefaultColor);
  const wrapperRef = useRef();
  const chartRef = useRef();
  const [widthData, setWidthData] = useState(400);
  const [heightData, setHeightData] = useState(400);
  const [weeklyData, setWeeklyData] = useState();
  const [data, setData] = useState(barData?.durationData);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    console.log("set bar data", barData?.durationData);
    setData(barData?.durationData);
  }, []);

  useEffect(() => {
    if (dimensions) {
      setWidthData(dimensions.width);
      if (dimensions.width < 425) {
        setHeightData(300);
      }
    }
  }, [dimensions]);

  useEffect(() => {
    let newData = data?.weekly_data;
    newData.sort((a, b) => a.epoch_week_ending - b.epoch_week_ending);
    console.log("set weekly", newData);
    setWeeklyData(newData);
  }, [data]);

  const renderLabelAboveBar = (props) => {
    const { x, y, width, height, value } = props;
    console.log("value ", value);
    let timeSize = "14px";
    if (dimensions?.width < 425) {
      timeSize = "8px";
    }
    return (
      <g>
        <text
          x={x + width / 2}
          y={y - 16}
          fill="#424e54"
          fontSize={timeSize}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {decimalToHour(value)}
        </text>
      </g>
    );
  };

  const getPath = (x, y, width, height) => {
    let linePath = `M${x + width / 2},${y}
    L${x + width / 2},${y + height}`;
    return linePath;
  };

  const SkinnyBar = (props) => {
    const { fill, x, y, width, height } = props;
    return (
      <>
        <path d={getPath(x, y, width, height)} stroke={fill} fill={fill} />
        <circle cx={x + width / 2} cy={y} r={`${props.week === "Last week" ? "16" : "10"}`} stroke={fill} fill={fill} />
      </>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload.length > 0) {
      return (
        <div>
          <p>{payload[0].payload.day}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="recharts-wrapper relative" ref={wrapperRef}>
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
      {/* <AreaChart width={730} height={250} data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {referenceLine && <>
        {referenceLineDirection === "horizontal" && <ReferenceLine x="Page C" stroke="green" label={referenceLabel} />}
        {referenceLineDirection === "vertical" && <ReferenceLine y={4000} label={referenceLabel} stroke='red' strokeDasharray="3 3" />}
        </>}
        <Area type="monotone" dataKey="uv" stroke={stroke} fill={fill} />
      </AreaChart> */}
      <BarChart
        ref={chartRef}
        width={widthData - (dimensions?.width < 425 ? 0 : 24)}
        height={heightData}
        data={weeklyData}
        margin={{
          top: 30,
          right: 55,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#F0CB2F" stopOpacity={0.8} />
            <stop offset="88%" stopColor="#f0c92fa1" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        {props.showGrid && <CartesianGrid vertical={props.gridVertical} horizontal={props.gridHorizontal} stroke="#EEF0F0" />}
        <XAxis
          dataKey={dimensions?.width < 425 ? "short_week" : "week"}
          tick={{ fontSize: "12px" }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis interval={0} tick={{ fontSize: "12px" }} tickLine={false} axisLine={false}>
          <Label value="Hours" stroke="#424e54" offset={20} fontSize="12px" position="top" />
        </YAxis>
        {props.toolTip && <Tooltip wrapperStyle={{ fontSize: "14px" }} cursor={{ fill: "#f8f8f8" }} content={<CustomTooltip />} />}

        <Bar dataKey="value" fill="url(#colorPv)" maxBarSize={40} shape={props.lolipopBar && <SkinnyBar />}>
          {props.barLabel && <LabelList dataKey="value" position="insideTopLeft" content={renderLabelAboveBar} />}
          {data?.weekly_data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                stroke="#D5D8DA"
                fill={`${entry.week === "Last week" ? "url(#colorPv)" : barDefaultColor}`}
              />
            );
          })}
        </Bar>
        {referenceLine && (
          <ReferenceLine
            y={data?.average}
            label={<RenderReferenceLabel avg={decimalToHour(data?.average)} referenceLabelBg={referenceLabelBg} referenceLabel={referenceLabel} />}
            stroke={referenceLabelBg}
            strokeDasharray="5 5"
            textAnchor="end"
          />
        )}
      </BarChart>
    </div>
  );
};

BarRechart.propTypes = {
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
  // size: PropTypes.oneOf(["small", "medium", "large"]),
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
  barLabel: PropTypes.bool,
  showGrid: PropTypes.bool,
  referenceLine: PropTypes.bool,
  referenceLabel: PropTypes.string,
  referenceLabelBg: PropTypes.string,
  referenceLineDirection: PropTypes.oneOf(["vertical", "horizontal"]),
  barDefaultColor: PropTypes.oneOf(["#D5D8DA", "#424e54", "#269AF4"]),
  lolipopBar: PropTypes.bool,
  toolTip: PropTypes.bool,
};

BarRechart.defaultProps = {
  backgroundColor: null,
  primary: false,
  // size: "medium",
  stroke: "",
  barLabel: false,
  showGrid: false,
  onClick: undefined,
  referenceLine: false,
  lolipopBar: false,
  toolTip: false,
  referenceLabel: "",
  referenceLabelBg: "#269AF4",
  barDefaultColor: "#D5D8DA",
  referenceLineDirection: "horizontal",
  options: {},
};
