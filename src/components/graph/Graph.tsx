import React, { useState } from "react";
import { lightFormat } from "date-fns";
import { useIntl } from "react-intl";
import { red, blue, green, brown, orange } from "@material-ui/core/colors";
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  Label,
  LabelList,
} from "recharts";
import ToolTip from "./ToolTip";
import useCalculateActiveData from "../../hooks/useCalculateActiveData";
import { useDateFormat } from "../../translations/DateFormatterProvider";

const colors = [red[900], green[900], blue[900], brown[500], orange[800]];

const Graph = ({ data = [] }) => {
  const intl = useIntl();
  const format = useDateFormat();
  const [time, setTime] = useState(0);
  const lines = [...data].reverse();
  const myColors = colors.slice(0, lines.length).reverse();
  const calculateActiveData = useCalculateActiveData(lines);
  if (lines.length <= 0) {
    return null; // TODO What to show with no lines?
  }
  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart
        onMouseMove={(props) => {
          setTime(props.activeLabel);
        }}
      >
        <XAxis
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          name="Time"
          interval={0}
          allowDecimals={false}
          tickCount={20}
          tickFormatter={(unixTime) => {
            if (!isFinite(unixTime)) {
              return "Infinity";
            }
            return lightFormat(new Date(unixTime), "d");
          }}
          type="number"
        >
          <Label
            value={intl.formatMessage({ defaultMessage: "Dag" })}
            position="bottom"
            offset={-10}
          />
        </XAxis>
        <YAxis dataKey="value" name="Value">
          <Label
            position="center"
            value={intl.formatMessage({ defaultMessage: "Mängd (Liter)" })}
            angle={-90}
          />
        </YAxis>
        <CartesianGrid />
        <Legend verticalAlign="bottom" align="center" layout="horizontal" />
        <Tooltip
          itemSorter={({ value: a }, { value: b }) => {
            return b - a;
          }}
          allowEscapeViewBox={{ x: false, y: false }}
          offset={20}
          content={<ToolTip data={calculateActiveData(time)} />}
          labelFormatter={(label) => format(new Date(label))}
          formatter={(value) => {
            return intl.formatMessage(
              { defaultMessage: "{value} liter" },
              {
                value: intl.formatNumber(value, {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }),
              }
            );
          }}
        />
        {lines.map((s, i) => {
          const color = myColors[i % myColors.length];
          return (
            <Line
              animationBegin={i * 500}
              animationDuration={1000}
              type="stepAfter"
              dataKey="value"
              data={s.data}
              name={s.name}
              key={s.name}
              legendType="circle"
              dot={{ stroke: color, strokeWidth: 1 }}
              stroke={color}
              strokeWidth={3}
              fill={color}
            >
              <LabelList dataKey="amount" position="insideTop" />
            </Line>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
