// import dayjs from "dayjs";

export function decimalToHour(decimal) {
  if (decimal) {
    let initialHours = decimal.toString().split(".");
    let newMins = 0;
    if (initialHours[1] >= 0) {
      newMins = `0.${initialHours[1]}`;
      newMins = (newMins * 60).toString().split(".");
    }
    return `${initialHours[0]}h ${newMins.toString().substring(0, 2).replace(/,/g, "")}m`;
  } else return;
}

export function decimalToTime(decimal) {
  if (decimal) {
    let period = "am";
    let initialHours = decimal.toString().split(".");
    let newMins = 0;
    if (initialHours[0] > 11) period = "pm";
    if (initialHours[1] >= 0) {
      newMins = `0.${initialHours[1]}`;
      newMins = (newMins * 60).toString().split(".");
    }

    return `${initialHours[0]}:${newMins.toString().substring(0, 2).replace(/,/g, "").padStart(2, "0")}${period}`;
  } else return;
}

export const RenderReferenceLabel = (props) => {
  const { fill, value, textAnchor, fontSize, viewBox, dy, dx, referenceLabel } = props;
  const x = viewBox.width + 64;
  const y = viewBox.y + 4;
  return (
    <>
      <rect x={x - 8} y={y - 19} width="42" height="28" rx="8" fill={props.referenceLabelBg} />
      {/* <text filter="url(#solid)" x={x+2} y={y-22} fill="black" fontSize="14">
        time
      </text> */}

      <defs>
        <filter x="-0.1" y="-0.1" width="1.1" height="1.1" id="solid">
          <feFlood floodColor={props.referenceLabelBg} result="bg" />
          <feMerge>
            <feMergeNode in="bg" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <text filter="url(#solid)" x={x} y={y} fill="white" fontSize="14">
        {referenceLabel}
      </text>

      <text x={x - 6} y={y - 22} fill="#269AF4" fontSize="12">
        {props.avg}
      </text>
    </>
  );
};