import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";

const Rules = () => (
  <main>
    <Typography variant="h1">
      <FormattedMessage defaultMessage="Regler" />
    </Typography>
    <Typography>
      <FormattedMessage defaultMessage="Denna tävling har anor sedan 2005. Vi var ett gäng i en liten håla i nordligaste Norrland som förfinade denna konstform." />
    </Typography>
    <Typography>
      <FormattedMessage defaultMessage="Redan 2006 slogs det nuvarande officiella rekordet på 90 liter av NightHawk." />
    </Typography>

    <Typography>
      <ol>
        <li>
          <FormattedMessage defaultMessage="Slutmålet är alltså att dricka julmust." />
        </li>
        <li>
          <FormattedMessage defaultMessage="Tävlingen pågår från 1 december till och med slutet av 20 dember." />
        </li>
        <li>
          <FormattedMessage defaultMessage="Rapportera enskilda gånger du dricker, dvs. varje flaska för sig." />
        </li>
        <li>
          <FormattedMessage defaultMessage="Det går att själv lägga till julmustmärken i formuläret genom att skriva in en sökning och välja sista raden." />
        </li>
      </ol>
    </Typography>
  </main>
);

export default Rules;
