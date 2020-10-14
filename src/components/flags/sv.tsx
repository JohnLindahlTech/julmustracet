import React, { FC } from "react";

const dW = 10;
const dH = 10;

const hyp = 10 * Math.sqrt(2);

type Props = {
  width?: number;
  height?: number;
  disabled?: boolean;
  hideLeft?: boolean;
  hideRight?: boolean;
};

const FlagSV: FC<Props> = (props) => {
  let w = dW,
    h = dH;
  const {
    width,
    height,
    disabled = false,
    hideLeft = false,
    hideRight = false,
  } = props;
  w = width || w;
  h = height || h;
  if (!width) {
    w = height ? (height * dW) / dH : w;
  }
  if (!height) {
    h = width ? (width * dH) / dW : h;
  }
  const primary = disabled ? "#999999" : "#006AA7";
  const secondary = disabled ? "#EEEEEE" : "#fecc00";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
    >
      <mask id="hideRightSv">
        <rect x="0" y="0" width="10" height="10" fill="#fff" />
        <path d="M10 10 H 0 L 10 0 V 10" fill="#000" />
      </mask>
      <mask id="hideLeftSv">
        <rect x="0" y="0" width="10" height="10" fill="#fff" />
        <path d="M0 0 H 10 L 0 10 V 0" fill="#000" />
      </mask>
      <g mask={hideLeft ? "url(#hideLeftSv)" : ""}>
        <g mask={hideRight ? "url(#hideRightSv)" : ""}>
          <rect fill={primary} x="0" y="0" width="10" height="10" />
          <rect fill={secondary} x="4" y="0" width="2" height="10" />
          <rect fill={secondary} x="0" y="4" width="10" height="2" />
        </g>
      </g>
    </svg>
  );
};

export default FlagSV;
