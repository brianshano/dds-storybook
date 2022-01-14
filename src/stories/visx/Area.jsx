// import React from "react";
// import PropTypes from "prop-types";
// import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import "./area.css";

// /**
//  * Primary UI component for user interaction
//  */
// export const Area = ({ primary, backgroundColor, size, label, iconstart, ...props }) => {
//   const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
//   const data = [
//     { name: "Page A", uv: 300, pv: 2100, amt: 1400 },
//     { name: "Page B", uv: 440, pv: 2300, amt: 1300 },
//     { name: "Page C", uv: 100, pv: 2900, amt: 2000 },
//   ];
//   const options = {
//     "title": "Area (time series - natural curve)",
//     "axes": {
//       "bottom": {
//         "title": "2019 Annual Sales Figures",
//         "mapsTo": "date",
//         "scaleType": "time"
//       },
//       "left": {
//         "mapsTo": "value",
//         "scaleType": "linear"
//       }
//     },
//     "curve": "curveNatural",
//     "height": 300
//   };

import React, { useMemo, useCallback } from "react";
import { letterFrequency } from "@visx/mock-data";
import { Group } from "@visx/group";
import { scaleTime, scaleLinear, scaleBand } from "@visx/scale";
import { AreaClosed, Line, Bar } from "@visx/shape";
import appleStock, { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";
import { curveMonotoneX } from "@visx/curve";
import { GridRows, GridColumns } from "@visx/grid";
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { max, extent, bisector } from "d3-array";
import { timeFormat } from "d3-time-format";

// We'll use some mock data from `@visx/mock-data` for this.
const data = letterFrequency;

// Define the graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const x = (d) => d.letter;
const y = (d) => +d.frequency * 100;

// And then scale the graph by our data
const xScale = scaleBand({
  range: [0, xMax],
  round: true,
  domain: data.map(x),
  padding: 0.4,
});
const yScale = scaleLinear({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

// Compose together the scale and accessor functions to get point functions
const compose = (scale, accessor) => (data) => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

// Area example stuff

const stock = appleStock.slice(800);
export const background = "#3b6978";
export const background2 = "#204051";
export const accentColor = "#edffea";
export const accentColorDark = "#75daad";
const tooltipStyles = {
  ...defaultStyles,
  background,
  border: "1px solid white",
  color: "white",
};

// util
const formatDate = timeFormat("%b %d, '%y");

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
const bisectDate = bisector((d) => new Date(d.date)).left;

let TooltipData = AppleStock;

export function Area(props, showTooltip, hideTooltip, TooltipData, tooltipData, tooltipTop = 0, tooltipLeft = 0) {
  // const mode = primary ? "storybook-button--primary" : "storybook-button--secondary";
  // if (width < 10) return null;
  // bounds
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // scales
  const dateScale = useMemo(
    () =>
      scaleTime({
        range: [margin.left, innerWidth + margin.left],
        domain: extent(stock, getDate),
      }),
    [innerWidth, margin.left]
  );
  const stockValueScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight + margin.top, margin.top],
        domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
        nice: true,
      }),
    [margin.top, innerHeight]
  );

  // tooltip handler
  const handleTooltip = useCallback(
    (event) => {
      const { x } = localPoint(event) || { x: 0 };
      const x0 = dateScale.invert(x);
      const index = bisectDate(stock, x0, 1);
      const d0 = stock[index - 1];
      const d1 = stock[index];
      let d = d0;
      if (d1 && getDate(d1)) {
        d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0;
      }
      // showTooltip({
      //   tooltipData: d,
      //   tooltipLeft: x,
      //   tooltipTop: stockValueScale(getStockValue(d)),
      // });
    },
    [showTooltip, stockValueScale, dateScale]
  );
  return (
    <div class="side-by-side">
      <div>first</div>
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d);
          return (
            <Group key={`bar-${i}`}>
              <Bar x={xPoint(d)} y={yMax - barHeight} height={barHeight} width={xScale.bandwidth()} fill="#fc2e1c" />
            </Group>
          );
        })}
      </svg>
      <div>second</div>
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="url(#area-background-gradient)" rx={14} />
          <LinearGradient id="area-background-gradient" from={background} to={background2} />
          <LinearGradient id="area-gradient" from={accentColor} to={accentColor} toOpacity={0.1} />
          <GridRows
            left={margin.left}
            scale={stockValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <AreaClosed
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            // onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColorDark}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds key={Math.random()} top={tooltipTop - 12} left={tooltipLeft + 12} style={tooltipStyles}>
              {`$${getStockValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>

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
      {/* <LineChart width={600} height={options.height} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart> */}
    </div>
  );
}

// Area.propTypes = {
//   /**
//    * Is this the principal call to action on the page?
//    */
//   primary: PropTypes.bool,
//   /**
//    * What background color to use
//    */
//    backgroundColor: PropTypes.string,
//    /**
//    * How large should the button be?
//    */
//   size: PropTypes.oneOf(["small", "medium", "large"]),
//   /**
//    * Button contents
//    */
//   label: PropTypes.string.isRequired,
//   /**
//    * Optional click handler
//    */
//    onClick: PropTypes.func,
//     /**
//    * Optional options
//    */
//      options: PropTypes.func,
//     };

// Area.defaultProps = {
//   backgroundColor: null,
//   primary: false,
//   size: "medium",
//   onClick: undefined,
//   options: {}
// };
