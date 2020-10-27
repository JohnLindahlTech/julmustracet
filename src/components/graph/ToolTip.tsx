import React from "react";
import { styled } from "@material-ui/core/styles";
import { Card, Typography, CardContent } from "@material-ui/core";

const ToolTipHeader = styled(Typography)({
  fontWeight: "bold",
});

const ToolTip = (props) => {
  const {
    active,
    itemSorter,
    separator,
    payload,
    labelFormatter,
    formatter,
    label,
    data = [],
  } = props;
  if (active) {
    return (
      <Card variant="outlined">
        <CardContent>
          <ToolTipHeader>{labelFormatter(label)}</ToolTipHeader>
          {[...data].sort(itemSorter).map((item) => (
            <Typography
              style={{
                color: payload.find((i) => i.name === item.name)?.stroke,
              }}
              key={item.name}
            >
              {item.name}
              {separator}
              {formatter(item.value)}
            </Typography>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ToolTip;
