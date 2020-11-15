import React, { FC } from "react";
import { Paper, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: ({
      noPadding,
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
    }: PageContentProps) => ({
      padding: spacing(noPadding ? 0 : 2),
      marginBottom: spacing(2),
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
    }),
  })
);

type PageContentProps = {
  noPadding?: boolean;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
};

export const PageContent: FC<PageContentProps> = ({
  noPadding,
  height,
  minHeight,
  maxHeight,
  width,
  minWidth,
  maxWidth,
  ...props
}) => {
  const classes = useStyles({
    noPadding,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
  });
  return <Paper className={classes.paper} {...props} />;
};
