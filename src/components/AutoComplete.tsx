import * as React from "react";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@material-ui/lab/Autocomplete";
import { FieldProps } from "formik";
import invariant from "tiny-warning";

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends FieldProps,
    Omit<
      MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
      "name" | "value" | "defaultValue"
    > {
  type?: string;
}

export function fieldToAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  disabled,
  field,
  form: { isSubmitting, setFieldValue },
  type,
  onChange,
  onBlur,
  freeSolo,
  onInputChange,
  ...props
}: AutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>): MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  if (process.env.NODE_ENV !== "production") {
    if (props.multiple) {
      invariant(
        Array.isArray(field.value),
        `value for ${field.name} is not an array, this can caused unexpected behaviour`
      );
    }
  }

  const {
    onChange: _onChange,
    onBlur: _onBlur,
    multiple: _multiple,
    value: inputValue,
    ...fieldSubselection
  } = field;

  return {
    freeSolo,
    onBlur:
      onBlur ??
      function (event) {
        field.onBlur(event ?? field.name);
      },
    onInputChange: onInputChange
      ? onInputChange
      : freeSolo
      ? function (_event, value) {
          setFieldValue(field.name, value);
        }
      : undefined,
    onChange: onChange
      ? onChange
      : !freeSolo
      ? function (_event, value) {
          setFieldValue(field.name, value);
        }
      : undefined,
    disabled: disabled ?? isSubmitting,
    loading: isSubmitting,
    inputValue,
    ...fieldSubselection,
    ...props,
  };
}

export function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  return <MuiAutocomplete {...fieldToAutocomplete(props)} />;
}

Autocomplete.displayName = "FormikMaterialUIAutocomplete";
