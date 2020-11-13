import React from "react";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import TopList from "../../components/table/TopList";
import HistoryList from "../../components/table/HistoryList";
import { BrandDetails } from "../../routes";
import { USER, BRAND } from "../../lib/mapGraphData";
import Graph from "../../components/graph/Graph";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { PageContent } from "../../components/PageContent";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: {
      marginBottom: spacing(2),
    },
  })
);

type AchievementProps = {
  title: string;
  description: string;
  activated: boolean;
  image?: string;
};

const Achievement = (props: AchievementProps) => {
  const { title, description, activated, image } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card style={{ minHeight: 120 }}>
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const AchievementsMock = [
  {
    title: "Cheater",
    description: "Registrerat orimligt mycket dryck.",
    activated: false,
  },
  {
    title: "First!",
    description: "Registrerat 1 drucken must",
    activated: true,
  },
  {
    title: "Around the Clock",
    description: "Registrerat drucken must på dygnets alla timmar",
    activated: true,
  },
  {
    title: "DoubleTap",
    description: "Registrerat 2 drycker på mindre än 15 minuter",
    activated: true,
  },
  {
    title: "Connoisseur",
    description: "Smakat på 5 olika märken",
    activated: true,
  },
  {
    title: `Third's the Charm`,
    description: "Druckit 3 dagar i rad",
    activated: true,
  },
  {
    title: "Workerbee",
    description: "Druckit 5 dagar i rad",
    activated: true,
  },
  {
    title: "Week",
    description: "Druckit 7 dagar i rad",
    activated: true,
  },
  {
    title: "Fortnight",
    description: "Druckit 14 dagar i rad",
    activated: true,
  },
  {
    title: "Persistent",
    description: "Druckit 20 dagar i rad",
    activated: true,
  },
  {
    title: "24/7",
    description: "Druckit på alla timmar och alla veckodagar",
    activated: false,
  },
  {
    title: "Beginner",
    description: "Druckit 1 liter",
    activated: true,
  },
  {
    title: "Tester",
    description: "Druckit 5 liter",
    activated: true,
  },
  {
    title: "Intermediate",
    description: "Druckit 10 liter",
    activated: true,
  },
  {
    title: "Advanced",
    description: "Druckit 15 liter",
    activated: true,
  },
  {
    title: "Chug! Chug! Chug!",
    description: "Druckit 20 liter",
    activated: true,
  },
  {
    title: "Big Gulp",
    description: "Druckit 30 liter",
    activated: true,
  },
  {
    title: "Legend",
    description: "Druckit 50 liter",
    activated: true,
  },
  {
    title: "Max-ed",
    description: "Druckit 90 liter",
    activated: true,
  },
];

const User = () => {
  const classes = useStyles();
  const router = useRouter();
  const { user } = router.query;
  const { graph, drinks, top } = useGetDrinksFrom(USER, user as string);
  return (
    <>
      <PageContent>
        <Typography variant="h1">{user}</Typography>
        <Typography variant="h2">
          <FormattedMessage defaultMessage="Utmärkelser" />
        </Typography>
        <Grid container spacing={2} justify="center">
          {AchievementsMock.map((a) => (
            <Achievement key={a.title} {...a} />
          ))}
        </Grid>
      </PageContent>
      <PageContent noPadding>
        <Box p={2}>
          <Typography variant="h2">
            <FormattedMessage defaultMessage="Graf" />
          </Typography>
        </Box>
        <Graph data={graph} />
      </PageContent>
      <PageContent noPadding>
        <TopList
          getDetailsLink={(row) => ({
            pathname: BrandDetails.href,
            query: { brand: row.name },
          })}
          title={<FormattedMessage defaultMessage="Märken" />}
          rows={top}
        />
      </PageContent>
      <PageContent noPadding>
        <HistoryList
          getDetailsLink={(row) => ({
            pathname: BrandDetails.href,
            query: { brand: row.brand },
          })}
          type={BRAND}
          title={<FormattedMessage defaultMessage="Historik" />}
          rows={drinks}
        />
      </PageContent>
    </>
  );
};

export default User;
