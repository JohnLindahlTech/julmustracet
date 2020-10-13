import React from "react";
import { Formik, Field, Form } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { object, string } from "yup";
import { useSession } from "next-auth/client";
export {
  getStaticProps,
  getStaticPaths,
} from "../../../translations/getStaticPath";

// TODO TRANSLATE

const schema = object({
  email: string().email().required("Required"),
  name: string().required("Required").nullable().max(32).label("Username"),
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
            label="Email"
            disabled
            placeholder="tomten@julmustracet.se"
          />
          <Field
            component={TextField}
            name="name"
            label="Username"
            placeholder="Tomten"
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const NoUser = () => {
  return <p>Please Log In!</p>;
};

const Loading = () => {
  return <p>Loading!</p>;
};

const EditUser = () => {
  const [session, loading] = useSession();
  return (
    <>
      <main>
        <h1>Edit User</h1>
        {loading && <Loading />}
        {!loading && (!session || !session.user) && <NoUser />}
        {session && session.user && <UserForm user={session.user} />}
      </main>
    </>
  );
};

export default EditUser;
