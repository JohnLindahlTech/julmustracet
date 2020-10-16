import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Formik, Field, Form } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { TextField as Text } from "@material-ui/core";
import { object, string, number, date } from "yup";
import { DateTimePicker } from "formik-material-ui-pickers";
import { Autocomplete } from "formik-material-ui-lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import withEnsuredSession from "../../hocs/withEnsuredSession";
import { isAfter } from "date-fns";
import { maxLimitDate, minLimitDate } from "../../lib/rules";

export {
  getStaticProps,
  getStaticPaths,
} from "../../translations/getStaticPath";

type Option = {
  id: number;
  name?: string;
};

const brands = [
  { id: 1, name: "apotekarnes" },
  { id: 2, name: "nygårda" },
]; // TODO Obviously fetch from server

const Add = () => {
  const now = new Date();
  const maxDate = isAfter(now, maxLimitDate) ? maxLimitDate : maxLimitDate; // now; FIXME TODO maxLimitDate should be now on the last ternary;

  const schema = object({
    brand: string().required("TRANSLATE required"),
    amount: number().required("TRANSLATE required").min(0).max(2),
    time: date().required("TRANSLATE required").min(minLimitDate).max(maxDate),
  });

  return (
    <>
      <Typography variant="h1">
        <FormattedMessage defaultMessage="Lägg till dryck" />
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={{
            brand: undefined,
            amount: undefined,
            time: new Date(),
          }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ submitForm, isSubmitting, errors, touched }) => (
            <Form>
              <div>
                <Field
                  freeSolo
                  name="brand"
                  component={Autocomplete}
                  options={brands}
                  style={{ width: 300 }}
                  getOptionLabel={(option?: string | Option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    return option?.name || "";
                  }}
                  renderInput={(params) => (
                    <Text
                      {...params}
                      error={touched["brand"] && !!errors["brand"]}
                      helperText={touched["brand"] && errors["brand"]}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div>
                <Field
                  component={TextField}
                  name="amount"
                  type="number"
                  inputProps={{
                    min: 0,
                    max: 2,
                    step: 0.01,
                  }}
                  label="TRANSLATE Amount"
                  placeholder="0.33"
                />
              </div>
              <div>
                <Field
                  ampm={false}
                  minDate={minLimitDate}
                  maxDate={maxDate}
                  component={DateTimePicker}
                  name="time"
                  label="TRANSLATE Time"
                />
              </div>
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
      </MuiPickersUtilsProvider>
    </>
  );
};

export default withEnsuredSession()(Add);
