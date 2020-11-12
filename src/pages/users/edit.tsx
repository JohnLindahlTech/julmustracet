import React, { useCallback } from "react";
import { Formik, Field, Form } from "formik";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import {
  Button,
  TextField as MUITextField,
  FormControl,
  Typography,
  Box,
  useTheme,
  Divider,
} from "@material-ui/core";
import { Plus as AddIcon } from "@styled-icons/fa-solid/Plus";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
// Since we are needing network for the edit, lets require the latest session from server
import { useSession } from "next-auth/client";
import LangLink from "../../components/langLink";
import Link from "../../components/link";
import withEnsuredSession from "../../hocs/withEnsuredSession";
import { patchData } from "../../lib/fetch";
import HistoryList from "../../components/table/HistoryList";
import { USER, BRAND } from "../../lib/mapGraphData";
import { useGetDrinksFrom } from "../../db/useGetDrinks";
import { AddDrink, UserDetails } from "../../routes";
import usePutDrink from "../../db/usePutDrink";
import useLangRouter from "../../hooks/useLangRouter";

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
          throw error;
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
          <Typography
            color={user?.username ? "initial" : "primary"}
            variant={user?.username ? "body1" : "h4"}
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
          <FormControl fullWidth margin="normal">
            <Field
              component={TextField}
              name="username"
              label={<FormattedMessage defaultMessage="Användarnamn" />}
              placeholder="Tomten"
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <MUITextField
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

const EditUser = () => {
  const theme = useTheme();
  const [put] = usePutDrink();
  const [session, loading] = useSession();
  const { drinks } = useGetDrinksFrom(USER, session.user.username);
  const router = useLangRouter();
  return (
    <>
      <main>
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Redigera Användare" />
        </Typography>
        {session && session.user && (
          <>
            <UserForm user={session.user} />
            <Divider variant="middle" />
            {session?.user?.username ? (
              <Typography variant="body1">
                <Link
                  href={{
                    pathname: UserDetails.href,
                    query: { user: session.user.username },
                  }}
                >
                  <FormattedMessage defaultMessage="Gå till din publika profil här" />
                </Link>
              </Typography>
            ) : null}
            <HistoryList
              type={BRAND}
              title={
                <Box display="flex">
                  <Box flexGrow={1}>
                    <FormattedMessage defaultMessage="Historik" />
                  </Box>
                  <LangLink {...AddDrink} passHref>
                    <Button color="primary" variant="contained">
                      <AddIcon size={theme.spacing(2)} />
                    </Button>
                  </LangLink>
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
          </>
        )}
      </main>
    </>
  );
};

export default withEnsuredSession()(EditUser);
