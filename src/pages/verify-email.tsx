import React, { FC, useEffect } from "react";
import { Typography } from "@material-ui/core";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { UserEdit } from "../routes";
import { PageContent } from "../components/PageContent";
import useOfflineSession from "../db/useOfflineSession";

const VerifyRequest: FC = () => {
  const [session] = useOfflineSession();
  const router = useRouter();

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
