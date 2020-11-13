import React from "react";
import { useIntl } from "react-intl";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import { getAchievementTexts } from "./Achievement.messages";
import { useDateFormat } from "../translations/DateFormatterProvider";

type AchievementProps = {
  name: string;
  time: Date;
};

export const Achievement = (props: AchievementProps) => {
  const { name, time } = props;
  const intl = useIntl();
  const format = useDateFormat();
  const { title, description } = getAchievementTexts(intl, name);
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ minHeight: 120 }}>
        <CardContent>
          <Typography variant="h5" component="p">
            {title}
          </Typography>
          <Typography variant="caption" color="secondary">
            {format(time)}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Achievement;

export const AchievementsMock = [
  {
    name: "cheater",
    time: new Date(),
  },
  {
    name: "first",
    time: new Date(),
  },
  {
    name: "around_the_clock",
    time: new Date(),
  },
  {
    name: "double_tap",
    time: new Date(),
  },
  {
    name: "connoisseur",
    time: new Date(),
  },
  {
    name: "three",
    time: new Date(),
  },
  {
    name: "five",
    time: new Date(),
  },
  {
    name: "seven",
    time: new Date(),
  },
  {
    name: "fourteen",
    time: new Date(),
  },
  {
    name: "twenty",
    time: new Date(),
  },
  {
    name: "twentyfour_seven",
    time: new Date(),
  },
  {
    name: "beginner",
    time: new Date(),
  },
  {
    name: "sampler",
    time: new Date(),
  },
  {
    name: "half_empty",
    time: new Date(),
  },
  {
    name: "half_filled",
    time: new Date(),
  },
  {
    name: "chug",
    time: new Date(),
  },
  {
    name: "gulp",
    time: new Date(),
  },
  {
    name: "legend",
    time: new Date(),
  },
  {
    name: "maxed",
    time: new Date(),
  },
  {
    name: "unknown",
    time: new Date(),
  },
];
