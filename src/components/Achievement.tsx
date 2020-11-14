import React from "react";
import { useIntl } from "react-intl";
import { Typography, Card, CardContent, Grid } from "@material-ui/core";
import { getAchievementTexts } from "./Achievement.messages";
import { useDateFormat } from "../translations/DateFormatterProvider";

type AchievementProps = {
  name: string;
  createdAt: Date;
};

export const Achievement = (props: AchievementProps) => {
  const { name, createdAt } = props;
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
            {format(createdAt)}
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
    createdAt: new Date(),
  },
  {
    name: "first",
    createdAt: new Date(),
  },
  {
    name: "around_the_clock",
    createdAt: new Date(),
  },
  {
    name: "double_tap",
    createdAt: new Date(),
  },
  {
    name: "connoisseur",
    createdAt: new Date(),
  },
  {
    name: "three",
    createdAt: new Date(),
  },
  {
    name: "five",
    createdAt: new Date(),
  },
  {
    name: "seven",
    createdAt: new Date(),
  },
  {
    name: "fourteen",
    createdAt: new Date(),
  },
  {
    name: "twenty",
    createdAt: new Date(),
  },
  {
    name: "twentyfour_seven",
    createdAt: new Date(),
  },
  {
    name: "beginner",
    createdAt: new Date(),
  },
  {
    name: "sampler",
    createdAt: new Date(),
  },
  {
    name: "half_empty",
    createdAt: new Date(),
  },
  {
    name: "half_filled",
    createdAt: new Date(),
  },
  {
    name: "chug",
    createdAt: new Date(),
  },
  {
    name: "gulp",
    createdAt: new Date(),
  },
  {
    name: "legend",
    createdAt: new Date(),
  },
  {
    name: "maxed",
    createdAt: new Date(),
  },
  {
    name: "unknown",
    createdAt: new Date(),
  },
];
