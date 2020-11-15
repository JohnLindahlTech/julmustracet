import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import { FormattedMessage, useIntl } from "react-intl";
import { PageContent } from "../components/PageContent";
import { HeadTitle } from "../components/HeadTitle";

const Rules: FC = () => {
  const intl = useIntl();
  return (
    <PageContent minHeight="70vh">
      <HeadTitle title={intl.formatMessage({ defaultMessage: "Regler" })} />
      <Typography variant="h1">
        <FormattedMessage defaultMessage="Regler" />
      </Typography>
      <Typography>
        <FormattedMessage defaultMessage="Denna tävling har anor sedan 2005. Vi var ett gäng i en liten håla i nordligaste Norrland som förfinade denna konstform." />
      </Typography>
      <Typography>
        <FormattedMessage defaultMessage="Redan 2006 slogs det nuvarande officiella rekordet på 90 liter av NightHawk." />
      </Typography>
      <ol>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Slutmålet är alltså att dricka julmust." />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Tävlingen pågår från 1 december till och med slutet av 20 dember." />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Rapportera enskilda gånger du dricker, dvs. varje flaska för sig." />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Det går att själv lägga till julmustmärken i formuläret genom att skriva in en sökning och välja sista raden." />
          </Typography>
        </li>
      </ol>
    </PageContent>
  );
};

export default Rules;
