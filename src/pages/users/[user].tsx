import React, { FC } from "react";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { Box, Typography, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import TopList from "../../components/table/TopList";
import HistoryList from "../../components/table/HistoryList";
import { BrandDetails } from "../../routes";
import { USER, BRAND } from "../../lib/mapGraphData";
import Graph from "../../components/graph/Graph";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { PageContent } from "../../components/PageContent";
import { Achievement } from "../../components/Achievement";
import { useGetAchievementsFor } from "../../db/useGetAchievements";
import Error404 from "../404";

const LoadingUser: FC = () => {
  const cards = Array.from({ length: 20 }, (x, i) => i);
  return (
    <PageContent>
      <Typography variant="h1">
        <Skeleton />
      </Typography>
      <Typography variant="h2">
        <Skeleton />
      </Typography>
      <Grid container spacing={2} justify="center">
        {cards.map((a) => (
          <Achievement key={a} loading />
        ))}
      </Grid>
    </PageContent>
  );
};

const User: FC = () => {
  const router = useRouter();
  const { user } = router.query;
  const { achievements, loading: achievementsLoading } = useGetAchievementsFor(
    user as string
  );
  const { graph, drinks, top, loading: drinksLoading } = useGetDrinksFrom(
    USER,
    user as string
  );

  if (achievementsLoading || drinksLoading) {
    return <LoadingUser />;
  }

  if (
    (!achievementsLoading && (achievements?.length ?? 0) === 0) ||
    (!drinksLoading && (drinks?.length ?? 0) === 0)
  ) {
    return <Error404 />;
  }
  return (
    <>
      <PageContent>
        <Typography variant="h1">{user}</Typography>
        <Typography variant="h2">
          <FormattedMessage defaultMessage="Utmärkelser" />
        </Typography>
        <Grid container spacing={2} justify="center">
          {achievements.map((a) => (
            <Achievement key={a.name} {...a} />
          ))}
          {achievements.length <= 0 ? (
            <Box m={2}>
              <Typography color="secondary">
                <FormattedMessage
                  defaultMessage="{user} har inga utmärkelser."
                  values={{ user }}
                />
              </Typography>
            </Box>
          ) : null}
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
