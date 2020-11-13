import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useDbSession } from "../db/sessionDB";
import useLangRouter from "../hooks/useLangRouter";
import { UserEdit } from "../routes";
import { PageContent } from "../components/PageContent";

const VerifyRequest = () => {
  const [session] = useDbSession();
  const router = useLangRouter();

  useEffect(() => {
    if (session?.user) {
      router.push(UserEdit.href);
    }
  }, [session, router]);
  return (
    <PageContent>
      <Typography variant="h1" align="center">
        <FormattedMessage defaultMessage="Notera!" />
      </Typography>
      <Typography align="center">
        <FormattedMessage defaultMessage="Du måste nu klicka på länken in eposten du bör ha fått." />
      </Typography>
      <Typography align="center">
        <FormattedMessage defaultMessage="När du loggat in kommer du automatiskt navigeras vidare." />
      </Typography>
    </PageContent>
  );
};

export default VerifyRequest;
