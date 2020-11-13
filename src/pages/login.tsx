import React, { useCallback, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/client";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, Box, Divider, Grid, Typography } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import withEnsuredSession from "../hocs/withEnsuredSession";
import { LOGGED_OUT } from "../hooks/useEnsureSession";
import { Home } from "../routes";

const LogIn = (props) => {
  const intl = useIntl();
  const [providers, setProviders] = useState(props.providers || []);

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = Object.values(await getProviders());
      setProviders(providers);
    };
    if (!Array.isArray(providers) || !providers.length) {
      fetchProviders();
    }
  }, [providers]);

  const onSignInOauth = useCallback(
    (provider) => () => {
      signIn(provider.id);
    },
    []
  );

  const onEmailLogin = useCallback((values) => {
    signIn("email", { email: values.email });
  }, []);

  return (
    <main>
      <Typography variant="h1" align="center">
        <FormattedMessage defaultMessage="Logga in" />
      </Typography>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onEmailLogin}
        validationSchema={object({
          email: string()
            .email(
              intl.formatMessage({
                defaultMessage: "Måste ange en giltig epost",
              })
            )
            .required(
              intl.formatMessage({ defaultMessage: "Obligatoriskt fält" })
            ),
        })}
      >
        {({ submitForm, isSubmitting }) => (
          <Form noValidate>
            <Grid container justify="center" alignItems="center">
              <Grid item lg={3} xs={12} sm={6} md={4}>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Field
                      component={TextField}
                      fullWidth
                      name="email"
                      type="email"
                      label={intl.formatMessage({ defaultMessage: "Epost" })}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      <FormattedMessage defaultMessage="Logga in" />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Box py={2}>
        <Divider />
      </Box>
      <Typography variant="h2" align="center">
        <FormattedMessage defaultMessage="Socialt" />
      </Typography>
      <Grid container justify="center" alignItems="center">
        <Grid item lg={3} xs={12} sm={6} md={4}>
          <Grid container direction="column" spacing={1}>
            {providers
              .filter((p) => p.type !== "email")
              .map((provider) => (
                <Grid item key={provider.id}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={onSignInOauth(provider)}
                  >
                    {provider.name}
                  </Button>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
};

export default withEnsuredSession(Home.href, LOGGED_OUT)(LogIn);
