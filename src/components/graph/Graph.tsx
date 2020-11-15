import React, { FC, useState } from "react";
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
  Text,
} from "recharts";
import ToolTip from "./ToolTip";
import useCalculateActiveData from "../../hooks/useCalculateActiveData";
import { useDateFormat } from "../../translations/DateFormatterProvider";
import { useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { maxLimitDate, minLimitDate } from "../../lib/rules";

const colors = [red[900], green[900], blue[900], brown[500], orange[800]];

const Graph: FC<{
  data: { name: string; data: unknown[] }[];
  loading?: boolean;
}> = ({ data = [], loading }) => {
  const theme = useTheme();
  const intl = useIntl();
  const format = useDateFormat();
  const [time, setTime] = useState(0);
  const lines = [...data].reverse();
  const myColors = colors.slice(0, lines.length).reverse();
  const calculateActiveData = useCalculateActiveData(lines);
  return (
    <ResponsiveContainer aspect={16 / 9} minHeight={(320 * 9) / 16}>
      {loading ? (
        <Skeleton variant="rect" animation="wave" />
      ) : (
        <LineChart
          onMouseMove={(props) => {
            setTime(props.activeLabel);
          }}
          margin={{
            top: theme.spacing(2),
            right: theme.spacing(3),
            bottom: theme.spacing(2),
            left: theme.spacing(0),
          }}
        >
          <XAxis
            dataKey="time"
            domain={[minLimitDate.getTime(), maxLimitDate.getTime()]}
            name="Time"
            interval={0}
            allowDecimals={false}
            tickCount={20}
            tickFormatter={(unixTime) => {
              if (!Number.isFinite(unixTime)) {
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
            labelFormatter={(label) => {
              const d = new Date(label);
              if (isNaN(d.getTime())) {
                return "-";
              }
              return format(d);
            }}
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
      )}
    </ResponsiveContainer>
  );
};

export default Graph;
