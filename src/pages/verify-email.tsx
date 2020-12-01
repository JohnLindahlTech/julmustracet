import React, { FC, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  CardContent,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import { UserEdit } from "../routes";
import { PageContent } from "../components/PageContent";
import { HeadTitle } from "../components/HeadTitle";
import useOfflineSession from "../db/useOfflineSession";
import * as cookie from "cookie";

const useStyles = makeStyles((theme) =>
  createStyles({
    uniqueMessagePaper: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(2),
      margin: theme.spacing(2),
    },
  })
);

const VerifyRequest: FC = () => {
  const classes = useStyles();
  const [uniqueMessage] = useState(
    (typeof document !== "undefined" ? cookie.parse(document.cookie) : {})[
      "JR.UNIQUE.MESSAGE"
    ]
  );
  const intl = useIntl();
  const [session] = useOfflineSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push(UserEdit.href);
    }
  }, [session, router]);

  return (
    <PageContent>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <HeadTitle
          title={intl.formatMessage({ defaultMessage: "Verifiera epost" })}
        />
        <Typography variant="h1" align="center">
          <FormattedMessage defaultMessage="Notera!" />
        </Typography>
        <Typography align="center">
          <FormattedMessage defaultMessage="Du måste nu klicka på länken i eposten du bör ha fått." />
        </Typography>
        {uniqueMessage ? (
          <>
            <Typography align="center">
              <FormattedMessage defaultMessage="I eposten ska följande meddelande finnas:" />
            </Typography>
            <Paper className={classes.uniqueMessagePaper}>
              <Typography align="center">{uniqueMessage}</Typography>
            </Paper>
          </>
        ) : null}
      </Box>
    </PageContent>
  );
};

export default VerifyRequest;
