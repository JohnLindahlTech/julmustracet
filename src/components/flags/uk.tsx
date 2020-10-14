import React, { FC } from "react";

const dW = 1;
const dH = 1;

type Props = {
  width?: number;
  height?: number;
  disabled?: boolean;
  hideLeft?: boolean;
  hideRight?: boolean;
};

const FlagUK: FC<Props> = (props) => {
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
  // #0052B4 red primary
  // #D80027 blue secondary

  const primary = disabled ? "#666666" : "#0052B4";
  const secondary = disabled ? "#AAAAAA" : "#D80027";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      enableBackground="new 0 0 512 512"
      version="1.1"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      width={w}
      height={h}
    >
      <mask id="hideLeftUk">
        <rect x="0" y="0" width="512" height="512" fill="#fff" />
        <path d="M0 0 H 512 L 0 512 V 0" fill="#000" />
      </mask>
      <mask id="hideRightUk">
        <rect x="0" y="0" width="512" height="512" fill="#fff" />
        <path d="M 512 512 H 0 L 512 0 V 512" fill="#000" />
      </mask>
      <g mask={hideLeft ? "url(#hideLeftUk)" : ""}>
        <g mask={hideRight ? "url(#hideRightUk)" : ""}>
          <path fill="#fff" d="M0 0H512V512H0z"></path>
          <path
            fill={secondary}
            d="M0 304L208 304 208 512 304 512 304 304 512 304 512 208 304 208 304 0 208 0 208 208 0 208z"
          ></path>
          <g fill={primary}>
            <path d="M406.92 333.913L512 438.993 512 333.913z"></path>
            <path d="M333.913 333.913L512 512 512 461.64 384.273 333.913z"></path>
            <path d="M464.564 512L333.913 381.336 333.913 512z"></path>
          </g>
          <path
            fill="#fff"
            d="M333.913 333.913L512 512 512 461.64 384.273 333.913z"
          ></path>
          <path
            fill={secondary}
            d="M333.913 333.913L512 512 512 461.64 384.273 333.913z"
          ></path>
          <g fill={primary}>
            <path d="M80.302 333.913L0 414.215 0 333.913z"></path>
            <path d="M178.084 356.559L178.084 511.997 22.658 511.997z"></path>
          </g>
          <path
            fill={secondary}
            d="M127.724 333.916L0 461.641 0 512 0 512 178.084 333.916z"
          ></path>
          <g fill={primary}>
            <path d="M105.08 178.087L0 73.007 0 178.087z"></path>
            <path d="M178.087 178.087L0 0 0 50.36 127.727 178.087z"></path>
            <path d="M47.436 0L178.087 130.663 178.087 0z"></path>
          </g>
          <path
            fill="#fff"
            d="M178.087 178.087L0 0 0 50.36 127.727 178.087z"
          ></path>
          <path
            fill={secondary}
            d="M178.087 178.087L0 0 0 50.36 127.727 178.087z"
          ></path>
          <g fill={primary}>
            <path d="M431.698 178.087L512 97.785 512 178.087z"></path>
            <path d="M333.916 155.441L333.916 0.003 489.342 0.003z"></path>
          </g>
          <path
            fill={secondary}
            d="M384.276 178.084L512 50.359 512 0 512 0 333.916 178.084z"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default FlagUK;
