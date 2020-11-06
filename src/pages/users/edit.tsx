import React, { useCallback } from "react";
import { Formik, Field, Form } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import {
  Button,
  TextField as MUITextField,
  FormControl,
  Typography,
} from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { useSession, getSession } from "next-auth/client";
import withEnsuredSession from "../../hocs/withEnsuredSession";

const UserForm = ({ user }) => {
  const intl = useIntl();

  const schema = object({
    username: string(intl.formatMessage({ defaultMessage: "Måste vara text" }))
      .required(
        intl.formatMessage({ defaultMessage: "Användarnamn är obligatoriskt" })
      )
      .max(
        32,
        intl.formatMessage({
          defaultMessage: "Användarnamnet får vara max 32 tecken",
        })
      )
      .label(intl.formatMessage({ defaultMessage: "Användarnamn" })),
  });

  const onSubmit = useCallback(async (values, { setSubmitting }) => {
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // TODO Errorhandling
      const data = await res.json();
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }, []);

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
          <Typography>
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
          <FormControl fullWidth margin="normal">
            <Button
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
  const [session, loading] = useSession();
  return (
    <>
      <main>
        <Typography variant="h1">
          <FormattedMessage defaultMessage="Redigera Användare" />
        </Typography>
        {session && session.user && <UserForm user={session.user} />}
      </main>
    </>
  );
};

export default withEnsuredSession()(EditUser);
