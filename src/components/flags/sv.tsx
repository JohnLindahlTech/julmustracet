import React from "react";

function FlagSV(props) {
  const { width = 160, height = 100 } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 10"
    >
      <path fill="#006aa7" d="M0 0h16v10H0z"></path>
      <path fill="#fecc00" d="M0 4h5V0h2v4h9v2H7v4H5V6H0z"></path>
    </svg>
  );
}

export default FlagSV;
