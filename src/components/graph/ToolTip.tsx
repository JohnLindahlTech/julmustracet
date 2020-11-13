import React from "react";
import { styled } from "@material-ui/core/styles";
import { Box, Card, Typography, CardContent } from "@material-ui/core";

const ToolTipHeader = styled(Typography)({
  fontWeight: "bold",
});

const ToolTip = (props) => {
  const {
    active,
    itemSorter,
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
            <Box
              display="flex"
              justifyContent="space-between"
              key={item.name}
              style={{
                color: payload.find((i) => i.name === item.name)?.stroke,
              }}
            >
              <Box pr={1}>
                <Typography>{item.name}</Typography>
              </Box>
              <Typography>{formatter(item.value)}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ToolTip;
