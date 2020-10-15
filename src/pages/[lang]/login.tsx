import React, { useCallback, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/client";
import { FormattedMessage, useIntl } from "react-intl";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import withEnsuredSession from "../../hocs/withEnsuredSession";
import { LOGGED_OUT } from "../../hooks/useEnsureSession";
import { Home } from "../../routes";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

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
    <div>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onEmailLogin}
        validationSchema={object({
          email: string()
            .email("TRANSLATE email")
            .required("TRANSLATE required"),
        })}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name="email"
              type="email"
              label={intl.formatMessage({ defaultMessage: "Epost" })}
            />
            <Button disabled={isSubmitting} onClick={submitForm}>
              <FormattedMessage defaultMessage="Logga in med epost" />
            </Button>
          </Form>
        )}
      </Formik>
      {providers
        .filter((p) => p.type !== "email")
        .map((provider) => (
          <Button key={provider.id} onClick={onSignInOauth(provider)}>
            {provider.name}
          </Button>
        ))}
    </div>
  );
};

export default withEnsuredSession(Home.href, LOGGED_OUT)(LogIn);
