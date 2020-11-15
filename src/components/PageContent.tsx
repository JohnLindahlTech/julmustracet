import React, { FC } from "react";
import { Paper, makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    paper: ({
      noMargin,
      noPadding,
      height,
      minHeight,
      maxHeight,
      width,
      minWidth,
      maxWidth,
    }: PageContentProps) => ({
      padding: spacing(noPadding ? 0 : 2),
      marginBottom: spacing(noMargin ? 0 : 2),
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
  noMargin?: boolean;
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
};

export const PageContent: FC<PageContentProps> = ({
  noPadding,
  noMargin,
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
    noMargin,
    height,
    minHeight,
    maxHeight,
    width,
    minWidth,
    maxWidth,
  });
  return <Paper className={classes.paper} {...props} />;
};
