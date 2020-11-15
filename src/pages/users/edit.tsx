import React, { useCallback } from "react";
import { Formik, Field, Form } from "formik";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import * as Sentry from "@sentry/node";
import {
  Button,
  TextField as MUITextField,
  FormControl,
  Typography,
  Box,
  useTheme,
} from "@material-ui/core";
import { Plus as AddIcon } from "@styled-icons/fa-solid/Plus";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
// Since we are needing network for the edit, lets require the latest session from server
import { useSession } from "next-auth/client";
import NextLink from "next/link";
import Link from "../../components/link";
import withEnsuredSession from "../../hocs/withEnsuredSession";
import { patchData } from "../../lib/fetch";
import HistoryList from "../../components/table/HistoryList";
import { USER, BRAND } from "../../lib/mapGraphData";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { AddDrink, UserDetails } from "../../routes";
import usePutDrink from "../../db/usePutDrink";
import { useRouter } from "next/router";
import { PageContent } from "../../components/PageContent";
import { HeadTitle } from "../../components/HeadTitle";
import { NextPage } from "next";

const messages = defineMessages({
  "username.string": {
    defaultMessage: "Måste vara text",
  },
  "username.length": {
    defaultMessage: "Användarnamnet får vara max 32 tecken",
  },
  "username.conflict": {
    defaultMessage: "Användarnamnet är redan upptaget",
  },
  "username.missing": {
    defaultMessage: "Användarnamn är obligatoriskt",
  },
  "username.unknown": {
    defaultMessage: "Något är okänt fel med användarnamnet",
  },
});

const getErrorMessage = (id: string): { defaultMessage: string } => {
  return messages[id] ?? messages["username.unknown"];
};

const UserForm = ({ user }) => {
  const intl = useIntl();

  const schema = object({
    username: string(intl.formatMessage(messages["username.string"]))
      .required(intl.formatMessage(messages["username.missing"]))
      .max(32, intl.formatMessage(messages["username.length"]))
      .label(intl.formatMessage({ defaultMessage: "Användarnamn" })),
  });

  const onSubmit = useCallback(
    async (values, { setSubmitting, setErrors }) => {
      try {
        await patchData("/api/users/me", values);
        window.location.reload();
      } catch (error) {
        if (error?.data?.errorCode) {
          setErrors({
            username: intl.formatMessage(
              getErrorMessage(error?.data?.errorCode)
            ),
          });
        } else {
          Sentry.captureException(error);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [intl]
  );

  return (
    <Formik
      initialValues={{
        username: user.username || "",
      }}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <FormControl fullWidth margin="normal">
            <Field
              variant="outlined"
              component={TextField}
              name="username"
              label={<FormattedMessage defaultMessage="Användarnamn" />}
              placeholder="Tomten"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <MUITextField
              variant="outlined"
              label={<FormattedMessage defaultMessage="Epost" />}
              value={user.email}
              disabled
            />
          </FormControl>
          <FormControl margin="normal">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              <FormattedMessage defaultMessage="Spara" />
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

const EditUser: NextPage = () => {
  const theme = useTheme();
  const intl = useIntl();
  const [put] = usePutDrink();
  const [session] = useSession();
  const { drinks, loading } = useGetDrinksFrom(USER, session?.user?.username);
  const router = useRouter();
  return (
    <>
      <HeadTitle
        title={intl.formatMessage({ defaultMessage: "Redigera användare" })}
      />
      <Box mb={2}>
        <PageContent>
          <Typography variant="h1">
            <FormattedMessage defaultMessage="Redigera användare" />
          </Typography>
          <Typography
            color={session?.user?.username ? "initial" : "primary"}
            variant={session?.user?.username ? "body1" : "h4"}
            component="p"
          >
            <FormattedMessage defaultMessage="Du måste ha ett användarnamn för att kunna mata in dryck" />
          </Typography>
          <Typography>
            <FormattedMessage defaultMessage="Om du byter användarnamn måste du logga ut och in igen på andra enheter du är inloggad på." />
          </Typography>
          <Typography>
            <FormattedMessage defaultMessage="Rekommendation: Undvik att byta användarnamn när du väl valt ett." />
          </Typography>
          {session?.user?.username && drinks.length > 0 ? (
            <Typography variant="body1">
              <Link
                href={{
                  pathname: UserDetails.href,
                  query: { user: session?.user?.username },
                }}
              >
                <FormattedMessage defaultMessage="Gå till din publika profil här" />
              </Link>
            </Typography>
          ) : null}
          {session?.user ? <UserForm user={session.user} /> : null}
        </PageContent>
      </Box>
      {session && session.user && (
        <PageContent noPadding>
          <HistoryList
            loading={loading}
            type={BRAND}
            title={
              <Box display="flex">
                <Box flexGrow={1}>
                  <FormattedMessage defaultMessage="Historik" />
                </Box>
                <NextLink {...AddDrink} passHref>
                  <Button color="primary" variant="contained">
                    <AddIcon size={theme.spacing(2)} />
                  </Button>
                </NextLink>
              </Box>
            }
            rows={drinks}
            onDelete={(row) => put({ ...row, _deleted: true })}
            onEdit={(row) => {
              router.push({
                pathname: AddDrink.href,
                query: { drink: row._id },
              });
            }}
          />
        </PageContent>
      )}
    </>
  );
};

export default withEnsuredSession()(EditUser);
