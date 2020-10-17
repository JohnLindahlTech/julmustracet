import React from "react";
import { format, formatISO, lightFormat } from "date-fns";
import { useIntl } from "react-intl";
import { red, blue, green, yellow, orange } from "@material-ui/core/colors";

import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  Label,
  LabelList,
} from "recharts";
import { useRouter } from "next/router";
import getDateFnsLocale from "../translations/date-fns-locale";

const colors = [
  blue[500],
  green[500],
  yellow[500],
  orange[500],
  red[500],
].reverse();

// TODO TimeSeries with multiple series require synced points for correct tooltip.

const TimeSeriesChart = ({ data }) => {
  const intl = useIntl();
  const router = useRouter();
  const { lang } = router.query;
  const locale = getDateFnsLocale(lang as string);
  return (
    <ResponsiveContainer width="95%" height={500}>
      <AreaChart>
        <XAxis
          dataKey="time"
          domain={["dataMin", "dataMax"]}
          name="Time"
          interval={0}
          allowDecimals={false}
          tickCount={21}
          tickFormatter={(unixTime) => {
            return lightFormat(new Date(unixTime), "d");
          }}
          type="number"
        >
          <Label
            value={intl.formatMessage({ defaultMessage: "Dag" })}
            position="insideBottom"
          />
        </XAxis>
        <YAxis dataKey="value" name="Value">
          <Label
            value={intl.formatMessage({ defaultMessage: "Mängd (Liter)" })}
            angle={-90}
          />
        </YAxis>
        <CartesianGrid />
        <Legend verticalAlign="bottom" align="center" layout="horizontal" />
        <Tooltip
          itemSorter={({ value }) => {
            return value;
          }}
          allowEscapeViewBox={{ x: false, y: true }}
          offset={20}
          labelFormatter={(label) => format(new Date(label), "Pp", { locale })}
          formatter={(value, name, props) => {
            console.log({ value, name, props });
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
          <Area
            type="monotone"
            dataKey="value"
            data={s.data}
            name={s.name}
            key={s.name}
            dot={{ stroke: colors[i % colors.length], strokeWidth: 1 }}
            stroke={colors[i % colors.length]}
            fill={colors[i % colors.length]}
          >
            <LabelList dataKey="amount" position="insideTop" />
          </Area>
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimeSeriesChart;
