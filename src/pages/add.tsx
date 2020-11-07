import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, useIntl, defineMessages } from "react-intl";
import { Formik, Field, Form } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { TextField as Text, FormControl } from "@material-ui/core";
import { object, string, number, date } from "yup";
import { DateTimePicker } from "formik-material-ui-pickers";
import { Autocomplete } from "formik-material-ui-lab";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import withEnsuredSession from "../hocs/withEnsuredSession";
import { isAfter } from "date-fns";
import { maxLimitDate, minLimitDate } from "../lib/rules";
import { useDateFormat } from "../translations/DateFormatterProvider";

type Option = {
  id: number;
  name?: string;
};

const brands = [
  { id: 1, name: "apotekarnes" },
  { id: 2, name: "nygårda" },
]; // TODO Obviously fetch from server

const messages = defineMessages({
  string: {
    defaultMessage: "Måste vara en textsträng",
  },
  number: {
    defaultMessage: "Måste vara en siffra",
  },
  date: {
    defaultMessage: "Måste vara ett giltigt datum",
  },
  required: {
    defaultMessage: "Obligatoriskt fält",
  },
  "max.string": {
    defaultMessage: "Maxlängd är {max}",
  },
  "min.number": {
    defaultMessage: "Lägsta tillåtna värde är {min}",
  },
  "max.number": {
    defaultMessage: "Högsta tillåtna värde är {max}",
  },
  "min.date": {
    defaultMessage: "Lägsta tillåtna datum är {date}",
  },
  "max.date": {
    defaultMessage: "Högsta tillåtna datum är {date}",
  },
  "future.date": {
    defaultMessage: "Du får ej ange en tid i framtiden",
  },
  unknownError: {
    defaultMessage: "Något är fel med fältet",
  },
});

const getErrorMessage = (id) => {
  return messages[id] ?? messages.unknownError;
};

const Add = () => {
  const intl = useIntl();
  const format = useDateFormat();
  const now = new Date();
  const maxDate = isAfter(now, maxLimitDate) ? maxLimitDate : maxLimitDate; // now; FIXME TODO maxLimitDate should be now on the last ternary;

  const schema = object({
    brand: string(intl.formatMessage(messages.string))
      .required(intl.formatMessage(messages.required))
      .max(32, intl.formatMessage(messages["max.string"], { max: 32 })),
    amount: number()
      .required(intl.formatMessage(messages.required))
      .min(0, intl.formatMessage(messages["min.number"], { min: 0 }))
      .max(2, intl.formatMessage(messages["max.number"], { max: 2 })),
    time: date(intl.formatMessage(messages.date))
      .required(intl.formatMessage(messages.required))
      .min(
        minLimitDate,
        intl.formatMessage(messages["min.date"], {
          date: format(minLimitDate, "Pp"),
        })
      )
      .max(
        maxLimitDate,
        intl.formatMessage(messages["max.date"], {
          date: format(maxLimitDate, "Pp"),
        })
      ),
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
              <FormControl fullWidth margin="normal">
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
                      label="TRANSLATE Brand"
                      error={touched["brand"] && !!errors["brand"]}
                      helperText={touched["brand"] && errors["brand"]}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
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
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Field
                  ampm={false}
                  component={DateTimePicker}
                  minDate={minLimitDate}
                  maxDate={maxDate}
                  name="time"
                  label="TRANSLATE Time"
                />
              </FormControl>
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
