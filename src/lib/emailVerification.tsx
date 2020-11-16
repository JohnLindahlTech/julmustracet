import React from "react";

import {
  Mjml,
  MjmlFont,
  MjmlHead,
  MjmlTitle,
  MjmlPreview,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlButton,
  MjmlStyle,
  MjmlText,
} from "mjml-react";

const css = `
.body div {
  font-family: Roboto, Arial !important;
  font-size: 16px !important;
}
.heading div {
  font-family: Roboto, Arial !important;
  color: #fff !important;
  align: center !important;
  font-size: 20px !important;
}
.text div {
  text-align: center !important;
}
.link {
  font-size: 10px !important;
}
.header {
  background-color: #b71c1c !important;
}
.header div {
  max-width: 100% !important;
}
.button a,
.button p,
.button td {
  background-color: #b71c1c !important;
  font-size: 16px !important;
  color: #fff;
}

.uniqueMessage td,
.uniqueMessage a,
.uniqueMessage p {
  text-align: center !important;
  color: #fff !important;
  background-color: #757575 !important;
}
`;

export const generate = ({ uniqueMessage, escapedEmail, url, intl }) => {
  return (
    <Mjml lang="sv" owa="desktop">
      <MjmlHead>
        <MjmlTitle>
          {intl.formatMessage({ defaultMessage: "JulmustRacet" })}
        </MjmlTitle>
        <MjmlPreview>
          {intl.formatMessage({
            defaultMessage: "Logga in till JulmustRacet!",
          })}
        </MjmlPreview>
        <MjmlFont
          name="Roboto"
          href="https://fonts.googleapis.com/css?family=Roboto"
        />
        <MjmlStyle inline>{css}</MjmlStyle>
      </MjmlHead>
      <MjmlBody cssClass="body" backgroundColor="#fff">
        <MjmlSection fullWidth cssClass="header">
          <MjmlColumn cssClass="column">
            <MjmlText cssClass="heading">
              {intl.formatMessage({ defaultMessage: "JulmustRacet" })}
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>

        <MjmlSection>
          <MjmlColumn>
            <MjmlText cssClass="text">
              {intl.formatMessage({
                defaultMessage:
                  "Klicka på knappen här under för att logga in på JulmustRacet.",
              })}
            </MjmlText>
            <MjmlButton cssClass="button" href={url}>
              {intl.formatMessage({ defaultMessage: "Logga in" })}
            </MjmlButton>
          </MjmlColumn>
        </MjmlSection>
        {uniqueMessage ? (
          <MjmlSection>
            <MjmlColumn>
              <MjmlText cssClass="text">
                {intl.formatMessage({
                  defaultMessage:
                    "Följande meddelande visades vid inloggningen",
                })}
              </MjmlText>
              <MjmlButton css-class="uniqueMessage" href={url}>
                {uniqueMessage}
              </MjmlButton>
            </MjmlColumn>
          </MjmlSection>
        ) : null}
        <MjmlSection>
          <MjmlColumn>
            <MjmlText cssClass="text">
              {intl.formatMessage({
                defaultMessage:
                  "Om du inte kan klicka på knappen ovan kan du kopiera följande länk i din webbläsare:",
              })}
            </MjmlText>
            <MjmlText cssClass="text">
              <a href={url} className="link">
                {url}
              </a>
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
      </MjmlBody>
    </Mjml>
  );
};
