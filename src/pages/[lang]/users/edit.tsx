import React from "react";
import { Formik, Field, Form } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { useSession } from "next-auth/client";
import withEnsuredSession from "../../../hocs/withEnsuredSession";

export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

// TODO TRANSLATE

const schema = object({
  email: string("TRANSLATE string")
    .email("TRANSLATE email")
    .required("TRANSLATE Required")
    .label("TRANSLATE email"),
  name: string("TRANSLATE string")
    .required("TRANSLATE Required")
    .nullable("TRANSLATE nullable")
    .max(32, "TRANSLATE max")
    .label("TRANSLATE Username"),
  // image: string().url("Avatar link must be a valid url (start with https://)").nullable().notRequired().max(1000).matches(/^https/i, { message: "Must start with https://", excludeEmptyString: true }).label('Avatar link'),
});

const UserForm = ({ user }) => {
  return (
    <Formik
      initialValues={{
        email: user.email || "",
        name: user.name || "",
        image: user.image || "",
      }}
      validationSchema={schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="TRANSLATE Email"
            disabled
            placeholder="tomten@julmustracet.se"
          />
          <Field
            component={TextField}
            name="name"
            label="TRANSLATE Username"
            placeholder="Tomten"
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            TRANSLATE Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const NoUser = () => {
  return <p>TRANSLATE Please Log In!</p>;
};

const Loading = () => {
  return <p>TRANSLATE Loading!</p>;
};

const EditUser = () => {
  const [session, loading] = useSession();
  return (
    <>
      <main>
        <h1>TRANSLATE Edit User</h1>
        {loading && <Loading />}
        {!loading && (!session || !session.user) && <NoUser />}
        {session && session.user && <UserForm user={session.user} />}
      </main>
    </>
  );
};

export default withEnsuredSession()(EditUser);
