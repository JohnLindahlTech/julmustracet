import React, { useEffect, useRef, useState } from "react";
import { lightFormat } from "date-fns";
import { useIntl } from "react-intl";
import { red, blue, green, yellow, orange } from "@material-ui/core/colors";
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

const colors = [
  blue[500],
  green[500],
  yellow[500],
  orange[500],
  red[500],
].reverse();

const Graph = ({ data = [] }) => {
  const intl = useIntl();
  const format = useDateFormat();
  const [time, setTime] = useState(0);
  const calculateActiveData = useCalculateActiveData(data);
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
        {data.map((s, i) => (
          <Line
            type="stepAfter"
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            dot={{ stroke: colors[i % colors.length], strokeWidth: 1 }}
            stroke={colors[i % colors.length]}
            strokeWidth={3}
            fill={colors[i % colors.length]}
          >
            <LabelList dataKey="amount" position="insideTop" />
          </Line>
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;
