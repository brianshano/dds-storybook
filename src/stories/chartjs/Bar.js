import React, { useRef, useEffect, useState } from "react";
import "./bar.css";
import useResizeObserver from "../../../.storybook/useResizeObserver";
import { Bar } from "react-chartjs-2";

export default function BarChartjs({ primary, data, options, stroke, ...props }) {
  console.log("all props passed", props);
  const wrapperRef = useRef();
  const [widthData, setWidthData] = useState(400);
  const [heightData, setHeightData] = useState(300);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    console.log("arrgghh", dimensions);
    if (dimensions) {
      setWidthData(dimensions.width);
      if (dimensions.width < 425) {
        setHeightData(300);
      }
    }
  }, [dimensions]);

  return (
    <div className="recharts-wrapper relative" ref={wrapperRef} >
      <Bar options={options} data={data} width={widthData - (dimensions?.width < 425 ? 0 : 24)} height={heightData}/>
    </div>
  );
}
