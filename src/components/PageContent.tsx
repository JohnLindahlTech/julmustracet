import React, { FC } from "react";
import { Paper, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: ({ noPadding }: { noPadding: boolean }) => ({
      padding: spacing(noPadding ? 0 : 2),
      marginBottom: spacing(2),
    }),
  })
);

export const PageContent: FC<{ noPadding?: boolean }> = (props) => {
  const classes = useStyles(props);
  return <Paper className={classes.paper} {...props} />;
};
