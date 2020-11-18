import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import Link from "../components/link";
import { FormattedMessage, useIntl } from "react-intl";
import { PageContent } from "../components/PageContent";
import { HeadTitle } from "../components/HeadTitle";
import { UserEdit } from "../routes";

const link = (data) => <Link {...UserEdit}>{data}</Link>;

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
      <Typography variant="h2">
        <FormattedMessage defaultMessage="Övrig information" />
      </Typography>
      <ul>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Epost-adressen som du uppger vid inloggning används enbart till just inloggning och Julmustracet kommer ej dela denna till tredje part eller skicka oönskad epost till dig." />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Användarnamnet som du själv väljer när du loggat in är publik data och kommer att synas så fort du har matat in dryck." />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage
              defaultMessage="Om du ej längre vill vara med och synas på sidan kan du välja att ta bort din användare längst ner på sidan, <link>redigera användare</link>."
              values={{ link }}
            />
          </Typography>
        </li>
        <li>
          <Typography>
            <FormattedMessage defaultMessage="Denna sida använder endast kakor för att hantera din inloggning. Detta betyder att inga kakor sparas om du inte loggar in." />
          </Typography>
        </li>
      </ul>
    </PageContent>
  );
};

export default Rules;
